import { Terminal } from '@phosphor-icons/react';
import { AsciiField } from '../components/AsciiField';
import { Button } from '../components/Button';
import { ClosingCta } from '../components/ClosingCta';
import { CodeBlock } from '../components/CodeBlock';
import { MaskLines, Reveal } from '../components/Reveal';
import { PageHero, SectionHead } from '../components/Section';
import { TRANSFER_SNIPPETS, WALLET_SNIPPETS, WEBHOOK_SNIPPETS } from '../lib/snippets';

const ENDPOINTS = [
  ['POST', '/v1/wallets', 'Create an end-user wallet'],
  ['GET', '/v1/wallets/:id', 'Balance and limits for a wallet'],
  ['POST', '/v1/virtual-accounts', 'Dedicated or disposable NGN account'],
  ['POST', '/v1/checkouts', 'Card, transfer or USSD checkout link'],
  ['POST', '/v1/transfers', 'Wallet-to-wallet transfer'],
  ['POST', '/v1/payouts', 'Send to any Nigerian bank account'],
  ['GET', '/v1/ledger/entries', 'Every posting, filterable and paged'],
  ['POST', '/v1/api-keys/roll', 'Issue a second key for rotation'],
];

const ROLLOUT = [
  {
    day: 'Day 1',
    title: 'Build',
    items: ['Isolated sandbox', 'Live and test key pairs', 'Webhook endpoint setup', 'Real-time ledger explorer', 'Transaction logs'],
  },
  { day: 'Day 2', title: 'Reconcile', items: ['Automated settlement reports', 'Fee deduction logs for reconciliation'] },
  { day: 'Day 3', title: 'Operate', items: ['Manual balance adjustments', 'Dispute resolution logging', 'Suspend fraudulent accounts'] },
];

const WEBHOOK_STEPS = [
  ['200 OK', 'Gateway webhook acknowledged immediately'],
  ['Queue', 'Serialised into a background job'],
  ['Verify', 'Signature and idempotency checked'],
  ['Post', 'Ledger entries written in one transaction'],
  ['Notify', 'Signed event sent to your endpoint'],
];

export default function Developers() {
  return (
    <>
      <PageHero
        eyebrow="Developers"
        title={['Headless by design.', <span className="text-mute">REST and webhooks.</span>]}
        body="No dashboard to click through before you can ship. Create a wallet, give it an account number and pay out, in three calls."
        aside={
          <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_left,black_25%,transparent_80%)]">
            <AsciiField cell={13} color="#b5b1a7" />
          </div>
        }
      >
        <Reveal delay={0.45}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/waitlist">Request sandbox keys</Button>
            <Button href="#reference" variant="ghost" arrow={false}>
              <Terminal size={16} /> API reference
            </Button>
          </div>
        </Reveal>
      </PageHero>

      <section className="container-x py-28 md:py-36">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">
              <span className="mr-3 text-signal">01</span>Quickstart
            </p>
            <h2 className="display mt-6 text-[clamp(2.2rem,4.4vw,3.6rem)]">
              <MaskLines lines={['Three calls', <span className="text-mute">to a wallet.</span>]} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-6 text-[17px] leading-relaxed text-mute">
                Amounts are in kobo. Every write takes an Idempotency-Key, and test keys never touch real money.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-7">
            <CodeBlock snippets={WALLET_SNIPPETS} title="sandbox" />
          </Reveal>
        </div>
      </section>

      <section id="reference" className="scroll-mt-24 border-y border-line bg-ink-2">
        <div className="container-x py-28 md:py-36">
          <SectionHead index="02" eyebrow="Reference" title={['The whole surface,', <span className="text-mute">on one screen.</span>]} />
          <Reveal delay={0.1}>
            <div className="mt-16 overflow-hidden rounded-2xl border border-line bg-ink">
              {ENDPOINTS.map(([m, path, desc]) => (
                <div
                  key={path + m}
                  className="group grid grid-cols-[56px_1fr] items-center gap-4 border-b border-line px-5 py-4 last:border-b-0 transition-colors hover:bg-white/[0.02] md:grid-cols-[72px_320px_1fr]"
                >
                  <span className={`font-mono text-[11px] font-medium ${m === 'GET' ? 'text-mint' : 'text-signal'}`}>{m}</span>
                  <span className="font-mono text-[13px] text-paper transition-transform duration-300 group-hover:translate-x-1">{path}</span>
                  <span className="col-span-2 text-[14px] text-mute md:col-span-1">{desc}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono text-[11px] text-dim">Preview of the v1 surface. Full reference ships with sandbox access.</p>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-28 md:py-36">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          <Reveal className="order-2 md:order-1 md:col-span-7">
            <CodeBlock snippets={TRANSFER_SNIPPETS} title="POST /v1/transfers" />
          </Reveal>
          <div className="order-1 md:order-2 md:col-span-5">
            <p className="eyebrow">
              <span className="mr-3 text-signal">03</span>Idempotency
            </p>
            <h2 className="display mt-6 text-[clamp(2.2rem,4.4vw,3.6rem)]">Retry without fear.</h2>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17px] leading-relaxed text-mute">
                Keys are stored with a unique constraint. Send the same key twice and you get the cached result of the
                first request, never a second transfer.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="webhooks" className="scroll-mt-24 border-y border-line">
        <div className="container-x py-28 md:py-36">
          <SectionHead
            index="04"
            eyebrow="Webhooks"
            title={['Fast to acknowledge.', <span className="text-mute">Careful to process.</span>]}
          />
          <ol className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-5">
            {WEBHOOK_STEPS.map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.06} className="h-full">
                <li className="flex h-full flex-col bg-ink p-5">
                  <span className="font-mono text-[11px] text-dim">0{i + 1}</span>
                  <span className="mt-6 font-mono text-[15px] text-signal">{k}</span>
                  <span className="mt-2 text-[13.5px] leading-relaxed text-mute">{v}</span>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.1}>
            <div className="mt-6">
              <CodeBlock snippets={WEBHOOK_SNIPPETS} title="virtual_account.credited" />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="rollout" className="container-x scroll-mt-24 py-28 md:py-36">
        <SectionHead index="05" eyebrow="Rollout" title={['What you get,', <span className="text-mute">and when.</span>]} />
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {ROLLOUT.map((r, i) => (
            <Reveal key={r.day} delay={i * 0.08}>
              <div className={`h-full rounded-2xl border p-7 ${i === 0 ? 'border-signal/50 bg-signal/[0.06]' : 'border-line'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] text-signal">{r.day}</span>
                  {i === 0 && <span className="rounded-full bg-signal px-2 py-0.5 font-mono text-[10px] uppercase text-ink">First</span>}
                </div>
                <h3 className="mt-10 text-[28px] font-medium tracking-[-0.03em]">{r.title}</h3>
                <ul className="mt-6 space-y-2.5">
                  {r.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-[14.5px] text-paper/80">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-paper/60" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
