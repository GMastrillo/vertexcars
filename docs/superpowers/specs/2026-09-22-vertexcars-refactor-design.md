# VertexCars — Refatoração e Rebranding de Alto Padrão (Design Spec)

**Data:** 2026-09-22  
**Autor:** Antigravity Creative Engineering  
**Escopo:** Rebranding VertexCars, Entrada Zero Loading (Breu Total), Controle de Áudio/Vídeo, Navbar com Reveal Suave e Tipografia Ultra-Premium.

---

## 1. Visão Geral & Objetivos

Transformar a presença digital da concessionária em uma experiência imersiva de hiperluxo automotivo (nível Awwwards / Site of the Day), eliminando qualquer aspecto genérico de template e estabelecendo a nova identidade **VertexCars**.

### Metas Principais:
1. **Rebranding Completo:** Substituição integral de "Ibiza Motors" por **VertexCars**. Identidade visual puramente tipográfica: `VERTEX` (semi-bold) + `CARS` (light) com tracking aberto, sem logomarcas antiquadas ou quadradas.
2. **Experiência de Entrada (Zero Loading & Breu Total):** Remoção de quaisquer indicadores de carregamento ou spinners. Entrada em tela preta absoluta (`bg-black`), sem vazamento de luz, transicionando diretamente para o vídeo cinematográfico.
3. **Controle de Reprodução de Vídeo e Áudio:** Tag `<video>` rodando exatamente uma vez (`loop={false}`), parando estático no último frame. Áudio ativo por padrão (`volume = 0.35`), com fallback inteligente e não invasivo para as políticas de autoplay dos navegadores (engatilha liberação unmuted no primeiro clique/toque).
4. **Limpeza do Hero:** Remoção do badge "APRESENTAÇÃO CINEMÁTICA • 60 FPS" e do botão manual "Ativar Som". Foco total na cinematografia automotiva.
5. **Navbar Oculta com Reveal Suave:** Inicia invisível (`opacity-0 pointer-events-none -translate-y-6`). Ao final da reprodução do vídeo (ou ao rolar a página), anima a entrada com fade-in e descida suave (`0.8s a 1s`, easing `cubic-bezier(0.22, 1, 0.36, 1)`).
6. **Tipografia Ultra-Premium:** Integração via `next/font/google` das fontes `Syne` (display para títulos, números de performance e badges) e `Plus Jakarta Sans` (corpo editorial e navegação). Contraste tonal rigoroso entre branco puro e prata/cinza neutro (`text-neutral-400`).

---

## 2. Arquitetura e Estrutura de Componentes

### 2.1 Design Tokens & Tipografia (`globals.css` + `layout.tsx`)
- **Display Font:** `Syne` (pesos 400, 500, 600, 700, 800) exposta via CSS var `--font-display`.
- **Sans/Body Font:** `Plus Jakarta Sans` (pesos 300, 400, 500, 600, 700) exposta via CSS var `--font-sans`.
- **Paleta Neutra & Escuridão Absoluta:**
  - `body`, `html`, `background`: `#000000` (`bg-black`).
  - Textos principais: `#ffffff`.
  - Textos secundários: `text-neutral-400` / `text-zinc-400` (prata sofisticado).
  - Acentos: vermelho de alta precisão automotiva (`#d5001c`).

### 2.2 Hero Cinemático (`Porsche360Hero.tsx`)
- Elemento `<video>` configurado com `src="/porsche.mp4"`, `loop={false}`, `playsInline`, `autoPlay`.
- Áudio:
  - Inicialização com `muted = false` e `volume = 0.35`.
  - `try { await video.play() } catch { video.muted = true; video.play(); armFirstInteractionUnmute(); }`
- Eventos de fim:
  - `onEnded` e `onTimeUpdate` (quando `currentTime >= duration - 0.4s`) disparam `onVideoEnded()`.
- Remoção completa do cabeçalho flutuante antigo do Hero (badge 60 FPS e botão de som).
- Animação do conteúdo Hero (título, especificações, CTAs) sincronizada com o clímax/final do vídeo ou rolagem inicial.

### 2.3 Navbar com Orquestração Suave (`Navbar.tsx`)
- Propriedade `show?: boolean`.
- Estado `isRevealed` derivado de `show || isScrolled`.
- Estilos de transição:
  - Oculta: `opacity-0 -translate-y-6 pointer-events-none`
  - Revelada: `opacity-100 translate-y-0 pointer-events-auto`
  - Transição: `transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]`
- Logo tipográfico:
  - `VERTEX` em `font-bold text-white tracking-[0.25em]` + `CARS` em `font-light text-neutral-400`.
  - Subtexto: `CURADORIA DE ALTA PERFORMANCE`.

### 2.4 Rebranding Global dos Componentes
- `Footer.tsx`: logo tipográfico `VERTEX CARS`, copyright `VertexCars Ltda.`, links e menções.
- `ShowroomTour.tsx`: "A Experiência VertexCars", links de WhatsApp.
- `SocialProof.tsx`: menção textual "...equipe da VertexCars...".
- `FAQSection.tsx`: links de WhatsApp com mensagem para VertexCars.
- `page.tsx` & `layout.tsx`: metadados SEO, título, descrição e OpenGraph com VertexCars.
- Eliminação de resquícios de preloader obsoleto (`porsche-preloader.ts`).

---

## 3. Estratégia de Verificação e Testes
1. **Typecheck & Lint:** `npx tsc --noEmit` deve passar com 0 erros.
2. **Build de Produção:** `npm run build` deve compilar perfeitamente.
3. **Validação Visual e Funcional no Navegador:**
   - Iniciar servidor `npm run dev`.
   - Utilizar o subagente de browser para carregar a página:
     - Conferir breu total inicial (`bg-black`).
     - Conferir ausência de tela de loading ou spinners.
     - Conferir navbar oculta no início.
     - Conferir ausência do badge 60 FPS e botão Ativar Som.
     - Conferir reprodução única do vídeo e acionamento suave da navbar no final.
     - Conferir novo branding `VERTEX CARS` e tipografia `Syne` / `Plus Jakarta Sans`.
