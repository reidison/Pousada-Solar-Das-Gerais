
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

  return (
    <div className={cn("relative flex items-center justify-center bg-white overflow-hidden", className)}>
      <Image
        src={error ? fallbackLogo : src}
        alt="Pousada Bela Vista"
        width={400}
        height={150}
        priority
        unoptimized={src.includes('canva.link')}
        className="w-full h-full object-contain"
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
}
