/**
 * Палітра — єдине джерело правди для кольорів.
 * Значення звідси потрапляють і в MUI-тему, і в CSS-змінні (--c-*),
 * тож достатньо змінити колір тут — оновиться весь сайт.
 *
 * Контраст перевірено на WCAG AA:
 *   ink / bg            13.1:1
 *   inkMuted / bg        6.2:1
 *   inkFaint / bg        5.0:1  (4.7:1 на surfaceAlt — теж AA)
 *   accent / bg          4.7:1
 *   #fff / accent        5.1:1
 *   accentAlt / bg       4.9:1
 */

export interface Palette {
  /** Основне тло сторінки (теплий off-white, не #fff) */
  bg: string;
  /** Тло «піднятих» поверхонь: картки, хедер */
  surface: string;
  /** Тло секцій-смуг, що чергуються з основним */
  surfaceAlt: string;
  /** Ледь помітна заливка: чіпи, іконкові бейджі */
  subtle: string;
  /** Основний текст */
  ink: string;
  /** Другорядний текст */
  inkMuted: string;
  /** Підписи, eyebrow-тексти */
  inkFaint: string;
  /** Межі */
  border: string;
  /** Сильніша межа (hover, фокус-рамки карток) */
  borderStrong: string;
  /** Акцент №1 — приглушений синій */
  accent: string;
  accentHover: string;
  /** Акцент №1 у вигляді прозорої заливки */
  accentSoft: string;
  /** Акцент №2 — теракота (дозовано: іконки, підкреслення) */
  accentAlt: string;
  accentAltSoft: string;
  /** Контрастний текст на акцентному тлі */
  onAccent: string;
  /** Тіні */
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
}

export const lightPalette: Palette = {
  bg: '#F7F6F3',
  surface: '#FDFCFA',
  surfaceAlt: '#F1EFEA',
  subtle: '#EAE7E0',
  ink: '#2B2B2B',
  inkMuted: '#5F5B55',
  inkFaint: '#6E6A63',
  border: '#E4E0D8',
  borderStrong: '#D3CEC4',
  accent: '#4A6FA5',
  accentHover: '#3D5C8C',
  accentSoft: 'rgba(74, 111, 165, 0.10)',
  accentAlt: '#9A5A46',
  accentAltSoft: 'rgba(154, 90, 70, 0.10)',
  onAccent: '#FFFFFF',
  shadowSm: '0 1px 2px rgba(43, 43, 43, 0.05)',
  shadowMd: '0 6px 20px rgba(43, 43, 43, 0.07)',
  shadowLg: '0 18px 44px rgba(43, 43, 43, 0.10)',
};

/** М'яка «вугільна» темна тема — не чорна, у тій самій теплій гамі. */
export const darkPalette: Palette = {
  bg: '#1B1A18',
  surface: '#232220',
  surfaceAlt: '#201F1D',
  subtle: '#2C2A27',
  ink: '#EDEAE4',
  inkMuted: '#B0ABA2',
  inkFaint: '#8C877E',
  border: '#33312D',
  borderStrong: '#45423D',
  accent: '#8FAEDC',
  accentHover: '#A7C0E6',
  accentSoft: 'rgba(143, 174, 220, 0.14)',
  accentAlt: '#D49B84',
  accentAltSoft: 'rgba(212, 155, 132, 0.14)',
  onAccent: '#14213A',
  shadowSm: '0 1px 2px rgba(0, 0, 0, 0.30)',
  shadowMd: '0 6px 20px rgba(0, 0, 0, 0.35)',
  shadowLg: '0 18px 44px rgba(0, 0, 0, 0.45)',
};

/** Перетворює палітру на набір CSS-змінних (--c-bg, --c-ink, …). */
export const toCssVars = (palette: Palette): Record<string, string> =>
  Object.fromEntries(
    Object.entries(palette).map(([key, value]) => [
      `--c-${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`,
      value,
    ])
  );
