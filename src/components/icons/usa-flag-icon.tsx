import type { SVGProps } from 'react';

export function UsaFlagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" {...props}>
      <rect fill="#B31942" width="9" height="6" />
      <path
        fill="#fff"
        d="M0 1h9v1H0zm0 2h9v1H0z"
      />
      <rect fill="#0A3161" width="4" height="3" />
      <path
        fill="#fff"
        d="M.5 1l.2.6H1l-.5.4.2.6-.5-.3-.5.3.2-.6-.5-.4h.6zM2.5 1l.2.6H3l-.5.4.2.6-.5-.3-.5.3.2-.6-.5-.4h.6zM1.5.5l.2.6h.6l-.5.4.2.6-.5-.3-.5.3.2-.6-.5-.4h.6zM3.5.5l.2.6h.6l-.5.4.2.6-.5-.3-.5.3.2-.6-.5-.4h.6zM1.5 2.5l.2.6h.6l-.5.4.2.6-.5-.3-.5.3.2-.6-.5-.4h.6zM3.5 2.5l.2.6h.6l-.5.4.2.6-.5-.3-.5.3.2-.6-.5-.4h.6z"
      />
    </svg>
  );
}
