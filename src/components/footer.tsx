'use client';

import React from 'react';
import { Instagram, Lock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser, useAuth, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { signOut } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { LodgeConfigModal } from '@/components/lodge-config-modal';
import { SolarLogo } from '@/components/solar-logo';
import type { LodgeInfo } from '@/types/lodge-info';

export function Footer() {
  const { user } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();

  const isAdmin = user && !user.isAnonymous;

  const lodgeInfoRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'lodge_info', 'main') : null),
    [firestore]
  );
  const { data: lodgeInfo } = useDoc<LodgeInfo>(lodgeInfoRef);

  const socialHandle = lodgeInfo?.socialMedia?.trim() || '@pousadasolardasgeraisop';
  const socialUrl =
    socialHandle.startsWith('http://') || socialHandle.startsWith('https://')
      ? socialHandle
      : `https://www.instagram.com/${socialHandle.replace(/^@/, '')}`;
  const copyrightText =
    lodgeInfo?.copyrightText?.trim() || 'Pousada Solar das Gerais';
  const footerImage = lodgeInfo?.footerImageUrl?.trim() || '/images/footer-minas-gerais.png';

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <footer className="mt-16 w-full overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Scenic Navy Banner: "Modo Admin - Edição de conteúdo via Firebase" */}
        {isAdmin ? (
          <div className="group relative block w-full rounded-2xl bg-[#11314C] text-white p-5 sm:p-7 shadow-xl overflow-hidden hover:bg-[#0D263B] transition-all duration-300">
            <div className="relative z-10 flex items-center justify-between gap-4">
              {/* Left Side: Lock badge + Modo Admin */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F5A623] text-[#11314C] flex items-center justify-center font-bold shrink-0 shadow-sm">
                  <Lock size={22} />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                    Modo Admin
                  </h4>
                </div>
              </div>

              {/* Center / Right: Custom Footer Image or Church Silhouette + Chevron */}
              <div className="flex items-center gap-3 sm:gap-5">
                <div className="relative w-32 sm:w-48 h-14 sm:h-16 flex-shrink-0">
                  <Image
                    src={footerImage}
                    alt="Ícone do Rodapé"
                    fill
                    referrerPolicy="no-referrer"
                    unoptimized
                    className="object-contain"
                  />
                </div>

                <LodgeConfigModal
                  triggerVariant="ghost"
                  triggerClassName="border-0 bg-transparent shadow-none text-white hover:bg-white/10 hover:text-white"
                />
              </div>
            </div>
          </div>
        ) : (
          <Link
            href="/login"
            className="group relative block w-full rounded-2xl bg-[#11314C] text-white p-5 sm:p-7 shadow-xl overflow-hidden hover:bg-[#0D263B] transition-all duration-300"
          >
            <div className="relative z-10 flex items-center justify-between gap-4">
              {/* Left Side: Lock badge + Modo Admin */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F5A623] text-[#11314C] flex items-center justify-center font-bold shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Lock size={22} />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                    Modo Admin
                  </h4>
                </div>
              </div>

              {/* Center / Right: Custom Footer Image or Church Silhouette + Chevron */}
              <div className="flex items-center gap-3 sm:gap-5">
                <div className="relative w-32 sm:w-48 h-14 sm:h-16 flex-shrink-0">
                  <Image
                    src={footerImage}
                    alt="Ícone do Rodapé"
                    fill
                    referrerPolicy="no-referrer"
                    unoptimized
                    className="object-contain"
                  />
                </div>

                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 group-hover:bg-[#F5A623] group-hover:text-[#11314C] text-white flex items-center justify-center transition-all duration-300 shadow-sm shrink-0">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* Decorative Organic Wave Transitions */}
      <div className="w-full relative mt-6 leading-none">
        {/* Golden Wave Accent */}
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12"
        >
          <path
            d="M0,25 C300,55 750,0 1200,30 L1200,60 L0,60 Z"
            fill="#ECA31D"
            opacity="0.9"
          />
        </svg>
        {/* Navy Deep Wave */}
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 -mt-4 sm:-mt-6"
        >
          <path
            d="M0,35 C400,10 800,50 1200,20 L1200,60 L0,60 Z"
            fill="#11314C"
          />
        </svg>
      </div>

      {/* Bottom Bar matching exact layout */}
      <div className="bg-[#11314C] text-white pt-2 pb-6 border-t border-sky-950/40">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Official Lodge Logo & Copyright */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <SolarLogo size="sm" variant="dark" className="shrink-0" />
            <span className="text-xs font-medium text-slate-200">
              {copyrightText}
            </span>

            {isAdmin && (
              <Button
                variant="link"
                onClick={handleLogout}
                className="text-amber-300 hover:text-amber-200 p-0 h-auto text-xs ml-1"
              >
                (Sair do Modo Admin)
              </Button>
            )}
          </div>

          {/* Right: Instagram handle with Instagram icon */}
          <div>
            <a
              href={socialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-[#F5A623] transition-colors py-1 px-2 rounded-md hover:bg-white/5"
            >
              <Instagram size={16} className="text-[#F5A623]" />
              <span>{socialHandle}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
