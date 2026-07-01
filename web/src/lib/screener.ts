import { unstable_cache } from "next/cache";
import yf from "./yahoo";
import { UNIVERSE } from "./universe";
import { CANDIDATES, tenbaggerScore, type Candidate } from "./tenbagger";

interface Raw {
  ticker: string;
  theme: Candidate["themes"][number];
  name: string;
  price: number;
  changePct: number;
  mcapB: number;
  rvGrowth: number | null;
  peg: number | null;
  margin: number | null;
  d2e: number | null;
  instHeld: number | null;
  analysts: number | null;
  beta: number | null;
}

async function fetchOne(u: { ticker: string; theme: Candidate["themes"][number] }): Promise<Raw | null> {
  try {
    const q = await yf.quoteSummary(u.ticker, {
      modules: ["price", "summaryDetail", "defaultKeyStatistics", "financialData"],
    });
    const p = q.price, sd = q.summaryDetail, ks = q.defaultKeyStatistics, fd = q.financialData;
    const mcap = (p?.marketCap ?? sd?.marketCap) as number | undefined;
    if (!p?.regularMarketPrice || !mcap) return null;
    const rawD2e = fd?.debtToEquity ?? null;
    const d2e = rawD2e == null ? null : rawD2e > 10 ? rawD2e / 100 : rawD2e;
    return {
      ticker: u.ticker,
      theme: u.theme,
      name: (p.shortName ?? p.longName ?? u.ticker) as string,
      price: p.regularMarketPrice,
      changePct: (p.regularMarketChangePercent ?? 0) * 100,
      mcapB: mcap / 1e9,
      rvGrowth: fd?.revenueGrowth ?? null,
      peg: (ks?.pegRatio as number | undefined) ?? null,
      margin: fd?.profitMargins ?? null,
      d2e,
      instHeld: (ks?.heldPercentInstitutions as number | undefined) ?? null,
      analysts: fd?.numberOfAnalystOpinions ?? null,
      beta: (sd?.beta as number | undefined) ?? (ks?.beta as number | undefined) ?? null,
    };
  } catch {
    return null;
  }
}

// 요청 제한 완화를 위해 chunk 단위로 순차 fetch
async function fetchAll(): Promise<Raw[]> {
  const out: Raw[] = [];
  const size = 6;
  for (let i = 0; i < UNIVERSE.length; i += size) {
    const chunk = UNIVERSE.slice(i, i + size);
    const settled = await Promise.allSettled(chunk.map(fetchOne));
    for (const s of settled) if (s.status === "fulfilled" && s.value) out.push(s.value);
  }
  return out;
}

function rank(arr: number[], v: number | null, invert = false): number {
  if (v == null || !arr.length) return 50;
  const below = arr.filter((x) => x <= v).length;
  let p = Math.round((below / arr.length) * 100);
  if (invert) p = 100 - p;
  return Math.max(1, Math.min(100, p));
}

const avg = (a: number, b: number) => Math.round((a + b) / 2);

function toCandidate(r: Raw, pool: Raw[]): Candidate {
  const col = (k: keyof Raw) => pool.map((x) => x[k]).filter((x): x is number => typeof x === "number" && isFinite(x));
  const growth = rank(col("rvGrowth"), r.rvGrowth);
  const value = r.peg != null ? rank(col("peg"), r.peg, true) : 50;
  const size = rank(col("mcapB"), r.mcapB, true);
  const quality = avg(
    r.margin != null ? rank(col("margin"), r.margin) : 50,
    r.d2e != null ? rank(col("d2e"), r.d2e, true) : 50
  );
  const obscurity = avg(
    r.instHeld != null ? rank(col("instHeld"), r.instHeld, true) : 50,
    r.analysts != null ? rank(col("analysts"), r.analysts, true) : 50
  );
  const catalyst = Math.max(1, Math.min(100, Math.round(50 + r.changePct * 2)));

  const reasons: string[] = [];
  if (r.rvGrowth != null)
    reasons.push(`매출 YoY ${Math.round(r.rvGrowth * 100)}%${r.margin != null && r.margin < 0 ? " · 아직 적자" : " · 흑자 구간"}`);
  if (r.peg != null) reasons.push(`PEG ${r.peg.toFixed(1)}${r.peg < 1 ? " · 저평가 구간" : ""}`);
  if (r.instHeld != null) reasons.push(`기관 보유 ${Math.round(r.instHeld * 100)}%${r.instHeld < 0.4 ? " (낮음)" : ""}`);
  if (reasons.length < 2) reasons.push(`${r.theme} 테마 노출`);

  const risks: string[] = [];
  if (r.beta != null && r.beta > 1.3) risks.push("변동성 높음");
  if (r.margin != null && r.margin < 0) risks.push("적자 지속");
  if (r.d2e != null && r.d2e > 2) risks.push("부채 부담");
  if (risks.length === 0) risks.push("변동성 유의");
  risks.push("희석 위험");

  const multiple = Math.max(2, Math.min(10, Math.round(2 + (r.rvGrowth ?? 0.2) * 12)));
  const targetCapB = Math.round(r.mcapB * multiple * 10) / 10;

  return {
    ticker: r.ticker,
    name: r.name,
    price: r.price,
    changePct: Math.round(r.changePct * 10) / 10,
    marketCapB: Math.round(r.mcapB * 10) / 10,
    themes: [r.theme],
    pegUnder1: r.peg != null && r.peg > 0 && r.peg < 1,
    factors: { growth, value, size, quality, obscurity, catalyst },
    reasons,
    bull: {
      targetCapB,
      multiple,
      assumption: `현재 매출 성장(${Math.round((r.rvGrowth ?? 0) * 100)}%) 지속 + ${r.theme} 확장 가정`,
    },
    risks,
  };
}

async function build(): Promise<Candidate[]> {
  const raws = await fetchAll();
  if (raws.length < 6) throw new Error("insufficient real data");
  let pool = raws.filter((r) => r.mcapB > 0.15 && r.mcapB < 20 && r.rvGrowth != null);
  if (pool.length < 6) pool = raws;
  const cands = pool.map((r) => toCandidate(r, pool));
  cands.sort((a, b) => tenbaggerScore(b) - tenbaggerScore(a));
  return cands.slice(0, 8);
}

// 15분 캐싱 + 실패 시 mock 폴백
export const getCandidates = unstable_cache(
  async (): Promise<{ candidates: Candidate[]; live: boolean }> => {
    try {
      const candidates = await build();
      return { candidates, live: true };
    } catch {
      return { candidates: CANDIDATES, live: false };
    }
  },
  ["tenbagger-candidates"],
  { revalidate: 900 }
);
