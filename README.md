# corem4thh

Static website for an independent digital studio. Plain HTML, CSS and JavaScript (ES modules), no build step and no runtime dependencies.

## Structure

- `index.html`: semantic markup, home, services, about me and contact, plus the SVG icon sprite
- `css/styles.css`: design tokens, dark and light themes, the Living Gradient (`.ambient`), layout and responsive rules
- `js/content.js`: editable list of services
- `js/i18n/`: one file per language plus `index.js` (language list, lookup and DOM update)
- `js/components.js` and `js/icons.js`: render the services and their interface illustrations (inline SVG)
- `js/theme.js`: light and dark switch with a saved preference
- `js/lang-menu.js`: accessible language selector
- `js/main.js`: wiring, mobile menu, entrance animations, active navigation and the scroll drift of the Living Gradient
- `vercel.json`: Vercel configuration (asset caching and headers)
- `tests/i18n.test.mjs`: checks that every language has the same keys

## Local development

ES modules need a server (opening the file directly won't work):

    npx serve .
    # or
    python3 -m http.server 8000

## Languages

English is the default. Supported: EN, ES, FR, RU, DE. The choice is stored in `localStorage` (`corem-lang`).

To add a language:

1. Copy `js/i18n/en.js` to `js/i18n/xx.js` and translate every value.
2. Import it in `js/i18n/index.js` and add an entry to the `languages` array.
3. If its words are long, tune the `--hs` scale for `html[lang=xx]` in `css/styles.css`.
4. Run `node --test tests/i18n.test.mjs`.

Every visible string lives in the dictionaries. Elements are bound with `data-i18n="section.key"` and attributes with `data-i18n-attr="aria-label:section.key"`.

## Living Gradient

Five soft radial layers in `.ambient` (fixed, behind all sections). Colors are the `--gc1..5` tokens per theme; drift and opacity animations are 60–150 s and run on the compositor only (transform and opacity). The scroll position shifts the layers through `--p`. Disabled with `prefers-reduced-motion`.

## Themes

Dark is the default. The choice is stored in `localStorage` (`corem-theme`) and applied by an inline script in `<head>` before the first paint, so there is no flash.

## Editing content

- Services: ids live in `js/content.js`, their texts in each language file; each id needs an illustration in `js/icons.js`.
- About me: `about.*` keys in every dictionary.
- Discord and GitHub: the two profile links appear only as icons, in the navbar and in the contact section. Update the URLs in `index.html`.

## Fonts

The page loads Unbounded (display), Manrope (text) and JetBrains Mono (labels) from Google Fonts and falls back to Inter and system fonts. To self-host them, download the `.woff2` files into `assets/fonts`, declare `@font-face` in `css/styles.css` and remove the Google Fonts links from `index.html`.

## Deployment

Vercel: import the repository at vercel.com, set Framework Preset to "Other", leave the build command and output directory empty. `vercel.json` is already configured.

Netlify: drag the folder in or connect the repository; no build command, publish directory `.`.

GitHub Pages: Settings → Pages → Deploy from a branch → `main` and `/ (root)`. All paths are relative, so it also works from a subfolder.
