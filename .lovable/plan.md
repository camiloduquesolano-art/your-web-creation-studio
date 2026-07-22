## Objetivo

Portar la landing page de Shroomed (archivos `index.html`, `index-en.html`, `style.css`, `app.js` subidos) al proyecto TanStack Start, respetando el diseño psicodélico-retro del brandbook (paleta, tipografías Bagel Fat One / Fredoka / Poppins, stickers SVG, sombras retro, waitlist).

Con **soporte bilingüe ES + EN**.

## Rutas e i18n

- `/` → español (idioma por defecto, el original `index.html`).
- `/en` → inglés (`index-en.html`).
- Selector de idioma (ES | EN) en la barra de navegación de ambas rutas, hecho con `<Link>` de TanStack Router.
- Cada ruta define su propio `head()` con `title`, `description`, `og:*`, `twitter:*` en el idioma correspondiente + `canonical` y `og:url` autoreferenciales (relativos). En el head se emite también `<link rel="alternate" hreflang="es" href="/">` y `hreflang="en" href="/en">` para SEO.
- Los textos se guardan en un diccionario `src/lib/i18n/shroomed.ts` con dos claves `es` y `en`; cada página elige el bloque correspondiente. Sin librería de i18n (evita complejidad).

## Alcance

- Landing estática, sin backend. Waitlist en `localStorage` igual que el `app.js` original (mismo `STORAGE_KEY` y base `842`).
- Nada de blog/app interna.

## Pasos

1. **Fuentes**: `<link>` a Google Fonts (Bagel Fat One, Fredoka, Poppins) en `src/routes/__root.tsx`. Registrar familias en `@theme` de `src/styles.css`.
2. **Design tokens** en `src/styles.css`: paleta oficial (yellow, coral, navy, cream, peach, rose, lime, mint, blue, teal, sky, gray-blue) como variables `:root` + `@theme inline` (`--color-shroom-*`). Sombras retro (`--shadow-retro`, `--shadow-retro-lg`). Fondo base cream, texto navy. Keyframes para stickers flotantes.
3. **Diccionario** `src/lib/i18n/shroomed.ts`: objeto con todos los strings ES/EN (nav, hero, features, how it works, testimonials, final CTA, footer, toast messages, goal options).
4. **Componentes** en `src/components/shroomed/` (reciben `dict` como prop, agnósticos del idioma):
   - `FloatingStickers.tsx` — SVGs decorativos animados.
   - `Nav.tsx` — logo + anclas + switch ES/EN.
   - `Hero.tsx` — título groovy, form waitlist (email + select goal), contador `842 + N`.
   - `Features.tsx`, `HowItWorks.tsx`, `Testimonials.tsx`, `FinalCTA.tsx`, `Footer.tsx`, `Toast.tsx`.
   - `ShroomedLanding.tsx` — compone la página completa dado un `dict` y `lang`.
5. **Waitlist** `src/lib/waitlist.ts`: `getStoredUsers`, `saveUser`, `getSubscriberCount` (base 842). Lectura en `useEffect` para evitar mismatch SSR.
6. **Rutas**:
   - `src/routes/index.tsx` → renderiza `<ShroomedLanding dict={dict.es} lang="es" />` + `head()` en español.
   - `src/routes/en.tsx` → renderiza `<ShroomedLanding dict={dict.en} lang="en" />` + `head()` en inglés.
7. **Verificación**: preview en móvil y desktop, submit del form en ambas rutas, cambio de idioma con el switch.

## Detalles técnicos

- Colores solo vía tokens semánticos (`bg-shroom-cream`, `text-shroom-navy`, etc.) — nada de hex hardcoded en JSX.
- Bordes 3px navy + radios grandes + sombra offset navy = look retro.
- Stickers SVG inline como componentes React.
- Formularios: `preventDefault`, `saveUser`, mostrar `<Toast>` 3 s con mensaje del dict.
- `canonical` y `og:url` siempre relativos y autoreferenciales por ruta; `hreflang` cruzado entre `/` y `/en`.

## Fuera de alcance

- Persistencia real (Lovable Cloud).
- Traducción automática de nuevos textos: el diccionario se edita a mano.
- Rutas adicionales (blog, dashboard).
