"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useRef } from "react";

/** Button with hover (scale 1.02) and tap (scale 0.98). Does not block form submit. */
export function MotionButton({
  children,
  className,
  style,
  type = "button",
  ...props
}: ComponentPropsWithoutRef<typeof motion.button>) {
  return (
    <motion.button
      type={type}
      className={className}
      style={style}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Offset from viewport edge to trigger (e.g. "0.1" = 10% visible). Default 0.15 */
  amount?: number;
  /** Vertical offset in px for slide-up. Default 24 */
  yOffset?: number;
  /** Animation duration in seconds. Default 0.35 */
  duration?: number;
}

/** Animates children when they enter the viewport. Runs once (no loop). */
export function ScrollReveal({
  children,
  className,
  style,
  amount = 0.15,
  yOffset = 24,
  duration = 0.35,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: yOffset }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
    >
      {children}
    </motion.div>
  );
}

export { motion, AnimatePresence };
