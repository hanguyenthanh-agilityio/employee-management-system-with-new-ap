import { ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
}

const Card = ({ className, children }: CardProps) => (
  <div className={`bg-white rounded-xl shadow-sm ${className}`}>{children}</div>
);

export default Card;
