import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Конфіг виконується в Node. Оголошуємо тільки те, що справді використовуємо,
// щоб не тягнути @types/node заради двох змінних середовища.
declare const process: { env: Record<string, string | undefined> };

/**
 * Підставляє реальну адресу сайту в canonical / Open Graph і генерує
 * robots.txt та sitemap.xml під час збірки.
 *
 * Netlify віддає адресу в змінних середовища: URL — основний домен,
 * DEPLOY_PRIME_URL — адреса deploy preview для гілки чи pull request.
 * Завдяки цьому домен не доводиться прописувати руками у трьох файлах.
 */
function siteMeta(): Plugin {
  const siteUrl = (
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    'http://localhost:4173'
  ).replace(/\/+$/, '');

  return {
    name: 'site-meta',
    transformIndexHtml: (html) => html.split('%SITE_URL%').join(siteUrl),
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          `  <url>\n` +
          `    <loc>${siteUrl}/</loc>\n` +
          `    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n` +
          `    <changefreq>monthly</changefreq>\n` +
          `    <priority>1.0</priority>\n` +
          `  </url>\n` +
          `</urlset>\n`,
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteMeta()],
  build: {
    // Хешований вихід збірки тримаємо окремо від статики з public/assets,
    // інакше на них не можна задати різні правила кешування
    assetsDir: 'static',
    rollupOptions: {
      output: {
        // Розділяємо вендорів: браузер парсить чанки паралельно,
        // а при оновленні коду сайту кеш бібліотек лишається чинним
        manualChunks: {
          react: ['react', 'react-dom'],
          mui: ['@mui/material', '@emotion/react', '@emotion/styled'],
          i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        },
      },
    },
  },
});
