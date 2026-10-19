import { Button } from './Button';
import { DitherField } from './DitherField';
import { MaskLines, Reveal } from './Reveal';

export function ClosingCta() {
  return (
    <section className="container-x pt-28 md:pt-40">
      <div className="relative overflow-hidden rounded-3xl border border-line">
        <div className="absolute inset-0">
          <DitherField mode="flow" color="#ff5a1f" background="#0b0b0a" pixel={4} bias={-0.05} />
        </div>
        <div className="relative px-6 py-24 text-center md:py-36">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_55%_at_50%_50%,rgba(11,11,10,0.92),rgba(11,11,10,0.55)_60%,transparent)]" />
          <h2 className="display relative mx-auto max-w-4xl text-[clamp(2.8rem,7vw,6.5rem)]">
            <MaskLines lines={['Ship a wallet', <span className="serif-accent">this sprint.</span>]} />
          </h2>
          <Reveal delay={0.2} className="relative">
            <p className="mx-auto mt-6 max-w-md text-[17px] text-paper/80">
              Sandbox keys go out to early-access teams first. Tell us what you’re building.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button to="/waitlist" variant="paper">
                Get early access
              </Button>
              <Button to="/pricing" variant="ghost" className="bg-ink/50 backdrop-blur">
                See pricing
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
