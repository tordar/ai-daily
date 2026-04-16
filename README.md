# ai-daily.dev

A daily AI news digest for developers. Top stories curated automatically by Claude, published every weekday at 08:00 CET.

**Live site:** [ai-daily.dev](https://ai-daily.dev)

## What it does

Every weekday morning, a Claude Code routine searches 20+ sources for the most important AI developer news — new model releases, features from major AI companies, trending GitHub repos, community buzz on Reddit/HN, and viral stories. It picks the top 5-7, writes concise summaries, and publishes them to the site.

## Features

- **Daily digest** with ranked, summarized stories
- **Weekly and monthly rollups** ranked by significance
- **Archive** to browse past digests
- **Keyboard navigation** — arrow keys, `d`/`w`/`m`/`a` to jump between views, `?` for help
- **Dark/light theme** toggle with `t`
- **Dynamic OG images** generated per digest with Satori
- **RSS feed** at `/feed.xml`
- **Zero JavaScript shipped** (except keyboard nav and theme toggle)

## Stack

- [Astro](https://astro.build) with content collections
- [Tailwind CSS v4](https://tailwindcss.com)
- [Geist Sans](https://vercel.com/font)
- [Satori](https://github.com/vercel/satori) + [@resvg/resvg-js](https://github.com/nicolo-ribaudo/resvg-js) for OG images
- Deployed on [Vercel](https://vercel.com)
- Automated via [Claude Code Routines](https://claude.ai/code/routines)

## How it works

```
Claude Code Routine (weekdays 08:00 CET)
  ├── Searches web for AI news (web_search + web_fetch)
  ├── Reads sources.yaml for source list
  ├── Reads routine-prompt.md for curation instructions
  ├── Writes src/content/digests/YYYY-MM-DD.yaml
  ├── Generates OG image to public/og/YYYY-MM-DD.png
  ├── git push
  └── Vercel auto-deploys (~30s)
```

## Project structure

```
src/
  content/digests/    # One .yaml file per day
  components/         # Header, Footer, StoryCard, DateNav, ShortcutBar
  layouts/            # Base.astro (HTML shell, meta tags, schema)
  pages/              # index, digest/[date], weekly/[week], monthly/[month], archive, feed.xml
  scripts/            # Keyboard navigation
  lib/                # OG image generator, week calculation utils
sources.yaml          # Configurable news sources
routine-prompt.md     # Instructions for the daily routine
```

## Configuring sources

Edit `sources.yaml` to add or remove news sources. Each source has a name, URL, type (`fetch`/`search`), priority (1-3), and optional notes.

## Local development

```bash
npm install
npm run dev        # Start dev server at localhost:4321
npm run build      # Generate OG images + build site
npm run build:og   # Generate OG images only
```

## Adding a digest manually

Create `src/content/digests/YYYY-MM-DD.yaml`:

```yaml
date: "2026-04-17"
stories:
  - title: "Story headline"
    summary: "2-3 sentence summary with specific details."
    url: "https://source-url.com/article"
    source: "source-url.com"
    tag: "models"
    significance: 5
```

Tags: `models`, `tools`, `research`, `industry`, `open-source`, `frameworks`, `community`

Significance: 1 (minor) to 5 (everyone is talking about it)

## License

MIT
