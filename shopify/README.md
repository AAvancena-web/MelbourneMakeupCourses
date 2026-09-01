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

## Install — step by step

Two routes. **Route A (Shopify admin)** needs no tools, just a browser — allow
about 45 minutes, most of it uploading images. **Route B (Shopify CLI)** does
the same thing in two commands if you have the CLI installed.

Whichever you use, **work on a duplicate theme, never the published one.**

### Step 0 — get the files

Download this repo's branch as a ZIP from GitHub (**Code → Download ZIP**) and
unzip it. Everything you need is in the `shopify/` folder.

### Step 1 — duplicate the theme

*Shopify admin → Online Store → Themes*. On the live Turbo theme click the
**⋯** button → **Duplicate**. You'll get "Copy of Turbo". Do all the work on
the copy; the live site is untouched until you publish.

---

### Route A — Shopify admin

#### Step 2 — upload the assets (26 files)

On the duplicate theme: **⋯ → Edit code**. In the left sidebar find **Assets**
→ **Add a new asset** → **Upload file**. You can multi-select, so drag all 26
files from `shopify/assets/` in at once:

- `tba-redesign.css` and `tba-redesign.js`
- `tba-logo.svg`
- the 23 `.webp` / `.jpg` photos

Uploading them again later overwrites in place, so it's safe to repeat.

#### Step 3 — create the 13 sections

Still in **Edit code**, under **Sections** → **Add a new section**. Name it
exactly as below — **without** the `.liquid` (Shopify adds it) — choose
**Liquid** (not JSON) if it asks, then **select all the boilerplate Shopify
pre-fills and delete it** before pasting the file's contents.

| Name it | Paste from |
|---|---|
| `tba-announcement` | `shopify/sections/tba-announcement.liquid` |
| `tba-header` | `shopify/sections/tba-header.liquid` |
| `tba-hero` | `shopify/sections/tba-hero.liquid` |
| `tba-reviews` | `shopify/sections/tba-reviews.liquid` |
| `tba-courses` | `shopify/sections/tba-courses.liquid` |
| `tba-award` | `shopify/sections/tba-award.liquid` |
| `tba-intro` | `shopify/sections/tba-intro.liquid` |
| `tba-success-story` | `shopify/sections/tba-success-story.liquid` |
| `tba-founder` | `shopify/sections/tba-founder.liquid` |
| `tba-student-stories` | `shopify/sections/tba-student-stories.liquid` |
| `tba-newsletter` | `shopify/sections/tba-newsletter.liquid` |
| `tba-contact` | `shopify/sections/tba-contact.liquid` |
| `tba-footer` | `shopify/sections/tba-footer.liquid` |

Save each one. If a save fails, the error names the line — it's almost always
a partial paste, so re-copy the whole file.

#### Step 4 — create the 2 snippets

**Snippets** → **Add a new snippet**, same routine:

| Name it | Paste from |
|---|---|
| `tba-image` | `shopify/snippets/tba-image.liquid` |
| `tba-logo` | `shopify/snippets/tba-logo.liquid` |

These are shared helpers — the sections won't render without them.

#### Step 5 — wire up the homepage

Under **Templates**, open the existing **`index.json`**.

**Copy its current contents into a text file first** — that's your undo if you
want the old homepage back.

Then select everything in the editor, delete it, and paste the contents of
`shopify/templates/index.json`. Save.

That single file lays out all ten body sections in order, with every heading,
paragraph, image, review and course card already filled in.

> Want to keep the old homepage live while you preview? Instead of overwriting
> `index.json`, use **Add a new template → home → JSON**, name it `tba`, paste
> the file there, and set the homepage to that template in the theme editor.

#### Step 6 — edit `layout/theme.liquid`

Four changes. Open **Layout → theme.liquid**.

**6a. In `<head>`**, after the theme's own stylesheet `<link>` tags, add:

```liquid
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
{{ 'tba-redesign.css' | asset_url | stylesheet_tag }}
<script src="{{ 'tba-redesign.js' | asset_url }}" defer></script>
```

**6b. Add `tba-theme` to the `<body>` class list** — keep every class that's
already there:

```liquid
<body class="tba-theme template-{{ request.page_type }} ...">
```

**6c. Swap the header.** Find the announcement bar and header sections — in
Turbo they look like `{% section 'announcement-bar' %}` and
`{% section 'header' %}`, near the top of `<body>`. Replace those two lines
with:

```liquid
{% section 'tba-announcement' %}
{% section 'tba-header' %}
```

**6d. Swap the footer.** Find `{% section 'footer' %}` near the bottom and
replace it with:

```liquid
{% section 'tba-footer' %}
```

Comment out the old lines rather than deleting them (`{% comment %}` …
`{% endcomment %}`) if you'd rather keep them handy.

Save.

---

### Route B — Shopify CLI

```bash
shopify theme pull --theme "Copy of Turbo" --path ./turbo-copy

cp shopify/assets/*   turbo-copy/assets/
cp shopify/sections/* turbo-copy/sections/
cp shopify/snippets/* turbo-copy/snippets/

cp turbo-copy/templates/index.json turbo-copy/templates/index.backup.json   # keep the old one
cp shopify/templates/index.json turbo-copy/templates/index.json

# make the four theme.liquid edits from Step 6 by hand, then:
shopify theme push --theme "Copy of Turbo" --path ./turbo-copy
```

---

### Step 7 — check it

Back on **Themes**, click **Customize** on the duplicate (or **Preview**).
Walk through:

- **Homepage** — every section in order, images loading, nothing overlapping.
- **An interior page** (a collection or product) — the header and footer are
  site-wide now, so confirm they look right there too.
- **Mobile** — use the phone icon in the theme editor's preview bar, or open
  the preview link on your phone. Check the hamburger drawer opens, the
  course accordions expand, and the footer columns collapse.
- **Mega menus** — hover Courses / Online Courses / On-Site Courses on desktop.

### Step 8 — set the logo and the forms

In **Customize**:

- **TBA header** → **Logo** — pick your logo file. (Do the same on **TBA
  footer**.) Until you do, the design falls back to the theme logo, then to a
  bundled wordmark, so nothing looks broken either way.
- **TBA hero** and **TBA contact** → **Form provider**. Leave it on *Shopify
  contact form* and enquiries arrive at the email under *Settings →
  Notifications → Contact customer*. To keep your existing **Hulk Form
  Builder** forms, switch it to *Custom embed code* and paste the app's embed
  into *Custom form embed*.
- Check the phone number, address and opening hours on **TBA contact** and
  **TBA announcement bar**.

### Step 9 — publish

Happy with the preview? **Themes → ⋯ → Publish** on the duplicate.

If anything goes wrong afterwards, the old theme is still sitting in your theme
list — publish it again and you're back where you started in seconds.

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
