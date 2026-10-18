# CLAUDE.md

## Project

This is a website development project: a marketing site for **Wasatch Faux Rock**, a new Salt Lake City business that repairs, repaints and maintains faux rock work (waterfalls, streams, grottos, pools and any other faux rock). It serves Salt Lake City and the surrounding Utah areas, residential and commercial.

The site is static HTML/CSS/JS at the repo root: `index.html`, `styles.css`, `script.js`, `logo.svg`.

## Style

Modern, professional, smooth parallax. Warm natural-rock palette sampled from the owner's real repair photo: deep umber (#1a0e00-#2a1d0c), umber-brown (#3b2e20-#544639), taupe (#695a45) and olive-tan lit faces, with warm bronze buttons (`--accent`, #8b5e2e) and a hint of true black: near-black dark sections (`--char` #110d09), black footer and header bar, near-black text (`--ink`), and black shading in the hero, mountains and logo facets. Keep that black accent when changing colors. The real rock is smooth, sculpted sandstone with broad layered slabs and dark crevices, so keep texture minimal. Avoid bright orange and cool blue-gray ("granite countertop") looks. Depth comes from a procedural rock-face texture in `styles.css` (a very soft, broad SVG relief plus a large tonal mottle; no crack or crevice lines: `--fleck-light` / `--fleck-dark` / `--mottle-dark` / `--mottle-light`). Keep it subtle so body text stays readable, and never use fine uniform confetti speckle, which reads as an epoxy garage floor or a polished countertop. Colors are CSS variables at the top of `styles.css`. Pricing is never shown; every job is "request a quote". No fantasy, jungle, treehouse or Disney theming, and no trademarked names, characters or art.

- **Photo rules from the owner:** use only tight, zoomed-in close-ups of rock. Nothing that could identify the owner's property (no trees, fences, pool, yard, house or landscaping), and no visible cracks in the rock. Crop before adding.
- **Real photos only.** The site should show real people doing real, hard faux rock work. No cartoons, illustrations or AI-generated people. Use only photos of the owner's own work (or photos the owner supplies); never pass stock photos off as the business's work.
- Photo slots show a striped label until the image file exists in `images/`, then the photo covers it automatically (no code change). Expected files: `hero.jpg` (wide, landscape, men working on faux rock), `work-1.jpg` (repainting; already added: a close-up of a painted boulder face), `work-2.jpg` (crack repair), `work-3.jpg` (sealing a waterfall), `before.jpg`, `after.jpg`, `about.jpg` (already added: a zoomed-in close-up of the owner's recolored faux rock surface). Keep them web-sized (about 2000px wide max, under ~400 KB each).
- Add alt text if a slot becomes a real `<img>`. Slots are CSS backgrounds today, so give each photo's `figcaption` or `aria-label` descriptive text.
- The hero has a faceted granite mountain range (`.l-range`, same folded facets as the logo) as fallback art behind the photo, hidden once `hero.jpg` exists. The hero photo is a parallax layer (`data-speed`) under a dark gradient overlay so the white headline stays readable. `script.js` eases the scroll position each frame for smooth motion and drifts photos inside `.media` frames (`data-drift`).
- Sections use clean straight edges, scroll-reveal (`.reveal`) and light cards. Everything must respect `prefers-reduced-motion`.

## Placeholders to replace before launch

- Phone `(801) 555-0100` and email `quotes@example.com` are fake. They appear in `index.html` (footer and form `action`) and in `script.js` (`QUOTE_EMAIL`). Remove the "Development mode" notice in the quote section and the footer note when real details are in.
- Photos: drop the files listed under Style into `images/`. Until then the slots show placeholder labels.
- The About section avoids credentials the business doesn't have yet (no licensed/insured/years claims). Only add credibility claims the owner confirms.
- The quote form posts to a hosted form endpoint set in `FORM_ENDPOINT` in `script.js` (empty until the owner creates one, e.g. a Formspree form). The owner's real inbox address must never appear in the site files, so the endpoint URL (not an email) is what goes in the code. The footer email `quotes@example.com` is still a placeholder.

## Deployment

- The site is deployed to **GitHub Pages** by `.github/workflows/pages.yml`, currently on the free `github.io` address (no custom domain yet).
- Every push to `main` triggers the Pages workflow, which publishes the repo root. Treat each push to `main` as a live deploy.
- Use relative asset paths (no leading `/`) because the site is served from a subpath.
- Keep the site static (plain HTML/CSS/JS, no build step) unless the workflow is changed to support one.

## Workflow

- A Stop hook (`.claude/hooks/push-to-main.sh`, configured in `.claude/settings.json`) commits pending changes and pushes `HEAD` to `origin/main` at the end of each iteration. It also bumps the `?v=` cache-busting number on `styles.css` and `script.js` in `index.html` so visitors never see a stale cached copy. Keep those `?v=` suffixes in place.
- Because of that hook, changes made in a session go live on GitHub Pages without a separate step. Check the result before ending a turn if a change could break the page.
- Before each change request, a `UserPromptSubmit` hook (`.claude/hooks/pull-main.sh`) fast-forwards the checkout to `origin/main`. It never merges or rewrites history, so if it reports it could not fast-forward (local changes or diverged history), resolve that before editing. This keeps parallel Claude instances on the same base and minimizes merge conflicts.
- Work directly on `main`. Do not create feature branches: iterate on `main` and check the change on the deployed site.
- After each feature or bug fix, push to `main` (via the Stop hook or `git push origin HEAD:main`) so every change deploys right away. Rapid, incremental deploys are the goal: do not batch several finished fixes into one push.
