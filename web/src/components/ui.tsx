import type { ReactNode } from "react";
import { fmtPct } from "@/lib/format";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-card border border-line bg-card p-4 shadow-card " + className
      }
    >
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  desc,
  badge,
}: {
  title: string;
  desc?: string;
  badge?: ReactNode;
}) {
  return (
    <header className="mb-6">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-ink">{title}</h1>
        {badge}
      </div>
      {desc && <p className="mt-1 text-[15px] text-muted">{desc}</p>}
    </header>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-3 text-[17px] font-semibold text-ink">{children}</h2>;
}

export function Chip({
  children,
  active = false,
  tone = "default",
}: {
  children: ReactNode;
  active?: boolean;
  tone?: "default" | "warn" | "danger" | "accent" | "gold";
}) {
  const base = "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium";
  const styles = active
    ? "border-transparent bg-accent-soft text-accent-ink"
    : tone === "warn"
      ? "border-transparent bg-warn-soft text-warn"
      : tone === "danger"
        ? "border-transparent bg-down-soft text-down"
        : tone === "accent"
          ? "border-transparent bg-accent-soft text-accent-ink"
          : tone === "gold"
            ? "border-transparent bg-gold-soft text-gold-ink"
            : "border-line text-muted";
  return <span className={`${base} ${styles}`}>{children}</span>;
}

export function Stat({ label, value, sub }: { label: string; value: ReactNode; sub?: ReactNode }) {
  return (
    <div className="rounded-xl bg-sunken p-3.5">
      <div className="text-xs font-medium text-muted">{label}</div>
      <div className="mt-1 text-2xl font-bold tabular-nums text-ink">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-faint">{sub}</div>}
    </div>
  );
}

// 진행바 = 무채색 (달성률로 오해 방지). accent=true일 때만 강조.
export function Bar({ value, accent = false }: { value: number; accent?: boolean }) {
  return (
    <div className="h-2 flex-1 overflow-hidden rounded-full bg-sunken">
      <div
        className={"h-full rounded-full " + (accent ? "bg-accent" : "bg-track")}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

export function PriceChange({ pct }: { pct: number }) {
  return (
    <span className={"font-medium tabular-nums " + (pct >= 0 ? "text-up" : "text-down")}>
      {fmtPct(pct)}
    </span>
  );
}

export function Disclaimer() {
  return (
    <p className="mt-8 text-center text-xs text-faint">
      mock 데이터 기반 시제품 · 투자 자문이 아닌 정보 제공 목적이며 투자 책임은 본인에게 있습니다 · 손실 가능
    </p>
  );
}
