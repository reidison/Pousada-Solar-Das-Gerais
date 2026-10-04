
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Compass, Landmark, Mountain, Church, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function CityTourPage() {
  const tours = [
    {
      title: "Igreja de São Francisco de Assis & Feira de Pedra-Sabão",
      distance: "800m da Pousada",
      description: "Obra-prima do barroco brasileiro com esculturas e relevos de Aleijadinho e teto pintado por Mestre Ataíde. Logo em frente, confira a tradicional feirinha de artesanato.",
      badge: "Imperdível",
      icon: <Church className="w-5 h-5 text-solar-navy" />,
    },
    {
      title: "Praça Tiradentes & Museu da Inconfidência",
      distance: "1,2 km da Pousada",
      description: "O coração histórico de Ouro Preto, cercado pelo Museu da Inconfidência e pelo Museu de Ciência e Técnica da Escola de Minas.",
      badge: "Histórico",
      icon: <Landmark className="w-5 h-5 text-solar-navy" />,
    },
    {
      title: "Mina da Passagem (Mariana / Ouro Preto)",
      distance: "5 km da Pousada",
      description: "A maior mina de ouro aberta à visitação do mundo. Desça nos trilhos históricos até as galerias subterrâneas e o lago cristalino.",
      badge: "Aventura",
      icon: <Compass className="w-5 h-5 text-amber-700" />,
    },
    {
      title: "Mirante do Morro São Sebastião",
      distance: "1,5 km da Pousada",
      description: "Vista panorâmica 360° de toda a cidade histórica, casarios coloniais, igrejas e o imponente Pico do Itacolomi ao fundo.",
      badge: "Foto Perfeita",
      icon: <Mountain className="w-5 h-5 text-sky-700" />,
    },
  ];

  return (
    <div className="bg-solar-cream text-solar-navy min-h-screen flex flex-col font-body">
      <Header />

      <main className="container mx-auto flex-grow px-4 sm:px-6 pt-28 md:pt-32 pb-12 max-w-4xl">
        <header className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-solar-navy hover:text-solar-navyLight transition-colors bg-white px-3.5 py-1.5 rounded-xl border border-solar-navy/10 shadow-xs"
          >
            <ArrowLeft size={16} className="mr-1.5" />
            Voltar para o Início
          </Link>
        </header>

        <div className="text-center mb-10">
          <span className="inline-block bg-solar-gold/25 border border-solar-gold/40 text-solar-navy px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            Roteiros Coloniais
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-headline text-solar-navy mb-2">
            City Tour em Ouro Preto
          </h1>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Recomendações exclusivas da equipe da <strong className="text-solar-navy">Pousada Solar das Gerais</strong> para você explorar os principais pontos históricos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tours.map((tour, index) => (
            <Card
              key={index}
              className="bg-white rounded-2xl border border-[#113F52] shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-solar-cream border border-[#113F52] flex items-center justify-center">
                    {tour.icon}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-solar-gold/30 border border-[#113F52] text-solar-navy px-2.5 py-0.5 rounded-full">
                    {tour.badge}
                  </span>
                </div>
                <h3 className="font-headline font-bold text-lg text-solar-navy mb-1 leading-snug">
                  {tour.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-solar-navy font-semibold mb-3">
                  <MapPin size={13} />
                  <span>{tour.distance}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {tour.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
