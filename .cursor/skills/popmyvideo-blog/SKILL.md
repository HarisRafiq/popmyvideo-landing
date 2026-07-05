---
name: popmyvideo-blog
description: >-
  Write PopMyVideo product blog posts for popmyvideo.com — tutorials, workflows,
  before/after demos, and CapCut alternatives. Use for blog content in
  src/content/blog/.
---

# PopMyVideo Blog

**Site:** popmyvideo.com — the product.

**Write about:** how to use PopMyVideo, before/after case studies, CapCut/AE alternatives, auto captions, timed effects, feature tips, workflow comparisons where PopMyVideo is the answer.

**Don't write here:** broad Reels algorithm guides, lab philosophy, or posts that don't need the app to act. That's thinkingcats.com.

## Positioning

**Store** = feature terms people type (`auto captions`, `video effects`).

**Web + blog** = use cases and transformations people share (silent B-roll → ad, podcast clip → captioned Short).

PopMyVideo is the **polish layer** — not a podcast clipper, not a full editor, not AI video generation. Import a clip you've already cut; we add captions, graphics, effects, and sound.

**Do not promise:** viral, algorithm hack, guaranteed views.

## Voice

Sound like a tired creator who finally found a shortcut — practical, not a marketing deck.

- Open with a specific moment (a clip, a time sink, a failed export in CapCut)
- Use real numbers: "45 minutes in CapCut", "3-second hook"
- Name real tools: CapCut, After Effects, Premiere — compare honestly
- Admit tradeoffs. AI auto-effects are fast; manual gives pixel control
- State honest limits when relevant (doesn't find viral moments in full episodes)

Avoid AI slop: "game-changer", "revolutionize", "dive deep", "unlock", "leverage", "in today's fast-paced digital landscape"

## Structure

1. Hook — specific pain, 2–4 short paragraphs; **first 2 paragraphs answer the title query directly** (AEO-friendly)
2. What "popping" actually means — visual/audio cues for Reels
3. Path A: Manual (CapCut / AE) — real workflow + time cost
4. Path B: PopMyVideo — what the app does, time cost
5. Before/after — required when comparing visual results
6. When to use which — honest comparison
7. One practical takeaway
8. **Related topics** — 2–3 markdown links to category hubs and/or use-case pages

Target **900–1,400 words**. No `---` mid-article. No in-post download CTA — layout footer handles store links.

## Frontmatter

```yaml
---
title: ""
description: ""
pubDate: 2026-06-18
draft: true
heroImage: "/screenshots/step-generate.png"
categories: ["video-effects"]
tags: []
---
```

- **`categories`** (required, 1–2): search-intent slugs from registry below — never competitor names
- **`tags`** (optional): tools/platforms (`CapCut`, `iPhone`, `After Effects`)
- Pick category by **what the reader searched for**, not what the post compares against

Save as `src/content/blog/<slug>.md`.

## Category registry (search-intent hubs)

| Slug | Use when the post targets |
|------|---------------------------|
| `auto-captions` | add captions to video, auto captions |
| `animated-captions` | animated captions, subtitle generator |
| `video-effects` | video effects, reels effects |
| `text-overlays` | text overlay video, lower third |
| `product-videos` | product video maker, add text to video |
| `podcast-clips` | podcast clips for social media |
| `silent-video` | add sound to silent video, sound effects video |
| `talking-head-videos` | talking head video editing, educational reels |

**Not categories:** CapCut alternative, Submagic alternative, viral TikTok — those are post titles/tags only.

## Content backlog (do not write unless asked)

**Tier 1:** add auto captions; silent product footage → ad; animated vs auto captions; video effects for Reels without AE

**Tier 2:** podcast clip polish; silent video SFX; talking-head captions + callouts; text overlays

**Tier 3:** PopMyVideo vs CapCut (factual, different job); caption app vs effects (capabilities only)

**Do not write:** AI podcast clip generator, AI video from text, viral TikTok guides, full CapCut tutorials

## Before/after blocks

Use raw HTML when showing results:

```html
<div class="before-after">
  <figure>
    <img src="/screenshots/step-import.png" alt="Describe the frame" width="468" height="1024" loading="lazy" />
    <figcaption>Before — plain phone footage</figcaption>
  </figure>
  <figure>
    <img src="/screenshots/step-generate.png" alt="Same clip with effects" width="468" height="1024" loading="lazy" />
    <figcaption>After — effect on the hit</figcaption>
  </figure>
</div>
```

## Product mentions

PopMyVideo is the hero. Describe plainly: reads visuals/audio, finds moments worth enhancing, layers captions/VFX/SFX, exports on phone. Read [product.md](product.md) for accurate claims — never invent features.

## SEO

- Title under 60 chars — match search intent (`Add Captions to Video`, not brand fluff)
- Description 140–160 chars
- Title = exact long-tail query where possible
- First paragraph = direct answer
- Cross-link 1 existing post when category overlap exists
- End with Related topics links to `/blog/category/[slug]/` and `/for/[slug]/` when relevant
