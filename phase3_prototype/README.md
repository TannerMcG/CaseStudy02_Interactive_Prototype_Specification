# Phase 3 Implementation Plan: High-Fidelity Prototype & Accessibility Verification

**Repository:** `TannerMcG/CaseStudy02_Interactive_Prototype_Specification`  
**Target Directory:** `phase3_prototype/`  
**Tech Stack:** Vue 3 + TypeScript + Vite (External CSS Design Tokens)  
**Hosting:** Vercel (Root Directory set to `phase3_prototype`)  
**Due Date:** Friday, December 4, 2026

---

## 1. Visual Design System & Dark Mode Tokens (`src/assets/tokens.css`)
Establish a cohesive dark-mode visual language with high-contrast text and vibrant accented controls so interactive elements stand out clearly:

* **Surface & Background Palette:**
  * `--bg-canvas`: `#0F172A` (Deep slate main canvas)
  * `--bg-surface`: `#1E293B` (Component cards, filter bar, cart drawer)
  * `--bg-elevated`: `#334155` (Hover surfaces & active dropdowns)
* **Typography & Contrast (`WCAG SC 1.4.3` $\ge 4.5:1$):**
  * `--text-primary`: `#F8FAFC` (15.8:1 contrast on canvas)
  * `--text-secondary`: `#CBD5E1` (10.4:1 contrast for specs & metadata)
  * Defined fluid type scale (`--font-xs` through `--font-2xl`) and 8px spacing grid (`--space-1` through `--space-8`).
* **Interactive Accents & Focus States:**
  * `--accent-primary`: `#38BDF8` (Vibrant sky blue for primary CTAs; `#0F172A` button text yields 9.6:1 contrast)
  * `--accent-hover`: `#7DD3FC` (Explicit hover highlight)
  * `--accent-active`: `#0284C7` (Active/pressed state)
  * `--focus-ring`: `#FACC15` (High-visibility 3px amber `:focus-visible` ring, 13.1:1 contrast)
  * `--status-success`: `#4ADE80` | `--status-error`: `#F87171` (Dynamic inline validation alerts)
  * `--target-min`: `44px` (Enforces `WCAG SC 2.5.5` $44\times44\text{px}$ minimum touch target sizing)

---

## 2. Project Architecture & Component Structure
Scaffold a clean Vite + Vue 3 + TypeScript project inside `phase3_prototype/`:

```text
phase3_prototype/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── assets/
    │   ├── tokens.css         # CSS variables (colors, typography, spacing, targets)
    │   └── main.css           # Global reset, semantic landmark layout, :focus-visible
    ├── types/
    │   └── hardware.ts        # TypeScript interfaces (PartItem, FilterState, CartItem, ProfileForm)
    ├── data/
    │   └── components.ts      # PC parts catalog from Phase 2 IA Blueprint
    ├── components/
    │   ├── AppHeader.vue      # Semantic <header> + <nav> with live search & cart badge
    │   ├── FilterBar.vue      # <section> with category select, max-price budget filter, sort & reset
    │   ├── PartCard.vue       # Semantic <article> card with specs, price & Add to Cart button
    │   ├── EmptyState.vue     # Helpful empty-result feedback + one-click "Reset Filters" CTA
    │   ├── CartDrawer.vue     # Slide-over <aside> cart with quantity controls, clear cart & checkout
    │   └── ProfileModal.vue   # Validated user shipping/billing profile update form
    ├── App.vue
    └── main.ts