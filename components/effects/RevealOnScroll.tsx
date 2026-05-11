'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeUp } from '@/lib/animations';

interface RevealOnScrollProps {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
  once?: boolean;
  margin?: string;
  as?: 'div' | 'section' | 'article' | 'header' | 'footer';
}

export default function RevealOnScroll({
  children,
  variants = fadeUp,
  delay = 0,
  className,
  once = true,
  margin = '-100px',
}: RevealOnScrollProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: margin as `-${number}px` | `${number}px` }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
