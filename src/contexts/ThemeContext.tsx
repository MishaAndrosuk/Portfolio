/* eslint-disable react-refresh/only-export-components --
   провайдер і його хук живуть поруч свідомо: це втрачає hot-reload лише для цього файлу */
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme, THEME_TRANSITION_MS } from '../theme';
import { lightPalette, darkPalette } from '../theme/palette';
import GlobalStyles from '../theme/GlobalStyles';
import type { ThemeContextType } from '../types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

/** Світла тема — типова; темну лишаємо як опцію і памʼятаємо вибір користувача. */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  const transitionTimer = useRef<number | undefined>(undefined);

  const palette = theme === 'light' ? lightPalette : darkPalette;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${theme}`);
    root.style.colorScheme = theme;
    localStorage.setItem('theme', theme);

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', palette.bg);
  }, [theme, palette.bg]);

  const value = useMemo<ThemeContextType>(
    () => ({
      theme,
      toggleTheme: () => {
        const next = theme === 'light' ? 'dark' : 'light';
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduced) {
          setTheme(next);
          return;
        }

        // Сучасні браузери: плавний перехід між «знімками» сторінки
        if (typeof document.startViewTransition === 'function') {
          document.startViewTransition(() => flushSync(() => setTheme(next)));
          return;
        }

        // Запасний варіант: на мить вмикаємо CSS-переходи кольорів для всіх елементів
        const root = document.documentElement;
        root.classList.add('theme-transition');
        setTheme(next);
        window.clearTimeout(transitionTimer.current);
        transitionTimer.current = window.setTimeout(
          () => root.classList.remove('theme-transition'),
          THEME_TRANSITION_MS
        );
      },
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        <GlobalStyles palette={palette} />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
