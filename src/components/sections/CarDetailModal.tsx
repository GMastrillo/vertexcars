"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, MessageSquare, ShieldCheck, CheckCircle2, Gauge, Calendar, Cog, Flame, Sparkles } from "lucide-react";
import { Vehicle } from "@/data/vehicles";
import { formatCurrencyBRL, formatNumberBR } from "@/lib/utils";
import confetti from "canvas-confetti";

interface CarDetailModalProps {
  car: Vehicle | null;
  onClose: () => void;
}

export default function CarDetailModal({ car, onClose }: CarDetailModalProps) {
  if (!car) return null;

  const handleReserve = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      window.open(
        `https://wa.me/5511999990000?text=Ol%C3%A1%2C%20quero%20solicitar%20a%20reserva%20exclusiva%20da%20${encodeURIComponent(
          car.name
        )}%20(${encodeURIComponent(formatCurrencyBRL(car.price))}).`,
        "_blank"
      );
    }, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl">
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-zinc-300 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Top Media */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-red-600 text-white tracking-wider">
                    {car.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    {car.name}
                  </h3>
                  <div className="text-xs text-zinc-300">{car.colorName}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase text-zinc-400">Preço Especial</div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {formatCurrencyBRL(car.price)}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Numbers Matrix ("Cada número, verificado" - video 00:53) */}
            <div>
              <h4 className="text-xs uppercase font-bold text-red-500 tracking-widest mb-3">
                Cada Número, Verificado
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-[10px] uppercase text-zinc-400">Ano / Modelo</div>
                  <div className="text-lg font-black text-white mt-0.5">{car.year}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-[10px] uppercase text-zinc-400">Quilometragem</div>
                  <div className="text-lg font-black text-white mt-0.5">
                    {formatNumberBR(car.mileage)} km
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-[10px] uppercase text-zinc-400">Potência</div>
                  <div className="text-lg font-black text-white mt-0.5">{car.power}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-[10px] uppercase text-zinc-400">Aceleração 0-100</div>
                  <div className="text-lg font-black text-emerald-400 mt-0.5">
                    {car.acceleration}
                  </div>
                </div>
              </div>
            </div>

            {/* What makes this car special ("O que faz este carro especial" - video 00:52) */}
            <div>
              <h4 className="text-xs uppercase font-bold text-red-500 tracking-widest mb-3">
                O Que Faz Este Carro Especial
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {car.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-zinc-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment and Interior ("O que vem dentro" - video 00:54) */}
            <div>
              <h4 className="text-xs uppercase font-bold text-zinc-400 tracking-widest mb-3">
                Equipamentos & Opcionais Exclusivos
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-400">
                {car.equipment.map((eq, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                    <span>{eq}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Inspection */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div className="text-xs text-emerald-200">
                <span className="font-bold">Certificação Cautelar 100% Aprovada:</span> Estrutura íntegra, sem leilão, sem sinistro, histórico de manutenções comprovado por nota fiscal.
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-6 bg-black/80 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-zinc-400">À vista ou Financiado</div>
              <div className="text-2xl font-black text-white">{formatCurrencyBRL(car.price)}</div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-white/10 text-zinc-300 hover:text-white text-xs font-semibold"
              >
                Voltar
              </button>
              <button
                onClick={handleReserve}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-red-600/30"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Reservar Veículo via WhatsApp</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
