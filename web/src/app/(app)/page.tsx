import Link from "next/link";
import { Zap, Filter, ArrowRight } from "lucide-react";
import { BRIEFING, WATCHLIST } from "@/lib/mock";
import { CANDIDATES } from "@/lib/tenbagger";
import { fmtPrice } from "@/lib/format";
import { Card, PageHeader, SectionTitle, Chip, PriceChange, Disclaimer } from "@/components/ui";
import { RiskNote, HelpfulButton } from "@/components/interactive";

export default function HomePage() {
  return (
    <div>
      <PageHeader title="오늘의 브리핑" desc="6월 27일 · 야간 마감 기준" />

      <RiskNote />

      {/* 스크리닝 강조 히어로 */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <Link
          href="/screening/tenbagger"
          className="group flex flex-col justify-between rounded-card border border-gold/30 bg-gold-soft p-4 transition-colors hover:border-gold/60"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-white">
              <Zap size={17} />
            </span>
            <span className="font-semibold text-ink">텐배거 스카우터</span>
            <Chip tone="gold">공격형</Chip>
          </div>
          <p className="text-sm text-muted">저평가된 고성장 후보를 점수순으로. 오늘의 후보 {CANDIDATES.length}종</p>
          <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-gold-ink">
            바로 보기 <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </div>
        </Link>

        <Link
          href="/screening"
          className="group flex flex-col justify-between rounded-card border border-line bg-card p-4 shadow-card transition-colors hover:bg-hover"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <Filter size={17} />
            </span>
            <span className="font-semibold text-ink">탑다운 스크리닝</span>
          </div>
          <p className="text-sm text-muted">매크로 → 섹터 → 종목. 오늘 유망 섹터: 반도체·헬스케어</p>
          <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-accent">
            대시보드 열기 <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </div>
        </Link>
      </div>

      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <SectionTitle>3분 요약</SectionTitle>
          <Link href="/briefing" className="text-xs font-medium text-accent hover:underline">
            전체 보기 →
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {BRIEFING.map((b) => (
            <Card key={b.title}>
              <div className="mb-1 flex items-center gap-2">
                <Chip tone="accent">{b.tag}</Chip>
                <span className="text-sm font-semibold text-ink">{b.title}</span>
              </div>
              <p className="text-sm leading-relaxed text-muted">{b.body}</p>
            </Card>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <HelpfulButton />
          <Chip>출처 보기</Chip>
        </div>
      </section>

      <section>
        <SectionTitle>내 종목 이슈</SectionTitle>
        <Card className="!p-0">
          <ul>
            {WATCHLIST.map((w, i) => (
              <li
                key={w.ticker}
                className={"flex items-center justify-between px-4 py-3.5 " + (i > 0 ? "border-t border-line" : "")}
              >
                <Link href={`/stock/${w.ticker}`} className="font-semibold text-ink hover:text-accent">
                  {w.ticker}
                  <span className="ml-2 text-xs font-normal text-faint">{w.name}</span>
                </Link>
                <div className="flex items-center gap-3 text-sm">
                  <span className="tabular-nums text-muted">{fmtPrice(w.price)}</span>
                  <PriceChange pct={w.changePct} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <Disclaimer />
    </div>
  );
}
