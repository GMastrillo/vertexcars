"use client";

import { useState, useEffect } from "react";
import { MessageSquare, PhoneCall, ShieldCheck, Menu, X, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Estoque Porsche", href: "#estoque" },
    { label: "Categorias", href: "#estilos" },
    { label: "Financiamento", href: "#simulador" },
    { label: "A Loja", href: "#showroom" },
    { label: "Entregas VIP", href: "#entregas" },
    { label: "Avaliação", href: "#troca" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8",
        isScrolled ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl" : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-950 flex items-center justify-center border border-red-500/30 shadow-lg group-hover:scale-105 transition-transform">
            <span className="font-serif font-black text-white text-lg tracking-tighter">P</span>
          </div>
          <div>
            <span className="font-bold text-lg tracking-widest text-white uppercase block leading-tight">
              IBIZA <span className="text-red-500 font-light">MOTORS</span>
            </span>
            <span className="text-[10px] text-zinc-400 tracking-wider uppercase block">
              Especialista Porsche • Patos de Minas
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-300 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Actions & WhatsApp CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-400 pr-2 border-r border-white/10">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Porsche Approved</span>
          </div>
          <a
            href="https://wa.me/5534991610075?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20ve%C3%ADculos%20Porsche%20em%20estoque."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white transition-all shadow-lg hover:shadow-red-600/30 transform hover:-translate-y-0.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp VIP</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Abrir Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-5 rounded-2xl bg-zinc-950/95 border border-white/10 backdrop-blur-2xl space-y-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-zinc-300 hover:text-white py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="https://wa.me/5534991610075?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20ve%C3%ADculos%20Porsche%20em%20estoque."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-600 text-white font-semibold text-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Atendimento via WhatsApp</span>
          </a>
        </div>
      )}
    </header>
  );
}
