"use client";

import { useState, useEffect } from "react";
import { Bell, Target, Crown, ShieldCheck, SlidersHorizontal } from "lucide-react";

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        "relative h-6 w-11 shrink-0 rounded-full transition-colors " +
        (on ? "bg-blue-600" : "bg-black/15 dark:bg-white/20")
      }
      aria-pressed={on}
    >
      <span
        className={
          "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all " +
          (on ? "left-[22px]" : "left-0.5")
        }
      />
    </button>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Bell;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-black/10 bg-white dark:border-white/15 dark:bg-neutral-900">
      <div className="flex items-center gap-2 border-b border-black/[0.06] px-4 py-3 dark:border-white/10">
        <Icon size={16} className="text-blue-600 dark:text-blue-400" />
        <h2 className="text-sm font-medium">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 text-sm">
      <span className="text-black/70 dark:text-white/70">{label}</span>
      {children}
    </div>
  );
}

const chip = "rounded-full border px-3 py-1 text-xs";
const chipOn = "border-blue-500/50 bg-blue-600/10 text-blue-700 dark:text-blue-300";
const chipOff = "border-black/15 text-black/60 dark:border-white/20 dark:text-white/60";

export default function SettingsPage() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  const [dnd, setDnd] = useState(true);
  const [freq, setFreq] = useState("요약");
  const [risk, setRisk] = useState("공격적");
  const [themes, setThemes] = useState<string[]>(["AI", "헬스케어"]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("profile");
      if (raw) {
        const o = JSON.parse(raw);
        if (o.risk) setRisk(o.risk);
        if (Array.isArray(o.themes) && o.themes.length) setThemes(o.themes);
      }
    } catch {}
  }, []);

  function pickRisk(r: string) {
    setRisk(r);
    try {
      const raw = localStorage.getItem("profile");
      const o = raw ? JSON.parse(raw) : {};
      localStorage.setItem("profile", JSON.stringify({ ...o, risk: r }));
    } catch {}
  }

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-xl font-medium">설정 · 마이페이지</h1>
        <p className="mt-1 text-sm text-black/55 dark:text-white/55">
          알림·구독·계정·개인화를 관리합니다.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        <Section icon={Bell} title="알림 설정 (피로도 제어)">
          <Row label="푸시"><Toggle on={push} onClick={() => setPush(!push)} /></Row>
          <Row label="이메일"><Toggle on={email} onClick={() => setEmail(!email)} /></Row>
          <div className="my-2 border-t border-black/[0.06] dark:border-white/10" />
          <div className="flex items-center justify-between py-2 text-sm">
            <span className="text-black/70 dark:text-white/70">빈도</span>
            <div className="flex gap-1.5">
              {["즉시", "요약", "하루 1회"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFreq(f)}
                  className={`${chip} ${freq === f ? chipOn : chipOff}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <Row label="조용한 시간 (22–07시)"><Toggle on={dnd} onClick={() => setDnd(!dnd)} /></Row>
          <p className="mt-2 text-xs text-black/45 dark:text-white/45">
            동일 이슈·종목의 중복 알림은 1건으로 묶여 발송됩니다.
          </p>
        </Section>

        <Section icon={Target} title="가격 알림">
          <Row label="AAPL ≥ $200">
            <span className={`${chip} ${chipOn}`}>활성</span>
          </Row>
          <Row label="NVDA 돌파 $135">
            <span className={`${chip} ${chipOn}`}>활성</span>
          </Row>
          <Row label="TSLA 실적 전 알림">
            <span className={`${chip} ${chipOff}`}>대기</span>
          </Row>
          <p className="mt-2 text-xs text-black/50 dark:text-white/50">
            사용자가 설정한 가격 도달 시 알림 · AI는 참고 가격대만 제시하며 매매 권유가 아닙니다.
          </p>
        </Section>

        <Section icon={Crown} title="프리미엄 구독">
          <div className="flex items-center justify-between rounded-lg border-2 border-blue-500/40 bg-blue-600/[0.06] p-3">
            <div>
              <div className="flex items-center gap-2 font-medium">
                프리미엄 <span className={`${chip} ${chipOn}`}>인기</span>
              </div>
              <div className="text-xs text-black/55 dark:text-white/55">
                전체 근거·목표가 알림·브로커 연동
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-medium">$9.9<span className="text-xs text-black/50">/월</span></div>
            </div>
          </div>
          <button className="mt-3 w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-white/85">
            프리미엄 시작
          </button>
          <div className="mt-2 flex justify-center gap-3 text-xs text-black/45 dark:text-white/45">
            <span>결제 내역</span><span>·</span><span>영수증</span><span>·</span><span>해지</span>
          </div>
        </Section>

        <Section icon={ShieldCheck} title="계정 · 보안">
          <Row label="iPhone 15 · 서울 · 방금">
            <span className={`${chip} ${chipOn}`}>현재 기기</span>
          </Row>
          <Row label="Chrome / Mac · 2시간 전">
            <button className={`${chip} ${chipOff}`}>세션 종료</button>
          </Row>
          <div className="my-2 border-t border-black/[0.06] dark:border-white/10" />
          <Row label="데이터 내보내기 (CSV·JSON)"><span className="text-xs text-black/40">▸</span></Row>
          <Row label="전체 기기 로그아웃"><span className="text-xs text-black/40">▸</span></Row>
          <div className="flex items-center justify-between py-2 text-sm">
            <span className="text-red-600 dark:text-red-400">계정 탈퇴</span>
            <span className="text-xs text-black/40">▸</span>
          </div>
        </Section>

        <Section icon={SlidersHorizontal} title="개인화 설정">
          <Row label="리스크 성향">
            <div className="flex gap-1.5">
              {["보수적", "중립", "공격적"].map((r) => (
                <button
                  key={r}
                  onClick={() => pickRisk(r)}
                  className={`${chip} ${risk === r ? chipOn : chipOff}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </Row>
          <div className="flex items-center justify-between py-2 text-sm">
            <span className="text-black/70 dark:text-white/70">관심 테마</span>
            <div className="flex flex-wrap justify-end gap-1.5">
              {themes.length ? (
                themes.map((t) => (
                  <span key={t} className={`${chip} ${chipOn}`}>
                    {t}
                  </span>
                ))
              ) : (
                <span className="text-xs text-black/50 dark:text-white/50">미설정</span>
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-black/45 dark:text-white/45">
            공격적 성향이면 홈·스크리닝에 텐배거 스카우터가 우선 노출됩니다.
          </p>
        </Section>
      </div>

      <p className="mt-8 text-center text-xs text-black/55 dark:text-white/55">
        mock 데이터 기반 시제품 · 투자 자문이 아닌 정보 제공 목적이며 투자 책임은 본인에게 있습니다
      </p>
    </div>
  );
}
