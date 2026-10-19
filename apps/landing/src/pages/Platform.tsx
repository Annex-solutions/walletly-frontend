import {
  Fingerprint,
  Gavel,
  Key,
  Lock,
  Prohibit,
  Pulse,
  Queue,
  Scroll,
  Snowflake,
} from '@phosphor-icons/react';
import { ClosingCta } from '../components/ClosingCta';
import { DitherField } from '../components/DitherField';
import { LedgerTicker } from '../components/LedgerTicker';
import { Reveal } from '../components/Reveal';
import { RoutingDiagram } from '../components/RoutingDiagram';
import { PageHero, SectionHead } from '../components/Section';

const FLOWS = [
  { n: '01', title: 'Funds arrive', body: 'A transfer hits the user’s virtual account. The gateway webhook is acknowledged at once and queued.' },
  { n: '02', title: 'We verify', body: 'A background worker checks the signature and the idempotency record, so a repeated webhook is a no-op.' },
  { n: '03', title: 'Ledger posts', body: 'One debit from gateway clearing, one credit to the wallet. Both or neither, inside one transaction.' },
  { n: '04', title: 'You’re told', body: 'Your endpoint receives a signed event with the new balance. Fees, if any, post as their own entries.' },
];

const ROLES = [
  { title: 'Platform admin', body: 'Global oversight, KYC review, gateway failover and the power to freeze any account.', tag: 'Walletly' },
  { title: 'Tenant', body: 'Your startup. Passes KYC before getting live keys, and sets granular permissions for its own team.', tag: 'You' },
  { title: 'End-user', body: 'A verified wallet holder with a balance and tiered limits, created by you through the API.', tag: 'Your users' },
  { title: 'Guest', body: 'A one-time payer behind a disposable account. No wallet, no ledger history to carry.', tag: 'Checkout' },
];

const CONTROLS = [
  { icon: Snowflake, title: 'Instant freeze', body: 'Suspend any tenant or end-user and every ledger debit stops at once.' },
  { icon: Prohibit, title: 'Blocklists', body: 'Known fraudulent BVNs and bank accounts are blocked at the database level.' },
  { icon: Gavel, title: 'Hard limits', body: 'Per-transaction maximums and daily outbound caps, enforced in the API layer.' },
];

const SECURITY = [
  { icon: Key, title: 'Hashed API keys', body: 'Keys are hashed with Argon2 or BCrypt before storage. We can’t read them back, and neither can anyone else.' },
  { icon: Fingerprint, title: 'Rolling keys', body: 'Hold two live keys at once, so you can rotate without downtime before the old one is revoked.' },
  { icon: Scroll, title: 'Audit trail', body: 'Key changes, manual adjustments and gateway overrides each write an append-only record with actor, IP and payload hash.' },
  { icon: Lock, title: 'Tenant isolation', body: 'Every query is scoped to your tenant by a mandatory filter. Your data never mixes with anyone else’s.' },
  { icon: Queue, title: 'Queued payouts', body: 'Bank transfers run in a job queue with retry policies, so a gateway timeout never loses a payout.' },
  { icon: Pulse, title: 'Async webhooks', body: 'Inbound webhooks are acknowledged in milliseconds and processed off the request path.' },
];

export default function Platform() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title={['A bank-grade ledger,', <span className="text-mute">without the bank.</span>]}
        body="Walletly is a headless wallet platform. You build the product. We hold the ledger, talk to the gateways and keep the audit trail."
        aside={
          <div className="absolute inset-y-0 right-0 hidden w-[46%] md:block">
            <DitherField mode="tunnel" color="#8d8a82" background="#0b0b0a" pixel={3} />
            <div className="absolute inset-0 bg-gradient-to-r from-ink to-transparent" />
          </div>
        }
      />

      <section id="ledger" className="container-x scroll-mt-24 py-28 md:py-36">
        <SectionHead
          index="01"
          eyebrow="Money flow"
          title={['Four steps,', <span className="text-mute">every time.</span>]}
          body="This is what happens between a customer sending money and your app showing a new balance."
        />
        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {FLOWS.map((f, i) => (
            <Reveal key={f.n} delay={i * 0.08} className="h-full">
              <li className="flex h-full flex-col bg-ink p-6">
                <span className="font-mono text-[12px] text-signal">{f.n}</span>
                <h3 className="mt-12 text-[22px] font-medium tracking-[-0.03em]">{f.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mute">{f.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.1}>
          <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-ink-2">
            <LedgerTicker rows={5} />
          </div>
        </Reveal>
      </section>

      <section id="routing" className="scroll-mt-24 border-y border-line bg-ink-2">
        <div className="container-x py-28 md:py-36">
          <SectionHead
            index="02"
            eyebrow="Orchestration"
            title={['One API.', <span className="text-mute">Three gateways behind it.</span>]}
            body="You never integrate a gateway yourself. Routing weighs uptime, cost and admin overrides on every request, and fails over when a rail goes down."
          />
          <Reveal delay={0.1}>
            <div className="mt-16">
              <RoutingDiagram />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-28 md:py-36">
        <SectionHead
          index="03"
          eyebrow="Multi-tenancy"
          title={['Clear lines', <span className="text-mute">of responsibility.</span>]}
        />
        <div className="mt-16 grid gap-4 md:grid-cols-4">
          {ROLES.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.07}>
              <div
                className="relative h-full rounded-2xl border border-line p-6 transition-colors duration-500 hover:border-line-2 hover:bg-ink-2"
                style={{ marginTop: `${i * 24}px` }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal">{r.tag}</span>
                <h3 className="mt-10 text-[22px] font-medium tracking-[-0.03em]">{r.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-mute">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pb-12">
        <div className="grid grid-cols-1 gap-12 rounded-3xl border border-line p-8 md:grid-cols-12 md:p-12">
          <div className="md:col-span-4">
            <p className="eyebrow">
              <span className="mr-3 text-signal">04</span>Risk controls
            </p>
            <h2 className="display mt-6 text-[clamp(2rem,4vw,3.2rem)]">Stop bad money before it moves.</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:col-span-8">
            {CONTROLS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.07}>
                <c.icon size={26} weight="light" className="text-signal" />
                <h3 className="mt-5 text-[18px] font-medium tracking-[-0.02em]">{c.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-mute">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="security" className="container-x scroll-mt-24 py-28 md:py-36">
        <SectionHead
          index="05"
          eyebrow="Security"
          title={['Built for the audit', <span className="text-mute">you haven’t had yet.</span>]}
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {SECURITY.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.06} className="h-full">
              <div className="group h-full bg-ink p-7 transition-colors duration-500 hover:bg-ink-2">
                <s.icon size={24} weight="light" className="text-paper transition-colors duration-500 group-hover:text-signal" />
                <h3 className="mt-8 text-[18px] font-medium tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-mute">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
