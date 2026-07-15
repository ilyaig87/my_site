import Link from 'next/link';
import type { Block } from '@/lib/blog';

// Shared block renderer for blog posts (Hebrew and Russian — direction comes
// from the surrounding container).

// Markdown-style [label](href) links inside post text become real links —
// internal paths use next/link, anything else a plain anchor.
export function renderInline(text: string): React.ReactNode {
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let k = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const [, label, href] = m;
    const cls = 'text-[var(--primary)] font-medium hover:underline';
    nodes.push(
      href.startsWith('/') ? (
        <Link key={`k${k++}`} href={href} className={cls}>{label}</Link>
      ) : (
        <a key={`k${k++}`} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{label}</a>
      )
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes.length > 1 || k > 0 ? nodes : text;
}

export function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 key={i} className="text-2xl font-bold text-[var(--text-strong)] mt-8 mb-3">
          {block.text}
        </h2>
      );
    case 'p':
      return (
        <p key={i} className="text-base text-[var(--text-default)] leading-relaxed mb-4">
          {renderInline(block.text)}
        </p>
      );
    case 'ul':
      return (
        <ul key={i} className="space-y-2 mb-4">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-[var(--text-default)]">
              <svg className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-base leading-relaxed">{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <blockquote key={i} className="lg-surface lg-shallow squircle-md p-5 my-6 text-[var(--text-strong)] font-medium border-r-4 border-[var(--primary)]">
          <span className="relative z-10">{renderInline(block.text)}</span>
        </blockquote>
      );
    default:
      return null;
  }
}
