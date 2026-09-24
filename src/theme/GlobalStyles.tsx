import { GlobalStyles as MuiGlobalStyles } from '@mui/material';
import { toCssVars } from './palette';
import type { Palette } from './palette';
import { motion } from './index';

interface Props {
  palette: Palette;
}

/**
 * Глобальний шар: CSS-змінні, фокус-стани, скролбар, друк
 * і повага до prefers-reduced-motion.
 */
const GlobalStyles: React.FC<Props> = ({ palette }) => (
  <MuiGlobalStyles
    styles={{
      ':root': {
        ...toCssVars(palette),
        '--header-h': '68px',
        '--motion-fast': motion.fast,
        '--motion-base': motion.base,
        '--motion-slow': motion.slow,
        '--motion-ease': motion.ease,
      },

      html: {
        scrollBehavior: 'smooth',
        // щоб якірна навігація не ховала заголовок під фіксованим хедером
        scrollPaddingTop: 'calc(var(--header-h) + 16px)',
        WebkitTextSizeAdjust: '100%',
      },

      body: {
        backgroundColor: 'var(--c-bg)',
        color: 'var(--c-ink)',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
        overflowX: 'hidden',
      },

      '::selection': {
        backgroundColor: 'var(--c-accent-soft)',
        color: 'var(--c-ink)',
      },

      // Видимий фокус лише з клавіатури
      ':focus-visible': {
        outline: '2px solid var(--c-accent)',
        outlineOffset: '3px',
        borderRadius: '6px',
      },
      ':focus:not(:focus-visible)': { outline: 'none' },

      '*::-webkit-scrollbar': { width: 10, height: 10 },
      '*::-webkit-scrollbar-track': { background: 'var(--c-bg)' },
      '*::-webkit-scrollbar-thumb': {
        background: 'var(--c-border-strong)',
        borderRadius: 999,
        border: '2px solid var(--c-bg)',
      },
      '*::-webkit-scrollbar-thumb:hover': { background: 'var(--c-ink-faint)' },

      img: { maxWidth: '100%', display: 'block' },

      '.sr-only': {
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0 0 0 0)',
        whiteSpace: 'nowrap',
        border: 0,
      },

      // Посилання «перейти до вмісту» — з'являється лише під фокусом
      '.skip-link': {
        position: 'absolute',
        left: 16,
        top: -80,
        zIndex: 2000,
        padding: '10px 18px',
        borderRadius: 10,
        background: 'var(--c-accent)',
        color: 'var(--c-on-accent)',
        fontWeight: 600,
        transition: `top ${motion.base} ${motion.ease}`,
        '&:focus': { top: 16 },
      },

      '@media (prefers-reduced-motion: reduce)': {
        html: { scrollBehavior: 'auto' },
        '*, *::before, *::after': {
          animationDuration: '0.01ms !important',
          animationIterationCount: '1 !important',
          transitionDuration: '0.01ms !important',
          scrollBehavior: 'auto !important',
        },
      },

      '@media print': {
        'header, .no-print': { display: 'none !important' },
        body: { background: '#fff', color: '#000' },
        a: { textDecoration: 'underline' },
      },
    }}
  />
);

export default GlobalStyles;
