"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Como funciona a garantia e procedência das unidades Porsche?",
      a: "Todos os nossos veículos passam por uma criteriosa inspeção de 111 pontos conforme as normas da engenharia Porsche. As unidades contam com laudo cautelar Dekra/Super Visão 100% aprovado, sem histórico de leilão ou colisões, além de garantia de procedência jurídica e mecânica.",
    },
    {
      q: "Vocês entregam o veículo em outros estados ou apenas em Minas Gerais?",
      a: "Entregamos em qualquer cidade do Brasil. O transporte é realizado exclusivamente em caminhão prancha fechado (reboque blindado individual com seguro total), garantindo que seu esportivo chegue com 0 km rodados a mais e absolutamente intacto.",
    },
    {
      q: "Posso dar meu carro atual como entrada no negócio?",
      a: "Sim! Aceitamos veículos seminovos de qualquer marca na negociação. Realizamos uma avaliação técnica justa, baseada na cotação real de mercado, e oferecemos inclusive a modalidade 'troca com troco', caso seu veículo atual tenha valor superior à entrada necessária.",
    },
    {
      q: "Quais são as condições de financiamento e bancos parceiros?",
      a: "Trabalhamos com os principais bancos e private bankings do Brasil (Banco Safra, Santander Private, Itaú Personnalité, BV). As taxas partem de 0,99% a 1,19% ao mês com prazos de até 60 meses e aprovação rápida em menos de 2 horas.",
    },
    {
      q: "O processo de compra pode ser feito com sigilo e discrição?",
      a: "Totalmente. Atendemos personalidades, empresários e colecionadores que prezam por discrição absoluta. Temos sala de reunião privativa e todo o trâmite documental é conduzido sob termo de confidencialidade.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#07080a] relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400 uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-red-500" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            Respondemos Suas Dúvidas
          </h2>
          <p className="mt-2 text-zinc-400 text-sm">
            Tudo o que você precisa saber para adquirir seu próximo supercarro com tranquilidade.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-zinc-950/70 border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-white text-sm sm:text-base pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-red-500 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Contact Prompt */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white/5 border border-white/5">
          <p className="text-xs text-zinc-400">
            Ainda tem alguma pergunta específica sobre um modelo ou configuração?
          </p>
          <a
            href="https://wa.me/5534991610075?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20as%20condi%C3%A7%C3%B5es%20da%20Ibiza%20Motors."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-400 uppercase tracking-wider"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Falar com o Gerente Geral no WhatsApp →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
