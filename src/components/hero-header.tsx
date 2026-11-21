'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';
import { SolarLogo } from '@/components/solar-logo';
import { useUser, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { LodgeConfigModal } from '@/components/lodge-config-modal';
import type { LodgeInfo } from '@/types/lodge-info';

export function HeroHeader() {
  const { language, setLanguage, translations } = useLanguage();
  const { user } = useUser();
  const firestore = useFirestore();
  const isAdmin = user && !user.isAnonymous;

  const lodgeInfoRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'lodge_info', 'main') : null),
    [firestore]
  );
  const { data: lodgeInfo } = useDoc<LodgeInfo>(lodgeInfoRef);

  const heroImage =
    lodgeInfo?.heroImageUrl?.trim() ||
    'https://images.unsplash.com/photo-1589999014168-3e589841f5a5?w=1000&q=85';

  return (
    <div className="relative w-full bg-gradient-to-b from-[#F2F7FA] to-[#E9F1F6] overflow-hidden pt-6">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Top bar with Admin config if admin */}
        <div className="flex items-center justify-between mb-4">
          <SolarLogo size="md" />
          {isAdmin && (
            <div className="flex items-center gap-2">
              <LodgeConfigModal />
            </div>
          )}
        </div>

        {/* Hero Grid: Text on left, Colonial building on right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center min-h-[260px] md:min-h-[320px] pb-6 md:pb-8">
          {/* Left Column: Welcome & Info */}
          <div className="md:col-span-7 flex flex-col justify-center pr-0 md:pr-4 z-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#11314C] tracking-tight leading-tight mb-3">
              {translations.welcomeMessage.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 max-w-xl font-normal">
              {translations.welcomeMessage.subtitle}
            </p>

            {/* Language Switcher Buttons (Pill design matching layout) */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setLanguage('pt')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all shadow-xs ${
                  language === 'pt'
                    ? 'bg-[#11314C] text-white shadow-sm ring-2 ring-[#11314C]/30'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
              >
                PT-BR
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all shadow-xs ${
                  language === 'en'
                    ? 'bg-[#11314C] text-white shadow-sm ring-2 ring-[#11314C]/30'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Right Column: Historic Colonial Architecture (Museu da Inconfidência or custom Hero image) */}
          <div className="md:col-span-5 relative h-56 sm:h-72 md:h-80 w-full rounded-2xl overflow-hidden shadow-lg border-2 border-white/80 bg-slate-200">
            <Image
              src={heroImage}
              alt="Pousada Solar das Gerais - Destaque"
              fill
              priority
              referrerPolicy="no-referrer"
              unoptimized={heroImage.startsWith('data:')}
              className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
            {/* Soft inner glow gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#11314C]/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 right-3 text-[10px] text-white/90 font-medium px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-xs">
              Ouro Preto, MG
            </div>
          </div>
        </div>
      </div>

      {/* Double Wave Transition between Hero & Cards Section */}
      <div className="w-full relative leading-none mt-2">
        {/* Navy Top Wave */}
        <svg
          viewBox="0 0 1200 50"
          preserveAspectRatio="none"
          className="w-full h-6 sm:h-9 relative z-10"
        >
          <path
            d="M0,20 C350,55 850,-15 1200,25 L1200,50 L0,50 Z"
            fill="#11314C"
          />
        </svg>
        {/* Golden Yellow Accent Wave */}
        <svg
          viewBox="0 0 1200 45"
          preserveAspectRatio="none"
          className="w-full h-5 sm:h-8 -mt-2 relative z-20"
        >
          <path
            d="M0,15 C450,-5 750,45 1200,10 L1200,45 L0,45 Z"
            fill="#ECA31D"
          />
        </svg>
      </div>
    </div>
  );
}
