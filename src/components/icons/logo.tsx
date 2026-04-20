
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

  const isUrlLikelyValid = (url: string) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return url.startsWith('/') || url.startsWith('data:');
    }
  };

  const processSrc = (url: string) => {
    if (!url) return fallbackLogo;
    
    let processed = url;
    // Converte links de álbuns ou páginas do Imgur para links diretos de imagem
    if (url.includes('imgur.com/') && !url.includes('i.imgur.com')) {
      const id = url.split('/').pop()?.replace('a/', '');
      if (id && id.length > 3) {
        processed = `https://i.imgur.com/${id}.png`;
      }
    }
    return processed;
  };

  const finalSrc = !error && isUrlLikelyValid(src) ? processSrc(src) : fallbackLogo;

  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden", className)}>
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
