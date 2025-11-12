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
      <path d="M 95 50 C 95 75 75 95 50 95" />
      <path d="M 50 95 Q 20 95 20 70" />
      <path d="M 20 70 C 20 50 30 50 30 50" />
      <path d="M 50 95 C 70 95 80 85 80 70" />
      <path d="M 80 70 Q 80 60 70 60" />
      <path d="M 80 70 C 90 70 90 60 90 60" />
      <path d="M 30 50 C 5 50 5 5 50 5" />
      <path d="M 50 5 C 70 5 80 20 80 20" />
      <path d="M 50 5 C 50 25 35 25 35 25" />
    </svg>
  );
}
