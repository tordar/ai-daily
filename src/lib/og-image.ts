import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs";
import path from "node:path";

interface Story {
  title: string;
  tag: string;
}

const TAG_COLORS: Record<string, string> = {
  models: "#00ff88",
  tools: "#3b82f6",
  research: "#f59e0b",
  industry: "#ef4444",
  "open-source": "#8b5cf6",
  frameworks: "#a855f7",
  community: "#06b6d4",
};

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

export async function generateOgImage(date: string, stories: Story[]): Promise<Buffer> {
  const dateObj = new Date(date + "T00:00:00");
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Load Geist Sans font
  const fontRegular = fs.readFileSync(
    path.resolve("node_modules/@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff")
  );
  const fontBold = fs.readFileSync(
    path.resolve("node_modules/@fontsource/geist-sans/files/geist-sans-latin-700-normal.woff")
  );

  const topStories = stories.slice(0, 5);

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a0a",
          padding: "60px",
          fontFamily: "Geist Sans",
        },
        children: [
          // Header
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "40px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: { display: "flex", alignItems: "baseline" },
                    children: [
                      {
                        type: "span",
                        props: {
                          style: {
                            color: "#00ff88",
                            fontSize: "32px",
                            fontWeight: 700,
                            letterSpacing: "-0.5px",
                          },
                          children: "AI DAILY",
                        },
                      },
                      {
                        type: "span",
                        props: {
                          style: {
                            color: "#444",
                            fontSize: "32px",
                            fontWeight: 400,
                          },
                          children: " / DEV",
                        },
                      },
                    ],
                  },
                },
                {
                  type: "span",
                  props: {
                    style: {
                      color: "#777",
                      fontSize: "24px",
                    },
                    children: formattedDate,
                  },
                },
              ],
            },
          },
          // Divider
          {
            type: "div",
            props: {
              style: {
                width: "100%",
                height: "1px",
                backgroundColor: "#1a1a2e",
                marginBottom: "36px",
              },
            },
          },
          // Stories
          ...topStories.map((story, i) => ({
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                marginBottom: "24px",
              },
              children: [
                {
                  type: "span",
                  props: {
                    style: {
                      color: "rgba(0, 255, 136, 0.3)",
                      fontSize: "24px",
                      fontWeight: 700,
                      width: "36px",
                      flexShrink: 0,
                    },
                    children: String(i + 1).padStart(2, "0"),
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    },
                    children: [
                      {
                        type: "span",
                        props: {
                          style: {
                            color: "#e0e0e0",
                            fontSize: "22px",
                            fontWeight: 700,
                            letterSpacing: "-0.3px",
                            lineHeight: "1.3",
                          },
                          children: truncate(story.title, 65),
                        },
                      },
                      {
                        type: "span",
                        props: {
                          style: {
                            color: TAG_COLORS[story.tag] ?? "#666",
                            fontSize: "13px",
                            textTransform: "uppercase" as const,
                            letterSpacing: "1px",
                          },
                          children: story.tag,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          })),
          // Footer
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                marginTop: "auto",
                borderTop: "1px solid #1a1a2e",
                paddingTop: "20px",
              },
              children: [
                {
                  type: "span",
                  props: {
                    style: { color: "#444", fontSize: "16px" },
                    children: "ai-daily.dev",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist Sans", data: fontRegular, weight: 400, style: "normal" as const },
        { name: "Geist Sans", data: fontBold, weight: 700, style: "normal" as const },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
  });
  return Buffer.from(resvg.render().asPng());
}
