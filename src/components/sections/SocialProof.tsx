"use client";

import Image from "next/image";
import { Star, ShieldCheck, Heart, Award, CheckCircle } from "lucide-react";

export default function SocialProof() {
  const deliveries = [
    {
      client: "Dr. Eduardo Fonseca",
      role: "Cirurgião Plástico • Belo Horizonte",
      car: "Porsche 911 Carrera GTS",
      comment:
        "Atendimento impecável do primeiro contato ao transporte até minha residência em BH. O carro veio com laudo 100% aprovado e sem nenhum detalhe.",
      date: "Entregue há 2 semanas",
      rating: 5,
    },
    {
      client: "Marcelo Albuquerque",
      role: "Empresário do Agronegócio • Ribeirão Preto / SP",
      car: "Porsche Cayenne Turbo GT",
      comment:
        "Já é o terceiro veículo que compro com a equipe da VertexCars. A transparência na avaliação do meu seminovo e a agilidade no financiamento são incomparáveis.",
      date: "Entregue há 1 mês",
      rating: 5,
    },
    {
      client: "Renata & Gustavo Prado",
      role: "Investidores • São Paulo / SP",
      car: "Porsche Taycan Turbo S",
      comment:
        "Fizeram questão de realizar toda a apresentação técnica e configurar o carregador residencial antes da entrega. Experiência de compra de primeiro mundo!",
      date: "Entregue há 4 semanas",
      rating: 5,
    },
  ];

  return (
    <section id="entregas" className="py-24 bg-[#090b0e] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-red-500 font-semibold block mb-2 font-display">
            Entregas e Histórias Reais
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-display">
            Quem Compra, Faz Parte da Nossa História
          </h2>
          <p className="mt-2 text-zinc-400 text-sm sm:text-base font-light">
            Mais de 1.400 clientes atendidos e sonhos realizados em todo o território nacional.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/5 text-center">
            <div className="text-3xl sm:text-4xl font-black text-white">100%</div>
            <div className="text-xs text-zinc-400 mt-1 uppercase font-medium">Laudo Cautelar Aprovado</div>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/5 text-center">
            <div className="text-3xl sm:text-4xl font-black text-red-500">+1.400</div>
            <div className="text-xs text-zinc-400 mt-1 uppercase font-medium">Veículos Entregues</div>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/5 text-center">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">4.9 / 5.0</div>
            <div className="text-xs text-zinc-400 mt-1 uppercase font-medium">Avaliação no Google</div>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/5 text-center">
            <div className="text-3xl sm:text-4xl font-black text-white">33 Anos</div>
            <div className="text-xs text-zinc-400 mt-1 uppercase font-medium">De Tradição no Mercado</div>
          </div>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deliveries.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-zinc-950/60 border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-300 italic leading-relaxed">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5">
                <div className="font-bold text-white text-base">{item.client}</div>
                <div className="text-xs text-red-400 font-medium">{item.car}</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
