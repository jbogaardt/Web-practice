# CLAUDE.md

## Project

This is a website development project: a marketing site for **Wasatch Faux Rock**, a new Salt Lake City business that repairs, repaints and maintains faux rock work (waterfalls, streams, grottos, pools and any other faux rock). It serves Salt Lake City and the surrounding Utah areas, residential and commercial.

The site is static HTML/CSS/JS at the repo root: `index.html`, `styles.css`, `script.js`, `logo.svg`.

## Style

Modern, professional, smooth parallax with a crisp, precise look. The palette is earthy and craftsman-focused, and the tokens at the top of `styles.css` drive the whole site: Slate `#23282c` for type, Slate Deep `#1e2327` for the header, footer and dark sections, Stone `#f5f3ef` for the main background, Limestone `#eae6df` for alternate light sections, Terracotta `#b4533c` for buttons, accents and focus rings (`--terracotta-deep` on hover, `--terracotta-light` for small text on dark), and Forest Moss `#2d4a3e` for secondary accents and the About section. The logo and hero art use the same colors. Keep surfaces flat and clean: no mottled textures, hazy gradients or muddy mixes. No bright orange or "granite countertop" looks. The 5-color swatch strip above the footer is a brand detail; keep it. Pricing is never shown; every job is "request a quote". No fantasy, jungle, treehouse or Disney theming, and no trademarked names, characters or art.

- **Buttons and depth:** the primary button is solid terracotta with a very soft drop shadow; secondary (`.btn.ghost`) is a thin 1px outline only. Section transitions are not hard waves: each section's top edge (`section::before`, `--prev`) fades from the previous section's color with a very faint rock-ridge silhouette; the hero's bottom edge uses a ridge and a gradient fade into stone. Keep these subtle.
- **Service cards:** off-white (`#fdfbf6`) 16px-radius cards with a soft shadow, floating on an oatmeal (`--oatmeal`) Services background. Each card pairs a terracotta line icon in a tinted tile with the title; the number sits small in the top-right. Icons: trowel, brush, drop, waterfall, grotto arch, boulder.
- **Process timeline:** steps are circular icon nodes (clipboard, magnifier, document, trowel) with number badges, joined by dashed connectors (horizontal on desktop, vertical on phones). Step 1 has a small "Add photos (optional)" link that jumps to the quote form's details box. The form has no file input on purpose (Formspree's free plan rejects file uploads); customers email photos after we reply.
- **Before/after slider:** white, high-contrast grab handle that nudges until touched, "Before" (dark) and "After" (terracotta) corner pills, and a "Drag to compare" hint. Needs real `images/before.jpg` and `images/after.jpg` of the same spot, framed identically.
- **Headings:** `text-wrap: balance` on h1-h3 avoids orphan words; on phones h1/h2 are a few px smaller. Cards use a 20-22px radius with barely visible shadows.
- **Micro-interactions and funnel:** cards lift 4px on hover/tap with a darker shadow; buttons deepen to rust (`--rust`) on hover/tap/focus; card numbers are `#5b6268` for contrast. The header is `position: fixed` so the Request a Quote button is always visible. The page ends with a big final CTA band (`#final-cta`, "Ready to Bring Your Rockwork Back to Life?") above the footer. Its phone number is a placeholder like the footer's.
- **Performance:** photos are WebP. Add new ones as `.webp` in `images/` (about 1400px wide, quality ~78, under ~150 KB); filenames in the slots are `.webp`. Only the hero photo loads eagerly; every other photo uses `data-img="images/x.webp"` and is loaded by `script.js` as it nears the viewport. Icons are inline SVG, so they need no loading.
- **Form:** large (56px) off-white fields with a terracotta border and ring on focus; 16px text so iOS doesn't zoom. A successful send replaces the form with a branded thank-you panel (`#quote-thanks`) that promises a reply within 24 hours; the owner must be able to keep that promise.
- **Trust signals:** a testimonial block sits under the before/after slider (`.testimonial`); its text is a clearly marked placeholder, never invent a client quote. The dark footer has the logo, service areas, contact and a "Licensed and insured." badge; the owner must confirm that claim is true (and add license details if they have them) before launch.
- **Orphans:** the last two words of every paragraph, heading and list item are joined with `&nbsp;` in `index.html`; when you add or edit copy, do the same. Tested across 320-1280px with no single-word last lines.
- **Layout width:** the main container (`.wrap`, `--max`) is capped at 1200px and centered; paragraphs are capped at `--measure` (68ch) so lines never stretch across a wide monitor. Section intro text is 16px so it stays quieter than the 17.9px card titles.
- **Favicon:** a dedicated text-free mark (`favicon.svg`, plus `favicon.ico` 16/32/48, `favicon-32.png`, `apple-touch-icon.png` 180, `icon-192.png`, `icon-512.png`): bold three-peak ridge with a terracotta base on a rounded slate tile, designed to stay crisp at 16px. Don't use `logo.svg` as the favicon (its thin brush strokes blur). If the mark changes, re-render every size.
- **Accessibility:** the before/after slider has descriptive labels ("Close-up of cracked faux rock before repair" / "Seamlessly restored and painted faux rock after repair"), is reachable with Tab and driven by arrow keys, Home and End, and announces its position (`aria-valuetext`). Service cards use 1/2/3 columns at <640 / 640+ / 1000+ px inside the 1200px container.
- **404 page:** `404.html` is a self-contained branded page (dark slate, "Looks Like We Hit a Dead End.", terracotta Back to Home button). GitHub Pages serves it for any missing URL, so its paths are absolute (`/Web-practice/`) and a small script switches them to `/` on a custom domain. Update the default if the repo name changes.
- **Typography:** headings use Montserrat 800 (`--display`, loaded from Google Fonts in `index.html`) with tight tracking; body text is Inter at line-height 1.6. Section labels (`.eyebrow`, `.kicker`) are small (0.72rem), bold, uppercase with `letter-spacing: 0.1em`. Text on dark sections is a warm gray (`--on-dark`), with headings slightly brighter (`--on-dark-head`); only the hero headline is pure white.
- **Photo rules from the owner:** use only tight, zoomed-in close-ups of rock. Nothing that could identify the owner's property (no trees, fences, pool, yard, house or landscaping), and no visible cracks in the rock. Crop before adding.
- **Real photos only.** The site should show real people doing real, hard faux rock work. No cartoons, illustrations or AI-generated people. Use only photos of the owner's own work (or photos the owner supplies); never pass stock photos off as the business's work.
- Photo slots show a striped label until the image file exists in `images/`, then the photo covers it automatically (no code change). Expected files: `hero.webp` (wide, landscape, men working on faux rock), `work-1.webp` (repainting; already added: a close-up of a painted boulder face), `work-2.webp` (crack repair), `work-3.webp` (sealing a waterfall), `before.webp`, `after.webp`, `about.webp` (already added: a zoomed-in close-up of the owner's recolored faux rock surface). Keep them web-sized (about 2000px wide max, under ~400 KB each).
- Add alt text if a slot becomes a real `<img>`. Slots are CSS backgrounds today, so give each photo's `figcaption` or `aria-label` descriptive text.
- The hero has a faceted granite mountain range (`.l-range`, same folded facets as the logo, in the stain palette) as fallback art behind the photo, hidden once `hero.webp` exists. The hero photo is a parallax layer (`data-speed`) under a dark gradient overlay so the white headline stays readable. `script.js` eases the scroll position each frame for smooth motion and drifts photos inside `.media` frames (`data-drift`).
- Sections use clean straight edges, scroll-reveal (`.reveal`) and light cards. Everything must respect `prefers-reduced-motion`.

## Placeholders to replace before launch

- Phone `(801) 555-0100` and email `quotes@example.com` are fake. They appear in `index.html` (footer and form `action`) and in `script.js` (`QUOTE_EMAIL`). Remove the "Development mode" notice in the quote section and the footer note when real details are in.
- Photos: drop the files listed under Style into `images/`. Until then the slots show placeholder labels.
- The About section avoids credentials the business doesn't have yet (no licensed/insured/years claims). Only add credibility claims the owner confirms.
- The quote form posts to a hosted form endpoint set in `FORM_ENDPOINT` in `script.js` (set to the owner's Formspree form, `https://formspree.io/f/mppqnygv`). The owner's real inbox address must never appear in the site files, so the endpoint URL (not an email) is what goes in the code. The footer email `quotes@example.com` is still a placeholder.

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
