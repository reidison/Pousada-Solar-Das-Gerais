'use client';

import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Logo } from '@/components/icons/logo';
import type { LodgeInfo } from '@/types/lodge-info';
import { BrazilFlagIcon } from '@/components/icons/brazil-flag-icon';
import { UsaFlagIcon } from '@/components/icons/usa-flag-icon';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const firestore = useFirestore();
  const { translations } = useLanguage();
  const lodgeInfoRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'lodge_info', 'main') : null),
    [firestore]
  );
  const { data: lodgeInfo } = useDoc<LodgeInfo>(lodgeInfoRef);

  const logoUrl = lodgeInfo?.logoUrl || "https://i.imgur.com/jRjiohM.png";
  
  const { language, setLanguage } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm">
      <div className="container relative mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo src={logoUrl} className="h-16 w-auto" />
        </div>
        <div className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "h-6 w-auto p-0 rounded-sm overflow-hidden",
                    language === 'pt' ? 'opacity-100 ring-2 ring-primary ring-offset-2' : 'opacity-50 hover:opacity-100'
                )}
                onClick={() => setLanguage('pt')}
            >
                <BrazilFlagIcon className="h-6 w-auto" />
            </Button>
            <Button
                 variant="ghost"
                 size="icon"
                 className={cn(
                    "h-6 w-auto p-0 rounded-sm overflow-hidden",
                    language === 'en' ? 'opacity-100 ring-2 ring-primary ring-offset-2' : 'opacity-50 hover:opacity-100'
                )}
                onClick={() => setLanguage('en')}
            >
                <UsaFlagIcon className="h-6 w-auto" />
            </Button>
        </div>
      </div>
    </header>
  );
}
