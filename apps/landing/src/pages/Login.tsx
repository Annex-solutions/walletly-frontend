import { Info } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AsciiField } from '../components/AsciiField';
import { Field } from '../components/Field';
import { LogoMark } from '../components/Logo';
import { Reveal } from '../components/Reveal';
import { isWorkEmail } from '../lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [notice, setNotice] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!isWorkEmail(email)) next.email = 'Enter the email you signed up with.';
    if (password.length < 8) next.password = 'Passwords are at least 8 characters.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setNotice(true);
  };

  return (
    <section className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5 pb-16 pt-28">
      <div className="pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,transparent_25%,black_75%)]">
        <AsciiField cell={14} color="#5c5a54" />
      </div>
      <Reveal className="relative w-full max-w-[420px]">
        <div className="rounded-3xl border border-line bg-ink/90 p-8 shadow-[0_40px_120px_-30px_rgba(0,0,0,1)] backdrop-blur-xl sm:p-10">
          <LogoMark className="h-9 w-9 text-paper" />
          <h1 className="mt-8 text-[30px] font-medium tracking-[-0.04em]">Log in to the console</h1>
          <p className="mt-2 text-[15px] text-mute">Keys, webhooks and the ledger explorer.</p>

          <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.ng"
              value={email}
              error={errors.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Field
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              error={errors.password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center rounded-full bg-paper text-[15px] font-medium text-ink transition-colors hover:bg-white"
            >
              Continue
            </button>
          </form>

          <AnimatePresence>
            {notice && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-5 flex gap-3 rounded-xl border border-signal/40 bg-signal/[0.07] p-4 text-[13.5px] leading-relaxed text-paper/85">
                  <Info size={18} className="mt-0.5 shrink-0 text-signal" />
                  <span>
                    The console opens to early-access teams first. If you’re not on the list yet,{' '}
                    <Link to="/waitlist" className="text-signal underline underline-offset-4">
                      request access
                    </Link>
                    .
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-8 border-t border-line pt-6 text-center text-[14px] text-mute">
            New to Walletly?{' '}
            <Link to="/waitlist" className="text-paper underline-offset-4 hover:underline">
              Get early access
            </Link>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
