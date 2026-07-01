import Link from "next/link";
import { Zap, TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import { MACRO, SECTORS } from "@/lib/mock";
import { Card, PageHeader, SectionTitle, Chip, Bar, Disclaimer } from "@/components/ui";
import { FilterBuilder } from "@/components/features";

function DirIcon({ dir }: { dir: "up" | "down" | "flat" }) {
  if (dir === "up") return <TrendingUp size={16} className="text-up" />;
  if (dir === "down") return <TrendingDown size={16} className="text-down" />;
  return <Minus size={16} className="text-faint" />;
}

export default function ScreeningPage() {
  return (
    <div>
      <PageHeader title="탑다운 스크리닝" desc="매크로 → 섹터 → 종목 순으로 유망 후보를 압축합니다." />

      <Link
        href="/screening/tenbagger"
        className="group mb-6 flex items-center justify-between rounded-card border border-gold/30 bg-gold-soft p-4 transition-colors hover:border-gold/60"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold text-white">
            <Zap size={18} />
          </span>
          <div>
            <div className="flex items-center gap-2 font-semibold text-ink">
              텐배거 스카우터 <Chip tone="gold">공격형</Chip>
            </div>
            <div className="text-sm text-muted">저평가 고성장 후보를 텐배거점수로 스크리닝</div>
          </div>
        </div>
        <ArrowRight size={18} className="text-gold-ink transition-transform group-hover:translate-x-0.5" />
      </Link>

      <section className="mb-6">
        <SectionTitle>매크로 지표</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {MACRO.map((m) => (
            <Card key={m.label}>
              <div className="text-xs font-medium text-muted">{m.label}</div>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-lg font-bold tabular-nums text-ink">{m.value}</span>
                <DirIcon dir={m.dir} />
              </div>
              <div className="mt-0.5 text-xs text-faint">{m.note}</div>
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
                <Link href={`/sector/${encodeURIComponent(s.name)}`} className="w-16 shrink-0 text-sm font-medium text-ink hover:text-accent">
                  {s.name}
                </Link>
                <Bar value={s.strength} />
                <span className="w-8 shrink-0 text-right text-xs tabular-nums text-faint">{s.strength}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section>
        <SectionTitle>후보 필터 빌더</SectionTitle>
        <FilterBuilder />
      </section>

      <Disclaimer />
    </div>
  );
}
