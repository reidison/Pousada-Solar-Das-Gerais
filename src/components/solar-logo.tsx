'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SolarLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

const LOGO_SRC = '/assets/aistudio/image_9df25ae4.png';

export function SolarLogo({
  className = '',
  size = 'md',
  variant = 'light',
}: SolarLogoProps) {
  const dimensions = {
    sm: 'w-[126px] h-[52px]',
    md: 'w-[168px] h-[68px]',
    lg: 'w-[204px] h-[82px]',
  };

  if (variant === 'dark') {
    return (
      <Link
        href="/"
        aria-label="Pousada Solar das Gerais"
        className={`inline-flex items-center select-none bg-white rounded-lg px-2 py-0.5 shadow-xs hover:opacity-95 transition-opacity ${className}`}
      >
        <div className={`relative ${dimensions[size]} overflow-hidden`}>
          <Image
            src={LOGO_SRC}
            alt="Pousada Solar das Gerais"
            fill
            priority
            unoptimized
            referrerPolicy="no-referrer"
            className="object-cover object-center scale-[1.08]"
          />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label="Pousada Solar das Gerais"
      className={`inline-flex items-center select-none hover:opacity-90 transition-opacity ${className}`}
    >
      <div className={`relative ${dimensions[size]} overflow-hidden`}>
        <Image
          src={LOGO_SRC}
          alt="Pousada Solar das Gerais"
          fill
          priority
          unoptimized
          referrerPolicy="no-referrer"
          className="object-cover object-center scale-[1.08] mix-blend-multiply"
        />
      </div>
    </Link>
  );
}
