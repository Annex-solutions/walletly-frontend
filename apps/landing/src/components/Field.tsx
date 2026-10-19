import type { InputHTMLAttributes } from 'react';

export function Field({
  label,
  error,
  hint,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string }) {
  const id = props.id ?? props.name;
  return (
    <label htmlFor={id} className="block">
      <span className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{label}</span>
        {hint && <span className="text-[12px] text-dim">{hint}</span>}
      </span>
      <input
        id={id}
        {...props}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 h-12 w-full rounded-xl border bg-ink-2 px-4 text-[15px] text-paper placeholder:text-dim outline-none transition-colors focus:border-paper/60 focus:bg-ink-3 ${
          error ? 'border-signal' : 'border-line-2'
        }`}
      />
      {error && (
        <span id={`${id}-error`} className="mt-1.5 block text-[12.5px] text-signal">
          {error}
        </span>
      )}
    </label>
  );
}
