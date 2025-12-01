'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ImagePlus, Edit } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

interface ImageUploaderProps {
  imageUrl: string;
  onImageUrlChange: (newUrl: string) => void;
}

export function ImageUploader({ imageUrl, onImageUrlChange }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { translations } = useLanguage();
  const t = translations.cityTourModal;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUrlChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex-grow flex items-center gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <div className="flex-shrink-0 w-20 h-20 bg-muted rounded-md overflow-hidden relative group">
        {imageUrl ? (
          <>
            <Image src={imageUrl} alt="Upload preview" fill style={{ objectFit: 'cover' }} />
            <div
              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={handleButtonClick}
            >
              <Edit className="text-white h-6 w-6" />
            </div>
          </>
        ) : (
          <div
            className="flex flex-col items-center justify-center h-full text-muted-foreground cursor-pointer"
            onClick={handleButtonClick}
          >
            <ImagePlus size={24} />
          </div>
        )}
      </div>
       <Button
          variant={imageUrl ? 'secondary' : 'default'}
          onClick={handleButtonClick}
          className="flex-grow justify-start"
        >
          {imageUrl ? t.changeImageButton : t.chooseImageButton}
        </Button>
    </div>
  );
}
