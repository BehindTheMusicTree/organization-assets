import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({
  variant = "primary",
  children,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      style={{
        padding: "var(--space-sm) var(--space-md)",
        borderRadius: "var(--radius-md)",
        border: "none",
        cursor: "pointer",
        backgroundColor:
          variant === "primary" ? "var(--color-primary)" : "var(--color-text-muted)",
        color: "#fff",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
