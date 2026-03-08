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
import { Settings, Loader2 } from 'lucide-react';

export function LodgeConfigModal() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const { translations } = useLanguage();
  const t = translations.lodgeConfigModal;

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
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="logoUrl">{t.logoLabel}</Label>
            <Input
              id="logoUrl"
              placeholder={t.logoPlaceholder}
              value={formData.logoUrl}
              onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
            />
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
          <Button onClick={handleSave} disabled={isSaving || isLoading}>
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
