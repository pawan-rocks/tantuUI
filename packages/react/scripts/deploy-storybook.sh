#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# deploy-storybook.sh
#
# Builds Storybook and syncs it to an S3 bucket + optionally invalidates
# a CloudFront distribution.
#
# Required env vars:
#   AWS_ACCESS_KEY_ID
#   AWS_SECRET_ACCESS_KEY
#   AWS_REGION          (e.g. us-east-1)
#   S3_BUCKET           (e.g. my-storybook-bucket)
#
# Optional env vars:
#   CLOUDFRONT_DISTRIBUTION_ID   (triggers a cache invalidation if set)
#   STORYBOOK_OUT_DIR            (default: storybook-static)
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

OUT_DIR="${STORYBOOK_OUT_DIR:-storybook-static}"

# ── Validate required vars ────────────────────────────────────────────────────
required_vars=(AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_REGION S3_BUCKET)
for var in "${required_vars[@]}"; do
  if [[ -z "${!var:-}" ]]; then
    echo "❌  Missing required env var: $var"
    exit 1
  fi
done

# ── Build tokens first (Storybook imports tokens/dist/base.css) ───────────────
echo "📦  Building @tantu/tokens..."
npm run build --workspace=packages/tokens

# ── Build Storybook ───────────────────────────────────────────────────────────
echo "📚  Building Storybook..."
npm run storybook:build --workspace=packages/react

# ── Sync to S3 ────────────────────────────────────────────────────────────────
echo "☁️   Syncing to s3://$S3_BUCKET ..."

# HTML files — no cache (always fresh)
aws s3 sync "packages/react/$OUT_DIR" "s3://$S3_BUCKET" \
  --region "$AWS_REGION" \
  --exclude "*" \
  --include "*.html" \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html" \
  --delete

# JS / CSS / assets — long cache with content hash in filename
aws s3 sync "packages/react/$OUT_DIR" "s3://$S3_BUCKET" \
  --region "$AWS_REGION" \
  --exclude "*.html" \
  --cache-control "public, max-age=31536000, immutable" \
  --delete

echo "✅  Sync complete → s3://$S3_BUCKET"

# ── CloudFront invalidation (optional) ───────────────────────────────────────
if [[ -n "${CLOUDFRONT_DISTRIBUTION_ID:-}" ]]; then
  echo "🔄  Invalidating CloudFront distribution $CLOUDFRONT_DISTRIBUTION_ID ..."
  aws cloudfront create-invalidation \
    --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
    --paths "/*"
  echo "✅  CloudFront invalidation created"
fi

echo ""
echo "🎉  Storybook deployed!"
if [[ -n "${CLOUDFRONT_DISTRIBUTION_ID:-}" ]]; then
  echo "    URL: https://<your-cloudfront-domain>.cloudfront.net"
else
  echo "    URL: http://$S3_BUCKET.s3-website-$AWS_REGION.amazonaws.com"
fi
