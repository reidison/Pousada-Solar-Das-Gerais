'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { SolarLogo } from '@/components/solar-logo';
import { useUser, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { LodgeConfigModal } from '@/components/lodge-config-modal';
import type { LodgeInfo } from '@/types/lodge-info';

const DEFAULT_HERO_IMAGE = '/images/hero-ouro-preto.png';

export function HeroHeader() {
  const { language, setLanguage, translations } = useLanguage();
  const { user } = useUser();
  const firestore = useFirestore();
  const isAdmin = user && !user.isAnonymous;
  const [imgError, setImgError] = useState(false);

  const lodgeInfoRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'lodge_info', 'main') : null),
    [firestore]
  );
  const { data: lodgeInfo } = useDoc<LodgeInfo>(lodgeInfoRef);

  const heroImage = lodgeInfo?.heroImageUrl?.trim() || DEFAULT_HERO_IMAGE;

  return (
    <header className="w-full bg-gradient-to-b from-[#F4EFE4]/80 via-[#FAF9F5] to-[#FAF9F5] border-b border-stone-200/80">
      {/* Top Bar: Logo on left, Admin & Language Switcher on right */}
      <div className="border-b border-stone-200/70 bg-white/75 backdrop-blur-md">
        <div className="container mx-auto px-4 max-w-6xl h-20 flex items-center justify-between gap-4">
          <SolarLogo size="md" />

          <div className="flex items-center gap-3">
            {isAdmin && <LodgeConfigModal />}

            <div
              className="flex items-center gap-1 bg-stone-200/70 p-1 rounded-full"
              role="group"
              aria-label="Selecionar idioma"
            >
              <button
                type="button"
                onClick={() => setLanguage('pt')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  language === 'pt'
                    ? 'bg-[#11314C] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#11314C]'
                }`}
              >
                PT-BR
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-[#11314C] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#11314C]'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Hero Split */}
      <div className="container mx-auto px-4 max-w-6xl py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Welcome & Info */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B45309] mb-3">
              <MapPin size={14} className="shrink-0 text-[#ECA31D]" />
              <span>Ouro Preto · Minas Gerais</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-[#11314C] tracking-tight leading-[1.14] text-balance mb-4">
              {translations.welcomeMessage.title}
            </h1>

            <p className="text-base sm:text-[17px] text-slate-600 leading-relaxed max-w-xl">
              {translations.welcomeMessage.subtitle}
            </p>
          </div>

          {/* Right Column: Featured Photo (Canva organic oval frame, horizontally flipped) */}
          <div className="lg:col-span-5">
            <div
              className="bg-white p-2 sm:p-2.5 border-2 border-[#11314C] shadow-[0_8px_0_0_#ECA31D]"
              style={{ borderRadius: '58% 42% 54% 46% / 44% 56% 44% 56%' }}
            >
              <div
                className="relative w-full aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-stone-200"
                style={{ borderRadius: '56% 44% 52% 48% / 46% 54% 46% 54%' }}
              >
                {!imgError ? (
                  <Image
                    src={heroImage}
                    alt="Pousada Solar das Gerais - Destaque"
                    fill
                    priority
                    unoptimized
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="object-cover object-center -scale-x-100"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#11314C] to-[#1E4D6E] text-white p-6 text-center">
                    <MapPin size={32} className="text-[#ECA31D] mb-2" />
                    <p className="font-semibold text-sm">Pousada Solar das Gerais</p>
                    <p className="text-xs text-sky-200 mt-0.5">Ouro Preto, MG</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#11314C]/35 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] text-white/95 font-medium px-3 py-1 rounded-full bg-black/45 backdrop-blur-xs whitespace-nowrap">
                  Ouro Preto, MG
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle gold & navy accent rule */}
      <div className="h-1 w-full bg-gradient-to-r from-[#11314C] via-[#ECA31D] to-[#11314C]" />
    </header>
  );
}
