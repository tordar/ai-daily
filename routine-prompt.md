# AI Daily Dev — Daily Digest Routine

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

**Summaries must be tight.** 2-3 sentences is the default, 4 only when a fourth sentence adds signal nothing else provides. Pick the 2-3 most concrete numbers and cut the rest — every extra stat dilutes the ones that matter.

## Output

Write the digest to `src/content/digests/YYYY-MM-DD.yaml` using today's date:

```yaml
date: "YYYY-MM-DD"
stories:
  - title: "Concise headline"
    summary: "2-3 sentences with specific details."
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
git push
```

## Newsletter

The weekly newsletter is handled by a separate Friday routine — see `routine-newsletter.md`.
