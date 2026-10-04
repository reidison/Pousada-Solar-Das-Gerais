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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import type { LodgeInfo, CardIconsConfig } from '@/types/lodge-info';
import { ImageUploader } from '@/components/image-uploader';
import {
  Settings,
  Loader2,
  Phone,
  Coffee,
  MapPin,
  Wifi,
  Map,
  ShoppingBag,
  MessageCircle,
  GlassWater,
  PhoneCall,
  BookText,
  Bot,
  Sliders,
  Image as ImageIcon,
  LayoutGrid,
} from 'lucide-react';

interface LodgeConfigModalProps {
  trigger?: React.ReactNode;
}

const CARD_DEFINITIONS = [
  { id: 'breakfast', name: 'Café da Manhã', Icon: Coffee, iconBg: 'bg-amber-100 text-amber-700' },
  { id: 'wifi', name: 'Wi-Fi', Icon: Wifi, iconBg: 'bg-blue-100 text-solar-green' },
  { id: 'cityTour', name: 'City Tour', Icon: Map, iconBg: 'bg-sky-100 text-sky-700' },
  { id: 'loja', name: 'Loja', Icon: ShoppingBag, iconBg: 'bg-teal-100 text-teal-700' },
  { id: 'reception', name: 'Recepção (WhatsApp)', Icon: MessageCircle, iconBg: 'bg-amber-100 text-amber-700' },
  { id: 'minibar', name: 'Frigobar', Icon: GlassWater, iconBg: 'bg-blue-100 text-blue-700' },
  { id: 'usefulServices', name: 'Telefones úteis', Icon: PhoneCall, iconBg: 'bg-cyan-100 text-cyan-700' },
  { id: 'regulation', name: 'Regulamento', Icon: BookText, iconBg: 'bg-blue-100 text-solar-green' },
  { id: 'aiWelcome', name: 'Boas-vindas com IA', Icon: Bot, iconBg: 'bg-amber-100 text-amber-700' },
];

export function LodgeConfigModal({ trigger }: LodgeConfigModalProps = {}) {
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
    wifiName: '',
    wifiPassword: '',
    mainDoorAccessCode: '',
    welcomeMessage: '',
    logoUrl: '',
    heroImageUrl: '',
    cardIcons: {} as CardIconsConfig,
  });

  const [selectedCardForIcon, setSelectedCardForIcon] = useState<string>('breakfast');
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (lodgeInfo && !isSaving) {
      setFormData({
        whatsappNumber: lodgeInfo.whatsappNumber || '',
        breakfastHours: lodgeInfo.breakfastHours || '',
        breakfastLocation: lodgeInfo.breakfastLocation || '',
        wifiName: lodgeInfo.wifiName || '',
        wifiPassword: lodgeInfo.wifiPassword || '',
        mainDoorAccessCode: lodgeInfo.mainDoorAccessCode || '',
        welcomeMessage: lodgeInfo.welcomeMessage || '',
        logoUrl: lodgeInfo.logoUrl || '',
        heroImageUrl: lodgeInfo.heroImageUrl || '',
        cardIcons: lodgeInfo.cardIcons || {},
      });
    }
  }, [lodgeInfo, isSaving]);

  const handleCardIconChange = (cardId: string, url: string) => {
    setFormData((prev) => ({
      ...prev,
      cardIcons: {
        ...prev.cardIcons,
        [cardId]: url,
      },
    }));
  };

  const handleSave = async () => {
    if (!lodgeInfoRef) return;
    setIsSaving(true);

    const trimmedData: Partial<LodgeInfo> = {
      whatsappNumber: (formData.whatsappNumber || '').trim(),
      breakfastHours: (formData.breakfastHours || '').trim(),
      breakfastLocation: (formData.breakfastLocation || '').trim(),
      wifiName: (formData.wifiName || '').trim(),
      wifiPassword: (formData.wifiPassword || '').trim(),
      mainDoorAccessCode: (formData.mainDoorAccessCode || '').trim(),
      welcomeMessage: (formData.welcomeMessage || '').trim(),
      logoUrl: (formData.logoUrl || '').trim(),
      heroImageUrl: (formData.heroImageUrl || '').trim(),
      cardIcons: formData.cardIcons || {},
    };

    try {
      await setDoc(lodgeInfoRef, trimmedData, { merge: true });
      toast({
        title: t.successToastTitle,
        description: t.successToastDescription,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível salvar as configurações.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const currentSelectedCard = CARD_DEFINITIONS.find((c) => c.id === selectedCardForIcon) || CARD_DEFINITIONS[0];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2 shadow-sm border-primary/20 hover:border-primary/50 transition-colors">
            <Settings size={16} />
            {t.adminButton}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[620px] max-h-[90vh] flex flex-col p-6">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl font-headline text-solar-navy flex items-center gap-2">
            <Sliders size={20} className="text-solar-gold" />
            {t.title}
          </DialogTitle>
          <DialogDescription>
            {t.description}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="geral" className="w-full flex-grow flex flex-col overflow-hidden">
          <TabsList className="grid grid-cols-3 mb-3 bg-solar-cream/70 p-1 border border-solar-navy/10 rounded-xl">
            <TabsTrigger value="geral" className="text-xs font-semibold data-[state=active]:bg-solar-navy data-[state=active]:text-white rounded-lg">
              Informações
            </TabsTrigger>
            <TabsTrigger value="imagens" className="text-xs font-semibold data-[state=active]:bg-solar-navy data-[state=active]:text-white rounded-lg gap-1.5">
              <ImageIcon size={13} />
              Logo & Capa
            </TabsTrigger>
            <TabsTrigger value="icones" className="text-xs font-semibold data-[state=active]:bg-solar-navy data-[state=active]:text-white rounded-lg gap-1.5">
              <LayoutGrid size={13} />
              Ícones dos Cards
            </TabsTrigger>
          </TabsList>

          <div className="flex-grow overflow-y-auto pr-1">
            {/* ABA 1: Informações Gerais */}
            <TabsContent value="geral" className="space-y-4 mt-1 pr-2">
              {/* WhatsApp */}
              <div className="grid gap-1.5">
                <Label htmlFor="whatsapp" className="text-solar-navy font-semibold flex items-center gap-2 text-xs">
                  <Phone size={14} className="text-amber-600" />
                  {t.whatsappLabel}
                </Label>
                <Input
                  id="whatsapp"
                  placeholder="Ex: 31992580325"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              {/* Café da Manhã */}
              <div className="border-t border-slate-100 pt-3 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Café da Manhã</span>
                <div className="grid gap-1.5">
                  <Label htmlFor="breakfastHours" className="text-solar-navy font-semibold flex items-center gap-2 text-xs">
                    <Coffee size={14} className="text-amber-600" />
                    {t.breakfastHoursLabel}
                  </Label>
                  <Input
                    id="breakfastHours"
                    placeholder="Ex: Das 07:30h às 10:00h"
                    value={formData.breakfastHours}
                    onChange={(e) => setFormData({ ...formData, breakfastHours: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="breakfastLocation" className="text-solar-navy font-semibold flex items-center gap-2 text-xs">
                    <MapPin size={14} className="text-amber-600" />
                    {t.breakfastLocationLabel}
                  </Label>
                  <Input
                    id="breakfastLocation"
                    placeholder="Ex: Salão de Café (Piso Térreo)"
                    value={formData.breakfastLocation}
                    onChange={(e) => setFormData({ ...formData, breakfastLocation: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
              </div>

              {/* Wi-Fi & Senhas */}
              <div className="border-t border-slate-100 pt-3 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Wi-Fi & Acessos</span>
                <div className="grid gap-1.5">
                  <Label htmlFor="wifiName" className="text-solar-navy font-semibold text-xs">
                    Nome da Rede Wi-Fi (SSID)
                  </Label>
                  <Input
                    id="wifiName"
                    placeholder="Ex: Pousada_Solar_Das_Gerais"
                    value={formData.wifiName}
                    onChange={(e) => setFormData({ ...formData, wifiName: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="wifiPassword" className="text-solar-navy font-semibold text-xs">
                    Senha do Wi-Fi
                  </Label>
                  <Input
                    id="wifiPassword"
                    placeholder="Ex: pousada2023"
                    value={formData.wifiPassword}
                    onChange={(e) => setFormData({ ...formData, wifiPassword: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="mainDoorAccessCode" className="text-solar-navy font-semibold text-xs">
                    Senha Eletrônica da Portaria / Entrada
                  </Label>
                  <Input
                    id="mainDoorAccessCode"
                    placeholder="Ex: 1234#"
                    value={formData.mainDoorAccessCode}
                    onChange={(e) => setFormData({ ...formData, mainDoorAccessCode: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
              </div>

              {/* Subtítulo de Boas-Vindas */}
              <div className="border-t border-slate-100 pt-3 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Texto de Boas-Vindas</span>
                <div className="grid gap-1.5">
                  <Label htmlFor="welcomeMessage" className="text-solar-navy font-semibold text-xs">
                    Subtítulo da Hero
                  </Label>
                  <Input
                    id="welcomeMessage"
                    placeholder="Ex: Aqui, cada detalhe é pensado para que você aproveite ao máximo sua estadia."
                    value={formData.welcomeMessage}
                    onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </TabsContent>

            {/* ABA 2: Upload de Logo e Imagem Hero */}
            <TabsContent value="imagens" className="space-y-5 mt-1 pr-2">
              <div className="bg-amber-50/70 border border-amber-200/70 p-3 rounded-xl text-xs text-amber-900 leading-relaxed">
                Personalize os principais elementos visuais da pousada. Você pode fazer upload de fotos/ilustrações locais ou informar uma URL externa.
              </div>

              {/* Logotipo */}
              <ImageUploader
                label="Logotipo da Pousada"
                description="Exibido no topo de todas as páginas. Caso remova, será usado o logotipo oficial padrão."
                value={formData.logoUrl}
                onChange={(url) => setFormData({ ...formData, logoUrl: url })}
                onReset={() => setFormData({ ...formData, logoUrl: '' })}
                aspectRatio="logo"
                folder="logo"
              />

              {/* Foto de Capa (Hero Banner) */}
              <ImageUploader
                label="Foto de Capa do Banner Principal (Hero)"
                description="Imagem panorâmica de fundo. A imagem é renderizada com espelhamento horizontal para harmonizar o texto à esquerda."
                value={formData.heroImageUrl}
                onChange={(url) => setFormData({ ...formData, heroImageUrl: url })}
                onReset={() => setFormData({ ...formData, heroImageUrl: '' })}
                aspectRatio="hero"
                folder="hero"
              />
            </TabsContent>

            {/* ABA 3: Ícones dos Cartões de Serviços */}
            <TabsContent value="icones" className="space-y-4 mt-1 pr-2">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs text-slate-600">
                Selecione o serviço abaixo para personalizar seu ícone na tela inicial. Você pode subir uma imagem PNG/SVG ou restaurar o ícone padrão.
              </div>

              {/* Grade de Seleção de Cartões */}
              <div className="grid grid-cols-3 gap-2">
                {CARD_DEFINITIONS.map((card) => {
                  const isSelected = card.id === selectedCardForIcon;
                  const customIcon = formData.cardIcons?.[card.id];
                  const CardIcon = card.Icon;

                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setSelectedCardForIcon(card.id)}
                      className={`p-2.5 rounded-xl border text-left flex flex-col items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'border-solar-navy bg-solar-cream shadow-xs ring-1 ring-solar-navy'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${card.iconBg} overflow-hidden`}>
                        {customIcon ? (
                          <img src={customIcon} alt={card.name} className="w-5 h-5 object-contain" />
                        ) : (
                          <CardIcon size={18} />
                        )}
                      </div>
                      <span className="text-[11px] font-semibold text-solar-navy text-center line-clamp-1">
                        {card.name}
                      </span>
                      {customIcon ? (
                        <span className="text-[9px] bg-blue-100 text-solar-green font-bold px-1.5 py-0.2 rounded-full">
                          Personalizado
                        </span>
                      ) : (
                        <span className="text-[9px] text-slate-400">Padrão</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Painel de Upload para o Cartão Selecionado */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-solar-navy">
                      Editando ícone de:
                    </span>
                    <span className="text-xs font-semibold text-solar-gold bg-solar-navy px-2 py-0.5 rounded-md">
                      {currentSelectedCard.name}
                    </span>
                  </div>
                </div>

                <ImageUploader
                  label={`Ícone para ${currentSelectedCard.name}`}
                  description="Recomendado arquivo PNG ou SVG com fundo transparente (resolução quadrada)."
                  value={formData.cardIcons?.[currentSelectedCard.id] || ''}
                  onChange={(url) => handleCardIconChange(currentSelectedCard.id, url)}
                  onReset={() => handleCardIconChange(currentSelectedCard.id, '')}
                  aspectRatio="icon"
                  folder="icons"
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="gap-2 pt-3 border-t border-slate-100 mt-2">
          <Button variant="ghost" onClick={() => setIsOpen(false)} disabled={isSaving} className="rounded-xl">
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-solar-navy hover:bg-solar-navyLight text-white rounded-xl shadow-xs">
            {isSaving ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
            {isSaving ? t.savingButton : t.saveButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

