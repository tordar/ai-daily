# AI Daily Dev — Daily Digest Routine

**Model: Claude Opus.** Run `/model opus` before starting this routine — it involves cross-source ranking, editorial judgement, and concise writing, all of which benefit from Opus over Sonnet.

You are generating today's digest for ai-daily.dev, a developer-focused AI news site.

## Philosophy

The best digest reflects what developers are ACTUALLY talking about, not just what companies announce. Community reaction matters more than press release prestige — but a frontier lab shipping a new product or model is inherently news even before HN catches fire. Balance both.

The ideal mix for each daily digest:
- 2-3 stories where the community is genuinely excited (HN front page, Reddit hot, viral tweet, YouTube videos getting views)
- 1-2 major releases or announcements (always include frontier lab launches; see "Mandatory coverage" below)
- 1 trending GitHub repo or tool
- 1 interesting take, thread, or video that reframes how developers think about AI

## Mandatory coverage

Before publishing, you MUST have reviewed every post since the last digest date on:
- `anthropic.com/news` (Anthropic)
- `openai.com/news` (OpenAI)
- `deepmind.google/discover/blog/` (Google DeepMind)
- `blog.google` (Google — AI-related posts only)
- `x.ai/news` (xAI)
- `ai.meta.com/blog/` (Meta AI)

Any **new product launch, new model, new API, or major capability release** from these labs is mandatory inclusion regardless of community signal. Community buzz may lag an announcement by a day or two — don't penalize a story for being fresh. Minor version bumps, hiring posts, and policy/safety essays are NOT mandatory.

**How to check these sources.** Most frontier-lab index pages block WebFetch with 403 (anthropic.com/news, openai.com/news, x.ai/news, ai.meta.com/blog in particular). Do NOT waste retries on WebFetch — use WebSearch with site-restricted queries like:

- `site:anthropic.com/news "April 2026"`
- `site:openai.com/index "April 2026"` (new posts live under `/index/` or `/news/`)
- `site:deepmind.google/blog "April 2026"`
- `site:x.ai/news OR site:docs.x.ai April 2026`
- `site:ai.meta.com/blog "April 2026"`

The search snippet gives you titles + dates; cite the lab's official URL in the digest. Only use WebFetch for Hacker News and GitHub pages, which tend to allow it.

## How to rank stories

**Signal strength matters more than source prestige.** Use this hierarchy:

1. **Multiple communities talking about it** (HN + Reddit + Twitter + YouTube = top story)
2. **Frontier lab product/model launch** from Anthropic, OpenAI, Google DeepMind, xAI, or Meta AI — inherently top-tier, even if community reaction is still forming
3. **YouTube creator made a dedicated video** (Fireship, AI Explained, Matthew Berman covering it = clearly significant)
4. **HN front page or Reddit top post** with 100+ comments (genuine developer interest)
5. **Trending GitHub repo** with high star velocity this week
6. **Major release** from any other company that developers can use today (not "coming soon", not "in beta for 50 orgs")
7. **Official blog post** with no visible community reaction (lowest priority — include only if genuinely impactful)

## What to look for

1. **What the community is buzzing about** — check HN, Reddit, X/Twitter FIRST
2. **YouTube AI creators** — if Fireship, AI Explained, Matthew Berman, ThePrimeagen, or Wes Roth posted a video about something, it's news. Include the YouTube link as the source URL when the video IS the story.
3. **Trending repos and tools** — GitHub trending, Trendshift, HuggingFace trending models
4. **New releases developers can actually use** — shipped products, not announcements
5. **Viral demos, threads, or takes** — sometimes a tweet or demo is the story

## What to skip

- **Anything older than 48 hours** — blog posts summarizing weeks/months of growth are NOT news
- **Press releases with no community signal** — if nobody's talking about it, it's not a top story (EXCEPT frontier lab launches — see "Mandatory coverage")
- "Coming soon" announcements — wait until it ships
- Funding rounds (unless they change the competitive landscape)
- Opinion pieces without substance
- Minor version bumps

## Process

1. Read `sources.yaml` in this repo for the full source list
2. **Check frontier lab blogs first** (Anthropic, OpenAI, DeepMind, xAI, Meta AI — see "Mandatory coverage"). Identify every new post since the previous digest's date and flag any product/model/API launch for inclusion.
3. **Then community sources**: search HN, Reddit, X/Twitter for today's AI buzz
4. **Check YouTube creators**: search for new videos from the creators in sources.yaml
5. **Check GitHub trending**: look for AI/ML repos with high star velocity
6. **Other official sources**: other company blogs and changelogs — use to add context or surface mid-tier releases
7. Collect 20+ candidates from across all categories
8. Rank using the hierarchy above
9. Select top 5-7 stories with a good mix. Before finalizing, verify every mandatory-coverage lab has been checked and that any qualifying launch is present.
10. Write titles and summaries per the craft rules below. Keep summaries to 2-3 sentences (4 only if the extra sentence adds irreplaceable signal), with 2-3 concrete numbers — not every number you found.
11. For YouTube stories, link to the video. For Reddit/HN stories, link to the discussion. For repos, link to GitHub. Only link to official blog posts when they're the primary source.
12. Assign tags: models, tools, research, industry, open-source, frameworks, community
13. Assign significance 1-5 (5 = multiple communities buzzing about this, OR a frontier lab shipping a headline product/model)

## Superseded stories — CRITICAL

After writing today's digest, scan this week's earlier digests (in `src/content/digests/`) for stories that today's news makes obsolete:
- Rumor → actual launch (downgrade the rumor to significance 1)
- Old benchmark → beaten by new model (downgrade the old story)
- "Expected to ship" → actually shipped (downgrade the expectation)

Edit the earlier digest file to reduce significance to 1 for any superseded story.

## Title and summary craft

**Titles must be readable at a glance.** Read each title aloud before accepting it.
- Avoid 3+ comma-separated items, especially when items share a noun ("Grok 4.3 Beta, Grok Computer Private Beta, Grok STT/TTS APIs" is unreadable).
- One colon or em-dash maximum. Not both.
- Lead with the subject and the verb — "Anthropic Launches Claude Design" beats "Introducing Claude Design: Anthropic's New Design Product."
- When a story bundles several sub-releases, pick the headline item and mention the rest in the summary.

**Summaries are bullet points, not prose.** Write the `summary` field as a YAML list of 3–5 short bullets. Each bullet is one fact — what shipped, a key number, a signal. No bullet should run longer than a single line on a typical screen. Skip connective prose ("meanwhile," "the company also"); just list the facts. Pick the 2–3 most concrete numbers total and drop the rest.

Example:
```yaml
summary:
  - "New Anthropic Labs product for prototypes, slides, and mockups."
  - "Onboarding reads your codebase and design files to auto-build a team design system."
  - "Powered by Opus 4.7; research preview for Pro/Max/Team/Enterprise."
  - "HN reaction thread: 375 points, 243 comments."
```

## Output

Write the digest to `src/content/digests/YYYY-MM-DD.yaml` using today's date:

```yaml
date: "YYYY-MM-DD"
stories:
  - title: "Concise headline"
    summary:
      - "Bullet 1 — one fact, one line."
      - "Bullet 2 — a key number or benchmark."
      - "Bullet 3 — community signal (HN pts, stars)."
    url: "https://primary-source-url"
    source: "domain.com"
    tag: "models"
    significance: 5
  # ... more stories (5-7 total)
```

Then generate the OG image and commit:
```bash
npm run build:og
git add src/content/digests/ public/og/
git commit -m "digest: YYYY-MM-DD"
git push origin HEAD:main
```

**Important:** always push to `main` explicitly with `HEAD:main`. Cloud runners may check out a sandbox branch (e.g. `claude/*`) whose default upstream is NOT `main`. A plain `git push` pushes to that sandbox branch and the site never updates. `git push origin HEAD:main` forces the commit onto the `main` branch regardless of the local branch name. If the push is rejected as non-fast-forward, run `git fetch origin main && git rebase origin/main` and try the push again.

## Newsletter

The weekly newsletter is handled by a separate Friday routine — see `routine-newsletter.md`.
