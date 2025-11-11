import type { SVGProps } from 'react';
import Image from 'next/image';

export function Logo(props: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>) {
  return (
    <Image
      src="/logo.png"
      alt="Pousada Solar das Gerais"
      width={472}
      height={184}
      priority
      {...props}
    />
  );
}
