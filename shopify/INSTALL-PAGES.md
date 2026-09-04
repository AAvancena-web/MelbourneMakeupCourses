# Publishing the two service pages in Shopify

A checklist for getting **Bridal Enquiry** and **Spray Tanning** live in the
Turbo theme. Everything here is copy-and-paste from this folder — nothing is
generated at install time.

Work on a **duplicated theme** (Online Store → Themes → ⋯ → Duplicate) and
preview it before publishing. Nothing below touches products, orders or
customers.

---

## 0. Before you start

These pages need the shared stylesheet, script and fonts that the homepage
redesign already loads from `theme.liquid`. Open `theme.liquid` in the theme
editor and search for `tba-redesign.css`.

- **Found it** — the homepage pack is installed, skip to step 1.
- **Not found** — do the `theme.liquid` edits in [README.md](README.md) first
  (the `<head>` additions and the `tba-theme` body class). The pages render
  unstyled without them.

---

## 1. Upload the images

**Content → Files → Upload files.** The filenames must match exactly,
lowercase, including the `.webp` extension — the sections look them up by name.

From `shopify/assets/` in this repo:

| Page | Files |
|---|---|
| Bridal | `tba-bridal-01.webp` … `tba-bridal-12.webp` (12 files) |
| Spray Tanning | `tba-spraytan-01.webp` … `tba-spraytan-08.webp`, `tba-spraytan-banner.webp` (9 files) |
| Both | `tba-maggie.webp` (Meet Maggie's portrait) |

The bridal hero uses `tba-bridal-04.webp`, so there is no separate bridal
banner file to upload.

If `tba-maggie.webp` is already in Files from the homepage install, skip it —
uploading again creates `tba-maggie_1.webp` and the section won't find it.

> Shopify serves these from its CDN. If a page shows empty image boxes after
> install, it is almost always a filename typo or a `_1` suffix from a
> duplicate upload.

---

## 2. Add the sections

**Online Store → Themes → ⋯ → Edit code → Sections → Add a new section.** Name
each one exactly as below (Shopify appends `.liquid` itself), delete the
boilerplate it creates, paste the file from `shopify/sections/`, Save.

| Section | Used for |
|---|---|
| `tba-page-hero` | the image hero on both pages |
| `tba-gallery` | Recent Work, grid or sliding ribbon |
| `tba-services` | service cards and detail panels |
| `tba-reviews` | the Google reviews marquee |
| `tba-founder` | Meet Maggie |
| `tba-faq` | the accordion |
| `tba-enquiry-form` | both forms, standard and bridal |
| `tba-page-intro` | only for the Makeup and Tan Services page |

Six of the eight are new — only `tba-reviews` and `tba-founder` exist in the
homepage pack. `tba-reviews` is unchanged, so leave it alone; **replace
`tba-founder`**, which gained an anchor setting so *Meet Maggie* can be linked
to from the page's buttons.

Then **Snippets → Add a new snippet**, name it `tba-image`, and paste
`shopify/snippets/tba-image.liquid`. Every section renders its images through
it. If it is already there, leave it.

---

## 3. Refresh the stylesheet and script

**Assets → `tba-redesign.css`** and **`tba-redesign.js`** — replace both with
the copies in `shopify/assets/`. The page styles live in the same file as the
homepage styles, so an older copy will render these pages wrong even though the
homepage still looks right.

---

## 4. Add the page templates

**Templates → Add a new template.** The dialog has three fields, and the name
belongs in the last one only:

| Field | Value |
|---|---|
| Create template for | **page** — pick it from the dropdown |
| Template type | **JSON** |
| File name | `tba-bridal` |

Then replace everything in the file it creates with the contents of the matching
file in `shopify/templates/`:

| File name | Paste from |
|---|---|
| `tba-bridal` | `page.tba-bridal.json` |
| `tba-spray-tan` | `page.tba-spray-tan.json` |
| `tba-services` | `page.tba-services.json` (optional third page) |

Shopify saves them as `templates/page.tba-bridal.json` and so on.

> **"Template type 'tba-bridal' does not support JSON templates"** means the
> name went into the *Create template for* field. That field is the Shopify
> object the template renders — page, product, collection — not a name you
> choose. Set it to **page** and put `tba-bridal` in **File name**.

> **No JSON option at all, or no `.json` files anywhere under Templates?** The
> theme predates Online Store 2.0 and cannot take JSON page templates. Say so
> and the pages can be rebuilt as Liquid templates instead — the same sections,
> with their settings baked into the section files rather than editable in the
> theme editor.

If it warns about an *invalid* JSON template, a section name in step 2 does not
match — the `type` values in the template are the section filenames without
`.liquid`.

---

## 5. Create the pages

**Online Store → Pages → Add page.**

| Title | Template | URL it gets |
|---|---|---|
| Bridal Enquiry | `tba-bridal` | `/pages/bridal-enquiry` |
| Spray Tanning | `tba-spray-tan` | `/pages/spray-tanning` |

Leave the page body **empty** — all the copy is in the template, and anything
typed in the body renders above the hero.

Set the SEO title and description under **Search engine listing → Edit**:

- Bridal Enquiry — *Bridal Makeup Melbourne | Tamarua Beauty Academy* ·
  "Award-winning bridal makeup in Melbourne with Maggie Tamarua. Packages start
  from $1200 — enquire to receive Maggie's bridal offerings and book a
  consultation."
- Spray Tanning — *Spray Tanning Melbourne | Tamarua Beauty Academy* ·
  "Custom, streak-free spray tanning in Melbourne with Maggie Tamarua. Spray
  tans from $50, special occasion makeup from $200 — book online."

Save, then open each page in the theme preview.

---

## 5b. Send people to a thank-you page (optional)

Each form section has an **After submit, go to** setting in the theme editor.
Leave it empty and the form stays where it is and shows its success message;
point it at a page and a successful submission carries on there.

1. Make sure the destination page exists — **Online Store → Pages**. The theme
   already has a `page.thank-you` template if you want to use it.
2. **Customise → the page → the form section →  After submit, go to** → pick
   the page. Do this for each form you want redirected: the enquiry form on
   each service page, and on the homepage the hero form, the consultation form
   and the newsletter.
3. Submit a test enquiry and check you land on the thank-you page.

Point it at a page that exists — an empty or mistyped URL sends a real enquiry
to a 404. Two notes on behaviour: there is a brief flash of the form's success
message before the redirect, because Shopify sends the browser back to the form
page first and the hop happens from there; and a page with two contact forms on
it redirects after either is submitted, since Shopify's `contact_posted` flag is
not per-form.

---

## 6. Link them

**Online Store → Navigation.** Add both pages to the main menu, or to the
Services submenu if you would rather keep the top level as it is. The header on
these pages is the same one the homepage uses, so whatever you add appears
everywhere.

---

## 7. Check it works

On the preview URL, on a phone as well as a desktop:

1. **Images** — no empty boxes; the Recent Work ribbon slides and pauses on
   hover; on a phone it becomes a two-column grid showing every photo.
2. **Anchors** — Enquire Now jumps to the form, Meet Maggie to the artist
   section, Book Now to pricing.
3. **The form** — submit a real test enquiry. It arrives at the address in
   **Settings → Notifications → Customer contact**, as an ordinary Shopify
   contact-form email. The bridal form's extra fields (wedding date, venue,
   stylist and the rest) come through as labelled lines in that email.
4. **FAQ** — the accordion opens and closes.

---

## Two things that are not wired up

**Book & Pay** points at the enquiry form, not a calendar. Shopify has no
native appointment booking, so live availability and payment at booking need an
app; once one is installed, point the section's **Booking button → Button
link** at its page.

**Inspiration images** on the bridal form is a link field, because Shopify's
contact form cannot carry file attachments. The upload box in the mockup is
built and available — switch **Inspiration images** to *Upload box* — but the
files only reach anyone if you also set **Form provider** to *Custom embed
code* and paste in a form app's embed (Hulk Form Builder handles attachments).

---

## Still to replace before launch

- The **draft copy** flagged in [README.md](README.md): the bridal packages and
  FAQ answers, and the spray tan prep, aftercare, timing and FAQ text. Only the
  prices, the deposits and the cancellation windows came from the brief.
- The spray tan page says development time before rinsing is "the time agreed
  at your appointment". Put the real figure in.
- **Photo rights** on the twelve bridal images — they carry a photographer's
  watermark. Confirm the studio is licensed to publish them and ask for
  unwatermarked files.
