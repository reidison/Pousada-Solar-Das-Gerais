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
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { Skeleton } from './ui/skeleton';

interface ServiceItem {
  name: string;
  address: string;
  phone: string;
}

interface ServiceCategory {
  category: string;
  items: ServiceItem[];
  order: number;
}


export function UsefulServicesModal() {
  const firestore = useFirestore();
  
  const serviceCategoriesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'service_categories'), orderBy('order'));
  }, [firestore]);

  const { data: serviceCategories, isLoading } = useCollection<ServiceCategory>(serviceCategoriesQuery);

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
          {isLoading && (
             <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
             </div>
          )}
          {serviceCategories && (
            <Accordion type="single" collapsible className="w-full">
              {serviceCategories.map((category) => (
                <AccordionItem key={category.id} value={category.category}>
                  <AccordionTrigger className="font-semibold">{category.category}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {category.items.map((item) => (
                        <div key={item.name} className="flex flex-col text-left text-sm p-2 rounded-md border border-transparent hover:border-border">
                          <p className="font-medium text-primary">{item.name}</p>
                          <p className="text-muted-foreground">{item.address}</p>
                          <a href={`tel:${item.phone.replace(/\D/g, '')}`} className="text-accent flex items-center gap-2 mt-1 hover:underline">
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
