import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "success" | "achievement";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "border-border bg-surface text-text-muted",
  success: "border-primary/30 bg-soft-success text-text",
  achievement: "border-achievement/30 bg-soft-achievement text-text",
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-button border px-3 py-1 text-xs font-bold",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
