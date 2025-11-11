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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Phone, PlusCircle, Trash2, Save, X, Edit } from 'lucide-react';
import type { WithId } from '@/firebase';

interface ServiceItem {
  name: string;
  address: string;
  phone: string;
}

interface ServiceCategory {
  name: string;
}

export function UsefulServicesModal() {
  const firestore = useFirestore();

  // Memoize the collection reference
  const categoriesRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'service_categories');
  }, [firestore]);

  const { data: categories, isLoading: isLoadingCategories } = useCollection<ServiceCategory>(categoriesRef);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleAddCategory = async () => {
    if (newCategoryName.trim() === '' || !categoriesRef) return;
    await addDoc(categoriesRef, { name: newCategoryName.trim() });
    setNewCategoryName('');
    setIsAddingCategory(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4">Ver/Editar Lista Completa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Serviços e Contatos Úteis</DialogTitle>
          <DialogDescription>
            Uma lista de contatos importantes em Ouro Preto para sua conveniência.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-4">
          {isLoadingCategories ? (
            <p>Carregando...</p>
          ) : (
            <Accordion type="multiple" className="w-full">
              {categories?.map((category) => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </Accordion>
          )}
          <div className="mt-4">
            {isAddingCategory ? (
              <div className="flex items-center gap-2">
                <Input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Nome da nova categoria"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                />
                <Button size="icon" onClick={handleAddCategory}><Save size={16}/></Button>
                <Button size="icon" variant="ghost" onClick={() => setIsAddingCategory(false)}><X size={16}/></Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsAddingCategory(true)}>
                <PlusCircle size={16} className="mr-2" />
                Adicionar Categoria
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CategoryItem({ category }: { category: WithId<ServiceCategory> }) {
  const firestore = useFirestore();
  const categoryDocRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'service_categories', category.id);
  }, [firestore, category.id]);
  
  const itemsRef = useMemoFirebase(() => {
    if (!categoryDocRef) return null;
    return collection(categoryDocRef, 'items');
  }, [categoryDocRef]);
  
  const { data: items, isLoading: isLoadingItems } = useCollection<ServiceItem>(itemsRef);

  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editedCategoryName, setEditedCategoryName] = useState(category.name);

  const handleUpdateCategory = async () => {
    if (editedCategoryName.trim() === '' || !categoryDocRef) return;
    await updateDoc(categoryDocRef, { name: editedCategoryName.trim() });
    setIsEditingCategory(false);
  };

  const handleDeleteCategory = async () => {
    if (!window.confirm(`Tem certeza que deseja excluir a categoria "${category.name}"?`)) return;
    if (!categoryDocRef) return;
    // Note: This does not delete subcollections in Firestore. For a complete solution,
    // a backend function would be required to recursively delete subcollection documents.
    await deleteDoc(categoryDocRef);
  };
  
  return (
    <AccordionItem value={category.id}>
      <AccordionTrigger>
        <div className="flex justify-between items-center w-full pr-2">
            {isEditingCategory ? (
                 <div className="flex items-center gap-2 flex-grow" onClick={(e) => e.stopPropagation()}>
                    <Input 
                        value={editedCategoryName}
                        onChange={(e) => setEditedCategoryName(e.target.value)}
                        className="h-8"
                        onKeyDown={(e) => e.key === 'Enter' && handleUpdateCategory()}
                    />
                     <Button size="icon" variant="ghost" onClick={handleUpdateCategory}><Save size={16} /></Button>
                     <Button size="icon" variant="ghost" onClick={() => setIsEditingCategory(false)}><X size={16} /></Button>
                 </div>
            ) : (
                <span className="font-semibold">{category.name}</span>
            )}
            <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                {!isEditingCategory && <Button size="icon" variant="ghost" onClick={() => setIsEditingCategory(true)}><Edit size={16} /></Button>}
                <Button size="icon" variant="ghost" onClick={handleDeleteCategory}><Trash2 size={16} className="text-destructive"/></Button>
            </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2">
          {isLoadingItems ? <p>Carregando...</p> : items?.map((item) => (
            <ServiceListItem key={item.id} categoryId={category.id} item={item} />
          ))}
          <AddItemForm categoryId={category.id} />
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

function ServiceListItem({ categoryId, item }: { categoryId: string; item: WithId<ServiceItem> }) {
    const firestore = useFirestore();
    const itemDocRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return doc(firestore, 'service_categories', categoryId, 'items', item.id);
    }, [firestore, categoryId, item.id]);

    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState(item);

    const handleUpdate = async () => {
        if (!itemDocRef) return;
        await updateDoc(itemDocRef, {
            name: editedItem.name.trim(),
            address: editedItem.address.trim(),
            phone: editedItem.phone.trim(),
        });
        setIsEditing(false);
    };

    const handleDelete = async () => {
        if (!window.confirm(`Tem certeza que deseja excluir "${item.name}"?`)) return;
        if (!itemDocRef) return;
        await deleteDoc(itemDocRef);
    };

    const handleInputChange = (field: keyof ServiceItem, value: string) => {
        setEditedItem(prev => ({...prev, [field]: value }));
    }

    if (isEditing) {
        return (
            <div className="flex flex-col text-left text-sm p-2 rounded-md border border-border space-y-2">
                <Input placeholder="Nome" value={editedItem.name} onChange={e => handleInputChange('name', e.target.value)} />
                <Input placeholder="Endereço" value={editedItem.address} onChange={e => handleInputChange('address', e.target.value)} />
                <Input placeholder="Telefone" value={editedItem.phone} onChange={e => handleInputChange('phone', e.target.value)} />
                <div className="flex justify-end gap-2">
                    <Button size="sm" onClick={handleUpdate}><Save size={16} className="mr-1"/> Salvar</Button>
                    <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>Cancelar</Button>
                </div>
            </div>
        );
    }

    return (
         <div className="flex justify-between items-center text-left text-sm p-2 rounded-md border border-transparent hover:border-border group">
            <div>
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
                    <span>{item.phone || 'N/A'}</span>
                  </p>
                )}
            </div>
            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}><Edit size={16} /></Button>
                <Button size="icon" variant="ghost" onClick={handleDelete}><Trash2 size={16} className="text-destructive"/></Button>
            </div>
        </div>
    );
}

function AddItemForm({ categoryId }: { categoryId: string }) {
    const firestore = useFirestore();
    const itemsRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'service_categories', categoryId, 'items');
    }, [firestore, categoryId]);

    const [newItem, setNewItem] = useState({ name: '', address: '', phone: '' });
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = async () => {
        if (newItem.name.trim() === '' || !itemsRef) return;
        await addDoc(itemsRef, newItem);
        setNewItem({ name: '', address: '', phone: '' });
        setIsAdding(false);
    };

    const handleInputChange = (field: keyof ServiceItem, value: string) => {
        setNewItem(prev => ({...prev, [field]: value }));
    }

    if (!isAdding) {
        return (
            <Button variant="ghost" size="sm" className="mt-2 w-full justify-start" onClick={() => setIsAdding(true)}>
                <PlusCircle size={16} className="mr-2" />
                Adicionar Serviço
            </Button>
        );
    }

    return (
         <div className="flex flex-col text-left text-sm p-2 rounded-md border border-border mt-4 space-y-2">
            <Input placeholder="Nome do serviço" value={newItem.name} onChange={e => handleInputChange('name', e.target.value)} />
            <Input placeholder="Endereço" value={newItem.address} onChange={e => handleInputChange('address', e.target.value)} />
            <Input placeholder="Telefone" value={newItem.phone} onChange={e => handleInputChange('phone', e.target.value)} />
            <div className="flex justify-end gap-2">
                <Button size="sm" onClick={handleAdd}><Save size={16} className="mr-1"/> Adicionar</Button>
                <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancelar</Button>
            </div>
        </div>
    );
}
