import { List, X } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { Wordmark } from './Logo';

const LINKS = [
  { to: '/platform', label: 'Platform' },
  { to: '/developers', label: 'Developers' },
  { to: '/pricing', label: 'Pricing' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open || pathname === '/waitlist' || pathname === '/login' ? 'border-b border-line bg-ink/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" aria-label="Walletly home" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-[14px] transition-colors ${isActive ? 'text-paper' : 'text-mute hover:text-paper'}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.06] ring-1 ring-line-2"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/login"
            className={`px-3 text-[14px] transition-colors ${pathname === '/login' ? 'text-paper' : 'text-mute hover:text-paper'}`}
          >
            Log in
          </Link>
          <Button to="/waitlist" variant="paper" className="h-9 px-4 text-[13px]">
            Get early access
          </Button>
        </div>

        <button
          className="-mr-2 grid h-10 w-10 place-items-center rounded-full text-paper md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100dvh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-ink md:hidden"
          >
            <div className="container-x flex flex-col gap-1 pt-6">
              {[...LINKS, { to: '/login', label: 'Log in' }].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.5 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b border-line py-5 text-4xl tracking-[-0.04em]"
                  >
                    {l.label}
                    <span className="font-mono text-xs text-dim">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
              <div className="pt-8">
                <Button to="/waitlist" onClick={() => setOpen(false)} className="w-full">
                  Get early access
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
