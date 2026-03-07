
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc, writeBatch, getDocs } from 'firebase/firestore';
import { Phone, PlusCircle, Trash2, Save, X, Edit } from 'lucide-react';
import type { WithId } from '@/firebase';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/language-context';

interface ServiceItem {
  name: string;
  address: string;
  phone: string;
}

interface ServiceCategory {
  name: string;
}

const defaultServicesData = [
  {
    category: "Farmácias",
    items: [
      { name: "Farmácia", address: "R. São José, 115 - Centro", phone: "(31) 3551-1763" },
      { name: "Drogaria Araújo", address: "Praça Tiradentes, 53 - Centro", phone: "(31) 3551-1925" },
    ]
  },
  {
    category: "Mecânica e Postos de Combustíveis",
    items: [
      { name: "Posto Shell", address: "Rod. dos Inconfidentes, 782", phone: "(31) 3551-1589" }
    ]
  },
  {
    category: "Hospitais",
    items: [
      { name: "Santa Casa da Misericórdia", address: "R. Dr. Alves de Brito, 147 - Centro", phone: "(31) 3551-1144" },
    ]
  }
];

export function UsefulServicesModal() {
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const { translations } = useLanguage();
  const t = translations.usefulServicesModal;
  const tInfoCard = translations.infoCards.usefulPhones;
  
  const isAdmin = user && !user.isAnonymous;

  const categoriesRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'service_categories');
  }, [firestore]);

  const { data: categories, isLoading: isLoadingCategories } = useCollection<ServiceCategory>(categoriesRef);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleAddCategory = async () => {
    if (newCategoryName.trim() === '' || !categoriesRef) return;
    await addDoc(categoriesRef, { name: newCategoryName.trim() });
    setNewCategoryName('');
    setIsAddingCategory(false);
  };
  
  const handleImportDefaultServices = async () => {
    if (!firestore || !categoriesRef) return;

    if (categories && categories.length > 0 && !window.confirm(t.replaceConfirm)) {
        return;
    }

    setIsImporting(true);
    toast({ title: t.importToastTitle, description: t.importToastDescription });

    try {
        const batch = writeBatch(firestore);

        if (categories) {
            for (const category of categories) {
                const itemsCollectionRef = collection(firestore, 'service_categories', category.id, 'items');
                const itemsSnapshot = await getDocs(itemsCollectionRef);
                itemsSnapshot.docs.forEach(doc => batch.delete(doc.ref));
                
                const categoryDocRef = doc(firestore, 'service_categories', category.id);
                batch.delete(categoryDocRef);
            }
        }
        
        for (const service of defaultServicesData) {
            const categoryDocRef = doc(categoriesRef);
            batch.set(categoryDocRef, { name: service.category });
            
            const itemsCollectionRef = collection(firestore, 'service_categories', categoryDocRef.id, 'items');
            service.items.forEach(item => {
                const newItemRef = doc(itemsCollectionRef);
                batch.set(newItemRef, item);
            });
        }

        await batch.commit();
        toast({ title: t.importSuccessToastTitle, description: t.importSuccessToastDescription });
    } catch (error) {
        console.error("Erro ao importar serviços:", error);
        toast({ variant: "destructive", title: t.importErrorToastTitle, description: t.importErrorToastDescription });
    } finally {
        setIsImporting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4 hover:bg-transparent hover:text-foreground">{tInfoCard.button}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>
            {t.description}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-4 space-y-4">
          {isLoadingCategories ? (
            <p>{t.loading}</p>
          ) : (
            <Accordion type="multiple" className="w-full">
              {categories?.map((category) => (
                <CategoryItem key={category.id} category={category} isAdmin={isAdmin} />
              ))}
            </Accordion>
          )}
          {isAdmin && (
            <div className="mt-4 border-t pt-4">
              {isAddingCategory ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder={t.newCategoryPlaceholder}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                  />
                  <Button size="icon" onClick={handleAddCategory}><Save size={16}/></Button>
                  <Button size="icon" variant="ghost" onClick={() => setIsAddingCategory(false)}><X size={16}/></Button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                   <Button variant="outline" size="sm" onClick={() => setIsAddingCategory(true)}>
                      <PlusCircle size={16} className="mr-2" />
                      {t.addCategoryButton}
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleImportDefaultServices} disabled={isImporting}>
                      {isImporting ? t.importingButton : t.importButton}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CategoryItem({ category, isAdmin }: { category: WithId<ServiceCategory>, isAdmin: boolean | null }) {
  const firestore = useFirestore();
  const { translations } = useLanguage();
  const t = translations.usefulServicesModal;

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
    if (!categoryDocRef || !itemsRef || !firestore) return;
    try {
      const itemsSnapshot = await getDocs(itemsRef);
      const batch = writeBatch(firestore);
      itemsSnapshot.docs.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
      await deleteDoc(categoryDocRef);
    } catch(e) {
      console.error("Error deleting category and its items:", e);
    }
  };
  
  const categoryNameToConfirm = category.name || t.untitledCategory;

  return (
    <AccordionItem value={category.id}>
      <div className="flex items-center w-full group">
        <AccordionTrigger className="flex-grow hover:no-underline flex-1 py-2 pr-2">
            {isEditingCategory ? (
              <div className="flex items-center gap-2 flex-grow mr-2" onClick={(e) => e.stopPropagation()}>
                <Input
                  value={editedCategoryName}
                  onChange={(e) => setEditedCategoryName(e.target.value)}
                  className="h-8"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleUpdateCategory();
                    if (e.key === 'Escape') setIsEditingCategory(false);
                  }}
                />
              </div>
            ) : (
              <span className="font-semibold text-left">{category.name || <span className="italic text-muted-foreground">{t.untitledCategory}</span>}</span>
            )}
        </AccordionTrigger>
        {isAdmin && (
          <div className="flex items-center gap-1 pl-2">
              {isEditingCategory ? (
                  <>
                      <Button size="icon" variant="ghost" onClick={handleUpdateCategory}><Save size={16} /></Button>
                      <Button size="icon" variant="ghost" onClick={() => setIsEditingCategory(false)}><X size={16} /></Button>
                  </>
              ) : (
                  <Button size="icon" variant="ghost" onClick={() => setIsEditingCategory(true)}><Edit size={16} /></Button>
              )}
               <AlertDialog>
                  <AlertDialogTrigger asChild>
                      <Button size="icon" variant="ghost"><Trash2 size={16} className="text-destructive"/></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                      <AlertDialogHeader>
                          <AlertDialogTitle>{t.deleteConfirmTitle}</AlertDialogTitle>
                          <AlertDialogDescription>
                              {t.deleteCategoryConfirm(categoryNameToConfirm)}
                          </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                          <AlertDialogCancel>{t.cancelButton}</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteCategory}>{t.deleteButton}</AlertDialogAction>
                      </AlertDialogFooter>
                  </AlertDialogContent>
              </AlertDialog>
          </div>
        )}
      </div>
      <AccordionContent>
        <div className="space-y-2">
          {isLoadingItems ? <p>{t.loading}</p> : items?.map((item) => (
            <ServiceListItem key={item.id} categoryId={category.id} item={item} isAdmin={isAdmin} />
          ))}
          {isAdmin && <AddItemForm categoryId={category.id} />}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

function ServiceListItem({ categoryId, item, isAdmin }: { categoryId: string; item: WithId<ServiceItem>, isAdmin: boolean | null }) {
    const firestore = useFirestore();
    const { translations } = useLanguage();
    const t = translations.usefulServicesModal;

    const itemDocRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return doc(firestore, 'service_categories', categoryId, 'items', item.id);
    }, [firestore, categoryId, item.id]);

    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState(item);

    const handleDelete = async () => {
        if (!itemDocRef) return;
        await deleteDoc(itemDocRef);
    };

    const handleUpdate = async () => {
        if (!itemDocRef) return;
        await updateDoc(itemDocRef, {
            name: editedItem.name.trim(),
            address: editedItem.address.trim(),
            phone: editedItem.phone.trim(),
        });
        setIsEditing(false);
    };

    const handleInputChange = (field: keyof ServiceItem, value: string) => {
        setEditedItem(prev => ({...prev, [field]: value }));
    }
    
    const itemNameToConfirm = editedItem.name || t.untitledItem;

    if (isEditing) {
        return (
            <div className="flex flex-col text-left text-sm p-2 rounded-md border border-border space-y-2">
                <Input placeholder={t.addServiceItemNamePlaceholder} value={editedItem.name} onChange={e => handleInputChange('name', e.target.value)} />
                <Input placeholder={t.addServiceItemAddressPlaceholder} value={editedItem.address} onChange={e => handleInputChange('address', e.target.value)} />
                <Input placeholder={t.addServiceItemPhonePlaceholder} value={editedItem.phone} onChange={e => handleInputChange('phone', e.target.value)} />
                <div className="flex justify-end gap-2">
                    <Button size="sm" onClick={handleUpdate}><Save size={16} className="mr-1"/> {t.saveButton}</Button>
                    <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>{t.cancelButton}</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-between items-start text-left text-sm p-2 rounded-md border border-transparent hover:border-border group">
            <div className="flex-grow">
                <p className="font-medium text-primary">{item.name || <span className="italic text-muted-foreground">{t.untitledItem}</span>}</p>
                <p className="text-muted-foreground">{item.address}</p>
                {item.phone && item.phone.match(/\d/) ? (
                   <a href={`tel:${item.phone.replace(/\D/g, '')}`} className="text-green-600 flex items-center gap-2 mt-1 hover:underline">
                    <Phone size={14} />
                    <span>{item.phone}</span>
                  </a>
                ) : (
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <Phone size={14} />
                    <span>{item.phone || t.phoneNotAvailable}</span>
                  </p>
                )}
            </div>
            {isAdmin && (
              <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}><Edit size={16} /></Button>
                  <AlertDialog>
                      <AlertDialogTrigger asChild>
                          <Button size="icon" variant="ghost"><Trash2 size={16} className="text-destructive"/></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <AlertDialogTitle>{t.deleteConfirmTitle}</AlertDialogTitle>
                              <AlertDialogDescription>
                                  {t.deleteConfirm(itemNameToConfirm)}
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                              <AlertDialogCancel>{t.cancelButton}</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDelete}>{t.deleteButton}</AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                  </AlertDialog>
              </div>
            )}
        </div>
    );
}

function AddItemForm({ categoryId }: { categoryId: string }) {
    const firestore = useFirestore();
    const { translations } = useLanguage();
    const t = translations.usefulServicesModal;

    const itemsRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'service_categories', categoryId, 'items');
    }, [firestore, categoryId]);

    const [newItem, setNewItem] = useState({ name: '', address: '', phone: '' });
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = async () => {
        if (!itemsRef) return;
        if (newItem.name.trim() === '' && newItem.address.trim() === '' && newItem.phone.trim() === '') {
            setIsAdding(false);
            return;
        }
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
                {t.addServiceButton}
            </Button>
        );
    }

    return (
         <div className="flex flex-col text-left text-sm p-2 rounded-md border border-border mt-4 space-y-2">
            <Input placeholder={t.addServiceItemNamePlaceholder} value={newItem.name} onChange={e => handleInputChange('name', e.target.value)} />
            <Input placeholder={t.addServiceItemAddressPlaceholder} value={newItem.address} onChange={e => handleInputChange('address', e.target.value)} />
            <Input placeholder={t.addServiceItemPhonePlaceholder} value={newItem.phone} onChange={e => handleInputChange('phone', e.target.value)} />
            <div className="flex justify-end gap-2">
                <Button size="sm" onClick={handleAdd}><Save size={16} className="mr-1"/> {t.saveButton}</Button>
                <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>{t.cancelButton}</Button>
            </div>
        </div>
    );
}
