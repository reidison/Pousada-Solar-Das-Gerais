'use client';

import React, { useState, useRef } from 'react';
import { useFirebase } from '@/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, RotateCcw, Link2, Loader2, Image as ImageIcon, Download } from 'lucide-react';
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

  // Default images for download
  const defaultImageUrl =
    aspectRatio === 'logo'
      ? '/images/logo.png'
      : aspectRatio === 'hero'
      ? '/images/hero-ouro-preto.png'
      : '';

  // Processa e comprime a imagem diretamente no navegador de forma instantânea
  const processAndCompressImage = (file: File, maxDim: number, quality: number = 0.8): Promise<string> => {
    return new Promise((resolve, reject) => {
      // SVGs podem ser lidos diretamente como Data URL sem passar por canvas
      if (file.type === 'image/svg+xml') {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Falha ao ler arquivo SVG'));
        reader.readAsDataURL(file);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const rawResult = e.target?.result as string;
        const img = new window.Image();

        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            let width = img.naturalWidth || img.width;
            let height = img.naturalHeight || img.height;

            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }

            canvas.width = Math.max(1, width);
            canvas.height = Math.max(1, height);
            const ctx = canvas.getContext('2d');

            if (!ctx) {
              resolve(rawResult);
              return;
            }

            ctx.drawImage(img, 0, 0, width, height);

            const isPng = file.type === 'image/png';
            // PNG para ícones/logos menores com transparência, JPEG para fotos grandes como hero
            const outputType = isPng && maxDim <= 400 ? 'image/png' : 'image/jpeg';
            const compressedDataUrl = canvas.toDataURL(outputType, quality);
            resolve(compressedDataUrl);
          } catch (canvasErr) {
            console.warn('Compressão em canvas falhou, usando imagem original:', canvasErr);
            resolve(rawResult);
          }
        };

        img.onerror = () => {
          // Fallback seguro caso o navegador não renderize a tag Image
          resolve(rawResult);
        };

        img.src = rawResult;
      };

      reader.onerror = () => reject(new Error('Falha ao ler o arquivo'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileProcess = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido (PNG, JPG, SVG, WebP).');
      return;
    }

    setIsUploading(true);
    const maxDim = aspectRatio === 'icon' ? 192 : aspectRatio === 'logo' ? 500 : 1200;
    const quality = aspectRatio === 'hero' ? 0.75 : 0.85;

    try {
      // 1. Processamento e compressão local imediata (< 100ms)
      const compressedDataUrl = await processAndCompressImage(file, maxDim, quality);

      // Aplica imediatamente para que o usuário veja a pré-visualização sem travar
      onChange(compressedDataUrl);
      setIsUploading(false);

      // 2. Tentativa assíncrona em background para Firebase Storage com timeout estrito de 2.5s
      if (storage) {
        try {
          const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
          const storageRef = ref(storage, `lodge_${folder}/${Date.now()}_${cleanName}`);

          const uploadTask = uploadBytes(storageRef, file);
          const timeoutTask = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout Firebase Storage')), 2500)
          );

          const snapshot = await Promise.race([uploadTask, timeoutTask]);
          const downloadUrl = await getDownloadURL(snapshot.ref);

          if (downloadUrl) {
            onChange(downloadUrl);
          }
        } catch (storageErr) {
          // Ignora erro de Storage/CORS silenciosamente pois a Data URL compactada já está salva e pronta
          console.warn('Firebase Storage inacessível ou sem permissão pública. Usando Data URL otimizada:', storageErr);
        }
      }
    } catch (err) {
      console.error('Erro ao processar imagem:', err);
      alert('Ocorreu um erro ao carregar a imagem. Tente novamente.');
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
    // Reseta o input para permitir selecionar o mesmo arquivo novamente se desejar
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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

  // Imagem para exibição (customizada ou padrão)
  const displayImage = value || defaultImageUrl;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-solar-navy font-semibold text-xs flex items-center gap-1.5">
          <ImageIcon size={14} className="text-amber-600" />
          {label}
        </Label>
        <div className="flex items-center gap-2">
          {defaultImageUrl && (
            <a
              href={defaultImageUrl}
              download={aspectRatio === 'logo' ? 'logo-pousada-solar-das-gerais.png' : 'hero-ouro-preto.png'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-solar-navy/70 hover:text-solar-navy flex items-center gap-1 transition-colors underline"
              title="Baixar imagem oficial padrão"
            >
              <Download size={11} />
              Baixar padrão
            </a>
          )}
          {onReset && value && (
            <button
              type="button"
              onClick={onReset}
              className="text-[11px] text-slate-500 hover:text-solar-navy flex items-center gap-1 transition-colors ml-1"
            >
              <RotateCcw size={11} />
              Restaurar
            </button>
          )}
        </div>
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

        {displayImage ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <div
              className={cn(
                "relative overflow-hidden bg-white border border-slate-200 shadow-xs flex items-center justify-center p-1",
                getPreviewClasses()
              )}
            >
              <img
                src={displayImage}
                alt={label}
                className={cn(
                  "object-contain max-h-full max-w-full",
                  aspectRatio === 'hero' && "object-cover w-full h-full"
                )}
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="h-7 text-xs rounded-lg gap-1 border-slate-200 hover:bg-white text-solar-navy"
              >
                <Upload size={12} />
                {value ? 'Substituir' : 'Fazer Upload'}
              </Button>

              <a
                href={displayImage}
                download={aspectRatio === 'logo' ? 'logo-pousada.png' : 'hero-pousada.png'}
                target="_blank"
                rel="noopener noreferrer"
                className="h-7 text-xs rounded-lg gap-1 border border-slate-200 hover:bg-white px-2.5 inline-flex items-center text-slate-700 transition-colors"
                title="Fazer download desta imagem"
              >
                <Download size={12} />
                Baixar
              </a>

              {value && (
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
              )}
            </div>

            {!value && (
              <span className="text-[10px] text-slate-400 italic">
                (Exibindo imagem padrão atual. Clique em &quot;Fazer Upload&quot; para enviar a sua imagem personalizada)
              </span>
            )}
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
        {showUrlInput && (
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
