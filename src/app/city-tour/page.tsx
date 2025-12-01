'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useCollection, useFirebase, useMemoFirebase, useUser } from '@/firebase';
import { collection, addDoc, doc, updateDoc, writeBatch, getDocs, orderBy, query } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, ArrowLeft, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";

interface CityTourSlide {
  id: string;
  text: string;
  images: string[]; // URLs do Imgur
  order: number;
}

export default function CityTourCarousel() {
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const { user } = useUser();
  const [newImageUrl, setNewImageUrl] = useState('');

  const slidesRef = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'city_tour_slides'), orderBy('order')) : null),
    [firestore]
  );

  const { data: slides } = useCollection<CityTourSlide>(slidesRef);

  const [currentSlide, setCurrentSlide] = useState(0);

  const goNext = () => {
    if (!slides) return;
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goPrev = () => {
    if (!slides) return;
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // 🟢 ADICIONAR imagem do IMGUR
  const addImgurLink = async () => {
    if (!firestore || !slides || !slides[currentSlide] || !newImageUrl) return;
    const link = newImageUrl.trim();

    if (!link.includes('imgur.com')) {
      toast({ title: 'URL inválida', description: 'Insira apenas URLs diretas do Imgur.', variant: 'destructive' });
      return;
    }

    const slide = slides[currentSlide];
    if (slide.images.length >= 3) {
      toast({ title: "Limite alcançado", description: "Máximo de 3 imagens por slide." });
      return;
    }

    try {
      const newImages = [...slide.images, link];
      await updateDoc(doc(firestore, 'city_tour_slides', slide.id), { images: newImages });
      toast({ title: 'Imagem adicionada!' });
    } catch (e) {
      toast({ title: 'Erro ao adicionar', variant: 'destructive' });
    }

    setNewImageUrl('');
  };

  // 🟢 REMOVER imagem individual
  const removeImage = async (imgUrl: string) => {
    if (!firestore || !slides) return;

    const slide = slides[currentSlide];
    const newImages = slide.images.filter((img) => img !== imgUrl);

    await updateDoc(doc(firestore, 'city_tour_slides', slide.id), { images: newImages });
    toast({ title: 'Imagem removida!' });
  };

  // 🟢 REMOVER galeria inteira
  const deleteGallery = async () => {
    if (!firestore) return;

    const batch = writeBatch(firestore);
    const docs = await getDocs(collection(firestore, "city_tour_slides"));

    docs.forEach(d => batch.delete(d.ref));

    await batch.commit();
    setCurrentSlide(0);
    toast({ title: "Galeria excluída!" });
  };

  // 🟢 Criar primeiro slide
  const createFirst = async () => {
    if (!firestore) return;
    await addDoc(collection(firestore, 'city_tour_slides'), {
      text: "Primeiro slide! Adicione imagens do Imgur abaixo.",
      images: [],
      order: 1
    });
  };

  const active = slides?.[currentSlide];

  return (
    <div className="container mx-auto px-4 py-8">

      <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft size={16} className="mr-1" />
        Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-2">City Tour – Carrossel</h1>

      {!slides || slides.length === 0 ? (
        <div className="p-8 border rounded-lg text-center">
          <p>Nenhum slide.</p>
          <Button onClick={createFirst}>Criar primeiro slide</Button>
        </div>
      ) : (
        <Card className="overflow-hidden">
          <CardContent className="p-0">

            {/* IMAGENS */}
            <div className="relative h-80 md:h-96 bg-black flex items-center justify-center">
              <div className="flex gap-4 p-4">
                {active?.images.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      className="w-52 h-52 object-cover rounded-lg shadow-md"
                      alt={`Imagem ${index + 1}`}
                    />

                    <button
                      onClick={() => removeImage(url)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                {active?.images.length === 0 && (
                  <p className="text-white text-sm opacity-.80">Nenhuma imagem neste slide</p>
                )}
              </div>

              {/* SETAS */}
              <button onClick={goPrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full">
                <ChevronLeft />
              </button>

              <button onClick={goNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full">
                <ChevronRight />
              </button>
            </div>

            <div className="p-4 border-t">
              <p className="font-semibold">Slide {currentSlide + 1}/{slides.length}</p>
              <p className="text-muted-foreground mt-1">{active?.text}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ----------------------- GERENCIAR GALERIA ------------------------ */}
      <div className="mt-8 p-6 border rounded-lg bg-card">
        <h3 className="font-semibold mb-4">Gerenciar imagens</h3>

        <div className="flex flex-col gap-4">
          {/* ADICIONAR LINK DO IMGUR */}
          <Input
            placeholder="Cole aqui a URL direta do Imgur (ex: https://i.imgur.com/abc123.jpg)"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
          />

          <div className="flex gap-4">
            <Button onClick={addImgurLink}>
              <Send size={16} className="mr-2" />
              Enviar
            </Button>
            <Button variant="destructive" onClick={deleteGallery}>
              <Trash2 size={16} className="mr-2" />
              Excluir galeria inteira
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
