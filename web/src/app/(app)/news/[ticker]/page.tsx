import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getTickerNews } from "@/lib/newsfeed";
import { fmtAgo } from "@/lib/format";
import { Card, Chip, SectionTitle, Disclaimer } from "@/components/ui";
import { HelpfulButton, ReportButton } from "@/components/interactive";
import { TriggerSettings } from "@/components/features";

export const revalidate = 900;

export default async function NewsDetailPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params;
  const news = await getTickerNews(ticker);

  return (
    <div>
      <Link href="/news" className="mb-4 flex items-center gap-1 text-sm text-muted hover:underline">
        <ArrowLeft size={16} /> 뉴스 · 이벤트
      </Link>

      <header className="mb-5">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-ink">{ticker}</h1>
          <Link href={`/stock/${ticker}`} className="text-sm text-accent hover:underline">종목 상세 →</Link>
        </div>
        <p className="mt-1 text-[15px] text-muted">이 종목의 최신 뉴스와 이벤트 트리거 조건입니다.</p>
      </header>

      <SectionTitle>최신 뉴스</SectionTitle>
      {news.length > 0 ? (
        <div className="mb-5 flex flex-col gap-2.5">
          {news.map((n) => (
            <Card key={n.id}>
              <div className="mb-1 flex items-center gap-2">
                <Chip tone="accent">{n.cause}</Chip>
                <span className="text-xs text-faint">{n.publisher} · {fmtAgo(n.timeMs)}</span>
              </div>
              <a
                href={n.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-1 text-sm font-medium leading-snug text-ink hover:text-accent"
              >
                {n.title}
                <ExternalLink size={13} className="mt-0.5 shrink-0 text-faint" />
              </a>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="mb-5">
          <p className="text-sm text-muted">최근 뉴스를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>
        </Card>
      )}

      <SectionTitle>이 종목 이벤트 트리거 조건</SectionTitle>
      <Card className="mb-5">
        <TriggerSettings />
      </Card>

      <div className="flex items-center gap-2">
        <HelpfulButton />
        <ReportButton />
      </div>

      <Disclaimer />
    </div>
  );
}
