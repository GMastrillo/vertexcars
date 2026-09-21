"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowDown, MessageSquare, Volume2, VolumeX, Sparkles, ShieldCheck } from "lucide-react";

export function PorscheHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Trigger text reveal after 3 seconds or when video playback advances
  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 3) {
      setRevealed(true);
    }
  };

  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const scrollToNext = () => {
    const heroHeight = window.innerHeight;
    window.scrollTo({
      top: heroHeight,
      behavior: "smooth",
    });
  };

  const scrollToInventory = () => {
    const inventoryEl = document.getElementById("estoque");
    if (inventoryEl) {
      inventoryEl.scrollIntoView({ behavior: "smooth" });
    } else {
      scrollToNext();
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#000407] select-none flex flex-col justify-between">
      {/* 1. Cinematic Native 60 FPS Video */}
      <video
        ref={videoRef}
        src="/porsche.mp4"
        autoPlay
        muted={isMuted}
        playsInline
        loop
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 2. Studio Lighting Vignettes & Depth Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000407] via-[#000407]/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#000407]/80 via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

      {/* 3. Top Header Bar: Sound Controls & Badge */}
      <div className="relative z-20 pt-24 px-6 max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-zinc-300 uppercase">
            Apresentação Cinemática • 60 FPS
          </span>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          aria-label={isMuted ? "Ativar som do motor" : "Silenciar áudio"}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 hover:border-white/25 backdrop-blur-md text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-red-500" />
              <span className="hidden sm:inline">Ativar Som</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Som Ativo</span>
            </>
          )}
        </button>
      </div>

      {/* 4. Animated Text & Call to Action Overlays */}
      <div className="relative z-20 pb-12 px-6 max-w-7xl mx-auto w-full flex flex-col items-center sm:items-start">
        <div
          className={`transition-all duration-1000 ease-out transform max-w-2xl text-center sm:text-left ${
            revealed
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600/10 border border-red-500/20 text-red-500 text-[11px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3 text-red-500" />
            Porsche 911 GT3 RS • Weissach Package
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none drop-shadow-2xl">
            Seu próximo carro já está em movimento
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-xs sm:text-base text-zinc-300 font-normal leading-relaxed drop-shadow-md">
            Engenharia de pista pura homologada para as ruas. Aerodinâmica ativa de 860 kg de downforce, motor boxer 4.0L aspirado e câmbio PDK de 7 velocidades.
          </p>

          {/* Performance Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-5">
            <div className="px-3 py-2 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-left">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Potência</span>
              <span className="text-sm sm:text-base font-extrabold text-white font-mono">525 cv</span>
            </div>
            <div className="px-3 py-2 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-left">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">0 a 100 km/h</span>
              <span className="text-sm sm:text-base font-extrabold text-white font-mono">3,2s</span>
            </div>
            <div className="px-3 py-2 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-left">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Giro Máximo</span>
              <span className="text-sm sm:text-base font-extrabold text-emerald-400 font-mono">9.000 RPM</span>
            </div>
            <div className="px-3 py-2 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-left">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Downforce</span>
              <span className="text-sm sm:text-base font-extrabold text-red-500 font-mono">860 kg</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-1 w-full sm:w-auto">
            <button
              onClick={scrollToInventory}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Ver Estoque Exclusivo</span>
              <ShieldCheck className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/5534999999999?text=Ol%C3%A1%2C%20tenho%20interesse%20em%20conhecer%20os%20ve%C3%ADculos%20Porsche%20dispon%C3%ADveis%20na%20Ibiza%20Motors."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Falar com Especialista</span>
            </a>
          </div>
        </div>

        {/* 5. Scroll Prompt (Native scroll, zero hijacking) */}
        <div className="w-full flex items-center justify-center pt-8 pointer-events-auto">
          <button
            onClick={scrollToNext}
            className="flex flex-col items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="text-[10px] uppercase font-bold tracking-widest group-hover:tracking-wider transition-all">
              Role para explorar os modelos
            </span>
            <div className="w-8 h-8 rounded-full border border-white/10 bg-black/40 flex items-center justify-center group-hover:border-red-500/50 group-hover:bg-red-600/10 transition-all">
              <ArrowDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-red-500 animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

export const Porsche360Hero = PorscheHero;
export default PorscheHero;
