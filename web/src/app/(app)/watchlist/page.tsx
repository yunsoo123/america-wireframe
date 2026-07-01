"use client";

import { useState } from "react";
import Link from "next/link";
import { Smartphone, X } from "lucide-react";
import { WATCHLIST, type WatchItem } from "@/lib/mock";
import { Card, PageHeader, PriceChange, Disclaimer } from "@/components/ui";

const TAGS = ["전체", "장기", "단기", "관망"] as const;

export default function WatchlistPage() {
  const [tag, setTag] = useState<string>("전체");
  const [items, setItems] = useState<WatchItem[]>(WATCHLIST);

  const shown = items.filter((w) => tag === "전체" || w.tag === tag);

  return (
    <div>
      <PageHeader title="워치리스트" desc="그룹·태그로 관심종목을 관리합니다." />

      <div className="mb-4 flex flex-wrap gap-1.5">
        {TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={
              "rounded-full border px-3 py-1.5 text-xs transition-colors " +
              (tag === t
                ? "border-blue-500/50 bg-accent-soft text-accent"
                : "border-black/15 text-black/60 hover:bg-black/5 dark:border-white/20 dark:text-white/60 dark:hover:bg-white/5")
            }
          >
            {t}
          </button>
        ))}
      </div>

      <Card className="!p-0">
        <ul>
          {shown.map((w, i) => (
            <li
              key={w.ticker}
              className={"flex items-center justify-between px-4 py-3 " + (i > 0 ? "border-t border-line" : "")}
            >
              <div className="flex items-center gap-3">
                <Link href={`/stock/${w.ticker}`} className="font-medium hover:underline">
                  {w.ticker}
                </Link>
                <span className="text-xs text-faint">{w.name}</span>
                <span className="rounded-full border border-black/15 px-2 py-0.5 text-[10px] text-black/55 dark:border-white/20 dark:text-white/55">
                  {w.tag}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="tabular-nums text-faint">${w.price.toFixed(2)}</span>
                <PriceChange pct={w.changePct} />
                <button
                  onClick={() => setItems((arr) => arr.filter((x) => x.ticker !== w.ticker))}
                  aria-label={`${w.ticker} 관심종목에서 제거`}
                  className="rounded-md p-1 text-black/40 hover:bg-black/5 hover:text-red-600 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-red-400"
                >
                  <X size={15} />
                </button>
              </div>
            </li>
          ))}
          {shown.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-faint">
              이 그룹에 종목이 없습니다. 스크리닝·검색에서 추가해 보세요.
            </li>
          )}
        </ul>
      </Card>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-faint">
        <Smartphone size={13} /> 웹·모바일 동기화됨
      </div>

      <Disclaimer />
    </div>
  );
}
