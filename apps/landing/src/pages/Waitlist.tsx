import { CheckCircle, CircleNotch } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useState, type FormEvent } from 'react';
import { Button } from '../components/Button';
import { DitherField } from '../components/DitherField';
import { Field } from '../components/Field';
import { MaskLines, Reveal } from '../components/Reveal';
import { isWorkEmail, submitWaitlist } from '../lib/api';

const USE_CASES = ['Wallets', 'Virtual accounts', 'Payouts', 'P2P transfers', 'Checkout', 'Marketplace'];
const VOLUMES = ['Pre-launch', 'Under ₦10m', '₦10m–₦100m', '₦100m+'];

type Errors = Partial<Record<'name' | 'email' | 'company', string>>;

export default function Waitlist() {
  const [form, setForm] = useState({ name: '', email: '', company: '' });
  const [volume, setVolume] = useState(VOLUMES[0]);
  const [useCases, setUseCases] = useState<string[]>(['Wallets']);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const toggle = (u: string) => setUseCases((c) => (c.includes(u) ? c.filter((x) => x !== u) : [...c, u]));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = 'Tell us your name.';
    if (!isWorkEmail(form.email)) next.email = 'Enter a valid email address.';
    if (!form.company.trim()) next.company = 'Which company are you building?';
    setErrors(next);
    if (Object.keys(next).length) return;
    setState('sending');
    try {
      await submitWaitlist({ ...form, volume, useCases });
      setState('done');
    } catch {
      setState('error');
    }
  };

  return (
    <section className="grid min-h-[100svh] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r border-line lg:block">
        <DitherField mode="orb" color="#ece8df" background="#0b0b0a" pixel={3} />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent p-12 pt-40">
          <p className="font-serif text-[34px] italic leading-tight text-paper">
            “We wanted wallets in our app. We didn’t want to become a bank to get them.”
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">The problem Walletly exists to solve</p>
        </div>
      </div>

      <div className="flex items-center px-5 pb-16 pt-28 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-lg">
          <AnimatePresence mode="wait">
            {state === 'done' ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <CheckCircle size={40} weight="light" className="text-signal" />
                <h1 className="display mt-8 text-[clamp(2.6rem,6vw,4.2rem)]">You’re on the list.</h1>
                <p className="mt-6 text-[17px] leading-relaxed text-mute">
                  Thanks, {form.name.split(' ')[0]}. We’ll email {form.email} when sandbox keys are ready for{' '}
                  {form.company}.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button to="/developers">Read the API</Button>
                  <Button to="/" variant="ghost">
                    Back home
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" exit={{ opacity: 0, y: -12 }}>
                <Reveal>
                  <p className="eyebrow">Early access</p>
                </Reveal>
                <h1 className="display mt-6 text-[clamp(2.6rem,6vw,4.2rem)]">
                  <MaskLines lines={['Get sandbox', <span className="text-mute">keys first.</span>]} />
                </h1>
                <Reveal delay={0.2}>
                  <p className="mt-6 text-[16px] leading-relaxed text-mute">
                    We’re onboarding Nigerian startups in small batches. Tell us what you’re building.
                  </p>
                </Reveal>

                <Reveal delay={0.3}>
                  <form className="mt-10 space-y-5" onSubmit={onSubmit} noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Name"
                        name="name"
                        autoComplete="name"
                        placeholder="Amaka Obi"
                        value={form.name}
                        error={errors.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                      <Field
                        label="Company"
                        name="company"
                        autoComplete="organization"
                        placeholder="Acme Pay"
                        value={form.company}
                        error={errors.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                      />
                    </div>
                    <Field
                      label="Work email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="amaka@acmepay.ng"
                      value={form.email}
                      error={errors.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <fieldset>
                      <legend className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Monthly volume</legend>
                      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {VOLUMES.map((v) => (
                          <button
                            type="button"
                            key={v}
                            onClick={() => setVolume(v)}
                            aria-pressed={volume === v}
                            className={`h-11 rounded-xl border text-[13px] transition-colors ${
                              volume === v ? 'border-paper bg-paper text-ink' : 'border-line-2 text-mute hover:text-paper'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">What you need</legend>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {USE_CASES.map((u) => {
                          const on = useCases.includes(u);
                          return (
                            <button
                              type="button"
                              key={u}
                              onClick={() => toggle(u)}
                              aria-pressed={on}
                              className={`rounded-full border px-3.5 py-2 text-[13px] transition-colors ${
                                on ? 'border-signal bg-signal/10 text-paper' : 'border-line-2 text-mute hover:text-paper'
                              }`}
                            >
                              {u}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>

                    {state === 'error' && (
                      <p className="text-[13px] text-signal">Something went wrong sending that. Please try again.</p>
                    )}

                    <button
                      type="submit"
                      disabled={state === 'sending'}
                      className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-signal text-[15px] font-medium text-ink transition-colors hover:bg-signal-soft disabled:opacity-70"
                    >
                      {state === 'sending' ? <CircleNotch size={18} className="animate-spin" /> : 'Join the waitlist'}
                    </button>
                    <p className="text-center text-[12px] text-dim">No spam. One email when your keys are ready.</p>
                  </form>
                </Reveal>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
