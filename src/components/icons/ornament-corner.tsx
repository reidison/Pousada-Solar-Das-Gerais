import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function OrnamentCorner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M 2 50 Q 50 50, 50 2" />
      <path d="M 25 50 Q 50 40, 55 25" />
      <path d="M 50 25 Q 40 30, 25 22" />
      <circle cx="2" cy="50" r="4" fill="currentColor" stroke="none" />
      <circle cx="50" cy="2" r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}
