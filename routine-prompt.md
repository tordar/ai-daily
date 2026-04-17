# AI Daily Dev — Daily Digest Routine

You are generating today's digest for ai-daily.dev, a developer-focused AI news site.

## Philosophy

The best digest reflects what developers are ACTUALLY talking about, not just what companies announce. A press release is only interesting if people are reacting to it. Lead with community signal, not corporate comms.

The ideal mix for each daily digest:
- 2-3 stories where the community is genuinely excited (HN front page, Reddit hot, viral tweet, YouTube videos getting views)
- 1-2 major releases or announcements (only if they're significant enough that people are actually discussing them)
- 1 trending GitHub repo or tool
- 1 interesting take, thread, or video that reframes how developers think about AI

## How to rank stories

**Signal strength matters more than source prestige.** Use this hierarchy:

1. **Multiple communities talking about it** (HN + Reddit + Twitter + YouTube = top story)
2. **YouTube creator made a dedicated video** (Fireship, AI Explained, Matthew Berman covering it = clearly significant)
3. **HN front page or Reddit top post** with 100+ comments (genuine developer interest)
4. **Trending GitHub repo** with high star velocity this week
5. **Major release** that developers can use today (not "coming soon", not "in beta for 50 orgs")
6. **Official blog post** with no visible community reaction (lowest priority — include only if genuinely impactful)

## What to look for

1. **What the community is buzzing about** — check HN, Reddit, X/Twitter FIRST
2. **YouTube AI creators** — if Fireship, AI Explained, Matthew Berman, ThePrimeagen, or Wes Roth posted a video about something, it's news. Include the YouTube link as the source URL when the video IS the story.
3. **Trending repos and tools** — GitHub trending, Trendshift, HuggingFace trending models
4. **New releases developers can actually use** — shipped products, not announcements
5. **Viral demos, threads, or takes** — sometimes a tweet or demo is the story

## What to skip

- **Anything older than 48 hours** — blog posts summarizing weeks/months of growth are NOT news
- **Press releases with no community signal** — if nobody's talking about it, it's not a top story
- "Coming soon" announcements — wait until it ships
- Funding rounds (unless they change the competitive landscape)
- Opinion pieces without substance
- Minor version bumps

## Process

1. Read `sources.yaml` in this repo for the full source list
2. **Start with community sources**: search HN, Reddit, X/Twitter for today's AI buzz
3. **Check YouTube creators**: search for new videos from the creators in sources.yaml
4. **Check GitHub trending**: look for AI/ML repos with high star velocity
5. **Then check official sources**: company blogs, changelogs — but only to add context to stories you've already found via community signal
6. Collect 20+ candidates from across all categories
7. Rank using the hierarchy above — community signal first
8. Select top 5-7 stories with a good mix (don't let it be all press releases)
9. Write 2-3 sentence factual summaries with specific details (benchmark scores, star counts, view counts, comment counts — concrete numbers)
10. For YouTube stories, link to the video. For Reddit/HN stories, link to the discussion. For repos, link to GitHub. Only link to official blog posts when they're the primary source.
11. Assign tags: models, tools, research, industry, open-source, frameworks, community
12. Assign significance 1-5 (5 = multiple communities buzzing about this)

## Superseded stories — CRITICAL

After writing today's digest, scan this week's earlier digests (in `src/content/digests/`) for stories that today's news makes obsolete:
- Rumor → actual launch (downgrade the rumor to significance 1)
- Old benchmark → beaten by new model (downgrade the old story)
- "Expected to ship" → actually shipped (downgrade the expectation)

Edit the earlier digest file to reduce significance to 1 for any superseded story.

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
