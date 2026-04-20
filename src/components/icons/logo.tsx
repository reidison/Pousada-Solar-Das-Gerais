
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
    
    // Handle Imgur album or page links to get direct image link
    if (url.includes('imgur.com/') && !url.includes('i.imgur.com')) {
      // Remove trailing slashes and get ID
      const cleanUrl = url.replace(/\/$/, "");
      const id = cleanUrl.split('/').pop();
      if (id && id.length > 3) {
        return `https://i.imgur.com/${id}.png`;
      }
    }
    return url;
  };

  const finalSrc = !error && isUrlLikelyValid(src) ? processSrc(src) : fallbackLogo;

  return (
    <div className={cn("relative flex items-center justify-center bg-transparent overflow-hidden", className)}>
      <Image
        src={finalSrc}
        alt="Pousada Bela Vista"
        width={400}
        height={150}
        priority
        unoptimized={finalSrc.includes('imgur.com') || finalSrc.includes('canva.link')}
        className="w-full h-full object-contain"
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
}
