import { Check, Copy } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { useState } from 'react';

export type Snippet = { label: string; lang: string; code: string };

const TOKEN =
  /(\/\/.*$|#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(const|await|async|import|from|return|new|curl|POST|GET)\b|\b(\d[\d_]*)\b|(-[A-Za-z]+\b)/gm;

function highlight(code: string) {
  const out: Array<{ t: string; c?: string }> = [];
  let last = 0;
  for (const m of code.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ t: code.slice(last, i) });
    const c = m[1]
      ? 'text-dim italic'
      : m[2]
        ? 'text-mint'
        : m[3]
          ? 'text-signal'
          : m[4]
            ? 'text-cobalt'
            : 'text-paper-2';
    out.push({ t: m[0], c });
    last = i + m[0].length;
  }
  out.push({ t: code.slice(last) });
  return out;
}

export function CodeBlock({ snippets, title }: { snippets: Snippet[]; title?: string }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const s = snippets[active];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(s.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard can be unavailable in insecure contexts */
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
      <div className="flex items-center justify-between border-b border-line pl-2 pr-3">
        <div className="flex" role="tablist">
          {snippets.map((sn, i) => (
            <button
              key={sn.label}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`relative px-3 py-3 font-mono text-[11.5px] transition-colors ${i === active ? 'text-paper' : 'text-dim hover:text-mute'}`}
            >
              {sn.label}
              {i === active && (
                <motion.span layoutId={`tab-${title ?? 'code'}`} className="absolute inset-x-3 -bottom-px h-px bg-signal" />
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {title && <span className="hidden font-mono text-[11px] text-dim sm:block">{title}</span>}
          <button onClick={copy} className="grid h-7 w-7 place-items-center rounded-md text-mute hover:bg-white/5 hover:text-paper" aria-label="Copy code">
            {copied ? <Check size={14} weight="bold" className="text-mint" /> : <Copy size={14} />}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-[1.75] text-paper/85">
        <code>
          {highlight(s.code).map((p, i) => (
            <span key={i} className={p.c}>
              {p.t}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
