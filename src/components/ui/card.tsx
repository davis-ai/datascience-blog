import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className }: CardProps) {
  return <div className={`card ${className ?? ""}`}>{children}</div>;
}

function CardContent({ children, className }: CardProps) {
  return <div className={`card-content ${className ?? ""}`}>{children}</div>;
}

export { Card, CardContent };