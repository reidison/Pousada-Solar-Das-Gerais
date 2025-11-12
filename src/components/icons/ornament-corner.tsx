import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function OrnamentCorner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M 98 50 C 70 50, 50 70, 50 98" />
      <path d="M 85 50 C 75 55, 65 65, 58 75" />
      <path d="M 98 63 C 90 65, 80 75, 75 85" />
      <circle cx="50" cy="98" r="3" fill="currentColor" stroke="none" />
      <circle cx="98" cy="50" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}
