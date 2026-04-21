// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

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
          return { ...item, lastmod: `${digestMatch[1]}T08:00:00+01:00` };
        }
        const weeklyMatch = url.match(/\/weekly\/(\d{4})-W(\d{2})\/?$/);
        if (weeklyMatch) {
          const [, year, week] = weeklyMatch;
          const jan4 = new Date(Date.UTC(Number(year), 0, 4));
          const jan4Day = jan4.getUTCDay() || 7;
          const weekStart = new Date(jan4.getTime() - (jan4Day - 1) * 86400000);
          const friday = new Date(weekStart.getTime() + ((Number(week) - 1) * 7 + 4) * 86400000);
          return { ...item, lastmod: friday.toISOString() };
        }
        const monthlyMatch = url.match(/\/monthly\/(\d{4})-(\d{2})\/?$/);
        if (monthlyMatch) {
          const [, year, month] = monthlyMatch;
          const lastDay = new Date(Date.UTC(Number(year), Number(month), 0));
          return { ...item, lastmod: lastDay.toISOString() };
        }
        return item;
      }
    })
  ]
});
