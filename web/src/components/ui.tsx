import type { ReactNode } from "react";

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
        "rounded-xl border border-black/10 bg-white p-4 dark:border-white/15 dark:bg-neutral-900 " +
        className
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
        <h1 className="text-xl font-medium">{title}</h1>
        {badge}
      </div>
      {desc && (
        <p className="mt-1 text-sm text-black/55 dark:text-white/55">{desc}</p>
      )}
    </header>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-3 text-base font-medium">{children}</h2>;
}

export function Chip({
  children,
  active = false,
  tone = "default",
}: {
  children: ReactNode;
  active?: boolean;
  tone?: "default" | "warn" | "danger" | "accent";
}) {
  const base = "inline-flex rounded-full border px-3 py-1 text-xs";
  const styles = active
    ? "border-blue-500/50 bg-blue-600/10 text-blue-700 dark:text-blue-300"
    : tone === "warn"
      ? "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300"
      : tone === "danger"
        ? "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300"
        : tone === "accent"
          ? "border-blue-500/40 bg-blue-600/10 text-blue-700 dark:text-blue-300"
          : "border-black/15 text-black/60 dark:border-white/20 dark:text-white/60";
  return <span className={`${base} ${styles}`}>{children}</span>;
}

export function Stat({ label, value, sub }: { label: string; value: ReactNode; sub?: ReactNode }) {
  return (
    <div className="rounded-lg bg-black/[0.03] p-3 dark:bg-white/5">
      <div className="text-xs text-black/50 dark:text-white/50">{label}</div>
      <div className="mt-0.5 text-xl font-medium tabular-nums">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-black/45 dark:text-white/45">{sub}</div>}
    </div>
  );
}

export function Bar({ value }: { value: number }) {
  return (
    <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/8 dark:bg-white/10">
      <div
        className="h-full rounded-full bg-blue-600 dark:bg-blue-400"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

export function PriceChange({ pct }: { pct: number }) {
  return (
    <span
      className={
        "tabular-nums " +
        (pct >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400")
      }
    >
      {pct >= 0 ? "+" : ""}
      {pct.toFixed(1)}%
    </span>
  );
}

export function Disclaimer() {
  return (
    <p className="mt-8 text-center text-xs text-black/55 dark:text-white/55">
      mock 데이터 기반 시제품 · 투자 자문이 아닌 정보 제공 목적이며 투자 책임은 본인에게 있습니다 · 손실 가능
    </p>
  );
}
