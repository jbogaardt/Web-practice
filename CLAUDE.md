# CLAUDE.md

## Project

This is a website development project: a marketing site for **Wasatch Faux Rock**, a new Salt Lake City business that repairs, repaints and maintains faux rock work (waterfalls, streams, grottos, pools and any other faux rock). It serves Salt Lake City and the surrounding Utah areas, residential and commercial.

The site is static HTML/CSS/JS at the repo root: `index.html`, `styles.css`, `script.js`, `logo.svg`.

## Style

Modern, professional, smooth parallax. Natural earth tones: warm stone neutrals, charcoal, clay and a gold accent. Colors are CSS variables at the top of `styles.css`. Pricing is never shown; every job is "request a quote". No fantasy, jungle, treehouse or Disney theming, and no trademarked names, characters or art.

- The site should show hard, skilled labor: men at work repairing, painting and sealing faux rock. With no real photos yet, these are original SVG illustrations. Shared figures (`sym-paint`, `sym-kneel`, `sym-spray`) and scenes (`scene-paint`, `scene-crack`, `scene-seal`) are defined once in the hidden `<svg>` at the top of `index.html` and reused with `<use>`. Replace them with real photos when available.
- The hero is a layered parallax scene (mountains, a faux rock waterfall half repainted, two workers). Layer speeds are the `data-speed` attributes. `script.js` eases the scroll position each frame so motion is smooth, and also drifts images inside `.media` frames (`data-drift`).
- Sections use clean straight edges, scroll-reveal (`.reveal`) and light cards. Everything must respect `prefers-reduced-motion` (parallax, animation and reveal are disabled).

## Placeholders to replace before launch

- Phone `(801) 555-0100` and email `quotes@example.com` are fake. They appear in `index.html` (footer and form `action`) and in `script.js` (`QUOTE_EMAIL`). Remove the "Development mode" notice in the quote section and the footer note when real details are in.
- The "Our work" scenes are illustrations and the before/after boxes are dashed `.ph` placeholders in `index.html`. Put real photos in `images/` and swap them in with descriptive alt text.
- The About section avoids credentials the business doesn't have yet (no licensed/insured/years claims). Only add credibility claims the owner confirms.
- The quote form posts to a hosted form endpoint set in `FORM_ENDPOINT` in `script.js` (empty until the owner creates one, e.g. a Formspree form). The owner's real inbox address must never appear in the site files, so the endpoint URL (not an email) is what goes in the code. The footer email `quotes@example.com` is still a placeholder.

## Deployment

- The site is deployed to **GitHub Pages** by `.github/workflows/pages.yml`, currently on the free `github.io` address (no custom domain yet).
- Every push to `main` triggers the Pages workflow, which publishes the repo root. Treat each push to `main` as a live deploy.
- Use relative asset paths (no leading `/`) because the site is served from a subpath.
- Keep the site static (plain HTML/CSS/JS, no build step) unless the workflow is changed to support one.

## Workflow

- A Stop hook (`.claude/hooks/push-to-main.sh`, configured in `.claude/settings.json`) commits pending changes and pushes `HEAD` to `origin/main` at the end of each iteration.
- Because of that hook, changes made in a session go live on GitHub Pages without a separate step. Check the result before ending a turn if a change could break the page.
- Before each change request, a `UserPromptSubmit` hook (`.claude/hooks/pull-main.sh`) fast-forwards the checkout to `origin/main`. It never merges or rewrites history, so if it reports it could not fast-forward (local changes or diverged history), resolve that before editing. This keeps parallel Claude instances on the same base and minimizes merge conflicts.
- Work directly on `main`. Do not create feature branches: iterate on `main` and check the change on the deployed site.
- After each feature or bug fix, push to `main` (via the Stop hook or `git push origin HEAD:main`) so every change deploys right away. Rapid, incremental deploys are the goal: do not batch several finished fixes into one push.
