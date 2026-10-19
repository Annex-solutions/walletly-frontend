import { Broadcast, CurrencyNgn, ShieldCheck } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

const GATEWAYS = [
  { name: 'Squad', sub: 'GTBank', note: 'Lowest-cost virtual accounts' },
  { name: 'Monnify', sub: '', note: 'Reliable account assignment and reconciliation' },
  { name: 'Paystack', sub: '', note: 'Standard checkout and failover' },
];

const SCENARIOS = [
  { req: 'POST /v1/virtual-accounts', pick: 0, reason: 'Lowest cost for this route', icon: CurrencyNgn },
  { req: 'POST /v1/payouts', pick: 1, reason: 'Best uptime in the last hour', icon: Broadcast },
  { req: 'POST /v1/checkouts', pick: 2, reason: 'Admin override is on', icon: ShieldCheck },
];

/** Cycles through routing decisions to show how a request picks a rail. */
export function RoutingDiagram() {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  const s = SCENARIOS[n];

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setN((v) => (v + 1) % SCENARIOS.length), 3200);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1.1fr_auto_1.2fr]">
      {/* Request */}
      <div className="flex flex-col justify-between rounded-2xl border border-line bg-ink-2 p-6">
        <p className="eyebrow">Your request</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={s.req}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-10 font-mono text-[14px] text-paper"
          >
            {s.req}
          </motion.p>
        </AnimatePresence>
        <p className="mt-3 font-mono text-[11px] text-dim">Idempotency-Key: 7f3a…e21</p>
      </div>

      <Connector reduce={!!reduce} />

      {/* Engine */}
      <div className="relative overflow-hidden rounded-2xl border border-signal/40 bg-[radial-gradient(circle_at_50%_0%,rgba(255,90,31,0.14),transparent_70%)] p-6">
        <p className="eyebrow text-signal">Routing engine</p>
        <ul className="mt-6 space-y-2.5">
          {['Gateway uptime', 'Transaction cost', 'Admin overrides'].map((c, i) => (
            <li
              key={c}
              className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-[14px] transition-colors duration-500 ${
                i === n ? 'border-signal/60 bg-signal/10 text-paper' : 'border-line text-mute'
              }`}
            >
              {c}
              <span className={`h-1.5 w-1.5 rounded-full ${i === n ? 'bg-signal' : 'bg-line-2'}`} />
            </li>
          ))}
        </ul>
        <AnimatePresence mode="wait">
          <motion.p
            key={s.reason}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-5 flex items-center gap-2 text-[13px] text-paper/80"
          >
            <s.icon size={16} className="text-signal" /> {s.reason}
          </motion.p>
        </AnimatePresence>
      </div>

      <Connector reduce={!!reduce} />

      {/* Gateways */}
      <div className="grid gap-2.5">
        {GATEWAYS.map((g, i) => {
          const on = i === s.pick;
          return (
            <div
              key={g.name}
              className={`relative flex items-center justify-between overflow-hidden rounded-2xl border px-5 py-4 transition-all duration-500 ${
                on ? 'border-paper/50 bg-paper text-ink' : 'border-line bg-ink-2 text-paper'
              }`}
            >
              <div>
                <p className="text-[17px] font-medium tracking-[-0.02em]">
                  {g.name} <span className={`text-[12px] font-normal ${on ? 'text-ink/50' : 'text-dim'}`}>{g.sub}</span>
                </p>
                <p className={`mt-1 text-[12.5px] ${on ? 'text-ink/60' : 'text-mute'}`}>{g.note}</p>
              </div>
              <span className={`font-mono text-[10px] uppercase tracking-[0.14em] ${on ? 'text-signal' : 'text-dim'}`}>
                {on ? 'Routed' : 'Standby'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Connector({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative mx-auto flex h-10 w-px items-center justify-center lg:h-auto lg:w-16">
      <div className="absolute inset-0 m-auto h-full w-px bg-line-2 lg:h-px lg:w-full" />
      {!reduce && (
        <motion.span
          className="absolute h-1.5 w-1.5 bg-signal"
          animate={{ x: ['-28px', '28px'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '50%', marginTop: -3 }}
        />
      )}
    </div>
  );
}
