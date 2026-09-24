# Портфоліо — Андрощук Михайло

Односторінкове портфоліо Front-End розробника: React 19 + TypeScript + Vite + MUI 7,
три мови інтерфейсу (uk / en / de) через i18next.

## Запуск

```bash
npm install
npm run dev        # dev-сервер
npm run build      # продакшен-збірка в dist/
npm run preview    # локальний перегляд збірки
npm run lint
```

## Структура

```
src/
├── config/site.ts          # контакти, посилання, шляхи до файлів, прапорці секцій
├── theme/
│   ├── palette.ts          # ← ЄДИНЕ джерело кольорів (світла + темна тема)
│   ├── index.ts            # MUI-тема та токени руху (motion)
│   └── GlobalStyles.tsx    # CSS-змінні --c-*, фокус-стани, скролбар, друк
├── components/
│   ├── common/             # Reveal, Section, ScrollProgress, RoleRotator, TiltPhoto
│   ├── Hero, About, Skills, Cloud, Experience, Value, Contact, Header, Footer
│   └── Projects/           # вимкнена секція (див. нижче)
├── hooks/                  # useActiveSection, useScrollProgress, usePrefersReducedMotion, …
└── locales/{uk,en,de}/translation.json   # увесь текст сайту
```

## Як змінити кольори

Усі кольори лежать у `src/theme/palette.ts`. Змінюєш значення там — оновлюються
і MUI-компоненти, і CSS-змінні `--c-bg`, `--c-ink`, `--c-accent` тощо.
Контрастність поточної палітри перевірена на WCAG AA (див. коментар у файлі).

## Як повернути секцію «Проєкти»

У `src/config/site.ts`:

```ts
export const SHOW_PROJECTS: boolean = true;
```

Секція одразу зʼявиться на сторінці та в навігації. Поки прапорець `false`,
Vite вирізає код секції зі збірки. Дані проєктів — `src/data/projects.ts`,
тексти — ключ `projects` у файлах перекладу.

Компоненти `Projects/*` лишилися в оформленні попередньої версії сайту —
перед увімкненням їх варто привести до нової палітри й до компонента `Section`.

## Анімації

Усі переходи — 160–460 мс, токени в `src/theme/index.ts` (`motion`).
`prefers-reduced-motion: reduce` вимикає появу секцій, ефект друку, tilt-аватар
і плавний скрол — і на рівні компонентів, і глобально в `GlobalStyles.tsx`.

## Деплой на Netlify

1. Залий репозиторій на GitHub.
2. Netlify → **Add new site → Import an existing project** → вибери репозиторій.
3. Build command і publish directory Netlify підхопить із `netlify.toml` —
   міняти нічого не треба. Натискай **Deploy**.

Домен прописувати руками не потрібно: під час збірки Vite-плагін `siteMeta`
(див. `vite.config.ts`) бере адресу зі змінної `URL`, яку передає Netlify,
і підставляє її в `canonical`, Open Graph, `robots.txt` та `sitemap.xml`.
Для deploy preview гілки використовується `DEPLOY_PRIME_URL`, тож чернетки
не перетягують на себе canonical основного сайту.

Коли підключиш власний домен — просто зроби redeploy, адреса оновиться сама.

### Що вже налаштовано в `netlify.toml`

- Node 22 (Vite 7 не збереться на Node 18)
- Заголовки безпеки: CSP, `X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`
- Кешування: `/static/*` і `/fonts/*` — рік із `immutable`, `/assets/*` — доба
  (щоб оновлене резюме дійшло до відвідувачів), `index.html` — без кешу
- Власна сторінка 404 (`public/404.html`) — статична, працює навіть якщо JS не завантажився

SPA-редіректу навмисно немає: маршрутизації на клієнті немає, а catch-all
віддавав би код 200 на неіснуючі адреси, що для пошуковиків є soft-404.

### Docker (альтернатива)

`Dockerfile` + `docker-compose.yml` збирають застосунок і віддають його через nginx
на порту 3000. Заголовки з `netlify.toml` там не діють — їх треба задати в конфізі nginx.

## Продуктивність

Шрифт Inter — на власному хостингу (`public/fonts`), підключений через inline
`@font-face` в `index.html` з `unicode-range`: сторонній CSS від Google блокував
рендер приблизно на 900 мс. Текст hero навмисно рендериться без анімації появи —
елемент під `opacity: 0` не зараховується як LCP.

### Як правильно міряти Lighthouse

```bash
npm run perf          # збірка + preview на http://localhost:4173
```

Далі — Lighthouse по `http://localhost:4173`, обовʼязково в режимі інкогніто
або в чистому профілі Chrome (розширення сильно занижують результат).

**Продакшен-збірка:** Performance 90 · Accessibility 100 · Best Practices 100 · SEO 100.

На `npm run dev` тими самими інструментами виходить **25** (FCP 28 с, LCP 55 с):
Vite не мініфікує код, трансформує модулі на льоту і віддає source maps.
Ці цифри нічого не кажуть про сайт — міряти дев-сервер немає сенсу.
