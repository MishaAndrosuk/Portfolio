import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';
import { motion } from '../../theme';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface RevealProps extends BoxProps {
  /** Затримка появи в мс — для «сходинкової» появи сусідніх карток */
  delay?: number;
  /** Зміщення до появи */
  from?: 'up' | 'left' | 'right' | 'none';
  /** Наскільки елемент має зайти в екран, 0…1 */
  threshold?: number;
  /** Тривалість появи; для контенту «над згином» варто брати коротшу */
  duration?: string;
  /**
   * Показати одразу після монтування, не чекаючи перетину з екраном.
   * Для контенту над згином: у фоновій вкладці IntersectionObserver
   * дроселюється, і hero інакше лишався б порожнім.
   */
  onMount?: boolean;
}

const OFFSETS: Record<NonNullable<RevealProps['from']>, string> = {
  up: 'translate3d(0, 20px, 0)',
  left: 'translate3d(-20px, 0, 0)',
  right: 'translate3d(20px, 0, 0)',
  none: 'none',
};

/**
 * Плавна поява блоку під час скролу (Intersection Observer).
 * Спрацьовує один раз; за prefers-reduced-motion вміст показується одразу.
 */
const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  from = 'up',
  threshold = 0.15,
  duration = motion.slow,
  onMount = false,
  sx,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    if (onMount) {
      // rAF, щоб браузер устиг відрендерити початковий стан і програв перехід
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, threshold, onMount]);

  const shown = reducedMotion || visible;

  return (
    <Box
      ref={ref}
      sx={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : OFFSETS[from],
        transition: reducedMotion
          ? 'none'
          : `opacity ${duration} ${motion.ease} ${delay}ms, transform ${duration} ${motion.ease} ${delay}ms`,
        willChange: shown ? 'auto' : 'opacity, transform',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Reveal;
