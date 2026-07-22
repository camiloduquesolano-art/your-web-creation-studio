---
title: "Guía de Migración & Troubleshooting: Google Antigravity a Lovable.dev"
date: 2026-07-21
tags:
  - webdev
  - antigravity
  - lovable
  - react
  - tailwindv4
  - tanstack-start
  - vite
  - troubleshooting
  - obsidian-vault
status: completed
---

# 🧠 Guía Definitiva de Migración: Google Antigravity ➔ Lovable.dev
> **Proyecto:** Shroomed Landing Page & Platform  
> **Fecha:** 21 de Julio, 2026  
> **Arquitectura:** HTML/CSS/JS Vanilla (Antigravity Prototype) ➔ TanStack Start + React + Vite + Tailwind CSS v4 (Lovable.dev)

---

## 📌 1. Resumen Ejecutivo

Durante el desarrollo de **Shroomed**, la versión inicial fue prototipada en **Google Antigravity** utilizando **HTML5 semántico, CSS3 puro y JavaScript moderno** en un servidor local (`http://localhost:4321`). 

Al sincronizar la base de código con **Lovable.dev** (conectado vía GitHub), se presentó una discrepancia visual y funcional significativa. Este documento detalla la investigación, los **6 problemas técnicos clave**, sus causas raíz en la canalización de compilación (*build pipeline*) de Vite/Nitro y la solución aplicada para garantizar la paridad del 100%.

---

## 🔍 2. Desglose Técnico de Problemas y Soluciones

### 🚨 Problema 1: Errores de Tipado TypeScript en el Diccionario i18n (Causa Raíz Principal de la Falla de Build)

* **Síntoma:** Lovable no actualizaba el preview y parecía ignorar los nuevos commits de GitHub.
* **Causa Raíz:** `ShroomedLanding.tsx` intentaba acceder a más de 21 propiedades inexistentes en la interfaz `Dict` de `src/lib/i18n/shroomed.ts` (por ejemplo, `dict.hero.socialProof` en lugar de `dict.hero.social`, `dict.pillars.p1` en lugar de `dict.pillars.items[0]`, `dict.vault.demo`, etc.). Esto hacía que la compilación de TypeScript (`tsc`) y el empaquetador Vite/Nitro fallaran en silencio en el entorno CI/CD de Lovable.
* **Solución:** Se realizó una auditoría completa del árbol de tipos y se reescribió `ShroomedLanding.tsx` alineando al 100% las propiedades con la interfaz `Dict`.

```typescript
// ❌ Antes (Error de compilación)
<span>{dict.hero.socialProof}</span>
<h3>{dict.pillars.p1.title}</h3>

// ✅ Después (Tipado estricto correcto)
<span>{dict.hero.social}</span>
<h3>{dict.pillars.items[0].title}</h3>
```

---

### 🎨 Problema 2: Orden Inválido de `@import` en CSS (Descarte Completo de Estilos en Navegador)

* **Síntoma:** Toda la página en Lovable se renderizaba sin ningún estilo CSS (texto negro plano, sin fuentes, sin colores).
* **Causa Raíz:** En `src/styles.css` se colocó la regla `@import url('https://fonts.googleapis.com/css2?...');` **después** de `@import "tailwindcss";`. Cuando el procesador de Tailwind v4 expandió la directiva `@import "tailwindcss"` en CSS nativo, la regla `@import url(...)` quedó en una posición interna inválida según la especificación W3C CSS, haciendo que el navegador descartara el archivo CSS completo.
* **Solución:** Se removió la importación `@import url(...)` del archivo CSS. Las fuentes de Google Fonts se cargaron directamente en el `<head>` del documento a través de etiquetas `<link>` dentro de `src/routes/__root.tsx`.

```tsx
// src/routes/__root.tsx
links: [
  { rel: "stylesheet", href: appCss },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Fredoka:wght@500;600;700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap",
  },
]
```

---

### 🧱 Problema 3: Conflicto con Resets Preflight de Tailwind v4 y Especificidad `@layer`

* **Síntoma:** Tipografías pequeñas, colores desalineados y elementos desconfigurados al cargar Tailwind v4.
* **Causa Raíz:** 
  1. Tailwind v4 inyecta un reset *Preflight* que sobreescribe los estilos por defecto de `h1`, `h2`, `h3`, `button`, `select`, y `input`.
  2. Al intentar envolver el CSS nativo en `@layer components` o `@layer base`, la especificidad de Tailwind v4 degradó la prioridad de las reglas custom frente a las reglas utilitarias.
* **Solución:** Se mantuvo el CSS nativo sin envoltorios de `@layer` directamente en `src/styles.css` inmediatamente después de `@import "tailwindcss";`. En la cascada de CSS v4, las reglas fuera de capa (*unlayered styles*) siempre ganan en especificidad sobre las reglas dentro de `@layer`.

---

### 👁️ Problema 4: Elementos Invisibles por Animaciones `reveal-up` (`opacity: 0`)

* **Síntoma:** Bloques completos de la landing no aparecían en pantalla.
* **Causa Raíz:** En la plantilla original HTML/CSS, la clase `.reveal-up` tenía `opacity: 0; transform: translateY(40px);` a la espera de que un script `IntersectionObserver` le agregara la clase `.active` al hacer scroll. En React, si no se ejecutaba la observación DOM en el ciclo de vida del componente, los elementos permanecían en `opacity: 0`.
* **Solución:**
  1. Se actualizó `src/styles.css` para que `.reveal-up` tenga visibilidad por defecto (`opacity: 1`).
  2. Se implementó un `useEffect` con `IntersectionObserver` en React para manejar las transiciones de scroll.

```tsx
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal-up, .reveal-fade").forEach((el) => {
    observer.observe(el);
  });

  return () => observer.disconnect();
}, []);
```

---

### 📌 Problema 5: Header Sticky Inoperativo por `overflow-x: hidden`

* **Síntoma:** El menú de navegación principal no se quedaba fijo en la parte superior al hacer scroll.
* **Causa Raíz:** En la especificación CSS, definir `overflow-x: hidden` (o cualquier `overflow` diferente de `visible`) en un contenedor padre anula la propiedad `position: sticky` en sus elementos hijos.
* **Solución:** Se eliminó `overflow-x: hidden` del contenedor principal (`site-wrapper` / `body`) y se ajustaron las propiedades de desbordamiento horizontal en secciones específicas cuando fue necesario.

---

### 📂 Problema 6: Duplicación de Código (Estáticos en Raíz vs. Componentes React en `src/`)

* **Síntoma:** Confusión entre los archivos servidos en `localhost:4321` y los servidos en Lovable.
* **Causa Raíz:** La presencia de `index.html`, `index-en.html`, `style.css` y `app.js` en la raíz del repositorio competía visualmente con la arquitectura SPA/SSR de React en `src/routes/` y `src/components/`.
* **Solución:** Se eliminaron los duplicados estáticos de la raíz. La aplicación en React en `src/` se estableció como la única fuente de verdad (*single source of truth*).

---

## 🛠️ 3. Checklist de Buenas Prácticas para Futuras Migraciones

Al migrar cualquier prototipo desde **Google Antigravity** hacia **Lovable.dev / Vite / TanStack Start**, seguir este procedimiento:

1. [ ] **Verificar Tipado Estricto de i18n:** Ejecutar `npm run build` o `npx tsc --noEmit` localmente para confirmar que no existan errores de TypeScript en componentes React antes de hacer push.
2. [ ] **Gestión de Fuentes Globales:** Cargar Google Fonts en el `<head>` mediante `<link>` dentro de `__root.tsx`, evitando `@import url()` dentro de hojas CSS con Tailwind v4.
3. [ ] **Estructura de CSS en Tailwind v4:** Colocar estilos personalizados fuera de `@layer` para garantizar que sobreescriban los resets *Preflight*.
4. [ ] **Verificar `position: sticky`:** Asegurar que ningún contenedor superior tenga `overflow: hidden` o `overflow-x: hidden`.
5. [ ] **Ciclos de Vida en React:** Reemplazar scripts estáticos de animación (IntersectionObserver, scroll listeners) por hooks `useEffect` integrados en el ciclo de vida del componente.
6. [ ] **Limpieza de Raíz:** Mantener el repositorio limpio, reservando `src/` para la aplicación React y evitando duplicados estáticos en el directorio raíz.

---

## 📊 4. Estado de los Componentes Clave

| Componente / Sección | Estado | Paleta & Estilos Aplicados |
|---|---|---|
| **Header Navigation** | ✅ 100% Funcional | Sticky top, logo 🍄, enlaces centrados, selector idioma EN/ES |
| **Hero Cinemático** | ✅ 100% Funcional | Título Bagel Fat One, badge ambarino, card waitlist, wave SVG `#94CAED` |
| **4 Pilares** | ✅ 100% Funcional | 4 tarjetas crema `#FDE9DE`, bordes 3px navy, sombras retro 6px |
| **Bóveda de Conocimiento** | ✅ 100% Funcional | Marco navy `#2E314A`, 3 dots (rojo/amarillo/verde), chat mockup, indicador verde pulsante |
| **Ciencia & Seguridad** | ✅ 100% Funcional | Fondo azul cielo `#94CAED`, 3 cards crema, iconos emoji a 2.8rem sin cajas de fondo |
| **CTA Final** | ✅ 100% Funcional | Caja Teal `#196768`, título amarillo `#EAAF3D`, ilustración SVG hongo flotante |
| **Footer** | ✅ 100% Funcional | Fondo Navy, tipografía secundaria, tag Brandbook 2026 |

---
*Documento generado y archivado automáticamente para la bóveda de Obsidian.*
