import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getNews } from "@/lib/newsfeed";
import { fmtAgo } from "@/lib/format";
import { Card, PageHeader, Chip, Disclaimer } from "@/components/ui";
import { HelpfulButton, ReportButton } from "@/components/interactive";

export const revalidate = 900;

export default async function NewsPage() {
  const items = await getNews();

  return (
    <div>
      <PageHeader
        title="뉴스 · 이벤트"
        desc="보유·관심 종목의 최신 뉴스를 실시간으로 모으고 원인을 분류합니다."
        badge={
          items.length > 0 ? (
            <span className="rounded-full bg-up-soft px-2.5 py-1 text-xs font-medium text-up">● 실시간 · Yahoo</span>
          ) : undefined
        }
      />

      {items.length === 0 ? (
        <Card>
          <p className="text-sm text-muted">
            실시간 뉴스를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요. (데이터 소스 일시 지연)
          </p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((n) => (
            <Card key={n.id}>
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <Link href={`/stock/${n.ticker}`} className="rounded-full bg-sunken px-2.5 py-0.5 text-xs font-semibold text-ink hover:text-accent">
                  {n.ticker}
                </Link>
                <Chip tone="accent">원인: {n.cause}</Chip>
                <span className="text-xs text-faint">{n.publisher} · {fmtAgo(n.timeMs)}</span>
              </div>
              <a
                href={n.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-1 text-[15px] font-medium leading-snug text-ink hover:text-accent"
              >
                {n.title}
                <ExternalLink size={14} className="mt-1 shrink-0 text-faint" />
              </a>
              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
                <Link href={`/news/${n.ticker}`} className="text-accent hover:underline">이벤트·트리거 설정 →</Link>
                <span className="mx-1 text-faint">·</span>
                <HelpfulButton />
                <ReportButton />
              </div>
            </Card>
          ))}
        </div>
      )}

      <Disclaimer />
    </div>
  );
}
