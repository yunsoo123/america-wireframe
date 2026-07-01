"use client";

import type { ReactNode } from "react";
import { GLOSSARY } from "@/lib/mock";

const MAP: Record<string, (typeof GLOSSARY)[number]> = Object.fromEntries(
  GLOSSARY.map((t) => [t.term, t])
);

// 전문용어에 밑줄+툴팁을 달아 용어사전 정의를 그 자리에서 보여준다.
// 호버(데스크톱) · 포커스/탭(모바일·키보드) 모두 동작.
export function TermTip({ term, children }: { term: string; children?: ReactNode }) {
  const info = MAP[term];
  const label = children ?? term;
  if (!info) return <>{label}</>;

  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        className="cursor-help border-b border-dotted border-faint underline-offset-2 focus:outline-none focus-visible:border-accent"
        aria-label={`${info.term} 뜻 보기`}
      >
        {label}
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 hidden w-56 -translate-x-1/2 rounded-xl border border-line bg-card p-3 text-left shadow-pop group-hover:block group-focus-within:block"
      >
        <span className="mb-1 block text-xs font-semibold text-ink">
          {info.term}
          {info.en ? ` · ${info.en}` : ""}
        </span>
        <span className="block text-xs leading-relaxed text-muted">{info.def}</span>
        <span className="mt-1.5 block text-[11px] text-accent-ink">용어사전에서 더 보기</span>
      </span>
    </span>
  );
}
