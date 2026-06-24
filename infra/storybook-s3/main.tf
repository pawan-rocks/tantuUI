terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# ── Variables ─────────────────────────────────────────────────────────────────

variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "Globally unique S3 bucket name (e.g. tantuui-storybook)"
  type        = string
}

variable "enable_cloudfront" {
  description = "Serve through CloudFront (HTTPS + CDN)"
  type        = bool
  default     = true
}

# ── S3 Bucket ─────────────────────────────────────────────────────────────────

resource "aws_s3_bucket" "storybook" {
  bucket        = var.bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_website_configuration" "storybook" {
  bucket = aws_s3_bucket.storybook.id

  index_document { suffix = "index.html" }
  error_document { key    = "index.html" } # SPA fallback
}

resource "aws_s3_bucket_public_access_block" "storybook" {
  bucket = aws_s3_bucket.storybook.id

  # Keep bucket private — CloudFront accesses it via OAC
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ── CloudFront Origin Access Control ─────────────────────────────────────────

resource "aws_cloudfront_origin_access_control" "storybook" {
  count = var.enable_cloudfront ? 1 : 0

  name                              = "${var.bucket_name}-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# ── S3 Bucket Policy — allow CloudFront OAC ──────────────────────────────────

data "aws_iam_policy_document" "storybook" {
  count = var.enable_cloudfront ? 1 : 0

  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.storybook.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.storybook[0].arn]
    }
  }
}

resource "aws_s3_bucket_policy" "storybook" {
  count  = var.enable_cloudfront ? 1 : 0
  bucket = aws_s3_bucket.storybook.id
  policy = data.aws_iam_policy_document.storybook[0].json
}

# ── CloudFront Distribution ───────────────────────────────────────────────────

resource "aws_cloudfront_distribution" "storybook" {
  count = var.enable_cloudfront ? 1 : 0

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  comment             = "TantuUI Storybook"
  price_class         = "PriceClass_100" # US + Europe only — cheapest

  origin {
    domain_name              = aws_s3_bucket.storybook.bucket_regional_domain_name
    origin_id                = "S3-${var.bucket_name}"
    origin_access_control_id = aws_cloudfront_origin_access_control.storybook[0].id
  }

  default_cache_behavior {
    target_origin_id       = "S3-${var.bucket_name}"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true

    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }

    # Default TTL — assets have immutable cache headers set during deploy
    min_ttl     = 0
    default_ttl = 86400    # 1 day
    max_ttl     = 31536000 # 1 year
  }

  # SPA routing — return index.html for any 403/404
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  restrictions {
    geo_restriction { restriction_type = "none" }
  }

  viewer_certificate {
    cloudfront_default_certificate = true # Use *.cloudfront.net domain
    # To use a custom domain, replace with:
    # acm_certificate_arn      = var.acm_certificate_arn
    # ssl_support_method       = "sni-only"
    # minimum_protocol_version = "TLSv1.2_2021"
  }
}

# ── Outputs ───────────────────────────────────────────────────────────────────

output "s3_bucket_name" {
  value = aws_s3_bucket.storybook.id
}

output "cloudfront_domain" {
  value = var.enable_cloudfront ? aws_cloudfront_distribution.storybook[0].domain_name : null
}

output "cloudfront_distribution_id" {
  description = "Set this as CLOUDFRONT_DISTRIBUTION_ID in GitHub Actions secrets"
  value       = var.enable_cloudfront ? aws_cloudfront_distribution.storybook[0].id : null
}
