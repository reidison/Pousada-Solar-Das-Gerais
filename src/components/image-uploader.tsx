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
    if (!url) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <ImagePlus size={24} />
            </div>
        );
    }
    
    if (isImage(url)) {
      return (
        <Image 
            src={url} 
            alt="Image preview" 
            fill 
            style={{ objectFit: 'cover' }}
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
            className="w-full h-full object-cover" 
        />
      );
    }
  
    // If the URL is not empty but not a valid media type, show a warning
    return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-2 text-center">
          <FileWarning size={24} />
          <span className="text-xs mt-1">URL inválida ou formato não suportado</span>
        </div>
    );
}

export function ImageUploader({ imageUrl, onImageUrlChange }: ImageUploaderProps) {
  const { translations } = useLanguage();
  const t = translations.cityTourModal;

  return (
    <div className="flex-grow flex items-center gap-2">
      <div className="flex-shrink-0 w-20 h-20 bg-muted rounded-md overflow-hidden relative group">
        <MediaPreview url={imageUrl} />
      </div>
      <Input
        type="text"
        placeholder={t.imageUrlPlaceholder}
        value={imageUrl}
        onChange={(e) => onImageUrlChange(e.target.value)}
        className="flex-grow"
      />
    </div>
  );
}
