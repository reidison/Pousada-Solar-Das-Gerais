
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  className?: string;
}

export function Logo({ src, className, ...props }: LogoProps) {
  const activeSrc = src && src.trim() !== '' ? src : '/images/logo.png';

  return (
    <div className={cn("relative flex items-center select-none", className)} {...props}>
      <img
        src={activeSrc}
        alt="Pousada Solar das Gerais"
        className="h-10 sm:h-12 w-auto object-contain max-w-[260px]"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/images/logo.png';
        }}
      />
    </div>
  );
}
