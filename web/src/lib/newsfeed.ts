import { unstable_cache } from "next/cache";
import yf from "./yahoo";

export interface FeedItem {
  id: string;
  ticker: string;
  title: string;
  publisher: string;
  link: string;
  timeMs: number;
  cause: string;
}

const NEWS_TICKERS = ["NVDA", "TSLA", "AAPL", "SOUN", "RKLB", "IONQ", "PLTR"];

function causeOf(title: string): string {
  const t = title.toLowerCase();
  if (/(earnings|revenue|beat|miss|실적|매출)/.test(t)) return "실적";
  if (/(guidance|forecast|outlook|가이던스)/.test(t)) return "가이던스";
  if (/(fda|regulat|lawsuit|probe|규제|소송)/.test(t)) return "규제";
  if (/(fed|rate|inflation|cpi|jobs|금리|물가)/.test(t)) return "거시";
  if (/(upgrade|downgrade|analyst|price target|목표주가)/.test(t)) return "투자의견";
  return "산업";
}

async function fetchTickerNews(ticker: string, count: number): Promise<FeedItem[]> {
  const s = await yf.search(ticker, { newsCount: count, quotesCount: 0, enableFuzzyQuery: false });
  return (s.news ?? [])
    .filter((n) => n?.title && n?.link)
    .map((n) => ({
      id: (n.uuid as string) ?? n.link,
      ticker,
      title: n.title as string,
      publisher: (n.publisher as string) ?? "출처",
      link: n.link as string,
      timeMs: new Date(n.providerPublishTime as unknown as string).getTime(),
      cause: causeOf(n.title as string),
    }));
}

export const getNews = unstable_cache(
  async (): Promise<FeedItem[]> => {
    try {
      const settled = await Promise.allSettled(NEWS_TICKERS.map((t) => fetchTickerNews(t, 4)));
      let items = settled.flatMap((s) => (s.status === "fulfilled" ? s.value : []));
      const seen = new Set<string>();
      items = items.filter((i) => (seen.has(i.title) ? false : (seen.add(i.title), true)));
      items.sort((a, b) => b.timeMs - a.timeMs);
      return items.slice(0, 15);
    } catch {
      return [];
    }
  },
  ["news-feed"],
  { revalidate: 900 }
);

export async function getTickerNews(ticker: string): Promise<FeedItem[]> {
  const fn = unstable_cache(
    async () => {
      try {
        const items = await fetchTickerNews(ticker, 8);
        items.sort((a, b) => b.timeMs - a.timeMs);
        return items;
      } catch {
        return [];
      }
    },
    ["ticker-news", ticker],
    { revalidate: 900 }
  );
  return fn();
}
