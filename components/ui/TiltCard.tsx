import { ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
}

export default function TiltCard({ children }: TiltCardProps) {
  return <>{children}</>;
}
