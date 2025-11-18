import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  const baseStyles = 'glass-card p-8 relative group';
  const hoverStyles = hover ? 'cursor-pointer' : '';

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
