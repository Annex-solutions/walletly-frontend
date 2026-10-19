import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { naira, shortId } from '../lib/format';

type Entry = {
  id: string;
  kind: 'VA_CREDIT' | 'P2P' | 'PAYOUT' | 'CHECKOUT' | 'FEE';
  debit: string;
  credit: string;
  amount: number;
  gateway: string;
};

const KINDS: Array<Omit<Entry, 'id' | 'amount'> & { range: [number, number] }> = [
  { kind: 'VA_CREDIT', debit: 'gateway:clearing', credit: 'wallet:usr_amaka', gateway: 'Monnify', range: [500000, 25000000] },
  { kind: 'P2P', debit: 'wallet:usr_tunde', credit: 'wallet:usr_ifeoma', gateway: 'internal', range: [100000, 4000000] },
  { kind: 'PAYOUT', debit: 'wallet:usr_ifeoma', credit: 'gateway:payouts', gateway: 'Squad', range: [1000000, 30000000] },
  { kind: 'CHECKOUT', debit: 'wallet:usr_kola', credit: 'tenant:revenue', gateway: 'internal', range: [150000, 2500000] },
  { kind: 'FEE', debit: 'wallet:usr_tunde', credit: 'platform:fees', gateway: 'internal', range: [1000, 5000] },
  { kind: 'VA_CREDIT', debit: 'gateway:clearing', credit: 'wallet:gst_9x2', gateway: 'Paystack', range: [800000, 12000000] },
];

const make = (): Entry => {
  const k = KINDS[Math.floor(Math.random() * KINDS.length)];
  const amount = Math.round((k.range[0] + Math.random() * (k.range[1] - k.range[0])) / 100) * 100;
  return { id: 'le_' + shortId(), kind: k.kind, debit: k.debit, credit: k.credit, gateway: k.gateway, amount };
};

const tone: Record<Entry['kind'], string> = {
  VA_CREDIT: 'text-mint',
  P2P: 'text-cobalt',
  PAYOUT: 'text-signal',
  CHECKOUT: 'text-paper',
  FEE: 'text-mute',
};

/** An illustrative, self-generating feed of balanced double-entry postings. */
export function LedgerTicker({ rows = 7 }: { rows?: number }) {
  const reduce = useReducedMotion();
  const [entries, setEntries] = useState<Entry[]>(() => Array.from({ length: rows }, make));

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setEntries((e) => [make(), ...e].slice(0, rows)), 1900);
    return () => clearInterval(id);
  }, [rows, reduce]);

  return (
    <div className="font-mono text-[11.5px] leading-none">
      <div className="grid grid-cols-[88px_1fr_96px] gap-3 border-b border-line px-4 py-3 text-dim sm:grid-cols-[96px_88px_1fr_110px]">
        <span>ENTRY</span>
        <span className="hidden sm:block">TYPE</span>
        <span>DEBIT → CREDIT</span>
        <span className="text-right">AMOUNT</span>
      </div>
      <ul className="relative">
        <AnimatePresence initial={false}>
          {entries.map((e) => (
            <motion.li
              key={e.id}
              layout
              initial={{ opacity: 0, backgroundColor: 'rgba(255,90,31,0.14)' }}
              animate={{ opacity: 1, backgroundColor: 'rgba(255,90,31,0)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-[88px_1fr_96px] items-center gap-3 border-b border-line/60 px-4 py-3 sm:grid-cols-[96px_88px_1fr_110px]"
            >
              <span className="text-mute">{e.id}</span>
              <span className={`hidden sm:block ${tone[e.kind]}`}>{e.kind}</span>
              <span className="truncate text-paper/70">
                {e.debit} <span className="text-dim">→</span> {e.credit}
              </span>
              <span className="text-right text-paper tabular-nums">{naira(e.amount)}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
