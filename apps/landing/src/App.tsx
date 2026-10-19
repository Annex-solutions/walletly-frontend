import { useState } from 'react';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-md sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/walletly_logo.jpg" alt="Walletly Logo" className="w-8 h-8 rounded-md" />
            <span className="font-outfit font-bold text-xl tracking-tight">WALLET<span className="text-muted-foreground font-normal">ly</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
            <a href="#use-cases" className="hover:text-foreground transition-colors">Use Cases</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium hover:text-brand-blue transition-colors">Log in</button>
            <button className="bg-foreground text-background hover:bg-foreground/90 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
              Join the Waitlist
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-blue/10 via-background to-background"></div>
          <div className="absolute right-0 top-1/4 -z-10 w-96 h-96 bg-brand-amber/10 rounded-full blur-[128px]"></div>

          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></span>
              Early Access for Nigerian Startups
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold max-w-4xl mx-auto leading-[1.1] mb-6">
              Embed NGN Wallets <br className="hidden md:block" />
              <span className="text-gradient">Without the Licenses.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              The fastest way to launch financial features. We manage the compliance, ledger, and banking integrations—powered by Paystack, Monnify, and Squad—so you can focus on building a great product.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-brand-blue text-white hover:bg-brand-blue/90 px-8 py-4 rounded-md text-base font-medium transition-colors shadow-lg shadow-brand-blue/20">
                Join the Waitlist
              </button>
              <button className="w-full sm:w-auto bg-transparent border border-border hover:bg-muted text-foreground px-8 py-4 rounded-md text-base font-medium transition-colors">
                View API Sandbox
              </button>
            </div>
          </div>
        </section>

        {/* Value Prop Section */}
        <section className="py-24 bg-muted/30 border-y border-border/50" id="features">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              
              {/* Feature 1 */}
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-blue"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                </div>
                <h3 className="text-xl font-semibold">Instant Virtual Accounts</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Accept payments effortlessly. Assign unique NGN bank accounts to your users for wallet funding, or generate one-time accounts for seamless guest checkouts.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-brand-amber/10 flex items-center justify-center border border-brand-amber/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-amber"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
                </div>
                <h3 className="text-xl font-semibold">Reliable External Payouts</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Send money out without the friction. Route user withdrawals or vendor payments to any Nigerian bank account automatically with 99.9% uptime.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-foreground/5 flex items-center justify-center border border-border">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
                </div>
                <h3 className="text-xl font-semibold">Zero Compliance Overhead</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Skip the months of regulatory hurdles and complex math. Our automated, bank-grade ledger handles the reconciliation, limits, and security behind the scenes.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src="/walletly_logo.jpg" alt="Walletly Logo" className="w-6 h-6 rounded" />
            <span className="font-outfit font-semibold text-lg">WALLETly</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Walletly Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
