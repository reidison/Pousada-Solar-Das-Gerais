import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function ColonialCorner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M 20 5 C 10 5 5 10 5 20" />
      <path d="M 5 20 Q 5 50 25 50" />
      <path d="M 25 50 C 40 50 40 40 50 25" />
      <path d="M 50 25 Q 50 5 80 5" />
      <path d="M 50 25 C 60 30 75 35 75 45 S 65 60 50 75" />
      <path d="M 25 50 C 30 60 35 75 45 75 S 60 65 75 50" />
    </svg>
  );
}
