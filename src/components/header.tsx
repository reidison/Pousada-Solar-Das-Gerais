
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BrazilFlagIcon } from '@/components/icons/brazil-flag-icon';
import { UsaFlagIcon } from '@/components/icons/usa-flag-icon';
import { Logo } from '@/components/icons/logo';
import { Menu, X, Coffee, Wifi, Map, ShoppingBag, Phone, ShieldCheck, Info } from 'lucide-react';

interface HeaderProps {
  logoUrl?: string;
}

export function Header({ logoUrl }: HeaderProps = {}) {
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-solar-navy/5">
      <div className="container relative mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-95 transition-opacity">
          <Logo src={logoUrl} />
        </Link>

        <div className="flex items-center gap-3">
          {/* Seletor de Idiomas */}
          <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-6 w-7 p-0 rounded-sm overflow-hidden transition-all",
                language === 'pt' ? 'ring-2 ring-solar-navy shadow-xs opacity-100 scale-105' : 'opacity-50 hover:opacity-100'
              )}
              onClick={() => setLanguage('pt')}
              title="Português"
            >
              <BrazilFlagIcon className="h-4 w-auto" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-6 w-7 p-0 rounded-sm overflow-hidden transition-all",
                language === 'en' ? 'ring-2 ring-solar-navy shadow-xs opacity-100 scale-105' : 'opacity-50 hover:opacity-100'
              )}
              onClick={() => setLanguage('en')}
              title="English"
            >
              <UsaFlagIcon className="h-4 w-auto" />
            </Button>
          </div>

          {/* Botão Hambúrguer do Modelo */}
          <Button
            variant="ghost"
            size="icon"
            className="text-solar-navy hover:bg-solar-navy/10 h-10 w-10 rounded-xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu de Navegação"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Menu Drawer Retrátil */}
      {menuOpen && (
        <div className="bg-white border-b border-solar-navy/10 px-4 py-4 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="container mx-auto flex flex-col gap-2 max-w-md">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-solar-navy font-medium hover:bg-solar-cream transition-colors"
            >
              <Info size={18} className="text-solar-navy" />
              Início & Serviços
            </Link>
            <Link
              href="/city-tour"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-solar-navy font-medium hover:bg-solar-cream transition-colors"
            >
              <Map size={18} className="text-sky-600" />
              City Tour Ouro Preto
            </Link>
            <Link
              href="/loja"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-solar-navy font-medium hover:bg-solar-cream transition-colors"
            >
              <ShoppingBag size={18} className="text-solar-green" />
              Lojinha da Pousada
            </Link>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-solar-navy font-medium hover:bg-solar-cream transition-colors"
            >
              <ShieldCheck size={18} className="text-amber-600" />
              Área Administrativa
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
