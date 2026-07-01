import Link from "next/link";
import { NEWS } from "@/lib/mock";
import { Card, PageHeader, Chip, PriceChange, Disclaimer } from "@/components/ui";

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
            <p className="text-sm text-black/65 dark:text-white/65">{n.summary}</p>
            <div className="mt-2 flex items-center gap-1.5 text-xs">
              <span className="text-black/45 dark:text-white/45">무슨 일 → 왜 → 체크할 것</span>
              <span className="mx-1 text-black/20 dark:text-white/20">·</span>
              <Chip>출처 {n.sources}</Chip>
              <Chip>👍</Chip>
              <Chip tone="danger">🚩 신고</Chip>
            </div>
          </Card>
        ))}
      </div>

      <Disclaimer />
    </div>
  );
}
