# corem4thh

Static website for corem4thh, an independent digital studio. Plain HTML, CSS and JavaScript (ES modules), with no dependencies and no build step.

## Structure

- `index.html`: semantic markup and fixed sections (hero, contact, footer)
- `css/styles.css`: styles and responsive layout
- `js/content.js`: editable content (services, stack and process)
- `js/components.js`: components that turn that content into HTML
- `js/main.js`: rendering, mobile menu, entrance animations and active navigation
- `js/sculpture.js`: metallic hero sculpture (WebGL, no libraries)
- `vercel.json`: Vercel configuration (asset caching and headers)

## Local development

ES modules need a server (opening the file directly won't work):

    npx serve .
    # or
    python3 -m http.server 8000

## Editing content

- Services and process: edit the `services` and `workflow` arrays in `js/content.js`.
- Stack: the `stack` array in `js/content.js` is intentionally empty. While it is empty, the section and its menu link are hidden. Only add technologies you genuinely work with, for example:

      { name: "javascript", note: "language", glyph: "js" }

  As soon as you add the first one, the section appears on its own.
- Discord and GitHub links: they live in `index.html` (menu, contact section and footer).

## Deployment

Vercel: import the repository at vercel.com, set Framework Preset to "Other", leave the build command and output directory empty. `vercel.json` is already configured.

Netlify: drag the folder in or connect the repository; no build command, publish directory `.`.

GitHub Pages: Settings → Pages → Deploy from a branch → `main` and `/ (root)`. All paths are relative, so it also works from a subfolder.

## Fonts

The site uses Geist or Inter when installed and falls back to the system font. To self-host Geist, add the `.woff2` files to `assets/fonts` and declare `@font-face` in `css/styles.css`.
