// 숫자 표기 일관성 유틸 (천단위 콤마·부호·단위 강제)

export function fmtPrice(n: number): string {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function fmtPct(n: number): string {
  return `${n >= 0 ? "+" : ""}${n.toFixed(1)}%`;
}

export function fmtCap(billions: number): string {
  return billions >= 1
    ? `$${billions.toFixed(1)}B`
    : `$${Math.round(billions * 1000)}M`;
}
