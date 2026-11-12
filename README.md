# LUXORA website – Beginner Guide
## Open it
Open the folder `luxora` and double-click `index.html`. Use Chrome. You need internet (fonts, photos, animation libraries).
## Edit your details
1. Open `script.js` with Notepad or TextEdit.
2. At the top, find `CONFIG` (a list of your business details). Replace every value marked `REPLACE`.
3. Below it, the `CATS` list holds the menu. Each line looks like `Name:Description:Price`. Edit freely.
4. Save and refresh the browser.
## Put it online free (Netlify Drop)
1. Go to https://app.netlify.com/drop (Netlify is a free host: a company that keeps your site online).
2. Drag the whole `luxora` folder onto the page. No terminal commands are needed.
3. Copy the link it gives you.
## Placeholders
Address, hours, phone, email, Instagram, map link, all menu items and prices, and all Unsplash demo photos are samples. Replace them.

## About the photos
All photos are your own, stored in the `assets` folder. To change one, replace the file with a new one of the same name, or edit its name in `script.js` (`CATS`, `SPEC`, `GALL`). Menu descriptions and prices are samples.

## UI/UX upgrade notes
- `styles.css` is now organised in numbered sections (tokens, base, nav, hero … responsive, reduced motion). Colours, spacing, shadows and timings are CSS variables at the top.
- Breakpoints: laptop ≤1279px, tablet ≤900px, mobile ≤760px (hamburger menu), small phone ≤560px. The specialties pin-scroll in `script.js` uses the same 900px breakpoint.
- The hero photo `assets/hero-front.jpg` is only 258×258 px, so it looks soft when stretched full-screen. Replace it with a photo at least 1920 px wide (same file name) for a truly sharp start screen.
