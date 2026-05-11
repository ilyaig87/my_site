import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface GlassPillProps {
  children: ReactNode;
  dot?: boolean;
  dotColor?: 'primary' | 'green' | 'cool' | 'warm';
  className?: string;
}

const dotColorClass = {
  primary: 'bg-[var(--accent)]',
  green: 'bg-emerald-400',
  cool: 'bg-slate-400',
  warm: 'bg-[var(--accent-deep)]',
};

export default function GlassPill({
  children,
  dot = false,
  dotColor = 'primary',
  className,
}: GlassPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 px-3 py-1 text-[10px] font-light uppercase tracking-[0.25em] text-[var(--text-muted)] border border-[var(--border)]',
        className
      )}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full', dotColorClass[dotColor])}
          style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
        />
      )}
      {children}
    </span>
  );
}
