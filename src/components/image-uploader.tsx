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

const isImage = (url: string) => /\.(jpeg|jpg|gif|png|webp)(\?.*)?$/i.test(url);
const isVideo = (url: string) => /\.(mp4|webm)(\?.*)?$/i.test(url);

function MediaPreview({ url }: { url: string }) {
    if (isImage(url)) {
      return (
        <Image 
            src={url} 
            alt="Image preview" 
            fill 
            style={{ objectFit: 'contain' }}
            className="rounded-md"
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
          { url ? <FileWarning size={24} /> : <ImagePlus size={24} /> }
          <span className="text-xs mt-1 text-center px-2">
            { url ? "URL inválida ou formato não suportado" : "Cole uma URL de imagem ou vídeo" }
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
