"use client";

import { useState } from "react";
import { Check, Copy, Image as ImageIcon, Upload } from "lucide-react";

const chip = "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors";
const chipOn = "border-transparent bg-accent-soft text-accent-ink";
const chipOff = "border-line text-muted hover:bg-hover";

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={"relative h-6 w-11 shrink-0 rounded-full transition-colors " + (on ? "bg-accent" : "bg-track")}
    >
      <span className={"absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all " + (on ? "left-[22px]" : "left-0.5")} />
    </button>
  );
}

export function FilterBuilder() {
  const [preset, setPreset] = useState("초보");
  const [filters, setFilters] = useState<Record<string, boolean>>({
    유동성: true,
    "실적 모멘텀": false,
    밸류에이션: false,
    변동성: false,
  });
  const activeCount = Object.values(filters).filter(Boolean).length;
  const stage1 = Math.max(8, Math.round(100 / (activeCount + 1)));
  const stage2 = Math.max(3, Math.round(stage1 / 3));

  return (
    <div className="rounded-card border border-line bg-card p-4 shadow-card">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted">프리셋</span>
        {["초보", "중급", "커스텀"].map((p) => (
          <button key={p} type="button" onClick={() => setPreset(p)} className={`${chip} ${preset === p ? chipOn : chipOff}`}>
            {p}
          </button>
        ))}
      </div>

      <div className="mb-3 flex flex-col gap-1">
        {Object.keys(filters).map((k) => (
          <div key={k} className="flex items-center justify-between py-1.5 text-sm">
            <span className="text-ink">{k}</span>
            <Toggle on={filters[k]} onClick={() => setFilters((f) => ({ ...f, [k]: !f[k] }))} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-xl bg-sunken px-4 py-3 text-sm">
        <span className="text-muted">후보군 압축</span>
        <span className="font-bold tabular-nums text-ink">100 → {stage1} → {stage2}</span>
      </div>
      <p className="mt-3 text-xs text-faint">
        지표를 켤수록 후보가 더 압축됩니다. 각 단계에서 탈락 사유와 근거·출처가 표시됩니다.
      </p>
    </div>
  );
}

export function TriggerSettings() {
  const [t, setT] = useState<Record<string, boolean>>({
    "일간 ±5% 변동": true,
    "거래량 2배 급증": true,
    "갭 3% 이상": false,
    "30일 변동성 급증": false,
  });
  return (
    <div className="flex flex-col gap-1">
      {Object.keys(t).map((k) => (
        <div key={k} className="flex items-center justify-between py-1.5 text-sm">
          <span className="text-ink">{k}</span>
          <Toggle on={t[k]} onClick={() => setT((s) => ({ ...s, [k]: !s[k] }))} />
        </div>
      ))}
      <p className="mt-2 text-xs text-faint">
        조건 충족 시 알림 우선순위가 산정됩니다. 종목·그룹별로 임계값을 조정할 수 있습니다.
      </p>
    </div>
  );
}

export function ShareCard() {
  const [masked, setMasked] = useState(true);
  const [copied, setCopied] = useState(false);
  const rows = [
    { t: "AAPL", w: "28%" },
    { t: "NVDA", w: "24%" },
    { t: "TSLA", w: "17%" },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-card border border-line bg-card p-5 text-center shadow-card">
        <div className="text-xs font-medium text-muted">내 포트폴리오 건강진단</div>
        <div className="my-1 text-4xl font-bold tabular-nums text-ink">72점</div>
        <div className="mb-3 flex justify-center gap-1.5">
          <span className={`${chip} ${chipOff}`}>분산 양호</span>
          <span className="rounded-full border-transparent bg-warn-soft px-3 py-1.5 text-xs font-medium text-warn">변동성 주의</span>
        </div>
        <div className="mx-auto flex max-w-xs flex-col gap-1 text-sm">
          {rows.map((r) => (
            <div key={r.t} className="flex justify-between border-t border-line py-1.5">
              <span className="tabular-nums text-ink">{masked ? "●●●●" : r.t}</span>
              <span className="tabular-nums text-muted">{masked ? "●●" : r.w}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-faint">
          {masked ? "종목·수량·평단은 가려져 공유됩니다" : "실제 값이 보입니다 (공유 주의)"}
        </p>
      </div>

      <div className="flex items-center justify-between rounded-card border border-line bg-card px-4 py-3 shadow-card">
        <span className="text-sm text-ink">민감정보 마스킹</span>
        <Toggle on={masked} onClick={() => setMasked((m) => !m)} />
      </div>

      <div className="flex gap-2">
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent-hover">
          <ImageIcon size={15} /> 이미지로 공유
        </button>
        <button
          onClick={() => setCopied(true)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-line-strong py-2.5 text-sm font-semibold text-ink hover:bg-hover"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "링크 복사됨" : "링크 복사"}
        </button>
      </div>
    </div>
  );
}

export function UploadForm() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [imported, setImported] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-card border border-line bg-card p-4 shadow-card">
        <div className="mb-2 text-sm font-semibold text-ink">CSV 형식</div>
        <code className="block rounded-lg bg-sunken px-3 py-2 text-xs text-ink">티커, 수량, 평균단가, 매수일(선택)</code>
        <p className="mt-2 text-xs text-faint">
          예: <span className="tabular-nums">AAPL, 10, 185.20, 2025-03-01</span>
        </p>
      </div>

      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-card border border-dashed border-line-strong py-8 text-sm text-muted hover:bg-hover">
        <Upload size={20} />
        {fileName ? fileName : "CSV 파일 선택 또는 드래그"}
        <input type="file" accept=".csv" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)} />
      </label>

      {fileName && (
        <div className="rounded-card border border-line bg-card p-4 shadow-card">
          <div className="mb-2 text-sm font-semibold text-ink">미리보기 · 검증 결과</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted">
                <th className="py-1 font-medium">티커</th><th className="font-medium">수량</th><th className="font-medium">평단</th><th className="font-medium">상태</th>
              </tr>
            </thead>
            <tbody className="tabular-nums text-ink">
              <tr className="border-t border-line"><td className="py-1.5">AAPL</td><td>10</td><td>185.20</td><td className="text-up">정상</td></tr>
              <tr className="border-t border-line"><td className="py-1.5">NVDA</td><td>5</td><td>92.10</td><td className="text-up">정상</td></tr>
              <tr className="border-t border-line"><td className="py-1.5">XYZ9</td><td>3</td><td>—</td><td className="text-down">미지원 티커</td></tr>
            </tbody>
          </table>
          <p className="mt-2 text-xs text-faint">2행 인식 · 1행 오류 (미지원 티커는 제외됩니다)</p>
          <button
            onClick={() => setImported(true)}
            className="mt-3 w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent-hover"
          >
            {imported ? "가져왔습니다 ✓" : "정상 2건 가져오기"}
          </button>
        </div>
      )}
    </div>
  );
}
