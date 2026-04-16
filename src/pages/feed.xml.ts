import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const digests = await getCollection("digests");
  const sorted = digests.sort((a, b) => b.data.date.localeCompare(a.data.date));

  return rss({
    title: "AI Daily Dev",
    description: "Top developer-centric AI stories, curated daily by Claude.",
    site: context.site!.toString(),
    items: sorted.map((entry) => ({
      title: `AI Daily Dev — ${entry.data.date}`,
      description: entry.data.stories.map((s) => s.title).join(" · "),
      link: `/digest/${entry.data.date}`,
      pubDate: new Date(entry.data.date + "T08:00:00+02:00"),
    })),
  });
}
