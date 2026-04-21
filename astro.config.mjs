// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

const latestDigestDate = (() => {
  try {
    const files = fs.readdirSync(path.resolve('./src/content/digests'))
      .filter((f) => f.endsWith('.yaml'))
      .map((f) => f.replace(/\.yaml$/, ''))
      .sort();
    return files[files.length - 1] ?? null;
  } catch {
    return null;
  }
})();

const nowIso = new Date().toISOString();

function capAtNow(iso) {
  return new Date(iso).getTime() > Date.now() ? nowIso : iso;
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ai-daily.dev',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      serialize(item) {
        const url = item.url;
        const digestMatch = url.match(/\/digest\/(\d{4}-\d{2}-\d{2})\/?$/);
        if (digestMatch) {
          return { ...item, lastmod: capAtNow(`${digestMatch[1]}T08:00:00+01:00`) };
        }
        const weeklyMatch = url.match(/\/weekly\/(\d{4})-W(\d{2})\/?$/);
        if (weeklyMatch) {
          const [, year, week] = weeklyMatch;
          const jan4 = new Date(Date.UTC(Number(year), 0, 4));
          const jan4Day = jan4.getUTCDay() || 7;
          const weekStart = new Date(jan4.getTime() - (jan4Day - 1) * 86400000);
          const friday = new Date(weekStart.getTime() + ((Number(week) - 1) * 7 + 4) * 86400000);
          return { ...item, lastmod: capAtNow(friday.toISOString()) };
        }
        const monthlyMatch = url.match(/\/monthly\/(\d{4})-(\d{2})\/?$/);
        if (monthlyMatch) {
          const [, year, month] = monthlyMatch;
          const lastDay = new Date(Date.UTC(Number(year), Number(month), 0));
          return { ...item, lastmod: capAtNow(lastDay.toISOString()) };
        }
        // Homepage and archive reflect the latest digest.
        if (latestDigestDate && (/\/$/.test(new URL(url).pathname) && new URL(url).pathname === '/')) {
          return { ...item, lastmod: capAtNow(`${latestDigestDate}T08:00:00+01:00`) };
        }
        if (latestDigestDate && /\/archive\/?$/.test(new URL(url).pathname)) {
          return { ...item, lastmod: capAtNow(`${latestDigestDate}T08:00:00+01:00`) };
        }
        return item;
      }
    })
  ]
});
