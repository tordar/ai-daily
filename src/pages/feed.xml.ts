import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const digests = await getCollection("digests");
  const sorted = digests.sort((a, b) => b.data.date.localeCompare(a.data.date));
  const site = context.site!.toString().replace(/\/$/, "");

  return rss({
    title: "AI Daily Dev",
    description: "Top developer-centric AI stories, curated daily.",
    site: context.site!.toString(),
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      dc: "http://purl.org/dc/elements/1.1/",
      media: "http://search.yahoo.com/mrss/",
    },
    customData: [
      `<language>en</language>`,
      `<copyright>© ${new Date().getUTCFullYear()} AI Daily Dev</copyright>`,
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
      `<atom:link href="${site}/feed.xml" rel="self" type="application/rss+xml"/>`,
      `<image><url>${site}/logo.png</url><title>AI Daily Dev</title><link>${site}/</link></image>`,
    ].join(""),
    items: sorted.map((entry) => {
      const { date, stories } = entry.data;
      const dayTitle = new Date(date + "T00:00:00").toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
      });
      const storyTitles = stories.map((s) => s.title).join(" · ");
      return {
        title: `AI Daily Dev — ${dayTitle}`,
        description: storyTitles,
        link: `/digest/${date}/`,
        pubDate: new Date(date + "T08:00:00+01:00"),
        categories: ["AI", "Developer News", "Technology"],
        customData: [
          `<dc:creator><![CDATA[AI Daily Dev (edited by Tordar Tømmervik)]]></dc:creator>`,
          `<media:content url="${site}/og/${date}.png" medium="image" width="1200" height="630"/>`,
          `<media:thumbnail url="${site}/og/${date}.png" width="1200" height="630"/>`,
        ].join(""),
      };
    }),
  });
}
