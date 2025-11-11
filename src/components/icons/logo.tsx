'use client';

import Image from 'next/image';

interface LogoProps extends Omit<React.ComponentProps<typeof Image>, 'alt'> {
  src: string;
}

export function Logo({ src, ...props }: LogoProps) {
  return (
    <Image
      src={src}
      alt="Pousada Solar das Gerais"
      width={472}
      height={184}
      priority
      {...props}
    />
  );
}
