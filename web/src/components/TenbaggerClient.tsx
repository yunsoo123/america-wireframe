"use client";

import { useMemo, useState } from "react";
import { ALL_THEMES, FACTORS, tenbaggerScore, type Candidate, type Theme } from "@/lib/tenbagger";
import { fmtPrice, fmtCap } from "@/lib/format";
import { SaveButton, AlertButton } from "@/components/interactive";
import { Disclaimer } from "@/components/ui";

function ScoreBadge({ score }: { score: number }) {
  const tone =
    score >= 80 ? "bg-up-soft text-up" : score >= 60 ? "bg-accent-soft text-accent-ink" : "bg-sunken text-muted";
  return (
    <span className={"inline-flex items-center justify-center rounded-md px-2 py-0.5 text-sm font-bold tabular-nums " + tone}>
      {score}
    </span>
  );
}

const chip = "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors";
const chipOn = "border-transparent bg-accent-soft text-accent-ink";
const chipOff = "border-line text-muted hover:bg-hover";

function FactorBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-xs text-muted">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-sunken">
        <div className={"h-full rounded-full " + (value < 40 ? "bg-warn" : "bg-track")} style={{ width: `${value}%` }} />
      </div>
      <span className="w-7 shrink-0 text-right text-xs tabular-nums text-faint">{value}</span>
    </div>
  );
}

export function TenbaggerClient({ candidates, live }: { candidates: Candidate[]; live: boolean }) {
  const [themes, setThemes] = useState<Set<Theme>>(new Set());
  const [undervaluedOnly, setUndervaluedOnly] = useState(false);
  const [preset, setPreset] = useState("텐배거 ⚡");
  const [selected, setSelected] = useState<string>(candidates[0]?.ticker ?? "");

  const ranked = useMemo(() => {
    return candidates
      .filter((c) => {
        if (undervaluedOnly && !c.pegUnder1) return false;
        if (themes.size > 0 && !c.themes.some((t) => themes.has(t))) return false;
        return true;
      })
      .map((c) => ({ c, score: tenbaggerScore(c) }))
      .sort((a, b) => b.score - a.score);
  }, [candidates, themes, undervaluedOnly]);

  const active: Candidate | undefined = ranked.find((r) => r.c.ticker === selected)?.c ?? ranked[0]?.c;

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
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-ink">텐배거 스카우터</h1>
          <span className="rounded-full bg-gold-soft px-2.5 py-1 text-xs font-medium text-gold-ink">공격형 ⚡</span>
          {live ? (
            <span className="rounded-full bg-up-soft px-2.5 py-1 text-xs font-medium text-up">● 실시간 · Yahoo</span>
          ) : (
            <span className="rounded-full bg-sunken px-2.5 py-1 text-xs font-medium text-muted">예시 데이터</span>
          )}
        </div>
        <p className="mt-1 text-[15px] text-muted">저평가된 고성장(텐배거 가능성) 후보 · 고위험 · 정보 제공 목적 · 손실 가능</p>
      </header>

      <section className="mb-5 rounded-card border border-line bg-card p-4 shadow-card">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-medium text-muted">프리셋</span>
          {["초보", "중급", "텐배거 ⚡"].map((p) => (
            <button key={p} type="button" onClick={() => setPreset(p)} className={`${chip} ${preset === p ? chipOn : chipOff}`}>
              {p}
            </button>
          ))}
        </div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-medium text-muted">테마</span>
          {ALL_THEMES.map((t) => {
            const on = themes.has(t);
            return (
              <button key={t} onClick={() => toggleTheme(t)} className={`${chip} ${on ? chipOn : chipOff}`}>
                {t}
              </button>
            );
          })}
        </div>
        <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-ink">
          <input type="checkbox" checked={undervaluedOnly} onChange={(e) => setUndervaluedOnly(e.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
          저평가만 보기 (PEG &lt; 1, 낮을수록 저평가)
        </label>
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <section>
          <div className="mb-2 text-xs font-medium text-muted">후보 {ranked.length}종 · 텐배거점수 순</div>
          <ul className="flex flex-col gap-2">
            {ranked.map(({ c, score }) => {
              const isActive = active?.ticker === c.ticker;
              return (
                <li key={c.ticker}>
                  <button
                    onClick={() => setSelected(c.ticker)}
                    className={
                      "flex w-full items-center justify-between rounded-card border px-4 py-3.5 text-left transition-colors " +
                      (isActive ? "border-accent bg-accent-soft" : "border-line bg-card shadow-card hover:bg-hover")
                    }
                  >
                    <div className="flex items-center gap-3">
                      <ScoreBadge score={score} />
                      <div>
                        <div className="font-semibold text-ink">{c.ticker}</div>
                        <div className="text-xs text-faint">{c.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm tabular-nums text-ink">{fmtPrice(c.price)}</div>
                      <div className={"text-xs font-medium tabular-nums " + (c.changePct >= 0 ? "text-up" : "text-down")}>
                        {c.changePct >= 0 ? "+" : ""}{c.changePct.toFixed(1)}%
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
            {ranked.length === 0 && (
              <li className="rounded-card border border-dashed border-line-strong px-4 py-8 text-center text-sm text-muted">
                조건에 맞는 후보가 없습니다. 필터를 완화해 보세요.
              </li>
            )}
          </ul>
        </section>

        {active && (
          <section className="flex flex-col gap-4 rounded-card border border-line bg-card p-5 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-ink">{active.ticker}</span>
                  <ScoreBadge score={tenbaggerScore(active)} />
                </div>
                <div className="text-sm text-muted">{active.name}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold tabular-nums text-ink">{fmtPrice(active.price)}</div>
                <div className="text-xs text-faint">시총 {fmtCap(active.marketCapB)}</div>
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold text-ink">팩터 분해</div>
              <div className="flex flex-col gap-2">
                {FACTORS.map((f) => (
                  <FactorBar key={f.key} label={f.label} value={active.factors[f.key]} />
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold text-ink">왜 후보인가 (근거)</div>
              <ul className="flex flex-col gap-1.5">
                {active.reasons.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-faint" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-accent-soft bg-accent-soft/50 p-3">
              <div className="mb-1 text-sm font-semibold text-accent-ink">상승 시나리오 (예시 · 불 케이스)</div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">가정 시 시총 (예시)</span>
                <span className="font-bold tabular-nums text-ink">{fmtCap(active.bull.targetCapB)} ({active.bull.multiple}×)</span>
              </div>
              <p className="mt-1 text-xs text-muted">
                가정: {active.bull.assumption} · 특정 가정 하의 예시 시나리오이며 예측·수익 보장이 아닙니다.
              </p>
            </div>

            <div className="rounded-xl border-l-4 border-warn bg-warn-soft p-3">
              <div className="mb-1 text-sm font-semibold text-warn">⚠️ 리스크 경고</div>
              <p className="text-xs leading-relaxed text-warn">
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
