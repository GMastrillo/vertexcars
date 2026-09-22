# VertexCars Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the dealership site to VertexCars, implement pitch-black entry with zero preloading, non-looping video with resilient low-volume audio autoplay handling, clean Hero UI, smooth post-video Navbar reveal, and ultra-premium typography (Syne + Plus Jakarta Sans).

**Architecture:** Next.js 16 App Router with React 19, Tailwind CSS v4, Motion, and Lenis. Global typography handled via `next/font/google` CSS variables. Video playback and audio state orchestrated in `Porsche360Hero.tsx` communicating completion to `ClientDealershipPage.tsx` and triggering smooth entrance of `Navbar.tsx`.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Motion, next/font/google (Syne, Plus Jakarta Sans), Lucide React.

**Spec:** `docs/superpowers/specs/2026-09-22-vertexcars-refactor-design.md`

## Global Constraints

- Full pt-BR copy and high-luxury automotive tone.
- Zero TypeScript errors (`npx tsc --noEmit`), strict type safety, zero `any`.
- Zero light leaks before video starts — background must be `#000000` (`bg-black`).
- Video must stop on the last frame (`loop={false}`) and only replay on manual page reload.
- Audio volume initialized at 0.35 with graceful unmuted autoplay policy fallback.
- Navbar must start with `opacity-0 pointer-events-none -translate-y-6` and transition smoothly on video end or scroll.

## Review Focus

- Video autoplay policy handling across browsers without blocking audio.
- Smooth navbar reveal with easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- Rebranding completeness: no residual "Ibiza" occurrences in UI or metadata.
- Contrast precision: white headings and neutral-400 silver subtexts.
- Clean zero-loading experience without spinners or progress text.

---

### Task 1: Typography System, Zero Loading & Pitch-Black Base

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/components/layout/ClientDealershipPage.tsx`
- Delete: `src/lib/porsche-preloader.ts`

**Interfaces:**
- Consumes: `next/font/google` (`Syne`, `Plus_Jakarta_Sans`)
- Produces: CSS variables `--font-display`, `--font-sans`, `@theme` utilities `font-display` and `font-sans`, pure black theme `#000000`.

- [ ] **Step 1: Configure Syne and Plus Jakarta Sans in `src/app/layout.tsx`**
- [ ] **Step 2: Update `src/app/globals.css` with `@theme` font tokens, `#000000` background and typography defaults**
- [ ] **Step 3: Update `ClientDealershipPage.tsx` background to absolute `bg-black`**
- [ ] **Step 4: Remove obsolete `src/lib/porsche-preloader.ts`**
- [ ] **Step 5: Run `npx tsc --noEmit` to verify type integrity**

---

### Task 2: Global Rebranding (Navbar, Footer, Sections & Metadata)

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/sections/ShowroomTour.tsx`
- Modify: `src/components/sections/SocialProof.tsx`
- Modify: `src/components/sections/FAQSection.tsx`

**Interfaces:**
- Consumes: Typographic logo pattern `VERTEX` (semi-bold) + `CARS` (light) with `tracking-[0.25em]`
- Produces: Updated SEO metadata and copy across all sections

- [ ] **Step 1: Update `src/app/page.tsx` with VertexCars metadata, OpenGraph, and title**
- [ ] **Step 2: Update `src/components/layout/Footer.tsx` with minimalist typographic logo, social handles, legal copyright, and WhatsApp text**
- [ ] **Step 3: Update `ShowroomTour.tsx`, `SocialProof.tsx`, and `FAQSection.tsx` to replace Ibiza mentions and links**
- [ ] **Step 4: Run ripgrep to ensure zero residual "Ibiza" occurrences**

---

### Task 3: Hero Cinema Experience, Audio Autoplay & UI Cleanup

**Files:**
- Modify: `src/components/sections/Porsche360Hero.tsx`

**Interfaces:**
- Consumes: Prop `onVideoEnded?: () => void`
- Produces: Resilient audio handling (volume 0.35, autoplay fallback), non-looping video (`loop={false}`), zero top badges, delayed reveal of CTAs.

- [ ] **Step 1: Remove top header elements (badge 60 FPS and audio toggle button)**
- [ ] **Step 2: Configure `<video>` with `loop={false}`, `playsInline`, `autoPlay`, and `onEnded` callback**
- [ ] **Step 3: Implement resilient audio autoplay policy handler with volume 0.35 and 1-click fallback listener**
- [ ] **Step 4: Ensure background is `bg-black` and vignettes use pure black gradients**
- [ ] **Step 5: Apply Syne display typography on Hero title, specs numbers, and badges**

---

### Task 4: Hidden Navbar with Smooth Reveal Orchestration

**Files:**
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/components/layout/ClientDealershipPage.tsx`

**Interfaces:**
- Consumes: `showNavbar` boolean prop in `Navbar.tsx`
- Produces: Coordinated entrance animation (`duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]`), minimalist typographic logo `VERTEX CARS`.

- [ ] **Step 1: Update `Navbar.tsx` to accept `show?: boolean` prop and apply hidden starting classes (`opacity-0 -translate-y-6 pointer-events-none`)**
- [ ] **Step 2: Replace `Navbar.tsx` logo with pure typographic `VERTEX CARS` branding**
- [ ] **Step 3: Connect `isVideoEnded` state in `ClientDealershipPage.tsx` between `Porsche360Hero` and `Navbar`**
- [ ] **Step 4: Run `npx tsc --noEmit` to verify type correctness**

---

### Task 5: Build Verification & End-to-End Visual Testing

**Files:**
- Verify: Entire application bundle & runtime behavior

- [ ] **Step 1: Run `npx tsc --noEmit` and `npm run build`**
- [ ] **Step 2: Launch local dev server in background**
- [ ] **Step 3: Test live page with `browser_subagent` to visually confirm pitch black, video behavior, audio, hidden navbar and smooth reveal**
