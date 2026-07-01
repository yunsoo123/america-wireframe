import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { BRIEFING } from "@/lib/mock";
import { Card, Chip, Disclaimer } from "@/components/ui";
import { HelpfulButton } from "@/components/interactive";

export default function BriefingPage() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 text-sm text-black/55 hover:underline dark:text-white/55">
          <ArrowLeft size={16} /> 홈
        </Link>
        <Link href="/settings" className="text-xs text-blue-700 hover:underline dark:text-blue-300">
          빈도·시간 설정
        </Link>
      </div>

      <header className="mb-5">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">오늘의 3분 브리핑</h1>
          <Chip tone="accent">3분</Chip>
        </div>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted">
          <Clock size={13} /> 6월 27일 07:00 생성 · 야간 마감 기준
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {BRIEFING.map((b, i) => (
          <Card key={b.title}>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/[0.05] text-xs font-medium dark:bg-white/10">
                {i + 1}
              </span>
              <Chip tone="accent">{b.tag}</Chip>
              <span className="text-sm font-medium">{b.title}</span>
            </div>
            <p className="text-sm leading-relaxed text-muted">{b.body}</p>
            <div className="mt-2 flex items-center gap-2">
              <Chip>출처 3</Chip>
              <span className="text-xs text-faint">장 시간대: 야간</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <HelpfulButton />
        <Chip>더 짧게 (요약)</Chip>
        <Chip>더 길게 (7분)</Chip>
      </div>

      <Disclaimer />
    </div>
  );
}
