"use client";

import Image from "next/image";
import { Building2, Award, Clock, Users, Shield, Sparkles } from "lucide-react";

export default function ShowroomTour() {
  const perks = [
    {
      icon: Building2,
      title: "Showroom Conceito de 2.000m²",
      desc: "Espaço climatizado com lounge VIP, café gourmet e iluminação desenvolvida para apreciação automotiva.",
    },
    {
      icon: Award,
      title: "Certificação Porsche Approved",
      desc: "Inspeção técnica rigorosa de 111 itens realizada por especialistas com ferramental oficial.",
    },
    {
      icon: Clock,
      title: "Entrega Técnica em Todo o Brasil",
      desc: "Transporte em caminhão prancha fechado (reboque blindado) direto na sua garagem.",
    },
    {
      icon: Shield,
      title: "Sigilo & Assessoria Jurídica",
      desc: "Transferência de propriedade imediata, blindagem certificada pelo Exército e total discrição.",
    },
  ];

  return (
    <section id="showroom" className="py-24 bg-[#07080a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-red-500 font-semibold block mb-2 font-display">
            A Experiência VertexCars
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-display">
            A Loja Por Dentro
          </h2>
          <p className="mt-2 text-zinc-400 text-sm sm:text-base font-light">
            Mais do que vender supercarros, oferecemos um padrão de curadoria e atendimento exclusivo para entusiastas da alta performance.
          </p>
        </div>

        {/* Hero Showroom Image with Ribbon Delivery */}
        <div className="relative aspect-[16/9] max-h-[500px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-14 group">
          <Image
            src="/images/porsche_showroom.jpg"
            alt="Showroom VertexCars"
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-red-600 text-white tracking-wider inline-block mb-2 font-display">
                Cerimônia de Entrega VIP
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                O momento inesquecível da entrega da sua nova máquina
              </h3>
            </div>
            <a
              href="https://wa.me/5534991610075?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20visita%20ao%20showroom%20da%20VertexCars."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors font-display"
            >
              Agendar Visita ao Showroom
            </a>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-950/60 border border-white/5 hover:border-red-500/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors text-red-500">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">{perk.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{perk.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
