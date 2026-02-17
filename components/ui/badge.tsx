import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("badge", {
  variants: {
    variant: {
      default: "badge-default",
      secondary: "badge-default",
      primary: "badge-primary",
      accent: "badge-accent",
      success: "badge-success",
      destructive: "badge-error",
      outline: "badge-outline",
      info: "badge-info",
    },
    size: {
      default: "",
      lg: "badge-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
