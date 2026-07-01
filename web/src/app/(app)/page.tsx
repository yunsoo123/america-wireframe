import Link from "next/link";
import { Zap, Filter, ArrowRight } from "lucide-react";
import { BRIEFING, WATCHLIST } from "@/lib/mock";
import { Card, PageHeader, SectionTitle, Chip, PriceChange, Disclaimer } from "@/components/ui";

export default function HomePage() {
  return (
    <div>
      <PageHeader title="오늘의 브리핑" desc="6월 27일 · 야간 마감 기준" />

      {/* 스크리닝 강조 히어로 */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <Link
          href="/screening/tenbagger"
          className="group flex flex-col justify-between rounded-xl border border-blue-500/40 bg-blue-600/[0.06] p-4 transition-colors hover:bg-blue-600/10"
        >
          <div className="mb-3 flex items-center gap-2">
            <Zap size={20} className="text-blue-600 dark:text-blue-400" />
            <span className="font-medium">텐배거 스카우터</span>
            <Chip tone="warn">공격형 ⚡</Chip>
          </div>
          <p className="text-sm text-black/60 dark:text-white/60">
            저평가된 고성장 후보를 점수순으로. 오늘의 후보 8종 →
          </p>
          <div className="mt-3 flex items-center gap-1 text-sm font-medium text-blue-700 dark:text-blue-300">
            바로 보기 <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </div>
        </Link>

        <Link
          href="/screening"
          className="group flex flex-col justify-between rounded-xl border border-black/10 bg-white p-4 transition-colors hover:bg-black/[0.02] dark:border-white/15 dark:bg-neutral-900 dark:hover:bg-white/5"
        >
          <div className="mb-3 flex items-center gap-2">
            <Filter size={20} className="text-blue-600 dark:text-blue-400" />
            <span className="font-medium">탑다운 스크리닝</span>
          </div>
          <p className="text-sm text-black/60 dark:text-white/60">
            매크로 → 섹터 → 종목. 오늘 유망 섹터: 반도체·헬스케어 →
          </p>
          <div className="mt-3 flex items-center gap-1 text-sm font-medium text-blue-700 dark:text-blue-300">
            대시보드 열기 <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </div>
        </Link>
      </div>

      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <SectionTitle>3분 요약</SectionTitle>
          <div className="flex gap-1.5">
            <Chip active>3분</Chip>
            <Chip>7분</Chip>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {BRIEFING.map((b) => (
            <Card key={b.title}>
              <div className="mb-1 flex items-center gap-2">
                <Chip tone="accent">{b.tag}</Chip>
                <span className="text-sm font-medium">{b.title}</span>
              </div>
              <p className="text-sm text-black/60 dark:text-white/60">{b.body}</p>
            </Card>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <Chip>👍 도움됨</Chip>
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
                className={
                  "flex items-center justify-between px-4 py-3 " +
                  (i > 0 ? "border-t border-black/[0.06] dark:border-white/10" : "")
                }
              >
                <Link href={`/stock/${w.ticker}`} className="font-medium hover:underline">
                  {w.ticker}
                  <span className="ml-2 text-xs font-normal text-black/50 dark:text-white/50">{w.name}</span>
                </Link>
                <div className="text-sm">
                  <span className="mr-3 tabular-nums text-black/50 dark:text-white/50">
                    ${w.price.toFixed(2)}
                  </span>
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
