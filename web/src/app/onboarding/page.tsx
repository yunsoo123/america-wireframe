"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

const STEPS = [
  { key: "exp", title: "투자 경험이 어느 정도인가요?", options: ["초보", "중급", "고급"], multi: false },
  { key: "risk", title: "리스크 성향을 골라주세요", options: ["보수적", "중립", "공격적"], multi: false },
  {
    key: "themes",
    title: "관심 섹터·테마를 선택하세요",
    options: ["AI/반도체", "빅테크", "헬스케어", "에너지전환", "우주/방산", "금융"],
    multi: true,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const cur = STEPS[step];
  const selected = answers[cur.key] ?? [];
  const isLast = step === STEPS.length - 1;

  function pick(opt: string) {
    setAnswers((prev) => {
      const arr = prev[cur.key] ?? [];
      if (cur.multi) {
        return { ...prev, [cur.key]: arr.includes(opt) ? arr.filter((a) => a !== opt) : [...arr, opt] };
      }
      return { ...prev, [cur.key]: [opt] };
    });
  }

  function next() {
    if (isLast) {
      try {
        localStorage.setItem(
          "profile",
          JSON.stringify({
            exp: (answers.exp ?? [])[0] ?? null,
            risk: (answers.risk ?? [])[0] ?? null,
            themes: answers.themes ?? [],
          })
        );
      } catch {}
      router.push("/");
    } else setStep((s) => s + 1);
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={
                "h-1.5 w-10 rounded-full " +
                (i <= step ? "bg-blue-600" : "bg-black/10 dark:bg-white/15")
              }
            />
          ))}
        </div>
        <button onClick={() => router.push("/")} className="text-xs text-black/45 dark:text-white/45">
          건너뛰기
        </button>
      </div>

      <h1 className="mb-1 text-xl font-medium">{cur.title}</h1>
      <p className="mb-6 text-sm text-black/50 dark:text-white/50">
        {cur.multi ? "복수 선택 가능" : "하나를 선택하세요"} · {step + 1}/{STEPS.length}
      </p>

      <div className="flex flex-col gap-2">
        {cur.options.map((opt) => {
          const on = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => pick(opt)}
              className={
                "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors " +
                (on
                  ? "border-blue-500/60 bg-blue-600/10 font-medium text-blue-700 dark:text-blue-300"
                  : "border-black/12 hover:bg-black/[0.03] dark:border-white/15 dark:hover:bg-white/5")
              }
            >
              {opt}
              {on && <Check size={16} />}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-8">
        <button
          onClick={next}
          disabled={selected.length === 0}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 py-3 text-sm font-medium text-white enabled:hover:bg-neutral-700 disabled:opacity-40 dark:bg-white dark:text-neutral-900 dark:enabled:hover:bg-white/85"
        >
          {isLast ? "시작하기" : "다음"} <ArrowRight size={16} />
        </button>
        {answers["risk"]?.includes("공격적") && (
          <p className="mt-3 text-center text-xs text-blue-700 dark:text-blue-300">
            ⚡ 공격적 성향 → 텐배거 스카우터가 우선 노출됩니다
          </p>
        )}
      </div>
    </div>
  );
}
