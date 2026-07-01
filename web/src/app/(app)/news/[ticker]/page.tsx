import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { findNews } from "@/lib/mock";
import { Card, Chip, PriceChange, SectionTitle, Disclaimer } from "@/components/ui";
import { HelpfulButton, ReportButton } from "@/components/interactive";
import { TriggerSettings } from "@/components/features";

const TIMELINE = [
  { t: "무슨 일이 있었나", d: "회사가 분기 인도량 가이던스를 하향 조정했습니다." },
  { t: "왜 움직였나", d: "수요 둔화 우려가 커지며 매도세가 강해졌습니다." },
  { t: "지금 체크할 것", d: "다음 실적일의 실제 인도량과 마진 추세를 확인하세요." },
];

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const news = findNews(ticker);
  if (!news) notFound();

  return (
    <div>
      <Link href="/news" className="mb-4 flex items-center gap-1 text-sm text-black/55 hover:underline dark:text-white/55">
        <ArrowLeft size={16} /> 뉴스 · 이벤트
      </Link>

      <header className="mb-5">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-medium">{news.ticker}</h1>
          <PriceChange pct={news.changePct} />
          <Chip>{news.session}</Chip>
          <Chip tone="accent">원인: {news.cause}</Chip>
        </div>
        <p className="mt-1 text-sm text-muted">{news.summary}</p>
      </header>

      <SectionTitle>타임라인</SectionTitle>
      <Card className="mb-5">
        <ol className="flex flex-col gap-3">
          {TIMELINE.map((step, i) => (
            <li key={step.t} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-medium text-accent">
                {i + 1}
              </span>
              <div>
                <div className="text-sm font-medium">{step.t}</div>
                <div className="text-sm text-muted">{step.d}</div>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-3 flex items-center gap-2 border-t border-black/[0.06] pt-3 dark:border-white/10">
          <Chip>출처 {news.sources}</Chip>
          <span className="text-xs text-faint">시장 시간대: {news.session}</span>
        </div>
      </Card>

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
