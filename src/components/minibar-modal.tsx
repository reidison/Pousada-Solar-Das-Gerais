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
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { PlusCircle, Trash2, Save, X, Edit, Loader2 } from 'lucide-react';
import type { WithId } from '@/firebase';
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLanguage } from '@/contexts/language-context';


interface MinibarItem {
  name: string;
  price: string;
}

const defaultMinibarItems = [
    { name: 'Batata Pringles 109g', price: 'R$ 20,00' },
    { name: 'Batata Raiz do Bem 80g', price: 'R$ 10,00' },
    { name: 'Pimentinha 100g', price: 'R$ 10,00' },
    { name: 'Pele Pururuca 70g', price: 'R$ 10,00' },
    { name: 'Barra de Chocolate 80g', price: 'R$ 10,00' },
    { name: 'Biscoito LOOK 55g', price: 'R$ 10,00' },
    { name: 'Biscoito Clube Social 23,5g', price: 'R$ 3,50' },
    { name: 'Tridente 18g', price: 'R$ 5,00' },
    { name: 'Garrafa de Vinho', price: 'R$ 80,00' },
    { name: 'Lata de Cerveja', price: 'R$ 10,00' },
    { name: 'Lata de Refrigerante', price: 'R$ 7,00' },
    { name: 'Água s/ Gás', price: 'R$ 5,00' },
    { name: 'Água c/ Gás', price: 'R$ 5,00' }
];


export function MinibarModal() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const { translations } = useLanguage();
  const t = translations.minibarModal;

  const itemsRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'minibar_items');
  }, [firestore]);

  const { data: items, isLoading, error } = useCollection<MinibarItem>(itemsRef);
  
  const [isImporting, setIsImporting] = useState(false);

  const handleImportDefault = async () => {
    if (!firestore || !itemsRef) return;
    if (items && items.length > 0 && !window.confirm(t.replaceConfirm)) {
        return;
    }

    setIsImporting(true);
    toast({ title: t.importToastTitle, description: t.importToastDescription });

    try {
        const batch = writeBatch(firestore);
        
        if(items) {
            items.forEach(item => {
                const docRef = doc(itemsRef, item.id);
                batch.delete(docRef);
            });
        }
        
        defaultMinibarItems.forEach(item => {
            const newItemRef = doc(itemsRef);
            batch.set(newItemRef, item);
        });

        await batch.commit();

        toast({ title: t.importSuccessToastTitle, description: t.importSuccessToastDescription });
    } catch (error) {
        console.error("Erro ao importar itens do frigobar:", error);
        toast({ variant: "destructive", title: t.importErrorToastTitle, description: t.importErrorToastDescription });
    } finally {
        setIsImporting(false);
    }
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4 hover:bg-transparent hover:text-foreground">{translations.infoCards.minibar.button}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>
            {t.description}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.tableHeaderItem}</TableHead>
                <TableHead className="text-right">{t.tableHeaderPrice}</TableHead>
                <TableHead className="w-[100px] text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={3} className="text-center">{t.loading}</TableCell></TableRow>
              ) : items?.map((item) => (
                <EditableItemRow key={item.id} item={item} />
              ))}
              <AddItemForm />
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 border-t pt-4">
            <Button variant="secondary" size="sm" onClick={handleImportDefault} disabled={isImporting}>
                {isImporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isImporting ? t.importingButton : t.importButton}
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


function EditableItemRow({ item }: { item: WithId<MinibarItem> }) {
    const firestore = useFirestore();
    const { translations } = useLanguage();
    const t = translations.minibarModal;
    const itemDocRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return doc(firestore, 'minibar_items', item.id);
    }, [firestore, item.id]);

    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState(item);

    const handleUpdate = async () => {
        if (!itemDocRef) return;
        await updateDoc(itemDocRef, {
            name: editedItem.name.trim(),
            price: editedItem.price.trim(),
        });
        setIsEditing(false);
    };

    const handleDelete = async () => {
        if (!window.confirm(t.deleteConfirm(item.name))) return;
        if (!itemDocRef) return;
        await deleteDoc(itemDocRef);
    };
    
    const handleInputChange = (field: keyof MinibarItem, value: string) => {
        setEditedItem(prev => ({...prev, [field]: value }));
    }

    if (isEditing) {
        return (
            <TableRow>
                <TableCell>
                    <Input value={editedItem.name} onChange={e => handleInputChange('name', e.target.value)} />
                </TableCell>
                <TableCell className='text-right'>
                    <Input value={editedItem.price} className="text-right" onChange={e => handleInputChange('price', e.target.value)} />
                </TableCell>
                 <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost" onClick={handleUpdate}><Save size={16} /></Button>
                        <Button size="icon" variant="ghost" onClick={() => setIsEditing(false)}><X size={16} /></Button>
                    </div>
                </TableCell>
            </TableRow>
        );
    }

    return (
         <TableRow className="group">
            <TableCell>{item.name}</TableCell>
            <TableCell className="text-right">{item.price}</TableCell>
             <TableCell className="text-right">
                <div className="flex justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}><Edit size={16} /></Button>
                    <Button size="icon" variant="ghost" onClick={handleDelete}><Trash2 size={16} className="text-destructive"/></Button>
                </div>
            </TableCell>
        </TableRow>
    );
}

function AddItemForm() {
    const firestore = useFirestore();
    const { translations } = useLanguage();
    const t = translations.minibarModal;
    const itemsRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'minibar_items');
    }, [firestore]);

    const [newItem, setNewItem] = useState({ name: '', price: '' });
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = async () => {
        if (newItem.name.trim() === '' || !itemsRef) return;
        await addDoc(itemsRef, newItem);
        setNewItem({ name: '', price: '' });
        setIsAdding(false);
    };

    const handleInputChange = (field: keyof MinibarItem, value: string) => {
        setNewItem(prev => ({...prev, [field]: value }));
    }

    if (!isAdding) {
        return (
             <TableRow>
                <TableCell colSpan={3}>
                    <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setIsAdding(true)}>
                        <PlusCircle size={16} className="mr-2" />
                        {t.addItemButton}
                    </Button>
                </TableCell>
             </TableRow>
        );
    }

    return (
         <TableRow>
            <TableCell>
                <Input placeholder={t.addItemNamePlaceholder} value={newItem.name} onChange={e => handleInputChange('name', e.target.value)} />
            </TableCell>
            <TableCell className='text-right'>
                <Input placeholder={t.addItemPricePlaceholder} className="text-right" value={newItem.price} onChange={e => handleInputChange('price', e.target.value)} />
            </TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" onClick={handleAdd}><Save size={16} /></Button>
                    <Button size="icon" variant="ghost" onClick={() => setIsAdding(false)}><X size={16} /></Button>
                </div>
            </TableCell>
        </TableRow>
    );
}
