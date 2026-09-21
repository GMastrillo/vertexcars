"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Gauge, Zap, Shield, Sparkles } from "lucide-react";
import { formatCurrencyBRL } from "@/lib/utils";

interface CategoryStyle {
  id: string;
  label: string;
  subtitle: string;
  carName: string;
  priceStart: number;
  highlight: string;
  image: string;
  features: string[];
}

const CATEGORIES: CategoryStyle[] = [
  {
    id: "esportivos",
    label: "ESPORTIVOS",
    subtitle: "Purismo, aerodinâmica e som visceral de motor boxer",
    carName: "Porsche 911 GT3 RS",
    priceStart: 1890000,
    highlight: "525 cv • Aspiração Natural",
    image: "/images/porsche_hero_dark.jpg",
    features: ["Câmbio PDK de resposta imediata", "Asa ativa DRS de pista", "Freios cerâmicos PCCB"],
  },
  {
    id: "suvs",
    label: "SUVS DE PERFORMANCE",
    subtitle: "Espaço, imponência e tração integral para qualquer terreno",
    carName: "Porsche Cayenne Turbo GT",
    priceStart: 980000,
    highlight: "659 cv • V8 Biturbo",
    image: "/images/porsche_cayenne.jpg",
    features: ["Suspensão pneumática adaptativa", "4 lugares executivos", "Recordista em Nürburgring"],
  },
  {
    id: "sedas",
    label: "SEDÃS & ELÉTRICOS",
    subtitle: "Conforto executivo de primeira classe com torque brutal",
    carName: "Porsche Taycan Turbo S",
    priceStart: 790000,
    highlight: "761 cv • 0-100 em 2,8s",
    image: "/images/porsche_taycan.jpg",
    features: ["Arquitetura elétrica de 800V", "Eixo traseiro esterçante", "Recarga rápida em 22 min"],
  },
];

export default function StyleSelector() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id);
  const activeStyle = CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];

  return (
    <section id="estilos" className="py-24 bg-[#090b0e] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3 text-red-500" />
            <span>Curadoria Exclusiva</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Encontre Pelo Seu Estilo
          </h2>
          <p className="mt-2 text-zinc-400 text-sm sm:text-base">
            Seja a precisão milimétrica nas curvas ou o conforto absoluto para viagens em família.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 border ${
                activeTab === cat.id
                  ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30 scale-105"
                  : "bg-white/5 text-zinc-400 border-white/5 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Display Card */}
        <div className="relative rounded-3xl bg-zinc-950/80 border border-white/10 overflow-hidden shadow-2xl p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStyle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs uppercase font-semibold text-red-500 tracking-widest block mb-1">
                    Categoria {activeStyle.label}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {activeStyle.carName}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                    {activeStyle.subtitle}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-xs text-zinc-400 uppercase">Valores a partir de</div>
                  <div className="text-2xl font-black text-white">
                    {formatCurrencyBRL(activeStyle.priceStart)}
                  </div>
                  <div className="text-xs text-emerald-400 font-medium">
                    {activeStyle.highlight}
                  </div>
                </div>

                {/* Feature Bullet Points */}
                <ul className="space-y-2.5">
                  {activeStyle.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#estoque"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Explorar Modelos desta Linha</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {/* Right Image Showcase */}
              <div className="lg:col-span-7 relative h-[280px] sm:h-[400px] rounded-2xl overflow-hidden border border-white/5">
                <Image
                  src={activeStyle.image}
                  alt={activeStyle.carName}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
