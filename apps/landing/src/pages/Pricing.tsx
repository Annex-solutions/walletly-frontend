import { Check, Minus, Plus } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Button } from '../components/Button';
import { DitherField } from '../components/DitherField';
import { Reveal } from '../components/Reveal';
import { PageHero, SectionHead } from '../components/Section';

const PLANS = [
  {
    name: 'Sandbox',
    price: 'Free',
    note: 'While you build',
    cta: 'Request keys',
    features: ['Isolated test environment', 'Test key pair', 'Webhook testing', 'Ledger explorer'],
  },
  {
    name: 'Launch',
    price: 'Onboarding + monthly',
    note: 'Once KYC clears',
    cta: 'Get early access',
    featured: true,
    features: ['Live keys and production ledger', 'Virtual accounts and payouts', 'First 100 internal transfers per user free each month', 'Settlement and fee reports', 'Rolling API keys'],
  },
  {
    name: 'Scale',
    price: 'Custom',
    note: 'High volume',
    cta: 'Talk to us',
    features: ['Everything in Launch', 'Negotiated gateway margins', 'Custom limits and tiers', 'Priority support'],
  },
];

const FEES = [
  { k: 'Onboarding', v: 'One-time fee when your business goes live.' },
  { k: 'Subscription', v: 'A monthly tier based on API usage.' },
  { k: 'External rails', v: 'Gateway cost plus a margin, taken when a VA credit or payout runs.' },
  { k: 'Internal transfers', v: 'Free up to 100 per month, then a micro-fee per transfer.' },
];

const FAQ = [
  {
    q: 'Do I need a CBN licence to use Walletly?',
    a: 'No. Walletly holds the ledger and the gateway relationships, so you can offer wallets without a licence of your own. You do need to pass our KYC before going live.',
  },
  {
    q: 'Which currencies are supported?',
    a: 'NGN only for now. Multi-currency and crypto are out of scope for the first release.',
  },
  {
    q: 'How are fees collected?',
    a: 'Fees are posted as their own ledger entries at the time of the transaction, so they show up line by line in your reconciliation reports.',
  },
  {
    q: 'What happens after 100 internal transfers?',
    a: 'A background job tracks each user’s monthly count. Transfers beyond the free allowance carry a small fee, debited as a separate entry.',
  },
];

export default function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={['Pay when', <span className="serif-accent text-signal">money moves.</span>]}
        body="A flat setup, a monthly tier and a margin on external rails. Moving money between your own users stays free for the first 100 each month."
        aside={
          <div className="absolute inset-y-0 right-0 hidden w-[42%] md:block">
            <DitherField mode="terrain" color="#3a3934" background="#0b0b0a" pixel={3} speed={0.8} />
            <div className="absolute inset-0 bg-gradient-to-r from-ink to-transparent" />
          </div>
        }
      />

      <section className="container-x py-24 md:py-32">
        <div className="grid gap-4 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="h-full">
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 ${
                  p.featured ? 'border-paper/30 bg-paper text-ink' : 'border-line bg-ink'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-medium">{p.name}</span>
                  <span className={`font-mono text-[10px] uppercase tracking-[0.14em] ${p.featured ? 'text-signal' : 'text-dim'}`}>
                    {p.note}
                  </span>
                </div>
                <p className="mt-12 text-[34px] font-medium leading-none tracking-[-0.04em]">{p.price}</p>
                <ul className="mt-10 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-start gap-3 text-[14.5px] ${p.featured ? 'text-ink/80' : 'text-paper/80'}`}>
                      <Check size={16} weight="bold" className="mt-0.5 shrink-0 text-signal" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button to="/waitlist" variant={p.featured ? 'signal' : 'ghost'} className="mt-10 w-full">
                  {p.cta}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 font-mono text-[11px] text-dim">Exact rates are shared with early-access teams during onboarding.</p>
      </section>

      <section className="border-y border-line bg-ink-2">
        <div className="container-x py-24 md:py-32">
          <SectionHead index="01" eyebrow="How fees work" title={['Four lines.', <span className="text-mute">No surprises.</span>]} />
          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <dl className="divide-y divide-line border-y border-line">
              {FEES.map((f, i) => (
                <Reveal key={f.k} delay={i * 0.05}>
                  <div className="grid grid-cols-[140px_1fr] gap-6 py-5">
                    <dt className="font-mono text-[12px] uppercase tracking-[0.1em] text-paper">{f.k}</dt>
                    <dd className="text-[15px] text-mute">{f.v}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={0.1}>
              <FreeTransfers />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-x py-24 md:py-32">
        <SectionHead index="02" eyebrow="Questions" title={['Before you ask.']} />
        <div className="mt-14 md:ml-[25%]">
          <Faq />
        </div>
      </section>
    </>
  );
}

function FreeTransfers() {
  const [count, setCount] = useState(64);
  const free = Math.min(count, 100);
  const paid = Math.max(0, count - 100);
  return (
    <div className="rounded-2xl border border-line bg-ink p-6">
      <div className="flex items-baseline justify-between">
        <p className="eyebrow">One user, one month</p>
        <p className="font-mono text-[12px] text-mute">
          <span className="text-paper">{count}</span> transfers
        </p>
      </div>
      <div className="mt-6 grid grid-cols-[repeat(20,1fr)] gap-[3px]" aria-hidden="true">
        {Array.from({ length: 160 }, (_, i) => (
          <span
            key={i}
            className={`aspect-square transition-colors duration-300 ${
              i < count ? (i < 100 ? 'bg-paper' : 'bg-signal') : i < 100 ? 'bg-line' : 'bg-line/50'
            }`}
          />
        ))}
      </div>
      <label className="mt-6 block">
        <span className="sr-only">Transfers this month</span>
        <input
          type="range"
          min={0}
          max={160}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full accent-signal"
        />
      </label>
      <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-line">
        <div className="bg-ink-2 p-4">
          <p className="eyebrow">Free</p>
          <p className="mt-2 text-[28px] font-medium tracking-[-0.03em] tabular-nums">{free}</p>
        </div>
        <div className="bg-ink-2 p-4">
          <p className="eyebrow">With micro-fee</p>
          <p className={`mt-2 text-[28px] font-medium tracking-[-0.03em] tabular-nums ${paid ? 'text-signal' : ''}`}>{paid}</p>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line border-y border-line">
      {FAQ.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              className="flex w-full items-center justify-between gap-6 py-6 text-left text-[19px] tracking-[-0.02em] transition-colors hover:text-signal"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              {f.q}
              {isOpen ? <Minus size={18} className="shrink-0" /> : <Plus size={18} className="shrink-0" />}
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-[15.5px] leading-relaxed text-mute">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
