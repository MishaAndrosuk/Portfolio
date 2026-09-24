import { useEffect, useRef, useState } from 'react';

/** requestIdleCallback є не в усіх браузерах (зокрема в Safari донедавна) */
type IdleWindow = {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

/**
 * Відкладає рендер важкого блоку, не ризикуючи тим, що він не зʼявиться взагалі.
 *
 * Навіщо: сам по собі React.lazy нічого не відкладає — динамічний імпорт
 * стартує на першому ж рендері, тож чанк парситься під час завантаження
 * сторінки. Тому рендер вмикається за однією з двох умов:
 *
 *   1. блок наблизився до екрана (типовий шлях — користувач гортає вниз);
 *   2. браузер звільнився після завантаження сторінки (страхувальний шлях).
 *
 * Друга умова принципова: без неї збій спостерігача означав би, що блок
 * не зʼявиться ніколи — для форми контактів це неприпустимо.
 */
export const useDeferredRender = <T extends HTMLElement>(rootMargin = '400px') => {
  const ref = useRef<T>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;

    const el = ref.current;
    const observer = el
      ? new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setShouldRender(true);
          },
          { rootMargin }
        )
      : null;
    observer?.observe(el!);

    // Страхувальний шлях: чекаємо, поки сторінка завантажиться і головний потік звільниться
    const idleWindow = window as unknown as IdleWindow;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    const scheduleFallback = () => {
      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(() => setShouldRender(true), {
          timeout: 4000,
        });
      } else {
        timeoutHandle = window.setTimeout(() => setShouldRender(true), 2500);
      }
    };

    if (document.readyState === 'complete') {
      scheduleFallback();
    } else {
      window.addEventListener('load', scheduleFallback, { once: true });
    }

    return () => {
      observer?.disconnect();
      window.removeEventListener('load', scheduleFallback);
      if (idleHandle !== undefined) idleWindow.cancelIdleCallback?.(idleHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
    };
  }, [rootMargin, shouldRender]);

  return { ref, shouldRender };
};
