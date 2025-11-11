import type { SVGProps } from 'react';
import Image from 'next/image';

export function Logo(props: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>) {
  return (
    <Image
      src="https://picsum.photos/seed/logo/472/184"
      alt="Pousada Solar das Gerais"
      width={472}
      height={184}
      priority
      {...props}
      data-ai-hint="logo"
    />
  );
}
