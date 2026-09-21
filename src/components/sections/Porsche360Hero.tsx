"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { preloadPorscheFrames, PreloadProgress, getCachedPorscheFrames } from "@/lib/porsche-preloader";
import { Compass } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TOTAL_FRAMES = 300;
const BG_COLOR = "#000407";

export function PorscheHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // In-memory array of preloaded HTMLImageElement objects
  const framesRef = useRef<HTMLImageElement[]>([]);

  // High-performance canvas drawing function with centered object-fit: cover
  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frames = framesRef.current;
    if (!frames || frames.length === 0) return;

    // Constrain index safely
    const clampedIndex = Math.max(0, Math.min(frameIdx, frames.length - 1));
    const img = frames[clampedIndex];
    if (!img || !img.complete) return;

    // High quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Clean background
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Dynamic aspect ratio calculation based on natural dimensions
    const imgWidth = img.naturalWidth || 1920;
    const imgHeight = img.naturalHeight || 1080;
    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = canvasWidth / canvasHeight;

    let drawWidth: number;
    let drawHeight: number;

    // object-fit: cover math ensuring no black bars on both widescreen and mobile (9:16)
    if (canvasAspect > imgAspect) {
      // Screen is wider than image aspect ratio (e.g. ultra-wide desktop)
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgAspect;
    } else {
      // Screen is taller than image aspect ratio (e.g. mobile 9:16 portrait)
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgAspect;
    }

    const offsetX = (canvasWidth - drawWidth) / 2;
    const offsetY = (canvasHeight - drawHeight) / 2;

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Window resize handler adjusting for DPR (capped at 2 for Retina sharpness without GPU bloat)
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    renderFrame(currentFrameIndex);
  }, [currentFrameIndex, renderFrame]);

  // Preload all 300 frames into memory on mount
  useEffect(() => {
    const cached = getCachedPorscheFrames();
    if (cached && cached.length === TOTAL_FRAMES) {
      framesRef.current = cached;
      setIsLoaded(true);
      setLoadingProgress(1);
      setTimeout(handleResize, 50);
      return;
    }

    preloadPorscheFrames(TOTAL_FRAMES, (p: PreloadProgress) => {
      setLoadingProgress(p.progress);
      if (p.loaded === 1 && canvasRef.current) {
        renderFrame(0);
      }
      if (p.isComplete) {
        setIsLoaded(true);
      }
    }).then((loadedImgs) => {
      framesRef.current = loadedImgs;
      handleResize();
    });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize, renderFrame]);

  // GSAP ScrollTrigger calibrated for Desktop vs Mobile via gsap.matchMedia()
  useGSAP(
    () => {
      if (!isLoaded || !containerRef.current || !pinRef.current) return;

      const mm = gsap.matchMedia();
      const frameObj = { frame: 0 };
      let lastRenderedIndex = -1;

      const handleUpdate = (progress: number) => {
        setScrollProgress(progress);
        const currentIdx = Math.round(frameObj.frame);
        if (currentIdx !== lastRenderedIndex) {
          lastRenderedIndex = currentIdx;
          setCurrentFrameIndex(currentIdx);
          renderFrame(currentIdx);
        }
      };

      // Desktop (>= 1024px): end: "+=5000", scrub: 1 (amortecimento perfeito dos quadros por clique de mouse)
      mm.add("(min-width: 1024px)", () => {
        gsap.to(frameObj, {
          frame: TOTAL_FRAMES - 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: pinRef.current,
            start: "top top",
            end: "+=5000",
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              handleUpdate(self.progress);
            },
          },
        });
      });

      // Mobile / Touch (< 1024px): end: "+=2600", scrub: 0.4 (resposta ágil ao toque na tela)
      mm.add("(max-width: 1023px)", () => {
        gsap.to(frameObj, {
          frame: TOTAL_FRAMES - 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: pinRef.current,
            start: "top top",
            end: "+=2600",
            scrub: 0.4,
            anticipatePin: 1,
            onUpdate: (self) => {
              handleUpdate(self.progress);
            },
          },
        });
      });

      return () => {
        mm.revert();
      };
    },
    { dependencies: [isLoaded, renderFrame], scope: containerRef }
  );

  // Jump smoothly to a specific rotation angle
  const jumpToAngle = (targetProgress: number) => {
    if (!containerRef.current) return;
    const isDesktop = window.innerWidth >= 1024;
    const scrollDistance = isDesktop ? 5000 : 2600;
    const containerTop = containerRef.current.offsetTop;
    const targetScroll = containerTop + scrollDistance * targetProgress;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const currentDegree = Math.round(scrollProgress * 360);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#000407] select-none"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinRef}
        className="w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#000407] relative"
      >
        {/* Ambient Studio Lighting Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[900px] h-[200px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />

        {/* Loading Overlay Screen */}
        {!isLoaded && (
          <div className="absolute inset-0 z-40 bg-[#000407] flex flex-col items-center justify-center p-6 transition-opacity duration-700">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-950 flex items-center justify-center border border-red-500/30 mb-6 shadow-2xl animate-pulse">
              <span className="font-serif font-black text-white text-2xl">P</span>
            </div>
            <h3 className="text-xl font-bold uppercase tracking-widest text-white text-center">
              Carregando Experiência 360º
            </h3>
            <p className="text-xs text-zinc-400 mt-1 mb-6 text-center">
              Sincronizando 300 fotogramas em alta definição...
            </p>

            <div className="w-64 max-w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-150 ease-out"
                style={{ width: `${Math.round(loadingProgress * 100)}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-zinc-500 mt-2">
              {Math.round(loadingProgress * 100)}%
            </span>
          </div>
        )}

        {/* Top Header Bar: Clean 360 Degree Dial Pill */}
        <div className="absolute top-20 left-0 right-0 z-20 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-end pointer-events-none">
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-red-500 animate-spin-slow" />
            <span className="font-mono text-xs font-bold text-white tracking-wider">
              {currentDegree}° <span className="text-zinc-500 text-[10px]">/ 360°</span>
            </span>
          </div>
        </div>

        {/* The HTML5 Rendering Canvas with full bleed cover */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover z-10"
        />

        {/* Narrative Overlays Synchronized by Rotation Angle */}
        {/* Stage 1: Frontal (0% - 25%) */}
        <div
          className={`absolute bottom-20 left-4 sm:left-12 max-w-md z-20 transition-all duration-500 pointer-events-none ${
            scrollProgress < 0.25
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-[10px] uppercase font-bold tracking-widest text-red-500 block mb-1">
            01 • Visão Frontal & Faróis Matrix LED
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Aerodinâmica Pura
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
            Entradas de ar ativas no capô em fibra de carbono aparente e dutos de arrefecimento desenvolvidos no túnel de vento de Weissach.
          </p>
          <div className="flex items-center gap-2.5 mt-3">
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-zinc-300 font-semibold">
              525 cv Aspirado
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-zinc-300 font-semibold">
              0-100 em 3,2s
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-emerald-400 font-semibold">
              9.000 RPM
            </span>
          </div>
        </div>

        {/* Stage 2: Profile (30% - 58%) */}
        <div
          className={`absolute bottom-20 right-4 sm:right-12 max-w-md z-20 text-right transition-all duration-500 pointer-events-none ${
            scrollProgress >= 0.28 && scrollProgress < 0.58
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-[10px] uppercase font-bold tracking-widest text-red-500 block mb-1">
            02 • Perfil Lateral & Chassi Forjado
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Silhueta Monobloco
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
            Rodas forjadas em magnésio leve de 20&quot; na frente e 21&quot; atrás com travamento central e freios carbono-cerâmica PCCB com pinças amarelas.
          </p>
          <div className="flex items-center justify-end gap-2.5 mt-3">
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-zinc-300 font-semibold">
              Freios Cerâmicos PCCB
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-zinc-300 font-semibold">
              Travamento Central
            </span>
          </div>
        </div>

        {/* Stage 3: Rear & DRS Wing (62% - 90%) */}
        <div
          className={`absolute bottom-20 left-4 sm:left-12 max-w-md z-20 transition-all duration-500 pointer-events-none ${
            scrollProgress >= 0.62 && scrollProgress < 0.90
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-[10px] uppercase font-bold tracking-widest text-red-500 block mb-1">
            03 • Visão Traseira & Downforce
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Asa com Sistema DRS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
            Asa traseira móvel estilo pescoço de cisne com acionamento hidráulico DRS, gerando mais de 860 kg de pressão descendente a 285 km/h.
          </p>
          <div className="flex items-center gap-2.5 mt-3">
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-red-400 font-semibold">
              860 kg Downforce
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-zinc-300 font-semibold">
              DRS de Fórmula 1
            </span>
          </div>
        </div>

        {/* Scroll Helper Prompt (Fades out when scrolling begins) */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-500 ${
            scrollProgress < 0.04 ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 animate-pulse">
            Role para girar em 360º
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-zinc-600 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-red-500 animate-bounce" />
          </div>
        </div>

        {/* Angle Snap Buttons (Quick Exploration) */}
        <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
          <button
            onClick={() => jumpToAngle(0.01)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors ${
              scrollProgress < 0.25 ? "bg-red-600 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Frente
          </button>
          <button
            onClick={() => jumpToAngle(0.4)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors ${
              scrollProgress >= 0.25 && scrollProgress < 0.6 ? "bg-red-600 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Perfil
          </button>
          <button
            onClick={() => jumpToAngle(0.75)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors ${
              scrollProgress >= 0.6 && scrollProgress < 0.9 ? "bg-red-600 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Traseira
          </button>
          <button
            onClick={() => jumpToAngle(0.99)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors ${
              scrollProgress >= 0.9 ? "bg-red-600 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            360º
          </button>
        </div>
      </div>
    </div>
  );
}

export const Porsche360Hero = PorscheHero;
export default PorscheHero;
