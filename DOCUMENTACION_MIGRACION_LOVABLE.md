---
title: "Se ve bien en localhost pero roto en Lovable — Postmortem & Guía de Migración Antigravity a Lovable"
date: 2026-07-21
tags: [dev, lovable, antigravity, css, tailwind, debugging, postmortem, obsidian-vault]
proyecto: your-web-creation-studio (Shroomed)
estado: resuelto
fuente: Antigravity AI + Claude Collaboration
---

# 🧠 Se ve bien en localhost pero roto en Lovable — Postmortem & Guía Definitiva

> [!summary] En una frase
> Un archivo `src/styles.css` con un `*/` duplicado (error de sintaxis en el parser `lightningcss` de Tailwind v4 que generaba **0 bytes de CSS**) y el diseño envuelto en `@layer components` hizo que la app React de Lovable cargara **sin estilos**, mientras que en local abría una versión estática distinta del sitio (`index.html` en la raíz).

---

## 🔍 Qué pasó exactamente

El repositorio tenía **dos versiones del mismo sitio** conviviendo:

1. **Versión estática** en la raíz: `index.html` + `style.css` + `app.js`. HTML/CSS/JS a mano, se veía perfecta. **Esto es lo que se veía en `localhost:4321`.**
2. **Versión React** en `src/`: componente `ShroomedLanding.tsx`, servido por TanStack Start, con estilos en `src/styles.css`. **Esto es lo único que Lovable construye y publica.**

Las dos usan las mismas clases de diseño (`.hero-section`, `.floating-sticker`, `.btn`, etc.), pero `src/styles.css` estaba roto por 4 causas principales:

- **Bug 1 — `*/` duplicado (Error de sintaxis fatal):** El comentario de cabecera cerraba con `====== */`, pero había una **segunda línea idéntica** justo debajo. Ese `*/` suelto es CSS inválido. El parser de Tailwind v4 (`lightningcss`) fallaba con `SelectorError(EmptySelector)` en esa línea y **generaba 0 bytes de CSS**, haciendo que Lovable renderizara texto negro plano sin estilos.
- **Bug 2 — Todo dentro de `@layer components { … }`:** El sistema de diseño completo (variables `:root`, `body`, clases) estaba envuelto en esa capa. En Tailwind v4 eso le baja la prioridad en la cascada y hace que buena parte no aplique.
- **Bug 3 — Tipado TypeScript (`Dict` i18n):** `ShroomedLanding.tsx` intentaba acceder a 21+ propiedades inexistentes en la interfaz `Dict` de `shroomed.ts` (`socialProof`, `p1`, `p2`, `demo`, `checklist`, etc.), haciendo que el build de producción de Vite/Nitro en Lovable fallara silenciosamente.
- **Bug 4 — `@import url()` desordenado en CSS:** Tener `@import url(...)` de Google Fonts después de `@import "tailwindcss";` causaba que Vite rechazara la hoja de estilos tras expandir Tailwind v4.

---

## 📌 Causa raíz (El patrón a recordar)

Cuando se parte de un diseño estático en **Antigravity** (HTML/CSS plano) y se migra a un stack de Lovable (**TanStack Start / Vite / Tailwind v4 / React**):

- **Dejar el sitio estático viejo en la raíz** confunde en local. En Lovable el `index.html` de la raíz **no se usa**: TanStack hace SSR desde `src/routes/`, no desde un `index.html` de Vite puro.
- **Pegar CSS plano dentro de `@layer` o meter errores de sintaxis** al copiar. `npm run dev` es permisivo y lo perdona, pero el build de producción (`lightningcss` / Nitro) de Lovable no.

---

## 💡 Cómo evitarlo la próxima vez (Antigravity ➔ Lovable)

> [!tip] Regla de oro
> Lo que ves en local **debe ser la misma app que Lovable construye**. Si tienes `index.html`/`app.js`/`style.css` sueltos en la raíz de un proyecto TanStack/Vite, borralos: estás mirando otra cosa.

### 📋 Checklist antes de dar por bueno un cambio:

- [x] **Corre `npm run build` en local**, no solo `npm run dev`. El build de producción atrapa errores de `lightningcss` y TypeScript que dev se traga.
- [x] **Confirma dónde vive el sitio real:** En Lovable/TanStack es `src/routes/` + componentes en `src/components/`, **no** el `index.html` de la raíz.
- [x] **No dejes versiones estáticas duplicadas:** Borra `index.html`, `style.css`, `app.js` sueltos de la raíz.
- [x] **CSS de Tailwind v4 sin `@layer`:** El sistema de diseño personalizado va **sin envolver en `@layer`** directamente después de `@import "tailwindcss";`.
- [x] **Valida el CSS con lightningcss:** `npx lightningcss src/styles.css -o /tmp/out.css` — si da 0 bytes o da error, hay un bug de sintaxis.
- [x] **Carga fuentes en `<link>`:** Google Fonts va en `<link>` dentro de `src/routes/__root.tsx`, no en `@import url()` en CSS tras Tailwind v4.
- [x] **Sensibilidad a mayúsculas en Linux:** `./Header` ≠ `./header`. Local (Mac/Windows) lo perdona, el CI/CD de Lovable no.

---

## 🛠️ El fix aplicado en `src/styles.css` y `src/`

1. **En `src/styles.css`:**
   - Se borró la línea `====== */` duplicada.
   - Se quitó `@layer components {` del inicio y su `}` de cierre del final.
   - Se removió `@import url()` para fuentes (cargadas via `<link>` en `__root.tsx`).
2. **En `src/components/shroomed/ShroomedLanding.tsx`:**
   - Se resolvieron las 21 propiedades de i18n (`Dict`) desalineadas (`social`, `items[]`, `body`, `features[]`, `placeholder`, `copyright`).
3. **En la raíz del proyecto:**
   - Se borraron `index.html`, `index-en.html`, `style.css` y `app.js`.

---

## 🩺 Diagnóstico rápido si vuelve a pasar

1. ¿Se ve bien en local pero mal en Lovable? → **Casi siempre es el build de producción (`lightningcss` / TypeScript), no el código de dev.**
2. Abre el preview de Lovable → **F12 ➔ Console** → revisa errores en rojo.
3. Corre `npm run build` local: si falla ahí, ese es el problema real.
4. Si el CSS "no aplica": revisa sintaxis con `lightningcss`, elimina `@layer` wrappers y confirma que estés editando el archivo que la app realmente importa (`src/styles.css`).

---

## 🔗 Links relacionados

- [[Tailwind v4 - notas]]
- [[Lovable - stack y cómo despliega]]
- [[Antigravity - flujo de trabajo]]
