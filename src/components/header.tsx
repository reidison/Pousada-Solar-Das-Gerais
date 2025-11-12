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

  const logoUrl = lodgeInfo?.logoUrl || "https://i.imgur.com/jRjiohM.png";

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm">
      <div className="container relative mx-auto px-4 h-20 flex items-center justify-center text-center sm:justify-start sm:text-left">
        <div className="absolute top-4 left-4 h-8 w-8 border-l-2 border-t-2 border-primary/40 rounded-tl-lg"></div>
        <div className="absolute top-4 right-4 h-8 w-8 border-r-2 border-t-2 border-primary/40 rounded-tr-lg"></div>
        <div className="flex items-center gap-3">
          <Logo src={logoUrl} className="h-16 w-auto" />
        </div>
      </div>
    </header>
  );
}
