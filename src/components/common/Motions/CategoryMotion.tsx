"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

type SlideInProps = {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  className?: string;
};

// Wrap your animation components with LazyMotion
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function SlideIn({ children, direction = "left", delay = 0, className }: SlideInProps) {
  const xDirection = {
    left: -50,
    right: 50,
    up: 0,
    down: 0
  };

  const yDirection = {
    left: 0,
    right: 0,
    up: -50,
    down: 50
  };

  return (
    <m.div
      initial={{ 
        opacity: 0, 
        x: xDirection[direction], 
        y: yDirection[direction] 
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, delay }}
      viewport={{ once: false }}
      className={className}
    >
      {children}
    </m.div>
  );
}