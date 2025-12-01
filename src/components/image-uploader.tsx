'use client';

import React from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { ImagePlus, Film, FileWarning } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

interface ImageUploaderProps {
  imageUrl: string;
  onImageUrlChange: (newUrl: string) => void;
}

const isImage = (url: string) => /\.(jpeg|jpg|gif|png|webp|avif)(\?.*)?$/i.test(url);
const isVideo = (url: string) => /\.(mp4|webm)(\?.*)?$/i.test(url);

function MediaPreview({ url }: { url: string }) {
    if (!url) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-muted rounded-md">
            <ImagePlus size={24} />
            <span className="text-xs mt-1 text-center px-2">
              Cole uma URL de imagem ou vídeo
            </span>
        </div>
      );
    }
  
    if (isImage(url)) {
      return (
        <Image 
            src={url} 
            alt="Image preview" 
            fill 
            style={{ objectFit: 'contain' }}
            className="rounded-md"
            onError={(e) => {
              // In case of error (e.g. 404), this prevents an infinite loop
              e.currentTarget.src = ''; // Clear the src to avoid re-triggering error
              e.currentTarget.style.display = 'none'; // Hide the broken image element
              // We can show a fallback here if needed
            }}
        />
      );
    }
  
    if (isVideo(url)) {
      return (
        <video 
            src={url} 
            playsInline 
            autoPlay 
            muted 
            loop 
            className="w-full h-full object-contain rounded-md"
        />
      );
    }
  
    return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-muted rounded-md">
            <FileWarning size={24} />
            <span className="text-xs mt-1 text-center px-2">
              URL inválida ou formato não suportado. Use links diretos para imagens (ex: .jpg, .png) ou vídeos (ex: .mp4).
            </span>
        </div>
    );
}

export function ImageUploader({ imageUrl, onImageUrlChange }: ImageUploaderProps) {
  const { translations } = useLanguage();
  const t = translations.cityTourModal;

  return (
    <div className="w-full space-y-2">
      <Input
        type="text"
        placeholder={t.imageUrlPlaceholder}
        value={imageUrl}
        onChange={(e) => onImageUrlChange(e.target.value)}
        className="flex-grow"
      />
      <div className="w-full h-[200px] bg-muted/50 rounded-lg overflow-hidden relative">
        <MediaPreview url={imageUrl} />
      </div>
    </div>
  );
}
