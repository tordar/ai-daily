import { getCollection } from "astro:content";
import type { APIContext } from "astro";

// Google News sitemap — only includes articles from the last 48 hours.
// Spec: https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap
export async function GET(context: APIContext) {
  const digests = await getCollection("digests");
  const site = context.site!.toString().replace(/\/$/, "");

  const cutoff = Date.now() - 48 * 60 * 60 * 1000;
  const recent = digests
    .filter((d) => new Date(d.data.date + "T08:00:00+01:00").getTime() >= cutoff)
    .sort((a, b) => b.data.date.localeCompare(a.data.date));

  const urls = recent.map((entry) => {
    const { date } = entry.data;
    const dayTitle = new Date(date + "T00:00:00").toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric",
    });
    const publishedAt = new Date(date + "T08:00:00+01:00").toISOString();
    return `
  <url>
    <loc>${site}/digest/${date}/</loc>
    <news:news>
      <news:publication>
        <news:name>AI Daily Dev</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${publishedAt}</news:publication_date>
      <news:title>AI Daily Dev — ${dayTitle}</news:title>
    </news:news>
  </url>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${urls}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
