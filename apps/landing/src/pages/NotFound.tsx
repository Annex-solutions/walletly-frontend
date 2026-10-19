import { Button } from '../components/Button';
import { DitherField } from '../components/DitherField';

export default function NotFound() {
  return (
    <section className="relative grid min-h-[100svh] place-items-center overflow-hidden">
      <div className="absolute inset-0">
        <DitherField mode="tunnel" color="#ff5a1f" background="#0b0b0a" pixel={4} />
      </div>
      <div className="relative px-5 text-center">
        <p className="display text-[clamp(7rem,26vw,20rem)] text-paper mix-blend-difference">404</p>
        <p className="mx-auto mt-2 max-w-sm rounded-xl bg-ink/80 px-4 py-3 text-[16px] text-paper/85 backdrop-blur">
          This page didn’t reconcile. The ledger is fine, the link isn’t.
        </p>
        <div className="mt-8 flex justify-center">
          <Button to="/" variant="paper">
            Back to safety
          </Button>
        </div>
      </div>
    </section>
  );
}
