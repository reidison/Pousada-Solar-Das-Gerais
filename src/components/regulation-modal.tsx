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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';
import { useDoc, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import type { LodgeInfo } from '@/types/lodge-info';
import { ScrollArea } from '@/components/ui/scroll-area';

export function RegulationModal() {
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const { translations } = useLanguage();
  const t = translations.regulationModal;
  const tInfoCard = translations.infoCards.regulation;

  const isAdmin = user && !user.isAnonymous;

  const lodgeInfoRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'lodge_info', 'main') : null),
    [firestore]
  );
  const { data: lodgeInfo, isLoading } = useDoc<LodgeInfo>(lodgeInfoRef);

  const [regulationText, setRegulationText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (lodgeInfo?.regulation) {
      setRegulationText(lodgeInfo.regulation);
    }
  }, [lodgeInfo]);

  const handleConfirm = async () => {
    if (!lodgeInfoRef || !isAdmin) return;

    setIsSaving(true);
    try {
      await updateDoc(lodgeInfoRef, {
        regulation: regulationText,
      });

      toast({
        title: t.successToastTitle,
        description: t.successToastDescription,
      });

      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao salvar regulamento:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Não foi possível atualizar o regulamento.",
      });
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>
            {t.description}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="flex justify-center p-8 text-muted-foreground italic">
              {t.loading}
            </div>
          ) : isAdmin ? (
            <Textarea
              placeholder={t.placeholder}
              value={regulationText}
              onChange={(e) => setRegulationText(e.target.value)}
              className="min-h-[300px]"
            />
          ) : (
            <ScrollArea className="h-[400px] w-full rounded-md border p-4 bg-muted/20">
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {regulationText || (
                    <span className="italic text-muted-foreground">O regulamento ainda não foi cadastrado.</span>
                )}
              </div>
            </ScrollArea>
          )}
        </div>
        {isAdmin && !isLoading && (
          <DialogFooter>
            <Button onClick={handleConfirm} disabled={isSaving}>
              {isSaving ? "Salvando..." : t.confirmButton}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
