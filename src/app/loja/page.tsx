'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Sparkles, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { LodgeInfo } from '@/types/lodge-info';

export default function LojaPage() {
  const firestore = useFirestore();
  const lodgeInfoRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'lodge_info', 'main') : null),
    [firestore]
  );
  const { data: lodgeInfo } = useDoc<LodgeInfo>(lodgeInfoRef);
  const whatsappNumber = lodgeInfo?.whatsappNumber || '31992580325';
  const cleanWhatsappNumber = whatsappNumber.replace(/\D/g, '');

  const products = [
    {
      name: "Doce de Leite Viçosa / São Lourenço",
      category: "Doces Artesanais",
      price: "R$ 38,00",
      description: "O mais premiado e tradicional doce de leite de Minas Gerais, cremoso e suave.",
    },
    {
      name: "Queijo Minas Artesanal da Canastra",
      category: "Queijos Típicos",
      price: "R$ 65,00",
      description: "Peça inteira maturada artesanalmente com sabor marcante e casca dourada.",
    },
    {
      name: "Cachaça Nobre de Minas Ouro Preto",
      category: "Bebidas Selecionadas",
      price: "R$ 78,00",
      description: "Envelhecida em tonéis de bálsamo e carvalho nas montanhas históricas.",
    },
    {
      name: "Escultura em Pedra-Sabão",
      category: "Artesanato Local",
      price: "R$ 45,00",
      description: "Peça entalhada à mão por mestres artesãos do distrito de Santa Rita de Ouro Preto.",
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
            Lembranças & Sabores
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-headline text-solar-navy mb-2">
            Lojinha Solar das Gerais
          </h1>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Leve um pedacinho de Ouro Preto e da gastronomia mineira para casa. Disponível na recepção da pousada.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {products.map((item, index) => (
            <Card
              key={index}
              className="bg-white rounded-2xl border border-[#113F52] shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-solar-navy bg-solar-navy/10 border border-[#113F52] px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-base font-extrabold text-solar-navy">
                    {item.price}
                  </span>
                </div>
                <h3 className="font-headline font-bold text-lg text-solar-navy mb-2">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.description}
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full rounded-xl border border-[#113F52] text-solar-navy hover:bg-solar-navy hover:text-white transition-all gap-1.5"
                >
                  <a
                    href={`https://wa.me/55${cleanWhatsappNumber}?text=${encodeURIComponent(`Olá! Gostaria de reservar o item: ${item.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={15} />
                    Consultar na Recepção
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
