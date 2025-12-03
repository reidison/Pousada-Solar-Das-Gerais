
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, PlusCircle, Edit, Save, Trash2, X, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useCollection, useFirestore, useMemoFirebase, type WithId } from '@/firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
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

interface TourStop {
  title: string;
  description: string;
  coverImage: string;
}

export default function AdminCityTourPage() {
  const { toast } = useToast();
  const firestore = useFirestore();

  const tourStopsRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'tour_stops') : null),
    [firestore]
  );

  const { data: tourStops, isLoading } = useCollection<TourStop>(tourStopsRef);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <Link href="/admin" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} className="mr-1" />
          Voltar para Administração
        </Link>
        <h1 className="text-2xl font-bold text-primary">Gerenciar City Tour</h1>
      </header>

      <div className="space-y-6">
        <AddItemForm />

        {isLoading && <p>Carregando pontos turísticos...</p>}

        {tourStops?.map((stop) => (
          <EditableTourStopCard key={stop.id} stop={stop} />
        ))}

        {!isLoading && tourStops?.length === 0 && (
          <Card className="text-center">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold">Nenhum ponto turístico encontrado</h2>
              <p className="text-muted-foreground">Adicione o primeiro ponto turístico usando o formulário acima.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function AddItemForm() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [newItem, setNewItem] = useState({ title: '', description: '', coverImage: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const itemsRef = useMemoFirebase(() => {
      if (!firestore) return null;
      return collection(firestore, 'tour_stops');
  }, [firestore]);

  const handleAdd = async () => {
    if (!itemsRef || !newItem.title || !newItem.description || !newItem.coverImage) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Por favor, preencha todos os campos.' });
      return;
    }
    setIsSaving(true);
    try {
      await addDoc(itemsRef, {
        title: newItem.title.trim(),
        description: newItem.description.trim(),
        coverImage: newItem.coverImage.trim(),
      });
      toast({ title: 'Sucesso', description: 'Ponto turístico adicionado.' });
      setNewItem({ title: '', description: '', coverImage: '' });
      setIsAdding(false);
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
      toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível adicionar o ponto turístico.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof TourStop, value: string) => {
    setNewItem(prev => ({...prev, [field]: value }));
  }

  if (!isAdding) {
    return (
      <Button onClick={() => setIsAdding(true)} className="w-full md:w-auto">
        <PlusCircle size={16} className="mr-2" />
        Adicionar Ponto Turístico
      </Button>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Novo Ponto Turístico</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Título" value={newItem.title} onChange={e => handleInputChange('title', e.target.value)} />
        <Textarea placeholder="Descrição" value={newItem.description} onChange={e => handleInputChange('description', e.target.value)} />
        <Input placeholder="URL da Imagem de Capa (link direto, ex: .jpg, .png)" value={newItem.coverImage} onChange={e => handleInputChange('coverImage', e.target.value)} />
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={() => setIsAdding(false)} disabled={isSaving}>Cancelar</Button>
          <Button onClick={handleAdd} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
            Salvar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TourStopImage({ src, alt }: { src: string; alt: string; }) {
    const [hasError, setHasError] = useState(false);
    
    // Sanitize the URL by removing all whitespace and checking for a valid protocol.
    const cleanSrc = src ? src.replace(/\s/g, '') : '';
    const isValidSrc = cleanSrc.startsWith('http://') || cleanSrc.startsWith('https');

    React.useEffect(() => {
        // Reset error state when src changes
        setHasError(false);
    }, [src]);

    if (!isValidSrc || hasError) {
      return (
        <div className="aspect-[4/3] w-full rounded-md overflow-hidden bg-muted flex items-center justify-center">
            <span className="text-xs text-muted-foreground text-center p-2">URL da imagem inválida ou não foi possível carregar. Verifique o link.</span>
        </div>
      );
    }
  
    return (
      <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden">
        <Image
          src={cleanSrc}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          onError={() => setHasError(true)}
        />
      </div>
    );
}

function EditableTourStopCard({ stop }: { stop: WithId<TourStop> }) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(stop);
  const [isSaving, setIsSaving] = useState(false);

  const itemDocRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'tour_stops', stop.id);
  }, [firestore, stop.id]);

  const handleUpdate = async () => {
    if (!itemDocRef) return;
    setIsSaving(true);
    try {
      await updateDoc(itemDocRef, {
        title: editedItem.title.trim(),
        description: editedItem.description.trim(),
        coverImage: editedItem.coverImage.trim(),
      });
      toast({ title: 'Sucesso', description: 'Ponto turístico atualizado.' });
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível atualizar o item.' });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDelete = async () => {
    if (!itemDocRef) return;
    try {
        await deleteDoc(itemDocRef);
        toast({ title: 'Sucesso', description: 'Ponto turístico excluído.' });
    } catch (error) {
        console.error("Erro ao excluir item:", error);
        toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível excluir o item.' });
    }
  };

  const handleInputChange = (field: keyof TourStop, value: string) => {
    setEditedItem(prev => ({...prev, [field]: value }));
  }
  
  if (isEditing) {
    return (
      <Card>
        <CardContent className="p-6 space-y-4">
          <Input placeholder="Título" value={editedItem.title} onChange={e => handleInputChange('title', e.target.value)} />
          <Textarea placeholder="Descrição" value={editedItem.description} onChange={e => handleInputChange('description', e.target.value)} />
          <Input placeholder="URL da Imagem de Capa (link direto, ex: .jpg, .png)" value={editedItem.coverImage} onChange={e => handleInputChange('coverImage', e.target.value)} />
          
          <TourStopImage src={editedItem.coverImage} alt={editedItem.title} />

          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={() => { setIsEditing(false); setEditedItem(stop); }} disabled={isSaving}>Cancelar</Button>
            <Button onClick={handleUpdate} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
                Salvar Alterações
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group">
      <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-start">
        <div className="relative w-full md:w-1/3 flex-shrink-0">
          <TourStopImage src={stop.coverImage} alt={stop.title} />
        </div>
        <div className="flex-grow">
          <h3 className="font-bold text-lg text-primary">{stop.title}</h3>
          <p className="text-muted-foreground mt-2">{stop.description}</p>
        </div>
        <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="outline" onClick={() => setIsEditing(true)}>
            <Edit size={16} />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="destructive">
                <Trash2 size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir o ponto turístico "{stop.title}"? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}

    
