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
          const moveX = (deltaX / maxDistance) * strength * intensity;
          const moveY = (deltaY / maxDistance) * strength * intensity;
          element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      });
    };

    const handleMouseLeave = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      element.style.transform = 'translate(0, 0)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <Component
      ref={ref as unknown as Ref<HTMLElement>}
      className={`${className} transition-transform duration-300 ease-out will-change-transform`}
      {...(restProps as unknown as ComponentPropsWithoutRef<TAs>)}
    >
      {children}
    </Component>
  );
}
