/**
 * The Walletly mark: three inflow nodes settling into two outflow nodes,
 * the ledger's double entry drawn as a lattice. Square nodes keep it crisp
 * at small sizes and echo the dither grid used across the site.
 */
export function LogoMark({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6">
        <path d="M8.5 9.5 12.2 22.5M16 9.5l-3.8 13M16 9.5l3.8 13M23.5 9.5l-3.8 13" />
      </g>
      <g fill="currentColor">
        <rect x="6" y="5" width="5" height="5" />
        <rect x="13.5" y="5" width="5" height="5" />
        <rect x="21" y="5" width="5" height="5" />
      </g>
      <g className="fill-signal">
        <rect x="9.75" y="21" width="5" height="5" />
        <rect x="17.25" y="21" width="5" height="5" />
      </g>
    </svg>
  );
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-6 w-6 text-paper" />
      <span className="text-[17px] font-medium tracking-[-0.03em]">walletly</span>
    </span>
  );
}
