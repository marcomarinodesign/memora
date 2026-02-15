"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  > {
  variant?: ButtonVariant;
  children: ReactNode;
  type?: "button" | "submit";
  href?: string;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "cta-primary",
  secondary: "cta-secondary",
  ghost:
    "bg-transparent text-foreground hover:bg-muted rounded-full size-10 md:size-11",
};

export function Button({
  variant = "primary",
  children,
  onClick,
  type = "button",
  href,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const baseClass =
    "inline-flex items-center justify-center border-none transition-[background] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
  const classes = cn(baseClass, variantClasses[variant], className);

  if (href !== undefined) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
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
