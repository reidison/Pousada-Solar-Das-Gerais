
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface LogoProps extends Omit<React.ComponentProps<typeof Image>, 'alt' | 'src'> {
  src: string;
}

export function Logo({ src, className, ...props }: LogoProps) {
  const [error, setError] = useState(false);
  const fallbackLogo = "https://i.imgur.com/NDqUUNp.png";

  useEffect(() => {
    setError(false);
  }, [src]);

  const processSrc = (url: string) => {
    if (!url) return fallbackLogo;
    
    // Remove espaços em branco no início e fim para evitar erro do Next.js Image
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return fallbackLogo;
    
    // Se já for um link direto de imagem, retorna ele mesmo
    if (trimmedUrl.match(/\.(jpeg|jpg|gif|png|webp)$/) !== null || trimmedUrl.includes('i.imgur.com')) {
      return trimmedUrl;
    }

    // Converte links de álbuns ou páginas do Imgur para links diretos de imagem (.png)
    if (trimmedUrl.includes('imgur.com/')) {
      const parts = trimmedUrl.split('/');
      const id = parts[parts.length - 1] || parts[parts.length - 2];
      const cleanId = id.replace('a/', '').split('?')[0].split('#')[0];
      if (cleanId && cleanId.length > 3) {
        return `https://i.imgur.com/${cleanId}.png`;
      }
    }
    return trimmedUrl;
  };

  const finalSrc = !error ? processSrc(src) : fallbackLogo;

  return (
    <div className={cn("relative flex items-center justify-center bg-transparent", className)}>
      <Image
        src={finalSrc}
        alt="Pousada Bela Vista"
        width={400}
        height={150}
        priority
        unoptimized={finalSrc.includes('imgur.com')}
        className="w-full h-full object-contain"
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
}
