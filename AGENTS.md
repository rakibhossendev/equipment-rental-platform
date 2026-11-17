<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# AGENTS.md — Design Memory (Equipment Rental Platform · Frontend)

> **This file is the single source of truth for all UI/UX decisions.**
> Read this file before starting any UI task. Update it whenever a design decision is
> made, changed, or implemented. Keep the **Implemented** and **Planned** sections accurate.

## 0. Scope & hard rules

- **Frontend only.** No backend logic, API integration, auth logic, database operations,
  business logic, or payment processing. All data is typed static mock data in `src/data/`.
- **No hardcoded colors** in components/JSX/inline styles/component CSS. Colors come only
  from semantic CSS variables defined in `src/app/globals.css`. Need a new color → add a
  token to `globals.css` first → document it here.
- No arbitrary values like `bg-[#123456]`, `text-zinc-500`, `border-black/10`.
  Use token utilities (`bg-primary`, `text-muted-foreground`, `border-border`, …).
- One color system only. Never introduce a second palette or competing tokens.
- Stack is fixed: Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · shadcn/ui
  (`base-nova` style, **Base UI** primitives) · CVA · lucide-react · framer-motion.
- Next.js specifics: consult `node_modules/next/dist/docs/` before writing code.
  `params` / `searchParams` are **Promises** in dynamic routes.

## 1. Design direction & visual identity

**Product:** premium industrial equipment rental marketplace (customers rent equipment
from equipment owners).

**Personality:** trust · professionalism · reliability · industrial strength · simplicity ·
premium quality. A serious B2B/B2C tool, **not** a generic ecommerce template.

**Visual language:**

- **Steel & graphite neutrals** with a cool slate tint (never pure gray, never warm beige).
- **Safety-amber accent** — used sparingly and purposefully: ratings, availability badges,
  highlights, active states, focus rings, brand moments. The one "color" of the brand.
- Deep near-black **steel** for primary actions and strong hierarchy.
- Generous whitespace, strong hierarchy, clean grid layouts, consistent spacing.
- Subtle borders (`ring-1`) and layered low-opacity shadows — depth without noise.
- Restrained, smooth motion (150–250 ms). No gratuitous animation.
- High-quality imagery areas are **styled placeholder blocks** (token gradients + lucide
  icons) until real equipment photos are supplied.

**Avoid:** generic AI-dashboard aesthetics, excessive gradients, glassmorphism, oversized
headings everywhere, inconsistent spacing, random colors, heavy shadows, emoji as icons.

## 2. Color system (`src/app/globals.css`)

All colors are **oklch** semantic tokens. Light = `:root`, dark = `.dark`. Every token is
mapped into Tailwind v4 `@theme inline` so it is usable as a utility class
(`bg-card`, `text-muted-foreground`, `ring-ring`, …).

### 2.1 Core tokens (semantic → purpose)

| Token | Purpose |
|---|---|
| `--background` / `--foreground` | Page canvas / default text |
| `--card` / `--card-foreground` | Card & panel surfaces |
| `--popover` / `--popover-foreground` | Menus, dropdowns, dialogs, popovers |
| `--primary` / `--primary-foreground` | Primary actions, strong emphasis (steel graphite) |
| `--secondary` / `--secondary-foreground` | Secondary surfaces & buttons |
| `--muted` / `--muted-foreground` | Muted surfaces / de-emphasized text |
| `--accent` / `--accent-foreground` | Hover/active tint surfaces (subtle amber wash) |
| `--brand` / `--brand-foreground` | **Solid vivid amber** — badges, ratings, CTA highlights |
| `--highlight` / `--highlight-foreground` | Soft amber wash — availability/rating backgrounds |
| `--success` (+fg) | Success states, "available", completed |
| `--warning` (+fg) | Warning states, "pending", caution |
| `--destructive` (+fg) | Errors, destructive actions, cancellations |
| `--info` (+fg) | Informational states, "in transit" |
| `--border` | Default hairline border (cards, dividers) |
| `--input` | Input & control borders |
| `--ring` | Focus ring (deep amber) |
| `--sidebar*` | Dashboard sidebar surfaces (bg/fg/primary/accent/border/ring) |
| `--chart-1…5` | Data-viz palette (amber, steel blue, green, violet, red) |
| `--elevation-1…4` | Raw shadow layers, overridden per theme (see §5) |

**Color usage rules:**

- `--primary` = solid steel (light theme) / light steel (dark theme) → main CTAs only.
- `--brand` amber is **never** used for large fills or body text; badges/ratings/accents only.
- Solid amber elements always pair with `--brand-foreground` (dark) — amber + white fails contrast.
- Status colors use the **tinted pattern** by default: `bg-success/10 text-success`
  (and `text-destructive` on `bg-destructive/10`), matching the shadcn `destructive` button variant.
- Charts must use `--chart-*` tokens only.

### 2.2 Light theme values (`:root`)

```css
--background:      oklch(0.985 0.003 240);  /* cool near-white */
--foreground:      oklch(0.165 0.014 240);  /* graphite ink */
--card:            oklch(0.999 0.001 240);
--popover:         oklch(0.999 0.001 240);
--primary:         oklch(0.21  0.016 240);  /* steel graphite */
--primary-foreground: oklch(0.985 0.003 240);
--secondary:       oklch(0.958 0.005 240);
--muted:           oklch(0.96  0.005 240);
--muted-foreground: oklch(0.52 0.014 240);
--accent:          oklch(0.95  0.035 75);   /* amber wash */
--accent-foreground: oklch(0.32 0.055 55);
--brand:           oklch(0.76  0.15  62);   /* safety amber */
--brand-foreground: oklch(0.245 0.045 48);
--highlight:       oklch(0.955 0.055 80);
--highlight-foreground: oklch(0.36 0.06 55);
--success:         oklch(0.5   0.115 152);
--warning:         oklch(0.52  0.115 62);
--destructive:     oklch(0.54  0.2   25);
--info:            oklch(0.52  0.1   235);
--border:          oklch(0.905 0.006 240);
--input:           oklch(0.895 0.007 240);
--ring:            oklch(0.63  0.15  55);   /* deep amber focus ring */
--radius:          0.5rem;
```

### 2.3 Dark theme values (`.dark`)

```css
--background:      oklch(0.155 0.011 240);  /* deep graphite */
--foreground:      oklch(0.97  0.003 240);
--card:            oklch(0.205 0.013 240);
--popover:         oklch(0.215 0.013 240);
--primary:         oklch(0.93  0.008 240);  /* light steel */
--primary-foreground: oklch(0.165 0.014 240);
--secondary:       oklch(0.27  0.014 240);
--muted:           oklch(0.265 0.014 240);
--muted-foreground: oklch(0.66 0.012 240);
--accent:          oklch(0.31  0.045 68);
--accent-foreground: oklch(0.96 0.025 82);
--brand:           oklch(0.78  0.145 66);
--brand-foreground: oklch(0.24 0.045 48);
--highlight:       oklch(0.33  0.055 68);
--highlight-foreground: oklch(0.9 0.05 82);
--success:         oklch(0.72  0.13  152);
--warning:         oklch(0.8   0.13  75);
--destructive:     oklch(0.68  0.18  25);
--info:            oklch(0.7   0.11  235);
--border:          oklch(1 0 0 / 12%);
--input:           oklch(1 0 0 / 16%);
--ring:            oklch(0.78  0.13  75);
```

### 2.4 Status & chart mapping

- **Success / available / completed** → `--success`
- **Warning / pending / awaiting-confirmation** → `--warning`
- **Error / cancelled / destructive** → `--destructive`
- **Info / in-transit / scheduled** → `--info`
- **Ratings, availability highlights, brand badges** → `--brand` / `--highlight`
- **Charts:** `--chart-1` amber · `--chart-2` steel blue · `--chart-3` green ·
  `--chart-4` violet · `--chart-5` red

## 3. Typography

**Families** (loaded via `next/font/google` in `src/app/layout.tsx`):

- `--font-sans` → **Geist** (UI, headings, body) — mapped from `--font-geist-sans`.
- `--font-mono` → **Geist Mono** (specs, SKUs, IDs, prices, tabular data) — `--font-geist-mono`.
- `--font-heading` → same as `--font-sans`.

**Type scale** (Tailwind utilities, tuned for Geist's compact metrics):

| Role | Class | Size / line-height | Weight | Tracking |
|---|---|---|---|---|
| Display (hero only) | `text-4xl sm:text-5xl lg:text-6xl` | 36→60 px / 1.05–1.1 | `font-semibold` (600) | `tracking-tight` |
| H1 page title | `text-3xl sm:text-4xl` | 30→36 px / 1.15 | 600 | `tracking-tight` |
| H2 section | `text-2xl sm:text-3xl` | 24→30 px / 1.2 | 600 | `tracking-tight` |
| H3 | `text-xl` | 20 px / 1.3 | 600 | `tracking-tight` |
| H4 / card title | `text-base sm:text-lg` | 16→18 px / 1.4 | 600 | `tracking-tight` |
| Body | `text-sm sm:text-base` | 14→16 px / 1.5–1.6 | 400 | normal |
| Small / meta | `text-xs sm:text-sm` | 12→14 px / 1.5 | 400 | normal |
| Label / eyebrow | `text-xs font-medium uppercase` | 12 px | 500–600 | `tracking-widest` |
| Mono data | `font-mono text-sm tabular-nums` | 14 px | 400–500 | normal |

**Rules:**

- Headings use `tracking-tight` (−0.02em) and `font-semibold`; never `font-black`.
- **Eyebrow labels** (uppercase, `tracking-widest`, `text-primary` or `text-muted-foreground`)
  introduce sections — a key part of the industrial editorial look.
- Body copy max-width: `max-w-[60ch]` for prose, `max-w-2xl` for hero subcopy.
- Numbers (prices, stats, ratings) use `tabular-nums` + `font-mono` where tabular alignment matters.
- No centered long paragraphs; center only short hero/CTA copy.

## 4. Spacing, layout & breakpoints

- **Spacing:** Tailwind's 4 px scale only (`p-1` = 4 px … `p-8` = 32 px).
  Section vertical rhythm: `py-16 md:py-24` (marketing), `py-8 md:py-12` (app pages).
- **Container:** one shared `Container` component → `mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8`.
  Dashboard content maxes at `max-w-6xl`; reading pages `max-w-3xl`.
- **Grid gaps:** cards `gap-4 sm:gap-6`; form fields `gap-4` (label→control `gap-1.5`).
- **Breakpoints** (Tailwind defaults): `sm: 640` · `md: 768` · `lg: 1024` · `xl: 1280` · `2xl: 1536`.
  - Marketing card grids: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`.
  - Browse page: filter sidebar `hidden lg:block` (w-64/72) + results `flex-1`;
    on mobile filters open in a Sheet.
  - Header collapses to hamburger below `lg`.
- **Touch targets:** min 40×40 px (`size-10`) for icon buttons on mobile.

## 5. Radius, borders & shadows

- **Radius:** base `--radius: 0.5rem`. Mapping (Tailwind): `rounded-sm` 0.3 ·
  `rounded-lg` 0.5 (buttons, inputs) · `rounded-xl` 0.7 (cards) · `rounded-2xl` 0.9
  (modals/large panels) · `rounded-full` pills/avatars.
- **Borders:** default `border` (`--border`); cards use `ring-1 ring-foreground/10`
  (shadcn `base-nova` card convention) — **not** heavy drop shadows.
- **Shadows:** layered, low-opacity, theme-aware via `--elevation-1…4` (overridden in
  `.dark` to pure black alphas):

  | Token | Utility | Use |
  |---|---|---|
  | `--elevation-1` | `shadow-xs` | resting inputs/buttons |
  | `--elevation-2` | `shadow-sm` | cards (hover: `hover:shadow-md`) |
  | `--elevation-3` | `shadow-md` | dropdowns, popovers |
  | `--elevation-4` | `shadow-lg` | modals, sheets, sticky header |

- No colored/neon shadows. No shadows on elements that already use `ring-1`.

## 6. Component conventions

**General**

- All primitives live in `src/components/ui/` (shadcn `base-nova`, Base UI + CVA);
  domain components in `src/components/`. One domain component per file.
- Every component consumes **only tokens**; variants via CVA; `cn()` for merging.
- Interactive elements: `transition-all duration-150`, visible `focus-visible` ring
  (`focus-visible:ring-3 focus-visible:ring-ring/50` + `focus-visible:border-ring`).
- Icons: `lucide-react` only, sized `size-4` (default) / `size-3` (compact). No emoji icons.

**Button** (`button.tsx`, Base UI `Button`)

- Heights: `default` h-8 · `sm` h-7 · `lg` h-9 · `icon` size-8. Radius `rounded-lg`.
- Variants: `default` (steel solid) · `outline` (border + bg) · `secondary` ·
  `ghost` · `destructive` (tinted) · `link` · **`brand`** (solid amber, dark fg — rare).
- Primary CTA pattern: `default` size `lg` with optional trailing lucide icon.
- Disabled: `opacity-50 pointer-events-none`. Pressed: `translate-y-px`.

**Input / Textarea / Select**

- `h-8` (inputs) · `h-9` (textarea/`select` trigger) · `rounded-lg` · `border-input`
  · `bg-transparent` (dark: `bg-input/30`) · focus → `border-ring` + `ring-3 ring-ring/50`.
- Placeholder = `text-muted-foreground`. Label above, `gap-1.5`, helper text `text-xs text-muted-foreground`.
- Invalid: `aria-invalid` → destructive border/ring (built into primitives).

**Card** (`card.tsx`)

- `rounded-xl bg-card ring-1 ring-foreground/10`, internal spacing via `--card-spacing`.
- Anatomy: `CardHeader` → `CardTitle` (+ `CardDescription`, `CardAction`) → `CardContent`
  → optional `CardFooter` (muted top border).
- **Equipment card** (domain): image block (16:10 placeholder) → body (category eyebrow,
  title, location, rating, price/day) → footer (availability badge + "View details").
  Hover: `ring-primary/30 shadow-md` + image `scale-[1.02]`.

**Modal / Dialog / Sheet**

- `rounded-2xl bg-popover shadow-lg ring-1 ring-foreground/10`; backdrop
  `bg-foreground/40` (no blur-heavy glass). Animate: fade + 8 px rise, 200 ms.
- Sheet (mobile nav, filters): slides from right (or left for nav) over a dimmed backdrop.

**Dropdown / Menu**

- `min-w-56 rounded-xl bg-popover p-1 shadow-md ring-1 ring-foreground/10`;
  items `rounded-lg px-2 py-1.5 text-sm`, hover/active = `bg-accent text-accent-foreground`.
- Destructive items use `text-destructive`.

**Navigation**

- **Header:** sticky, `h-16`, `bg-background/95` + `backdrop-blur` on scroll,
  bottom `border-b`. Logo (steel mark + wordmark) · center nav links (hover `text-foreground`,
  active `text-primary font-medium` with amber underline indicator) · right: search,
  theme toggle, user menu / "Sign in" + "List your equipment" (brand-outline) buttons.
- **Mobile:** hamburger → `Sheet` with nav links + actions, full-width targets.
- **Dashboard sidebar:** `w-64`, `bg-sidebar`, groups with uppercase eyebrows, items
  `h-9 rounded-lg px-3 text-sm` — active = `bg-sidebar-accent text-sidebar-accent-foreground
  font-medium` with a 2 px `bg-primary` left indicator. Collapses to icon rail on `xl`
  is out of scope; hidden behind a sheet below `lg`.

## 7. Motion & interaction

- **Durations:** micro 150 ms · standard 200 ms · panel 250 ms. Easing: `ease-out`
  (entrances), `ease-in-out` (state).
- **Entrances:** subtle `opacity-0 → 1` + `translate-y-1 → 0` on scroll-in (framer-motion,
  `whileInView`, once, `viewport={{ margin: "-60px" }}`). Stagger children by 60 ms, max 5 items.
- **Hovers:** cards `shadow-md` + `ring-primary/30`; buttons color-only (no scale);
  images `scale-105` within `overflow-hidden` (300 ms).
- **Reduced motion:** global `@media (prefers-reduced-motion: reduce)` disables
  animations/transitions; framer-motion respects `useReducedMotion`.
- No parallax, no marquee text, no bouncing, no continuous ambient animation.

## 8. Accessibility standards

- **Contrast:** WCAG AA — body text ≥ 4.5:1, large/UI ≥ 3:1. Amber solids always use
  `--brand-foreground` (dark) text.
- **Focus:** every interactive element has a visible focus ring (`ring-3 ring-ring/50`).
  Skip-to-content link in root layout.
- **Semantics:** landmarks (`header/nav/main/footer`), one `h1` per page, logical heading
  order, `aria-label` on icon-only buttons, `aria-current="page"` on active nav.
- **Forms:** every input has a `<Label>` (or `aria-label`), errors via `aria-invalid` +
  `role="alert"` text; helpers linked with `aria-describedby`.
- **Images:** decorative placeholders `aria-hidden`; real images need meaningful `alt`.
- **Keyboard:** dialogs/menus/sheets trap focus and close on `Escape` (Base UI handles this).

## 9. UI libraries & dependencies

| Library | Version | Role |
|---|---|---|
| `next` | 16.4.6 | App Router, `next/font`, `next/image`, `next/link` |
| `react` / `react-dom` | 19.3.0 | UI runtime (React Compiler enabled) |
| `tailwindcss` | 4.3.3 | Token-driven utility CSS (`@theme inline`) |
| `@base-ui/react` | 1.9.0 | Accessible primitives (dialog, menu, select, tabs, tooltip, …) |
| `shadcn` | 4.23.0 | `base-nova` component style + `shadcn/tailwind.css` |
| `class-variance-authority` | 0.7.1 | Variant APIs |
| `cn` | 0.5.2 | Class merging (`import { cn } from "cn"`) |
| `lucide-react` | 1.74.0 | Icon set (only icon set) |
| `framer-motion` | 14.14.0 | Scroll entrances & panel transitions |
| `tw-animate-css` | 1.4.0 | Keyframes for shadcn components |

## 10. Page-specific design decisions

Documented per route in §11 (Implemented) and §12 (Planned).

## 11. Implemented

- [x] **Design system foundation** — full semantic token set (light + dark), typography,
  radius/shadow/motion tokens, base styles in `src/app/globals.css`.
- [x] **`AGENTS.md` design memory** — this file.
- [x] **Root layout** — Geist fonts, metadata, theme bootstrap script (no-FOUC),
  skip link, header/footer shell.
- [x] **App shell** — sticky `Header` (logo, nav, search, theme toggle, user actions),
  `MobileNav` sheet, `Footer`, shared `Container`.
- [x] **UI primitives** — button (+`brand` variant), card, input, label, badge, avatar,
  textarea, select, checkbox, switch, tabs, dialog, dropdown-menu, sheet, tooltip,
  separator, skeleton, pagination, table, accordion, breadcrumb, scroll-area.
- [x] **Domain components** — EquipmentCard, EquipmentGallery (placeholder media),
  RatingStars, PriceTag, AvailabilityBadge, SearchBar, FilterGroup/FilterChip,
  CategoryCard, SectionHeading, StatCard, EmptyState, TestimonialCard, StepCard,
  BookingWidget, DashboardSidebar, UserMenu.
- [x] **Pages** — `/`, `/equipment`, `/equipment/[slug]`, `/how-it-works`, `/about`,
  `/login`, `/register`, `/dashboard` (+ rentals, rental detail, profile),
  `/dashboard/owner` (+ listings, new listing, orders), `not-found`.

## 12. Planned / not yet done

- Real equipment photography (currently styled placeholders — swap into `EquipmentGallery`).
- Review & rating submission flow, message center, notifications panel.
- Owner earnings/payouts detail page; renter payment methods page.
- Skeleton loading states per route (global skeletons exist).
- i18n, RTL (currently `rtl: false` in `components.json`).
