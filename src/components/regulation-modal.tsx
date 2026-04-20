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
import { doc, setDoc } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';
import type { LodgeInfo } from '@/types/lodge-info';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';

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
    } else if (!isLoading) {
      setRegulationText(t.defaultText);
    }
  }, [lodgeInfo, t.defaultText, isLoading]);

  const handleConfirm = async () => {
    if (!lodgeInfoRef || !isAdmin) return;

    setIsSaving(true);
    
    try {
      await setDoc(lodgeInfoRef, {
        regulation: regulationText,
      }, { merge: true });

      toast({
        title: t.successToastTitle,
        description: t.successToastDescription,
      });

      setIsOpen(false);
    } catch (serverError) {
      const permissionError = new FirestorePermissionError({
        path: lodgeInfoRef.path,
        operation: 'write',
        requestResourceData: { regulation: regulationText },
      } satisfies SecurityRuleContext);

      errorEmitter.emit('permission-error', permissionError);
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
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              {t.loading}
            </div>
          ) : isAdmin ? (
            <Textarea
              placeholder={t.placeholder}
              value={regulationText}
              onChange={(e) => setRegulationText(e.target.value)}
              className="min-h-[350px] font-body text-sm leading-relaxed"
            />
          ) : (
            <ScrollArea className="h-[400px] w-full rounded-md border p-4 bg-muted/20">
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground font-body">
                {regulationText || t.defaultText}
              </div>
            </ScrollArea>
          )}
        </div>
        {isAdmin && !isLoading && (
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="ghost" onClick={() => setIsOpen(false)} disabled={isSaving}>
              {translations.usefulServicesModal.cancelButton}
            </Button>
            <Button onClick={handleConfirm} disabled={isSaving} className="min-w-[120px]">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {translations.lodgeConfigModal.savingButton}
                </>
              ) : (
                t.confirmButton
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
