import type { Variants, Transition } from 'framer-motion';

export const ease = [0.16, 1, 0.3, 1] as const;

export const easeSpring: Transition = {
  type: 'spring',
  damping: 22,
  stiffness: 180,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease },
  },
};

export const stagger = (gap = 0.08, delay = 0.1): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease },
  },
};

export const breathing: Variants = {
  show: {
    scale: [1, 1.015, 1],
    transition: { duration: 4, ease: 'easeInOut' as const, repeat: Infinity },
  },
};

export const magneticHover = {
  whileHover: { scale: 1.04, transition: easeSpring },
  whileTap: { scale: 0.97 },
};
