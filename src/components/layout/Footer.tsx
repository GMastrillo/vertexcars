import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="py-1">
              <span className="font-display text-xl tracking-[0.25em] text-white uppercase select-none flex items-center">
                <span className="font-bold text-white">VERTEX</span>
                <span className="font-light text-neutral-400 ml-2">CARS</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Referência nacional em curadoria, compra e venda de veículos superesportivos e modelos de alta performance. Tradição, solidez e paixão pelo automobilismo.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantia de Procedência Certificada</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">Navegação</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#estoque" className="hover:text-white transition-colors">Estoque Completo</a></li>
              <li><a href="#estilos" className="hover:text-white transition-colors">Categorias de Veículos</a></li>
              <li><a href="#destaques" className="hover:text-white transition-colors">Destaques da Semana</a></li>
              <li><a href="#simulador" className="hover:text-white transition-colors">Simulador de Financiamento</a></li>
              <li><a href="#showroom" className="hover:text-white transition-colors">Nosso Showroom VIP</a></li>
              <li><a href="#troca" className="hover:text-white transition-colors">Avaliação de Usado na Troca</a></li>
            </ul>
          </div>

          {/* Col 3: Location & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">Unidade & Atendimento</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Av. Europa, 1500 - Jardins, São Paulo / SP • CEP 01449-000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Seg a Sex: 08h às 19h | Sáb: 09h às 16h</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>(11) 3198-5000</span>
              </div>
            </div>
          </div>

          {/* Col 4: WhatsApp Direct & Social */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">Atendimento VIP</h4>
            <p className="text-xs text-zinc-400 font-light">
              Converse diretamente com nosso consultor especialista para reservas ou agendamento de test-drive.
            </p>
            <a
              href="https://wa.me/5511999990000?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20com%20um%20consultor%20da%20VertexCars."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-red-600/30 font-display"
            >
              <MessageSquare className="w-4 h-4" />
              <span>(11) 99999-0000</span>
            </a>
            <div className="flex items-center gap-3 pt-1 text-zinc-400">
              <a
                href="https://instagram.com/vertexcars"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@vertexcars</span>
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} VertexCars Ltda. Todos os direitos reservados. CNPJ: 12.345.678/0001-90.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Conformidade LGPD</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
