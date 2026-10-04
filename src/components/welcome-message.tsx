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
    <div className="relative -mx-4 -mt-6 sm:-mx-8 md:-mx-12 mb-10 overflow-hidden">
      {/* Container da Hero (espaço preservado para receber upload de imagens) */}
      <div className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[420px] w-full flex items-center">
        {/* Imagem de Fundo (renderizada exclusivamente caso haja imagem carregada via upload) */}
        {heroSrc && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={heroSrc}
              alt="Capa da Pousada"
              className="w-full h-full object-cover object-center transform -scale-x-100"
            />
          </div>
        )}

        {/* Atalho de Upload para o Administrador */}
        {isAdmin && (
          <div className="absolute top-4 right-4 z-30">
            <LodgeConfigModal
              trigger={
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-solar-navy text-xs font-semibold rounded-lg shadow-sm backdrop-blur-xs transition-all cursor-pointer border border-solar-navy/10"
                  title="Configurar imagem de capa"
                >
                  <Camera size={14} />
                  <span>{heroSrc ? 'Alterar Capa' : 'Enviar Capa'}</span>
                </button>
              }
            />
          </div>
        )}

        {/* Texto de Boas-Vindas */}
        <div className="container relative z-10 mx-auto px-6 sm:px-10 py-12 md:py-16 max-w-3xl">
          <div className="inline-block bg-solar-gold text-solar-navy px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            Ouro Preto • Minas Gerais
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline text-solar-navy leading-tight mb-4 drop-shadow-sm">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-solar-navy font-medium max-w-xl leading-relaxed drop-shadow-xs">
            {subtitle}
          </p>
        </div>

        {/* Ondas Orgânicas Decorativas Inferiores (Fiel ao Layout) */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none leading-none">
          <svg
            viewBox="0 0 1440 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-16 sm:h-24 md:h-28 object-fill block"
            preserveAspectRatio="none"
          >
            {/* Colina / Onda Azul Royal Escuro */}
            <path
              d="M0,80 C320,100 640,55 960,38 C1140,28 1320,44 1440,32 L1440,160 L0,160 Z"
              fill="#1E3A8A"
            />

            {/* Faixa Ondulada Azul Petróleo (Navy) */}
            <path
              d="M0,48 C240,42 500,85 800,80 C1040,75 1260,95 1440,60 L1440,160 L0,160 Z"
              fill="#113F52"
            />

            {/* Base Creme Suave que se funde com o fundo da página (remove a barra escura grossa) */}
            <path
              d="M0,86 C260,82 520,122 820,118 C1060,114 1270,128 1440,98 L1440,160 L0,160 Z"
              fill="#FBF9F4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
