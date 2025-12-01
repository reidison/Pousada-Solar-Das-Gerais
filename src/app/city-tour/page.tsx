'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useCollection, useFirebase, useMemoFirebase, useUser } from '@/firebase';
import { collection, addDoc, doc, updateDoc, writeBatch, getDocs, orderBy, query } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, ArrowLeft, ChevronLeft, ChevronRight, Image as ImageIcon, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';
import Image from 'next/image';

interface CityTourSlide {
  text: string;
  images: string[];
  order: number;
}

export default function CityTourPage() {
  const { firestore, storage } = useFirebase();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();

  const slidesRef = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'city_tour_slides'), orderBy('order')) : null),
    [firestore]
  );
  const { data: slides, isLoading: isLoadingSlides } = useCollection<CityTourSlide>(slidesRef);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (slides && slides.length > 0 && currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [slides, currentSlide]);


  const goToNext = () => {
    setCurrentSlide((prev) => (slides && prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (slides && prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!storage || !firestore || !slides || !slides[currentSlide] || !event.target.files || event.target.files.length === 0) {
      return;
    }

    if (!user) {
      toast({ title: 'Usuário não autenticado', description: 'Por favor, aguarde e tente novamente.', variant: 'destructive' });
      return;
    }

    const file = event.target.files[0];
    const slide = slides[currentSlide];

    setIsUploading(true);
    toast({ title: 'Enviando imagem...' });

    try {
      // Create a storage reference
      const storageRef = ref(storage, `city-tour-slides/${slide.id}/${file.name}`);
      
      // Upload file
      const uploadResult = await uploadBytes(storageRef, file);
      
      // Get download URL
      const downloadURL = await getDownloadURL(uploadResult.ref);

      // Update Firestore document
      const updatedImages = [downloadURL];
      const slideRef = doc(firestore, 'city_tour_slides', slide.id);
      await updateDoc(slideRef, { images: updatedImages });

      toast({ title: 'Imagem adicionada com sucesso!' });
    } catch (error: any) {
      console.error("Erro ao fazer upload da imagem:", error);
      toast({ title: "Erro ao salvar a imagem", description: error.message || 'Não foi possível completar o upload.', variant: 'destructive' });
    } finally {
      setIsUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const deleteAllImages = async () => {
    if (!firestore) return;
  
    try {
      const batch = writeBatch(firestore);
      const slidesSnapshot = await getDocs(collection(firestore, 'city_tour_slides'));
      
      if (slidesSnapshot.empty) {
        toast({ title: "A galeria já está vazia." });
        return;
      }
      
      slidesSnapshot.docs.forEach((doc) => {
        // Here you would also delete files from storage, which is more complex and requires listing files.
        // For now, we just delete the firestore docs.
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      setCurrentSlide(0); 
      toast({ title: "Galeria excluída com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir galeria:", error);
      toast({ title: "Erro ao excluir a galeria.", variant: "destructive" });
    }
  };
  
  const createFirstSlide = async () => {
      if (!firestore) return;
      try {
          await addDoc(collection(firestore, 'city_tour_slides'), {
              text: 'Este é o seu primeiro slide. Edite o texto e adicione uma imagem!',
              images: [],
              order: 1,
          });
          toast({title: 'Primeiro slide criado!'});
      } catch (error) {
          console.error("Erro ao criar o primeiro slide:", error);
          toast({ title: "Erro ao criar slide.", variant: "destructive" });
      }
  };

  const isLoading = isLoadingSlides || isUserLoading;

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  const activeSlide = slides?.[currentSlide];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft size={16} className="mr-1" />
        Voltar
      </Link>
      <h1 className="text-3xl font-bold mb-2">Programação do City Tour</h1>
      <p className="text-muted-foreground mb-8">Navegue pelos slides do City Tour.</p>
      
      {slides && slides.length > 0 && activeSlide ? (
        <Card id="carousel-container" className="carousel overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <div id="carousel-images" className="carousel-images relative h-64 md:h-96 bg-muted flex items-center justify-center">
                 {activeSlide.images && activeSlide.images.length > 0 ? (
                    <Image 
                      src={activeSlide.images[0]} 
                      alt={`Slide ${currentSlide + 1}`} 
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                 ) : (
                    <div className="text-muted-foreground flex flex-col items-center">
                        <ImageIcon size={48} />
                        <p>Nenhuma imagem para este slide</p>
                    </div>
                 )}
              </div>

              <div className="absolute top-1/2 left-2 right-2 flex -translate-y-1/2 transform justify-between">
                <Button id="prev-btn" size="icon" variant="secondary" onClick={goToPrev} className="rounded-full h-10 w-10">
                  <ChevronLeft />
                </Button>
                <Button id="next-btn" size="icon" variant="secondary" onClick={goToNext} className="rounded-full h-10 w-10">
                  <ChevronRight />
                </Button>
              </div>
            </div>
             <div className="p-4 border-t">
                <p className="font-semibold text-lg">{`Slide ${currentSlide + 1}/${slides.length}`}</p>
                <p className="text-muted-foreground mt-2 min-h-[40px]">{activeSlide.text}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4 border-2 border-dashed rounded-lg">
            <p className="text-lg font-medium">Nenhum slide na programação do City Tour.</p>
            <p className="text-muted-foreground mt-2">Crie o primeiro slide para começar a montar sua galeria.</p>
            <Button onClick={createFirstSlide} className="mt-4">Criar Primeiro Slide</Button>
        </div>
      )}

      <div className="mt-8 p-6 border rounded-lg bg-card">
        <h3 className="font-semibold mb-4">Gerenciar Galeria</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="outline" disabled={!slides || slides.length === 0 || isUploading}>
            <label htmlFor="image-upload">
              {isUploading ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Upload size={16} className="mr-2" />}
              {isUploading ? 'Enviando...' : 'Enviar Imagem'}
            </label>
          </Button>
          <Input 
            id="image-upload"
            type="file"
            accept="image/png, image/jpeg, image/gif"
            className="hidden"
            onChange={handleFileChange}
            disabled={!slides || slides.length === 0 || isUploading}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={!slides || slides.length === 0}>
                    <Trash2 size={16} className="mr-2" />
                    Excluir galeria
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja excluir toda a galeria? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteAllImages}>Sim, excluir tudo</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </div>
      </div>
    </div>
  );
}
