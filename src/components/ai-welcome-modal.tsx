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
import { Bot, Sparkles, CloudSun, Loader2, RefreshCw } from 'lucide-react';

interface AiWelcomeModalProps {
  trigger?: React.ReactNode;
}

export function AiWelcomeModal({ trigger }: AiWelcomeModalProps) {
  const [guestName, setGuestName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(
    "Olá! Seja muito bem-vindo(a) à Pousada Solar das Gerais. O dia em Ouro Preto está perfeito com 21°C e brisa suave de montanha. Aproveite um delicioso café coado e desfrute do nosso acolhimento mineiro!"
  );

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/welcome-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: guestName.trim() || 'Hóspede Especial',
          hotelName: 'Pousada Solar das Gerais',
          weatherInfo: {
            temperature: 21,
            condition: 'Ensolarado com brisa fresca de montanha',
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.welcomeMessage) {
          setMessage(data.welcomeMessage);
          return;
        }
      }

      // Mensagem de acolhimento personalizada de alta qualidade
      const name = guestName.trim() || 'Prezado(a) Hóspede';
      const messages = [
        `${name}, que alegria ter você aqui na Pousada Solar das Gerais! O clima de 21°C nas montanhas de Ouro Preto convida a um passeio inesquecível pelo centro histórico. Sinta-se em casa!`,
        `Seja muito bem-vindo(a), ${name}! Cada cantinho da Solar das Gerais foi preparado com carinho para o seu descanso. Aproveite o ar puro de Minas e a nossa hospitalidade!`,
        `Olá ${name}! O sol brilha suavemente sobre as ladeiras históricas de Ouro Preto. Desfrute da vista, do silêncio e do melhor café mineiro conosco!`,
      ];
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    } catch {
      setMessage(
        `Olá ${guestName.trim() || 'Hóspede'}! Seja muito bem-vindo(a) à Pousada Solar das Gerais. Desejamos uma estadia encantadora em Ouro Preto!`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="mt-4">
            Mensagem com IA
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader className="text-center sm:text-left">
          <div className="mx-auto sm:mx-0 w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-2">
            <Bot size={24} />
          </div>
          <DialogTitle className="text-xl font-headline text-solar-navy">
            Boas-vindas Personalizadas com IA
          </DialogTitle>
          <DialogDescription>
            Nosso assistente inteligente cria uma recepção sob medida considerando o clima de Ouro Preto.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3">
          {/* Status do Clima em Ouro Preto */}
          <div className="flex items-center justify-between p-3.5 bg-solar-cream border border-[#113F52] rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-200/60 text-amber-800 flex items-center justify-center border border-[#113F52]">
                <CloudSun size={20} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block">
                  Clima em Ouro Preto agora
                </span>
                <span className="text-sm font-bold text-solar-navy">
                  21°C • Ensolarado e agradável
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-solar-navy bg-solar-gold/30 border border-[#113F52] px-2 py-0.5 rounded-full">
              <Sparkles size={12} />
              GenAI
            </span>
          </div>

          {/* Campo para o nome do hóspede */}
          <div className="flex gap-2">
            <Input
              placeholder="Digite seu primeiro nome..."
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="rounded-xl border-slate-200 focus:border-solar-navy"
            />
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-solar-navy hover:bg-solar-navyLight text-white rounded-xl gap-1.5 shrink-0 px-4"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Sparkles size={16} className="text-solar-gold" />
              )}
              <span>Gerar</span>
            </Button>
          </div>

          {/* Mensagem Gerada */}
          {message && (
            <div className="relative p-5 bg-solar-cream/70 border border-solar-gold/40 rounded-2xl shadow-xs">
              <div className="absolute top-3 right-3 text-solar-gold">
                <Sparkles size={18} />
              </div>
              <p className="text-sm text-solar-navy leading-relaxed font-medium italic">
                &ldquo;{message}&rdquo;
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/60 pt-2">
                <span>Concierge Virtual • Pousada Solar das Gerais</span>
                <button
                  onClick={handleGenerate}
                  className="flex items-center gap-1 hover:text-solar-navy font-semibold transition-colors"
                >
                  <RefreshCw size={11} />
                  Outra mensagem
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
