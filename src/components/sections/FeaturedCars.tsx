"use client";

import Image from "next/image";
import { MessageSquare, Eye, ShieldCheck, Gauge, Calendar, Cog } from "lucide-react";
import { VEHICLES, Vehicle } from "@/data/vehicles";
import { formatCurrencyBRL, formatNumberBR } from "@/lib/utils";

interface FeaturedCarsProps {
  onSelectCar: (car: Vehicle) => void;
}

export default function FeaturedCars({ onSelectCar }: FeaturedCarsProps) {
  const featuredList = VEHICLES.filter((v) => v.featured);

  return (
    <section id="destaques" className="py-24 bg-[#07080a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-red-500 font-semibold block mb-2">
              Seleção Especial
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Destaques da Semana
            </h2>
            <p className="mt-2 text-zinc-400 text-sm max-w-xl">
              Unidades periciadas com laudo cautelar 100% aprovado, histórico completo em concessionária oficial e prontas para entrega imediata.
            </p>
          </div>

          <a
            href="#estoque"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            <span>Ver todo o inventário (5 unidades)</span>
            <span className="text-red-500 font-bold">→</span>
          </a>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredList.map((car) => (
            <div
              key={car.id}
              className="group rounded-3xl bg-zinc-950/70 border border-white/10 hover:border-red-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-red-950/20"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-black/70 backdrop-blur-md text-white border border-white/10">
                      {car.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-600/90 text-white uppercase">
                      {car.power}
                    </span>
                  </div>

                  {/* Quick Spec Pills */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-[11px] text-zinc-300">
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/5">
                      <Calendar className="w-3 h-3 text-zinc-400" />
                      <span>{car.year}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/5">
                      <Gauge className="w-3 h-3 text-zinc-400" />
                      <span>{formatNumberBR(car.mileage)} km</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/5">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Laudo OK</span>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <h3 className="text-xl font-black text-white tracking-tight group-hover:text-red-400 transition-colors">
                    {car.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                    {car.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/5 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-zinc-400 block">Preço à vista</span>
                      <span className="text-2xl font-black text-white">
                        {formatCurrencyBRL(car.price)}
                      </span>
                    </div>
                    <span className="text-xs text-emerald-400 font-medium">
                      {car.acceleration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                <button
                  onClick={() => onSelectCar(car)}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs tracking-wider border border-white/10 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ver Ficha</span>
                </button>

                <a
                  href={`https://wa.me/5534991610075?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20${encodeURIComponent(
                    car.name
                  )}%20anunciado%20por%20${encodeURIComponent(formatCurrencyBRL(car.price))}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-red-600/20"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
