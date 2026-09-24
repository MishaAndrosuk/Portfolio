/**
 * Єдине місце для «жорстких» даних сайту: посилання, файли, перемикачі секцій.
 * Змінюй тут — усе решта підтягнеться автоматично.
 */

/**
 * Перемикач секції «Проєкти».
 * false — секція не рендериться і зникає з навігації (код лишається в репозиторії).
 * Щоб повернути: постав true.
 */
export const SHOW_PROJECTS: boolean = false;

export const CONTACTS = {
  name: 'Андрощук Михайло',
  email: 'androsukmisa3@gmail.com',
  phone: '+380681263042',
  phoneDisplay: '+38 (068) 126-30-42',
  github: 'https://github.com/MishaAndrosuk',
  telegram: 'https://t.me/qwichsj',
  /** TODO: додати профіль LinkedIn — кнопка прихована, поки рядок порожній. */
  linkedin: '',
  location: 'Рівне, Україна',
} as const;

export const ASSETS = {
  // Ім'я файлу — точно як у репозиторії: хостинг на Linux чутливий до регістру
  cv: '/assets/Androshchuk-Mykhailo-CV.pdf',
  cvFileName: 'Androshchuk-Mykhailo-CV.pdf',
  avatar: {
    // Кадр 4:5 у кількох ширинах — браузер бере найдоречнішу під слот і DPR
    webpSrcSet: [304, 456, 608, 760]
      .map((w) => `/assets/images/avatar-${w}.webp ${w}w`)
      .join(', '),
    jpg: '/assets/images/avatar-760.jpg',
    width: 760,
    height: 950,
  },
} as const;

/** Період роботи — як у резюме. */
export const EMPLOYMENT_PERIOD = '02/2024 — 01/2026';

/**
 * Кількість років досвіду, яку показуємо в цифрах.
 * Підпис поруч відмінюється автоматично (ключ hero.stats.years з count).
 * Якщо міняєш — онови ще й текст у about.paragraphs, там число словами.
 */
export const YEARS_OF_EXPERIENCE = 2;

/** Порядок секцій у навігації. `id` збігається з id DOM-елемента секції. */
export const SECTION_IDS = [
  'about',
  'skills',
  'cloud',
  ...(SHOW_PROJECTS ? ['projects'] : []),
  'experience',
  'contact',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/**
 * Секції, за якими стежить спостерігач активного пункту меню.
 * Ширший за SECTION_IDS: hero і value не мають пунктів у навігації,
 * але поки вони на екрані жоден пункт не має бути підсвічений.
 */
export const OBSERVED_SECTION_IDS = ['hero', ...SECTION_IDS, 'value'] as const;
