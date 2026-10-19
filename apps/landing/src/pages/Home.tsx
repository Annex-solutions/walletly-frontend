import {
  ArrowsLeftRight,
  Bank,
  CreditCard,
  Lightning,
  Receipt,
  ShoppingBagOpen,
  Vault,
} from '@phosphor-icons/react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Button } from '../components/Button';
import { CodeBlock } from '../components/CodeBlock';
import { DitherField } from '../components/DitherField';
import { LedgerTicker } from '../components/LedgerTicker';
import { MaskLines, Reveal } from '../components/Reveal';
import { SectionHead } from '../components/Section';
import { RoutingDiagram } from '../components/RoutingDiagram';
import { ClosingCta } from '../components/ClosingCta';
import { TRANSFER_SNIPPETS } from '../lib/snippets';

const PRIMITIVES = [
  {
    group: 'Inflow',
    items: [
      { icon: Vault, title: 'Dedicated virtual accounts', body: 'A reusable NGN account number for every end-user. Transfers in land on their wallet.' },
      { icon: Receipt, title: 'Disposable accounts', body: 'One-time account numbers for a single invoice or a guest checkout. No wallet needed.' },
      { icon: CreditCard, title: 'Direct checkout', body: 'Card, bank transfer and USSD through aggregated gateway checkout links.' },
    ],
  },
  {
    group: 'Outflow',
    items: [
      { icon: ArrowsLeftRight, title: 'Wallet to wallet', body: 'Instant P2P transfers between users on your platform. The first 100 each month are free.' },
      { icon: Bank, title: 'External payouts', body: 'Send from any wallet to any Nigerian bank account, queued and retried for you.' },
      { icon: ShoppingBagOpen, title: 'In-app checkout', body: 'Debit a user’s wallet for what they buy from you, posted straight to your revenue account.' },
    ],
  },
];

const SPECS = [
  ['Ledger', 'Double-entry, append-only'],
  ['Retries', 'Idempotency-Key on every write'],
  ['Rails', 'Paystack · Monnify · Squad'],
  ['Currency', 'NGN, open loop'],
];

export default function Home() {
  return (
    <>
      <Hero />
      <GatewayMarquee />
      <Primitives />
      <LedgerSection />
      <RoutingSection />
      <CodeSection />
      <ClosingCta />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden border-b border-line">
      <motion.div style={{ y: orbY }} className="absolute inset-0 md:left-[38%]">
        <DitherField mode="orb" color="#ff5a1f" background="#0b0b0a" pixel={3} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/75 to-ink/95 md:bg-gradient-to-r md:from-ink md:via-transparent md:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="container-x relative flex min-h-[100svh] flex-col justify-end pb-10 pt-32">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line-2 bg-ink/60 py-1.5 pl-2 pr-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/80 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            Early access for Nigerian startups
          </p>
        </Reveal>

        <h1 className="display mt-8 text-[clamp(3.4rem,11vw,10.5rem)]">
          <MaskLines
            delay={0.05}
            lines={[
              'NGN wallets,',
              <>
                <span className="serif-accent text-signal">without</span> the
              </>,
              'licence.',
            ]}
          />
        </h1>

        <div className="mt-10 grid items-end gap-10 md:grid-cols-12">
          <Reveal delay={0.4} className="md:col-span-5">
            <p className="text-[18px] leading-relaxed text-paper/75">
              Walletly is the wallet layer for your product. Give every user an NGN balance, a bank account number
              and payouts to any Nigerian bank, through one API. We run the ledger, the compliance and the gateways.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/waitlist">Get early access</Button>
              <Button to="/developers" variant="ghost">
                Read the API
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.55} className="md:col-span-5 md:col-start-8">
            <dl className="grid grid-cols-2 border-l border-t border-line">
              {SPECS.map(([k, v]) => (
                <div key={k} className="border-b border-r border-line bg-ink/85 p-4 backdrop-blur-md">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-2 text-[14px] text-paper">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}

function GatewayMarquee() {
  const words = ['Paystack', 'Monnify', 'Squad by GTBank', 'Virtual accounts', 'Payouts', 'USSD', 'Card', 'Bank transfer'];
  const row = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-b border-line py-6" aria-label="Payment rails">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="animate-marquee flex w-max items-center gap-12 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12 text-[22px] tracking-[-0.03em] text-paper/50">
            {w}
            <span className="h-1.5 w-1.5 bg-signal" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Primitives() {
  return (
    <section className="container-x py-28 md:py-40">
      <SectionHead
        index="01"
        eyebrow="Primitives"
        title={['Six money moves.', <span className="text-mute">One balance sheet.</span>]}
        body="Everything a wallet product needs to take money in, move it around and send it out. Each move posts balanced entries to the same ledger, so your numbers always reconcile."
      />
      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
        {PRIMITIVES.map((g, gi) => (
          <div key={g.group} className="bg-ink">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <span className="eyebrow">{g.group}</span>
              <span className={`h-2 w-2 ${gi === 0 ? 'bg-mint' : 'bg-signal'}`} />
            </div>
            {g.items.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="group relative flex gap-5 border-b border-line px-6 py-7 last:border-b-0 transition-colors duration-500 hover:bg-ink-2">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line-2 text-paper transition-colors duration-500 group-hover:border-signal group-hover:text-signal">
                    <p.icon size={22} weight="light" />
                  </span>
                  <div>
                    <h3 className="text-[19px] font-medium tracking-[-0.02em]">{p.title}</h3>
                    <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-mute">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function LedgerSection() {
  return (
    <section className="relative border-y border-line bg-ink-2">
      <div className="container-x grid grid-cols-1 gap-16 py-28 md:grid-cols-12 md:py-40">
        <div className="md:col-span-5">
          <p className="eyebrow">
            <span className="mr-3 text-signal">02</span>Ledger
          </p>
          <h2 className="display mt-6 text-[clamp(2.4rem,5vw,4.2rem)]">
            <MaskLines lines={['Balances are', <>never <span className="serif-accent">edited.</span></>]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 text-[17px] leading-relaxed text-mute">
              A balance is the sum of immutable credits and debits. Nothing ever rewrites a number. Concurrent
              withdrawals are serialised with row-level locks, so a wallet cannot be spent twice.
            </p>
            <div className="mt-10 rounded-xl border border-line bg-ink p-6">
              <p className="eyebrow">How a balance is computed</p>
              <p className="mt-4 font-serif text-[30px] italic leading-tight text-paper">
                balance = Σ credits − Σ debits
              </p>
            </div>
            <ul className="mt-8 space-y-3 text-[15px] text-paper/80">
              {['Append-only entries, never updated', 'SELECT … FOR UPDATE on every debit', 'Cached replies for repeated Idempotency-Keys'].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <Lightning size={14} weight="fill" className="text-signal" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="md:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-line bg-ink">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="flex items-center gap-2 font-mono text-[11px] text-mute">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
                ledger_entries · live preview
              </span>
              <span className="font-mono text-[11px] text-dim">tenant: acme-pay</span>
            </div>
            <LedgerTicker rows={8} />
          </div>
          <p className="mt-3 font-mono text-[11px] text-dim">Illustrative data. Every row is one balanced posting.</p>
        </Reveal>
      </div>
    </section>
  );
}

function RoutingSection() {
  return (
    <section className="container-x py-28 md:py-40">
      <SectionHead
        index="03"
        eyebrow="Gateway routing"
        title={['Three rails.', <span className="text-mute">We pick the right one.</span>]}
        body="Each payout or account request goes through a routing engine that weighs gateway uptime, cost and any override set by an admin. If one rail goes down, the next one takes the traffic."
      />
      <Reveal delay={0.1}>
        <div className="mt-16">
          <RoutingDiagram />
        </div>
      </Reveal>
    </section>
  );
}

function CodeSection() {
  return (
    <section className="border-y border-line">
      <div className="container-x grid grid-cols-1 gap-14 py-28 md:grid-cols-12 md:py-40">
        <div className="md:col-span-5">
          <p className="eyebrow">
            <span className="mr-3 text-signal">04</span>Developer experience
          </p>
          <h2 className="display mt-6 text-[clamp(2.4rem,5vw,4.2rem)]">
            <MaskLines lines={['Safe to retry.', <span className="text-mute">By default.</span>]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 text-[17px] leading-relaxed text-mute">
              Every write takes an Idempotency-Key. If the network drops and your server retries, you get back the
              first result instead of a second transfer. Test keys run against an isolated sandbox.
            </p>
            <div className="mt-8">
              <Button to="/developers" variant="ghost">
                Explore the API
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="md:col-span-7">
          <CodeBlock snippets={TRANSFER_SNIPPETS} title="POST /v1/transfers" />
        </Reveal>
      </div>
    </section>
  );
}
