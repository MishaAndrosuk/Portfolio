import { useEffect, useState } from 'react';

/**
 * Повертає id секції, що зараз у полі зору.
 * Використовується для підсвічування активного пункту меню.
 */
export const useActiveSection = (ids: readonly string[]): string => {
  const [active, setActive] = useState('');

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    // Вузька «смуга» трохи вище центру екрана: секція, що її перетинає, — активна
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
};
