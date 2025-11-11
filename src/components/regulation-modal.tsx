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

export function RegulationModal() {
  const [regulationText, setRegulationText] = useState('');

  const handleConfirm = () => {
    // Here you would typically save the regulationText to your database.
    // For now, we'll just log it to the console.
    console.log('Regulamento Salvo:', regulationText);
    // You might want to close the dialog after confirming.
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4 hover:bg-transparent hover:text-foreground">
          Ler
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nosso Regulamento</DialogTitle>
          <DialogDescription>
            Leia as regras da Pousada. Edite o texto abaixo para atualizar o regulamento.
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
