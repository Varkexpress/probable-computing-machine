# Blockwise Planner

`blockwise.html` is a single-file weekly schedule builder with a freemium Pro plan. Open it in any browser, or host it on any static host (GitHub Pages, Netlify, Cloudflare Pages). Data is saved in the browser's localStorage.

## What it does
- Week grid: drag on empty space to create a block, drag a block to move it (across days too), drag its bottom edge to resize, click to edit. On touch screens, tap to add or edit.
- Blocks repeat across several days from the editor, with categories, location and notes.
- Overlap detection with a highlight toggle, a red "now" line, per-day and per-category hours, free hours.
- Auto-fill: list recurring tasks ("Read 45m × 3/week, evenings") and it places them in free slots, spread across days.
- Templates, themes, undo/redo (Ctrl+Z / Ctrl+Shift+Z), `N` for a new block, Delete on a focused block, zoom.
- Export: PNG image, calendar `.ics` with weekly repeats (Google/Apple/Outlook), share codes, full JSON backup and restore.

## Ways it makes money
| Lever | Free | Pro |
|---|---|---|
| Schedules | 1 | Unlimited |
| Blocks per schedule | 40 | Unlimited |
| Categories | 5 | Unlimited |
| Auto-fill | 3 runs/week (resets Monday) | Unlimited |
| Calendar (.ics) export | no | yes |
| Image export | watermarked ("Made with Blockwise"), which also advertises the app | clean |
| Themes | 2 | 6, and free users can try any Pro theme for 60 seconds |
| Templates | 3 | 7, and single templates can be sold one-off |
| Sponsor cards | shown (rentable ad slot in sidebar and template gallery) | hidden |

Other built-in levers: 7-day free trial (once per device), referral codes that give a friend 7 days of Pro, monthly/yearly/lifetime pricing with a yearly discount, and upgrade prompts that appear only when someone hits a limit, each saying which limit they hit. Downgrading never deletes data.

## Before launch
All settings are in the `CONFIG` object at the top of the `<script>` in `blockwise.html`.
1. Create payment links (Stripe Payment Links, Lemon Squeezy or Gumroad) and paste them into `CONFIG.checkout`.
2. Set `CONFIG.demoMode = false` (it adds a "Demo: unlock Pro now" button for testing).
3. Change `CONFIG.licenseSalt`, then mint keys to email buyers (or wire this into your payment provider's webhook):
   `node tools/mint-blockwise-key.mjs <your-salt> pro 10` (or `lifetime`).
4. Set `CONFIG.sponsor` when you sell the ad slot, and adjust `prices` / `limits` as you like.

## Limits to know
- Everything is client-side. License and referral checks stop casual users but can be bypassed by anyone who reads the source. For real enforcement, add accounts and server-side checks (Supabase, Firebase, or a small API) and verify purchases through your payment provider's webhooks.
- Referral rewards only go to the friend who redeems the code. Rewarding the person who shared it needs a server.
- Data lives in one browser. Cloud sync across devices would be a natural next Pro feature and also needs a backend.
