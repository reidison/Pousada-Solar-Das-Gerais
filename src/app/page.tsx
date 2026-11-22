'use client';

import React from 'react';
import { HeroHeader } from '@/components/hero-header';
import { Footer } from '@/components/footer';
import { FeatureCard } from '@/components/feature-card';
import { Button } from '@/components/ui/button';
import {
  Coffee,
  Wifi,
  Map,
  Phone,
  GlassWater,
  PhoneCall,
  BookText,
} from 'lucide-react';
import { UsefulServicesModal } from '@/components/useful-services-modal';
import { MinibarModal } from '@/components/minibar-modal';
import { RegulationModal } from '@/components/regulation-modal';
import { WhatsappIcon } from '@/components/icons/whatsapp-icon';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { LodgeInfo } from '@/types/lodge-info';
import { useLanguage } from '@/contexts/language-context';
import Link from 'next/link';

export default function Page() {
  const firestore = useFirestore();
  const { translations } = useLanguage();

  const lodgeInfoRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'lodge_info', 'main') : null),
    [firestore]
  );
  const { data: lodgeInfo } = useDoc<LodgeInfo>(lodgeInfoRef);

  const whatsappNumber = lodgeInfo?.whatsappNumber || '31992580325';
  const cleanWhatsappNumber = whatsappNumber.replace(/\D/g, '');

  return (
    <div className="bg-[#FAF9F5] text-slate-800 flex min-h-screen flex-col font-body selection:bg-amber-100 selection:text-amber-900">
      {/* Hero / Header with Logo, Welcome message, Language selector, and Ouro Preto photo */}
      <HeroHeader />

      {/* Main Content Area: 3x3 Cards Grid matching layout */}
      <main className="container mx-auto px-4 max-w-6xl flex-grow pt-4 sm:pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-4">
          {/* Card 1: Café da Manhã */}
          <FeatureCard
            icon={<Coffee size={24} />}
            title={translations.infoCards.breakfast.title}
            theme="gold"
          >
            <div className="space-y-1.5 py-1">
              <p className="font-semibold text-slate-800">
                {lodgeInfo?.breakfastHours || translations.infoCards.breakfast.line1}
              </p>
              <p className="text-slate-500">
                {lodgeInfo?.breakfastLocation || translations.infoCards.breakfast.line2}
              </p>
            </div>
          </FeatureCard>

          {/* Card 2: Wi-Fi */}
          <FeatureCard
            icon={<Wifi size={24} />}
            title={translations.infoCards.wifi.title}
            theme="green"
          >
            <div className="space-y-1.5 py-1">
              <p className="text-slate-600">
                {translations.infoCards.wifi.line1}{' '}
                <strong className="text-slate-900 font-semibold">
                  {lodgeInfo?.wifiName || translations.infoCards.wifi.networkName}
                </strong>
              </p>
              <p className="text-slate-600">
                {translations.infoCards.wifi.line2}{' '}
                <strong className="text-slate-900 font-semibold">
                  {lodgeInfo?.wifiPassword || translations.infoCards.wifi.password}
                </strong>
              </p>
            </div>
          </FeatureCard>

          {/* Card 3: City Tour */}
          <FeatureCard
            icon={<Map size={24} />}
            title={translations.infoCards.cityTour.title}
            theme="blue"
            action={
              <Button asChild variant="outline" size="sm" className="w-full text-xs font-semibold border-sky-300 text-sky-900 hover:bg-sky-50 transition-colors whitespace-nowrap">
                <Link href="/city-tour">
                  {translations.infoCards.cityTour.button}
                </Link>
              </Button>
            }
          >
            <div className="space-y-2">
              <p className="text-slate-600">
                {translations.infoCards.cityTour.description}
              </p>
              <p className="text-xs font-medium text-[#11314C] tabular-nums">
                {translations.infoCards.cityTour.meta}
              </p>
            </div>
          </FeatureCard>

          {/* Card 5: Recepção */}
          <FeatureCard
            icon={<Phone size={24} />}
            title={translations.infoCards.reception.title}
            theme="gold"
            action={
              <Button asChild size="sm" className="w-full text-xs font-semibold bg-[#25D366] hover:bg-[#1faa4f] text-white shadow-xs transition-colors">
                <a href={`https://wa.me/55${cleanWhatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  <WhatsappIcon className="mr-1.5 h-4 w-4" />
                  {translations.infoCards.reception.button}
                </a>
              </Button>
            }
          >
            <p className="text-slate-600">
              {translations.infoCards.reception.line1}
            </p>
          </FeatureCard>

          {/* Card 6: Frigobar */}
          <FeatureCard
            icon={<GlassWater size={24} />}
            title={translations.infoCards.minibar.title}
            theme="blue"
            action={<MinibarModal />}
          >
            <p className="text-slate-600">
              Consulte a lista completa de bebidas, lanches e petiscos disponíveis no frigobar com valores atualizados.
            </p>
          </FeatureCard>

          {/* Card 7: Telefones úteis */}
          <FeatureCard
            icon={<PhoneCall size={24} />}
            title={translations.infoCards.usefulPhones.title}
            theme="blue"
            action={<UsefulServicesModal />}
          >
            <p className="text-slate-600">
              Contatos de emergência, hospitais, táxis, farmácias e serviços essenciais em Ouro Preto.
            </p>
          </FeatureCard>

          {/* Card 8: Regulamento */}
          <FeatureCard
            icon={<BookText size={24} />}
            title={translations.infoCards.regulation.title}
            theme="green"
            action={<RegulationModal />}
          >
            <p className="text-slate-600">
              Normas e orientações de convivência da pousada para uma estadia harmoniosa e tranquila.
            </p>
          </FeatureCard>
        </div>
      </main>

      {/* New Structure Footer */}
      <Footer />
    </div>
  );
}
