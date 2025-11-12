import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function LaurelBranch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M60 20C40 40 30 70 30 100c0 30 10 60 30 80 M40 60c-20-10-30-5-30 10s10 25 30 10M40 140c-20 10-30 5-30-10s10-25 30-10 M50 100c-20 0-30-10-30-20s10-20 30-20M50 100c-20 0-30 10-30 20s10 20 30 20" />
    </svg>
  );
}
