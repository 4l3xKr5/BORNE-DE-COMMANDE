import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-[var(--gold-500)] text-[var(--night-950)] border-[var(--night-950)] shadow-[0_6px_0_var(--night-950)]",
  secondary: "bg-white text-[var(--night-950)] border-[var(--night-950)] shadow-[0_4px_0_var(--night-950)]",
  danger: "bg-[var(--red-500)] text-white border-[var(--night-950)] shadow-[0_4px_0_var(--night-950)]",
  ghost: "bg-transparent text-[var(--night-950)] border-transparent"
};

export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "pdn-label min-h-14 rounded-xl border-2 px-5 py-3 text-xl transition active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-45",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
