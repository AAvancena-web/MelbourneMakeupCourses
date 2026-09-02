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
  tba-page-intro.liquid     page header — eyebrow, H1, intro copy
  tba-services.liquid       service cards with prices + policy panels + CTA
  tba-enquiry-form.liquid   enquiry form, standard or bridal layout
  tba-page-hero.liquid      full-bleed image hero with copy and buttons
  tba-steps.liquid          numbered process steps (CSS counters)
  tba-gallery.liquid        image grid, 2/3/4 columns
  tba-faq.liquid            accordion built on <details> — no JavaScript
snippets/
  tba-image.liquid      image with theme-editor picker + bundled fallback
  tba-logo.liquid       shared brand lockup
templates/
  index.json            ready-made homepage wiring for all ten body sections
  page.tba-bridal.json    Bridal Enquiry page
  page.tba-services.json  Makeup and Tan Services page
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

#### Step 2 — upload the assets

The stylesheet and script have to go in the theme; the images can go in either
place and the sections handle both.

**2a. The two code files → theme Assets.** On the duplicate theme:
**⋯ → Edit code**, then **Assets → Add a new asset → Upload file**, and upload
`tba-redesign.css` and `tba-redesign.js` from `shopify/assets/`.

**2b. The 24 images → Content → Files** (easier: it takes a bulk drag-and-drop).
Upload `tba-logo.svg` and the 23 `.webp` / `.jpg` photos.

Keep the filenames exactly as they are — the sections look them up by name.

> Prefer to keep the images in the theme's `Assets` folder instead? Upload them
> there and everything still works: the sections request the Content → Files
> copy first and fall back to `assets/` automatically. See **Where the images
> live** below.

Uploading again later overwrites in place, so it's safe to repeat.

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

Five find-and-replaces. The anchors below are from **Turbo 8.0.1**, which is
what this store runs; if a snippet doesn't match yours exactly, search for the
distinctive part of it.

**6a. Load the fonts, CSS and JS.** Find:

```liquid
    <!-- Stylesheets for Turbo -->
    {{ 'styles.css' | asset_url | stylesheet_tag }}
    {{ 'custom.css' | asset_url | stylesheet_tag }}
```

and add underneath it:

```liquid
    <!-- Tamarua Beauty Academy redesign -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
    {{ 'tba-redesign.css' | asset_url | stylesheet_tag }}
    <script src="{{ 'tba-redesign.js' | asset_url }}" defer></script>
```

It has to come *after* `custom.css` so the redesign's rules win any tie with
the theme's.

**6b. Add the `tba-theme` body class.** Find:

```liquid
  <body class="{% if template == '404' %}error-404{% else %}{{ template | replace: '.', '-' | handle }}{% endif %}"
```

and change the opening of the class attribute to:

```liquid
  <body class="tba-theme {% if template == '404' %}error-404{% else %}{{ template | replace: '.', '-' | handle }}{% endif %}"
```

Leave the `data-money-format` and other attributes below it alone.

**6c. Swap the header.** Find:

```liquid
    {% section 'header' %}
```

and replace it with:

```liquid
    {% section 'tba-announcement' %}
    {% section 'tba-header' %}
```

Turbo keeps its announcement bar *inside* the header section, which is why one
line becomes two.

**6d. Retire Turbo's mega menus.** Directly below the header sits a
`mega-menu-container` block that renders `mega-menu-1` … `mega-menu-5`. Those
panels are opened by the old header's navigation, which is gone, so they'd sit
in the page doing nothing. Wrap the whole block in a comment:

```liquid
    {% comment %}
    <div class="mega-menu-container nav-desktop__tier-1">
      ... leave the contents exactly as they are ...
    </div>
    {% endcomment %}
```

The redesign's mega menus live in `sections/tba-header.liquid`.

**6e. Swap the footer.** Find:

```liquid
    {% section 'footer' %}
```

and replace it with:

```liquid
    {% section 'tba-footer' %}
```

Save.

> **If your `theme.liquid` is wrapped in `{% capture content %}` … `{% endcapture %}`**
> (a whitespace-minifier some apps add), make all five edits *inside* the
> capture, exactly where the originals sit. The minifier collapses whitespace
> between tags and leaves this pack's markup intact.

---

### Route B — Shopify CLI

```bash
shopify theme pull --theme "Copy of Turbo" --path ./turbo-copy

cp shopify/assets/*   turbo-copy/assets/      # images here work too; see "Where the images live"
cp shopify/sections/* turbo-copy/sections/
cp shopify/snippets/* turbo-copy/snippets/

cp turbo-copy/templates/index.json turbo-copy/templates/index.backup.json   # keep the old one
cp shopify/templates/index.json turbo-copy/templates/index.json

# make the five theme.liquid edits from Step 6 by hand, then:
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

#### Where the images live

Shopify has two places a file can sit, and they need different Liquid filters:
`Content → Files` is reached with `file_url`, the theme's own `assets/` folder
with `asset_url`. Neither can see the other, and a file in the wrong one 404s.

The pack doesn't make you choose. Every bundled image is requested from
**Content → Files first**, with the theme `assets/` URL carried alongside it:

- `<img>` tags get `data-tba-fallback`, and `tba-redesign.js` swaps to it on the
  404 (one retry, then it stops).
- The newsletter's background is set as **two CSS layers**, Files then assets.
  A layer whose file is missing simply isn't painted, so the right one shows
  with no JavaScript involved.
- The logo walks a chain: the theme-editor logo, then Files, then `assets/`,
  then the CSS wordmark.

So the sections render correctly whichever place you uploaded to, and there is
no code edit to make either way. Only `tba-redesign.css` and `tba-redesign.js`
*must* be in theme `Assets` — `theme.liquid` loads those with `asset_url`.

`snippets/tba-image.liquid` always emits `width` and `height` on the `<img>`,
so the browser reserves the right box before the file arrives and Theme Check's
`ImgWidthAndHeight` rule passes. A picked image supplies its own dimensions;
the bundled fallbacks have theirs passed at each call site. If you add a press
logo block, fill in its **Bundled image width / height** with the file's real
pixel size.

### Forms

The hero and contact forms post through Shopify's own contact form, so
submissions arrive at the store's contact email with no app required. The
newsletter form creates a customer tagged `newsletter`.

To keep the existing **Hulk Form Builder** forms instead, set *Form provider* to
**Custom embed code** on the section and paste the app's embed into
*Custom form embed*. The heading, subtitle and promo line above the form stay
as they are.

Each form carries its own id — `tba-hero-form`, `tba-contact-form`,
`tba-newsletter-form` — rather than the `contact_form` Shopify would otherwise
give both `{% form 'contact' %}` tags. Two of those on one page would be a
duplicate id, and any theme script bound to `#contact_form` would silently
capture whichever came first. If you want a script or a conversion tag on these
forms, target the ids above.

A successful post reloads the page with `?contact_posted=true`, which is what
drives the success message. That flag isn't per-form, so both consultation
forms show their success line after either is submitted.

---

## The two service pages

`templates/page.tba-bridal.json` and `templates/page.tba-services.json` build
**Bridal Enquiry** and **Makeup and Tan Services** from the same three sections,
with the form section switched between its two layouts. All the copy is in the
templates, so both pages are fully editable from the theme editor.

**Bridal Enquiry** runs seven sections: image hero → Recent Work (a sliding
ribbon) → Packages & Booking → The Bridal Experience (four steps) → Meet
Maggie → FAQ → the bridal form. Backgrounds alternate so no two neighbouring
sections share one.

`tba-gallery` has two layouts. **Grid** is the default. **Sliding row** turns
it into a full-bleed ribbon travelling right to left on the same marquee
mechanics as the homepage reviews: the script clones the row once so the loop
is seamless and paces it by content width, so the speed holds whatever the
image count. It pauses on hover, and under `prefers-reduced-motion` the
animation stops and the row becomes an ordinary scroller. **Slide speed** is a
setting, in pixels per second.

`tba-enquiry-form` has a **Feature** background — a dark ground with two gold
glows, a slow twinkle, and an ivory card with a gold sheen edge and a shimmer
on the submit button. It is for the page you actually want people to convert
on; the other backgrounds stay flat. The **Ornament line** setting puts a small
gold rule and symbol above the heading. **Makeup and Tan Services** runs three: page intro → service
cards and policy panels → the standard form.

> **Draft copy to approve.** The steps, the "What's Included" list and the six
> FAQ answers on the bridal page are drafts written around the brief, not
> supplied text. The award credits, the $1200 starting price and the 7-day
> cancellation terms all come from the brief and are accurate. Read the drafts
> before publishing.

> **The bridal photos are samples, and cannot go live as they are.** The hero
> and the 20-image Recent Work grid use reference photos supplied for layout,
> sourced from a "best bridal makeup artists" roundup. They are other artists'
> work and other photographers' images — publishing them on a page selling
> Maggie's services would be both a copyright problem and a misrepresentation.
> They are renamed `tba-bridal-01…20.webp` so no one else's name ends up in the
> page source, but that makes them tidier, not publishable. Replace them with
> Maggie's own portfolio before this page goes live: each is an image block in
> the theme editor, and the hero image is one setting.

### Publishing them

1. **Online Store → Pages → Add page.** Title it *Bridal Enquiry*, leave the
   body empty, and under **Theme template** choose `tba-bridal`. Save.
2. Repeat for *Makeup and Tan Services* with the `tba-services` template.
3. Add both to a navigation menu under **Online Store → Navigation**.

The templates appear in that dropdown once `page.tba-bridal.json` and
`page.tba-services.json` are in the theme's `templates/` folder.

### The bridal form's inspiration images

The mockup has an image upload. **Shopify's contact form cannot carry file
attachments**, so the field ships as a **link** — for a Pinterest board,
Instagram saves or a shared album — which works with no app.

Switch **Inspiration images** to *Upload box* and the section renders the
upload UI from the mockup, with a client-side list of the chosen files. Those
files only reach anyone if the section's **Form provider** is set to *Custom
embed code* with a form app's embed (Hulk Form Builder handles attachments).

### The Book & Pay button

The brief calls for a calendar with live availability and payment at booking.
That needs a booking app — Shopify has no native appointment calendar. The
button is wired to the enquiry form for now; point **Booking button → Button
link** at the app's page once one is installed. Everything else on the page —
prices, deposits, cancellation terms, the four-month booking window — is
already in place.

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

## Theme Check

`layout/theme.liquid` in this folder is clean under Theme Check. Two findings
that fire on the stock Turbo layout are dealt with here, and it is worth
knowing why each was handled the way it was.

**`LiquidHTMLSyntaxError` — "Attempting to end parsing before HtmlRawNode
'script' was closed".** Shopify's LiquidHTML parser ends a `<script>` raw node
at any `<` followed by a letter or slash, and Turbo's inlined lazysizes has
eight comparisons that look like tag openings (`i<H.minSize`, `n<s`, `e<t`).
Browsers are unaffected — script raw text ends only at `</script` — but the
parse failure stops every other check from running on the file. Fixed by
spacing the comparison operators (`i< H.minSize`) and, where the `<` sits
inside a string, escaping it as `\x3C` so the string's value is unchanged.

**`ParserBlockingScript`** fired on three `<script src>` tags, none of them the
redesign's. Adding `defer` is not uniformly safe, so they are split:

| Tag | Handling |
|---|---|
| Shopify's `/services/javascripts/currencies.js` | Rule disabled around it. Turbo loads it synchronously so the `Currency` global exists for `js-variables` and `app.js`. |
| Afterpay's `shopify-afterpay-javascript.js` | Rule disabled around it. It is the payment vendor's own snippet, shipped without `defer`. |
| jQuery 3.6.0 from `code.jquery.com` | **Removed.** It was a second copy of jQuery on top of the theme's own, replacing the global `$` after Turbo had set it up. The one snippet that used it now runs on `DOMContentLoaded`, by which point the theme's deferred jQuery has executed. |

The rule is silenced with `{% # theme-check-disable ParserBlockingScript %}` /
`{% # theme-check-enable ParserBlockingScript %}` around those two vendor tags
rather than globally, so a genuinely blocking script added later still gets
flagged.

**`HardcodedRoutes`** warnings remain in `tba-header.liquid` — the mega menu
links to specific collections and products that the `routes` object cannot
express. Intentional.

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
