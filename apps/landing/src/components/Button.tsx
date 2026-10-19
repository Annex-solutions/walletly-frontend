import { ArrowUpRight } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'signal' | 'paper' | 'ghost';

const styles: Record<Variant, string> = {
  signal: 'bg-signal text-ink hover:bg-signal-soft',
  paper: 'bg-paper text-ink hover:bg-white',
  ghost: 'border border-line-2 text-paper hover:border-paper/60 hover:bg-white/[0.03]',
};

export function Button({
  to,
  href,
  children,
  variant = 'signal',
  className = '',
  arrow = true,
  type,
  onClick,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  type?: 'submit' | 'button';
  onClick?: () => void;
}) {
  const cls = `group relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-5 text-[14px] font-medium tracking-[-0.01em] transition-colors duration-300 ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span className="inline-flex items-center gap-2">{children}</span>
      {arrow && (
        <span className="relative h-4 w-4 overflow-hidden">
          <ArrowUpRight
            size={16}
            weight="bold"
            className="absolute inset-0 transition-transform duration-500 ease-out-expo group-hover:-translate-y-4 group-hover:translate-x-4"
          />
          <ArrowUpRight
            size={16}
            weight="bold"
            className="absolute inset-0 -translate-x-4 translate-y-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0"
          />
        </span>
      )}
    </>
  );
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return <button type={type ?? 'button'} onClick={onClick} className={cls}>{inner}</button>;
}
