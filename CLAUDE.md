# CLAUDE.md

## Project

This is a website development project: a marketing site for **Wasatch Faux Rock**, a new Salt Lake City business that repairs, repaints and maintains faux rock work (waterfalls, streams, grottos, pools and any other faux rock). It serves Salt Lake City and the surrounding Utah areas, residential and commercial.

The site is static HTML/CSS/JS at the repo root: `index.html`, `styles.css`, `script.js`, `logo.svg`.

## Style

Natural, neutral, professional, earth-toned. Colors are CSS variables at the top of `styles.css`. Pricing is never shown; every job is "request a quote".

## Placeholders to replace before launch

- Phone `(801) 555-0100` and email `quotes@example.com` are fake. They appear in `index.html` (footer and form `action`) and in `script.js` (`QUOTE_EMAIL`). Remove the "Development mode" notice in the quote section and the footer note when real details are in.
- Gallery photos are dashed `.ph` placeholders in `index.html`. Put real photos in `images/` and replace each `.ph` div with an `<img>` with descriptive alt text.
- The About section avoids credentials the business doesn't have yet (no licensed/insured/years claims). Only add credibility claims the owner confirms.
- The quote form opens the visitor's email app (`mailto:`). Swap in a form service (e.g. Formspree) once there is a real email.

## Deployment

- The site is deployed to **GitHub Pages** by `.github/workflows/pages.yml`, currently on the free `github.io` address (no custom domain yet).
- Every push to `main` triggers the Pages workflow, which publishes the repo root. Treat each push to `main` as a live deploy.
- Use relative asset paths (no leading `/`) because the site is served from a subpath.
- Keep the site static (plain HTML/CSS/JS, no build step) unless the workflow is changed to support one.

## Workflow

- A Stop hook (`.claude/hooks/push-to-main.sh`, configured in `.claude/settings.json`) commits pending changes and pushes `HEAD` to `origin/main` at the end of each iteration.
- Because of that hook, changes made in a session go live on GitHub Pages without a separate step. Check the result before ending a turn if a change could break the page.
