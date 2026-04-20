'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';
import { useDoc, useFirestore, useMemoFirebase, useFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { LodgeInfo } from '@/types/lodge-info';
import { Settings, Loader2, Upload, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export function LodgeConfigModal() {
  const { storage } = useFirebase();
  const firestore = useFirestore();
  const { toast } = useToast();
  const { translations } = useLanguage();
  const t = translations.lodgeConfigModal;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const lodgeInfoRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'lodge_info', 'main') : null),
    [firestore]
  );
  const { data: lodgeInfo, isLoading } = useDoc<LodgeInfo>(lodgeInfoRef);

  const [formData, setFormData] = useState({
    logoUrl: '',
    whatsappNumber: '',
    breakfastHours: '',
    breakfastLocation: '',
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (lodgeInfo) {
      setFormData({
        logoUrl: lodgeInfo.logoUrl || '',
        whatsappNumber: lodgeInfo.whatsappNumber || '',
        breakfastHours: lodgeInfo.breakfastHours || '',
        breakfastLocation: lodgeInfo.breakfastLocation || '',
      });
    }
  }, [lodgeInfo]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !storage) return;

    setIsUploading(true);
    try {
      const storageRef = ref(storage, `lodge/logo_${Date.now()}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setFormData(prev => ({ ...prev, logoUrl: downloadURL }));
      toast({
        title: "Upload concluído",
        description: "A imagem do logo foi carregada com sucesso.",
      });
    } catch (error) {
      console.error("Erro no upload:", error);
      toast({
        variant: "destructive",
        title: "Erro no upload",
        description: "Não foi possível carregar a imagem.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!lodgeInfoRef) return;
    setIsSaving(true);
    
    try {
      await setDoc(lodgeInfoRef, formData, { merge: true });
      toast({
        title: t.successToastTitle,
        description: t.successToastDescription,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível salvar as configurações.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings size={16} />
          {t.adminButton}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>
            {t.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-3">
            <Label>{t.logoLabel}</Label>
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 border rounded-md overflow-hidden bg-muted flex items-center justify-center">
                {formData.logoUrl ? (
                  <Image 
                    src={formData.logoUrl} 
                    alt="Logo Preview" 
                    fill 
                    className="object-contain"
                  />
                ) : (
                  <ImageIcon className="text-muted-foreground" size={32} />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button 
                  type="button" 
                  variant="secondary" 
                  size="sm" 
                  className="w-full gap-2"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                  {isUploading ? "Enviando..." : "Alterar Logotipo"}
                </Button>
                <p className="text-[10px] text-muted-foreground text-center">
                  Recomendado: PNG ou JPG com fundo transparente ou branco.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="whatsapp">{t.whatsappLabel}</Label>
            <Input
              id="whatsapp"
              placeholder={t.whatsappPlaceholder}
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="breakfastHours">{t.breakfastHoursLabel}</Label>
            <Input
              id="breakfastHours"
              placeholder={t.breakfastHoursPlaceholder}
              value={formData.breakfastHours}
              onChange={(e) => setFormData({ ...formData, breakfastHours: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="breakfastLocation">{t.breakfastLocationLabel}</Label>
            <Input
              id="breakfastLocation"
              placeholder={t.breakfastLocationPlaceholder}
              value={formData.breakfastLocation}
              onChange={(e) => setFormData({ ...formData, breakfastLocation: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={isSaving || isLoading || isUploading}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t.savingButton}
              </>
            ) : (
              t.saveButton
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}