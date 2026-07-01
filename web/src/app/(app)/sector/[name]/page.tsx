import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { findSector, stocksBySector, MACRO } from "@/lib/mock";
import { Card, Chip, Bar, PriceChange, SectionTitle, Disclaimer } from "@/components/ui";

export default async function SectorPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const decoded = decodeURIComponent(name);
  const sector = findSector(decoded);
  if (!sector) notFound();

  const stocks = stocksBySector(sector.name);

  return (
    <div>
      <Link href="/screening" className="mb-4 flex items-center gap-1 text-sm text-black/55 hover:underline dark:text-white/55">
        <ArrowLeft size={16} /> 스크리닝
      </Link>

      <header className="mb-5">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">{sector.name}</h1>
          <Chip tone={sector.trend === "리스크온" ? "accent" : sector.trend === "리스크오프" ? "danger" : "warn"}>
            {sector.trend}
          </Chip>
        </div>
        <p className="mt-1 text-sm text-muted">섹터 상대강도와 관련 종목</p>
      </header>

      <Card className="mb-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted">상대강도</span>
          <span className="font-medium tabular-nums">{sector.strength}/100</span>
        </div>
        <Bar value={sector.strength} />
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted sm:grid-cols-4">
          {MACRO.map((m) => (
            <div key={m.label} className="rounded-lg bg-black/[0.03] px-2 py-1.5 dark:bg-white/5">
              {m.label} <span className="font-medium text-ink">{m.value}</span>
            </div>
          ))}
        </div>
      </Card>

      <SectionTitle>섹터 내 종목</SectionTitle>
      {stocks.length > 0 ? (
        <Card className="!p-0">
          <ul>
            {stocks.map((s, i) => (
              <li
                key={s.ticker}
                className={"flex items-center justify-between px-4 py-3 " + (i > 0 ? "border-t border-line" : "")}
              >
                <Link href={`/stock/${s.ticker}`} className="font-medium hover:underline">
                  {s.ticker}
                  <span className="ml-2 text-xs font-normal text-faint">{s.name}</span>
                </Link>
                <div className="text-sm">
                  <span className="mr-3 tabular-nums text-faint">${s.price.toFixed(2)}</span>
                  <PriceChange pct={s.changePct} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      ) : (
        <Card>
          <p className="text-sm text-faint">이 섹터의 종목 데이터는 준비 중입니다.</p>
        </Card>
      )}

      <Disclaimer />
    </div>
  );
}
