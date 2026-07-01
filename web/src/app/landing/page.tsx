import Link from "next/link";
import { Compass, ArrowRight, FileText, ShieldAlert, Scale } from "lucide-react";

const TRUST = [
  { icon: FileText, t: "모든 추천에 근거 3줄", d: "출처 링크와 함께 제시합니다" },
  { icon: ShieldAlert, t: "리스크 먼저 고지", d: "좋은 점만 말하지 않습니다" },
  { icon: Scale, t: "판단은 당신 몫", d: "정보 제공 서비스, 자문 아님" },
];

export default function LandingPage() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
          <Compass size={18} />
        </span>
        <span className="text-[15px] font-bold tracking-tight text-ink">Northstar</span>
      </div>

      <h1 className="text-[32px] font-bold leading-tight tracking-tight text-ink">
        미국주식,<br />근거 없는 추천은<br />하지 않습니다.
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">
        저평가 고성장 종목을 발굴하고, 왜 사야 하는지·무엇이 위험한지까지 AI가 함께 정리합니다. 바쁜 당신 대신, 냉정하게.
      </p>

      <div className="mt-6 flex flex-col gap-2">
        {TRUST.map((x) => (
          <div key={x.t} className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 shadow-card">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <x.icon size={16} />
            </span>
            <div>
              <div className="text-sm font-semibold text-ink">{x.t}</div>
              <div className="text-xs text-muted">{x.d}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-card border border-line bg-card p-4 shadow-card">
        <div className="mb-2 text-xs font-medium text-muted">샘플 미리보기 (비회원)</div>
        <div className="flex gap-2">
          <Link href="/" className="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent-ink">3분 브리핑</Link>
          <Link href="/screening/tenbagger" className="rounded-full bg-gold-soft px-3 py-1.5 text-xs font-medium text-gold-ink">텐배거 스카우터</Link>
        </div>
      </div>

      <Link
        href="/onboarding"
        className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-gold py-3.5 text-sm font-bold text-white hover:opacity-90"
      >
        무료로 시작하기 <ArrowRight size={16} />
      </Link>
      <p className="mt-1.5 text-center text-xs text-faint">카드 등록 없이 30초</p>
      <Link
        href="/login"
        className="mt-2 flex items-center justify-center rounded-lg border border-line-strong py-3 text-sm font-semibold text-ink hover:bg-hover"
      >
        로그인
      </Link>

      <p className="mt-6 text-center text-xs text-faint">
        투자 정보 제공 서비스 · 투자 자문이 아니며 투자 책임은 본인에게 있습니다.
      </p>
    </div>
  );
}
