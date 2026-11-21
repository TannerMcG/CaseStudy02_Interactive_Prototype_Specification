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
```

---

## 3. Interactive Fidelity & Core User Flow
Implement end-to-end interactivity for both core flows from phase 2 with interactive states:

* **Flow 1: Search, Budget Filtering & PC Build Assembly:**
  * *Live Keyword Search & Category/Budget Filtering:*
    Filter components (CPUs, GPUs, Motherboards, RAM, Storage, Power Supplies, Coolers) in real time and filter by maximum price.
  * *No/Empty Results Handling:* 
    Display a clear, accessible empty state with a 44px+ (`--target-min`) "Reset All Filters" action when zero components match.
  * *Micro-Interactive Feedback:*
    "Add to Cart" triggers an immediate inline confirmation (aria-live="polite") and updates the header build total calculator.
* **Flow 2: Cart Management & Validated Profile / Checkout Update:**
  * *Cart Drawer Controls:*
    Increment/decrement item quantities, remove individual items, or clear the entire cart with live subtotal calculation.
  * *Validated Profile & Shipping Form:*
    Allow users to update their billing/shipping information (Name, Email, Phone, Address, Zip) with:
      * Real Time inline error validation messages (role="alert").
      * Disabled submit button state while invalid or submitting.
      * Simulated async loading spinner during save (1.2s) followed by and accessible inline success banner.

---

## 4. Semantic Markup & WCAG 2.1 AA Verification Audit

* **Semantic HTML5 Landmarks:**
  User `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>` rather than generic `<div>` wrappers.
* **W3C Markup Validation:**
  Run the production build output (`dist/index.html` / rendered DOM) through the W3C Markup Validation Service and fix any syntax or nesting warnings.
* **WCAG 2.1 AA Audit (axe DevTools / WAVE / LightHouse + Manual Testing):**
  * *Contrast (`SC 1.4.3`):* Confirm >= 4.5 : 1 normal text contrast and >= 3 : 1 UI component/focus-ring contrast.
  * *Touch Targets (`SC 2.5.5`):* Inspect all buttons, inputs, selects, and links to guarantee >= 44 x 44px dimensions.
  * *Keyboard Operability (`SC 2.1.1` & `2.4.7`):* Complete both user flows using only `Tab`, `Shift+Tab`, `Enter`, `Space`, and `Escape` (for closing the cart drawer) with visible focus rings and proper focus trapping.
  * *Screen Reader Support:* Explicit `<label for="...">` associations on every input/filter and `aria-live="polite"` announcements for filter counts, cart updates, and validation errors.

---

## 5. Depoyment, Testing & Final Packaging

1. # Deploy to Vercel:
  * **Import**
    `TannerMcG/CaseStudy02_Interactive_Prototype_Specificaion` into Vercel.
  * Set **Root Directory** to `phase3_prototype` an deploy.
  * Place the live Vercel URL prominently at the top of the root `README.md`
2. # Run Summative Usability Study (3-5 Participants):
  * Exectue the standardized testing protocol (`emirical_usability/Usability_Protocol_SUS.pdf`) on the live Vercel prototype.
  * Log `Task_Completion_Time_sec`, binary `Task_Completion_Rate`, and `Error_Frequency` across both tasks.
  * Administer your Google Forms 10-item SUS survey and calculate the normalized score:
    ### SUS = [$\sum$(Odd Item Score - 1) + $\sum$(5 - Even Item Scores)] x 2.5
  * Compare Phase 3 SUS and error rates against phase 1 diagnostic baseline.
3. # Final Repository Deliverables:
  * `phase3_prototpye/` (Complete Vue 3 + TypeScript source code)
  * `Phase3_Verification_Report.pdf` (or comprehensive `README.md` covering design tokens, audit screenshots, SUS benchmark comparison, and two Post-Mortem Reflection answers)