'use client';

import { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import TiltCard from './TiltCard';

type Variant = 'shallow' | 'default' | 'deep';
type Glow = 'primary' | 'cool' | 'warm' | 'green' | 'none';
type Squircle = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface GlassCardProps {
  children: ReactNode;
  variant?: Variant;
  glow?: Glow;
  squircle?: Squircle;
  tilt?: boolean;
  className?: string;
  as?: 'div' | 'article' | 'section' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

const variantClass: Record<Variant, string> = {
  shallow: 'lg-surface lg-shallow',
  default: 'lg-surface',
  deep: 'lg-surface lg-deep',
};

const glowClass: Record<Glow, string> = {
  primary: 'lg-glow-primary',
  cool: 'lg-glow-cool',
  warm: 'lg-glow-warm',
  green: 'lg-glow-green',
  none: '',
};

const squircleClass: Record<Squircle, string> = {
  sm: 'squircle-sm',
  md: 'squircle-md',
  lg: 'squircle-lg',
  xl: 'squircle-xl',
  '2xl': 'squircle-2xl',
};

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  {
    children,
    variant = 'default',
    glow = 'none',
    squircle = 'lg',
    tilt = false,
    className,
    as: Tag = 'div',
    href,
    target,
    rel,
    onClick,
  },
  ref
) {
  const classes = cn(
    variantClass[variant],
    squircleClass[squircle],
    glow !== 'none' && glowClass[glow],
    className
  );

  const inner = <div className="relative z-10">{children}</div>;

  if (Tag === 'a' && href) {
    return (
      <a ref={ref as never} href={href} target={target} rel={rel} className={classes} onClick={onClick}>
        {tilt ? <TiltCard>{inner}</TiltCard> : inner}
      </a>
    );
  }

  const Element = Tag as 'div';
  return (
    <Element ref={ref as never} className={classes} onClick={onClick}>
      {tilt ? <TiltCard>{inner}</TiltCard> : inner}
    </Element>
  );
});

export default GlassCard;
