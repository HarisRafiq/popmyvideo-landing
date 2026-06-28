---
name: thinkingcats-blog
description: >-
  Write and maintain ThinkingCats blog posts for thinkingcats.com. Use when
  creating, editing, or planning blog content, SEO articles, Reels/TikTok tips,
  or VFX/SFX guides for the Astro blog in src/content/blog/.
---

# ThinkingCats Blog

Write posts that sound like a tired creator who finally found a shortcut — not a marketing deck.

## Before writing

1. Read [product.md](product.md) for accurate feature claims.
2. Copy frontmatter from [template.md](template.md).
3. Save as `src/content/blog/<slug>.md` — slug is lowercase, hyphenated, under 60 chars.
4. After drafting, run `node .cursor/skills/thinkingcats-blog/validate.mjs src/content/blog/<slug>.md`.

## Voice

**Sound like:** Someone who edits Reels at midnight, knows CapCut's export queue pain, and will tell you when manual editing is still worth it.

**Do:**
- Open with a specific moment (a clip, a time sink, a failed export).
- Use real numbers: "45 minutes in CapCut", "3-second hook", not "significant time savings".
- Name real tools: CapCut, After Effects, Premiere, InShot — compare honestly.
- Vary paragraph length. One sentence is fine.
- Admit tradeoffs. AI auto-effects are fast; manual gives pixel control.

**Don't (AI slop — reject on sight):**
- "In today's fast-paced digital landscape", "game-changer", "revolutionize", "dive deep", "unlock", "leverage", "it's no secret that"
- Opening with a dictionary definition or "If you're a creator..."
- Numbered lists of 6+ generic tips
- Bold on every other phrase
- "The bottom line" / "At the end of the day"
- Fake urgency: "The creators who adopt X in the next 12 months will..."
- Waitlist / alpha CTAs — app is on Google Play (see product.md)

## Article structure

Every post follows this skeleton (adapt section titles to the topic):

```
1. Hook — one specific pain, 2–4 short paragraphs
2. What "popping" actually means — concrete visual/audio cues for Reels
3. Path A: Manual (CapCut / AE) — real workflow + time cost
4. Path B: AI auto-effects — what the tool actually does, time cost
5. Before/after — required if comparing visual results (see below)
6. When to use which — honest table or short comparison
7. One practical takeaway — single sentence, no fluff
```

Target **900–1,400 words**. No horizontal rules (`---`) mid-article. No in-post CTA block — the layout footer handles that.

## Frontmatter

Required fields — see [template.md](template.md). Set `draft: true` until the post is ready to publish.

## Before/after blocks

Use raw HTML in the `.md` file (Astro renders it). Always use project screenshots from `/screenshots/` when showing the app.

```html
<div class="before-after">
  <figure>
    <img src="/screenshots/step-import.png" alt="Describe what's in the frame" width="1290" height="2796" loading="lazy" />
    <figcaption>Before — plain phone footage</figcaption>
  </figure>
  <figure>
    <img src="/screenshots/step-generate.png" alt="Same clip with effect applied" width="1290" height="2796" loading="lazy" />
    <figcaption>After — neon trail on the hit</figcaption>
  </figure>
</div>
```

Write captions that describe what changed, not marketing copy.

## SEO (without sounding like SEO)

- **Title:** Under 60 chars. Include the search intent (tool name or platform) naturally.
- **Description:** 140–160 chars. Say what the reader learns, not hype.
- **Tags:** 3–5 specific terms (`Instagram Reels`, `CapCut`, `video VFX`) — not `creator economy`.
- **First 100 words:** Mention the primary keyword once, in context.
- **Headings:** Use `##` only (layout renders the title as `h1`). Question headings are fine.
- **Internal links:** Link to `/` once, naturally. No `/#early-access`.

## Product mentions

Mention ThinkingCats when it's genuinely the answer — not in the first paragraph. Describe what it does in plain language: scans footage, finds hook moments, suggests VFX/SFX, renders on phone. Never claim features not in [product.md](product.md).

## Checklist before marking `draft: false`

- [ ] Ran validate.mjs — no errors
- [ ] No banned phrases (validator catches most)
- [ ] At least one concrete time estimate or workflow step
- [ ] Before/after block if post compares visual results
- [ ] CTA is not duplicated in body (layout handles it)
- [ ] `heroImage` is a real asset (`/screenshots/...` or intentional Unsplash)
