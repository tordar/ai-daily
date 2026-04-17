# AI Daily Dev — Daily Digest Routine

You are generating today's digest for ai-daily.dev, a developer-focused AI news site.

## What to look for (in priority order)

1. **New features and products** from Anthropic, OpenAI, Google, Meta, Mistral, xAI, and other major AI companies
2. **New model releases** — launches, benchmarks, availability, pricing changes
3. **Breaking and viral news** — anything the AI community is actively talking about right now
4. **Community buzz** — what's trending on Hacker News, Reddit (r/LocalLLaMA, r/MachineLearning), X/Twitter
5. **GitHub trending repos** — new AI/ML repos blowing up in stars, breakout developer tools
6. **YouTube AI creators** — noteworthy videos from AI Explained, Fireship, Two Minute Papers, Matthew Berman, ThePrimeagen that are getting views/discussion

## What to skip

- **Anything older than 48 hours** — if you can't confirm it happened yesterday or today, don't include it. Blog posts summarizing weeks/months of growth are NOT breaking news.
- Funding rounds and business deals (unless massive/industry-shifting)
- Opinion pieces and think-pieces
- AI policy/regulation (unless it directly affects developers)
- Rehashes of old news
- Minor version bumps or patch releases
- GitHub repos that have been popular for weeks/months — only include repos that are NEW or just hit a milestone TODAY

## Process

1. Read `sources.yaml` in this repo for the list of sources to check
2. Use web_search broadly: "AI news today", "AI announcements today", check each priority 1 source
3. Use web_fetch on specific source URLs to find what's new in the last 24 hours
4. Collect all candidate stories (aim for 15-20 candidates)
5. Deduplicate — the same story often appears on multiple sources
6. Rank by: How many people are talking about it? Is it a new capability developers can use today? Is it genuinely surprising or significant?
7. Select the top 5-7
8. Write a 2-3 sentence summary for each — factual, specific, no hype. Include concrete details (model name, benchmark scores, pricing, availability)
9. Assign a tag: models, tools, research, industry, open-source, frameworks, community
10. Assign significance 1-5 (5 = everyone in AI is talking about this)

## Superseded stories — CRITICAL

After writing today's digest, scan this week's earlier digests (in `src/content/digests/`) for stories that today's news makes obsolete. Examples:
- "X expected to launch this week" → X actually launched today → the earlier rumor is now stale
- "Company valued at $Y" → new valuation announced → old number is outdated
- "Model scores Z on benchmark" → newer model beats it → old story is less significant

For any superseded story, **edit the earlier digest file** and reduce its `significance` to 1. This ensures the weekly/monthly rollups show the actual event, not the rumor that preceded it.

```bash
# Example: if 2026-04-15.yaml had "Opus 4.7 expected to launch" at significance 5,
# and today Opus 4.7 actually launched, edit 2026-04-15.yaml to set that story to significance 1.
# Then today's "Opus 4.7 launches" story at significance 5 will rank higher in the weekly rollup.
```

Always commit the edited earlier files along with today's new digest.

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
  # ... 4 more stories
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
