'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WelcomeMessage } from '@/components/welcome-message';
import { InfoCard } from '@/components/info-card';
import { BackToTop } from '@/components/back-to-top';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Coffee, Wifi, Check, Map, Phone, GlassWater, KeyRound, PhoneCall, BookText } from 'lucide-react';
import { UsefulServicesModal } from '@/components/useful-services-modal';
import { RegulationModal } from '@/components/regulation-modal';
import { WhatsappIcon } from '@/components/icons/whatsapp-icon';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { LodgeInfo } from '@/types/lodge-info';

export default function SolarInfoHubPage() {
  const firestore = useFirestore();
  const lodgeInfoRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'lodge_info', 'main') : null),
    [firestore]
  );
  const { data: lodgeInfo, isLoading } = useDoc<LodgeInfo>(lodgeInfoRef);
  
  const minibarItems = lodgeInfo?.minibarMenu
    ? lodgeInfo.minibarMenu.split('\n').map(item => {
        const [name, price] = item.split(';');
        return { item: name, price: price };
      })
    : [];

  const infoCards = [
    {
      icon: <Coffee size={28} />,
      title: "Café da Manhã",
      content: (
        isLoading ? (
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-36" />
          </div>
        ) : (
          <>
            <p>Servido diariamente das</p>
            <p className="font-bold text-lg text-primary">{lodgeInfo?.breakfastHours}</p>
            <p className="text-sm">Local: {lodgeInfo?.breakfastLocation}</p>
          </>
        )
      ),
    },
    {
      icon: <Wifi size={28} />,
      title: "Wi-Fi",
      content: (
        isLoading ? (
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-6 w-28" />
          </div>
        ) : (
          <>
            <p>Rede:</p>
            <p className="font-bold text-lg text-primary">{lodgeInfo?.wifiName}</p>
            <p>Senha:</p>
            <p className="font-bold text-lg text-primary">{lodgeInfo?.wifiPassword}</p>
          </>
        )
      ),
    },
    {
      icon: <KeyRound size={28} />,
      title: "Acesso Principal",
      content: (
        <>
          <p>A porta principal utiliza uma senha eletrônica.</p>
          <p>Senha:</p>
          <p className="font-extrabold text-3xl text-primary flex items-center justify-center gap-1">
            {lodgeInfo?.mainDoorAccessCode || '...'}
            <Check size={40} className="text-green-600" strokeWidth={4} />
          </p>
        </>
      ),
    },
    {
      icon: <Map size={28} />,
      title: "City Tour",
      content: (
        isLoading ? (
          <Skeleton className="h-8 w-48" />
        ) : (
          <p>{lodgeInfo?.cityTourSchedule}</p>
        )
      ),
    },
    {
      icon: <Phone size={28} />,
      title: "Fale com a Recepção",
      content: (
        <>
          <p className="mb-4">Precisa de algo? Estamos à disposição no WhatsApp.</p>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-green-600">
            <a href={`https://wa.me/${lodgeInfo?.whatsappNumber || ''}`} target="_blank" rel="noopener noreferrer">
              <WhatsappIcon className="mr-2 h-5 w-5" />
              Falar pelo WhatsApp
            </a>
          </Button>
        </>
      ),
    },
    {
      icon: <GlassWater size={28} />,
      title: "Frigobar",
      content: (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-4 hover:bg-transparent hover:text-foreground">
              Ver a lista
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Itens do Frigobar</DialogTitle>
            </DialogHeader>
            <div className="w-full text-sm max-h-[60vh] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left font-semibold text-primary/80">Item</TableHead>
                    <TableHead className="text-right font-semibold text-primary/80">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow><TableCell colSpan={2} className="text-center">Carregando...</TableCell></TableRow>
                  ) : minibarItems.length > 0 ? (
                    minibarItems.map((item, index) => (
                      item.item && <TableRow key={index}>
                        <TableCell className="text-left py-2">{item.item}</TableCell>
                        <TableCell className="text-right py-2">{item.price}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow><TableCell colSpan={2} className="text-center">Nenhum item no frigobar.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      icon: <PhoneCall size={28} />,
      title: "Telefones Úteis",
      content: (
        <div className="text-sm text-center w-full space-y-2">
          <UsefulServicesModal />
        </div>
      ),
    },
    {
      icon: <BookText size={28} />,
      title: "Nosso Regulamento",
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
      <main className="container mx-auto flex-grow px-4 py-8 pt-28 md:pt-32">
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
      <BackToTop />
    </div>
  );
}
