import { Bell } from "lucide-react";
import { CALENDAR } from "@/lib/mock";
import { Card, PageHeader, Chip, Disclaimer } from "@/components/ui";

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
                  <div className="text-[10px] text-black/45 dark:text-white/45">{e.time}</div>
                </div>
                <div>
                  <div className="font-medium">{e.name}</div>
                  <div className="text-xs text-black/45 dark:text-white/45">{e.kind}</div>
                </div>
              </div>
              <Chip tone={impactTone(e.impact)}>영향 {e.impact}</Chip>
            </div>

            <div className="rounded-lg bg-black/[0.03] p-3 dark:bg-white/5">
              <div className="mb-1.5 text-xs font-medium text-black/60 dark:text-white/60">
                초보자 설명
              </div>
              <ol className="flex flex-col gap-1">
                {e.why.map((w, i) => (
                  <li key={w} className="flex gap-2 text-sm text-black/70 dark:text-white/70">
                    <span className="text-black/40 dark:text-white/40">{i + 1}</span>
                    {w}
                  </li>
                ))}
              </ol>
            </div>

            <button className="mt-3 flex items-center gap-1.5 rounded-lg border border-black/15 px-3 py-1.5 text-xs hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/5">
              <Bell size={13} /> 전날·당일 알림 설정
            </button>
          </Card>
        ))}
      </div>

      <Disclaimer />
    </div>
  );
}
