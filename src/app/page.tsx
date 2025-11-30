'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WelcomeMessage } from '@/components/welcome-message';
import { InfoCard } from '@/components/info-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Coffee, Wifi, Check, Map, Phone, GlassWater, KeyRound, PhoneCall, BookText } from 'lucide-react';
import { UsefulServicesModal } from '@/components/useful-services-modal';
import { MinibarModal } from '@/components/minibar-modal';
import { RegulationModal } from '@/components/regulation-modal';
import { CityTourModal } from '@/components/city-tour-modal';
import { WhatsappIcon } from '@/components/icons/whatsapp-icon';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { LodgeInfo } from '@/types/lodge-info';
import { useLanguage } from '@/contexts/language-context';

export default function SolarInfoHubPage() {
  const firestore = useFirestore();
  const { translations } = useLanguage();
  const lodgeInfoRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'lodge_info', 'main') : null),
    [firestore]
  );
  const { data: lodgeInfo, isLoading } = useDoc<LodgeInfo>(lodgeInfoRef);

  const infoCards = [
    {
      icon: <Coffee size={28} />,
      title: translations.infoCards.breakfast.title,
      content: (
        <>
          <p>{translations.infoCards.breakfast.line1}</p>
          <p>{translations.infoCards.breakfast.line2}</p>
        </>
      ),
    },
    {
      icon: <Wifi size={28} />,
      title: translations.infoCards.wifi.title,
      content: (
          <>
            <p>{translations.infoCards.wifi.line1}</p>
            <p className="font-bold text-sm">{translations.infoCards.wifi.networkName}</p>
            <p>{translations.infoCards.wifi.line2}</p>
            <p className="font-bold text-sm">{translations.infoCards.wifi.password}</p>
          </>
      ),
    },
    {
      icon: <KeyRound size={28} />,
      title: translations.infoCards.mainAccess.title,
      content: (
        <>
          <p>{translations.infoCards.mainAccess.line1}</p>
          <p className="font-bold text-lg text-primary">
            {translations.infoCards.mainAccess.line2}
          </p>
          <p className="text-3xl text-primary flex items-center justify-center gap-1">
            0525
            <Check size={40} className="text-green-600" strokeWidth={4} />
          </p>
        </>
      ),
    },
    {
      icon: <Map size={28} />,
      title: translations.infoCards.cityTour.title,
      content: (
        <CityTourModal />
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
