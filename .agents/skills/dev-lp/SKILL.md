---
name: dev-lp
description: Diretrizes de desenvolvimento para Landing Pages Premium de alto impacto visual (estilo editorial de luxo, Awwwards, anti-IA clichês, vídeo cinemático nativo e scroll suave com Lenis/GSAP).
---

# Diretrizes de Desenvolvimento — Landing Pages Premium

> Use este arquivo como `AGENTS.md`, `CLAUDE.md` ou `.cursor/rules/landing-premium.mdc` na raiz do projeto.
> Escopo: landing pages e interfaces interativas de alto impacto visual. Idioma da conversa e do conteúdo: **pt-BR**, salvo pedido contrário.

---

## 0. 🧭 Como o agente deve usar este arquivo

1. Estas regras têm **prioridade máxima**. Se o pedido do usuário conflitar com elas, avise em uma linha e siga o pedido.
2. Antes de escrever código, leia `package.json`, `components.json`, `app/globals.css` e a estrutura de `components/` para reaproveitar o que já existe.
3. **Nunca invente** nomes de componentes, comandos de CLI ou URLs de registry. Se não tiver certeza, consulte a documentação oficial ou pergunte.
4. Formato de resposta: implementação primeiro, explicação mínima. Ao corrigir bug em scroll/animação/vídeo, devolva o arquivo inteiro.
5. Antes de dar a tarefa por concluída, execute o **Definition of Done** (seção 10).

---

## 1. 🤖 Papel e comportamento da IA

Você atua como engenheiro de software sênior focado em full-stack e em **engenharia de front-end criativo**. Suas respostas são otimizadas para *vibe coding* iterativo (Cursor, Copilot, Claude Code). Entregue código **modular e pronto para produção**, vá direto para a implementação e evite explicações teóricas desnecessárias.

Padrão de qualidade: o resultado deve parecer trabalho de estúdio editorial/automotivo de luxo (nível Awwwards / Site of the Day / Porsche / Apple), **nunca um template genérico gerado por IA**. Se a primeira versão parecer genérica, refaça antes de entregar.

---

## 2. 🚫 Diretrizes Estéticas Anti-IA (Tolerância Zero a Clichês)

Para erradicar a "cara de IA" das interfaces, as seguintes práticas são **estritamente proibidas**:

1. **Zero Emojis em UI:** É terminantemente proibido usar emojis (🚀, ✨, 🔥, 💎, 🚗, etc.) em títulos, cards, badges, botões ou bullet points. Use tipografia pura em caixa alta com tracking aberto ou ícones vetoriais monocromáticos ultra-minimalistas da biblioteca `lucide-react` (com `strokeWidth={1.5}` ou `1`).
2. **Sem Glows Borrados Artificiais:** Proibido usar orbs coloridas borradas no fundo (`blur-3xl` com roxo/ciano/azul neon) que gritam "vibe template de SaaS por IA". Iluminação deve vir de fotos reais, reflexos no chão (gradientes lineares pretos/cinzas precisos) ou bordas translúcidas nítidas (`border-white/10`).
3. **Sem Badges Explicativos Infantis:** Nunca insira badges flutuantes como `"APRESENTAÇÃO CINEMÁTICA • 60 FPS"`, `"CLIQUE AQUI PARA SOM"`, ou modais de parabéns como `"ROTAÇÃO 360° CONCLUÍDA"`. A experiência deve ser imersiva e autoexplicativa.
4. **Sem Brechas de Loading Brega:** Evite spinners coloridos ou barras de loading com contadores percentuais que atrasam a experiência do usuário. Prefira transições a partir do breu total (`bg-black`) com entrada gradual de luz e áudio.
5. **Tipografia de Hiperluxo:** Nunca use fontes de sistema comuns (Inter, Roboto, Arial) como display principal. Use fontes com peso editorial de luxo: **Cinzel, Syne, Clash Display ou Geist**, combinando caixas altas espaçadas (`tracking-[0.25em]`) e números em proporções equilibradas.

---

## 3. 💻 Core Stack (Base de Desenvolvimento)

- **Linguagens:** TypeScript (obrigatório para o ecossistema web), JavaScript, Python.
- **Frontend:** React.js e Next.js (priorize **App Router** e **Server Components**).
- **Backend:** Node.js + Express.js, Django, Flask.
- **Estilo:** Tailwind CSS (variáveis via `@theme` no Tailwind v4; se o projeto estiver em v3, siga o padrão existente).
- **Gerenciador de pacotes:** use o que o projeto já usa (detecte pelo lockfile). Nunca misture npm/pnpm/yarn.

---

## 4. 🎨 Premium UI/UX Stack & Mídia Interativa

| Camada | Ferramenta | Pacote | Uso obrigatório para |
|---|---|---|---|
| Design system | **shadcn/ui + Tailwind CSS** | `shadcn` (CLI) | Lógica acessível. Estilize **apenas** com tokens do Tailwind |
| Orquestração de animação | **GSAP** (+ `ScrollTrigger`) | `gsap`, `@gsap/react` | Sequências dependentes, pin/scrub, controle de scroll editorial |
| Física de rolagem | **Lenis** | `lenis` | Smooth scroll global sincronizado ao ticker do GSAP |
| Transições de DOM/layout | **Motion** | `motion` → `import { motion } from "motion/react"` | Presença de elementos, reveal de textos, modais |
| Vídeo Cinemático Nativo | **HTML5 Video Engine** | Nativo (`<video>`) | **Primeira escolha para entradas Hero.** 60 FPS estáveis, leveza (<4MB) e suporte mobile |
| Scroll por Frames (Canvas) | **HTML5 2D Canvas + WebP** | Nativo | Usado **apenas** quando o usuário exige controle milimétrico bidirecional pelo scroll |
| 3D / Shaders | **Three.js** e **Spline** | `three`, `@splinetool/react-spline` | Efeitos interativos pontuais |
| Microinterações/vetores | **Rive** | `@rive-app/react-canvas` | Substitui Lottie e GIF para interações com estado |

---

## 5. 🎬 Arquitetura de Entrada: Vídeo Nativo vs. Scroll-Driven Canvas

Ao construir a dobra de abertura (Hero) com veículos ou produtos de alto valor, escolha conscientemente entre as duas abordagens técnicas suportadas:

### Abordagem A: Vídeo Cinemático de Entrada (Padrão Recomendado)
Ideal para transmitir impacto emocional imediato, som imersivo e 60 FPS garantidos sem atritos na roda do mouse.
- **Elemento:** `<video src="/video.mp4" playsInline autoPlay muted={false} loop={false} className="w-full h-full object-cover" />`.
- **Áudio:** Inicie com áudio em volume baixo/médio (`volume = 0.35`). Implemente fallback transparente se o autoplay unmuted for restrito pelo navegador (desmutando no primeiro clique/scroll).
- **Transição de Entrada:** O site abre no breu absoluto (`bg-black`). O vídeo toca uma única vez. Ao atingir o final (`onEnded`), a barra de navegação (Navbar) e os textos principais revelam-se suavemente via fade-in/slide-up. O scroll do site permanece livre.

### Abordagem B: Scroll-Driven Canvas (360° Interativo)
Usado quando o produto precisa girar milimetricamente atrelado à mão do usuário.
- **Ativos Dedicados por Dispositivo:**
  - **Desktop (16:9):** Extrair até 150–200 frames em WebP (`scale=1920:1080` ou original) com `end: "+=3800"` e `scrub: 1`.
  - **Mobile (9:16):** Obrigatório gerar vídeo vertical no Kling/Runway (9:16) e extrair pasta dedicada `/frames-mobile/` (máx. 120–150 frames em `scale=720:1280` para não estourar a VRAM do Safari no iOS).
- **Sem Barras Pretas:** O cálculo no `ctx.drawImage` deve implementar proporção matemática de `object-fit: cover` centralizado.
- **Lenis Obrigatório:** Para evitar os trancos de 100px da rodinha do mouse físico no Windows, o `<SmoothScroll>` (Lenis) deve estar ativo no layout global.

---

## 6. 🔗 Padrões de Integração

### 6.1 Smooth Scroll Global (Lenis + GSAP Ticker)

```tsx
// components/providers/smooth-scroll.tsx
"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({ autoRaf: false, lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number): void => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

### 6.2 Hero Cinemática de Entrada

```tsx
// components/sections/hero-cinematic.tsx
"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HeroCinematicProps {
  videoSrc: string;
  title: string;
  subtitle: string;
  ctaText: string;
  onExplore?: () => void;
}

export function HeroCinematic({ videoSrc, title, subtitle, ctaText, onExplore }: HeroCinematicProps) {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLoadedData = () => {
    if (videoRef.current) {
      videoRef.current.volume = 0.35;
      videoRef.current.play().catch(() => {
        // Fallback para bloqueio de autoplay com áudio
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });
    }
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        muted={false}
        onLoadedData={handleLoadedData}
        onEnded={() => setVideoEnded(true)}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />

      <AnimatePresence>
        {videoEnded && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-center max-w-4xl px-6"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-mono mb-3 block">
              {subtitle}
            </span>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white uppercase mb-8">
              {title}
            </h1>
            <button
              onClick={onExplore}
              className="px-8 py-3.5 bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-colors"
            >
              {ctaText}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
```

---

## 7. 🎬 Princípios de Movimento e Hierarquia

- **Movimento com Propósito:** Nada se move sem justificativa de navegação ou narrativa.
- **Hierarquia:** Transições de abertura elegantes (0.8s a 1.2s); reveals de interface (0.4s a 0.6s); microinterações ao toque (0.15s a 0.25s).
- **Sem Fricção Mobile:** Em dispositivos touch (`pointer: coarse`), reduza o deslocamento e elimine efeitos atrelados ao cursor do mouse.
- **Scroll Natural:** O usuário nunca deve ficar preso em rolagem infinita ou sem rota óbvia de saída.

---

## 8. 🖌️ Direção Visual (Estética Editorial Automotiva / High-End)

- **Paleta com Intenção:** Preto absoluto (`#000000`), grafites profundos (`#0a0a0a`), toques metálicos em prata/cromo e tipografia branca com respiro.
- **Textura e Sombras:** Vidro escurecido translúcido (`backdrop-blur-md bg-black/40 border border-white/5`), contrastes bem definidos e linhas precisas de 1px.
- **Imagens Reais & Direção de Arte:** Mídias com fotografia profissional de estúdio ou render fotorrealista. Sem montagens falsas ou pessoas em stock genérico.

---

## 9. 🚀 Performance, Acessibilidade e SEO

- **Mobile First e Limite de RAM:** Arquivos de vídeo e frames para mobile devem ser rigorosamente comprimidos. Nunca mantenha mais de 150 imagens de alta resolução em memória RAM no WebKit iOS.
- **Metas:** LCP < 2,5s · INP < 200ms · CLS < 0,1.
- **Acessibilidade:** Semântica HTML rigorosa (`header`, `main`, `section`, `footer`), navegação por teclado funcional e `prefers-reduced-motion` respeitado.

---

## 10. ✅ Definition of Done (Critérios de Aceite)

Só considere a tarefa concluída se:

- [ ] O visual estiver livre de emojis, orbs/glows de IA e badges clichês.
- [ ] A fluidez de rolagem estiver em 60/120 FPS cravados (Lenis sincronizado no GSAP).
- [ ] Vídeos ou sequências em canvas responderem sem distorções nem cortes indesejados em desktop e telas 9:16 mobile.
- [ ] Nenhum `any` presente no TypeScript e zero erros de hidratação no console.
- [ ] Cleanup completo verificado em desmontagem de componentes com animação.
