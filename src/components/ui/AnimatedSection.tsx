"use client";

import { type ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export function AnimatedSection({
  children,
  className,
  id,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={shouldReduce ? false : { opacity: 0, y: 40 }}
      animate={shouldReduce ? undefined : (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 })}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.section>
  );
}

export function AnimatedDiv({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduce ? false : { opacity: 0, y: 30 }}
      animate={shouldReduce ? undefined : (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 })}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
