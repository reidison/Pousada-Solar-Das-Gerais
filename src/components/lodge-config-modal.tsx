
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
import { Settings, Loader2, Upload, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

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
  const { data: lodgeInfo, isLoading: isInitialLoading } = useDoc<LodgeInfo>(lodgeInfoRef);

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
    if (lodgeInfo && !isUploading && !isSaving) {
      setFormData({
        logoUrl: lodgeInfo.logoUrl || '',
        whatsappNumber: lodgeInfo.whatsappNumber || '',
        breakfastHours: lodgeInfo.breakfastHours || '',
        breakfastLocation: lodgeInfo.breakfastLocation || '',
      });
    }
  }, [lodgeInfo, isUploading, isSaving]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !storage) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Arquivo muito grande",
        description: "O logotipo deve ter no máximo 2MB.",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      const storageRef = ref(storage, `lodge/logo_${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setFormData(prev => ({ ...prev, logoUrl: downloadURL }));
      
      toast({
        title: "Upload concluído!",
        description: "A imagem foi carregada com sucesso.",
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

  const processImgurUrl = (url: string) => {
    if (url.includes('imgur.com/') && !url.includes('i.imgur.com')) {
      const id = url.split('/').pop()?.replace('a/', '');
      if (id && id.length > 3) return `https://i.imgur.com/${id}.png`;
    }
    return url;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 shadow-sm border-primary/20 hover:border-primary/50 transition-colors">
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
            <Label className="text-primary font-semibold flex items-center gap-2">
              <ImageIcon size={16} />
              {t.logoLabel}
            </Label>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative h-20 w-20 border rounded-md overflow-hidden flex items-center justify-center bg-white shadow-sm flex-shrink-0">
                  {formData.logoUrl ? (
                    <img 
                      src={processImgurUrl(formData.logoUrl)} 
                      alt="Logo Preview" 
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://i.imgur.com/NDqUUNp.png";
                      }}
                    />
                  ) : (
                    <ImageIcon className="text-muted-foreground opacity-20" size={32} />
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                      <Loader2 className="text-primary animate-spin" size={20} />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 w-full space-y-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <LinkIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="URL da logo..."
                        className="pl-8 h-9 text-xs"
                        value={formData.logoUrl}
                        onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="secondary" 
                      size="sm" 
                      className="h-9 px-3"
                      disabled={isUploading}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                    </Button>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                  />
                  <p className="text-[10px] text-muted-foreground leading-tight italic">
                    Use links diretos (.png/.jpg) ou faça upload. Links do Imgur são convertidos automaticamente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="whatsapp" className="text-primary font-semibold">{t.whatsappLabel}</Label>
            <Input
              id="whatsapp"
              placeholder={t.whatsappPlaceholder}
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="breakfastHours" className="text-primary font-semibold">{t.breakfastHoursLabel}</Label>
            <Input
              id="breakfastHours"
              placeholder={t.breakfastHoursPlaceholder}
              value={formData.breakfastHours}
              onChange={(e) => setFormData({ ...formData, breakfastHours: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="breakfastLocation" className="text-primary font-semibold">{t.breakfastLocationLabel}</Label>
            <Input
              id="breakfastLocation"
              placeholder={t.breakfastLocationPlaceholder}
              value={formData.breakfastLocation}
              onChange={(e) => setFormData({ ...formData, breakfastLocation: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={() => setIsOpen(false)} disabled={isSaving}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving || isInitialLoading || isUploading} className="min-w-[120px]">
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
