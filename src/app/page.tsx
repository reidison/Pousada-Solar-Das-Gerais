
'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WelcomeMessage } from '@/components/welcome-message';
import { InfoCard } from '@/components/info-card';
import { Button } from '@/components/ui/button';
import { Coffee, Wifi, Map, Phone, GlassWater, PhoneCall, BookText, ShoppingBag } from 'lucide-react';
import { UsefulServicesModal } from '@/components/useful-services-modal';
import { MinibarModal } from '@/components/minibar-modal';
import { RegulationModal } from '@/components/regulation-modal';
import { WhatsappIcon } from '@/components/icons/whatsapp-icon';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { LodgeInfo } from '@/types/lodge-info';
import { useLanguage } from '@/contexts/language-context';
import Link from 'next/link';

export default function SolarInfoHubPage() {
  const firestore = useFirestore();
  const { translations } = useLanguage();
  const lodgeInfoRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'lodge_info', 'main') : null),
    [firestore]
  );
  const { data: lodgeInfo } = useDoc<LodgeInfo>(lodgeInfoRef);

  const infoCards = [
    {
      icon: <Coffee size={28} />,
      title: translations.infoCards.breakfast.title,
      content: (
        <>
          <p>{lodgeInfo?.breakfastHours ? lodgeInfo.breakfastHours : translations.infoCards.breakfast.line1}</p>
          <p>{lodgeInfo?.breakfastLocation ? lodgeInfo.breakfastLocation : translations.infoCards.breakfast.line2}</p>
        </>
      ),
    },
    {
      icon: <Wifi size={28} />,
      title: translations.infoCards.wifi.title,
      content: (
          <div className="space-y-4 w-full text-center">
            <div className="pb-3 border-b border-dashed">
                <p className="font-bold text-primary text-xs uppercase mb-2 tracking-tight">{translations.infoCards.wifi.generalLabel}</p>
                <p className="text-xs">{translations.infoCards.wifi.line1} <span className="font-bold">{translations.infoCards.wifi.networkName}</span></p>
                <p className="text-xs">{translations.infoCards.wifi.line2} <span className="font-bold">{translations.infoCards.wifi.password}</span></p>
            </div>
            <div>
                <p className="font-bold text-primary text-xs uppercase mb-2 tracking-tight">{translations.infoCards.wifi.blocksLabel}</p>
                <p className="text-xs">{translations.infoCards.wifi.line1} <span className="font-bold">{translations.infoCards.wifi.blocksNetworkName}</span></p>
                <p className="text-xs">{translations.infoCards.wifi.line2} <span className="font-bold">{translations.infoCards.wifi.blocksPassword}</span></p>
            </div>
          </div>
      ),
    },
    {
      icon: <Map size={28} />,
      title: translations.infoCards.cityTour.title,
      content: (
        <Button asChild variant="outline" className="mt-4 hover:bg-transparent hover:text-foreground">
          <Link href="/city-tour">
            {translations.infoCards.cityTour.button}
          </Link>
        </Button>
      ),
    },
    {
      icon: <ShoppingBag size={28} />,
      title: "Nossa Loja",
      content: (
        <Button asChild variant="outline" className="mt-4 hover:bg-transparent hover:text-foreground">
          <Link href="/loja">
            Ver produtos
          </Link>
        </Button>
      ),
    },
    {
      icon: <Phone size={28} />,
      title: translations.infoCards.reception.title,
      content: (
        <>
          <p className="mb-4">{translations.infoCards.reception.line1}</p>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-green-600">
            <a href={`https://wa.me/${lodgeInfo?.whatsappNumber || ''}`} target="_blank" rel="noopener noreferrer">
              <WhatsappIcon className="mr-2 h-5 w-5" />
              {translations.infoCards.reception.button}
            </a>
          </Button>
        </>
      ),
    },
    {
      icon: <GlassWater size={28} />,
      title: translations.infoCards.minibar.title,
      content: (
        <MinibarModal />
      ),
    },
    {
      icon: <PhoneCall size={28} />,
      title: translations.infoCards.usefulPhones.title,
      content: (
        <div className="text-sm text-center w-full space-y-2">
          <UsefulServicesModal />
        </div>
      ),
    },
    {
      icon: <BookText size={28} />,
      title: translations.infoCards.regulation.title,
      content: (
        <div className="text-sm text-center w-full space-y-2">
            <RegulationModal />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col font-body">
      <Header />
      <main className="container mx-auto flex-grow px-4 py-8 pt-28 md:pt-32 relative">
        <WelcomeMessage />
        
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {infoCards.map((card, index) => (
            <InfoCard key={index} icon={card.icon} title={card.title}>
              {card.content}
            </InfoCard>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
