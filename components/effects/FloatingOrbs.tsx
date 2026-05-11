'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function FloatingOrbs() {
  const reducedMotion = useReducedMotion();

  const orbs = [
    {
      key: 'yellow',
      className: 'lg-orb',
      style: {
        top: '5%',
        right: '8%',
        width: '560px',
        height: '560px',
        background: 'radial-gradient(circle, var(--primary) 0%, transparent 65%)',
        opacity: 0.35,
        filter: 'blur(80px)',
      },
      animate: { y: [0, -40, 20, 0], x: [0, 20, -10, 0] },
      duration: 24,
    },
    {
      key: 'violet',
      className: 'lg-orb',
      style: {
        bottom: '10%',
        left: '2%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, var(--accent-cool) 0%, transparent 65%)',
        opacity: 0.22,
        filter: 'blur(90px)',
      },
      animate: { y: [0, 30, -20, 0], x: [0, -25, 15, 0] },
      duration: 28,
    },
    {
      key: 'pink',
      className: 'lg-orb',
      style: {
        top: '50%',
        right: '38%',
        width: '420px',
        height: '420px',
        background: 'radial-gradient(circle, var(--accent-warm) 0%, transparent 65%)',
        opacity: 0.18,
        filter: 'blur(100px)',
      },
      animate: { y: [0, -25, 35, 0], x: [0, 30, -20, 0] },
      duration: 32,
    },
  ];

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.key}
          className={orb.className}
          style={orb.style}
          animate={reducedMotion ? undefined : orb.animate}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
