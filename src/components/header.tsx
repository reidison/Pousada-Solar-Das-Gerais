
'use client';

import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BrazilFlagIcon } from '@/components/icons/brazil-flag-icon';
import { UsaFlagIcon } from '@/components/icons/usa-flag-icon';
import { Logo } from '@/components/icons/logo';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { LodgeInfo } from '@/types/lodge-info';
import Link from 'next/link';

export function Header() {
  const { language, setLanguage } = useLanguage();
  const firestore = useFirestore();

  const lodgeInfoRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'lodge_info', 'main') : null),
    [firestore]
  );
  const { data: lodgeInfo } = useDoc<LodgeInfo>(lodgeInfoRef);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b">
      <div className="container relative mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo 
            src={lodgeInfo?.logoUrl || "https://i.imgur.com/NDqUUNp.png"} 
            className="h-[59px] w-auto" 
          />
        </Link>

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
