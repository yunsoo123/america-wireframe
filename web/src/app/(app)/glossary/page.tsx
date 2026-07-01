"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { GLOSSARY, GLOSSARY_CATEGORIES } from "@/lib/mock";
import { PageHeader, Disclaimer } from "@/components/ui";

const chip = "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors";
const chipOn = "border-transparent bg-accent-soft text-accent-ink";
const chipOff = "border-line text-muted hover:bg-hover";

export default function GlossaryPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("전체");

  const results = GLOSSARY.filter((t) => {
    if (cat !== "전체" && t.category !== cat) return false;
    if (q.trim() === "") return true;
    const hay = `${t.term} ${t.en ?? ""} ${t.def}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  return (
    <div>
      <PageHeader
        title="용어사전"
        desc="주린이도 이해할 수 있게, 투자 용어를 쉬운 한 줄로 풀이합니다."
      />

      <div className="mb-4 flex items-center gap-2 rounded-xl border border-line bg-card px-3 shadow-card">
        <Search size={18} className="text-faint" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="용어 검색 (예: PER, FOMC)"
          className="w-full bg-transparent py-3 text-sm text-ink outline-none"
        />
      </div>

      <div className="mb-5 flex flex-wrap gap-1.5">
        <button onClick={() => setCat("전체")} className={`${chip} ${cat === "전체" ? chipOn : chipOff}`}>
          전체
        </button>
        {GLOSSARY_CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`${chip} ${cat === c ? chipOn : chipOff}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {results.map((t) => (
          <div key={t.term} className="rounded-card border border-line bg-card p-4 shadow-card">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-[15px] font-semibold text-ink">{t.term}</span>
              {t.en && <span className="text-xs text-faint">{t.en}</span>}
              <span className="ml-auto rounded-full bg-sunken px-2 py-0.5 text-[11px] font-medium text-muted">
                {t.category}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted">{t.def}</p>
            {t.example && (
              <p className="mt-1.5 text-xs text-accent-ink">예: {t.example}</p>
            )}
          </div>
        ))}
        {results.length === 0 && (
          <div className="rounded-card border border-dashed border-line-strong px-4 py-10 text-center text-sm text-muted">
            &ldquo;{q}&rdquo;에 해당하는 용어가 없습니다.
          </div>
        )}
      </div>

      <Disclaimer />
    </div>
  );
}
