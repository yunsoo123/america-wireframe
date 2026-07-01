// 전체 화면용 mock 데이터. 실제 API 연동 전 UI 검증용.
// 실데이터로 교체 시 이 파일을 어댑터로 대체한다.

export interface Stock {
  ticker: string;
  name: string;
  price: number;
  changePct: number;
  sector: string;
}

export const STOCKS: Stock[] = [
  { ticker: "NVDA", name: "NVIDIA", price: 124.3, changePct: 3.2, sector: "반도체" },
  { ticker: "AAPL", name: "Apple", price: 198.5, changePct: 1.1, sector: "빅테크" },
  { ticker: "TSLA", name: "Tesla", price: 176.2, changePct: -6.1, sector: "자동차" },
  { ticker: "AVGO", name: "Broadcom", price: 168.9, changePct: 2.4, sector: "반도체" },
  { ticker: "MSFT", name: "Microsoft", price: 421.3, changePct: 0.6, sector: "빅테크" },
  { ticker: "LLY", name: "Eli Lilly", price: 812.4, changePct: -0.8, sector: "헬스케어" },
];

export function findStock(ticker: string): Stock | undefined {
  return STOCKS.find((s) => s.ticker.toLowerCase() === ticker.toLowerCase());
}

export interface BriefItem {
  tag: string;
  title: string;
  body: string;
}

export const BRIEFING: BriefItem[] = [
  {
    tag: "야간 시장",
    title: "나스닥 선물 +0.4%, 반도체 강세",
    body: "야간 선물은 소폭 상승. 엔비디아 실적 기대가 반도체 섹터를 끌어올렸습니다.",
  },
  {
    tag: "내 종목",
    title: "TSLA 애프터마켓 -6% 급락",
    body: "인도량 가이던스 하향 소식. 원인 뉴스 요약은 뉴스 탭에서 확인하세요.",
  },
  {
    tag: "오늘 일정",
    title: "FOMC 회의 결과 발표 (02:00)",
    body: "금리 동결 전망이 우세. 성장주·금리 민감 섹터 영향 체크리스트 준비됨.",
  },
];

export interface MacroIndicator {
  label: string;
  value: string;
  dir: "up" | "down" | "flat";
  note: string;
}

export const MACRO: MacroIndicator[] = [
  { label: "10년물 금리", value: "4.28%", dir: "down", note: "전일 -0.05%p" },
  { label: "근원 CPI", value: "3.2%", dir: "down", note: "예상 부합" },
  { label: "실업률", value: "4.1%", dir: "flat", note: "견조한 고용" },
  { label: "달러 인덱스", value: "104.2", dir: "up", note: "강달러 지속" },
];

export interface Sector {
  name: string;
  strength: number; // 0~100 상대강도
  trend: "리스크온" | "중립" | "리스크오프";
}

export const SECTORS: Sector[] = [
  { name: "반도체", strength: 92, trend: "리스크온" },
  { name: "헬스케어", strength: 74, trend: "리스크온" },
  { name: "산업재", strength: 61, trend: "중립" },
  { name: "에너지", strength: 45, trend: "중립" },
  { name: "유틸리티", strength: 33, trend: "리스크오프" },
];

export interface WatchItem extends Stock {
  tag: "장기" | "단기" | "관망";
}

export const WATCHLIST: WatchItem[] = [
  { ...STOCKS[0], tag: "장기" },
  { ...STOCKS[1], tag: "장기" },
  { ...STOCKS[2], tag: "단기" },
  { ...STOCKS[5], tag: "관망" },
];

export interface Position {
  ticker: string;
  name: string;
  weight: number; // 비중 %
  pnlPct: number;
  action: "유지 관찰" | "비중확대 검토" | "비중축소 검토" | "관망";
}

export const PORTFOLIO = {
  healthScore: 72,
  totalReturnPct: 8.4,
  summary: [
    "총 6종목 · 반도체 비중 41%로 섹터 편향 주의",
    "변동성은 벤치마크 대비 1.2배 (다소 높음)",
    "TSLA 리스크 기여도 상위 → 비중 축소 검토",
  ],
  positions: [
    { ticker: "AAPL", name: "Apple", weight: 28, pnlPct: 12.4, action: "유지 관찰" },
    { ticker: "NVDA", name: "NVIDIA", weight: 24, pnlPct: 34.1, action: "비중확대 검토" },
    { ticker: "TSLA", name: "Tesla", weight: 17, pnlPct: -18.2, action: "비중축소 검토" },
    { ticker: "MSFT", name: "Microsoft", weight: 19, pnlPct: 6.7, action: "유지 관찰" },
    { ticker: "LLY", name: "Eli Lilly", weight: 12, pnlPct: 2.1, action: "관망" },
  ] as Position[],
};

export interface NewsEvent {
  ticker: string;
  changePct: number;
  session: "프리마켓" | "장중" | "애프터마켓";
  cause: "실적" | "가이던스" | "거시" | "규제" | "산업" | "루머";
  summary: string;
  sources: number;
}

export const NEWS: NewsEvent[] = [
  {
    ticker: "TSLA",
    changePct: -6.1,
    session: "장중",
    cause: "가이던스",
    summary: "인도량 가이던스 하향 발표. 수요 둔화 우려가 매도세를 자극했습니다.",
    sources: 5,
  },
  {
    ticker: "NVDA",
    changePct: 3.2,
    session: "프리마켓",
    cause: "산업",
    summary: "주요 고객사 AI 투자 확대 소식. 거래량이 평소의 2배로 급증했습니다.",
    sources: 4,
  },
  {
    ticker: "LLY",
    changePct: -0.8,
    session: "장중",
    cause: "규제",
    summary: "비만치료제 관련 규제 검토 보도. 제한적 영향으로 해석됩니다.",
    sources: 3,
  },
];

export interface CalEvent {
  date: string;
  time: string;
  name: string;
  kind: "거시" | "실적";
  impact: "높음" | "중간" | "낮음";
  why: string[];
  terms?: string[];
}

export const CALENDAR: CalEvent[] = [
  {
    date: "6/28",
    time: "02:00",
    name: "FOMC 금리 결정",
    kind: "거시",
    impact: "높음",
    why: [
      "연준이 기준금리를 정하는 회의입니다.",
      "금리는 성장주·기술주 밸류에이션에 직접 영향을 줍니다.",
      "이번엔 점도표(향후 금리 전망)를 주목하세요.",
    ],
    terms: ["FOMC", "점도표"],
  },
  {
    date: "6/29",
    time: "21:30",
    name: "근원 PCE 물가",
    kind: "거시",
    impact: "높음",
    why: [
      "연준이 가장 중시하는 인플레이션 지표입니다.",
      "예상보다 높으면 금리 인하 기대가 후퇴합니다.",
      "코어(변동성 제외) 수치를 확인하세요.",
    ],
    terms: ["CPI", "코어 CPI"],
  },
  {
    date: "7/2",
    time: "장마감 후",
    name: "NVDA 실적 발표",
    kind: "실적",
    impact: "중간",
    why: [
      "보유·관심 종목의 분기 실적일입니다.",
      "데이터센터 매출 가이던스가 관전 포인트.",
      "컨센서스 대비 서프라이즈 여부를 보세요.",
    ],
    terms: ["EPS", "시가총액"],
  },
];

export function findNews(ticker: string): NewsEvent | undefined {
  return NEWS.find((n) => n.ticker.toLowerCase() === ticker.toLowerCase());
}

export function findSector(name: string): Sector | undefined {
  return SECTORS.find((s) => s.name === name);
}

export function stocksBySector(sector: string): Stock[] {
  return STOCKS.filter((s) => s.sector === sector);
}

export type GlossaryCategory = "밸류에이션" | "지표" | "리스크" | "거래" | "거시" | "용어";

export interface Term {
  term: string;
  en?: string;
  def: string;
  example?: string;
  category: GlossaryCategory;
}

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  "밸류에이션",
  "지표",
  "리스크",
  "거래",
  "거시",
  "용어",
];

export const GLOSSARY: Term[] = [
  { term: "PER", en: "주가수익비율", def: "주가를 주당순이익(EPS)으로 나눈 값. 낮을수록 이익 대비 저평가로 봅니다.", example: "PER 10 = 이익의 10배 가격", category: "밸류에이션" },
  { term: "PEG", def: "PER을 이익 성장률로 나눈 값. 1보다 낮으면 성장 대비 저평가로 해석합니다.", example: "PEG 0.7 → 성장 대비 싸다", category: "밸류에이션" },
  { term: "EV/Sales", def: "기업가치를 매출로 나눈 값. 아직 적자인 고성장주를 평가할 때 씁니다.", category: "밸류에이션" },
  { term: "밸류에이션", en: "Valuation", def: "기업이 지금 싼지 비싼지 값을 매기는 것. PER·PEG 등이 도구입니다.", category: "밸류에이션" },
  { term: "EPS", en: "주당순이익", def: "순이익을 주식 수로 나눈 값. 주주 한 주가 벌어들인 이익입니다.", category: "지표" },
  { term: "시가총액", en: "Market Cap", def: "주가 × 전체 주식 수. 회사의 시장 크기를 뜻합니다.", example: "$14B = 약 190조원 규모", category: "지표" },
  { term: "배당수익률", def: "1년 배당금을 주가로 나눈 값. 주식이 주는 이자 성격의 수익입니다.", category: "지표" },
  { term: "변동성", en: "Volatility", def: "가격이 흔들리는 정도. 높을수록 위험도, 기회도 커집니다.", category: "리스크" },
  { term: "공매도", en: "Short", def: "주식을 빌려 먼저 팔고 나중에 싸게 되사 갚는 하락 베팅입니다.", category: "리스크" },
  { term: "주식 희석", def: "회사가 새 주식을 발행해 기존 주주 지분 가치가 줄어드는 것.", category: "리스크" },
  { term: "갭", en: "Gap", def: "전날 종가와 당일 시가 사이에 크게 벌어진 가격 차이입니다.", category: "거래" },
  { term: "프리마켓·애프터마켓", def: "정규장 시작 전(프리)·마감 후(애프터) 열리는 시간외 거래입니다.", category: "거래" },
  { term: "FOMC", def: "미국 연준(Fed)이 기준금리를 정하는 회의. 시장에 큰 영향을 줍니다.", category: "거시" },
  { term: "CPI", en: "소비자물가지수", def: "물가가 얼마나 올랐는지 보여주는 대표 인플레이션 지표입니다.", category: "거시" },
  { term: "코어 CPI", def: "변동이 큰 식품·에너지를 뺀 근원 물가. 추세를 더 잘 보여줍니다.", category: "거시" },
  { term: "점도표", en: "Dot Plot", def: "FOMC 위원들의 향후 금리 전망을 점으로 찍은 그래프입니다.", category: "거시" },
  { term: "텐배거", en: "Ten-bagger", def: "주가가 10배(10루타) 오른 종목. 저평가 고성장에서 나올 확률이 큽니다.", category: "용어" },
  { term: "ETF", def: "여러 종목을 한 바구니에 담아 거래소에 상장한 펀드입니다.", category: "용어" },
  { term: "리밸런싱", def: "포트폴리오의 종목·섹터 비중을 목표에 맞게 다시 조정하는 것.", category: "용어" },
];
