'use client';

import React, { useState, useRef, ChangeEvent, useMemo } from 'react';
import { useCollection, useFirebase, useMemoFirebase, useUser } from '@/firebase';
import { collection, addDoc, doc, updateDoc, writeBatch, getDocs, orderBy, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowLeft, Upload, Loader2 } from 'lucide-react';
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
  const { user } = useUser(); // Hook para verificar o estado de autenticação
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);

  const slidesRef = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'city_tour_slides'), orderBy('order')) : null),
    [firestore]
  );

  const { data: slides, isLoading: isLoadingSlides } = useCollection<CityTourSlide>(slidesRef);
  
  const allImages = useMemo(() => {
    return slides?.flatMap(slide => slide.images.map(imgUrl => ({ imgUrl, slideId: slide.id }))) ?? [];
  }, [slides]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!storage || !firestore || !user) { // Garante que o usuário esteja autenticado
      toast({ title: 'Erro', description: 'Serviços do Firebase não estão prontos ou usuário não autenticado.', variant: 'destructive' });
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;
    
    let targetSlide = slides?.[0];
    if (!targetSlide) {
        try {
            const newSlideRef = await addDoc(collection(firestore, 'city_tour_slides'), {
                text: "Imagens da galeria",
                images: [],
                order: 1
            });
            targetSlide = { id: newSlideRef.id, text: "Imagens da galeria", images: [], order: 1 };
        } catch (error) {
            console.error("Erro ao criar o primeiro slide:", error);
            toast({ title: 'Erro ao criar galeria', description: 'Não foi possível inicializar a galeria.', variant: 'destructive' });
            return;
        }
    }

    if (targetSlide.images.length >= 20) {
      toast({ title: "Limite alcançado", description: "Máximo de 20 imagens na galeria.", variant: 'destructive' });
      return;
    }

    setIsUploading(true);

    try {
      const storageRef = ref(storage, `city-tour-images/${targetSlide.id}/${Date.now()}_${file.name}`);
      const uploadResult = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(uploadResult.ref);

      const newImages = [...targetSlide.images, downloadURL];
      await updateDoc(doc(firestore, 'city_tour_slides', targetSlide.id), { images: newImages });

      toast({ title: 'Imagem adicionada com sucesso!' });
    } catch (error) {
      console.error("Erro no upload da imagem:", error);
      toast({ title: 'Erro ao enviar imagem', description: 'Verifique as permissões do Storage e se está autenticado.', variant: 'destructive' });
    } finally {
      setIsUploading(false);
      if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = async (imgUrlToRemove: string, slideId: string) => {
    if (!firestore) return;
    
    const slideToUpdate = slides?.find(s => s.id === slideId);
    if (!slideToUpdate) return;

    const newImages = slideToUpdate.images.filter((img) => img !== imgUrlToRemove);
    await updateDoc(doc(firestore, 'city_tour_slides', slideId), { images: newImages });
    
    toast({ title: 'Imagem removida!' });
  };

  const deleteGallery = async () => {
    if (!firestore) return;

    const batch = writeBatch(firestore);
    const docsSnapshot = await getDocs(collection(firestore, "city_tour_slides"));
    docsSnapshot.forEach(d => batch.delete(d.ref));
    
    await batch.commit();
    toast({ title: "Galeria excluída!" });
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft size={16} className="mr-1" />
        Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-2">City Tour – Galeria de Imagens</h1>
      <p className="text-muted-foreground mb-8">Veja e gerencie as imagens da galeria.</p>


      <Card>
        <CardContent className="p-4 md:p-6">
            {isLoadingSlides ? (
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />)}
                 </div>
            ) : allImages.length === 0 ? (
                <div className="p-8 border rounded-lg text-center bg-background">
                    <p className="mb-4">Nenhuma imagem na galeria.</p>
                    <p className="text-sm text-muted-foreground">Use o botão "Adicionar Imagem" para começar.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {allImages.map(({ imgUrl, slideId }) => (
                        <div key={imgUrl} className="relative group aspect-square">
                             <Image
                                src={imgUrl}
                                alt="Imagem do City Tour"
                                fill
                                className="object-cover rounded-lg"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            />
                            <button
                                onClick={() => removeImage(imgUrl, slideId)}
                                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Remover imagem"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </CardContent>
      </Card>
     

      <div className="mt-8 p-6 border rounded-lg bg-card">
        <h3 className="font-semibold mb-4">Gerenciar galeria</h3>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading || !user}>
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
          <Button variant="destructive" onClick={deleteGallery} disabled={allImages.length === 0}>
            <Trash2 className="mr-2" />
            Excluir galeria inteira
          </Button>
        </div>
        {!user && <p className="text-xs text-muted-foreground mt-2">Carregando usuário para permitir upload...</p>}
      </div>
    </div>
  );
}
