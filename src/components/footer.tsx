'use client';

import { Instagram, LogOut, Settings } from 'lucide-react';
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
    <footer className="relative mt-16 pt-6 pb-0 overflow-hidden bg-transparent select-none border-t border-[#113F52]">
      {/* Informações Principais do Rodapé: Apenas admin, @pousadasolardasgeraisop e copyright */}
      <div className="container mx-auto px-4 sm:px-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* Link Admin à Esquerda */}
          <div className="flex items-center gap-2">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <LodgeConfigModal
                  trigger={
                    <button
                      className="flex items-center gap-1.5 font-semibold text-solar-navy hover:underline bg-solar-navy/10 border border-[#113F52] px-2.5 py-1 rounded-lg cursor-pointer"
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

          {/* Redes Sociais (@pousadasolardasgeraisop) e Copyright à Direita */}
          <div className="flex items-center gap-3 text-slate-500 font-medium">
            <a
              href="https://www.instagram.com/pousadasolardasgeraisop"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-solar-navy transition-colors"
            >
              <Instagram size={14} className="text-solar-navy shrink-0" />
              <span>@pousadasolardasgeraisop</span>
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
          {/* Onda Azul Petróleo #113F52 */}
          <path
            d="M0,75 C280,50 620,85 960,65 C1180,50 1340,75 1440,70 L1440,90 L0,90 Z"
            fill="#113F52"
          />
        </svg>
      </div>
    </footer>
  );
}
