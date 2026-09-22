import type { Metadata } from "next";
import ClientDealershipPage from "@/components/layout/ClientDealershipPage";

export const metadata: Metadata = {
  title: "VertexCars | Especialista em Superesportivos & Alta Performance",
  description:
    "A maior referência em superesportivos e modelos de alta performance. Showroom exclusivo, procedência certificada, laudo cautelar 100% e entrega em todo o Brasil.",
  keywords: [
    "VertexCars",
    "Porsche",
    "911 GT3 RS",
    "Cayenne",
    "Taycan",
    "Superesportivos",
    "Concessionária Premium",
  ],
  openGraph: {
    title: "VertexCars — Curadoria de Alta Performance",
    description: "Seu próximo carro de alta performance já está em movimento. Conheça nosso estoque exclusivo.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function HomePage() {
  return <ClientDealershipPage />;
}
