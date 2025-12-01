'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { ImagePlus, FileWarning } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

function MediaPreview({ url }: { url: string }) {
  const [isError, setIsError] = useState(false);
  const [isTryingVideo, setIsTryingVideo] = useState(false);

  React.useEffect(() => {
    setIsError(false);
    setIsTryingVideo(false);
  }, [url]);

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

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-muted rounded-md p-4">
        <FileWarning size={24} />
        <span className="text-xs mt-1 text-center px-2">
          URL inválida ou formato não suportado. Use links diretos para imagens (ex: .jpg, .png) ou vídeos (ex: .mp4).
        </span>
      </div>
    );
  }

  if (isTryingVideo) {
    return (
      <video
        src={url}
        playsInline
        autoPlay
        muted
        loop
        className="w-full h-full object-contain rounded-md"
        onError={() => setIsError(true)}
      />
    );
  }

  return (
    <Image
      src={url}
      alt="Image preview"
      fill
      style={{ objectFit: 'contain' }}
      className="rounded-md"
      unoptimized={true} // Useful for external URLs, especially if they are not standard image formats
      onError={() => {
        // If image fails, try rendering as a video
        setIsTryingVideo(true);
      }}
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
