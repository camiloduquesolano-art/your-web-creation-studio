<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## 🧠 PROJECT MEMORY & ARCHITECTURE RULES

### 1. Single Source of Truth
- The application is built with **TanStack Start + React + Vite + Tailwind CSS v4** located entirely in `src/`.
- Do NOT re-create static HTML/CSS files (`index.html`, `style.css`, `app.js`) in the root directory.

### 2. Strict i18n & TypeScript Alignment
- `ShroomedLanding.tsx` props must match the `Dict` interface in `src/lib/i18n/shroomed.ts` exactly.
- Always check key mappings: `hero.social` (not `socialProof`), `pillars.items[]` (not `p1/p2`), `vault.body` (not `desc`), `vault.features[]` (not `checklist`), `vault.msg1/recBadge/recBody/recTags` (flat properties, not `demo`), `cta.placeholder` (not `emailPlaceholder`), `footer.copyright` (not `rights`).
- Always run `npm run build` locally to verify 0 TypeScript errors before pushing to GitHub.

### 3. CSS Pipeline & Fonts (Tailwind v4)
- Place custom CSS rules in `src/styles.css` directly after `@import "tailwindcss";` without `@layer` wrappers to ensure unlayered specificity overrides Preflight resets.
- Do NOT place `@import url(...)` font imports in CSS after `@import "tailwindcss";` (it causes Vite to fail CSS parsing). All external fonts must be loaded via `<link>` in `src/routes/__root.tsx`.

### 4. Layout & Animations
- `.reveal-up` elements must default to `opacity: 1` in CSS with React `useEffect` `IntersectionObserver` attached for scroll animation.
- Never place `overflow-x: hidden` on root containers, as it breaks `position: sticky` on headers.

### 5. Official Second Brain (Obsidian Vault) Sync Protocol
- **Obsidian Vault Directory:** `/Users/camiloduquesolano/Documents/Obsidian Vault`
- **Sync Trigger:** At the end of every major technical milestone, complex refactor, or troubleshooting session, automatically summarize key learnings and generate an Obsidian-formatted Markdown note.
- **YAML Frontmatter Standard:** Always include `title`, `date`, `tags`, `type`, `status`, and `source: Antigravity AI`.
- **Execution:** Copy notes to the user's Obsidian Vault path using `run_command` with `BypassSandbox: true`.

