import Link from "next/link";
import { Smartphone } from "lucide-react";
import { WATCHLIST } from "@/lib/mock";
import { Card, PageHeader, Chip, PriceChange, Disclaimer } from "@/components/ui";

export default function WatchlistPage() {
  return (
    <div>
      <PageHeader title="워치리스트" desc="그룹·태그로 관심종목을 관리합니다." />

      <div className="mb-4 flex flex-wrap gap-1.5">
        <Chip active>전체</Chip>
        <Chip>장기</Chip>
        <Chip>단기</Chip>
        <Chip>관망</Chip>
      </div>

      <Card className="!p-0">
        <ul>
          {WATCHLIST.map((w, i) => (
            <li
              key={w.ticker}
              className={
                "flex items-center justify-between px-4 py-3 " +
                (i > 0 ? "border-t border-black/[0.06] dark:border-white/10" : "")
              }
            >
              <div className="flex items-center gap-3">
                <Link href={`/stock/${w.ticker}`} className="font-medium hover:underline">
                  {w.ticker}
                </Link>
                <span className="text-xs text-black/50 dark:text-white/50">{w.name}</span>
                <Chip>{w.tag}</Chip>
              </div>
              <div className="text-sm">
                <span className="mr-3 tabular-nums text-black/50 dark:text-white/50">
                  ${w.price.toFixed(2)}
                </span>
                <PriceChange pct={w.changePct} />
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-black/45 dark:text-white/45">
        <Smartphone size={13} /> 웹·모바일 동기화됨
      </div>

      <Disclaimer />
    </div>
  );
}
