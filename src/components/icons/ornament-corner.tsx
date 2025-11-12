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
      <path d="M 0 50 L 50 50 L 50 0" fill="none" />
      <path d="M 25 50 C 25 65, 35 75, 50 75 S 75 65, 75 50" fill="none" />
      <circle cx="50" cy="50" r="5" fill="currentColor" stroke="none" />
    </svg>
  );
}
