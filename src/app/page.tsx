
'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WelcomeMessage } from '@/components/welcome-message';
import { InfoCard } from '@/components/info-card';
import {
  Coffee,
  Wifi,
  Map,
  ShoppingBag,
  GlassWater,
  PhoneCall,
  BookText,
  Bot,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { WhatsappIcon } from '@/components/icons/whatsapp-icon';
import { UsefulServicesModal } from '@/components/useful-services-modal';
import { MinibarModal } from '@/components/minibar-modal';
import { RegulationModal } from '@/components/regulation-modal';
import { LodgeConfigModal } from '@/components/lodge-config-modal';
import { WifiModal } from '@/components/wifi-modal';
import { BreakfastModal } from '@/components/breakfast-modal';
import { AiWelcomeModal } from '@/components/ai-welcome-modal';
import { useDoc, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { LodgeInfo } from '@/types/lodge-info';
import { useLanguage } from '@/contexts/language-context';

export default function Page() {
  const firestore = useFirestore();
  const { translations } = useLanguage();
  const { user } = useUser();
  const isAdmin = user && !user.isAnonymous;

  const lodgeInfoRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'lodge_info', 'main') : null),
    [firestore]
  );
  const { data: lodgeInfo } = useDoc<LodgeInfo>(lodgeInfoRef);

  const whatsappNumber = lodgeInfo?.whatsappNumber || '31992580325';
  const cleanWhatsappNumber = whatsappNumber.replace(/\D/g, '');

  return (
    <div className="bg-solar-cream text-solar-navy flex min-h-screen flex-col font-body selection:bg-solar-gold selection:text-solar-navy">
      <Header logoUrl={lodgeInfo?.logoUrl} />

      <main className="container mx-auto flex-grow px-4 sm:px-6 pt-24 md:pt-28 pb-12 max-w-5xl">
        {/* Banner Hero com Foto de Ouro Preto e Ondas */}
        <WelcomeMessage
          customSubtitle={lodgeInfo?.welcomeMessage}
          customHeroImage={lodgeInfo?.heroImageUrl}
        />

        {/* Grid dos 9 Cartões no Estilo Exato da Maquete */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* 1. Café da Manhã */}
          <BreakfastModal
            hours={lodgeInfo?.breakfastHours || translations.infoCards.breakfast.line1}
            location={lodgeInfo?.breakfastLocation || translations.infoCards.breakfast.line2}
            trigger={
              <div>
                <InfoCard
                  icon={<Coffee size={24} />}
                  customIconUrl={lodgeInfo?.cardIcons?.breakfast}
                  title="Café da Manhã"
                  subtitle="Horários e local"
                  iconBgColor="bg-amber-100/80 text-solar-navy border border-[#113F52]"
                  waveAccentColor="#F6B726"
                />
              </div>
            }
          />

          {/* 2. Wi-Fi */}
          <WifiModal
            networkName={lodgeInfo?.wifiName || "Pousada_Solar_Das_Gerais"}
            password={lodgeInfo?.wifiPassword || "pousada2023"}
            trigger={
              <div>
                <InfoCard
                  icon={<Wifi size={24} />}
                  customIconUrl={lodgeInfo?.cardIcons?.wifi}
                  title="Wi-Fi"
                  subtitle="Rede e senha"
                  iconBgColor="bg-solar-cream text-solar-navy border border-[#113F52]"
                  waveAccentColor="#113F52"
                />
              </div>
            }
          />

          {/* 3. City Tour */}
          <Link href="/city-tour" className="block h-full">
            <InfoCard
              icon={<Map size={24} />}
              customIconUrl={lodgeInfo?.cardIcons?.cityTour}
              title="City Tour"
              subtitle="Agenda e instruções"
              iconBgColor="bg-solar-cream text-solar-navy border border-[#113F52]"
              waveAccentColor="#113F52"
            />
          </Link>

          {/* 4. Loja */}
          <Link href="/loja" className="block h-full">
            <InfoCard
              icon={<ShoppingBag size={24} />}
              customIconUrl={lodgeInfo?.cardIcons?.loja}
              title="Loja"
              subtitle="Produtos da pousada"
              iconBgColor="bg-solar-cream text-solar-navy border border-[#113F52]"
              waveAccentColor="#113F52"
            />
          </Link>

          {/* 5. Recepção (WhatsApp) */}
          <a
            href={`https://wa.me/55${cleanWhatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            <InfoCard
              icon={<WhatsappIcon className="w-6 h-6 text-solar-navy fill-current" />}
              customIconUrl={lodgeInfo?.cardIcons?.reception}
              title="Recepção"
              subtitle="Fale com a recepção no WhatsApp"
              iconBgColor="bg-amber-100/80 text-solar-navy border border-[#113F52]"
              waveAccentColor="#F6B726"
            />
          </a>

          {/* 6. Frigobar */}
          <MinibarModal
            trigger={
              <div>
                <InfoCard
                  icon={<GlassWater size={24} />}
                  customIconUrl={lodgeInfo?.cardIcons?.minibar}
                  title="Frigobar"
                  subtitle="Itens e preços"
                  iconBgColor="bg-solar-cream text-solar-navy border border-[#113F52]"
                  waveAccentColor="#113F52"
                />
              </div>
            }
          />

          {/* 7. Telefones úteis */}
          <UsefulServicesModal
            trigger={
              <div>
                <InfoCard
                  icon={<PhoneCall size={24} />}
                  customIconUrl={lodgeInfo?.cardIcons?.usefulServices}
                  title="Telefones úteis"
                  subtitle="Serviços locais"
                  iconBgColor="bg-solar-cream text-solar-navy border border-[#113F52]"
                  waveAccentColor="#113F52"
                />
              </div>
            }
          />

          {/* 8. Regulamento */}
          <RegulationModal
            trigger={
              <div>
                <InfoCard
                  icon={<BookText size={24} />}
                  customIconUrl={lodgeInfo?.cardIcons?.regulation}
                  title="Regulamento"
                  subtitle="Regras da pousada"
                  iconBgColor="bg-solar-cream text-solar-navy border border-[#113F52]"
                  waveAccentColor="#113F52"
                />
              </div>
            }
          />

          {/* 9. Boas-vindas com IA */}
          <AiWelcomeModal
            trigger={
              <div>
                <InfoCard
                  icon={<Bot size={24} />}
                  customIconUrl={lodgeInfo?.cardIcons?.aiWelcome}
                  title="Boas-vindas com IA"
                  subtitle="Mensagem personalizada conforme o clima"
                  iconBgColor="bg-amber-100/80 text-solar-navy border border-[#113F52]"
                  waveAccentColor="#F6B726"
                />
              </div>
            }
          />
        </div>

        {/* Banner Horizontal Institucional com Endereço e Silhueta de Ouro Preto */}
        <div className="mt-8 sm:mt-10">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Pousada+Solar+Das+Gerais+Rua+Manuel+Cabral+119+centro+Ouro+Preto"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
            title="Ver localização no Google Maps"
          >
            <div className="relative bg-solar-navy text-white rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-between overflow-hidden border border-[#113F52]">
              <div className="flex items-center gap-4 z-10">
                <div className="w-12 h-12 rounded-full bg-solar-gold text-solar-navy flex items-center justify-center font-bold shadow-sm shrink-0 group-hover:scale-105 transition-transform border border-[#113F52]">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-base sm:text-xl text-white leading-tight sm:leading-normal">
                    <span className="block sm:inline">Pousada Solar</span>{' '}
                    <span className="block sm:inline">Das</span>{' '}
                    <span className="block sm:inline">Gerais</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug">
                    Rua Manuel Cabral, 119, centro - Ouro Preto
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 z-10">
                <AdminIllustration />
                <ChevronRight
                  size={22}
                  className="text-slate-300 group-hover:translate-x-1 group-hover:text-white transition-all shrink-0"
                />
              </div>
            </div>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Ilustração com silhueta vetorial de igrejas barrocas, montanhas e sol de Ouro Preto
function AdminIllustration() {
  return (
    <div className="hidden md:block opacity-75 group-hover:opacity-100 transition-opacity select-none pointer-events-none">
      <svg
        width="160"
        height="50"
        viewBox="0 0 160 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sol Dourado */}
        <circle cx="68" cy="22" r="13" fill="#F6B726" />
        
        {/* Linhas das Montanhas das Gerais */}
        <path
          d="M0,48 C40,32 80,30 110,44 C125,38 142,39 160,48"
          stroke="#4D839B"
          strokeWidth="2"
          fill="none"
        />

        {/* Silhueta da Igreja Colonial com Torres e Cruzes */}
        <g stroke="#71A8BE" strokeWidth="1.8">
          {/* Torre Esquerda */}
          <path d="M116,46 L116,22 L124,14 L132,22 L132,46" fill="#113F52" />
          <path d="M124,14 L124,8" />
          <path d="M121,11 L127,11" />
          
          {/* Torre Direita */}
          <path d="M136,46 L136,25 L143,19 L150,25 L150,46" fill="#113F52" />
          <path d="M143,19 L143,14" />
          <path d="M140,16 L146,16" />
        </g>
      </svg>
    </div>
  );
}
