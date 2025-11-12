'use client';

import React, { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';

export function RegulationModal() {
  const [regulationText, setRegulationText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { translations } = useLanguage();
  const t = translations.regulationModal;
  const tInfoCard = translations.infoCards.regulation;

  const handleConfirm = () => {
    // Here you would typically save the regulationText to your database.
    console.log('Regulamento Salvo:', regulationText);

    toast({
      title: t.successToastTitle,
      description: t.successToastDescription,
    });

    setIsOpen(false); // Fecha o modal
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4 hover:bg-transparent hover:text-foreground">
          {tInfoCard.button}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>
            {t.description}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder={t.placeholder}
            value={regulationText}
            onChange={(e) => setRegulationText(e.target.value)}
            className="min-h-[300px]"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleConfirm}>{t.confirmButton}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
