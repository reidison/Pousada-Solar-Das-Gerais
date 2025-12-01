'use client';

import React, { useState, useEffect } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc, writeBatch, getDocs, orderBy, query } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, ArrowLeft, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
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

interface CityTourSlide {
  text: string;
  images: string[];
  order: number;
}

export default function CityTourPage() {
  const firestore = useFirestore();
  const { toast } = useToast();

  const slidesRef = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'city_tour_slides'), orderBy('order')) : null),
    [firestore]
  );
  const { data: slides, isLoading } = useCollection<CityTourSlide>(slidesRef);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [newImageUrl, setNewImageUrl] = useState("");

  const goToNext = () => {
    setCurrentSlide((prev) => (slides && prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (slides && prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  const addImage = async () => {
      if (!firestore || !slides || !slides[currentSlide] || !newImageUrl.trim()) return;
      
      const slide = slides[currentSlide];
      // Note: A lógica original limitava a 3 imagens. O novo layout só exibe 1, mas manteremos o array.
      // Se a intenção é ter múltiplas imagens por slide, o JSX precisaria de outro carrossel interno.
      // Por simplicidade, vamos substituir a imagem existente ou adicionar se não houver nenhuma.
      const updatedImages = [newImageUrl.trim()]; // Substitui ou adiciona a imagem
      const slideRef = doc(firestore, 'city_tour_slides', slide.id);
      
      try {
          await updateDoc(slideRef, { images: updatedImages });
          setNewImageUrl("");
          toast({ title: 'Imagem adicionada!' });
      } catch (error) {
          console.error("Erro ao adicionar imagem:", error);
          toast({ title: "Erro ao salvar a imagem", variant: 'destructive' });
      }
  };

  const deleteAllImages = async () => {
    if (!firestore) return;
  
    try {
      const batch = writeBatch(firestore);
      // Aqui, vamos deletar a coleção de slides inteira, que parece ser a intenção de "Excluir galeria".
      const slidesSnapshot = await getDocs(collection(firestore, 'city_tour_slides'));
      if (slidesSnapshot.empty) {
        toast({ title: "A galeria já está vazia." });
        return;
      }
      slidesSnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      setCurrentSlide(0); // Reset
      toast({ title: "Galeria excluída com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir galeria:", error);
      toast({ title: "Erro ao excluir a galeria.", variant: "destructive" });
    }
  };

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
              {/* Carousel Display */}
              <div id="carousel-images" className="carousel-images relative h-64 md:h-96 bg-muted flex items-center justify-center">
                 {activeSlide.images && activeSlide.images.length > 0 ? (
                    // Usando a tag <img> para compatibilidade com URLs do Imgur sem extensão
                    <img src={activeSlide.images[0]} alt={`Slide ${currentSlide + 1}`} className="w-full h-full object-contain"/>
                 ) : (
                    <div className="text-muted-foreground flex flex-col items-center">
                        <ImageIcon size={48} />
                        <p>Nenhuma imagem para este slide</p>
                    </div>
                 )}
              </div>

              {/* Carousel Navigation */}
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
            <p className="text-muted-foreground mt-2">Use os controles abaixo para começar a criar sua galeria.</p>
        </div>
      )}

      {/* Botões de gerenciamento */}
      <div className="mt-8 p-6 border rounded-lg bg-card">
        <h3 className="font-semibold mb-4">Gerenciar Galeria</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            id="image-url"
            type="text"
            placeholder="Cole aqui a URL da imagem do Imgur"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            disabled={!slides || slides.length === 0}
          />
          <Button onClick={addImage} disabled={!slides || slides.length === 0}>
            Adicionar imagem
          </Button>
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
