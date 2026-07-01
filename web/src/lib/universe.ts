import type { Theme } from "./tenbagger";

// 텐배거 스크리너가 실제 재무를 가져올 후보 유니버스 (엄선한 소형·중형 성장주).
// 전체 미국주식은 요청 제한상 불가 → 테마별 대표 후보로 압축.
export const UNIVERSE: { ticker: string; theme: Theme }[] = [
  { ticker: "SOUN", theme: "AI" },
  { ticker: "BBAI", theme: "AI" },
  { ticker: "AI", theme: "AI" },
  { ticker: "PATH", theme: "AI" },
  { ticker: "IONQ", theme: "양자" },
  { ticker: "RGTI", theme: "양자" },
  { ticker: "QBTS", theme: "양자" },
  { ticker: "RKLB", theme: "우주/방산" },
  { ticker: "ASTS", theme: "우주/방산" },
  { ticker: "RDW", theme: "우주/방산" },
  { ticker: "KTOS", theme: "우주/방산" },
  { ticker: "CRSP", theme: "바이오" },
  { ticker: "NTLA", theme: "바이오" },
  { ticker: "BEAM", theme: "바이오" },
  { ticker: "RXRX", theme: "바이오" },
  { ticker: "RCKT", theme: "바이오" },
  { ticker: "ASPN", theme: "에너지전환" },
  { ticker: "ENVX", theme: "에너지전환" },
  { ticker: "STEM", theme: "에너지전환" },
  { ticker: "FLNC", theme: "에너지전환" },
  { ticker: "SHLS", theme: "에너지전환" },
  { ticker: "NOVA", theme: "에너지전환" },
  { ticker: "AMPX", theme: "에너지전환" },
];
