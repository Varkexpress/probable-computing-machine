# Blockwise Planner

`blockwise.html` is a single-file staff rota builder for small teams (cafés, shops, clinics, crews), with a personal weekly planner as a second mode. Open it in any browser or host it on any static host. Data is saved in the browser's localStorage.

## Why someone would pay for it
Most rota tools need accounts for every employee and cost per seat. Blockwise works the moment the page opens and answers the three questions a manager has while building a rota:

1. **What does this week cost?** Labour cost updates live as shifts move: per day, per person, with unpaid breaks, overtime and a weekly budget meter.
2. **Is it legal and fair?** Every change is checked for double-bookings, shifts on days off, short rest between shifts ("clopening"), weekly hour limits, long days, seven days in a row, and coverage gaps against the staffing needs you set.
3. **Can you just fix it?** Auto-staff opens shifts for every coverage gap and gives each open shift to the least-loaded person who can take it within the rules, matching roles.

4. **Can you just ask?** The AI assistant takes plain requests ("Leo is off sick Friday, find cover", "cut 10 hours from the weekend") and proposes a list of changes, with the cost and issue count before and after, that you apply or discard.

Then **Publish**: a rota image that shows hours but never pay, a ready-to-send message per person, per-person calendar files, and a payroll CSV.

## Rota mode
- Roster view: people down the side, days across. Click a cell to add a shift, drag a shift to another person or day, drop it on "Open shifts" to unassign.
- Timeline view: the same shifts on an hour grid, coloured by person.
- Team members have a role, hourly rate, minimum and maximum weekly hours, days off and per-day availability ("Tuesdays from 12pm").
- Coverage needs, optionally per role: "2 people, 8am–4pm, every day", "1 Kitchen, 7am–3pm, Mon–Sat".
- Sales forecast per day turns labour into a percentage of takings, per day and for the week, against a target.
- Fairness report: shifts, hours, weekends, early starts and late finishes per person, with outliers marked.
- "On today" card, one-click common shift times in the editor, and Duplicate (plan next week from this one).
- Rules (Settings): minimum rest, longest day, unpaid break, overtime threshold and multiplier, currency.

## Personal mode
Drag-to-create time blocks, categories with weekly hour targets, overlap detection, auto-fill for recurring tasks, templates, themes, image and calendar export.

## Plans
| | Free | Pro ($5/mo, $36/yr, $79 lifetime) | Team ($19/mo, $180/yr per location) |
|---|---|---|---|
| Schedules | 2 | Unlimited | Unlimited |
| Team size | 5 | 5 | Unlimited |
| Coverage rules | 2 | 2 | Unlimited |
| Labour cost and rule checks | yes | yes | yes |
| Auto-staff / auto-fill | 3 runs a week | Auto-fill unlimited | Both unlimited |
| AI assistant | 2 requests a week | unlimited for personal schedules | unlimited |
| Weekly budget meter, fairness report | no | no | yes |
| Per-person messages, calendars, payroll CSV | first message only | personal calendar | yes |
| Image export | watermarked | clean | clean |
| Themes, templates, no sponsor cards | no | yes | yes |

The free plan shows every problem and the full cost, so the value is visible before the paywall. What is sold is the fix (unlimited Auto-staff), the scale (more people, more rules) and the hand-off (messages, calendars, payroll). Other levers: 7-day Team trial, referral codes, watermark on shared images, a rentable sponsor card, 60-second try-on for paid themes. Downgrading never deletes data.

## Before launch
All settings are in the `CONFIG` object at the top of the `<script>`.
1. Create payment links (Stripe Payment Links, Lemon Squeezy or Gumroad) and paste them into `CONFIG.checkout`.
2. Set `CONFIG.demoMode = false` (it adds "Demo: unlock" buttons for testing).
3. Change `CONFIG.licenseSalt`, then mint keys for buyers:
   `node tools/mint-blockwise-key.mjs <your-salt> team 10` (or `pro`, `lifetime`).
4. Set `CONFIG.sponsor` when you sell the ad slot; adjust `prices` and `limits` as you like.

## Limits to know
- The AI assistant runs on the viewer's own Claude account and appears only when the page is opened on claude.ai (the published artifact). Hosted elsewhere, the card is hidden and everything else works.
- Everything is client-side. License and referral checks deter casual users but can be bypassed by anyone who reads the source. Real enforcement needs accounts and a server that confirms payments through your payment provider's webhooks.
- One browser holds the data. Staff see the rota through what the manager publishes (image, messages, calendar files); live staff logins, shift swaps and time-off requests need a backend and would be the next Team features.
- The rule checks are configurable guard rails, not legal advice; working-time law differs by country and sector.
- Referral rewards only go to the friend who redeems the code.
