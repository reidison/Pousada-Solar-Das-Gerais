
'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BrazilFlagIcon } from '@/components/icons/brazil-flag-icon';
import { UsaFlagIcon } from '@/components/icons/usa-flag-icon';
import { Logo } from '@/components/icons/logo';

interface HeaderProps {
  logoUrl?: string;
}

export function Header({ logoUrl }: HeaderProps = {}) {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#113F52]">
      <div className="container relative mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-95 transition-opacity">
          <Logo src={logoUrl} />
        </Link>

        {/* Seletor de Idiomas */}
        <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-md border border-[#113F52]">
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
      </div>
    </header>
  );
}
