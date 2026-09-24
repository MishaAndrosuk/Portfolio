import { createTheme } from '@mui/material/styles';
import type { Theme, ThemeOptions } from '@mui/material/styles';
import { lightPalette, darkPalette } from './palette';
import type { Palette } from './palette';

/** Спільні токени руху — тримаємо анімації короткими й узгодженими. */
export const motion = {
  fast: '160ms',
  base: '260ms',
  slow: '460ms',
  /** «М'яке» сповільнення без перельоту — сучасно і не відволікає */
  ease: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
} as const;

const buildOptions = (p: Palette, mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: p.accent,
      dark: p.accentHover,
      contrastText: p.onAccent,
    },
    secondary: {
      main: p.accentAlt,
      contrastText: p.onAccent,
    },
    background: { default: p.bg, paper: p.surface },
    text: { primary: p.ink, secondary: p.inkMuted, disabled: p.inkFaint },
    divider: p.border,
  },

  shape: { borderRadius: 14 },

  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
    // Великі заголовки — щільний трекінг, помірна вага: сучасніше за 800
    h1: { fontSize: 'clamp(2.4rem, 1.7rem + 3vw, 4rem)', fontWeight: 650, lineHeight: 1.08, letterSpacing: '-0.03em' },
    h2: { fontSize: 'clamp(1.8rem, 1.4rem + 1.6vw, 2.6rem)', fontWeight: 640, lineHeight: 1.15, letterSpacing: '-0.02em' },
    h3: { fontSize: 'clamp(1.3rem, 1.15rem + 0.6vw, 1.6rem)', fontWeight: 620, lineHeight: 1.25, letterSpacing: '-0.01em' },
    h4: { fontSize: '1.2rem', fontWeight: 600, lineHeight: 1.3 },
    h5: { fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.35 },
    h6: { fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.4 },
    subtitle1: { fontSize: 'clamp(1rem, 0.95rem + 0.3vw, 1.15rem)', lineHeight: 1.65, color: p.inkMuted },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '0.925rem', lineHeight: 1.65 },
    // Дрібні «eyebrow»-підписи системним моноширинним: окремий веб-шрифт
    // заради кількох рядків не вартий зайвого запиту
    overline: {
      fontFamily: 'ui-monospace, SFMono-Regular, "Cascadia Mono", Menlo, Consolas, monospace',
      fontSize: '0.75rem',
      fontWeight: 500,
      letterSpacing: '0.12em',
      lineHeight: 1.4,
    },
    button: { textTransform: 'none', fontWeight: 550, letterSpacing: 0 },
  },

  // Плоскі, м'які тіні замість «важких» дефолтних
  shadows: [
    'none', p.shadowSm, p.shadowSm, p.shadowMd, p.shadowMd, p.shadowMd,
    p.shadowLg, p.shadowLg, p.shadowLg, p.shadowLg, p.shadowLg, p.shadowLg,
    p.shadowLg, p.shadowLg, p.shadowLg, p.shadowLg, p.shadowLg, p.shadowLg,
    p.shadowLg, p.shadowLg, p.shadowLg, p.shadowLg, p.shadowLg, p.shadowLg, p.shadowLg,
  ] as Theme['shadows'],

  components: {
    MuiTypography: {
      defaultProps: {
        // MUI типово рендерить subtitle як <h6>; для підзаголовків це ламає
        // послідовність заголовків (h1 → h6 → h2) і збиває навігацію скрінрідера
        variantMapping: { subtitle1: 'p', subtitle2: 'p' },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 20px',
          transition: `background-color ${motion.base} ${motion.ease}, border-color ${motion.base} ${motion.ease}, color ${motion.base} ${motion.ease}, transform ${motion.fast} ${motion.ease}`,
          '&:active': { transform: 'translateY(1px)' },
        },
        containedPrimary: {
          '&:hover': { backgroundColor: p.accentHover },
        },
        outlined: {
          borderColor: p.borderStrong,
          color: p.ink,
          '&:hover': { borderColor: p.accent, backgroundColor: p.accentSoft },
        },
        text: {
          '&:hover': { backgroundColor: p.accentSoft },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        outlined: { borderColor: p.border },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0, variant: 'outlined' },
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: p.surface,
          borderColor: p.border,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 500 },
        outlined: { borderColor: p.border, color: p.inkMuted },
      },
    },
    MuiLink: {
      defaultProps: { underline: 'none' },
      styleOverrides: {
        root: {
          color: p.accent,
          transition: `color ${motion.fast} ${motion.ease}`,
          '&:hover': { color: p.accentHover },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: `background-color ${motion.base} ${motion.ease}, color ${motion.base} ${motion.ease}`,
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: p.bg,
          '& fieldset': { borderColor: p.border },
          '&:hover fieldset': { borderColor: p.borderStrong },
          '&.Mui-focused fieldset': { borderColor: p.accent, borderWidth: 2 },
        },
        input: { color: p.ink },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: p.inkMuted,
          '&.Mui-focused': { color: p.accent },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        // Резервуємо рядок під помилку, щоб поля не стрибали під час валідації
        root: { marginLeft: 2, minHeight: '1.25em' },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: p.ink,
          // Текст мусить інвертуватися разом із фоном: у темній темі p.ink майже білий,
          // а типовий для MUI білий текст на ньому був би нечитабельним
          color: p.bg,
          fontSize: '0.8rem',
          borderRadius: 8,
        },
        arrow: { color: p.ink },
      },
    },
  },
});

export const lightTheme = createTheme(buildOptions(lightPalette, 'light'));
export const darkTheme = createTheme(buildOptions(darkPalette, 'dark'));
