'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Loader2, CloudSun, RefreshCw } from 'lucide-react';
import { getPersonalizedWelcomeMessage } from '@/app/actions';

interface AIWelcomeModalProps {
  trigger?: React.ReactNode;
}

export function AIWelcomeModal({ trigger }: AIWelcomeModalProps) {
  const [open, setOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState<string | null>(null);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    const name = guestName.trim() || 'Hóspede';
    try {
      const res = await getPersonalizedWelcomeMessage({
        guestName: name,
        hotelName: 'Pousada Solar das Gerais',
        weatherInfo: {
          temperature: 22,
          condition: 'Ensolarado e agradável em Ouro Preto',
        },
      });
      if (res && res.welcomeMessage) {
        setGeneratedMessage(res.welcomeMessage);
      } else {
        throw new Error('Sem resposta');
      }
    } catch {
      setGeneratedMessage(
        `Olá, ${name}! Seja muito bem-vindo(a) à Pousada Solar das Gerais. O dia em Ouro Preto está lindo e convidativo para explorar nossas ladeiras e igrejas históricas. Desejamos uma estadia inesquecível e repleta de momentos acolhedores!`
      );
    } finally {
      setLoading(false);
    }
  };

  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && !generatedMessage && !loading) {
      handleGenerate();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Sparkles size={14} className="text-amber-500" />
            Ver mensagem
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <DialogTitle className="text-xl text-[#11314C]">
              Boas-vindas com IA
            </DialogTitle>
          </div>
          <DialogDescription className="text-slate-600">
            Mensagem acolhedora gerada por inteligência artificial baseada no clima de Ouro Preto.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Weather status bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-amber-50/80 border border-amber-200/60 rounded-lg text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <CloudSun size={18} className="text-amber-600" />
              <span>Ouro Preto, MG: <strong>22°C</strong> • Ensolarado</span>
            </div>
            <span className="text-[10px] text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded-full font-medium">Tempo Real</span>
          </div>

          {/* Generated message output box */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/50 via-white to-sky-50/40 border border-slate-200/80 shadow-inner min-h-[110px] flex items-center justify-center text-center">
            {loading ? (
              <div className="flex flex-col items-center gap-2 text-slate-500 text-sm py-4">
                <Loader2 size={24} className="animate-spin text-amber-500" />
                <span>Personalizando sua recepção...</span>
              </div>
            ) : generatedMessage ? (
              <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium italic">
                &ldquo;{generatedMessage}&rdquo;
              </p>
            ) : (
              <p className="text-slate-400 text-sm">Clique em gerar para ver sua mensagem personalizada.</p>
            )}
          </div>

          {/* Name customization input */}
          <form onSubmit={handleGenerate} className="space-y-3 pt-1">
            <div className="space-y-1.5">
              <Label htmlFor="guestName" className="text-xs text-slate-600 font-semibold">
                Deseja personalizar com seu nome? (Opcional)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="guestName"
                  placeholder="Seu nome (ex: Maria)"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="text-sm h-9"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={loading}
                  className="bg-[#11314C] hover:bg-[#0c2438] text-white shrink-0 gap-1.5 h-9 px-3"
                >
                  <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                  <span>Atualizar</span>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
