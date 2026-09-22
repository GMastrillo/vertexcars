export interface Vehicle {
  id: string;
  name: string;
  badge: string;
  category: "esportivos" | "suvs" | "sedas";
  price: number;
  year: number;
  mileage: number;
  transmission: string;
  power: string;
  acceleration: string;
  fuel: string;
  image: string;
  colorName: string;
  featured: boolean;
  tags: string[];
  description: string;
  highlights: string[];
  equipment: string[];
}

export const VEHICLES: Vehicle[] = [
  {
    id: "porsche-911-gt3-rs",
    name: "Porsche 911 GT3 RS",
    badge: "Disponível a Pronta Entrega",
    category: "esportivos",
    price: 2490000,
    year: 2024,
    mileage: 1200,
    transmission: "PDK 7 Velocidades",
    power: "525 cv",
    acceleration: "0-100 em 3,2s",
    fuel: "Gasolina Premium",
    image: "/images/porsche_hero_dark.jpg",
    colorName: "Preto Glossy / Carbono Weissach",
    featured: true,
    tags: ["Porsche Approved", "Pacote Weissach", "Laudo 100% Aprovado", "Garantia de Fábrica"],
    description: "A expressão máxima da engenharia de pista homologada para as ruas. Unidade configurada com Pacote Weissach em fibra de carbono aparente, gaiola em titânio e freios PCCB em cerâmica.",
    highlights: [
      "Motor Boxer 4.0L Aspirado de 9.000 RPM",
      "Asa traseira ativa com tecnologia DRS (Drag Reduction System)",
      "Freios Porsche Ceramic Composite Brake (PCCB)",
      "Rodas forjadas de 20\"/21\" com travamento central",
    ],
    equipment: [
      "Pacote Clubsport com extintor de incêndio",
      "Interior em Alcântara preta com costuras em contraste Guards Red",
      "Sistema de som BOSE® Surround",
      "Porsche Dynamic Light System Plus (PDLS Plus) com Matrix LED",
      "Elevação pneumática do eixo dianteiro (Front Axle Lift)",
    ],
  },
  {
    id: "porsche-cayenne-turbo-gt",
    name: "Porsche Cayenne Turbo GT Coupé",
    badge: "Showroom Jardins • SP",
    category: "suvs",
    price: 1390000,
    year: 2024,
    mileage: 6400,
    transmission: "Tiptronic S 8 Velocidades",
    power: "659 cv",
    acceleration: "0-100 em 3,3s",
    fuel: "Gasolina V8 Biturbo",
    image: "/images/porsche_cayenne.jpg",
    colorName: "Cinza Vulcano Metálico",
    featured: true,
    tags: ["Único Dono", "Blindagem Nível III-A", "Revisado na Autorizada"],
    description: "O SUV mais rápido de Nürburgring. Uma combinação brutal de espaço para 4 passageiros e desempenho de supercarro com motor V8 4.0 Biturbo.",
    highlights: [
      "Motor V8 4.0 Biturbo de 659 cv e 850 Nm de torque",
      "Escapamento esportivo central em titânio",
      "Teto e difusores aerodinâmicos em fibra de carbono",
      "Suspensão pneumática adaptativa PASM com 3 câmaras",
    ],
    equipment: [
      "Pacote Interior GT com acabamento em Alcantara e Neodyme",
      "Sistema de som Burmester® 3D High-End Surround",
      "Porsche InnoDrive com controle de cruzeiro adaptativo",
      "Head-up Display e Visão Noturna (Night Vision)",
      "Portas com fechamento suave (Soft Close)",
    ],
  },
  {
    id: "porsche-taycan-turbo-s",
    name: "Porsche Taycan Turbo S",
    badge: "100% Elétrico • 761 cv",
    category: "sedas",
    price: 980000,
    year: 2023,
    mileage: 9800,
    transmission: "Transmissão 2 Velocidades",
    power: "761 cv (Overboost)",
    acceleration: "0-100 em 2,8s",
    fuel: "100% Elétrico (Autonomia 450 km)",
    image: "/images/porsche_taycan.jpg",
    colorName: "Branco Carrara / Azul Frozen",
    featured: true,
    tags: ["IPVA Pago", "Wallbox Inclusa", "Bateria 98% Saúde"],
    description: "Aceleração instantânea com 1.050 Nm de torque imediato. Design escultural com tecnologia de ponta e recarga ultrarrápida de 800V.",
    highlights: [
      "0 a 100 km/h em impressionantes 2,8 segundos",
      "Arquitetura de bateria de 800V com recarga de 5% a 80% em 22 min",
      "Eixo traseiro esterçante com direção assistida Plus",
      "Porsche Electric Sport Sound com acústica desenvolvida em túnel",
    ],
    equipment: [
      "Display dianteiro de passageiro de 10,9\"",
      "Teto solar panorâmico com controle eletrônico de luz (Variable Light Control)",
      "Assentos esportivos adaptativos com 18 vias e memória",
      "Câmeras 360° Surround View com assistente de manobra",
    ],
  },
  {
    id: "porsche-macan-gts",
    name: "Porsche Macan GTS",
    badge: "Oportunidade da Semana",
    category: "suvs",
    price: 689000,
    year: 2023,
    mileage: 18500,
    transmission: "PDK 7 Velocidades",
    power: "440 cv",
    acceleration: "0-100 em 4,3s",
    fuel: "Gasolina V6 Biturbo",
    image: "/images/porsche_macan.jpg",
    colorName: "Azul Gentian Metálico",
    featured: true,
    tags: ["Garantia Estendida", "Manual e Chave Reserva", "Pneus Novos Michelin"],
    description: "Dinâmica esportiva impecável com a praticidade de um SUV para o dia a dia. Altamente equipado com pacote Sport Chrono e interior exclusivo GTS.",
    highlights: [
      "Motor 2.9L V6 Biturbo de 440 cv",
      "Pacote Sport Chrono com seletor de modos no volante",
      "Rodas RS Spyder Design de 21 polegadas em preto acetinado",
      "Tração integral ativa Porsche Traction Management (PTM)",
    ],
    equipment: [
      "Pacote GTS Sport com costuras em vermelho Carmine",
      "Escape esportivo ativo com ponteiras duplas pretas",
      "Faróis Matrix LED em preto com PDLS Plus",
      "Sistema de gerenciamento de suspensão Porsche Active Suspension (PASM)",
    ],
  },
  {
    id: "porsche-panamera-gts",
    name: "Porsche Panamera GTS",
    badge: "Showroom Jardins • SP",
    category: "sedas",
    price: 1150000,
    year: 2023,
    mileage: 14200,
    transmission: "PDK 8 Velocidades",
    power: "480 cv",
    acceleration: "0-100 em 3,9s",
    fuel: "Gasolina V8 Biturbo",
    image: "/images/porsche_panamera.jpg",
    colorName: "Chalk / Crayon com Pacote Black",
    featured: false,
    tags: ["Seminovo Certificado", "Laudo Cautelar Aprovado", "IPVA 2026 Quitado"],
    description: "Gran Turismo com DNA puro de pista e conforto de primeira classe. O melhor dos dois mundos para viagens de longa distância com autoridade.",
    highlights: [
      "Motor V8 4.0 Biturbo com som encorpado e esportivo",
      "Spoiler traseiro adaptativo extensível em 4 estágios",
      "Bancos traseiros individuais estilo poltrona executiva",
      "Chassi dinâmico Porsche Dynamic Chassis Control Sport (PDCC Sport)",
    ],
    equipment: [
      "Pacote de acabamento interior em alumínio escovado anodizado preto",
      "Sistema de som Burmester® 3D High-End",
      "Controle de ar condicionado de 4 zonas com ionizador",
      "Teto solar panorâmico duplo em cristal escurecido",
    ],
  },
];
