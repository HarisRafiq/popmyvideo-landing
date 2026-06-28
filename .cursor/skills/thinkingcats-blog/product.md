# ThinkingCats — facts for blog posts

Only claim what's listed here. If unsure, check `src/pages/index.astro` and `src/consts.ts`.

## What it is

Mobile app (Android live, iOS waitlist) that analyzes video footage and layers animated text, icons, shapes, and visual effects on top — timed to the action. Your original footage stays intact; polish is added as overlays, not by regenerating the video.

## What it does

- Import a clip from your phone — any length, with or without sound
- AI reads the shot (and listens if there's audio) to find the right moments
- Prompt the vibe: product ad, hype hook, clean label, celebration burst
- Preview moving text, icons, and effects synced to your footage
- Export a polished MP4 to Photos or share to social
- Optional AI sound effects — impacts, whooshes, stings (great for silent clips)
- Trim, reframe, and grade before export

## What it does NOT do

- Regenerate or restyle your original footage (overlays only — not AI video regeneration)
- Static stickers — graphics are animated and timed to the action
- Full multi-clip timeline editing (assembly cuts, multi-track workflows)
- Desktop / web editor

## Links

- Site: https://thinkingcats.com
- Download: Google Play (`PLAY_STORE_URL` in `src/consts.ts`)
- iOS waitlist: `/#ios-waitlist` on the homepage
- Do not link to `/#early-access` — that section no longer exists on the homepage

## Screenshots (public/screenshots/)

| File | Use for |
|------|---------|
| `step-import.png` | Raw clip / "YOU SHOOT" overlay, import step, "before" |
| `step-generate.png` | AI VFX generated, "after" / hero / OG image |
| `step-regenerate.png` | Version picker, regenerate until perfect |
| `step-export.png` | Export / share ready state |

Dimensions: 1290 × 2796 (iPhone 6.7" App Store captures).
