# Shroomed — Design System (Guía de Estilo Web)

> Extraído del Brandbook oficial de Shroomed. Este documento sirve como referencia única para construir páginas web (landing pages, blog, app) manteniendo consistencia con la identidad visual de marca: retro-psicodélica, groovy, cálida, educativa y confiable.

---

## 1. Personalidad de marca

- **Tono:** cercano, confiable, curioso, entretenido — nunca clínico ni frío.
- **Estética:** psicodélica retro (inspiración 60s/70s groovy), colorida, orgánica, con ilustraciones tipo *sticker*.
- **Propósito del diseño:** hacer que contenido educativo (sobre hongos alucinógenos) se sienta accesible, seguro y curado — no oscuro ni "underground".

---

## 2. Paleta de colores

### Colores principales (extraídos del brandbook)

| Nombre sugerido | HEX | RGB | Uso |
|---|---|---|---|
| Amarillo Shroomed | `#EAAF3D` | 234, 175, 61 | Acentos, CTAs secundarios, íconos |
| Rojo/Coral | `#F05257` | 240, 82, 87 | Acentos, alertas suaves, highlights |
| Azul marino (texto/base) | `#2E314A` | 46, 49, 74 | Texto principal, títulos, contornos |
| Crema/Blanco hueso | `#FDE9DE` | 253, 233, 211 | Fondos base |
| Durazno | `#DDC0A4` | 221, 192, 164 | Fondos secundarios, cards |
| Rosa palo | `#D59697` | 213, 150, 151 | Acentos suaves |
| Verde lima | `#CBCB51` | 203, 203, 81 | Acentos naturales |
| Verde menta | `#89C97F` | 137, 201, 127 | Acentos naturales, éxito |
| Azul brillante | `#017CA2` | 1, 124, 162 | Links, CTAs primarios |
| Verde petróleo | `#196768` | 25, 103, 104 | Texto sobre fondos claros, footer |
| Celeste | `#94CAED` | 148, 202, 237 | Fondos, ilustraciones (cielo/nubes) |
| Gris azulado | `#C0C9CE` | 192, 201, 206 | Neutros, bordes, disabled |

### Reglas de uso
- **Fondo base:** crema `#FDE9DE` o blanco — nunca negro puro.
- **Texto principal:** azul marino `#2E314A` (nunca negro puro `#000`).
- Cada sección/página puede tener un **color dominante distinto** (ver ejemplo: página "Colores" es celeste, "Redes Sociales" es celeste/verde) — la marca rota de fondo por sección, no es monocromática.
- Los colores se usan en bloques planos (flat), sin gradientes salvo en ilustraciones (nubes con degradé sutil).
- Alto contraste entre fondo y texto siempre.

---

## 3. Tipografía

- **Titulares (display):** tipografía *groovy/retro bold*, letras redondeadas, gruesas, con curvas orgánicas (estilo años 70, similar a "Cooper Black" psicodélico o fuentes tipo "Bogart"/"Ranchers"/"Bagel Fat One"). Siempre en mayúsculas. Usada para: nombre de marca, títulos de sección ("NOSOTROS", "MISIÓN", "COLORES", "REDES SOCIALES").
  - Sugerencias de Google Fonts: **Bagel Fat One**, **Bungee**, **Fredoka One** (pesos altos), **Baloo 2** (bold).
- **Cuerpo de texto:** sans-serif limpia, legible, peso regular/medium, minúsculas. Contraste claro con el título groovy.
  - Sugerencias: **Poppins**, **Nunito**, **Work Sans**.
- **Jerarquía:**
  - H1 (título de sección): 60–96px, tipografía groovy, color `#2E314A` o color de contraste sobre el fondo.
  - Body: 16–18px, `Poppins`/`Nunito` regular, line-height 1.5–1.6, color `#2E314A` con opacidad ~85%.
  - Micro-copy / labels: 12–14px, uppercase, letter-spacing amplio (ej. "BRANDBOOK" al pie de página).

---

## 4. Iconografía e ilustración

- **Estilo:** line-art grueso + relleno flat, contornos en azul marino, sin sombras realistas.
- **Motivos recurrentes:**
  - Hongos (setas) con sombrero punteado (lunares).
  - Ojos estilizados (tipo "ojo psicodélico") con pestañas.
  - Flores simples con carita (sonrientes).
  - Nubes onduladas / superpuestas en 2-3 tonos.
  - Rayos (lightning bolts).
  - Estrellas de 4 puntas (sparkles) dispersas como acentos.
  - Cintas/olas de color (ribbons) en la parte inferior de las secciones.
  - Manos haciendo gesto "shaka" (🤙).
- **Uso:** las ilustraciones enmarcan el contenido (esquinas superiores/inferiores), nunca compiten con el texto central. El texto central siempre tiene espacio "limpio" alrededor.

---

## 5. Layout y composición

- **Formato base:** composición tipo "spread" horizontal (ancho > alto), amplio espacio negativo/blanco en el centro para texto.
- **Estructura típica de sección:**
  1. Título grande groovy a la izquierda o centrado.
  2. Párrafo corto de texto explicativo (2 bloques cortos, no más de 3-4 líneas cada uno).
  3. Ilustraciones decorativas en las esquinas (nunca en el centro, no interrumpen la lectura).
  4. Footer minimalista: línea delgada horizontal + label "—BRANDBOOK" en mayúsculas pequeñas, esquina inferior izquierda.
- **Grillas de color/paleta:** se muestran como círculos o rectángulos redondeados en grid (para color swatches), con el HEX debajo en tipografía groovy pequeña.
- **Mockups de redes sociales:** se presentan como "cards" con esquinas muy redondeadas (~24px), simulando pantallas de teléfono, alineadas horizontalmente con tamaños alternados (grande al centro, chicas a los lados).
- **Bordes/radios:** todo altamente redondeado — botones, cards, imágenes (radius 16–32px). Nada de esquinas rectas duras.

---

## 6. Componentes UI (traducción a web)

### Botones
- Forma de píldora o esquinas muy redondeadas (radius ≥ 20px).
- Fondo sólido en color de acento (amarillo, coral o azul brillante), texto en azul marino o blanco.
- Hover: leve escala (1.03–1.05) + sombra suave, sin transiciones bruscas.

### Cards
- Fondo crema/blanco, borde sutil o sin borde, radius grande (20–28px).
- Ilustración decorativa (hongo, flor, estrella) en una esquina de la card.

### Navbar
- Fondo crema o blanco, logo "SHROOMED" en tipografía groovy azul marino, íconos de línea gruesa.
- Puede llevar una franja de olas de color en la parte inferior como separador (en vez de un border simple).

### Secciones / Hero
- Fondo de color rotativo por sección (igual que el brandbook cambia de color por página).
- Título gigante groovy centrado o a un costado, con nubes/estrellas/hongos decorando los bordes.

### Footer
- Fondo azul marino `#2E314A` o verde petróleo `#196768`, texto crema, íconos de redes sociales en blanco/crema.

---

## 7. Voz y microcopy

- Frases cortas, cálidas, en primera persona plural ("Queremos...", "Nos vemos como...", "Nuestro compromiso...").
- Evitar jerga técnica excesiva; priorizar claridad y calidez.
- CTAs directos y amigables (ej. "Descúbrelo", "Aprende con nosotros").

---

## 8. Ejemplo de tokens CSS

```css
:root {
  /* Colores principales */
  --color-yellow: #EAAF3D;
  --color-coral: #F05257;
  --color-navy: #2E314A;
  --color-cream: #FDE9DE;
  --color-peach: #DDC0A4;
  --color-rose: #D59697;
  --color-lime: #CBCB51;
  --color-mint: #89C97F;
  --color-blue: #017CA2;
  --color-teal: #196768;
  --color-sky: #94CAED;
  --color-gray-blue: #C0C9CE;

  /* Semánticos */
  --bg-base: var(--color-cream);
  --text-primary: var(--color-navy);
  --text-secondary: color-mix(in srgb, var(--color-navy) 80%, white);
  --accent-primary: var(--color-blue);
  --accent-secondary: var(--color-yellow);

  /* Tipografía */
  --font-display: 'Bagel Fat One', 'Bungee', cursive;
  --font-body: 'Poppins', 'Nunito', sans-serif;

  /* Radios */
  --radius-sm: 12px;
  --radius-md: 20px;
  --radius-lg: 32px;
  --radius-pill: 999px;
}
```

---

## 9. Checklist rápido al diseñar una nueva página

- [ ] ¿El fondo es un color plano de la paleta (nunca blanco/negro puro)?
- [ ] ¿El título usa la tipografía groovy en mayúsculas?
- [ ] ¿Hay al menos un elemento ilustrado (hongo, ojo, flor, nube o estrella) enmarcando el contenido?
- [ ] ¿Las esquinas de botones/cards están redondeadas generosamente?
- [ ] ¿El texto de cuerpo está en la sans-serif limpia, con buen contraste sobre el fondo?
- [ ] ¿El footer/pie de sección lleva la línea delgada + label minimalista?
