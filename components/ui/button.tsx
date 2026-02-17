"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "accent"
  | "outline"
  | "danger";

type ButtonSize = "default" | "sm" | "lg" | "xl" | "icon";

interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  > {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  children: ReactNode;
  type?: "button" | "submit";
  href?: string;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  ghost: "btn btn-ghost",
  accent: "btn btn-accent",
  outline: "btn btn-outline",
  danger: "btn btn-danger",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "",
  sm: "btn-sm",
  lg: "btn-lg",
  xl: "btn-xl",
  icon: "btn-icon",
};

export function Button({
  variant = "primary",
  size = "default",
  block = false,
  children,
  onClick,
  type = "button",
  href,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const classes = cn(
    variantClasses[variant],
    sizeClasses[size],
    block && "btn-block",
    className
  );

  if (href !== undefined) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={
          onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>
        }
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
