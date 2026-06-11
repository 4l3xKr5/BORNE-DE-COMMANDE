import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-[var(--gold-500)] text-[var(--night-950)] border-[var(--night-950)] pdn-card-shadow",
  secondary: "bg-white text-[var(--night-950)] border-[var(--night-950)] pdn-card-shadow-sm",
  danger: "bg-[var(--red-500)] text-white border-[var(--night-950)] pdn-card-shadow-sm",
  ghost: "bg-transparent text-[var(--night-950)] border-transparent"
};

export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "pdn-label pdn-pressable min-h-14 rounded-xl border-2 px-5 py-3 text-xl disabled:cursor-not-allowed disabled:opacity-45",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
