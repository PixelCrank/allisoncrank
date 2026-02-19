'use client';

import { useRef, useEffect, ReactNode, ElementType, ComponentPropsWithoutRef, type Ref } from 'react';

type MagneticTextProps<TAs extends ElementType = 'div'> = {
  children: ReactNode;
  strength?: number;
  className?: string;
  as?: TAs;
} & Omit<ComponentPropsWithoutRef<TAs>, 'as' | 'children' | 'className'>;

export default function MagneticText<TAs extends ElementType = 'div'>({
  children,
  strength = 25,
  className = '',
  as,
  ...restProps
}: MagneticTextProps<TAs>) {
  const Component = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const currentPos = useRef({ x: 0, y: 0 });
  const springBackRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = Math.max(rect.width, rect.height);

        if (distance < maxDistance) {
          const intensity = 1 - distance / maxDistance;
          currentPos.current.x = (deltaX / maxDistance) * strength * intensity;
          currentPos.current.y = (deltaY / maxDistance) * strength * intensity;
          element.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
        }
      });
    };

    const handleMouseLeave = () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (springBackRef.current) cancelAnimationFrame(springBackRef.current);

      const springBack = () => {
        currentPos.current.x += (0 - currentPos.current.x) * 0.12;
        currentPos.current.y += (0 - currentPos.current.y) * 0.12;
        element.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
        if (Math.abs(currentPos.current.x) > 0.05 || Math.abs(currentPos.current.y) > 0.05) {
          springBackRef.current = requestAnimationFrame(springBack);
        } else {
          currentPos.current = { x: 0, y: 0 };
          element.style.transform = 'translate(0, 0)';
        }
      };
      springBackRef.current = requestAnimationFrame(springBack);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (springBackRef.current) cancelAnimationFrame(springBackRef.current);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <Component
      ref={ref as unknown as Ref<HTMLElement>}
      className={`${className} will-change-transform`}
      {...(restProps as unknown as ComponentPropsWithoutRef<TAs>)}
    >
      {children}
    </Component>
  );
}
