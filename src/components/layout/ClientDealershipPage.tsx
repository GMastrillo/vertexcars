"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Porsche360Hero from "@/components/sections/Porsche360Hero";
import HeroSection from "@/components/sections/HeroSection";
import StyleSelector from "@/components/sections/StyleSelector";
import FeaturedCars from "@/components/sections/FeaturedCars";
import FinanceSimulator from "@/components/sections/FinanceSimulator";
import ShowroomTour from "@/components/sections/ShowroomTour";
import SocialProof from "@/components/sections/SocialProof";
import InventorySection from "@/components/sections/InventorySection";
import TradeInSection from "@/components/sections/TradeInSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/layout/Footer";
import CarDetailModal from "@/components/sections/CarDetailModal";
import { Vehicle } from "@/data/vehicles";

export default function ClientDealershipPage() {
  const [selectedCar, setSelectedCar] = useState<Vehicle | null>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  return (
    <div className="min-h-screen bg-black text-slate-100 selection:bg-red-600 selection:text-white relative">
      <Navbar show={isVideoEnded} />

      <main>
        {/* 1. Premier Hero: 360-degree Scroll-driven Canvas Rotation */}
        <Porsche360Hero onVideoEnded={() => setIsVideoEnded(true)} />

        {/* 2. Interactive Model Switcher (911 GT3 RS, Cayenne Turbo GT, Taycan Turbo S) */}
        <HeroSection />

        {/* 3. Style Selector ("Encontre pelo seu estilo") */}
        <StyleSelector />

        {/* 4. Featured Cars ("Destaques da semana") */}
        <FeaturedCars onSelectCar={(car) => setSelectedCar(car)} />

        {/* 5. Finance Simulator ("Faça as contas antes de decidir") */}
        <FinanceSimulator />

        {/* 6. Showroom Experience ("A loja por dentro") */}
        <ShowroomTour />

        {/* 7. Social Proof ("Quem compra, faz parte da nossa história") */}
        <SocialProof />

        {/* 8. Full Inventory with Dynamic Filters ("Um estoque, várias rotas") */}
        <InventorySection onSelectCar={(car) => setSelectedCar(car)} />

        {/* 9. Trade-In Evaluation ("Tem um carro para dar na troca?") */}
        <TradeInSection />

        {/* 10. FAQ ("Respondemos suas dúvidas") */}
        <FAQSection />
      </main>

      <Footer />

      {/* Car Detail Modal ("Cada número, verificado") */}
      <CarDetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />
    </div>
  );
}
