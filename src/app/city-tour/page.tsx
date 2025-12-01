'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { useCollection, useFirebase, useMemoFirebase, useUser } from '@/firebase';
import { collection, addDoc, doc, updateDoc, writeBatch, getDocs, orderBy, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, ArrowLeft, ChevronLeft, ChevronRight, Upload, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';

interface CityTourSlide {
  id: string;
  text: string;
  images: string[];
  order: number;
}

export default function CityTourPage() {
  const { firestore, storage } = useFirebase();
  const { toast } = useToast();
  const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const slidesRef = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'city_tour_slides'), orderBy('order')) : null),
    [firestore]
  );

  const { data: slides, isLoading: isLoadingSlides } = useCollection<CityTourSlide>(slidesRef);

  const activeSlide = slides?.[currentSlide];

  const goNext = () => {
    if (!slides) return;
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goPrev = () => {
    if (!slides) return;
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!storage || !firestore || !activeSlide || !user) {
      toast({ title: 'Erro', description: 'Serviços do Firebase não estão prontos.', variant: 'destructive' });
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    if (activeSlide.images.length >= 3) {
      toast({ title: "Limite alcançado", description: "Máximo de 3 imagens por slide.", variant: 'destructive' });
      return;
    }

    setIsUploading(true);

    try {
      const storageRef = ref(storage, `city-tour-slides/${activeSlide.id}/${Date.now()}_${file.name}`);
      const uploadResult = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(uploadResult.ref);

      const newImages = [...activeSlide.images, downloadURL];
      await updateDoc(doc(firestore, 'city_tour_slides', activeSlide.id), { images: newImages });

      toast({ title: 'Imagem adicionada com sucesso!' });
    } catch (error) {
      console.error("Erro no upload da imagem:", error);
      toast({ title: 'Erro ao enviar imagem', description: 'Não foi possível fazer o upload da imagem. Tente novamente.', variant: 'destructive' });
    } finally {
      setIsUploading(false);
      // Reset file input
      if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = async (imgUrl: string) => {
    if (!firestore || !activeSlide) return;

    const newImages = activeSlide.images.filter((img) => img !== imgUrl);
    await updateDoc(doc(firestore, 'city_tour_slides', activeSlide.id), { images: newImages });
    
    // Note: This does not delete the image from Firebase Storage to avoid complexity.
    // A production app might need a cleanup function for orphaned images.
    toast({ title: 'Imagem removida!' });
  };

  const deleteGallery = async () => {
    if (!firestore) return;

    const batch = writeBatch(firestore);
    const docs = await getDocs(collection(firestore, "city_tour_slides"));

    docs.forEach(d => batch.delete(d.ref));
    // Also consider deleting files from Storage, which requires more complex logic.

    await batch.commit();
    setCurrentSlide(0);
    toast({ title: "Galeria excluída!" });
  };

  const createFirst = async () => {
    if (!firestore) return;
    await addDoc(collection(firestore, 'city_tour_slides'), {
      text: "Primeiro slide! Adicione imagens abaixo.",
      images: [],
      order: 1
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft size={16} className="mr-1" />
        Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-2">City Tour – Carrossel</h1>

      {!slides || slides.length === 0 ? (
        <div className="p-8 border rounded-lg text-center">
          <p className="mb-4">{isLoadingSlides ? 'Carregando slides...' : 'Nenhum slide.'}</p>
          {!isLoadingSlides && <Button onClick={createFirst}>Criar primeiro slide</Button>}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-80 md:h-96 bg-black flex items-center justify-center">
              <div className="flex gap-4 p-4 overflow-x-auto">
                {activeSlide?.images.map((url, index) => (
                  <div key={url} className="relative flex-shrink-0">
                    <Image
                      src={url}
                      width={208}
                      height={208}
                      className="w-52 h-52 object-cover rounded-lg shadow-md"
                      alt={`Imagem do Slide ${currentSlide + 1} - ${index + 1}`}
                    />
                    <button
                      onClick={() => removeImage(url)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 transition-opacity hover:opacity-80"
                      aria-label="Remover imagem"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {activeSlide?.images.length === 0 && (
                  <p className="text-white text-sm opacity-80">Nenhuma imagem neste slide</p>
                )}
              </div>
              {slides.length > 1 && (
                <>
                  <button onClick={goPrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
                    <ChevronLeft />
                  </button>
                  <button onClick={goNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>
            <div className="p-4 border-t">
              <p className="font-semibold">Slide {currentSlide + 1}/{slides.length}</p>
              <p className="text-muted-foreground mt-1">{activeSlide?.text}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 p-6 border rounded-lg bg-card">
        <h3 className="font-semibold mb-4">Gerenciar galeria</h3>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading || !activeSlide}>
            {isUploading ? <Loader2 className="mr-2 animate-spin" /> : <Upload className="mr-2" />}
            {isUploading ? 'Enviando...' : 'Adicionar Imagem'}
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, image/gif"
          />
          <Button variant="destructive" onClick={deleteGallery} disabled={!slides || slides.length === 0}>
            <Trash2 className="mr-2" />
            Excluir galeria inteira
          </Button>
        </div>
      </div>
    </div>
  );
}
