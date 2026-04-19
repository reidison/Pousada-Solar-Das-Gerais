
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps extends Omit<React.ComponentProps<typeof Image>, 'alt' | 'src'> {
  src: string;
}

export function Logo({ src, className, ...props }: LogoProps) {
  return (
    <div className={cn("relative flex items-center justify-center bg-white overflow-hidden", className)}>
      <Image
        src={src}
        alt="Pousada Bela Vista"
        width={400}
        height={150}
        priority
        className="w-full h-full object-contain"
        {...props}
      />
    </div>
  );
}
