// 텐배거 스카우터 — mock 데이터 + 점수 로직
// 실제 API 연동 전, UI와 점수 계산을 검증하기 위한 mock 레이어.
// 점수 가중치는 설계 문서(텐배거-스카우터-설계.md)의 6축 기준을 따른다.

export type FactorKey =
  | "growth"
  | "value"
  | "size"
  | "quality"
  | "obscurity"
  | "catalyst";

export const FACTORS: { key: FactorKey; label: string; weight: number }[] = [
  { key: "growth", label: "성장성", weight: 0.3 },
  { key: "value", label: "저평가", weight: 0.25 },
  { key: "size", label: "성장 여력", weight: 0.15 },
  { key: "quality", label: "생존력/퀄리티", weight: 0.15 },
  { key: "obscurity", label: "언더더레이더", weight: 0.1 },
  { key: "catalyst", label: "촉매/모멘텀", weight: 0.05 },
];

export type Theme = "AI" | "바이오" | "에너지전환" | "우주/방산" | "양자";

export interface Candidate {
  ticker: string;
  name: string;
  price: number;
  changePct: number;
  marketCapB: number; // 시가총액 (단위: 10억 달러)
  themes: Theme[];
  pegUnder1: boolean;
  factors: Record<FactorKey, number>; // 각 0~100 (유니버스 백분위 가정)
  reasons: string[]; // 후보 근거
  bull: { targetCapB: number; multiple: number; assumption: string };
  risks: string[];
}

// 텐배거점수 = 100 기준, 6축 가중합 (각 팩터는 이미 0~100 정규화 가정)
export function tenbaggerScore(c: Candidate): number {
  const sum = FACTORS.reduce((acc, f) => acc + f.weight * c.factors[f.key], 0);
  return Math.round(sum);
}

export const ALL_THEMES: Theme[] = [
  "AI",
  "바이오",
  "에너지전환",
  "우주/방산",
  "양자",
];

export const CANDIDATES: Candidate[] = [
  {
    ticker: "SOUN",
    name: "SoundHound AI",
    price: 4.2,
    changePct: 2.1,
    marketCapB: 1.4,
    themes: ["AI"],
    pegUnder1: true,
    factors: { growth: 95, value: 82, size: 88, quality: 70, obscurity: 78, catalyst: 80 },
    reasons: [
      "매출 YoY +89% · 흑자전환 임박",
      "PEG 0.7 · 동종 AI 음성 대비 저평가",
      "기관 보유 12% (낮음) · 커버리지 적음",
    ],
    bull: { targetCapB: 14, multiple: 10, assumption: "매출 3년간 +60% 지속 + AI 음성 TAM 확장 가정" },
    risks: ["변동성 매우 높음", "주식 희석 위험", "적자 지속 가능성"],
  },
  {
    ticker: "RKLB",
    name: "Rocket Lab",
    price: 11.8,
    changePct: -1.4,
    marketCapB: 5.6,
    themes: ["우주/방산"],
    pegUnder1: false,
    factors: { growth: 84, value: 60, size: 55, quality: 78, obscurity: 50, catalyst: 88 },
    reasons: [
      "발사 빈도 증가 · Neutron 로켓 촉매",
      "매출 YoY +55% · 수주잔고 견조",
      "방산 수요 구조적 성장",
    ],
    bull: { targetCapB: 56, multiple: 10, assumption: "Neutron 상업화 성공 + 발사 단가 하락 가정" },
    risks: ["발사 실패 리스크", "현금 소진 속도", "고변동성"],
  },
  {
    ticker: "IONQ",
    name: "IonQ",
    price: 9.3,
    changePct: 3.6,
    marketCapB: 2.1,
    themes: ["양자", "AI"],
    pegUnder1: false,
    factors: { growth: 80, value: 48, size: 80, quality: 60, obscurity: 65, catalyst: 75 },
    reasons: [
      "양자컴퓨팅 선도 · 정부·기업 계약 확대",
      "매출 YoY +70% (소규모 기저)",
      "클라우드 파트너십 촉매",
    ],
    bull: { targetCapB: 21, multiple: 10, assumption: "양자 상용화 로드맵 달성 + 계약 매출 확대 가정" },
    risks: ["상용화 불확실성", "밸류에이션 부담", "주식 희석"],
  },
  {
    ticker: "CRSP",
    name: "CRISPR Therapeutics",
    price: 42.5,
    changePct: 0.8,
    marketCapB: 3.5,
    themes: ["바이오"],
    pegUnder1: true,
    factors: { growth: 72, value: 75, size: 62, quality: 68, obscurity: 45, catalyst: 70 },
    reasons: [
      "승인 유전자치료 파이프라인 보유",
      "현금 보유 충분 (런웨이 양호)",
      "후속 적응증 확장 촉매",
    ],
    bull: { targetCapB: 35, multiple: 10, assumption: "신규 적응증 승인 + 매출 본격화 가정" },
    risks: ["임상 실패 리스크", "규제 불확실성", "수익화 지연"],
  },
  {
    ticker: "ASPN",
    name: "Aspen Aerogels",
    price: 18.6,
    changePct: 1.2,
    marketCapB: 1.5,
    themes: ["에너지전환"],
    pegUnder1: true,
    factors: { growth: 78, value: 80, size: 86, quality: 64, obscurity: 72, catalyst: 60 },
    reasons: [
      "EV 배터리 단열재 수요 급증",
      "매출 YoY +40% · 마진 개선 추세",
      "PEG < 1 · 저평가 구간",
    ],
    bull: { targetCapB: 15, multiple: 10, assumption: "EV 침투율 상승 + 신규 공장 가동 가정" },
    risks: ["EV 수요 둔화 리스크", "고객 집중도", "변동성 높음"],
  },
];
