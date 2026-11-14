# corem4thh

Sitio estático del estudio digital independiente corem4thh. HTML, CSS y JavaScript con módulos ES, sin dependencias ni paso de compilación.

## Estructura

- `index.html` — estructura semántica y secciones fijas (hero, contacto, pie)
- `css/styles.css` — estilos y diseño responsive
- `js/content.js` — contenido editable: servicios, stack y proceso
- `js/components.js` — componentes que convierten ese contenido en HTML
- `js/main.js` — render, menú móvil, animaciones de entrada y navegación activa
- `js/sculpture.js` — escultura metálica del hero (WebGL, sin librerías)
- `vercel.json` — configuración de Vercel (caché de assets y cabeceras)

## Desarrollo local

Los módulos ES requieren un servidor (no abre con doble clic):

    npx serve .
    # o
    python3 -m http.server 8000

## Editar contenido

- Servicios y proceso: edita los arreglos `services` y `workflow` en `js/content.js`.
- Stack: el arreglo `stack` en `js/content.js` está vacío a propósito. Mientras esté vacío, la sección y su enlace del menú no se muestran. Añade solo tecnologías que domines de verdad, por ejemplo:

      { name: "javascript", note: "language", glyph: "js" }

  Al añadir la primera, la sección aparece sola.
- Enlaces de Discord y GitHub: están en `index.html` (menú, contacto y pie).

## Despliegue

Vercel: importa el repositorio en vercel.com, Framework Preset "Other", sin build command y con el directorio de salida vacío. `vercel.json` ya está configurado.

Netlify: arrastra la carpeta o conecta el repositorio; sin build command y con publish directory `.`.

GitHub Pages: Settings → Pages → Deploy from a branch → `main` y `/ (root)`. Todas las rutas son relativas, así que funciona también en subcarpetas.

## Fuentes

Usa Geist o Inter si están instaladas y, si no, la fuente del sistema. Para autoalojar Geist, añade los `.woff2` en `assets/fonts` y declara `@font-face` en `css/styles.css`.
