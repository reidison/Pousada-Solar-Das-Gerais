'use client';

import React, { useState, useEffect } from 'react';
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
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import type { LodgeInfo } from '@/types/lodge-info';
import { Settings, Loader2, Phone, Coffee, MapPin } from 'lucide-react';

export function LodgeConfigModal() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const { translations } = useLanguage();
  const t = translations.lodgeConfigModal;

  const lodgeInfoRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'lodge_info', 'main') : null),
    [firestore]
  );
  const { data: lodgeInfo, isLoading: isInitialLoading } = useDoc<LodgeInfo>(lodgeInfoRef);

  const [formData, setFormData] = useState({
    whatsappNumber: '',
    breakfastHours: '',
    breakfastLocation: '',
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (lodgeInfo && !isSaving) {
      setFormData({
        whatsappNumber: lodgeInfo.whatsappNumber || '',
        breakfastHours: lodgeInfo.breakfastHours || '',
        breakfastLocation: lodgeInfo.breakfastLocation || '',
      });
    }
  }, [lodgeInfo, isSaving]);

  const handleSave = async () => {
    if (!lodgeInfoRef) return;
    setIsSaving(true);
    
    const trimmedData = {
      whatsappNumber: (formData.whatsappNumber || '').trim(),
      breakfastHours: (formData.breakfastHours || '').trim(),
      breakfastLocation: (formData.breakfastLocation || '').trim(),
    };
    
    try {
      await setDoc(lodgeInfoRef, trimmedData, { merge: true });
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
        <Button variant="outline" size="sm" className="gap-2 shadow-sm border-primary/20 hover:border-primary/50 transition-colors">
          <Settings size={16} />
          {t.adminButton}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>
            {t.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label htmlFor="whatsapp" className="text-primary font-semibold flex items-center gap-2">
              <Phone size={14} />
              {t.whatsappLabel}
            </Label>
            <Input
              id="whatsapp"
              placeholder={t.whatsappPlaceholder}
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="breakfastHours" className="text-primary font-semibold flex items-center gap-2">
              <Coffee size={14} />
              {t.breakfastHoursLabel}
            </Label>
            <Input
              id="breakfastHours"
              placeholder={t.breakfastHoursPlaceholder}
              value={formData.breakfastHours}
              onChange={(e) => setFormData({ ...formData, breakfastHours: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="breakfastLocation" className="text-primary font-semibold flex items-center gap-2">
              <MapPin size={14} />
              {t.breakfastLocationLabel}
            </Label>
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
          <Button onClick={handleSave} disabled={isSaving || isInitialLoading} className="min-w-[120px]">
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
