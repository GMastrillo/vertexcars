"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Filter, Eye, MessageSquare, Search, SlidersHorizontal, Calendar, Gauge, ArrowUpDown } from "lucide-react";
import { VEHICLES, Vehicle } from "@/data/vehicles";
import { formatCurrencyBRL, formatNumberBR } from "@/lib/utils";

interface InventorySectionProps {
  onSelectCar: (car: Vehicle) => void;
}

export default function InventorySection({ onSelectCar }: InventorySectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [maxPrice, setMaxPrice] = useState<number>(3000000);
  const [fuelFilter, setFuelFilter] = useState<string>("todos");
  const [sortBy, setSortBy] = useState<"price-desc" | "price-asc" | "year-desc">("price-desc");

  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((car) => {
      const matchesSearch =
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === "todos" || car.category === selectedCategory;
      const matchesPrice = car.price <= maxPrice;
      const matchesFuel =
        fuelFilter === "todos" ||
        (fuelFilter === "eletrico" && car.fuel.includes("Elétrico")) ||
        (fuelFilter === "gasolina" && car.fuel.includes("Gasolina"));

      return matchesSearch && matchesCat && matchesPrice && matchesFuel;
    }).sort((a, b) => {
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "year-desc") return b.year - a.year;
      return 0;
    });
  }, [searchTerm, selectedCategory, maxPrice, fuelFilter, sortBy]);

  return (
    <section id="estoque" className="py-24 bg-[#07080a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-red-500 font-semibold block mb-2">
              Catálogo Completo
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Um Estoque, Várias Rotas
            </h2>
            <p className="mt-2 text-zinc-400 text-sm max-w-xl">
              Filtre por categoria, valores e motorização para encontrar a Porsche configurada sob medida para seu perfil.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400 bg-white/5 border border-white/10 px-4 py-2 rounded-xl self-start md:self-auto">
            <span>Mostrando {filteredVehicles.length} de {VEHICLES.length} unidades</span>
          </div>
        </div>

        {/* Layout with Filters on Left and Grid on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Filters (Identical to video 00:48!) */}
          <div className="lg:col-span-4 bg-zinc-950/80 border border-white/10 rounded-3xl p-6 space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div className="flex items-center gap-2 font-bold text-white text-sm uppercase">
                <SlidersHorizontal className="w-4 h-4 text-red-500" />
                <span>Filtrar Inventário</span>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory("todos");
                  setMaxPrice(3000000);
                  setFuelFilter("todos");
                  setSearchTerm("");
                }}
                className="text-[11px] text-zinc-400 hover:text-white underline"
              >
                Limpar
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar modelo (ex: GT3, Turbo)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider block mb-2">
                Categoria
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "todos", label: "Todas" },
                  { id: "esportivos", label: "Esportivos" },
                  { id: "suvs", label: "SUVs" },
                  { id: "sedas", label: "Sedãs" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                      selectedCategory === cat.id
                        ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                        : "bg-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-[11px] uppercase font-bold text-zinc-400">Preço Máximo</span>
                <span className="font-bold text-white">{formatCurrencyBRL(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="600000"
                max="3000000"
                step="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-red-600 h-1.5 bg-zinc-800 rounded-lg"
              />
            </div>

            {/* Motorização / Combustível */}
            <div>
              <label className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider block mb-2">
                Propulsão
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "todos", label: "Todos" },
                  { id: "gasolina", label: "Combustão" },
                  { id: "eletrico", label: "Elétrico" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFuelFilter(f.id)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all ${
                      fuelFilter === f.id
                        ? "bg-white text-black font-bold"
                        : "bg-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Order By */}
            <div>
              <label className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider block mb-2">
                Ordenar Por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-zinc-900 border border-white/10 text-zinc-300 text-xs rounded-xl p-2.5 focus:outline-none focus:border-red-500"
              >
                <option value="price-desc">Maior Valor</option>
                <option value="price-asc">Menor Valor</option>
                <option value="year-desc">Mais Recentes</option>
              </select>
            </div>
          </div>

          {/* Right Inventory Grid */}
          <div className="lg:col-span-8">
            {filteredVehicles.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-zinc-950/40 border border-white/5">
                <p className="text-zinc-400 text-sm">Nenhum veículo encontrado com os filtros selecionados.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("todos");
                    setMaxPrice(3000000);
                    setFuelFilter("todos");
                    setSearchTerm("");
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold"
                >
                  Restaurar Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVehicles.map((car) => (
                  <div
                    key={car.id}
                    className="group rounded-3xl bg-zinc-950/70 border border-white/10 hover:border-red-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl"
                  >
                    <div>
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-black/70 backdrop-blur-md text-white border border-white/10">
                          {car.badge}
                        </span>
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-600 text-white uppercase">
                          {car.power}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h4 className="text-lg font-black text-white group-hover:text-red-400 transition-colors">
                          {car.name}
                        </h4>

                        <div className="flex items-center gap-3 mt-3 text-xs text-zinc-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-zinc-500" />
                            {car.year}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Gauge className="w-3 h-3 text-zinc-500" />
                            {formatNumberBR(car.mileage)} km
                          </span>
                          <span>•</span>
                          <span>{car.transmission.split(" ")[0]}</span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5 flex items-baseline justify-between">
                          <span className="text-xl font-black text-white">
                            {formatCurrencyBRL(car.price)}
                          </span>
                          <span className="text-[11px] text-emerald-400 font-medium">
                            {car.acceleration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectCar(car)}
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/10 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ficha Técnica</span>
                      </button>
                      <a
                        href={`https://wa.me/5511999990000?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20${encodeURIComponent(
                          car.name
                        )}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-red-600/20"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
