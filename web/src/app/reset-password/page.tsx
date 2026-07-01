"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MailCheck } from "lucide-react";

export default function ResetPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <Link href="/login" className="mb-6 flex items-center gap-1 text-sm text-black/55 hover:underline dark:text-white/55">
        <ArrowLeft size={16} /> 로그인
      </Link>

      <h1 className="mb-1 text-2xl font-medium">비밀번호 재설정</h1>
      <p className="mb-6 text-sm text-black/55 dark:text-white/55">
        가입한 이메일로 재설정 링크를 보내드립니다.
      </p>

      {sent ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-black/10 bg-white p-6 text-center dark:border-white/15 dark:bg-neutral-900">
          <MailCheck size={28} className="text-blue-600 dark:text-blue-400" />
          <p className="text-sm">
            재설정 링크를 보냈습니다. 메일함을 확인하세요.
            <br />
            <span className="text-black/50 dark:text-white/50">링크는 30분 후 만료됩니다.</span>
          </p>
          <button
            onClick={() => setSent(false)}
            className="text-sm text-blue-700 hover:underline dark:text-blue-300"
          >
            다시 보내기
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="이메일"
            className="rounded-lg border border-black/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-white/20 dark:bg-neutral-900"
          />
          <button
            onClick={() => setSent(true)}
            className="rounded-lg bg-neutral-900 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-white/85"
          >
            재설정 링크 보내기
          </button>
          <p className="text-center text-xs text-black/45 dark:text-white/45">
            보안을 위해 가입 여부는 별도로 안내하지 않습니다.
          </p>
        </div>
      )}
    </div>
  );
}
