import type { SVGProps } from 'react';

export function BrazilFlagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" {...props}>
      <rect fill="#009739" width="9" height="6" />
      <path fill="#FEDD00" d="M4.5 1L1 3l3.5 2L8 3z" />
      <circle fill="#002776" cx="4.5" cy="3" r="1" />
    </svg>
  );
}
