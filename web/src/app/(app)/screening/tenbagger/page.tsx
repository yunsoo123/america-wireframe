"use client";

import { useMemo, useState } from "react";
import {
  ALL_THEMES,
  CANDIDATES,
  FACTORS,
  tenbaggerScore,
  type Candidate,
  type Theme,
} from "@/lib/tenbagger";
import { SaveButton, AlertButton } from "@/components/interactive";
import { Disclaimer } from "@/components/ui";

function ScoreBadge({ score }: { score: number }) {
  return (
    <span className="inline-flex items-center justify-center rounded-md bg-blue-600/10 px-2 py-0.5 text-sm font-medium text-blue-700 dark:bg-blue-400/15 dark:text-blue-300">
      {score}
    </span>
  );
}

function FactorBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-xs text-black/60 dark:text-white/60">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/8 dark:bg-white/10">
        <div className="h-full rounded-full bg-blue-600 dark:bg-blue-400" style={{ width: `${value}%` }} />
      </div>
      <span className="w-7 shrink-0 text-right text-xs tabular-nums text-black/50 dark:text-white/50">
        {value}
      </span>
    </div>
  );
}

export default function TenbaggerPage() {
  const [themes, setThemes] = useState<Set<Theme>>(new Set());
  const [undervaluedOnly, setUndervaluedOnly] = useState(false);
  const [preset, setPreset] = useState("텐배거 ⚡");
  const [selected, setSelected] = useState<string>(CANDIDATES[0].ticker);

  const ranked = useMemo(() => {
    return CANDIDATES.filter((c) => {
      if (undervaluedOnly && !c.pegUnder1) return false;
      if (themes.size > 0 && !c.themes.some((t) => themes.has(t))) return false;
      return true;
    })
      .map((c) => ({ c, score: tenbaggerScore(c) }))
      .sort((a, b) => b.score - a.score);
  }, [themes, undervaluedOnly]);

  const active: Candidate | undefined =
    ranked.find((r) => r.c.ticker === selected)?.c ?? ranked[0]?.c;

  function toggleTheme(t: Theme) {
    setThemes((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }

  return (
    <div>
      <header className="mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">텐배거 스카우터</h1>
          <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">
            공격형 ⚡
          </span>
        </div>
        <p className="mt-1 text-sm text-black/55 dark:text-white/55">
          저평가된 고성장(텐배거 가능성) 후보 · 고위험 · 정보 제공 목적 · 손실 가능
        </p>
      </header>

      <section className="mb-5 rounded-xl border border-black/10 bg-white p-4 dark:border-white/15 dark:bg-neutral-900">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs text-black/50 dark:text-white/50">프리셋</span>
          {["초보", "중급", "텐배거 ⚡"].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPreset(p)}
              className={
                "rounded-full border px-3 py-1.5 text-xs transition-colors " +
                (preset === p
                  ? "border-blue-500/50 bg-blue-600/10 text-blue-700 dark:text-blue-300"
                  : "border-black/15 text-black/60 hover:bg-black/5 dark:border-white/20 dark:text-white/60 dark:hover:bg-white/5")
              }
            >
              {p}
            </button>
          ))}
        </div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs text-black/50 dark:text-white/50">테마</span>
          {ALL_THEMES.map((t) => {
            const on = themes.has(t);
            return (
              <button
                key={t}
                onClick={() => toggleTheme(t)}
                className={
                  "rounded-full border px-3 py-1.5 text-xs transition-colors " +
                  (on
                    ? "border-blue-500/50 bg-blue-600/10 text-blue-700 dark:text-blue-300"
                    : "border-black/15 text-black/60 hover:bg-black/5 dark:border-white/20 dark:text-white/60 dark:hover:bg-white/5")
                }
              >
                {t}
              </button>
            );
          })}
        </div>
        <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-black/70 dark:text-white/70">
          <input
            type="checkbox"
            checked={undervaluedOnly}
            onChange={(e) => setUndervaluedOnly(e.target.checked)}
            className="h-4 w-4 accent-blue-600"
          />
          저평가만 보기 (PEG &lt; 1, 낮을수록 저평가)
        </label>
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <section>
          <div className="mb-2 text-xs text-black/50 dark:text-white/50">
            후보 {ranked.length}종 · 텐배거점수 순
          </div>
          <ul className="flex flex-col gap-2">
            {ranked.map(({ c, score }) => {
              const isActive = active?.ticker === c.ticker;
              return (
                <li key={c.ticker}>
                  <button
                    onClick={() => setSelected(c.ticker)}
                    className={
                      "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors " +
                      (isActive
                        ? "border-blue-500/60 bg-blue-600/5 dark:border-blue-400/50"
                        : "border-black/10 bg-white hover:bg-black/[0.03] dark:border-white/15 dark:bg-neutral-900 dark:hover:bg-white/5")
                    }
                  >
                    <div className="flex items-center gap-3">
                      <ScoreBadge score={score} />
                      <div>
                        <div className="font-medium">{c.ticker}</div>
                        <div className="text-xs text-black/50 dark:text-white/50">{c.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm tabular-nums">${c.price.toFixed(2)}</div>
                      <div
                        className={
                          "text-xs tabular-nums " +
                          (c.changePct >= 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400")
                        }
                      >
                        {c.changePct >= 0 ? "+" : ""}
                        {c.changePct.toFixed(1)}%
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
            {ranked.length === 0 && (
              <li className="rounded-xl border border-dashed border-black/15 px-4 py-8 text-center text-sm text-black/50 dark:border-white/20 dark:text-white/50">
                조건에 맞는 후보가 없습니다. 필터를 완화해 보세요.
              </li>
            )}
          </ul>
        </section>

        {active && (
          <section className="flex flex-col gap-4 rounded-xl border border-black/10 bg-white p-5 dark:border-white/15 dark:bg-neutral-900">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">{active.ticker}</span>
                  <ScoreBadge score={tenbaggerScore(active)} />
                </div>
                <div className="text-sm text-black/55 dark:text-white/55">{active.name}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-medium tabular-nums">${active.price.toFixed(2)}</div>
                <div className="text-xs text-black/50 dark:text-white/50">시총 ${active.marketCapB}B</div>
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">팩터 분해</div>
              <div className="flex flex-col gap-2">
                {FACTORS.map((f) => (
                  <FactorBar key={f.key} label={f.label} value={active.factors[f.key]} />
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">왜 후보인가 (근거)</div>
              <ul className="flex flex-col gap-1.5">
                {active.reasons.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-black/70 dark:text-white/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40 dark:bg-white/40" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-blue-500/30 bg-blue-600/5 p-3">
              <div className="mb-1 text-sm font-medium text-blue-700 dark:text-blue-300">
                상승 시나리오 (예시 · 불 케이스)
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-black/55 dark:text-white/55">가정 시 시총 (예시)</span>
                <span className="font-medium">
                  ${active.bull.targetCapB}B ({active.bull.multiple}×)
                </span>
              </div>
              <p className="mt-1 text-xs text-black/55 dark:text-white/55">
                가정: {active.bull.assumption} · 특정 가정 하의 예시 시나리오이며 예측·수익 보장이 아닙니다.
              </p>
            </div>

            <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3">
              <div className="mb-1 text-sm font-medium text-amber-700 dark:text-amber-300">
                ⚠️ 리스크 경고
              </div>
              <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-200/90">
                {active.risks.join(" · ")} · 텐배거는 낮은 확률 시나리오 · 분산투자 권장
              </p>
            </div>

            <div className="flex gap-2">
              <SaveButton variant="primary" className="flex-1" />
              <AlertButton label="가격 알림" className="flex-1" />
            </div>
          </section>
        )}
      </div>
      <Disclaimer />
    </div>
  );
}
