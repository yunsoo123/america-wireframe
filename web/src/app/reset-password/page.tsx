"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MailCheck } from "lucide-react";

export default function ResetPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <Link href="/login" className="mb-6 flex items-center gap-1 text-sm text-muted hover:underline">
        <ArrowLeft size={16} /> 로그인
      </Link>

      <h1 className="mb-1 text-2xl font-bold tracking-tight text-ink">비밀번호 재설정</h1>
      <p className="mb-6 text-sm text-muted">가입한 이메일로 재설정 링크를 보내드립니다.</p>

      {sent ? (
        <div className="flex flex-col items-center gap-3 rounded-card border border-line bg-card p-6 text-center shadow-card">
          <MailCheck size={28} className="text-accent" />
          <p className="text-sm text-ink">
            재설정 링크를 보냈습니다. 메일함을 확인하세요.
            <br />
            <span className="text-muted">링크는 30분 후 만료됩니다.</span>
          </p>
          <button onClick={() => setSent(false)} className="text-sm font-medium text-accent hover:underline">
            다시 보내기
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="이메일"
            className="rounded-lg border border-line bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
          />
          <button onClick={() => setSent(true)} className="rounded-lg bg-accent py-2.5 text-sm font-bold text-white hover:bg-accent-hover">
            재설정 링크 보내기
          </button>
          <p className="text-center text-xs text-faint">보안을 위해 가입 여부는 별도로 안내하지 않습니다.</p>
        </div>
      )}
    </div>
  );
}
