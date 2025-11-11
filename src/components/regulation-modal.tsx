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

export function RegulationModal() {
  const [regulationText, setRegulationText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleConfirm = () => {
    // Here you would typically save the regulationText to your database.
    console.log('Regulamento Salvo:', regulationText);

    toast({
      title: 'Sucesso!',
      description: 'O regulamento foi atualizado.',
    });

    setIsOpen(false); // Fecha o modal
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4 hover:bg-transparent hover:text-foreground">
          Ler
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nosso Regulamento</DialogTitle>
          <DialogDescription>
            Importante: leia nossas orientações para a sua estadia
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="Insira o texto do regulamento aqui..."
            value={regulationText}
            onChange={(e) => setRegulationText(e.target.value)}
            className="min-h-[300px]"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
