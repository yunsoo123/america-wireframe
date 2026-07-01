import { CALENDAR } from "@/lib/mock";
import { Card, PageHeader, Chip, Disclaimer } from "@/components/ui";
import { AlertButton } from "@/components/interactive";
import { TermTip } from "@/components/TermTip";

function impactTone(i: string): "default" | "warn" | "danger" | "accent" {
  if (i === "높음") return "danger";
  if (i === "중간") return "warn";
  return "default";
}

export default function CalendarPage() {
  return (
    <div>
      <PageHeader
        title="경제 캘린더"
        desc="주요 일정에 '왜 중요한지' 쉬운 설명과 내 종목 영향을 함께 제공합니다."
      />

      <div className="flex flex-col gap-3">
        {CALENDAR.map((e) => (
          <Card key={e.name}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-black/[0.04] px-2.5 py-1 text-center dark:bg-white/5">
                  <div className="text-sm font-medium tabular-nums">{e.date}</div>
                  <div className="text-[10px] text-faint">{e.time}</div>
                </div>
                <div>
                  <div className="font-medium">{e.name}</div>
                  <div className="text-xs text-faint">{e.kind}</div>
                </div>
              </div>
              <Chip tone={impactTone(e.impact)}>영향 {e.impact}</Chip>
            </div>

            <div className="rounded-lg bg-black/[0.03] p-3 dark:bg-white/5">
              <div className="mb-1.5 text-xs font-medium text-muted">
                초보자 설명
              </div>
              <ol className="flex flex-col gap-1">
                {e.why.map((w, i) => (
                  <li key={w} className="flex gap-2 text-sm text-ink">
                    <span className="text-faint">{i + 1}</span>
                    {w}
                  </li>
                ))}
              </ol>
            </div>

            {e.terms && e.terms.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                <span className="text-faint">용어</span>
                {e.terms.map((t) => (
                  <TermTip key={t} term={t} />
                ))}
              </div>
            )}

            <AlertButton label="전날·당일 알림 설정" className="mt-3" />
          </Card>
        ))}
      </div>

      <Disclaimer />
    </div>
  );
}
