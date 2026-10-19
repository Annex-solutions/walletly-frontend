import type { ReactNode } from 'react';
import { MaskLines, Reveal } from './Reveal';

export function SectionHead({
  index,
  eyebrow,
  title,
  body,
  className = '',
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode[];
  body?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-8 md:grid-cols-12 ${className}`}>
      <div className="md:col-span-3">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            {index && <span className="text-signal">{index}</span>}
            {eyebrow}
          </p>
        </Reveal>
      </div>
      <div className="md:col-span-9">
        <h2 className="display text-[clamp(2.4rem,5.6vw,4.6rem)]">
          <MaskLines lines={title} />
        </h2>
        {body && (
          <Reveal delay={0.15}>
            <div className="mt-6 max-w-xl text-[17px] leading-relaxed text-mute">{body}</div>
          </Reveal>
        )}
      </div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  body,
  children,
  aside,
}: {
  eyebrow: string;
  title: ReactNode[];
  body?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-36 pb-20 md:pt-44 md:pb-28">
      {aside}
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <h1 className="display mt-6 max-w-5xl text-[clamp(3rem,8vw,7rem)]">
          <MaskLines lines={title} delay={0.1} />
        </h1>
        {body && (
          <Reveal delay={0.35}>
            <p className="mt-8 max-w-xl text-[18px] leading-relaxed text-mute">{body}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
