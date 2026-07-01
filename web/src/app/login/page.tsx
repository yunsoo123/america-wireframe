import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <Link href="/landing" className="mb-6 flex items-center gap-1 text-sm text-black/55 hover:underline dark:text-white/55">
        <ArrowLeft size={16} /> 뒤로
      </Link>

      <h1 className="mb-5 text-2xl font-medium">로그인</h1>

      <div className="mb-4 flex gap-1.5">
        <span className="rounded-full border border-blue-500/50 bg-blue-600/10 px-3 py-1 text-xs text-blue-700 dark:text-blue-300">
          로그인
        </span>
        <span className="rounded-full border border-black/15 px-3 py-1 text-xs text-black/60 dark:border-white/20 dark:text-white/60">
          회원가입
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="이메일"
          className="rounded-lg border border-black/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-white/20 dark:bg-neutral-900"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="rounded-lg border border-black/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-white/20 dark:bg-neutral-900"
        />
        <div className="text-right text-xs text-black/50 dark:text-white/50">비밀번호 재설정</div>
        <Link
          href="/"
          className="rounded-lg bg-neutral-900 py-2.5 text-center text-sm font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-white/85"
        >
          로그인
        </Link>
      </div>

      <div className="my-5 flex items-center gap-3 text-xs text-black/40 dark:text-white/40">
        <div className="h-px flex-1 bg-black/10 dark:bg-white/15" /> 또는 <div className="h-px flex-1 bg-black/10 dark:bg-white/15" />
      </div>

      <div className="flex flex-col gap-2">
        <button className="rounded-lg border border-black/15 py-2.5 text-sm font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/5">
          Google로 계속
        </button>
        <button className="rounded-lg border border-black/15 py-2.5 text-sm font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/5">
          Apple로 계속
        </button>
      </div>

      <p className="mt-5 text-center text-xs text-black/40 dark:text-white/40">
        중복 이메일·인증 실패 시 원인과 재시도 안내가 표시됩니다.
      </p>
    </div>
  );
}
