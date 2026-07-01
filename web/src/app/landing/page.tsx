import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <div className="mb-3 flex items-center gap-2">
        <Zap size={22} className="text-blue-600 dark:text-blue-400" />
        <span className="text-sm font-medium text-black/60 dark:text-white/60">AI 미국주식 투자 비서</span>
      </div>
      <h1 className="text-3xl font-medium leading-snug">
        미국주식, AI 비서가<br />대신 정리해드려요
      </h1>
      <p className="mt-3 text-sm text-black/60 dark:text-white/60">
        탑다운 스크리닝부터 포트폴리오 진단, 텐배거 후보 발굴까지. 근거와 함께, 놓치지 않게.
      </p>

      <div className="mt-6 rounded-xl border border-black/10 bg-white p-4 dark:border-white/15 dark:bg-neutral-900">
        <div className="mb-2 text-xs text-black/50 dark:text-white/50">샘플 미리보기 (비회원)</div>
        <div className="flex gap-2">
          <Link href="/" className="rounded-full border border-blue-500/40 bg-blue-600/10 px-3 py-1 text-xs text-blue-700 dark:text-blue-300">
            3분 브리핑
          </Link>
          <Link href="/screening/tenbagger" className="rounded-full border border-blue-500/40 bg-blue-600/10 px-3 py-1 text-xs text-blue-700 dark:text-blue-300">
            텐배거 스카우터
          </Link>
        </div>
      </div>

      <Link
        href="/onboarding"
        className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-neutral-900 py-3 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-white/85"
      >
        무료로 시작하기 <ArrowRight size={16} />
      </Link>
      <Link
        href="/login"
        className="mt-2 flex items-center justify-center rounded-lg border border-black/15 py-3 text-sm font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/5"
      >
        로그인
      </Link>

      <p className="mt-6 text-center text-xs text-black/40 dark:text-white/40">
        투자 정보 제공 서비스 · 투자 자문이 아니며 투자 책임은 본인에게 있습니다.
      </p>
    </div>
  );
}
