import Link from "next/link";
import { Share2, Upload } from "lucide-react";
import { PORTFOLIO, type Position } from "@/lib/mock";
import { Card, PageHeader, SectionTitle, Chip, Stat, Bar, PriceChange, Disclaimer } from "@/components/ui";

function actionTone(a: Position["action"]): "default" | "warn" | "danger" | "accent" {
  if (a === "비중축소 검토") return "danger";
  if (a === "비중확대 검토") return "accent";
  if (a === "관망") return "warn";
  return "default";
}

export default function PortfolioPage() {
  return (
    <div>
      <PageHeader
        title="포트폴리오 닥터"
        desc="매일 시장 데이터로 리스크·편향을 진단하고 액션을 제안합니다."
        badge={
          <Link href="/portfolio/share" className="ml-auto flex items-center gap-1.5 rounded-lg border border-black/15 px-3 py-1.5 text-xs hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/5">
            <Share2 size={14} /> 카드 공유
          </Link>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3">
        <Stat label="건강점수" value={`${PORTFOLIO.healthScore} / 100`} sub="집중도·편향·변동성 분해" />
        <Stat label="총수익률" value={<PriceChange pct={PORTFOLIO.totalReturnPct} />} sub="연동 기준" />
      </div>

      <section className="mb-5">
        <SectionTitle>5줄 요약</SectionTitle>
        <Card>
          <ul className="flex flex-col gap-1.5">
            {PORTFOLIO.summary.map((s) => (
              <li key={s} className="flex gap-2 text-sm text-ink">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40 dark:bg-white/40" />
                {s}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="mb-5">
        <SectionTitle>종목별 액션 제안</SectionTitle>
        <Card className="!p-0">
          <ul>
            {PORTFOLIO.positions.map((p, i) => (
              <li
                key={p.ticker}
                className={
                  "flex items-center gap-3 px-4 py-3 " +
                  (i > 0 ? "border-t border-line" : "")
                }
              >
                <div className="w-16 shrink-0">
                  <div className="font-medium">{p.ticker}</div>
                  <div className="text-xs text-faint">비중 {p.weight}%</div>
                </div>
                <div className="flex-1"><Bar value={p.weight * 2.5} /></div>
                <div className="w-14 shrink-0 text-right text-sm">
                  <PriceChange pct={p.pnlPct} />
                </div>
                <div className="w-20 shrink-0 text-right">
                  <Chip tone={actionTone(p.action)}>{p.action}</Chip>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <p className="mt-2 text-xs text-faint">
          각 항목은 근거(실적·밸류에이션·거시 민감도·뉴스)와 함께 제시되는 검토 참고이며, 매수·매도 권유가 아닙니다. 최종 판단은 본인에게 있습니다.
        </p>
      </section>

      <Link href="/portfolio/upload" className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-black/20 py-3 text-sm text-black/60 hover:bg-black/[0.02] dark:border-white/20 dark:text-white/60 dark:hover:bg-white/5">
        <Upload size={16} /> 브로커 연동 또는 CSV 업로드
      </Link>

      <Disclaimer />
    </div>
  );
}
