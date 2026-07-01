import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { findStock } from "@/lib/mock";
import { Card, Chip, PriceChange, Disclaimer } from "@/components/ui";
import { SaveButton } from "@/components/interactive";
import { TermTip } from "@/components/TermTip";

const CHART = [40, 55, 45, 70, 60, 85, 90];

export default async function StockPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const stock = findStock(ticker);
  if (!stock) notFound();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Link href="/search" className="flex items-center gap-1 text-sm text-black/55 hover:underline dark:text-white/55">
          <ArrowLeft size={16} /> 검색
        </Link>
        <SaveButton />
      </div>

      <div className="mb-4 flex items-end justify-between">
        <div>
          <h1 className="text-xl font-medium">{stock.ticker}</h1>
          <div className="text-sm text-muted">
            {stock.name} · {stock.sector}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-medium tabular-nums">${stock.price.toFixed(2)}</div>
          <PriceChange pct={stock.changePct} />
        </div>
      </div>

      <Card className="mb-4">
        <div className="flex h-24 items-end gap-1.5">
          {CHART.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-blue-600/70 dark:bg-blue-400/70"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </Card>

      <div className="mb-4 flex flex-wrap gap-1.5">
        <Chip active>개요</Chip>
        <Chip>뉴스</Chip>
        <Chip>이벤트</Chip>
        <Chip>지표</Chip>
      </div>

      <Card>
        <div className="mb-2 text-sm font-medium">근거 카드</div>
        <dl className="flex flex-col gap-2 text-sm">
          {[
            { pre: "", term: "PER", post: " (낮을수록 저평가)", v: "38.2" },
            { pre: "매출 성장 (YoY)", term: null, post: "", v: "+22%" },
            { pre: "", term: "EPS", post: " 성장", v: "+31%" },
            { pre: "52주 ", term: "변동성", post: "", v: "높음" },
          ].map((r) => (
            <div key={r.pre + (r.term ?? "") + r.post} className="flex justify-between">
              <dt className="text-muted">
                {r.pre}
                {r.term ? <TermTip term={r.term} /> : null}
                {r.post}
              </dt>
              <dd className="tabular-nums text-ink">{r.v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-faint">
          출처·기준시각: mock 데이터 (실데이터 연동 예정) · 지표는 사실, 해석은 참고용
        </p>
      </Card>

      <Disclaimer />
    </div>
  );
}
