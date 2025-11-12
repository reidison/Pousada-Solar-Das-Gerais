'use client';

import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Logo } from '@/components/icons/logo';
import type { LodgeInfo } from '@/types/lodge-info';

export function Header() {
  const firestore = useFirestore();
  const lodgeInfoRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'lodge_info', 'main') : null),
    [firestore]
  );
  const { data: lodgeInfo } = useDoc<LodgeInfo>(lodgeInfoRef);

  // Use o logo da Imgur como padrão, ou o do banco de dados se existir.
  const logoUrl = lodgeInfo?.logoUrl || "https://i.imgur.com/gO08oua.png";

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-20 flex items-center justify-center text-center sm:justify-start sm:text-left">
        <div className="flex items-center gap-3">
          <Logo src={logoUrl} className="h-16 w-auto" />
        </div>
      </div>
    </header>
  );
}
