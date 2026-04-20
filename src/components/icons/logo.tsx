
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface LogoProps extends Omit<React.ComponentProps<typeof Image>, 'alt' | 'src'> {
  src: string;
}

export function Logo({ src, className, ...props }: LogoProps) {
  const [error, setError] = useState(false);
  const fallbackLogo = "https://i.imgur.com/jRjiohM.png";

  useEffect(() => {
    setError(false);
  }, [src]);

  // Check if URL is valid before passing to Next.js Image
  const isUrlLikelyValid = (url: string) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return url.startsWith('/') || url.startsWith('data:');
    }
  };

  const finalSrc = !error && isUrlLikelyValid(src) ? src : fallbackLogo;

  return (
    <div className={cn("relative flex items-center justify-center bg-white overflow-hidden", className)}>
      <Image
        src={finalSrc}
        alt="Pousada Bela Vista"
        width={400}
        height={150}
        priority
        unoptimized={finalSrc.includes('canva.link')}
        className="w-full h-full object-contain"
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
}
