import React, { forwardRef, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import type { HTMLAttributes, ReactNode, CSSProperties } from "react";
import type { BaseProps, Size } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import "./Modal.css";

// ── Types ─────────────────────────────────────────────────────────────────

export type ModalPlacement =
  | "center"
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "fullscreen";

export interface ModalHeaderProps extends BaseProps, Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Title text */
  title?: ReactNode;
  /** Subtitle text */
  subtitle?: ReactNode;
  /** Content for the left section of header */
  leftSection?: ReactNode;
  /** Content for the right section of header */
  rightSection?: ReactNode;
  /** Content for the center section (overrides title/subtitle) */
  centerSection?: ReactNode;
  /** Whether to show the close icon */
  showCloseIcon?: boolean;
  /** Custom close icon element */
  closeIcon?: ReactNode;
  /** Close handler (called on close icon click) */
  onClose?: () => void;
  /** Show shimmer/skeleton for entire header */
  isGhost?: boolean;
  /** Show shimmer for title only */
  isTitleGhost?: boolean;
  /** Show shimmer for subtitle only */
  isSubtitleGhost?: boolean;
}

export interface ModalFooterProps extends BaseProps, HTMLAttributes<HTMLElement> {
  /** Show shimmer/skeleton for footer content */
  isGhost?: boolean;
}

export interface ModalProps extends BaseProps, Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Whether the modal is visible */
  isOpen?: boolean;
  /** Called when the modal requests to close */
  onClose?: () => void;
  /** Placement / style of the modal */
  placement?: ModalPlacement;
  /** Size preset for center modals */
  size?: Size;
  /** Custom width (overrides size) */
  width?: string;
  /** Custom height */
  height?: string;
  /** Custom max-width */
  maxWidth?: string;
  /** Custom max-height */
  maxHeight?: string;
  /** Custom height for the body/content section */
  contentHeight?: string;
  /** Custom min-height for the body/content section */
  contentMinHeight?: string;
  /** Custom max-height for the body/content section */
  contentMaxHeight?: string;
  /** Whether clicking backdrop closes the modal */
  closeOnBackdropClick?: boolean;
  /** Whether pressing Escape closes the modal */
  closeOnEscape?: boolean;
  /** Whether to show the backdrop overlay */
  showBackdrop?: boolean;
  /** Custom z-index */
  zIndex?: number;
  /** Whether to render the modal with animation */
  animated?: boolean;
  /** Ghost/skeleton mode */
  isGhost?: boolean;
  /** Custom header (replaces default ModalHeader) */
  header?: ReactNode;
  /** Custom footer (replaces default ModalFooter) */
  footer?: ReactNode;
  /** Whether to lock body scroll when open */
  lockScroll?: boolean;
  /** Whether to show the close icon (top-right corner) */
  showCloseIcon?: boolean;
  /** Custom close icon element */
  closeIcon?: ReactNode;
  /** Portal container (defaults to document.body) */
  portalTarget?: HTMLElement;
}

// ── ModalHeader ───────────────────────────────────────────────────────────

export const ModalHeader = forwardRef<HTMLElement, ModalHeaderProps>(
  (
    {
      className,
      style,
      children,
      testId,
      title,
      subtitle,
      leftSection,
      rightSection,
      centerSection,
      showCloseIcon: _showCloseIcon,
      closeIcon: _closeIcon,
      onClose: _onClose,
      isGhost = false,
      isTitleGhost = false,
      isSubtitleGhost = false,
      ...rest
    },
    ref,
  ) => {
    if (isGhost) {
      return (
        <header
          ref={ref as React.Ref<HTMLElement>}
          className={cn("tui-modal__header", className)}
          style={style}
          data-testid={testId}
          {...rest}
        >
          {title || subtitle ? (
            <div className="tui-modal__header-left">
              <div className="tui-modal__header-titles">
                {title && (
                  <Shimmer shape="rounded">
                    <span style={{ visibility: "hidden", fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", whiteSpace: "nowrap", lineHeight: "var(--tui-leading-tight)" }}>{title}</span>
                  </Shimmer>
                )}
                {subtitle && (
                  <Shimmer shape="rounded" style={{ marginTop: "var(--tui-spacing-0_5)" }}>
                    <span style={{ visibility: "hidden", fontSize: "var(--tui-font-size-sm)", whiteSpace: "nowrap", lineHeight: "var(--tui-leading-normal)" }}>{subtitle}</span>
                  </Shimmer>
                )}
              </div>
            </div>
          ) : (
            <Shimmer width="100%" height="20px" shape="rounded" />
          )}
          <div className="tui-modal__header-center" />
        </header>
      );
    }

    return (
      <header
        ref={ref as React.Ref<HTMLElement>}
        className={cn("tui-modal__header", className)}
        style={style}
        data-testid={testId}
        {...rest}
      >
        {/* Left section */}
        <div className="tui-modal__header-left">
          {leftSection || (
            (title || subtitle || isTitleGhost || isSubtitleGhost) && (
              <div className="tui-modal__header-titles">
                {isTitleGhost && title
                  ? <Shimmer shape="rounded">
                      <span style={{ visibility: "hidden", fontSize: "var(--tui-font-size-lg)", fontWeight: "var(--tui-font-weight-semibold)", whiteSpace: "nowrap", lineHeight: "var(--tui-leading-tight)" }}>{title}</span>
                    </Shimmer>
                  : title && <div className="tui-modal__header-title">{title}</div>
                }
                {isSubtitleGhost && subtitle
                  ? <Shimmer shape="rounded" style={{ marginTop: "var(--tui-spacing-0_5)" }}>
                      <span style={{ visibility: "hidden", fontSize: "var(--tui-font-size-sm)", whiteSpace: "nowrap", lineHeight: "var(--tui-leading-normal)" }}>{subtitle}</span>
                    </Shimmer>
                  : subtitle && <div className="tui-modal__header-subtitle">{subtitle}</div>
                }
              </div>
            )
          )}
        </div>

        {/* Center section: custom content or children */}
        <div className="tui-modal__header-center">
          {centerSection}
          {children}
        </div>

        {/* Right section */}
        {rightSection && (
          <div className="tui-modal__header-right">{rightSection}</div>
        )}
      </header>
    );
  },
);

ModalHeader.displayName = "ModalHeader";

// ── ModalFooter ───────────────────────────────────────────────────────────

export const ModalFooter = forwardRef<HTMLElement, ModalFooterProps>(
  ({ className, style, children, testId, isGhost = false, ...rest }, ref) => {
    return (
      <footer
        ref={ref as React.Ref<HTMLElement>}
        className={cn("tui-modal__footer", className)}
        style={style}
        data-testid={testId}
        {...rest}
      >
        {isGhost ? (
          <Shimmer width="160px" height="32px" shape="rounded" />
        ) : (
          children
        )}
      </footer>
    );
  },
);

ModalFooter.displayName = "ModalFooter";

// ── Modal ─────────────────────────────────────────────────────────────────

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      style,
      children,
      testId,
      isOpen = false,
      onClose,
      placement = "center",
      size = "md",
      width,
      height,
      maxWidth,
      maxHeight,
      contentHeight,
      contentMinHeight,
      contentMaxHeight,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      showBackdrop = true,
      zIndex,
      animated = true,
      isGhost = false,
      header,
      footer,
      lockScroll = true,
      showCloseIcon = true,
      closeIcon,
      portalTarget,
      ...rest
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const modalRef = (ref as React.RefObject<HTMLDivElement>) || internalRef;

    // Lock body scroll
    useEffect(() => {
      if (!isOpen || !lockScroll) return;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, [isOpen, lockScroll]);

    // Escape key
    useEffect(() => {
      if (!isOpen || !closeOnEscape) return;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose?.();
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, closeOnEscape, onClose]);

    // Focus trap: focus the modal panel when opened
    useEffect(() => {
      if (!isOpen) return;
      const timer = setTimeout(() => {
        const el = modalRef.current;
        if (el) el.focus();
      }, 0);
      return () => clearTimeout(timer);
    }, [isOpen, modalRef]);

    const handleBackdropClick = useCallback(
      (e: React.MouseEvent) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) {
          onClose?.();
        }
      },
      [closeOnBackdropClick, onClose],
    );

    if (!isOpen) return null;

    // Ghost mode — renders real modal structure with shimmer body content + close icon
    if (isGhost) {
      const ghostPanelStyle: CSSProperties = {
        ...(width && { width }),
        ...(height && { height }),
        ...(maxWidth && { maxWidth }),
        ...(maxHeight && { maxHeight }),
        ...(zIndex != null && { zIndex: zIndex + 1 }),
        ...style,
      };

      const ghostOverlayStyle: CSSProperties = {
        ...(zIndex != null && { zIndex }),
      };

      return createPortal(
        <div
          className={cn(
            "tui-modal-overlay",
            showBackdrop && "tui-modal-overlay--backdrop",
            animated && "tui-modal-overlay--animated",
            `tui-modal-overlay--${placement}`,
          )}
          style={ghostOverlayStyle}
          onClick={handleBackdropClick}
          aria-hidden="true"
        >
          <div
            ref={modalRef}
            className={cn(
              "tui-modal",
              `tui-modal--${placement}`,
              placement === "center" && `tui-modal--${size}`,
              animated && "tui-modal--animated",
              showCloseIcon && "tui-modal--has-close",
              className,
            )}
            style={ghostPanelStyle}
            data-testid={testId}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            {...rest}
          >
            {/* Close icon visible on ghost */}
            {showCloseIcon && (
              <button
                type="button"
                className="tui-modal__close tui-focus-ring"
                onClick={onClose}
                aria-label="Close modal"
              >
                {closeIcon || (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
              </button>
            )}
            {header}
            <div className="tui-modal__body">
              <Shimmer width="100%" height="20px" shape="rounded" style={{ marginBottom: "var(--tui-spacing-3)" }} />
              <Shimmer width="80%" height="20px" shape="rounded" style={{ marginBottom: "var(--tui-spacing-3)" }} />
              <Shimmer width="60%" height="20px" shape="rounded" />
            </div>
            {footer}
          </div>
        </div>,
        portalTarget || document.body,
      );
    }

    const panelStyle: CSSProperties = {
      ...(width && { width }),
      ...(height && { height }),
      ...(maxWidth && { maxWidth }),
      ...(maxHeight && { maxHeight }),
      ...(zIndex != null && { zIndex: zIndex + 1 }),
      ...style,
    };

    const overlayStyle: CSSProperties = {
      ...(zIndex != null && { zIndex }),
    };

    return createPortal(
      <div
        className={cn(
          "tui-modal-overlay",
          showBackdrop && "tui-modal-overlay--backdrop",
          animated && "tui-modal-overlay--animated",
          `tui-modal-overlay--${placement}`,
        )}
        style={overlayStyle}
        onClick={handleBackdropClick}
        aria-hidden="true"
      >
        <div
          ref={modalRef}
          className={cn(
            "tui-modal",
            `tui-modal--${placement}`,
            placement === "center" && `tui-modal--${size}`,
            animated && "tui-modal--animated",
            showCloseIcon && "tui-modal--has-close",
            className,
          )}
          style={panelStyle}
          data-testid={testId}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          {...rest}
        >
          {/* Close icon — absolute top-right */}
          {showCloseIcon && (
            <button
              type="button"
              className="tui-modal__close tui-focus-ring"
              onClick={onClose}
              aria-label="Close modal"
            >
              {closeIcon || (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </button>
          )}
          {header}
          <div
            className="tui-modal__body"
            style={
              (contentHeight || contentMinHeight || contentMaxHeight)
                ? {
                    ...(contentHeight && { height: contentHeight, flex: "none" }),
                    ...(contentMinHeight && { minHeight: contentMinHeight }),
                    ...(contentMaxHeight && { maxHeight: contentMaxHeight }),
                    overflow: "auto",
                  }
                : undefined
            }
          >
            {children}
          </div>
          {footer}
        </div>
      </div>,
      portalTarget || document.body,
    );
  },
);

Modal.displayName = "Modal";
