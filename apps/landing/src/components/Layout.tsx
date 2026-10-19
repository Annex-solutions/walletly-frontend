import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Nav } from './Nav';

const TITLES: Record<string, string> = {
  '/': 'Walletly | NGN wallet infrastructure',
  '/platform': 'Platform | Walletly',
  '/developers': 'Developers | Walletly',
  '/pricing': 'Pricing | Walletly',
  '/waitlist': 'Early access | Walletly',
  '/login': 'Log in | Walletly',
};

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = TITLES[pathname] ?? 'Not found | Walletly';
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    if (!hash) return;
    // Lazy pages may not have mounted yet, so look for the anchor for a moment
    let tries = 0;
    const id = setInterval(() => {
      const el = document.getElementById(hash.slice(1));
      if (el || ++tries > 30) {
        clearInterval(id);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
    return () => clearInterval(id);
  }, [pathname, hash]);
  return null;
}

export function Layout() {
  return (
    <>
      <ScrollManager />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-paper focus:px-3 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

/** Pages that are a single focused task, like sign-in, get no marketing footer. */
export function BareLayout() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <main id="main">
        <Outlet />
      </main>
    </>
  );
}
