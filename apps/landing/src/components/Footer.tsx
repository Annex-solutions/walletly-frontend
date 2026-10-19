import { Link } from 'react-router-dom';
import { DitherField } from './DitherField';
import { LogoMark } from './Logo';

const COLS = [
  {
    title: 'Product',
    links: [
      { to: '/platform', label: 'Platform' },
      { to: '/platform#ledger', label: 'Ledger' },
      { to: '/platform#routing', label: 'Gateway routing' },
      { to: '/pricing', label: 'Pricing' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { to: '/developers', label: 'API overview' },
      { to: '/developers#webhooks', label: 'Webhooks' },
      { to: '/developers#rollout', label: 'Sandbox rollout' },
      { to: '/login', label: 'Console' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/waitlist', label: 'Early access' },
      { to: '/platform#security', label: 'Security' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-line">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <LogoMark className="h-8 w-8 text-paper" />
          <p className="mt-6 text-[15px] leading-relaxed text-mute">
            Wallet infrastructure for Nigerian startups. NGN wallets, virtual accounts and payouts on one ledger.
          </p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <p className="eyebrow">{c.title}</p>
            <ul className="mt-5 space-y-3">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-[14px] text-paper/80 transition-colors hover:text-signal">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative h-[34vw] max-h-[420px] min-h-[160px] overflow-hidden">
        <DitherField mode="terrain" pixel={3} color="#2a2a27" background="#0b0b0a" speed={0.6} interactive={false} />
        <div className="pointer-events-none absolute inset-0 flex items-end">
          <p className="display w-full select-none text-center text-[22vw] leading-[0.75] text-paper/95 mix-blend-difference">
            walletly
          </p>
        </div>
      </div>

      <div className="container-x flex flex-col justify-between gap-3 border-t border-line py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-dim sm:flex-row">
        <span>© {new Date().getFullYear()} Walletly Inc.</span>
        <span>Lagos · NGN only · Early access</span>
      </div>
    </footer>
  );
}
