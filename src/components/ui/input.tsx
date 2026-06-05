import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, type = "text", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "focus-ring h-11 w-full rounded-button border border-border bg-surface px-4 text-sm font-medium text-text placeholder:text-text-muted disabled:cursor-not-allowed disabled:opacity-55",
        className,
      )}
      type={type}
      {...props}
    />
  );
}
