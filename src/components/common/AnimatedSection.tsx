import React from 'react';
import { useScrollReveal, RevealVariant } from '../../hooks/useScrollReveal';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: keyof JSX.IntrinsicElements;
  threshold?: number;
}

/**
 * Drop-in wrapper that reveals its children on scroll.
 * Uses useScrollReveal under the hood — GPU-friendly transform + opacity only.
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  variant = 'fadeUp',
  delay = 0,
  duration = 0.75,
  stagger = 0,
  as: Tag = 'div',
  threshold = 0.12,
}) => {
  const ref = useScrollReveal<HTMLDivElement>({ variant, delay, duration, stagger, threshold });

  return (
    // @ts-ignore – dynamic tag
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

