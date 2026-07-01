import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <Link href="/landing" className="mb-6 flex items-center gap-1 text-sm text-muted hover:underline">
        <ArrowLeft size={16} /> 뒤로
      </Link>

      <h1 className="mb-5 text-2xl font-bold tracking-tight text-ink">로그인</h1>

      <div className="mb-4 flex gap-1.5">
        <span className="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent-ink">로그인</span>
        <span className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted">회원가입</span>
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="이메일"
          className="rounded-lg border border-line bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="rounded-lg border border-line bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
        />
        <div className="text-right text-xs">
          <Link href="/reset-password" className="text-muted hover:underline">비밀번호 재설정</Link>
        </div>
        <Link href="/" className="rounded-lg bg-accent py-2.5 text-center text-sm font-bold text-white hover:bg-accent-hover">
          로그인
        </Link>
      </div>

      <div className="my-5 flex items-center gap-3 text-xs text-faint">
        <div className="h-px flex-1 bg-line" /> 또는 <div className="h-px flex-1 bg-line" />
      </div>

      <div className="flex flex-col gap-2">
        <button className="rounded-lg border border-line-strong py-2.5 text-sm font-semibold text-ink hover:bg-hover">Google로 계속</button>
        <button className="rounded-lg border border-line-strong py-2.5 text-sm font-semibold text-ink hover:bg-hover">Apple로 계속</button>
      </div>

      <p className="mt-5 text-center text-xs text-faint">
        중복 이메일·인증 실패 시 원인과 재시도 안내가 표시됩니다.
      </p>
    </div>
  );
}
