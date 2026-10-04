'use client';

import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { useUser } from '@/firebase';
import { LodgeConfigModal } from '@/components/lodge-config-modal';
import { Camera } from 'lucide-react';

interface WelcomeMessageProps {
  customTitle?: string;
  customSubtitle?: string;
  customHeroImage?: string;
}

export function WelcomeMessage({ customTitle, customSubtitle, customHeroImage }: WelcomeMessageProps = {}) {
  const { translations } = useLanguage();
  const { user } = useUser();
  const isAdmin = user && !user.isAnonymous;

  const title = customTitle || translations.welcomeMessage.title;
  const subtitle = customSubtitle || translations.welcomeMessage.subtitle;
  const heroSrc = customHeroImage?.trim() ? customHeroImage : undefined;

  return (
    <div className="relative mb-8 sm:mb-10">
      {/* 1. Container da Hero (espaço para imagem de capa) com linha inferior bem fininha */}
      <div className="relative -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 overflow-hidden border-b border-[#113F52]">
        <div className="relative h-44 sm:h-56 md:h-64 lg:h-72 w-full flex items-center justify-center bg-solar-cream/60">
          {/* Imagem de Fundo (renderizada exclusivamente caso haja imagem carregada via upload) */}
          {heroSrc ? (
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={heroSrc}
                alt="Capa da Pousada Solar das Gerais"
                className="w-full h-full object-cover object-center transform -scale-x-100"
              />
            </div>
          ) : (
            <div className="text-center p-4 text-solar-navy/30 select-none">
              <span className="text-xs uppercase tracking-widest font-semibold block">
                Espaço para foto de capa
              </span>
            </div>
          )}

          {/* Atalho de Upload para o Administrador */}
          {isAdmin && (
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30">
              <LodgeConfigModal
                trigger={
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 hover:bg-white text-solar-navy text-xs font-semibold rounded-lg shadow-sm backdrop-blur-xs transition-all cursor-pointer border border-[#113F52]"
                    title="Configurar imagem de capa"
                  >
                    <Camera size={14} />
                    <span>{heroSrc ? 'Alterar Capa' : 'Enviar Capa'}</span>
                  </button>
                }
              />
            </div>
          )}
        </div>
      </div>

      {/* 2. Texto de Boas-Vindas posicionado ABAIXO da Hero (organizado para mobile e desktop) */}
      <div className="pt-6 sm:pt-7 pb-1 px-1 max-w-3xl">
        <div className="inline-block bg-solar-gold text-solar-navy px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5 shadow-xs border border-[#113F52]">
          Ouro Preto • Minas Gerais
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold font-headline text-solar-navy leading-tight mb-2 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
