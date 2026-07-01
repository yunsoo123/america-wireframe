import Link from "next/link";
import { Zap, TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import { MACRO, SECTORS } from "@/lib/mock";
import { Card, PageHeader, SectionTitle, Chip, Bar, Disclaimer } from "@/components/ui";

function DirIcon({ dir }: { dir: "up" | "down" | "flat" }) {
  if (dir === "up") return <TrendingUp size={16} className="text-emerald-600 dark:text-emerald-400" />;
  if (dir === "down") return <TrendingDown size={16} className="text-red-600 dark:text-red-400" />;
  return <Minus size={16} className="text-black/40 dark:text-white/40" />;
}

export default function ScreeningPage() {
  return (
    <div>
      <PageHeader
        title="탑다운 스크리닝"
        desc="매크로 → 섹터 → 종목 순으로 유망 후보를 압축합니다."
      />

      {/* 텐배거 진입 강조 */}
      <Link
        href="/screening/tenbagger"
        className="group mb-6 flex items-center justify-between rounded-xl border border-blue-500/40 bg-blue-600/[0.06] p-4 transition-colors hover:bg-blue-600/10"
      >
        <div className="flex items-center gap-3">
          <Zap size={22} className="text-blue-600 dark:text-blue-400" />
          <div>
            <div className="flex items-center gap-2 font-medium">
              텐배거 스카우터 <Chip tone="warn">공격형 ⚡</Chip>
            </div>
            <div className="text-sm text-black/55 dark:text-white/55">
              저평가 고성장 후보를 텐배거점수로 스크리닝
            </div>
          </div>
        </div>
        <ArrowRight size={18} className="text-blue-600 transition-transform group-hover:translate-x-0.5 dark:text-blue-400" />
      </Link>

      <section className="mb-6">
        <SectionTitle>매크로 지표</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {MACRO.map((m) => (
            <Card key={m.label}>
              <div className="text-xs text-black/50 dark:text-white/50">{m.label}</div>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-lg font-medium tabular-nums">{m.value}</span>
                <DirIcon dir={m.dir} />
              </div>
              <div className="mt-0.5 text-xs text-black/45 dark:text-white/45">{m.note}</div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <SectionTitle>섹터 강약</SectionTitle>
          <Chip tone="accent">레짐: 리스크온</Chip>
        </div>
        <Card>
          <ul className="flex flex-col gap-3">
            {SECTORS.map((s) => (
              <li key={s.name} className="flex items-center gap-3">
                <span className="w-16 shrink-0 text-sm">{s.name}</span>
                <Bar value={s.strength} />
                <span className="w-8 shrink-0 text-right text-xs tabular-nums text-black/50 dark:text-white/50">
                  {s.strength}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section>
        <SectionTitle>후보 필터 빌더</SectionTitle>
        <Card>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-black/50 dark:text-white/50">프리셋</span>
            <Chip active>초보</Chip>
            <Chip>중급</Chip>
            <Chip>커스텀</Chip>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-black/[0.03] px-4 py-3 text-sm dark:bg-white/5">
            <span className="text-black/60 dark:text-white/60">후보군 압축</span>
            <span className="font-medium tabular-nums">100 → 20 → 5</span>
          </div>
          <p className="mt-3 text-xs text-black/45 dark:text-white/45">
            각 단계에서 탈락 사유(기준 미충족)와 근거 지표·출처가 함께 표시됩니다.
          </p>
        </Card>
      </section>

      <Disclaimer />
    </div>
  );
}
