# Refatoração da Hero 360° e Física de Scroll (Lenis + GSAP + Canvas DPR)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refatorar por completo a experiência da Hero 360° com 150 frames WebP e a física global de rolagem (Lenis + GSAP Ticker) para garantir fluidez cinematográfica (60/120 FPS), responsividade perfeita (object-fit: cover em widescreen e mobile 9:16) e calibração por dispositivo com `gsap.matchMedia()`.

**Architecture:**
- Global Scroll Smoothing: Criar `src/components/providers/smooth-scroll.tsx` e integrá-lo em `src/app/layout.tsx` sincronizando o Lenis com `gsap.ticker` e `lagSmoothing(0)`, tratando `prefers-reduced-motion`.
- Asset Pipeline: Atualizar `src/lib/porsche-preloader.ts` para carregar assincronamente os 150 frames WebP em cache de memória (`new Image()`) com callback de progresso e tratamento gracioso de erros.
- Hero Component: Reescrever `src/components/sections/Porsche360Hero.tsx` (`PorscheHero`):
  * Canvas com calibração de `window.devicePixelRatio` (limitado a 2) cobrindo 100vw/100vh.
  * Matemática precisa de `object-fit: cover` centralizado para manter o Porsche sem distorções e sem bordas pretas em qualquer proporção de tela (desktop widescreen até mobile 9:16).
  * `gsap.matchMedia()` com calibragem específica:
    - Desktop (>= 1024px): `end: "+=3800"`, `scrub: 1`
    - Mobile (< 1024px): `end: "+=2200"`, `scrub: 0.4`
  * Loading state elegante e sem layout shift antes de liberar a rotação.
  * Cleanups estritos no unmount (`mm.revert()`, remoção de listeners, cancelamento de animações).
  * TypeScript 100% estrito (zero `any`).

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Lenis, GSAP 3 + ScrollTrigger, Tailwind CSS v4, Lucide React.

## Global Constraints
- Total frames: 150 frames WebP (`/frames/frame_001.webp` até `/frames/frame_150.webp`).
- Background: `#000407` consistente com os frames do estúdio Porsche.
- Sem layout shifts (CLS < 0.1).
- Suporte a monitores widescreen e celulares 9:16 (sem barras pretas e sem esticar a imagem).
- Zero `any` no TypeScript.
- Cleanup completo para evitar vazamento de memória em Strict Mode.

## Review Focus
1. Sincronização entre Lenis e `gsap.ticker` sem tremor ou conflito de scroll.
2. Pré-carregamento dos 150 frames WebP sem travar a thread principal.
3. Nitidez do Canvas em telas Retina (DPR calibrado até 2x) e enquadramento sem barras pretas.
4. Distância e amortecimento do ScrollTrigger no Desktop (+=3800, scrub 1) vs Mobile (+=2200, scrub 0.4).
5. Build do Next.js sem erros e teste visual via `browser_subagent`.

---

### Task 1: Sincronização Global do Scroll (Lenis + GSAP Ticker)

**Files:**
- Create: `src/components/providers/smooth-scroll.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/layout/ClientDealershipPage.tsx`
- Delete/Clean: `src/components/providers/SmoothScrollProvider.tsx`

- [ ] **Step 1: Criar `src/components/providers/smooth-scroll.tsx`**
  Implementar a sincronização canônica da seção 6.1 do `AGENTS.md` (Lenis + gsap.ticker + lagSmoothing(0)).
- [ ] **Step 2: Envolver o layout raiz no `src/app/layout.tsx`**
  Importar e aplicar `<SmoothScroll>` em torno do `{children}`.
- [ ] **Step 3: Limpar importações duplicadas em `ClientDealershipPage.tsx`**
  Remover a camada redundante de provider para evitar dupla instância do Lenis.
- [ ] **Step 4: Validar build e integridade**
  Executar checagem de tipos com `npm run build` ou `npx tsc --noEmit`.

---

### Task 2: Pipeline de Pré-carregamento dos 150 Frames WebP

**Files:**
- Modify: `src/lib/porsche-preloader.ts`

- [ ] **Step 1: Atualizar `src/lib/porsche-preloader.ts` para 150 frames**
  Configurar contagem padrão para 150 frames (`/frames/frame_001.webp` a `/frames/frame_150.webp`), cache em memória tipado e progresso reativo.
- [ ] **Step 2: Validar a existência e integridade dos 150 arquivos em `public/frames/`**
  Garantir que os 150 arquivos estão no diretório público.

---

### Task 3: Refatoração Completa do `Porsche360Hero.tsx` (`PorscheHero`)

**Files:**
- Modify: `src/components/sections/Porsche360Hero.tsx`

- [ ] **Step 1: Implementar o cálculo DPR e renderização Canvas `cover`**
  Configurar buffer com `Math.min(window.devicePixelRatio || 1, 2)`, canvas cobrindo 100vw/100vh e proporção dinâmica baseada em `img.naturalWidth / img.naturalHeight`.
- [ ] **Step 2: Configurar GSAP ScrollTrigger com `matchMedia()`**
  Implementar branches desktop (`end: "+=3800"`, `scrub: 1`) e mobile (`end: "+=2200"`, `scrub: 0.4`), com `pin: true`.
- [ ] **Step 3: Integrar UI de Loading sutil e overlays refinados**
  Zero layout shifts, animação sutil de carregamento e remoção de poluição visual conforme diretrizes.
- [ ] **Step 4: Implementar cleanup total**
  Reverter timelines, matar ScrollTriggers e remover listeners de resize.
- [ ] **Step 5: Exportar tanto como `PorscheHero` quanto `Porsche360Hero`**
  Garantir retrocompatibilidade e aderência nominal às especificações.

---

### Task 4: Verificação e Testes Automatizados com Subagente de Navegador

**Files:**
- Teste e Validação: Browser Subagent em Desktop (1920x1080) e Mobile (390x844)

- [ ] **Step 1: Executar build de produção do Next.js**
  Garantir zero erros de compilação ou linting.
- [ ] **Step 2: Iniciar dev server ou verificar servidor ativo**
  Validar porta ativa (localhost:3000).
- [ ] **Step 3: Testar com `browser_subagent` em Desktop**
  Navegar até a página, verificar carregamento dos 150 frames, rotação suave pelo scroll e canvas nítido.
- [ ] **Step 4: Testar com `browser_subagent` em Mobile (Viewport vertical 9:16)**
  Verificar ausência de barras pretas, centralização do Porsche e resposta ágil do scroll mobile.
- [ ] **Step 5: Registrar resultados finais no walkthrough**
