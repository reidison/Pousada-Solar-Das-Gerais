'use client';

import { Home, MapPin, Instagram, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { LodgeConfigModal } from '@/components/lodge-config-modal';

export function Footer() {
  const { user } = useUser();
  const auth = useAuth();
  
  const isAdmin = user && !user.isAnonymous;

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <footer className="relative mt-16 pt-8 pb-0 overflow-hidden bg-transparent select-none">
      {/* Informações Principais do Rodapé */}
      <div className="container mx-auto px-4 sm:px-6 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          {/* Link Admin à Esquerda */}
          <div className="flex items-center gap-2 order-2 md:order-1">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <LodgeConfigModal
                  trigger={
                    <button
                      className="flex items-center gap-1.5 font-semibold text-solar-green hover:underline bg-solar-green/10 px-2.5 py-1 rounded-lg cursor-pointer"
                    >
                      <Settings size={13} />
                      <span>Configurações</span>
                    </button>
                  }
                />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 font-semibold p-1 hover:bg-red-50 rounded"
                  title="Sair do modo administrador"
                >
                  <LogOut size={12} />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="font-medium text-slate-400 hover:text-solar-navy transition-colors px-2 py-1 rounded-md hover:bg-slate-100/60"
              >
                admin
              </Link>
            )}
          </div>

          {/* Linha Centralizada: Pousada Solar das Gerais | Ouro Preto - MG */}
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 font-semibold text-solar-navy order-1 md:order-2">
            <span className="flex items-center gap-1.5">
              <Home size={15} className="text-solar-navy" />
              Pousada Solar das Gerais
            </span>
            <span className="hidden sm:inline text-solar-navy/40">|</span>
            <span className="flex items-center gap-1.5 text-solar-navy/80">
              <MapPin size={15} className="text-solar-green" />
              Ouro Preto - MG
            </span>
          </div>

          {/* Redes Sociais e Copyright à Direita */}
          <div className="flex items-center gap-3 text-slate-500 order-3">
            <a
              href="https://www.instagram.com/pousadasolardasgerais"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-solar-navy transition-colors font-medium"
            >
              <Instagram size={14} className="text-solar-navy" />
              <span>@pousadasolardasgerais</span>
            </a>
            <span className="opacity-30">•</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>

      {/* Ondas Orgânicas Decorativas da Base da Tela */}
      <div className="relative w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-16 md:h-20 block"
          preserveAspectRatio="none"
        >
          {/* Onda Amarela Dourada */}
          <path
            d="M0,50 C240,10 520,80 840,40 C1100,5 1300,60 1440,30 L1440,90 L0,90 Z"
            fill="#F6B726"
          />
          {/* Onda Azul Royal Escuro */}
          <path
            d="M0,60 C300,30 650,85 1020,45 C1240,25 1380,65 1440,50 L1440,90 L0,90 Z"
            fill="#1E3A8A"
          />
          {/* Onda Azul Petróleo Inferior */}
          <path
            d="M0,75 C280,50 620,85 960,65 C1180,50 1340,75 1440,70 L1440,90 L0,90 Z"
            fill="#113F52"
          />
        </svg>
      </div>
    </footer>
  );
}
