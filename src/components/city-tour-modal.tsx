'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
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
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc, query, orderBy, writeBatch } from 'firebase/firestore';
import type { WithId } from '@/firebase';
import { Plus, Trash2, ImagePlus, Loader2, X } from 'lucide-react';
import { ImageUploader } from '@/components/image-uploader';
import { Card, CardContent } from '@/components/ui/card';

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
  const { data: initialSlides, isLoading } = useCollection<CityTourSlide>(slidesRef);

  const [slides, setSlides] = useState<WithId<CityTourSlide>[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialSlides) {
      setSlides(initialSlides);
    }
  }, [initialSlides]);

  const handleSlideChange = (id: string, updatedSlide: Partial<CityTourSlide>) => {
    setSlides(prevSlides =>
      prevSlides.map(s => (s.id === id ? { ...s, ...updatedSlide } : s))
    );
  };
  
  const handleAddSlide = () => {
    const newOrder = slides.length > 0 ? Math.max(...slides.map(s => s.order)) + 1 : 0;
    const newSlide: WithId<CityTourSlide> = {
      id: `new-${Date.now()}`,
      text: '',
      images: [],
      order: newOrder,
    };
    setSlides(prevSlides => [...prevSlides, newSlide]);
  };
  
  const handleDeleteSlide = (id: string) => {
    setSlides(prevSlides => prevSlides.filter(s => s.id !== id));
  };
  
  const handleSaveChanges = async () => {
    if (!firestore) return;
    setIsSaving(true);
    
    const batch = writeBatch(firestore);
    
    // Determine which slides were deleted
    const initialIds = new Set(initialSlides?.map(s => s.id));
    const currentIds = new Set(slides.map(s => s.id));
    const deletedIds = [...initialIds].filter(id => !currentIds.has(id));

    deletedIds.forEach(id => {
        const docRef = doc(firestore, 'city_tour_slides', id);
        batch.delete(docRef);
    });

    // Update existing and add new slides
    slides.forEach((slide, index) => {
      const finalSlideData = {
        text: slide.text,
        images: slide.images,
        order: index, // Re-order based on current position
      };

      if (slide.id.startsWith('new-')) {
        // This is a new slide, create it
        const docRef = doc(collection(firestore, 'city_tour_slides'));
        batch.set(docRef, finalSlideData);
      } else {
        // This is an existing slide, update it
        const docRef = doc(firestore, 'city_tour_slides', slide.id);
        batch.update(docRef, finalSlideData);
      }
    });

    try {
      await batch.commit();
      toast({ title: t.saveSuccessToastTitle });
    } catch (e) {
      console.error(e);
      toast({ title: t.saveErrorToastTitle, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
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
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto space-y-6 p-1 pr-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            slides.map((slide) => (
              <SlideEditor 
                key={slide.id} 
                slide={slide} 
                onChange={handleSlideChange}
                onDelete={handleDeleteSlide}
              />
            ))
          )}
        </div>

        <DialogFooter className="border-t pt-4 flex-shrink-0 flex justify-between w-full">
           <Button onClick={handleAddSlide} variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            {t.addSlideButton}
          </Button>
          <Button onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSaving ? t.savingButton : t.saveChangesButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface SlideEditorProps {
    slide: WithId<CityTourSlide>;
    onChange: (id: string, updatedSlide: Partial<CityTourSlide>) => void;
    onDelete: (id: string) => void;
}

function SlideEditor({ slide, onChange, onDelete }: SlideEditorProps) {
  const { translations } = useLanguage();
  const t = translations.cityTourModal;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(slide.id, { text: e.target.value });
  };
  
  const handleImageChange = (index: number, newUrl: string) => {
    const newImages = [...slide.images];
    newImages[index] = newUrl;
    onChange(slide.id, { images: newImages });
  };
  
  const addImageField = () => {
    if (slide.images.length < 3) {
      onChange(slide.id, { images: [...slide.images, ''] });
    }
  };

  const removeImageField = (index: number) => {
    const newImages = slide.images.filter((_, i) => i !== index);
    onChange(slide.id, { images: newImages });
  };

  return (
    <Card className="p-4 relative group/slide">
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon" className="absolute -top-3 -right-3 h-7 w-7 rounded-full opacity-0 group-hover/slide:opacity-100 transition-opacity">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t.deleteConfirmTitle}</AlertDialogTitle>
                    <AlertDialogDescription>{t.deleteConfirmDescription}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{translations.usefulServicesModal.cancelButton}</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(slide.id)}>
                      {translations.usefulServicesModal.deleteButton}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <CardContent className="p-0 space-y-4">
            <Textarea
              placeholder={t.placeholder}
              value={slide.text}
              onChange={handleTextChange}
              className="min-h-[120px] text-base resize-none"
            />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">{t.imagesTitle} ({slide.images.length}/3)</h3>
                <Button size="sm" variant="ghost" onClick={addImageField} disabled={slide.images.length >= 3}>
                    <ImagePlus className="mr-2 h-4 w-4"/>
                    {t.addImageButton}
                </Button>
              </div>
              {slide.images.map((url, index) => (
                <div key={index} className="relative group/uploader">
                  <ImageUploader
                    imageUrl={url}
                    onImageUrlChange={(newUrl) => handleImageChange(index, newUrl)}
                  />
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover/uploader:opacity-100 transition-opacity"
                    onClick={() => removeImageField(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
        </CardContent>
    </Card>
  );
}
