'use client';

import React, { useState, useRef } from 'react';
import { useFirebase } from '@/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, RotateCcw, Link2, Loader2, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  label: string;
  description?: string;
  value?: string;
  onChange: (url: string) => void;
  onReset?: () => void;
  aspectRatio?: 'hero' | 'logo' | 'icon';
  folder?: string;
  className?: string;
}

export function ImageUploader({
  label,
  description,
  value,
  onChange,
  onReset,
  aspectRatio = 'logo',
  folder = 'assets',
  className,
}: ImageUploaderProps) {
  const { storage } = useFirebase();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState('');
  const [dragOver, setDragOver] = useState(false);

  // Função para comprimir e converter em Data URL como fallback seguro
  const compressToDataUrl = (file: File, maxDim: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const format = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
            resolve(canvas.toDataURL(format, 0.85));
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.onerror = () => reject(new Error('Falha ao processar imagem'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Falha ao ler arquivo'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileProcess = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido (PNG, JPG, SVG, WebP).');
      return;
    }

    setIsUploading(true);
    const maxDim = aspectRatio === 'icon' ? 256 : aspectRatio === 'logo' ? 600 : 1400;

    try {
      // 1. Tentar upload para o Firebase Storage se configurado
      if (storage) {
        try {
          const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
          const storageRef = ref(storage, `lodge_${folder}/${Date.now()}_${cleanName}`);
          const snapshot = await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(snapshot.ref);
          onChange(downloadUrl);
          setIsUploading(false);
          return;
        } catch (storageError) {
          console.warn('Firebase Storage inacessível ou sem permissão pública. Usando compressão local Data URL:', storageError);
        }
      }

      // 2. Fallback: Compressão local e conversão em Data URL
      const dataUrl = await compressToDataUrl(file, maxDim);
      onChange(dataUrl);
    } catch (err) {
      console.error('Erro ao processar imagem:', err);
      alert('Ocorreu um erro ao carregar a imagem. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInputValue.trim()) {
      onChange(urlInputValue.trim());
      setUrlInputValue('');
      setShowUrlInput(false);
    }
  };

  const getPreviewClasses = () => {
    switch (aspectRatio) {
      case 'icon':
        return 'w-16 h-16 rounded-full';
      case 'hero':
        return 'w-full h-32 rounded-xl';
      case 'logo':
      default:
        return 'w-full h-24 rounded-xl';
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-solar-navy font-semibold text-xs flex items-center gap-1.5">
          <ImageIcon size={14} className="text-amber-600" />
          {label}
        </Label>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] text-slate-500 hover:text-solar-navy flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={11} />
            Restaurar padrão
          </button>
        )}
      </div>

      {description && <p className="text-[11px] text-slate-500">{description}</p>}

      {/* Caixa de Visualização / Upload */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-3 text-center transition-all bg-slate-50/50",
          dragOver ? "border-solar-navy bg-solar-cream/50" : "border-slate-200 hover:border-slate-300",
          isUploading && "opacity-75 pointer-events-none"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={handleFileChange}
          className="hidden"
        />

        {value ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <div
              className={cn(
                "relative overflow-hidden bg-white border border-slate-200 shadow-xs flex items-center justify-center p-1",
                getPreviewClasses()
              )}
            >
              <img
                src={value}
                alt={label}
                className={cn(
                  "object-contain max-h-full max-w-full",
                  aspectRatio === 'hero' && "object-cover w-full h-full"
                )}
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="h-7 text-xs rounded-lg gap-1 border-slate-200 hover:bg-white"
              >
                <Upload size={12} />
                Substituir
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onChange('')}
                disabled={isUploading}
                className="h-7 text-xs rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X size={12} />
                Remover
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-2 flex flex-col items-center justify-center gap-2">
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 py-3">
                <Loader2 size={24} className="animate-spin text-solar-navy" />
                <span className="text-xs text-slate-500">Enviando e otimizando imagem...</span>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <Upload size={18} />
                </div>
                <div className="text-xs text-slate-600">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="font-bold text-solar-navy hover:underline"
                  >
                    Clique para fazer upload
                  </button>{' '}
                  ou arraste o arquivo aqui
                </div>
                <span className="text-[10px] text-slate-400">PNG, JPG, SVG ou WebP</span>

                <div className="mt-1">
                  <button
                    type="button"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    className="text-[11px] text-solar-navy/70 hover:text-solar-navy underline flex items-center gap-1 mx-auto"
                  >
                    <Link2 size={11} />
                    {showUrlInput ? 'Ocultar inserção por URL' : 'Ou inserir por URL externa'}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Inserção manual de URL */}
        {showUrlInput && !value && (
          <div className="mt-3 pt-3 border-t border-slate-200 flex gap-2">
            <Input
              placeholder="https://exemplo.com/imagem.png"
              value={urlInputValue}
              onChange={(e) => setUrlInputValue(e.target.value)}
              className="h-8 text-xs rounded-lg"
            />
            <Button
              type="button"
              size="sm"
              onClick={handleUrlSubmit}
              className="h-8 text-xs bg-solar-navy hover:bg-solar-navyLight text-white rounded-lg"
            >
              Aplicar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
