"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, MessageSquare, ArrowRight } from "lucide-react";
import { formatCurrencyBRL } from "@/lib/utils";

interface HeroCar {
  id: string;
  name: string;
  tagline: string;
  price: number;
  power: string;
  accel: string;
  topSpeed: string;
  image: string;
  badge: string;
}

const HERO_MODELS: HeroCar[] = [
  {
    id: "gt3-rs",
    name: "Porsche 911 GT3 RS",
    tagline: "Engenharia de pista homologada para o asfalto",
    price: 2490000,
    power: "525 cv",
    accel: "3,2s",
    topSpeed: "296 km/h",
    image: "/images/porsche_hero_dark.jpg",
    badge: "Destaque Principal • Weissach Package",
  },
  {
    id: "cayenne-turbo-gt",
    name: "Porsche Cayenne Turbo GT",
    tagline: "O SUV mais rápido e visceral da história",
    price: 1390000,
    power: "659 cv",
    accel: "3,3s",
    topSpeed: "305 km/h",
    image: "/images/porsche_cayenne.jpg",
    badge: "V8 Biturbo • Nürburgring Record",
  },
  {
    id: "taycan-turbo-s",
    name: "Porsche Taycan Turbo S",
    tagline: "A força eletrizante do futuro automotivo",
    price: 980000,
    power: "761 cv",
    accel: "2,8s",
    topSpeed: "260 km/h",
    image: "/images/porsche_taycan.jpg",
    badge: "100% Elétrico • Torque Instantâneo",
  },
];

export default function HeroSection() {
  const [activeCarIndex, setActiveCarIndex] = useState(0);
  const current = HERO_MODELS[activeCarIndex];

  const handlePrev = () => {
    setActiveCarIndex((prev) => (prev - 1 + HERO_MODELS.length) % HERO_MODELS.length);
  };

  const handleNext = () => {
    setActiveCarIndex((prev) => (prev + 1) % HERO_MODELS.length);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-24 pb-14 overflow-hidden bg-[#07080a]">
      {/* Background Radial Glow Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Tagline & Badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 backdrop-blur-md mb-4">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="font-medium tracking-wide uppercase">{current.badge}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase max-w-4xl mx-auto leading-[1.08]">
          Seu próximo carro <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
            já está em movimento
          </span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto font-light">
          A maior autoridade em veículos de alta performance de Minas Gerais. Atendimento sob sigilo, procedência comprovada e entrega em território nacional.
        </p>
      </div>

      {/* Centerpiece Car Presentation: Perfectly Centered Horizontally */}
      <div className="relative w-full max-w-5xl mx-auto my-8 px-4 z-10 flex flex-col items-center justify-center">
        <div className="relative w-full aspect-[16/9] max-h-[520px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/60 group">
          {/* Lateral Controls (Setas Esquerda e Direita) */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/65 hover:bg-red-600 border border-white/15 hover:border-red-500 text-white flex items-center justify-center backdrop-blur-xl shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
            aria-label="Modelo Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/65 hover:bg-red-600 border border-white/15 hover:border-red-500 text-white flex items-center justify-center backdrop-blur-xl shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
            aria-label="Próximo Modelo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* The Studio Photograph */}
              <Image
                src={current.image}
                alt={current.name}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1024px"
                className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-black/20 pointer-events-none" />

              {/* Live Spec Badges Floating on Car */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 z-20 pointer-events-none">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs uppercase tracking-widest text-red-400 font-semibold block">
                    {current.tagline}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    {current.name}
                  </h3>
                  <div className="text-xl sm:text-2xl font-bold text-white/90">
                    {formatCurrencyBRL(current.price)}
                  </div>
                </div>

                {/* Performance Metrics Pills */}
                <div className="flex items-center gap-3 bg-black/75 backdrop-blur-xl border border-white/10 p-2.5 rounded-2xl">
                  <div className="px-3 text-center border-r border-white/10">
                    <div className="text-[10px] text-zinc-400 uppercase">Potência</div>
                    <div className="text-sm font-bold text-white">{current.power}</div>
                  </div>
                  <div className="px-3 text-center border-r border-white/10">
                    <div className="text-[10px] text-zinc-400 uppercase">0-100 km/h</div>
                    <div className="text-sm font-bold text-emerald-400">{current.accel}</div>
                  </div>
                  <div className="px-3 text-center">
                    <div className="text-[10px] text-zinc-400 uppercase">Vel. Máx</div>
                    <div className="text-sm font-bold text-white">{current.topSpeed}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Model Switcher Buttons & Slide Counter */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
          {HERO_MODELS.map((car, idx) => (
            <button
              key={car.id}
              onClick={() => setActiveCarIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all uppercase ${
                activeCarIndex === idx
                  ? "bg-white text-black shadow-lg shadow-white/10 scale-105"
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {car.name.replace("Porsche ", "")}
            </button>
          ))}
          <span className="text-xs font-mono text-zinc-500 ml-2">
            0{activeCarIndex + 1} / 0{HERO_MODELS.length}
          </span>
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="max-w-4xl mx-auto px-4 w-full flex flex-col sm:flex-row items-center justify-center gap-4 z-10">
        <a
          href={`https://wa.me/5534991610075?text=Ol%C3%A1%2C%20tenho%20interesse%20em%20agendar%20uma%20apresenta%C3%A7%C3%A3o%20VIP%20do%20${encodeURIComponent(
            current.name
          )}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02]"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Agendar Apresentação VIP</span>
        </a>

        <a
          href="#estoque"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm tracking-wider border border-white/10 backdrop-blur-md transition-all hover:border-white/20"
        >
          <span>Ver Estoque Completo</span>
          <ArrowRight className="w-4 h-4 text-zinc-400" />
        </a>
      </div>
    </section>
  );
}
