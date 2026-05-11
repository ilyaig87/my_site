'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'glass' | 'ghost' | 'secondary' | 'outline' | 'accent';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  onClick?: () => void;
  className?: string;
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  magnetic?: boolean;
  glow?: 'primary' | 'green' | 'cool' | 'warm' | 'none';
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)] focus-visible:ring-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed will-change-transform';

const sizeMap: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm rounded-full',
  md: 'px-7 py-3 text-[15px] rounded-full',
  lg: 'px-9 py-4 text-base rounded-full',
};

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  external = false,
  type = 'button',
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const variantClass = (() => {
    switch (variant) {
      case 'primary':
        // Confident neutral CTA — ink-on-cream in light, cream-on-ink in dark
        return 'bg-[var(--ink)] text-[var(--bg-base)] hover:bg-[var(--ink)]/90 border border-[var(--ink)] shadow-[0_8px_24px_-12px_rgba(14,20,32,0.45)] hover:shadow-[0_14px_30px_-12px_rgba(14,20,32,0.55)] hover:-translate-y-0.5';
      case 'accent':
        // Deep teal CTA — sophisticated technical pop
        return 'bg-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-bright)] border border-[var(--accent-deep)] shadow-[0_12px_28px_-10px_color-mix(in_oklab,var(--accent)_60%,transparent)] hover:shadow-[0_18px_40px_-10px_color-mix(in_oklab,var(--accent)_70%,transparent)] hover:-translate-y-0.5';
      case 'glass':
      case 'outline':
      case 'secondary':
        return 'bg-transparent text-[var(--text-strong)] border border-[var(--border-strong)] hover:border-[var(--ink)] hover:bg-[var(--ink)]/[0.04]';
      case 'ghost':
        return 'bg-transparent text-[var(--text-muted)] hover:text-[var(--text-strong)]';
    }
  })();

  const classes = cn(base, sizeMap[size], variantClass, fullWidth && 'w-full', className);

  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} type={type} disabled={disabled} suppressHydrationWarning>
      {children}
    </button>
  );
}
