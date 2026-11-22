export type PlaceCategory = 'pousada' | 'turismo' | 'gastronomia' | 'minas' | 'servicos';

export interface OuroPretoPlace {
  id: string;
  name: string;
  shortName: string;
  category: PlaceCategory;
  address: string;
  lat: number;
  lng: number;
  googleMapsQuery: string;
  note?: string;
}

export const POUSADA_ORIGIN: OuroPretoPlace = {
  id: 'pousada',
  name: 'Pousada Solar das Gerais',
  shortName: 'Pousada (Partida)',
  category: 'pousada',
  address: 'Rua Manuel Cabral, 119 - Centro, Ouro Preto',
  lat: -20.3875306,
  lng: -43.5043173,
  googleMapsQuery: 'Rua Manoel Cabral, 119, Centro, Ouro Preto - MG',
  note: 'Ponto de partida',
};

export const OURO_PRETO_PLACES: OuroPretoPlace[] = [
  {
    id: 'praca-tiradentes',
    name: 'Praça Tiradentes',
    shortName: 'Praça Tiradentes',
    category: 'turismo',
    address: 'Praça Tiradentes - Centro Histórico, Ouro Preto',
    lat: -20.3857717,
    lng: -43.5036246,
    googleMapsQuery: 'Praça Tiradentes, Ouro Preto - MG',
    note: 'Coração do Centro Histórico e Museu da Inconfidência',
  },
  {
    id: 'o-passo-pizza-jazz',
    name: 'Restaurante O Passo Pizza Jazz',
    shortName: 'O Passo Pizza Jazz',
    category: 'gastronomia',
    address: 'Rua São José, 56 - Centro, Ouro Preto',
    lat: -20.3841229,
    lng: -43.5064197,
    googleMapsQuery: 'O Passo Pizza Jazz, Ouro Preto - MG',
    note: 'Pizzaria artesanal e música ao vivo em casarão colonial',
  },
  {
    id: 'feira-pedra-sabao',
    name: 'Feira de Pedra-Sabão',
    shortName: 'Feira Pedra-Sabão',
    category: 'turismo',
    address: 'Largo de Coimbra - Centro, Ouro Preto',
    lat: -20.38672,
    lng: -43.50290,
    googleMapsQuery: 'Feira de Pedra Sabão, Largo de Coimbra, Ouro Preto - MG',
    note: 'Artesanato tradicional em frente à Igreja São Francisco',
  },
  {
    id: 'igreja-sao-francisco',
    name: 'Igreja São Francisco de Assis',
    shortName: 'Igreja São Francisco',
    category: 'turismo',
    address: 'Largo de Coimbra - Centro, Ouro Preto',
    lat: -20.3868686,
    lng: -43.5027836,
    googleMapsQuery: 'Igreja de São Francisco de Assis, Ouro Preto - MG',
    note: 'Obra-prima de Aleijadinho e Mestre Ataíde',
  },
  {
    id: 'rodoviaria',
    name: 'Terminal Rodoviário de Ouro Preto',
    shortName: 'Rodoviária',
    category: 'servicos',
    address: 'Rua Padre Rolim, 661 - Centro, Ouro Preto',
    lat: -20.3808140,
    lng: -43.5075352,
    googleMapsQuery: 'Terminal Rodoviário de Ouro Preto - MG',
    note: 'Embarque e desembarque rodoviário',
  },
  {
    id: 'igreja-do-pilar',
    name: 'Igreja Matriz de N. Sra. do Pilar',
    shortName: 'Igreja do Pilar',
    category: 'turismo',
    address: 'Praça Monsenhor Castilho Barbosa - Pilar, Ouro Preto',
    lat: -20.3868024,
    lng: -43.5075059,
    googleMapsQuery: 'Basílica de Nossa Senhora do Pilar, Ouro Preto - MG',
    note: 'Segunda igreja mais rica em ouro do Brasil',
  },
  {
    id: 'mina-central',
    name: 'Mina Central',
    shortName: 'Mina Central',
    category: 'minas',
    address: 'Rua dos Paulistas, 295 - Antônio Dias, Ouro Preto',
    lat: -20.3844891,
    lng: -43.5024196,
    googleMapsQuery: 'Mina Central, Rua dos Paulistas, 295, Ouro Preto - MG',
    note: 'Mina histórica de ouro aberta para visitação guiada',
  },
  {
    id: 'mina-chico-rei',
    name: 'Mina do Chico Rei',
    shortName: 'Mina do Chico Rei',
    category: 'minas',
    address: 'Rua Dom Silvério, 108 - Antônio Dias, Ouro Preto',
    lat: -20.3859044,
    lng: -43.4993567,
    googleMapsQuery: 'Mina do Chico Rei, Ouro Preto - MG',
    note: 'Antiga mina colonial ligada à história de Chico Rei',
  },
  {
    id: 'restaurante-ouro-preto',
    name: 'Restaurante Ouro Preto',
    shortName: 'Rest. Ouro Preto',
    category: 'gastronomia',
    address: 'Rua Conde de Bobadela (Rua Direita) - Centro, Ouro Preto',
    lat: -20.38555,
    lng: -43.50425,
    googleMapsQuery: 'Restaurante Ouro Preto, Centro, Ouro Preto - MG',
    note: 'Comida típica mineira no Centro Histórico',
  },
  {
    id: 'casa-da-opera',
    name: 'Casa da Ópera (Teatro Municipal)',
    shortName: 'Casa da Ópera',
    category: 'turismo',
    address: 'Rua Brigadeiro Musqueira, 104 - Centro, Ouro Preto',
    lat: -20.3857319,
    lng: -43.5049555,
    googleMapsQuery: 'Casa da Ópera, Ouro Preto - MG',
    note: 'Teatro mais antigo em funcionamento das Américas',
  },
  {
    id: 'estrela-da-barra',
    name: 'Supermercado Estrela da Barra',
    shortName: 'Estrela da Barra',
    category: 'servicos',
    address: 'Rua dos Inconfidentes, 268 - Barra, Ouro Preto',
    lat: -20.3906666,
    lng: -43.5034785,
    googleMapsQuery: 'Supermercado Estrela da Barra, Ouro Preto - MG',
    note: 'Mercado e padaria próximos à pousada',
  },
  {
    id: 'centro-convencoes',
    name: 'Centro de Convenções da UFOP',
    shortName: 'Centro de Convenções',
    category: 'servicos',
    address: 'Rua Diogo de Vasconcelos, 328 - Pilar, Ouro Preto',
    lat: -20.3892064,
    lng: -43.5068831,
    googleMapsQuery: 'Centro de Convenções UFOP, Ouro Preto - MG',
    note: 'Parque Metalúrgico Augusto Barbosa',
  },
];

export const ALL_PLACES: OuroPretoPlace[] = [POUSADA_ORIGIN, ...OURO_PRETO_PLACES];

/** Haversine distance in meters between two coordinates */
export function haversineMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Estimate walking minutes in Ouro Preto's historic hills (~65m/min) */
export function estimateWalkMinutes(meters: number): number {
  return Math.max(1, Math.round(meters / 65));
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(2).replace('.', ',')} km`;
}
