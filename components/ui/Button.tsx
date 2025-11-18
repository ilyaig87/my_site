import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  external?: boolean;
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  external = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 relative overflow-hidden group';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white hover:from-blue-500 hover:via-cyan-500 hover:to-cyan-400 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 hover:-translate-y-1',
    secondary: 'bg-gradient-to-r from-slate-700 to-slate-900 text-white hover:from-slate-600 hover:to-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-1',
    outline: 'border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:border-blue-500 hover:text-blue-400 backdrop-blur-sm',
  };

  const sizeStyles = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-9 py-4 text-lg font-bold',
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const ButtonContent = () => (
    <>
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ButtonContent />
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        <ButtonContent />
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      <ButtonContent />
    </button>
  );
}
