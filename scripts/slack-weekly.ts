import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { getISOWeek } from "../src/lib/weeks.ts";

type Story = {
  title: string;
  summary: string | string[];
  url: string;
  image?: string;
  source: string;
  tag: string;
  significance: number;
};

type Digest = { date: string; stories: Story[] };

const DIGESTS_DIR = path.resolve("src/content/digests");
const SITE = process.env.SITE_URL ?? "https://ai-daily.dev";
const TOKEN = process.env.SLACK_BOT_TOKEN;
const CHANNEL = process.env.SLACK_CHANNEL_ID;
const DRY_RUN = process.argv.includes("--dry-run");
const WEEK_ARG = process.argv.find((a) => a.startsWith("--week="))?.split("=")[1];
const TOP_N = Number(process.env.TOP_N ?? 10);

function loadDigests(): Digest[] {
  return fs
    .readdirSync(DIGESTS_DIR)
    .filter((f) => f.endsWith(".yaml"))
    .map((f) => parse(fs.readFileSync(path.join(DIGESTS_DIR, f), "utf-8")) as Digest);
}

function currentISOWeek(): string {
  const now = new Date();
  const today = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}`;
  return getISOWeek(today);
}

function formatDateRange(dates: string[]): string {
  const sorted = [...dates].sort();
  const first = new Date(sorted[0] + "T00:00:00Z");
  const last = new Date(sorted[sorted.length - 1] + "T00:00:00Z");
  const monthDay = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  if (first.getUTCMonth() === last.getUTCMonth() && first.getUTCFullYear() === last.getUTCFullYear()) {
    return `${monthDay.format(first)}–${last.getUTCDate()}`;
  }
  return `${monthDay.format(first)} – ${monthDay.format(last)}`;
}

function escapeMrkdwn(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function stars(n: number): string {
  return "★".repeat(n) + "☆".repeat(Math.max(0, 5 - n));
}

function buildBlocks(week: string, digests: Digest[]) {
  const weekNum = Number(week.split("-W")[1]);
  const stories = digests.flatMap((d) => d.stories);
  stories.sort((a, b) => b.significance - a.significance);
  const top = stories.slice(0, TOP_N);
  const range = formatDateRange(digests.map((d) => d.date));
  const weeklyUrl = `${SITE}/weekly/${week}`;

  const blocks: Record<string, unknown>[] = [
    {
      type: "header",
      text: { type: "plain_text", text: `AI Daily Dev — Week ${weekNum}`, emoji: false },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `${range}  ·  ${digests.length} digest${digests.length === 1 ? "" : "s"}  ·  <${weeklyUrl}|weekly rollup ↗>`,
        },
      ],
    },
    { type: "divider" },
  ];

  top.forEach((story, i) => {
    const summaryText = Array.isArray(story.summary)
      ? story.summary.map((b) => `• ${escapeMrkdwn(b)}`).join("\n")
      : escapeMrkdwn(story.summary);
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${i + 1}. <${story.url}|${escapeMrkdwn(story.title)}>*\n${summaryText}`,
      },
    });
    blocks.push({
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `${stars(story.significance)}  ·  \`${story.tag}\`  ·  ${escapeMrkdwn(story.source)}`,
        },
      ],
    });
  });

  blocks.push({ type: "divider" });
  blocks.push({
    type: "context",
    elements: [
      { type: "mrkdwn", text: `<${weeklyUrl}|Open the full weekly rollup on ai-daily.dev →>` },
    ],
  });

  const fallback = `AI Daily Dev — Week ${weekNum} (${range}): top ${top.length} stories`;
  return { blocks, fallback };
}

async function postToSlack(payload: Record<string, unknown>) {
  const res = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(payload),
  });
  const data = (await res.json()) as { ok: boolean; error?: string; ts?: string; channel?: string };
  if (!data.ok) {
    throw new Error(`Slack API error: ${data.error ?? "unknown"}`);
  }
  return data;
}

async function main() {
  const week = WEEK_ARG ?? currentISOWeek();
  const all = loadDigests();
  const inWeek = all.filter((d) => getISOWeek(d.date) === week);

  if (inWeek.length === 0) {
    console.log(`No digests found for week ${week}. Nothing to post.`);
    return;
  }

  const { blocks, fallback } = buildBlocks(week, inWeek);
  const payload: Record<string, unknown> = {
    channel: CHANNEL,
    text: fallback,
    blocks,
    unfurl_links: false,
    unfurl_media: false,
  };

  if (DRY_RUN) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  if (!TOKEN || !CHANNEL) {
    throw new Error(
      "SLACK_BOT_TOKEN and SLACK_CHANNEL_ID must be set. Pass --dry-run to preview without posting.",
    );
  }

  const data = await postToSlack(payload);
  console.log(`Posted to ${data.channel} (ts=${data.ts}): ${fallback}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
