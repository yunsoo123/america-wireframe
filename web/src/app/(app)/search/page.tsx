"use client";

import { useState } from "react";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { STOCKS } from "@/lib/mock";
import { Chip, PriceChange } from "@/components/ui";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const results = STOCKS.filter(
    (s) =>
      q.trim() === "" ||
      s.ticker.toLowerCase().includes(q.toLowerCase()) ||
      s.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="mb-5 flex items-center gap-2 rounded-xl border border-black/15 bg-white px-3 dark:border-white/20 dark:bg-neutral-900">
        <SearchIcon size={18} className="text-black/40 dark:text-white/40" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="티커 또는 종목명 (예: NVDA)"
          className="w-full bg-transparent py-3 text-sm outline-none"
        />
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        <Chip active>종목</Chip>
        <Chip>섹터</Chip>
        <Chip>테마</Chip>
      </div>

      {q.trim() === "" && (
        <div className="mb-4">
          <div className="mb-2 text-xs text-black/45 dark:text-white/45">최근 검색</div>
          <div className="flex flex-wrap gap-1.5">
            {["NVDA", "TSLA", "반도체"].map((r) => (
              <button key={r} onClick={() => setQ(r)}>
                <Chip>{r}</Chip>
              </button>
            ))}
          </div>
        </div>
      )}

      <ul className="flex flex-col gap-2">
        {results.map((s) => (
          <li key={s.ticker}>
            <Link
              href={`/stock/${s.ticker}`}
              className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-3 hover:bg-black/[0.03] dark:border-white/15 dark:bg-neutral-900 dark:hover:bg-white/5"
            >
              <div>
                <div className="font-medium">{s.ticker}</div>
                <div className="text-xs text-black/50 dark:text-white/50">
                  {s.name} · {s.sector}
                </div>
              </div>
              <div className="text-sm">
                <span className="mr-3 tabular-nums text-black/50 dark:text-white/50">
                  ${s.price.toFixed(2)}
                </span>
                <PriceChange pct={s.changePct} />
              </div>
            </Link>
          </li>
        ))}
        {results.length === 0 && (
          <li className="rounded-xl border border-dashed border-black/15 px-4 py-8 text-center text-sm text-black/50 dark:border-white/20 dark:text-white/50">
            &ldquo;{q}&rdquo; 검색 결과가 없습니다.
          </li>
        )}
      </ul>
    </div>
  );
}
