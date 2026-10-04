'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Coffee, Clock, MapPin, UtensilsCrossed, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

interface BreakfastModalProps {
  trigger?: React.ReactNode;
  hours?: string;
  location?: string;
}

export function BreakfastModal({
  trigger,
  hours = 'Servido diariamente das 7:30h às 10h',
  location = 'Local: Salão de Café',
}: BreakfastModalProps) {
  const { translations } = useLanguage();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="mt-4">
            Ver Detalhes
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader className="text-center sm:text-left">
          <div className="mx-auto sm:mx-0 w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-2">
            <Coffee size={24} />
          </div>
          <DialogTitle className="text-xl font-headline text-solar-navy">
            Café da Manhã Colonial Mineiro
          </DialogTitle>
          <DialogDescription>
            Comece o seu dia em Ouro Preto com os autênticos sabores de Minas Gerais.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3">
          {/* Horário */}
          <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-4 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <Clock size={20} />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-900/70 font-bold block">
                Horário de Atendimento
              </span>
              <span className="text-base font-bold text-solar-navy block mt-0.5">
                {hours}
              </span>
              <span className="text-xs text-slate-500">
                Todos os dias, inclusive sábados, domingos e feriados.
              </span>
            </div>
          </div>

          {/* Local */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-slate-200/80 text-solar-navy flex items-center justify-center shrink-0 mt-0.5">
              <MapPin size={20} />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block">
                Localização
              </span>
              <span className="text-base font-bold text-solar-navy block mt-0.5">
                {location}
              </span>
              <span className="text-xs text-slate-500">
                Piso principal com vista para as colinas de Ouro Preto.
              </span>
            </div>
          </div>

          {/* O que é servido */}
          <div className="p-4 rounded-xl border border-slate-100 bg-solar-cream/50 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-solar-navy uppercase tracking-wider">
              <UtensilsCrossed size={14} className="text-amber-600" />
              Delícias do Cardápio
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pão de queijo quentinho assado na hora, broas de milho, bolos caseiros, queijo minas artesanal, geleias, frutas frescas, sucos naturais e café colonial coado.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
