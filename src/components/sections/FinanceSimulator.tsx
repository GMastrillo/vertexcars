"use client";

import { useState } from "react";
import Image from "next/image";
import { Calculator, MessageSquare, ShieldCheck, CheckCircle2, DollarSign, Sparkles } from "lucide-react";
import { VEHICLES } from "@/data/vehicles";
import { formatCurrencyBRL } from "@/lib/utils";

export default function FinanceSimulator() {
  const [selectedCarId, setSelectedCarId] = useState(VEHICLES[0].id);
  const currentCar = VEHICLES.find((v) => v.id === selectedCarId) || VEHICLES[0];

  // Entrada em % (de 20% a 80%)
  const [downPaymentPercent, setDownPaymentPercent] = useState(40);
  const [months, setMonths] = useState(36);

  const carPrice = currentCar.price;
  const downPaymentValue = (carPrice * downPaymentPercent) / 100;
  const financedValue = carPrice - downPaymentValue;

  // Taxa estimada de 1.19% a.m. (típica para financiamento de supercarros no Brasil)
  const monthlyRate = 0.0119;
  const monthlyPayment =
    (financedValue * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return (
    <section id="simulador" className="py-24 bg-[#090b0e] relative border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400 uppercase tracking-widest mb-3">
            <Calculator className="w-3.5 h-3.5 text-red-500" />
            <span>Transparência Total</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Faça as Contas Antes de Decidir
          </h2>
          <p className="mt-2 text-zinc-400 text-sm sm:text-base">
            Simule a entrada e o plano de parcelamento para sua próxima Porsche com taxas exclusivas de private banking.
          </p>
        </div>

        {/* Main Simulator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Controls */}
          <div className="lg:col-span-7 bg-zinc-950/80 border border-white/10 rounded-3xl p-6 sm:p-10 flex flex-col justify-between shadow-2xl">
            <div className="space-y-8">
              {/* Car Select */}
              <div>
                <label className="text-xs uppercase font-semibold text-zinc-400 tracking-wider block mb-2">
                  1. Escolha o Veículo para a Simulação
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {VEHICLES.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedCarId(v.id)}
                      className={`text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                        selectedCarId === v.id
                          ? "bg-white/10 border-red-500 text-white shadow-lg"
                          : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <div className="font-bold">{v.name}</div>
                      <div className="text-[11px] text-zinc-400">{formatCurrencyBRL(v.price)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Down Payment Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-zinc-300 uppercase tracking-wider">
                    2. Valor da Entrada ({downPaymentPercent}%)
                  </span>
                  <span className="font-black text-white text-base">
                    {formatCurrencyBRL(downPaymentValue)}
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-zinc-500">
                  <span>Mínimo 20% ({formatCurrencyBRL(carPrice * 0.2)})</span>
                  <span>Máximo 80% ({formatCurrencyBRL(carPrice * 0.8)})</span>
                </div>
              </div>

              {/* Installments Duration Pills */}
              <div className="space-y-3">
                <label className="text-xs uppercase font-semibold text-zinc-300 tracking-wider block">
                  3. Prazo do Financiamento
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[12, 24, 36, 48, 60].map((term) => (
                    <button
                      key={term}
                      onClick={() => setMonths(term)}
                      className={`py-3 rounded-xl text-xs font-bold transition-all ${
                        months === term
                          ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105"
                          : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5"
                      }`}
                    >
                      {term}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 text-[11px] text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>
                Simulação indicativa baseada em taxa média de 1,19% a.m. Sujeito à análise de crédito pelos bancos parceiros (Safra, Santander Private, Itaú Personnalité).
              </span>
            </div>
          </div>

          {/* Right: Simulation Result Box (Identical style to video 00:50!) */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-white/10 p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={currentCar.image}
                  alt={currentCar.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white font-bold text-sm">
                  {currentCar.name}
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold block">
                  Estimativa de Parcela Mensal ({months}x)
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-1">
                  {formatCurrencyBRL(monthlyPayment)}
                  <span className="text-xs text-zinc-400 font-normal"> / mês</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Valor Total do Veículo:</span>
                  <span className="font-semibold text-white">{formatCurrencyBRL(carPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Entrada ({downPaymentPercent}%):</span>
                  <span className="font-semibold text-white">{formatCurrencyBRL(downPaymentValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Saldo Financiado:</span>
                  <span className="font-semibold text-white">{formatCurrencyBRL(financedValue)}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <a
                href={`https://wa.me/5511999990000?text=Ol%C3%A1%2C%20gostaria%20de%20formalizar%20a%20simula%C3%A7%C3%A3o%20da%20${encodeURIComponent(
                  currentCar.name
                )}%20com%20entrada%20de%20${encodeURIComponent(
                  formatCurrencyBRL(downPaymentValue)
                )}%20em%20${months}x%20de%20${encodeURIComponent(formatCurrencyBRL(monthlyPayment))}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-red-600/30 hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Receber Proposta Oficial no WhatsApp</span>
              </a>
              <p className="text-[10px] text-center text-zinc-500">
                Atendimento confidencial e aprovação em menos de 2 horas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
