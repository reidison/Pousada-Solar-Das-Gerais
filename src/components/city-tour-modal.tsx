'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import type { WithId } from '@/firebase';
import { Plus, Trash2, ImagePlus, Loader2, X } from 'lucide-react';
import { ImageUploader } from '@/components/image-uploader';

interface CityTourSlide {
  text: string;
  images: string[];
  order: number;
}

export function CityTourModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { translations } = useLanguage();
  const t = translations.cityTourModal;
  const tInfoCard = translations.infoCards.cityTour;

  const firestore = useFirestore();
  const slidesRef = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'city_tour_slides'), orderBy('order')) : null),
    [firestore]
  );
  const { data: slides, isLoading } = useCollection<CityTourSlide>(slidesRef);
  
  const handleAddSlide = async () => {
    if (!firestore) return;
    const newOrder = slides ? slides.length : 0;
    await addDoc(collection(firestore, 'city_tour_slides'), {
      text: '',
      images: [],
      order: newOrder,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4 hover:bg-transparent hover:text-foreground">
          {tInfoCard.button}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-full h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-hidden relative py-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <Carousel
              opts={{
                align: 'start',
                loop: false,
              }}
              className="w-full h-full"
            >
              <CarouselContent className="h-full">
                {slides?.map((slide) => (
                  <CarouselItem key={slide.id} className="h-full basis-full">
                    <SlideEditor slide={slide} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>
        <DialogFooter className="border-t pt-4">
          <Button onClick={handleAddSlide} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            {t.addSlideButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SlideEditor({ slide }: { slide: WithId<CityTourSlide> }) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const { translations } = useLanguage();
  const t = translations.cityTourModal;
  const slideRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'city_tour_slides', slide.id) : null),
    [firestore, slide.id]
  );

  const [text, setText] = useState(slide.text);
  const [images, setImages] = useState<string[]>(slide.images);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setText(slide.text);
    setImages(slide.images);
  }, [slide]);

  const handleSave = async () => {
    if (!slideRef) return;
    setIsSaving(true);
    try {
      await updateDoc(slideRef, { text, images });
      toast({ title: t.saveSuccessToastTitle });
    } catch (e) {
      toast({ title: t.saveErrorToastTitle, variant: 'destructive' });
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDelete = async () => {
    if(!slideRef) return;
    try {
        await deleteDoc(slideRef);
        toast({ title: t.deleteSuccessToastTitle });
    } catch (e) {
        toast({ title: t.deleteErrorToastTitle, variant: 'destructive' });
        console.error(e);
    }
  }

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };
  
  const addImageField = () => {
    if(images.length < 3) {
        setImages([...images, '']);
    }
  }
  
  const removeImageField = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-4 overflow-y-auto p-2">
        <Textarea
          placeholder={t.placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[150px] text-base resize-none"
        />
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">{t.imagesTitle} ({images.length}/3)</h3>
            <Button size="sm" variant="ghost" onClick={addImageField} disabled={images.length >= 3}>
                <ImagePlus className="mr-2 h-4 w-4"/>
                {t.addImageButton}
            </Button>
          </div>
          {images.map((url, index) => (
            <div key={index} className="flex items-center gap-2">
              <ImageUploader
                imageUrl={url}
                onImageUrlChange={(newUrl) => handleImageChange(index, newUrl)}
              />
              <Button variant="ghost" size="icon" onClick={() => removeImageField(index)}>
                <X className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-shrink-0 flex justify-between items-center pt-4 mt-2 border-t">
        <AlertDialog>
            <AlertDialogTrigger asChild>
                 <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    {t.deleteSlideButton}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t.deleteConfirmTitle}</AlertDialogTitle>
                    <AlertDialogDescription>{t.deleteConfirmDescription}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{translations.usefulServicesModal.cancelButton}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>{translations.usefulServicesModal.deleteButton}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSaving ? t.savingButton : t.saveChangesButton}
        </Button>
      </div>
    </div>
  );
}