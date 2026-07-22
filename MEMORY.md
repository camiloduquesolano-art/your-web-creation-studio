# 🧠 MEMORY.md — Shroomed & Antigravity to Lovable

## 📌 Contexto & Arquitectura General
- **Nombre del Proyecto:** Shroomed (Plataforma y Asistente Fármaco Inteligente)
- **Tecnologías:** TanStack Start + React + Vite + Tailwind CSS v4 en `src/`
- **Conexión:** Sincronizado vía GitHub con [Lovable.dev](https://lovable.dev) (`camiloduquesolano-art/your-web-creation-studio.git`)
- **Segundo Cerebro (Obsidian):** `/Users/camiloduquesolano/Documents/Obsidian Vault`

---

## 🚨 Reglas de Memoria & Aprendizajes Críticos

### 0. NUNCA Inventar Datos o Ejemplos Ficticios & SIEMPRE Fechar Todo
- **REGLA DE ORO:** Jamás inventar feedback falso, métricas ficticias ni datos simulados. Toda la documentación, tableros y análisis deben reflejar **100% hechos reales** proporcionados por el usuario.
- **FECHADO OBLIGATORIO:** Todas las notas, tablas, tableros Kanban, roadmaps e ingestas de feedback en Obsidian deben llevar la fecha exacta (`date: YYYY-MM-DD`, `fecha_inicio`, `fecha_recepcion`).

### 1. Única Fuente de Verdad (`src/`)
- Toda la lógica, vistas y estilos viven exclusivamente dentro del directorio `src/`.
- **NUNCA** volver a recrear archivos HTML/CSS estáticos (`index.html`, `style.css`, `app.js`) en la raíz del repositorio, ya que compiten con el servidor Vite/Nitro de Lovable.

### 2. Alineación Estricta de Tipos en i18n (`Dict`)
- Los props de `ShroomedLanding.tsx` deben coincidir al 100% con la interfaz `Dict` en `src/lib/i18n/shroomed.ts`.
- **Mapeos obligatorios:**
  - `hero.social` (no `socialProof`)
  - `pillars.items[]` (no `p1`, `p2`, `p3`, `p4`)
  - `vault.body` (no `desc`)
  - `vault.features[]` (no `checklist`)
  - `vault.msg1`, `vault.recBadge`, `vault.recTitle`, `vault.recBody`, `vault.recTags` (propiedades planas en `vault`, no anidadas en `demo`)
  - `cta.placeholder` (no `emailPlaceholder`)
  - `footer.copyright` (no `rights`)
- **Regla de Oro:** Siempre ejecutar `npm run build` localmente y verificar 0 errores de TypeScript antes de hacer push a GitHub.

### 3. Pipeline de CSS & Google Fonts (Tailwind v4)
- Todo el CSS personalizado vive en `src/styles.css` sin envoltorios de `@layer` para mantener la prioridad de especificidad fuera de capas (*unlayered styles*) sobre el *Preflight* de Tailwind.
- **NUNCA** poner `@import url(...)` de Google Fonts en el archivo CSS después de `@import "tailwindcss";` (causa que Vite falle en el procesamiento CSS y el navegador descarte todos los estilos).
- Las fuentes externas se cargan únicamente mediante `<link>` dentro de `src/routes/__root.tsx`.

### 4. Layouts, Animaciones y Sticky Header
- Los elementos con `.reveal-up` deben tener `opacity: 1` por defecto en CSS, complementados por un hook `useEffect` con `IntersectionObserver` en React.
- **NUNCA** agregar `overflow-x: hidden` en contenedores superiores (`body` o wrappers), ya que anula la propiedad `position: sticky` en el header de navegación.

### 5. Git & Lovable Connection Rule
- **REGLA CRÍTICA:** No reescribir el historial publicado de Git (evitar `git push --force`, rebase o amend de commits ya pusheados) para no romper el historial de Lovable.

---
*Este archivo representa la memoria técnica viva del proyecto Shroomed.*
