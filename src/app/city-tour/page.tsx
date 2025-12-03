
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, writeBatch, getDocs, doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import exampleData from '@/app/lib/placeholder-images.json';

interface TourStop {
  id: string;
  title: string;
  description: string;
  coverImage: string;
}

function TourStopImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
    const [hasError, setHasError] = useState(false);

    // Sanitize the URL by removing all whitespace.
    const cleanSrc = src ? src.replace(/\s/g, '') : '';
    const isValidSrc = cleanSrc.startsWith('http://') || cleanSrc.startsWith('https://');

    React.useEffect(() => {
        // Reset error state when src changes
        setHasError(false);
    }, [src]);

    if (!isValidSrc || hasError) {
      return (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <span className="text-xs text-muted-foreground">Imagem inválida ou não carregada</span>
        </div>
      );
    }
  
    return (
        <Image
            src={cleanSrc}
            alt={alt}
            fill
            className="object-cover"
            sizes={sizes}
            onError={() => setHasError(true)}
            data-ai-hint="historic building"
        />
    );
}

export default function CityTourPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isImporting, setIsImporting] = useState(false);

  const tourStopsRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'tour_stops') : null),
    [firestore]
  );

  const { data: tourStops, isLoading } = useCollection<TourStop>(tourStopsRef);

  const handleImportExamples = async () => {
    if (!firestore || !tourStopsRef) return;
    
    const isConfirmed = tourStops && tourStops.length > 0 
      ? window.confirm("Isso substituirá os pontos turísticos existentes. Deseja continuar?")
      : true;

    if (!isConfirmed) return;

    setIsImporting(true);
    toast({
      title: "Importando roteiro...",
      description: "Aguarde enquanto criamos os exemplos para você.",
    });

    try {
      const batch = writeBatch(firestore);

      // Delete existing documents
      if (tourStops && tourStops.length > 0) {
        const querySnapshot = await getDocs(tourStopsRef);
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
      }

      // Add new documents from example data
      exampleData.tour_stops.forEach((stop) => {
        const newDocRef = doc(tourStopsRef);
        batch.set(newDocRef, {
            title: stop.title,
            description: stop.description,
            coverImage: stop.coverImage.url
        });
      });

      await batch.commit();

      toast({
        title: "Sucesso!",
        description: "O roteiro de exemplo foi importado.",
      });
    } catch (error) {
      console.error("Erro ao importar roteiro:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível importar o roteiro de exemplo.",
      });
    } finally {
      setIsImporting(false);
    }
  };
  
  const hasStops = tourStops && tourStops.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} className="mr-1" />
          Voltar
        </Link>
        <Button onClick={handleImportExamples} disabled={isImporting}>
          {isImporting ? (
            <Loader2 size={16} className="mr-2 animate-spin" />
          ) : (
            <Sparkles size={16} className="mr-2" />
          )}
          {isImporting ? "Importando..." : "Importar Roteiro Exemplo"}
        </Button>
      </header>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-2">City Tour em Ouro Preto</h1>
        <p className="text-lg text-muted-foreground">Descubra as maravilhas da nossa cidade histórica.</p>
      </div>

      <div className="space-y-12">
        {isLoading && (
          <>
            <TourStopSkeleton />
            <TourStopSkeleton />
          </>
        )}
        
        {!isLoading && !hasStops && (
            <Card className="text-center p-8">
                <CardContent>
                    <h2 className="text-xl font-semibold mb-2">Seu roteiro está vazio</h2>
                    <p className="text-muted-foreground mb-4">Clique no botão "Importar Roteiro Exemplo" para ver como a página funciona.</p>
                </CardContent>
            </Card>
        )}

        {!isLoading && hasStops && tourStops.map((stop, index) => (
            <TourStopCard key={stop.id} stop={stop} isReversed={index % 2 !== 0} />
        ))}
      </div>
    </div>
  );
}

function TourStopCard({ stop, isReversed }: { stop: TourStop; isReversed: boolean }) {
    return (
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className={`grid grid-cols-1 md:grid-cols-2 items-center ${isReversed ? 'md:grid-flow-col-dense' : ''}`}>
                <div className={`relative h-64 md:h-96 ${isReversed ? 'md:order-2' : ''}`}>
                    <TourStopImage
                        src={stop.coverImage}
                        alt={stop.title}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
                <div className={`p-8 ${isReversed ? 'md:order-1' : ''}`}>
                    <h2 className="text-2xl font-bold text-primary mb-4">{stop.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{stop.description}</p>
                </div>
            </div>
        </Card>
    )
}

function TourStopSkeleton() {
    return (
         <Card className="overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="relative h-64 md:h-96 bg-muted animate-pulse">
                    <Skeleton className="w-full h-full" />
                </div>
                <div className="p-8">
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            </div>
        </Card>
    )
}
