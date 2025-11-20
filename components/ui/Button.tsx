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
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

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
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 relative overflow-hidden group';

  const variantStyles = {
    primary: 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold shadow-sm hover:shadow-md',
    secondary: 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow-md',
    outline: 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white',
  };

  const sizeStyles = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-9 py-4 text-lg font-bold',
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const ButtonContent = () => (
    <span>{children}</span>
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
    <button onClick={onClick} className={classes} type={type} disabled={disabled}>
      <ButtonContent />
    </button>
  );
}
