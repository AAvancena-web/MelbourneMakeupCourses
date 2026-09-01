# Tamarua Beauty Academy — homepage redesign for Shopify

This folder is the redesigned homepage from `index.html` at the repo root,
converted into Shopify sections you can drop into the live theme by hand.

It renders **pixel-for-pixel identical** to the approved standalone design at
1600px, 1900px and 390px wide (verified with headless Chromium screenshots
diffed against the standalone file), and every interaction — mega menus, mobile
drawer, drawer and footer accordions, the "Read More" panel, the reviews
marquee and its per-card "Read more" — behaves the same.

---

## What's in here

```
assets/
  tba-redesign.css      all the styling (namespaced, see "Why tba-" below)
  tba-redesign.js       header, drawer, accordions, read-more, reviews marquee
  tba-*.webp / .jpg     the photos the design ships with
  tba-logo.svg          wordmark fallback if no logo is set
sections/
  tba-announcement.liquid   gold bar (socials · award line · phone + login)
  tba-header.liquid         black sticky header, 3 mega menus, mobile bar, drawer
  tba-hero.liquid           banner, headline, CTAs, consultation form, proof cards
  tba-reviews.liquid        Google reviews marquee (28 reviews, one per block)
  tba-courses.liquid        "Choose your path" — 8 course cards
  tba-award.liquid          2025 award band + press logos
  tba-intro.liquid          SEO copy with Read More + video
  tba-success-story.liquid  Ashleigh's story
  tba-founder.liquid        Meet Maggie
  tba-student-stories.liquid  3 graduate cards
  tba-newsletter.liquid     newsletter signup over the dark banner
  tba-contact.liquid        details + Google map + consultation form
  tba-footer.liquid         black footer
snippets/
  tba-image.liquid      image with theme-editor picker + bundled fallback
  tba-logo.liquid       shared brand lockup
templates/
  index.json            ready-made homepage wiring for all ten body sections
theme-liquid-snippet.liquid   reference for the theme.liquid edits (not copied)
```

---

## Install

Work on a **duplicate** of the live theme, not the published one.

**1. Copy the files in.**

From the theme editor: *Online Store → Themes → ⋯ → Edit code*, then add each
file under the matching folder (`assets`, `sections`, `snippets`, `templates`).
Or, with the Shopify CLI:

```bash
shopify theme pull --theme "Copy of Turbo"           # get the current theme
cp -r shopify/assets/*   <theme>/assets/
cp -r shopify/sections/* <theme>/sections/
cp -r shopify/snippets/* <theme>/snippets/
cp shopify/templates/index.json <theme>/templates/index.json   # see step 2
shopify theme push --theme "Copy of Turbo"
```

**2. Decide what to do with `templates/index.json`.**

- Replacing the homepage outright → copy it over the theme's existing
  `templates/index.json` (**keep a copy of the old one first**).
- Keeping the current homepage as a fallback → save it as
  `templates/index.tba.json` instead, then in the theme editor switch the
  homepage template to "tba". Either way the sections arrive with all their
  content already filled in.

**3. Edit `layout/theme.liquid`** — four small changes, spelled out in
`theme-liquid-snippet.liquid`:

- add the Google Fonts links and the CSS/JS tags in `<head>`
- add `tba-theme` to the `<body>` class list
- swap the theme's announcement bar and header for
  `{% section 'tba-announcement' %}` and `{% section 'tba-header' %}`
- swap the theme's footer for `{% section 'tba-footer' %}`

**4. Preview, then publish.** Check the homepage, an interior page (the header
and footer are site-wide), and the mobile drawer.

---

## Editing the content

Everything a merchant is likely to change is a theme-editor setting: headings,
eyebrows, body copy, button labels and links, phone/email/address, the map, the
promo line, and every image.

Repeating items are **blocks**, so they can be added, removed and reordered from
the editor:

| Section | Blocks |
|---|---|
| Reviews | one per Google review (28 shipped) |
| Courses | one per course card (8 shipped) |
| Award | one per press logo (3 shipped) |
| Success story | one per thumbnail (3 shipped) |
| Founder | one per credential line (3 shipped) |
| Student stories | one per graduate (3 shipped) |
| Footer | one per link column (3 shipped) |

Two things stay in code, on purpose:

- **The mega menus and the mobile drawer links** live in
  `sections/tba-header.liquid`. Shopify's navigation menus only go two levels
  deep and carry no images, so they can't express the three-level, image-led
  structure this design uses. Edit the lists in that file.
- **Footer link columns** take one link per line as `Label | /url`, so they
  don't depend on any particular menu existing in the store.

### Images

Every image is an `image_picker` setting with the bundled photo as a fallback,
so the sections look right the moment they're added and any photo can be swapped
without touching code. Block images also have a **Bundled image** field — the
filename in `assets/` used when nothing is picked.

### Forms

The hero and contact forms post through Shopify's own contact form, so
submissions arrive at the store's contact email with no app required. The
newsletter form creates a customer tagged `newsletter`.

To keep the existing **Hulk Form Builder** forms instead, set *Form provider* to
**Custom embed code** on the section and paste the app's embed into
*Custom form embed*. The heading, subtitle and promo line above the form stay
as they are.

---

## Why everything is prefixed `tba-`

Turbo defines its own `.btn`, `.section`, `.header`, `.footer`, `.nav`,
`.container` and dozens more. Every class and CSS custom property in this pack
is prefixed so the two stylesheets can't collide in either direction — 83 of the
design's original 146 class names would otherwise have clashed. **Don't rename
the prefix**; the CSS, the markup and `tba-redesign.js` all depend on it.

The base element rules (`img`, `a`, `button`, `p`, headings) are scoped to
`.tba-scope`, the wrapper each section renders, so they can't leak into the rest
of the theme. They're written with `:where()` so they keep the same specificity
a bare element selector would have — without that, `.tba-scope p` would outrank
component rules like `.tba-eyebrow` and quietly change the design.

Two rules are deliberately global: `html { scroll-behavior: smooth }` (so the
`#courses` and `#contact` anchors glide) and the `:root` custom properties,
which are all `--tba-` prefixed.

---

## Notes

- `tba-redesign.js` is idempotent and re-runs on `page:load` (Turbo's
  InstantClick) and `shopify:section:load` (theme editor), so nothing
  double-binds and nothing goes dead after a soft navigation.
- The reviews are rendered server-side in Liquid, not injected by JavaScript,
  so the review text is in the HTML for search engines. The script only clones
  the row once for the seamless loop.
- The intro's long-form copy is always in the page source; "Read More" only
  animates `max-height`, so none of it is hidden from crawlers.
- The design is capped at 1440px, widening to 1880px above 1700px viewports, as
  specified.
- No analytics or tracking was added.
