"use client";

import { useState, useEffect } from "react";
import { MessageSquare, ShieldCheck, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  show?: boolean;
}

export default function Navbar({ show = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Revealed if triggered by video end OR user scrolled down
  const isRevealed = show || isScrolled;

  const navLinks = [
    { label: "Estoque", href: "#estoque" },
    { label: "Categorias", href: "#estilos" },
    { label: "Financiamento", href: "#simulador" },
    { label: "O Showroom", href: "#showroom" },
    { label: "Entregas VIP", href: "#entregas" },
    { label: "Avaliação", href: "#troca" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 lg:px-12 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isRevealed
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-6 pointer-events-none",
        isScrolled
          ? "py-3.5 bg-black/85 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
          : "py-6 bg-transparent"
      )}
    >
      <div className="w-full flex items-center justify-between gap-8">
        {/* Typographic Minimalist Brand Logo - Fixed to the far left */}
        <div className="flex items-center justify-start flex-shrink-0">
          <a href="#" className="flex items-center group py-1" aria-label="VertexCars Home">
            <span className="font-display text-xl sm:text-2xl uppercase select-none flex items-center">
              <span className="font-bold text-white tracking-[0.25em]">VERTEX</span>
              <span className="font-light text-neutral-400 tracking-[0.25em] ml-2">CARS</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation Links - Centered */}
        <nav className="hidden md:flex items-center justify-center gap-7 lg:gap-9 text-xs font-medium tracking-[0.18em] uppercase text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors py-1 relative group font-display whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-red-600 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Actions & WhatsApp CTA - Fixed to the far right */}
        <div className="hidden lg:flex items-center justify-end gap-5 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-neutral-400 pr-3 border-r border-white/10 font-light">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Curadoria Certificada</span>
          </div>
          <a
            href="https://wa.me/5511999990000?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20ve%C3%ADculos%20em%20estoque%20na%20VertexCars."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] bg-red-600 hover:bg-red-500 text-white transition-all shadow-lg hover:shadow-red-600/30 transform hover:-translate-y-0.5 font-display whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp VIP</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Abrir Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-5 rounded-2xl bg-black/95 border border-white/10 backdrop-blur-2xl space-y-4">
          <nav className="flex flex-col gap-3 font-display">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-neutral-300 hover:text-white py-2 border-b border-white/5 uppercase tracking-[0.2em]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="https://wa.me/5511999990000?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20ve%C3%ADculos%20em%20estoque%20na%20VertexCars."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-[0.2em] font-display"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Atendimento via WhatsApp</span>
          </a>
        </div>
      )}
    </header>
  );
}
