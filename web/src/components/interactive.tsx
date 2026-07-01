"use client";

import { useEffect, useState } from "react";
import { Star, Bell, ThumbsUp, Check } from "lucide-react";

const outline = "border border-line-strong text-ink hover:bg-hover";
const active = "border border-transparent bg-accent-soft text-accent-ink";

export function SaveButton({
  variant = "outline",
  className = "",
}: {
  variant?: "outline" | "primary";
  className?: string;
}) {
  const [saved, setSaved] = useState(false);
  const base =
    "flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ";
  const idle =
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent-hover"
      : outline;
  return (
    <button
      type="button"
      onClick={() => setSaved((s) => !s)}
      aria-pressed={saved}
      aria-label={saved ? "관심종목에서 제거" : "관심종목에 추가"}
      className={base + (saved ? active : idle) + " " + className}
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
        "flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors " +
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
        "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors " +
        (on ? "border-transparent bg-accent-soft text-accent-ink" : "border-line text-muted hover:bg-hover")
      }
    >
      <ThumbsUp size={13} />
      {on ? "도움됨 표시함" : "도움됨"}
    </button>
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
        "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors " +
        (on ? "border-transparent bg-down-soft text-down" : "border-line text-muted hover:bg-hover")
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
        "text-sm font-medium transition-colors " +
        (done ? "text-up" : danger ? "text-down hover:underline" : "text-accent hover:underline") +
        " " +
        className
      }
    >
      {done ? confirmedLabel : label}
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
        "mb-4 rounded-xl border-l-4 px-4 py-2.5 text-sm " +
        (aggressive
          ? "border-gold bg-gold-soft text-gold-ink"
          : "border-warn bg-warn-soft text-warn")
      }
    >
      {aggressive
        ? "⚡ 공격적 성향으로 설정됨 · 텐배거 스카우터가 우선 노출됩니다."
        : `${risk} 성향으로 설정됨 · 텐배거 스카우터는 고위험 기능이니 신중히 참고하세요.`}
    </div>
  );
}
