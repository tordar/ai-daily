import { getCollection } from "astro:content";
import type { APIContext } from "astro";

// JSON Feed 1.1 — https://www.jsonfeed.org/version/1.1/
export async function GET(context: APIContext) {
  const digests = await getCollection("digests");
  const sorted = digests.sort((a, b) => b.data.date.localeCompare(a.data.date));
  const site = context.site!.toString().replace(/\/$/, "");

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "AI Daily Dev",
    home_page_url: `${site}/`,
    feed_url: `${site}/feed.json`,
    description: "Top developer-centric AI stories, curated daily.",
    icon: `${site}/logo.png`,
    favicon: `${site}/favicon.svg`,
    language: "en",
    authors: [
      {
        name: "AI Daily Dev",
        url: `${site}/about`,
      },
    ],
    items: sorted.map((entry) => {
      const { date, stories } = entry.data;
      const dayTitle = new Date(date + "T00:00:00").toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
      });
      const permalink = `${site}/digest/${date}/`;
      const contentHtml = stories.map((s) => {
        const bulletsHtml = Array.isArray(s.summary)
          ? `<ul>${s.summary.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`
          : `<p>${escapeHtml(s.summary)}</p>`;
        return `<h2><a href="${s.url}">${escapeHtml(s.title)}</a></h2>${bulletsHtml}`;
      }).join("");
      return {
        id: permalink,
        url: permalink,
        title: `AI Daily Dev — ${dayTitle}`,
        content_html: contentHtml,
        summary: stories.map((s) => s.title).join(" · "),
        image: `${site}/og/${date}.png`,
        banner_image: `${site}/og/${date}.png`,
        date_published: new Date(date + "T08:00:00+01:00").toISOString(),
        authors: [{ name: "AI Daily Dev", url: `${site}/about` }],
        tags: Array.from(new Set(stories.map((s) => s.tag))),
      };
    }),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/feed+json; charset=utf-8" },
  });
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
