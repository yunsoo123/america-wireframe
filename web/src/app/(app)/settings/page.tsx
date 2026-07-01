"use client";

import { useState, useEffect } from "react";
import { Bell, Target, Crown, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { ConfirmButton } from "@/components/interactive";

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={"relative h-6 w-11 shrink-0 rounded-full transition-colors " + (on ? "bg-accent" : "bg-track")}
      aria-pressed={on}
    >
      <span className={"absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all " + (on ? "left-[22px]" : "left-0.5")} />
    </button>
  );
}

function Section({ icon: Icon, title, children }: { icon: typeof Bell; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-card border border-line bg-card shadow-card">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <Icon size={16} className="text-accent" />
        <h2 className="text-sm font-semibold text-ink">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 text-sm">
      <span className="text-ink">{label}</span>
      {children}
    </div>
  );
}

const chip = "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors";
const chipOn = "border-transparent bg-accent-soft text-accent-ink";
const chipOff = "border-line text-muted hover:bg-hover";

export default function SettingsPage() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  const [dnd, setDnd] = useState(true);
  const [freq, setFreq] = useState("요약");
  const [alerts, setAlerts] = useState([
    { id: 1, label: "AAPL ≥ $200", active: true },
    { id: 2, label: "NVDA 돌파 $135", active: true },
    { id: 3, label: "TSLA 실적 전 알림", active: false },
  ]);
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
        <h1 className="text-2xl font-bold tracking-tight text-ink">설정 · 마이페이지</h1>
        <p className="mt-1 text-[15px] text-muted">알림·구독·계정·개인화를 관리합니다.</p>
      </header>

      <div className="flex flex-col gap-4">
        <Section icon={Bell} title="알림 설정 (피로도 제어)">
          <Row label="푸시"><Toggle on={push} onClick={() => setPush(!push)} /></Row>
          <Row label="이메일"><Toggle on={email} onClick={() => setEmail(!email)} /></Row>
          <div className="my-2 border-t border-line" />
          <div className="flex items-center justify-between py-2 text-sm">
            <span className="text-ink">빈도</span>
            <div className="flex gap-1.5">
              {["즉시", "요약", "하루 1회"].map((f) => (
                <button key={f} onClick={() => setFreq(f)} className={`${chip} ${freq === f ? chipOn : chipOff}`}>{f}</button>
              ))}
            </div>
          </div>
          <Row label="조용한 시간 (22–07시)"><Toggle on={dnd} onClick={() => setDnd(!dnd)} /></Row>
          <p className="mt-2 text-xs text-faint">동일 이슈·종목의 중복 알림은 1건으로 묶여 발송됩니다.</p>
        </Section>

        <Section icon={Target} title="가격 알림">
          {alerts.map((a) => (
            <Row key={a.id} label={a.label}>
              <button
                onClick={() => setAlerts((arr) => arr.map((x) => (x.id === a.id ? { ...x, active: !x.active } : x)))}
                className={`${chip} ${a.active ? chipOn : chipOff}`}
              >
                {a.active ? "활성" : "대기"}
              </button>
            </Row>
          ))}
          <button
            onClick={() => setAlerts((arr) => [...arr, { id: Date.now(), label: "새 가격 알림 (조건 설정 필요)", active: false }])}
            className="mt-2 w-full rounded-lg border border-dashed border-line-strong py-2 text-xs text-muted hover:bg-hover"
          >
            + 가격 알림 추가
          </button>
          <p className="mt-2 text-xs text-faint">
            사용자가 설정한 가격 도달 시 알림 · AI는 참고 가격대만 제시하며 매매 권유가 아닙니다.
          </p>
        </Section>

        <Section icon={Crown} title="프리미엄 구독">
          <div className="flex items-center justify-between rounded-xl border border-gold/40 bg-gold-soft p-3">
            <div>
              <div className="flex items-center gap-2 font-semibold text-ink">
                프리미엄 <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-medium text-white">인기</span>
              </div>
              <div className="text-xs text-muted">전체 근거·목표가 알림·브로커 연동</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold tabular-nums text-ink">$9.9<span className="text-xs font-normal text-muted">/월</span></div>
            </div>
          </div>
          <button className="mt-3 w-full rounded-lg bg-gold py-2.5 text-sm font-bold text-white hover:opacity-90">프리미엄 시작</button>
          <div className="mt-2 flex justify-center gap-3 text-xs text-faint">
            <span>결제 내역</span><span>·</span><span>영수증</span><span>·</span><span>해지</span>
          </div>
        </Section>

        <Section icon={ShieldCheck} title="계정 · 보안">
          <Row label="iPhone 15 · 서울 · 방금"><span className={`${chip} ${chipOn}`}>현재 기기</span></Row>
          <Row label="Chrome / Mac · 2시간 전"><ConfirmButton label="세션 종료" confirmedLabel="종료됨 ✓" /></Row>
          <div className="my-2 border-t border-line" />
          <Row label="데이터 내보내기 (CSV·JSON)"><ConfirmButton label="내보내기" confirmedLabel="준비 중 · 메일 발송 ✓" /></Row>
          <Row label="전체 기기 로그아웃"><ConfirmButton label="로그아웃" confirmedLabel="완료 ✓" /></Row>
          <Row label="계정 탈퇴"><ConfirmButton label="탈퇴 요청" confirmedLabel="요청 접수됨" danger /></Row>
        </Section>

        <Section icon={SlidersHorizontal} title="개인화 설정">
          <Row label="리스크 성향">
            <div className="flex gap-1.5">
              {["보수적", "중립", "공격적"].map((r) => (
                <button key={r} onClick={() => pickRisk(r)} className={`${chip} ${risk === r ? chipOn : chipOff}`}>{r}</button>
              ))}
            </div>
          </Row>
          <div className="flex items-center justify-between py-2 text-sm">
            <span className="text-ink">관심 테마</span>
            <div className="flex flex-wrap justify-end gap-1.5">
              {themes.length ? (
                themes.map((t) => <span key={t} className={`${chip} ${chipOn}`}>{t}</span>)
              ) : (
                <span className="text-xs text-faint">미설정</span>
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-faint">공격적 성향이면 홈·스크리닝에 텐배거 스카우터가 우선 노출됩니다.</p>
        </Section>
      </div>

      <p className="mt-8 text-center text-xs text-faint">
        mock 데이터 기반 시제품 · 투자 자문이 아닌 정보 제공 목적이며 투자 책임은 본인에게 있습니다
      </p>
    </div>
  );
}
