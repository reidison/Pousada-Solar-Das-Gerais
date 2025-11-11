'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const serviceCategories = [
  {
    category: 'Farmácias',
    items: [
      { name: 'Drogaria Brasil', address: 'Endereço...', phone: '(31) ...' },
      { name: 'Farmácia Araújo (Praça Tiradentes)', address: 'Endereço...', phone: '(31) ...' },
      { name: 'Farmácia Perpétuo Socorro (Delivery)', address: 'Endereço...', phone: '(31) ...' },
    ],
  },
  {
    category: 'Saúde',
    items: [
      { name: 'Unimed', address: 'Endereço...', phone: '(31) ...' },
      { name: 'UPA Dom Orione', address: 'Endereço...', phone: '(31) ...' },
    ],
  },
  {
    category: 'Supermercados',
    items: [
      { name: 'Supermercado Estela da Barra', address: 'Endereço...', phone: '(31) ...' },
    ],
  },
  {
    category: 'Academias',
    items: [
      { name: 'Academia Powerfit', address: 'Endereço...', phone: '(31) ...' },
    ],
  },
  {
    category: 'Mobilidade',
    items: [
        { name: 'App de mobilidade: Pam Pam', address: 'Não aplicável', phone: 'Baixar no App' },
        { name: 'App de mobilidade: 2V', address: 'Não aplicável', phone: 'Baixar no App' },
    ],
  },
  {
    category: 'Serviços Financeiros',
    items: [
      { name: 'Agências Bancárias', address: 'Diversas no centro histórico', phone: '...' },
    ],
  },
  {
    category: 'Lazer e Cultura',
    items: [
      { name: 'Horários de Missas', address: 'Consultar igrejas locais', phone: '...' },
      { name: 'Programação de Shows', address: 'Verificar agenda da cidade', phone: '...' },
    ],
  },
];

export function UsefulServicesModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4">Ver Lista Completa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Serviços e Contatos Úteis</DialogTitle>
          <DialogDescription>
            Uma lista de contatos importantes em Ouro Preto para sua conveniência.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-4">
          <Accordion type="single" collapsible className="w-full">
            {serviceCategories.map((category) => (
              <AccordionItem key={category.category} value={category.category}>
                <AccordionTrigger className="font-semibold">{category.category}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <div key={item.name} className="flex flex-col text-left text-sm p-2 rounded-md border border-transparent hover:border-border">
                        <p className="font-medium text-primary">{item.name}</p>
                        <p className="text-muted-foreground">{item.address}</p>
                        <a href={`tel:${item.phone}`} className="text-accent flex items-center gap-2 mt-1 hover:underline">
                          <Phone size={14} />
                          <span>{item.phone}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}
