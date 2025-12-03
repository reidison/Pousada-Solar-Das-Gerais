
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

interface TourSlide {
  imageUrl: string;
}

export default function CityTourPage() {
  const firestore = useFirestore();
  const slidesRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'tour_slides');
  }, [firestore]);

  const { data: slides, isLoading } = useCollection<TourSlide>(slidesRef);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} className="mr-1" />
          Voltar
        </Link>
      </header>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-2">City Tour em Ouro Preto</h1>
        <p className="text-lg text-muted-foreground">Descubra as maravilhas da nossa cidade histórica.</p>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!isLoading && slides && slides.length > 0 && (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="md:basis-1/1 lg:basis-1/1">
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="flex aspect-video items-center justify-center p-0 relative">
                       <Image
                          src={slide.imageUrl}
                          alt="Ponto turístico de Ouro Preto"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                       />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}

      {!isLoading && (!slides || slides.length === 0) && (
         <div className="space-y-12">
            <Card className="text-center p-8">
                <CardContent>
                    <h2 className="text-xl font-semibold mb-2">Em breve</h2>
                    <p className="text-muted-foreground mb-4">Estamos preparando um roteiro incrível para você. Volte em breve!</p>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}
