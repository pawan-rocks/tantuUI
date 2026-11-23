import React, { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import type { BaseProps, Intent, Size } from "../../types";
import { cn } from "../../utils/cn";
import { Shimmer } from "../Shimmer/Shimmer";
import "./Stepper.css";

export type StepperStatus = "completed" | "in-progress" | "pending";

export interface StepperStep {
  /** Optional stable identifier for the step. */
  id?: string;
  /** Small eyebrow text above the main label. Defaults to STEP 1, STEP 2, and so on. */
  stepLabel?: ReactNode;
  /** Main step label. */
  label?: ReactNode;
  /** Supporting text displayed below the label. */
  sublabel?: ReactNode;
  /** Custom content rendered inside the circular indicator instead of the count. */
  icon?: ReactNode;
  /** Status used for the status pill and visual state. Defaults from activeStep. */
  status?: StepperStatus;
  /** Custom text or content for the status pill. */
  statusLabel?: ReactNode;
  /** Prevent interaction and apply the disabled visual state to this step. */
  disabled?: boolean;
  /** Mark this step as completed independently of activeStep. */
  completed?: boolean;
  /** Mark this step as active independently of activeStep. */
  active?: boolean;
  /** Called when this individual step is clicked. */
  onClick?: () => void;
}

export interface StepperProps extends BaseProps, Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** Steps to render in order. Each step can have a label, sublabel, icon, and state. */
  steps?: StepperStep[];
  /** Layout direction. */
  orientation?: "horizontal" | "vertical";
  /** Vertical alignment of the circle relative to the label content. */
  verticalAlign?: "top" | "center";
  /** Show the small STEP 1 / STEP 2 eyebrow above each label. */
  showStepLabel?: boolean;
  /** Show Completed, In Progress, or Pending status pills. */
  showStatus?: boolean;
  /** Zero-based index of the active step. */
  activeStep?: number;
  /** Size of the step indicators and typography. */
  size?: Size;
  /** Color intent for active, completed, and connector states. */
  intent?: Intent;
  /** Disable interaction and apply the disabled visual state to every step. */
  disabled?: boolean;
  /** Called with the zero-based index when an enabled step is clicked. */
  onStepChange?: (stepIndex: number) => void;
  /** Ghost/skeleton mode. */
  isGhost?: boolean;
}

function statusLabelFor(status: StepperStatus): string {
  if (status === "completed") return "Completed";
  if (status === "in-progress") return "In Progress";
  return "Pending";
}

function CheckMark() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="m3.5 8 3 3 6-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
    </svg>
  );
}

function StepContent({
  step,
  index,
  status,
  showStepLabel,
  showStatus,
}: {
  step: StepperStep;
  index: number;
  status: StepperStatus;
  showStepLabel: boolean;
  showStatus: boolean;
}) {
  return (
    <span className="tui-stepper__content">
      {showStepLabel && <span className="tui-stepper__step-label">{step.stepLabel ?? `STEP ${index + 1}`}</span>}
      {step.label != null && <span className="tui-stepper__label">{step.label}</span>}
      {step.sublabel != null && <span className="tui-stepper__sublabel">{step.sublabel}</span>}
      {showStatus && (
        <span className={cn("tui-stepper__status", `tui-stepper__status--${status}`)}>
          {step.statusLabel ?? statusLabelFor(status)}
        </span>
      )}
    </span>
  );
}

function GhostStepContent({
  step,
  index,
  showStepLabel,
  showStatus,
  status,
}: {
  step: StepperStep;
  index: number;
  showStepLabel: boolean;
  showStatus: boolean;
  status: StepperStatus;
}) {
  return (
    <span className="tui-stepper__content">
      {showStepLabel && (
        <Shimmer shape="rounded">
          <span className="tui-stepper__ghost-step-label">{step.stepLabel ?? `STEP ${index + 1}`}</span>
        </Shimmer>
      )}
      <Shimmer shape="rounded">
        <span className="tui-stepper__ghost-label">{step.label ?? "Step label"}</span>
      </Shimmer>
      {step.sublabel != null && (
        <Shimmer shape="rounded">
          <span className="tui-stepper__ghost-sublabel">{step.sublabel}</span>
        </Shimmer>
      )}
      {showStatus && (
        <Shimmer shape="pill">
          <span className={cn("tui-stepper__ghost-status", `tui-stepper__ghost-status--${status}`)}>{step.statusLabel ?? statusLabelFor(status)}</span>
        </Shimmer>
      )}
    </span>
  );
}

export const Stepper = forwardRef<HTMLElement, StepperProps>(
  (
    {
      className,
      style,
      children,
      testId,
      steps = [],
      orientation = "horizontal",
      verticalAlign = "top",
      showStepLabel = true,
      showStatus = true,
      activeStep = 0,
      size = "md",
      intent = "default",
      disabled = false,
      onStepChange,
      isGhost = false,
      ...rest
    },
    ref,
  ) => {
    const hasSteps = steps.length > 0;

    return (
      <nav
        ref={ref}
        className={cn(
          "tui-stepper",
          `tui-stepper--${orientation}`,
          `tui-stepper--vertical-align-${verticalAlign}`,
          `tui-stepper--${size}`,
          `tui-stepper--${intent}`,
          disabled && "tui-stepper--disabled",
          isGhost && "tui-stepper--ghost",
          className,
        )}
        style={style}
        data-testid={testId}
        aria-disabled={disabled || undefined}
        {...rest}
      >
        {hasSteps ? (
          <ol className="tui-stepper__list">
            {steps.map((step, index) => {
              const isDisabled = disabled || Boolean(step.disabled);
              const isActive = step.active ?? index === activeStep;
              const isCompleted = step.completed ?? (!step.active && index < activeStep);
              const status: StepperStatus = step.status ?? (isCompleted ? "completed" : isActive ? "in-progress" : "pending");
              const isInteractive = !isGhost && !isDisabled && Boolean(onStepChange || step.onClick);
              const handleClick = () => {
                step.onClick?.();
                onStepChange?.(index);
              };
              const indicator = isGhost ? (
                <Shimmer shape="circle" width="var(--tui-stepper-indicator-size)" height="var(--tui-stepper-indicator-size)">
                  <span className="tui-stepper__ghost-indicator">{index + 1}</span>
                </Shimmer>
              ) : (
                <span className="tui-stepper__indicator" aria-hidden="true">
                  {step.icon ?? (status === "completed" ? <CheckMark /> : index + 1)}
                </span>
              );
              const triggerClassName = cn(
                "tui-stepper__trigger",
                isInteractive && "tui-focus-ring",
              );
              const stepContent = isGhost ? (
                <GhostStepContent step={step} index={index} status={status} showStepLabel={showStepLabel} showStatus={showStatus} />
              ) : (
                <StepContent step={step} index={index} status={status} showStepLabel={showStepLabel} showStatus={showStatus} />
              );

              return (
                <li
                  key={step.id ?? index}
                  className={cn(
                    "tui-stepper__item",
                    isActive && "tui-stepper__item--active",
                    isCompleted && "tui-stepper__item--completed",
                    `tui-stepper__item--status-${status}`,
                    isDisabled && "tui-stepper__item--disabled",
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  <div className="tui-stepper__row">
                    {isInteractive ? (
                      <button
                        type="button"
                        className={triggerClassName}
                        onClick={handleClick}
                        disabled={isDisabled}
                        aria-label={typeof step.label === "string" ? step.label : `Step ${index + 1}`}
                        aria-current={isActive ? "step" : undefined}
                        aria-disabled={isDisabled || undefined}
                      >
                        {indicator}
                      </button>
                    ) : (
                      <span className="tui-stepper__indicator-slot" aria-disabled={isDisabled || undefined}>
                        {indicator}
                      </span>
                    )}
                    {stepContent}
                  </div>
                  {index < steps.length - 1 && <span className="tui-stepper__connector" aria-hidden="true" />}
                </li>
              );
            })}
          </ol>
        ) : (
          children
        )}
      </nav>
    );
  },
);

Stepper.displayName = "Stepper";
