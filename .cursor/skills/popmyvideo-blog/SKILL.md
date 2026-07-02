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

## Voice

Sound like a tired creator who finally found a shortcut — practical, not a marketing deck.

- Open with a specific moment (a clip, a time sink, a failed export in CapCut)
- Use real numbers: "45 minutes in CapCut", "3-second hook"
- Name real tools: CapCut, After Effects, Premiere — compare honestly
- Admit tradeoffs. AI auto-effects are fast; manual gives pixel control

Avoid AI slop: "game-changer", "revolutionize", "dive deep", "unlock", "leverage", "in today's fast-paced digital landscape"

## Structure

1. Hook — specific pain, 2–4 short paragraphs
2. What "popping" actually means — visual/audio cues for Reels
3. Path A: Manual (CapCut / AE) — real workflow + time cost
4. Path B: PopMyVideo — what the app does, time cost
5. Before/after — required when comparing visual results
6. When to use which — honest comparison
7. One practical takeaway

Target **900–1,400 words**. No `---` mid-article. No in-post CTA — layout footer handles download/waitlist.

## Frontmatter

```yaml
---
title: ""
description: ""
pubDate: 2026-06-18
draft: true
heroImage: "/screenshots/ai-polish.png"
tags: []
---
```

Save as `src/content/blog/<slug>.md`.

## Before/after blocks

Use raw HTML when showing results:

```html
<div class="before-after">
  <figure>
    <img src="/screenshots/you-shoot.png" alt="Describe the frame" width="1290" height="2796" loading="lazy" />
    <figcaption>Before — plain phone footage</figcaption>
  </figure>
  <figure>
    <img src="/screenshots/ai-polish.png" alt="Same clip with effects" width="1290" height="2796" loading="lazy" />
    <figcaption>After — effect on the hit</figcaption>
  </figure>
</div>
```

## Product mentions

PopMyVideo is the hero. Describe what it does plainly: scans footage, finds hook moments, layers VFX/SFX, exports on phone. Read [product.md](product.md) for accurate claims — never invent features.

## SEO

- Title under 60 chars — include search intent (`CapCut alternative`, `auto captions Reels`)
- Description 140–160 chars
- Tags: 3–5 specific terms (`Instagram Reels`, `CapCut`, `video VFX`, `auto captions`)
