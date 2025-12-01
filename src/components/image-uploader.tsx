'use client';

import React from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { ImagePlus } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

interface ImageUploaderProps {
  imageUrl: string;
  onImageUrlChange: (newUrl: string) => void;
}

export function ImageUploader({ imageUrl, onImageUrlChange }: ImageUploaderProps) {
  const { translations } = useLanguage();
  const t = translations.cityTourModal;

  return (
    <div className="flex-grow flex items-center gap-2">
      <div className="flex-shrink-0 w-20 h-20 bg-muted rounded-md overflow-hidden relative group">
        {imageUrl ? (
          <Image src={imageUrl} alt="Image preview" fill style={{ objectFit: 'cover' }} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <ImagePlus size={24} />
          </div>
        )}
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
