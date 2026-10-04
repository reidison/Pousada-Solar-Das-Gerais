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
import { Wifi, Copy, Check, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';

interface WifiModalProps {
  trigger?: React.ReactNode;
  networkName?: string;
  password?: string;
}

export function WifiModal({
  trigger,
  networkName = 'Pousada_Solar_Das_Gerais',
  password = 'pousada2023',
}: WifiModalProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { translations } = useLanguage();
  const t = translations.infoCards.wifi;

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    toast({
      title: "Senha copiada!",
      description: "A senha do Wi-Fi foi copiada para sua área de transferência.",
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="mt-4">
            Ver Senha
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] border border-[#113F52]">
        <DialogHeader className="text-center sm:text-left">
          <div className="mx-auto sm:mx-0 w-12 h-12 rounded-full bg-solar-cream border border-[#113F52] flex items-center justify-center text-solar-navy mb-2">
            <Wifi size={24} />
          </div>
          <DialogTitle className="text-xl font-headline text-solar-navy">
            {t.title}
          </DialogTitle>
          <DialogDescription>
            Conecte-se à rede de alta velocidade da Pousada Solar das Gerais.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Nome da Rede */}
          <div className="bg-slate-50 border border-[#113F52] rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block">
                Nome da Rede (SSID)
              </span>
              <span className="text-base font-bold text-solar-navy">
                {networkName}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-solar-cream text-solar-navy border border-[#113F52] flex items-center justify-center">
              <Wifi size={18} />
            </div>
          </div>

          {/* Senha com botão de copiar */}
          <div className="bg-slate-50 border border-[#113F52] rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block">
                Senha de Acesso
              </span>
              <span className="text-lg font-mono font-bold text-solar-navy tracking-wide">
                {password}
              </span>
            </div>
            <Button
              onClick={handleCopy}
              size="sm"
              className="bg-solar-navy hover:bg-solar-navyDark text-white border border-[#113F52] rounded-lg px-3 gap-1.5 shadow-sm"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? "Copiado!" : "Copiar"}</span>
            </Button>
          </div>

          {/* Dica */}
          <p className="text-xs text-center text-slate-500">
            Disponível em todos os quartos, recepção e área do café da manhã.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
