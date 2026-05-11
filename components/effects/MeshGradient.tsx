'use client';

import { useReducedMotion } from 'framer-motion';

export default function MeshGradient() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 lg-mesh-bg pointer-events-none"
      style={{
        backgroundSize: '200% 200%',
        animation: reducedMotion ? 'none' : 'mesh-drift 30s ease-in-out infinite',
      }}
    />
  );
}
