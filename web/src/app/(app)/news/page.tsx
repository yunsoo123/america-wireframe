import Link from "next/link";
import { NEWS } from "@/lib/mock";
import { Card, PageHeader, Chip, PriceChange, Disclaimer } from "@/components/ui";
import { HelpfulButton, ReportButton } from "@/components/interactive";

export default function NewsPage() {
  return (
    <div>
      <PageHeader
        title="뉴스 · 이벤트"
        desc="보유·관심 종목의 변동 이벤트를 요약하고 원인을 분류합니다."
      />

      <div className="mb-4 flex flex-wrap gap-1.5">
        <Chip active>전체</Chip>
        <Chip>보유</Chip>
        <Chip>관심</Chip>
      </div>

      <div className="flex flex-col gap-3">
        {NEWS.map((n) => (
          <Card key={n.ticker}>
            <div className="mb-1.5 flex items-center gap-2">
              <Link href={`/stock/${n.ticker}`} className="font-medium hover:underline">
                {n.ticker}
              </Link>
              <PriceChange pct={n.changePct} />
              <Chip>{n.session}</Chip>
              <Chip tone="accent">원인: {n.cause}</Chip>
            </div>
            <p className="text-sm text-muted">{n.summary}</p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
              <Link href={`/news/${n.ticker}`} className="text-blue-700 hover:underline dark:text-blue-300">
                이벤트 상세 (무슨 일 → 왜 → 체크) →
              </Link>
              <span className="mx-1 text-faint">·</span>
              <Chip>출처 {n.sources}</Chip>
              <HelpfulButton />
              <ReportButton />
            </div>
          </Card>
        ))}
      </div>

      <Disclaimer />
    </div>
  );
}
