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
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import type { LodgeInfo } from '@/types/lodge-info';
import {
  Settings,
  Loader2,
  Phone,
  Coffee,
  MapPin,
  Instagram,
  Copyright,
  Upload,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import Image from 'next/image';

export function LodgeConfigModal({
  triggerVariant = 'outline',
  triggerClassName = '',
}: {
  triggerVariant?: 'outline' | 'ghost';
  triggerClassName?: string;
} = {}) {
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
    socialMedia: '@pousadasolardasgeraisop',
    copyrightText: '© 2026 Pousada Solar Das Gerais',
    heroImageUrl: '',
    footerImageUrl: '',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const footerFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (lodgeInfo && !isSaving) {
      setFormData({
        whatsappNumber: lodgeInfo.whatsappNumber || '',
        breakfastHours: lodgeInfo.breakfastHours || '',
        breakfastLocation: lodgeInfo.breakfastLocation || '',
        socialMedia: lodgeInfo.socialMedia || '@pousadasolardasgeraisop',
        copyrightText: lodgeInfo.copyrightText || '© 2026 Pousada Solar Das Gerais',
        heroImageUrl: lodgeInfo.heroImageUrl || '',
        footerImageUrl: lodgeInfo.footerImageUrl || '',
      });
    }
  }, [lodgeInfo, isSaving]);

  const handleHeroFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'Arquivo muito grande',
          description: 'Por favor, selecione uma imagem menor que 2MB.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            heroImageUrl: event.target!.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFooterFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'Arquivo muito grande',
          description: 'Por favor, selecione uma imagem menor que 2MB.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            footerImageUrl: event.target!.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!lodgeInfoRef) return;
    setIsSaving(true);

    const trimmedData = {
      whatsappNumber: (formData.whatsappNumber || '').trim(),
      breakfastHours: (formData.breakfastHours || '').trim(),
      breakfastLocation: (formData.breakfastLocation || '').trim(),
      socialMedia: (formData.socialMedia || '').trim(),
      copyrightText: (formData.copyrightText || '').trim(),
      heroImageUrl: (formData.heroImageUrl || '').trim(),
      footerImageUrl: (formData.footerImageUrl || '').trim(),
    };

    try {
      await setDoc(lodgeInfoRef, trimmedData, { merge: true });
      toast({
        title: t.successToastTitle,
        description: t.successToastDescription,
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível salvar as configurações.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={triggerVariant}
          size="sm"
          className={`gap-2 transition-colors ${triggerVariant === 'outline' ? 'shadow-sm border-primary/20 hover:border-primary/50' : ''} ${triggerClassName}`}
        >
          <Settings size={16} />
          {t.adminButton}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-4 max-h-[68vh] overflow-y-auto pr-1">
          {/* Hero Image Field */}
          <div className="grid gap-2 border border-slate-200/80 rounded-xl p-3.5 bg-slate-50/50">
            <Label className="text-primary font-semibold flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ImageIcon size={14} className="text-[#11314C]" />
                {t.heroImageLabel}
              </span>
              {formData.heroImageUrl && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, heroImageUrl: '' })}
                  className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1"
                >
                  <X size={12} /> Limpar
                </button>
              )}
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder={t.heroImagePlaceholder}
                value={formData.heroImageUrl}
                onChange={(e) => setFormData({ ...formData, heroImageUrl: e.target.value })}
                className="text-xs bg-white"
              />
              <input
                type="file"
                ref={heroFileInputRef}
                onChange={handleHeroFileUpload}
                accept="image/*"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => heroFileInputRef.current?.click()}
                className="shrink-0 gap-1.5 text-xs bg-white hover:bg-slate-100"
              >
                <Upload size={13} />
                <span>Upload</span>
              </Button>
            </div>
            {formData.heroImageUrl && (
              <div className="relative h-28 w-full rounded-lg overflow-hidden border border-slate-200 mt-1">
                <Image
                  src={formData.heroImageUrl}
                  alt="Prévia Hero"
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Footer Image/Icon Field */}
          <div className="grid gap-2 border border-slate-200/80 rounded-xl p-3.5 bg-slate-50/50">
            <Label className="text-primary font-semibold flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ImageIcon size={14} className="text-[#11314C]" />
                {t.footerImageLabel}
              </span>
              {formData.footerImageUrl && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, footerImageUrl: '' })}
                  className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1"
                >
                  <X size={12} /> Limpar
                </button>
              )}
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder={t.footerImagePlaceholder}
                value={formData.footerImageUrl}
                onChange={(e) => setFormData({ ...formData, footerImageUrl: e.target.value })}
                className="text-xs bg-white"
              />
              <input
                type="file"
                ref={footerFileInputRef}
                onChange={handleFooterFileUpload}
                accept="image/*"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => footerFileInputRef.current?.click()}
                className="shrink-0 gap-1.5 text-xs bg-white hover:bg-slate-100"
              >
                <Upload size={13} />
                <span>Upload</span>
              </Button>
            </div>
            {formData.footerImageUrl && (
              <div className="relative h-20 w-full rounded-lg overflow-hidden border border-slate-200 mt-1 bg-slate-900 flex items-center justify-center">
                <Image
                  src={formData.footerImageUrl}
                  alt="Prévia Rodapé"
                  fill
                  referrerPolicy="no-referrer"
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* WhatsApp */}
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

          {/* Horário Café */}
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

          {/* Local Café */}
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

          {/* Social Media */}
          <div className="grid gap-2">
            <Label htmlFor="socialMedia" className="text-primary font-semibold flex items-center gap-2">
              <Instagram size={14} />
              {t.socialMediaLabel}
            </Label>
            <Input
              id="socialMedia"
              placeholder={t.socialMediaPlaceholder}
              value={formData.socialMedia}
              onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })}
            />
          </div>

          {/* Copyright */}
          <div className="grid gap-2">
            <Label htmlFor="copyrightText" className="text-primary font-semibold flex items-center gap-2">
              <Copyright size={14} />
              {t.copyrightLabel}
            </Label>
            <Input
              id="copyrightText"
              placeholder={t.copyrightPlaceholder}
              value={formData.copyrightText}
              onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={() => setIsOpen(false)} disabled={isSaving}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || isInitialLoading}
            className="min-w-[120px]"
          >
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
