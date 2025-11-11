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

// ÁREA DE EDIÇÃO:
// Adicione ou altere as informações de endereço e telefone nos campos abaixo.
// Para adicionar um novo item, copie e cole um bloco de chaves `{}`.
// Para adicionar uma nova categoria, copie e cole um bloco de categoria inteiro.
const serviceCategories = [
  {
    category: 'Farmácias',
    items: [
      {
        name: 'Drogaria Brasil',
        address: 'Insira o endereço aqui...',
        phone: 'Insira o telefone aqui...',
      },
      {
        name: 'Farmácia Araujo',
        address: 'Praça Tiradentes, Ouro Preto',
        phone: 'Insira o telefone aqui...',
      },
      {
        name: 'Farmácia Perpétuo Socorro (Delivery)',
        address: 'Rua Padre Rolim, Ouro Preto',
        phone: 'Insira o telefone aqui...',
      },
    ],
  },
  {
    category: 'Saúde',
    items: [
      {
        name: 'Unimed',
        address: 'Insira o endereço aqui...',
        phone: 'Insira o telefone aqui...',
      },
      {
        name: 'UPA Dom Orione',
        address: 'Insira o endereço aqui...',
        phone: 'Insira o telefone aqui...',
      },
    ],
  },
  {
    category: 'Supermercados',
    items: [
      {
        name: 'Supermercado Estrela da Barra',
        address: 'Insira o endereço aqui...',
        phone: 'Insira o telefone aqui...',
      },
    ],
  },
  {
    category: 'Serviços',
    items: [
        {
        name: 'Academia Powerfit',
        address: 'Insira o endereço aqui...',
        phone: 'Insira o telefone aqui...',
      },
      {
        name: 'Agências Bancárias',
        address: 'Centro, Ouro Preto',
        phone: 'Vários',
      },
    ],
  },
    {
    category: 'Apps de Mobilidade',
    items: [
      {
        name: 'Pam Pam',
        address: 'Aplicativo de transporte',
        phone: 'Baixe na loja de apps',
      },
      {
        name: '2V',
        address: 'Aplicativo de transporte',
        phone: 'Baixe na loja de apps',
      },
    ],
  },
  {
    category: 'Cultura e Lazer',
    items: [
      {
        name: 'Horários de Missa',
        address: 'Consulte na recepção ou igrejas',
        phone: 'N/A',
      },
      {
        name: 'Shows e Eventos',
        address: 'Consulte a agenda da cidade',
        phone: 'N/A',
      },
    ],
  },
];
// FIM DA ÁREA DE EDIÇÃO

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
                        {item.phone && item.phone.match(/\d/) ? (
                           <a href={`tel:${item.phone.replace(/\D/g, '')}`} className="text-accent flex items-center gap-2 mt-1 hover:underline">
                            <Phone size={14} />
                            <span>{item.phone}</span>
                          </a>
                        ) : (
                          <p className="text-accent flex items-center gap-2 mt-1">
                            <Phone size={14} />
                            <span>{item.phone}</span>
                          </p>
                        )}
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
