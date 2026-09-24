import { useCallback } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/** Плавний скрол до секції з урахуванням висоти фіксованого хедера. */
export const useSmoothScroll = () => {
  const reducedMotion = usePrefersReducedMotion();
  const behavior: ScrollBehavior = reducedMotion ? 'auto' : 'smooth';

  const scrollToElement = useCallback(
    (elementId: string) => {
      const element = document.getElementById(elementId);
      if (!element) return;

      const headerHeight =
        document.querySelector('header')?.getBoundingClientRect().height ?? 68;

      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - headerHeight - 16,
        behavior,
      });
    },
    [behavior]
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior });
  }, [behavior]);

  return { scrollToElement, scrollToTop };
};
