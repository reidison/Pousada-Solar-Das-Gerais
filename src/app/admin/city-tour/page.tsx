
'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Loader2, Plus, Trash2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface TourSlide {
  id: string;
  imageUrl: string;
  storagePath: string;
}

export default function AdminCityTourPage() {
  const { firestore, storage } = useFirebase();
  const { toast } = useToast();
  
  const slidesRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'tour_slides');
  }, [firestore]);

  const { data: slides, isLoading } = useCollection<TourSlide>(slidesRef);
  
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !storage || !slidesRef) return;

    setIsUploading(true);
    toast({ title: "Enviando imagem...", description: "Por favor, aguarde." });

    try {
      const storagePath = `tour-slides/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, storagePath);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(slidesRef, {
        imageUrl: downloadURL,
        storagePath: storagePath,
      });

      toast({ title: "Sucesso!", description: "Imagem adicionada ao carrossel." });
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      toast({ variant: "destructive", title: "Erro", description: "Não foi possível enviar a imagem." });
    } finally {
      setIsUploading(false);
      // Reset file input
      if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (slideId: string, storagePath: string) => {
    if (!firestore || !storage) return;

    toast({ title: "Excluindo imagem..." });
    try {
      // Delete from Firestore
      await deleteDoc(doc(firestore, 'tour_slides', slideId));

      // Delete from Storage
      const storageRef = ref(storage, storagePath);
      await deleteObject(storageRef);

      toast({ title: "Sucesso!", description: "Imagem removida." });
    } catch (error) {
       console.error("Erro ao excluir:", error);
       toast({ variant: "destructive", title: "Erro", description: "Não foi possível remover a imagem." });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <Link href="/admin" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} className="mr-1" />
          Voltar ao Painel
        </Link>
        <h1 className="text-2xl font-bold text-primary">
          Gerenciar Carrossel do City Tour
        </h1>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Imagens do Carrossel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {isLoading && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
            
            {slides?.map((slide) => (
              <div key={slide.id} className="relative group aspect-video">
                <Image
                  src={slide.imageUrl}
                  alt="Slide do carrossel"
                  fill
                  className="object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                   <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button variant="destructive" size="icon">
                            <Trash2 size={20} />
                         </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                  Tem certeza que deseja excluir esta imagem? A ação não pode ser desfeita.
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(slide.id, slide.storagePath)}>
                                  Excluir
                              </AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}

            <button
              onClick={handleFileSelect}
              disabled={isUploading}
              className="aspect-video border-2 border-dashed border-muted-foreground/50 rounded-md flex flex-col items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : (
                <>
                  <Plus size={32} />
                  <span>Adicionar Imagem</span>
                </>
              )}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
            />
          </div>
          {slides?.length === 0 && !isLoading && (
            <p className="text-center text-muted-foreground py-8">
              Nenhuma imagem no carrossel. Adicione a primeira!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
