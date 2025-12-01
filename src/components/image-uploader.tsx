
'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { ImagePlus } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

function MediaPreview({ url }: { url: string }) {
  const { translations } = useLanguage();

  if (!url) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-muted rounded-md">
        <ImagePlus size={24} />
        <span className="text-xs mt-1 text-center px-2">
          {translations.cityTourModal.imageUrlPlaceholder}
        </span>
      </div>
    );
  }

  // Use a tag <img> padrão para contornar problemas com URLs sem extensão (como as do Imgur).
  // Isso é mais flexível.
  return (
    <img
      src={url}
      alt="Image preview"
      className="rounded-md object-contain w-full h-full"
    />
  );
}

export function ImageUploader({ imageUrl, onImageUrlChange }: { imageUrl: string; onImageUrlChange: (newUrl: string) => void; }) {
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
