"use client";

import { useEffect, useState } from "react";
import { Star, Bell, ThumbsUp, Check } from "lucide-react";

const outline =
  "border-black/15 hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/5";
const active =
  "border-blue-500/50 bg-blue-600/10 text-blue-700 dark:text-blue-300";

export function SaveButton({
  variant = "outline",
  className = "",
}: {
  variant?: "outline" | "primary";
  className?: string;
}) {
  const [saved, setSaved] = useState(false);
  const base =
    "flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ";
  const idle =
    variant === "primary"
      ? "bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-white/85"
      : "border " + outline;
  return (
    <button
      type="button"
      onClick={() => setSaved((s) => !s)}
      aria-pressed={saved}
      aria-label={saved ? "관심종목에서 제거" : "관심종목에 추가"}
      className={base + (saved ? "border " + active : idle) + " " + className}
    >
      {saved ? <Check size={15} /> : <Star size={15} />}
      {saved ? "관심등록됨" : "관심등록"}
    </button>
  );
}

export function AlertButton({
  label = "가격 알림",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOn((s) => !s)}
      aria-pressed={on}
      aria-label={on ? "알림 해제" : label}
      className={
        "flex items-center justify-center gap-1.5 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors " +
        (on ? active : outline) +
        " " +
        className
      }
    >
      {on ? <Check size={15} /> : <Bell size={15} />}
      {on ? "알림 설정됨" : label}
    </button>
  );
}

export function HelpfulButton() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOn((s) => !s)}
      aria-pressed={on}
      aria-label="이 콘텐츠가 도움이 되었나요"
      className={
        "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition-colors " +
        (on ? active : "border-black/15 text-black/60 hover:bg-black/5 dark:border-white/20 dark:text-white/60 dark:hover:bg-white/5")
      }
    >
      <ThumbsUp size={13} />
      {on ? "도움됨 표시함" : "도움됨"}
    </button>
  );
}

// 온보딩에서 저장한 성향(localStorage)을 읽어 홈 상단에 맞춤 안내를 노출.
export function RiskNote() {
  const [risk, setRisk] = useState<string | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("profile");
      if (raw) setRisk(JSON.parse(raw).risk ?? null);
    } catch {}
  }, []);

  if (!risk) return null;
  const aggressive = risk === "공격적";
  return (
    <div
      className={
        "mb-4 rounded-lg border px-4 py-2.5 text-sm " +
        (aggressive
          ? "border-blue-500/40 bg-blue-600/[0.06] text-blue-800 dark:text-blue-200"
          : "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-200")
      }
    >
      {aggressive
        ? "⚡ 공격적 성향으로 설정됨 · 텐배거 스카우터가 우선 노출됩니다."
        : `${risk} 성향으로 설정됨 · 텐배거 스카우터는 고위험 기능이니 신중히 참고하세요.`}
    </div>
  );
}

export function ReportButton() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOn(true)}
      aria-label="오류 신고"
      className={
        "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition-colors " +
        (on
          ? "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300"
          : "border-black/15 text-black/60 hover:bg-black/5 dark:border-white/20 dark:text-white/60 dark:hover:bg-white/5")
      }
    >
      {on ? "신고 접수됨" : "🚩 오류 신고"}
    </button>
  );
}

export function ConfirmButton({
  label,
  confirmedLabel,
  danger = false,
  className = "",
}: {
  label: string;
  confirmedLabel: string;
  danger?: boolean;
  className?: string;
}) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setDone(true)}
      className={
        "text-sm transition-colors " +
        (done
          ? "text-emerald-600 dark:text-emerald-400"
          : danger
            ? "text-red-600 hover:underline dark:text-red-400"
            : "hover:underline") +
        " " +
        className
      }
    >
      {done ? confirmedLabel : label}
    </button>
  );
}
