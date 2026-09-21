import type { Metadata } from "next";
import ClientDealershipPage from "@/components/layout/ClientDealershipPage";

export const metadata: Metadata = {
  title: "Ibiza Motors | Especialista Porsche & Veículos de Alta Performance",
  description:
    "A maior referência em superesportivos e modelos Porsche de Minas Gerais. Showroom exclusivo em Patos de Minas, procedência certificada, laudo cautelar 100% e entrega em todo o Brasil.",
  keywords: [
    "Porsche",
    "911 GT3 RS",
    "Cayenne",
    "Taycan",
    "Superesportivos",
    "Patos de Minas",
    "Ibiza Veículos",
    "Concessionária Premium",
  ],
  openGraph: {
    title: "Ibiza Motors — Concessionária Especialista Porsche",
    description: "Seu próximo carro de alta performance já está em movimento. Conheça nosso estoque exclusivo.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function HomePage() {
  return <ClientDealershipPage />;
}
