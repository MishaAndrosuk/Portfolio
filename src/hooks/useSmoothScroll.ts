import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const header = document.querySelector('header') || document.querySelector('.MuiAppBar-root');
      const headerHeight = header ? header.offsetHeight : 80;
      const additionalOffset = 20;
      const elementPosition = element.offsetTop - headerHeight - additionalOffset;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return { scrollToElement, scrollToTop };
};
