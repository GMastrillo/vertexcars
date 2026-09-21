"use client";

import { useState } from "react";
import { ArrowLeftRight, MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function TradeInSection() {
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [km, setKm] = useState("");
  const [phone, setPhone] = useState("");

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Ol%C3%A1%2C%20gostaria%20de%20uma%20avalia%C3%A7%C3%A3o%20do%20meu%20ve%C3%ADculo%20na%20troca%3A%0A%0A%E2%80%A2%20Modelo%3A%20${encodeURIComponent(
      model || "N/A"
    )}%0A%E2%80%A2%20Ano%3A%20${encodeURIComponent(
      year || "N/A"
    )}%0A%E2%80%A2%20Quilometragem%3A%20${encodeURIComponent(
      km || "N/A"
    )}%0A%E2%80%A2%20Contato%3A%20${encodeURIComponent(phone || "N/A")}`;

    window.open(`https://wa.me/5534991610075?text=${text}`, "_blank");
  };

  return (
    <section id="troca" className="py-24 bg-[#090b0e] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-white/10 p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-xs text-red-400 uppercase tracking-widest">
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>Avaliação Justa & Transparente</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                Tem Um Carro Para Dar Na Troca?
              </h2>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Utilize seu veículo seminovo de qualquer marca como parte de pagamento da sua nova Porsche. Pagamento facilitado, quitação de financiamento e melhor valor de mercado garantido.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Avaliação técnica presencial ou remota por fotos e laudo",
                  "Troca com troco disponível (receba dinheiro de volta)",
                  "Quitamos o saldo devedor do seu veículo atual",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Fast Evaluation Form */}
            <div className="lg:col-span-6 bg-black/60 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-1">
                Simule a Avaliação do Seu Usado
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Preencha os dados e receba uma estimativa preliminar em poucos minutos.
              </p>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-zinc-300 block mb-1">
                    Marca e Modelo do seu Carro
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: BMW M3, Audi RS6, Hilux SRX..."
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-zinc-300 block mb-1">
                      Ano / Modelo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 2022/2023"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-zinc-300 block mb-1">
                      Quilometragem
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 25.000 km"
                      value={km}
                      onChange={(e) => setKm(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-zinc-300 block mb-1">
                    Seu WhatsApp para Contato
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(DDD) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-red-600/30 hover:scale-[1.01]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar Dados Para Avaliação Imediata</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
