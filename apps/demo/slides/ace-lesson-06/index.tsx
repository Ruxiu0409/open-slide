import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import { useEffect, useRef, useState } from 'react';
import asacBubbleTea from './assets/asac-bubbletea.png';
import asacGlobe from './assets/asac-globe.png';
import asacLogo from './assets/asac-tw-logo.svg';
import sscHero from './assets/ssc27-hero.mp4';
import sscHeroEnd from './assets/ssc27-hero-end.jpg';
import voteQr from './assets/vote-qr.svg';

export const design: DesignSystem = {
  palette: { bg: '#FFFFFF', text: '#0D0D0D', accent: '#2E6FE0' },
  fonts: {
    display:
      '"Inter", -apple-system, BlinkMacSystemFont, "PingFang TC", "Noto Sans TC", system-ui, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "PingFang TC", "Noto Sans TC", system-ui, sans-serif',
  },
  typeScale: { hero: 190, body: 28 },
  radius: 32,
};

const mono = '"SF Mono", "JetBrains Mono", "Menlo", monospace';

const site = {
  muted: '#5D5D5D',
  faint: '#8F8F8F',
  line: '#E5E5E5',
  surface: '#F4F4F4',
  claude: '#D97757',
  blue: '#2E6FE0',
  cream: '#FAF9F5',
};

const fill = {
  width: '100%',
  height: '100%',
  fontFamily: 'var(--osd-font-body)',
  color: 'var(--osd-text)',
  background: 'var(--osd-bg)',
  position: 'relative',
  overflow: 'hidden',
} as const;

const keyframes = `
@keyframes aceFadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes aceGlow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
@keyframes siteDrift {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-8px) rotate(-1deg); }
}
@keyframes siteBob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes siteGrowX {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@keyframes siteDotOn {
  from { background: #FFFFFF; border-color: #E5E5E5; }
  to { background: #0D0D0D; border-color: #0D0D0D; }
}
.ace-fadeup { animation: aceFadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) both; }
.ace-glow { animation: aceGlow 5s ease-in-out infinite; }
.site-drift { animation: siteDrift 4s ease-in-out infinite; }
.site-bob { animation: siteBob 2.4s ease-in-out infinite; }
`;

const Style = () => <style>{keyframes}</style>;

const Clauses = ({ text }: { text: string }) => (
  <>
    {text.split(/(?<=[，。、？！：])/).map((part) => (
      <span key={part} style={{ display: 'inline-block' }}>
        {part}
      </span>
    ))}
  </>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 56,
        left: 120,
        right: 120,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 21,
        color: site.faint,
      }}
    >
      <span>♠ ACE Club · Lesson 6</span>
      <span style={{ fontFamily: mono, letterSpacing: '0.04em' }}>
        {String(current).padStart(2, '0')}{' '}
        <span style={{ opacity: 0.45 }}>/ {String(total).padStart(2, '0')}</span>
      </span>
    </div>
  );
};

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={fill}>
    <Style />
    {children}
    <Footer />
  </div>
);

const SitePage = ({ children }: { children: React.ReactNode }) => (
  <Frame>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '110px 160px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  </Frame>
);

const Head = ({
  label,
  title,
  sub,
}: {
  label: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
}) => (
  <div
    className="ace-fadeup"
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}
  >
    <div style={{ fontSize: 24, color: site.muted }}>{label}</div>
    <h2
      style={{
        fontSize: 72,
        fontWeight: 600,
        letterSpacing: '-0.025em',
        lineHeight: 1.12,
        margin: 0,
      }}
    >
      {title}
    </h2>
    {sub && (
      <p style={{ fontSize: 28, color: site.muted, lineHeight: 1.5, margin: '6px 0 0' }}>{sub}</p>
    )}
  </div>
);

const HeroGlow = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      left: 120,
      right: 120,
      top: 90,
      height: 300,
      borderRadius: 36,
      overflow: 'hidden',
      background: '#E9EEF8',
    }}
  >
    <div
      className="ace-glow"
      style={{
        position: 'absolute',
        inset: -60,
        background:
          'radial-gradient(40% 55% at 22% 30%, #8FB4FF 0%, transparent 70%), radial-gradient(35% 50% at 78% 65%, #2E6FE0 0%, transparent 70%), radial-gradient(30% 40% at 60% 20%, #F2C9A8 0%, transparent 70%), radial-gradient(45% 60% at 35% 85%, #C9D8FF 0%, transparent 70%)',
        filter: 'blur(30px)',
      }}
    />
  </div>
);

const HeroText = ({
  label,
  title,
  sub,
  children,
}: {
  label: string;
  title: string;
  sub: string;
  children?: React.ReactNode;
}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 450,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <div className="ace-fadeup" style={{ fontSize: 28, color: site.muted }}>
      {label}
    </div>
    <h1
      className="ace-fadeup"
      style={{
        fontSize: 'var(--osd-size-hero)',
        fontWeight: 500,
        letterSpacing: '-0.035em',
        lineHeight: 1.02,
        margin: '22px 0 0',
        animationDelay: '120ms',
      }}
    >
      {title}
    </h1>
    <p
      className="ace-fadeup"
      style={{
        fontSize: 46,
        margin: '26px 0 0',
        letterSpacing: '-0.01em',
        animationDelay: '200ms',
      }}
    >
      {sub}
    </p>
    {children}
  </div>
);

const Pill = ({ children, delay = 280 }: { children: React.ReactNode; delay?: number }) => (
  <div
    className="ace-fadeup"
    style={{
      marginTop: 40,
      display: 'inline-flex',
      alignItems: 'center',
      height: 62,
      padding: '0 30px',
      borderRadius: 999,
      background: 'var(--osd-text)',
      color: '#fff',
      fontSize: 27,
      fontWeight: 500,
      animationDelay: `${delay}ms`,
    }}
  >
    {children}
  </div>
);

const Clawd = ({ width }: { width: number }) => (
  <svg
    className="site-bob"
    viewBox="0 0 14 10"
    shapeRendering="crispEdges"
    style={{ width, height: 'auto', display: 'block' }}
    aria-label="Claude 吉祥物 Clawd"
  >
    <g fill={site.cream}>
      <rect x="2" y="0" width="10" height="6" />
      <rect x="0" y="2" width="2" height="2" />
      <rect x="12" y="2" width="2" height="2" />
      <rect x="3" y="6" width="1" height="3" />
      <rect x="5" y="6" width="1" height="3" />
      <rect x="8" y="6" width="1" height="3" />
      <rect x="10" y="6" width="1" height="3" />
    </g>
    <g fill="#141413">
      <rect x="4" y="2" width="1" height="2" />
      <rect x="9" y="2" width="1" height="2" />
    </g>
  </svg>
);

const TermRow = ({ k, v, small }: { k: string; v: string; small?: string }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '220px 1fr',
      gap: 24,
      padding: '20px 0',
      borderBottom: `1px solid ${site.line}`,
      textAlign: 'left',
    }}
  >
    <div style={{ fontSize: 24, color: site.muted, paddingTop: 4 }}>{k}</div>
    <div>
      <div style={{ fontSize: 32, lineHeight: 1.3 }}>{v}</div>
      {small && (
        <div style={{ fontSize: 23, color: site.muted, marginTop: 4, lineHeight: 1.5 }}>
          {small}
        </div>
      )}
    </div>
  </div>
);

const Rows = ({ children }: { children: React.ReactNode }) => (
  <div
    className="ace-fadeup"
    style={{
      width: 1100,
      marginTop: 48,
      borderTop: `1px solid ${site.line}`,
      animationDelay: '200ms',
    }}
  >
    {children}
  </div>
);

const useElapsed = (limit: number) => {
  const active = useIsActivePage();
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    setElapsed(0);
    if (!active) return;
    const start = performance.now();
    const id = setInterval(() => {
      const s = Math.min((performance.now() - start) / 1000, limit);
      setElapsed(s);
      if (s >= limit) clearInterval(id);
    }, 100);
    return () => clearInterval(id);
  }, [active, limit]);
  return elapsed;
};

const clock = (seconds: number) => {
  const t = Math.max(Math.ceil(seconds), 0);
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
};

const Bar = ({ progress, color }: { progress: number; color: string }) => (
  <div
    style={{
      width: 1400,
      height: 14,
      borderRadius: 7,
      background: site.surface,
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        background: color,
        transformOrigin: 'left',
        transform: `scaleX(${Math.min(Math.max(progress, 0), 1)})`,
        transition: 'transform 100ms linear',
      }}
    />
  </div>
);

const Countdown = ({
  seconds,
  label,
  title,
  doneTitle,
  hint,
  doneHint,
  size = 360,
  children,
}: {
  seconds: number;
  label: string;
  title: string;
  doneTitle: string;
  hint: string;
  doneHint: string;
  size?: number;
  children?: React.ReactNode;
}) => {
  const elapsed = useElapsed(seconds);
  const done = elapsed >= seconds;
  const left = seconds - elapsed;
  const color = done || left <= 30 ? site.claude : 'var(--osd-text)';
  const heading = done ? doneTitle : title;
  const note = done ? doneHint : hint;
  return (
    <SitePage>
      <div className="ace-fadeup" style={{ fontSize: 28, color: site.muted }}>
        {label}
      </div>
      <div
        key={heading}
        className="ace-fadeup"
        style={{ fontSize: 60, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 14, color }}
      >
        {heading}
      </div>
      <div
        style={{
          fontSize: size,
          fontWeight: 500,
          letterSpacing: '-0.05em',
          lineHeight: 1,
          marginTop: 24,
          fontVariantNumeric: 'tabular-nums',
          color,
          transition: 'color 400ms ease',
        }}
      >
        {clock(left)}
      </div>
      <div style={{ marginTop: 40 }}>
        <Bar progress={elapsed / seconds} color={site.claude} />
      </div>
      {children}
      <p
        key={note}
        className="ace-fadeup"
        style={{ fontSize: 30, color: site.muted, margin: '36px 0 0', lineHeight: 1.5 }}
      >
        <Clauses text={note} />
      </p>
    </SitePage>
  );
};

const founders = ['Cho Neil', '戴君翰', 'Kate Shen', 'Ian Huang', 'Emily', 'Charlotte'];

const theme = {
  title: '你想念的科系',
  sub: '照你以後想念的大學科系分組，做一個那個領域用得到的作品。可以參考別人做過的，但不能照做，要做出新東西。',
};

const Cover: Page = () => (
  <Frame>
    <HeroGlow />
    <HeroText
      label="ACE Club · 2026.11.12（四）· 社課第六堂"
      title="下半學期，開始"
      sub="這次，你想解決什麼問題？"
    >
      <Pill>今天：選出第一名、組隊、想點子</Pill>
    </HeroText>
  </Frame>
);

const AgendaItem = ({
  i,
  time,
  title,
  body,
}: {
  i: number;
  time: string;
  title: string;
  body: string;
}) => (
  <div
    style={{
      position: 'relative',
      paddingTop: 60,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        width: 26,
        height: 26,
        marginLeft: -13,
        borderRadius: '50%',
        border: `3px solid ${site.line}`,
        background: '#fff',
        boxSizing: 'border-box',
        animation: `siteDotOn 300ms ease-out ${i * 0.6}s both`,
      }}
    />
    <div
      className="ace-fadeup"
      style={{
        animationDelay: `${i * 0.6 + 0.1}s`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ fontSize: 26, color: site.muted, fontVariantNumeric: 'tabular-nums' }}>
        {time}
      </div>
      <div style={{ fontSize: 42, fontWeight: 600, marginTop: 10, letterSpacing: '-0.01em' }}>
        {title}
      </div>
      <div style={{ fontSize: 24, color: site.muted, marginTop: 10, lineHeight: 1.5 }}>{body}</div>
    </div>
  </div>
);

const Agenda: Page = () => {
  const active = useIsActivePage();
  return (
    <SitePage>
      <Head label="今天" title="三十分鐘，四件事" />
      <div
        key={active ? 'on' : 'off'}
        style={{ position: 'relative', width: 1600, marginTop: 220 }}
      >
        <div
          style={{
            position: 'absolute',
            top: 11,
            left: 200,
            right: 200,
            height: 4,
            borderRadius: 2,
            background: site.line,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 11,
            left: 200,
            right: 200,
            height: 4,
            borderRadius: 2,
            background: 'var(--osd-text)',
            transformOrigin: 'left',
            animation: 'siteGrowX 1.8s linear both',
          }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <AgendaItem i={0} time="6 分鐘" title="選出第一名" body="Pitch Day 回顧、投票" />
          <AgendaItem i={1} time="5 分鐘" title="下半學期怎麼走" body="行程、比賽、主題" />
          <AgendaItem i={2} time="5 分鐘" title="組隊" body="1～4 人，自己找" />
          <AgendaItem i={3} time="12 分鐘" title="想點子" body="帶走一句話" />
        </div>
      </div>
    </SitePage>
  );
};

const Recap: Page = () => (
  <SitePage>
    <Head
      label="上半學期回顧 · ACE Pitch Day"
      title="10/15，六位創辦人上台"
      sub="從一個問題開始，做出能 Demo 的東西，再站上台講三分鐘。"
    />
    <div style={{ display: 'flex', gap: 24, marginTop: 80 }}>
      {founders.map((name, i) => (
        <div
          key={name}
          className="ace-fadeup"
          style={{
            width: 240,
            height: 300,
            borderRadius: 28,
            background: site.surface,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 18,
            animationDelay: `${160 + i * 80}ms`,
          }}
        >
          <div
            className="site-drift"
            style={{
              fontSize: 140,
              fontWeight: 500,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {i + 1}
          </div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>{name}</div>
        </div>
      ))}
    </div>
    <p className="ace-fadeup" style={{ fontSize: 30, margin: '64px 0 0', animationDelay: '800ms' }}>
      第一名還沒出來，今天用投票決定。
    </p>
  </SitePage>
);

const VoteRules: Page = () => (
  <SitePage>
    <Head label="投票" title="一人一票，選出第一名" />
    <Rows>
      <TermRow k="怎麼投" v="手機掃 QR Code，填名字、選一個人" small="下一頁就有 QR Code" />
      <TermRow k="不能投自己" v="有上台的人，不能選自己" />
      <TermRow k="怎麼算" v="票數最多的拿第一名" small="同票由評審決定" />
      <TermRow k="第一名" v="Claude Team Premium 帳號一個月" />
      <TermRow k="安慰獎" v="Claude Team Standard 帳號一個月" small="其他有上台的人，每人一份" />
    </Rows>
  </SitePage>
);

const voteUrl = 'forms.gle/sRLr1TptJ2Zyg8U4A';

const Vote: Page = () => {
  const seconds = 120;
  const elapsed = useElapsed(seconds);
  const done = elapsed >= seconds;
  const left = seconds - elapsed;
  const color = done || left <= 30 ? site.claude : 'var(--osd-text)';
  return (
    <SitePage>
      <div className="ace-fadeup" style={{ fontSize: 28, color: site.muted }}>
        投票時間
      </div>
      <div
        key={String(done)}
        className="ace-fadeup"
        style={{ fontSize: 60, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 14, color }}
      >
        {done ? '投票截止' : '掃 QR Code 投票'}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 96, marginTop: 30 }}>
        <div
          className="ace-fadeup"
          style={{
            padding: 28,
            borderRadius: 32,
            background: '#fff',
            border: `1px solid ${site.line}`,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
            animationDelay: '120ms',
          }}
        >
          <img
            src={voteQr}
            alt="投票表單 QR Code"
            style={{ width: 560, height: 560, display: 'block' }}
          />
          <div
            style={{
              fontSize: 22,
              color: site.muted,
              marginTop: 12,
              fontFamily: mono,
              textAlign: 'center',
            }}
          >
            {voteUrl}
          </div>
        </div>
        <div style={{ textAlign: 'left' }}>
          <div
            style={{
              fontSize: 200,
              fontWeight: 500,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
              color,
              transition: 'color 400ms ease',
            }}
          >
            {clock(left)}
          </div>
          <div
            style={{
              width: 500,
              height: 14,
              borderRadius: 7,
              background: site.surface,
              overflow: 'hidden',
              marginTop: 28,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: site.claude,
                transformOrigin: 'left',
                transform: `scaleX(${Math.min(elapsed / seconds, 1)})`,
                transition: 'transform 100ms linear',
              }}
            />
          </div>
          <p
            key={String(done)}
            className="ace-fadeup"
            style={{ fontSize: 30, color: site.muted, margin: '36px 0 0', lineHeight: 1.6 }}
          >
            {done ? (
              '手機放下，現場開票。'
            ) : (
              <>
                填你的名字，選一個人。
                <br />
                不能選自己。
              </>
            )}
          </p>
        </div>
      </div>
    </SitePage>
  );
};

const Winner: Page = () => (
  <Frame>
    <div
      className="ace-fadeup"
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        top: 90,
        bottom: 130,
        borderRadius: 44,
        background: site.claude,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 56 }}>
        <div style={{ fontSize: 240, fontWeight: 500, letterSpacing: '-0.05em', lineHeight: 0.8 }}>
          #1
        </div>
        <Clawd width={250} />
      </div>
      <div style={{ fontSize: 26, color: 'rgba(255, 255, 255, 0.8)', marginTop: 56 }}>
        ACE Pitch Day 第一名
      </div>
      <div
        style={{
          fontSize: 76,
          fontWeight: 500,
          letterSpacing: '-0.025em',
          lineHeight: 1.1,
          marginTop: 14,
        }}
      >
        Claude Team Premium
        <br />
        帳號一個月
      </div>
    </div>
  </Frame>
);

const ConsolationPrize: Page = () => (
  <Frame>
    <div
      className="ace-fadeup"
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        top: 90,
        bottom: 130,
        borderRadius: 44,
        background: site.cream,
        border: `1px solid ${site.line}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 190,
          height: 190,
          borderRadius: 48,
          background: site.claude,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Clawd width={130} />
      </div>
      <div style={{ fontSize: 26, color: site.muted, marginTop: 44 }}>安慰獎</div>
      <div
        style={{
          fontSize: 76,
          fontWeight: 500,
          letterSpacing: '-0.025em',
          lineHeight: 1.1,
          marginTop: 14,
        }}
      >
        Claude Team Standard 帳號一個月
      </div>
      <div style={{ fontSize: 30, color: site.muted, marginTop: 22 }}>
        其他有上台的每一位，都有一份。
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 14,
          marginTop: 40,
          maxWidth: 1300,
        }}
      >
        {founders.map((name, i) => (
          <div
            key={name}
            className="ace-fadeup"
            style={{
              height: 58,
              padding: '0 26px',
              borderRadius: 999,
              background: '#fff',
              border: `1px solid ${site.line}`,
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: 26,
              fontWeight: 500,
              animationDelay: `${300 + i * 80}ms`,
            }}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

const kindStyle = {
  實體: { bg: 'rgba(46, 111, 224, 0.12)', fg: site.blue },
  老師線上: { bg: site.surface, fg: site.muted },
} as const;

const term2: { d: string; k: keyof typeof kindStyle; t: string; today?: boolean }[] = [
  { d: '11/12', k: '實體', t: '分組、創意發想', today: true },
  { d: '11/19', k: '老師線上', t: 'UI/UX、AI 應用' },
  { d: '11/26', k: '實體', t: '世界咖啡館、動手做' },
  { d: '12/3', k: '老師線上', t: '討論' },
  { d: '12/24', k: '實體', t: '發表日' },
  { d: '12/31', k: '實體', t: '慶功日' },
];

const Schedule: Page = () => (
  <SitePage>
    <Head label="下半學期 · 六次社課" title="12/24 再上台一次" />
    <div
      className="ace-fadeup"
      style={{
        width: 1200,
        marginTop: 44,
        borderTop: `1px solid ${site.line}`,
        animationDelay: '200ms',
      }}
    >
      {term2.map((s) => (
        <div
          key={s.d}
          style={{
            display: 'grid',
            gridTemplateColumns: '160px 150px 1fr auto',
            alignItems: 'center',
            gap: 24,
            height: 92,
            padding: '0 28px',
            borderBottom: `1px solid ${site.line}`,
            background: s.today ? 'rgba(46, 111, 224, 0.06)' : 'transparent',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {s.d}
          </div>
          <div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: 40,
                padding: '0 18px',
                borderRadius: 999,
                fontSize: 22,
                fontWeight: 500,
                background: kindStyle[s.k].bg,
                color: kindStyle[s.k].fg,
              }}
            >
              {s.k}
            </span>
          </div>
          <div style={{ fontSize: 32 }}>{s.t}</div>
          <div style={{ fontSize: 24, fontWeight: 600, color: site.blue }}>
            {s.today ? '今天' : ''}
          </div>
        </div>
      ))}
    </div>
  </SitePage>
);

const SSCCell = ({ k, v, small }: { k: string; v: string; small?: string }) => (
  <div
    style={{
      padding: '18px 0',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
      textAlign: 'left',
    }}
  >
    <div style={{ fontSize: 22, color: 'rgba(255, 255, 255, 0.62)' }}>{k}</div>
    <div style={{ fontSize: 30, lineHeight: 1.3, marginTop: 6 }}>{v}</div>
    {small && (
      <div style={{ fontSize: 21, color: 'rgba(255, 255, 255, 0.62)', marginTop: 4 }}>{small}</div>
    )}
  </div>
);

const ChallengeSSC: Page = () => {
  const active = useIsActivePage();
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (active) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);
  return (
    <div style={{ ...fill, background: '#120A3A', color: '#fff' }}>
      <Style />
      <video
        ref={ref}
        src={sscHero}
        poster={sscHeroEnd}
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          top: -36,
          left: 0,
          width: '100%',
          height: 'calc(100% + 36px)',
          objectFit: 'cover',
          objectPosition: 'top',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 416,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div className="ace-fadeup" style={{ fontSize: 24, color: 'rgba(255, 255, 255, 0.7)' }}>
          接下來的比賽 · Apple 官方
        </div>
        <h2
          className="ace-fadeup"
          style={{
            fontSize: 68,
            fontWeight: 600,
            letterSpacing: '-0.025em',
            lineHeight: 1.12,
            margin: '12px 0 0',
            animationDelay: '80ms',
          }}
        >
          Swift Student Challenge
        </h2>
        <p
          className="ace-fadeup"
          style={{
            fontSize: 27,
            color: 'rgba(255, 255, 255, 0.78)',
            margin: '14px 0 0',
            animationDelay: '140ms',
          }}
        >
          Apple 每年辦給學生的 App 比賽。2027 年 2/8～2/28 交作品。
        </p>
        <div
          className="ace-fadeup"
          style={{
            width: 1300,
            marginTop: 34,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: 64,
            animationDelay: '220ms',
          }}
        >
          <SSCCell
            k="誰能參加"
            v="13 歲以上，一個人報名"
            small="不能組隊。免費註冊 Apple 開發者帳號就能報"
          />
          <SSCCell
            k="得獎"
            v="一年 Apple Developer Program 會員"
            small="最頂尖的 Distinguished Winners 會被邀請到 Cupertino"
          />
          <SSCCell
            k="做什麼"
            v="用 Swift Playground 或 Xcode 做一個 App"
            small="3 分鐘內玩得完，不能用網路，內容要英文"
          />
          <SSCCell
            k="今年新規則"
            v="六個 Apple 平台都能做"
            small="iPhone、iPad、Mac、Vision Pro、Watch、TV"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ChallengeAsia: Page = () => (
  <div style={{ ...fill, background: '#000', color: '#fff' }}>
    <Style />
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div
        className="ace-fadeup"
        style={{ position: 'relative', width: 560, aspectRatio: '360 / 230' }}
      >
        <img
          src={asacBubbleTea}
          alt=""
          style={{
            position: 'absolute',
            width: '30%',
            left: '-20%',
            bottom: '-5%',
            transform: 'rotate(-15deg)',
          }}
        />
        <img
          src={asacGlobe}
          alt=""
          style={{
            position: 'absolute',
            width: '50%',
            right: 0,
            top: '4%',
            transform: 'rotate(-8deg)',
          }}
        />
        <img
          src={asacLogo}
          alt="Asia Student App Challenge 台灣"
          style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 'auto' }}
        />
      </div>
      <div
        className="ace-fadeup"
        style={{
          fontSize: 24,
          color: 'rgba(255, 255, 255, 0.62)',
          marginTop: 124,
          animationDelay: '100ms',
        }}
      >
        接下來的比賽 · 台灣
      </div>
      <p
        className="ace-fadeup"
        style={{ fontSize: 30, margin: '12px 0 0', animationDelay: '160ms' }}
      >
        規則跟 Apple 的一樣，但提早一個月交，先拿到回饋。
      </p>
      <div
        className="ace-fadeup"
        style={{
          width: 1300,
          marginTop: 30,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: 64,
          animationDelay: '220ms',
        }}
      >
        <SSCCell k="誰能參加" v="13 歲以上的台灣學生" small="沒寫過程式也可以，一樣只能一個人做" />
        <SSCCell k="報名" v="11/30 23:59 前" small="appchallenge.asia/tw" />
        <SSCCell k="開幕" v="11/19 18:00" small="逢甲大學人言大樓 10F" />
        <SSCCell
          k="交作品、頒獎"
          v="1/9～1/13 線上交，1/28 頒獎"
          small="每個人都會收到歷屆得獎者給的回饋"
        />
      </div>
    </div>
    <Footer />
  </div>
);

const ChallengeTimeline: Page = () => {
  const active = useIsActivePage();
  return (
    <SitePage>
      <Head
        label="兩個比賽怎麼接"
        title="一月先練一次，二月挑戰 Apple"
        sub="12/24 社課發表完，寒假就是做 App 的時間。"
      />
      <div
        key={active ? 'on' : 'off'}
        style={{ position: 'relative', width: 1600, marginTop: 190 }}
      >
        <div
          style={{
            position: 'absolute',
            top: 11,
            left: 160,
            right: 160,
            height: 4,
            borderRadius: 2,
            background: site.line,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 11,
            left: 160,
            right: 160,
            height: 4,
            borderRadius: 2,
            background: 'var(--osd-text)',
            transformOrigin: 'left',
            animation: 'siteGrowX 2.4s linear both',
          }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <AgendaItem i={0} time="11/19" title="開幕" body="Asia Student App Challenge" />
          <AgendaItem i={1} time="11/30" title="報名截止" body="appchallenge.asia/tw" />
          <AgendaItem i={2} time="1/9～1/13" title="交作品" body="Asia Student App Challenge" />
          <AgendaItem i={3} time="1/28" title="頒獎、拿回饋" body="逢甲大學" />
          <AgendaItem i={4} time="2/8～2/28" title="交給 Apple" body="Swift Student Challenge" />
        </div>
      </div>
    </SitePage>
  );
};

const Theme: Page = () => (
  <Frame>
    <HeroGlow />
    <HeroText label="下半學期的主題" title={theme.title} sub="">
      <p
        className="ace-fadeup"
        style={{
          fontSize: 34,
          color: site.muted,
          lineHeight: 1.5,
          maxWidth: 1300,
          margin: '0',
          animationDelay: '240ms',
        }}
      >
        <Clauses text={theme.sub} />
      </p>
    </HeroText>
  </Frame>
);

type Topic = { t: string; d: string; use: string };

const majors: {
  name: string;
  en: string;
  ref: string;
  refNote: string;
  topics: Topic[];
}[] = [
  {
    name: '商管、經濟',
    en: 'Business · Finance · Marketing · Economics',
    ref: 'CampusQuery',
    refNote: '用 AI 回答學校網站上找不到的問題',
    topics: [
      {
        t: '用發票看懂一個商圈',
        d: '挑一個你熟的地方，比較各行業的發票張數和金額，找出哪一類店最多人買、哪個月最旺，做成互動圖表。',
        use: '財政部統一發票開立統計',
      },
      {
        t: '開店選址顧問',
        d: '輸入想開的店（飲料店、早餐店），結合消費、人口和附近同業數量，推薦三個地點並說明理由。',
        use: '發票統計、戶政人口、Google 地圖',
      },
    ],
  },
  {
    name: '電腦、資料',
    en: 'Computer Science · Data Science · Statistics',
    ref: 'Pitch Coach',
    refNote: '上台簡報時即時給回饋',
    topics: [
      {
        t: '上學該幾點出門',
        d: '收集你家附近公車一週的到站紀錄，算出上學時段最常誤點的路線和站牌，告訴你今天要提早幾分鐘出門。',
        use: 'TDX 運輸資料平台',
      },
      {
        t: '學校公告過濾器',
        d: '把學校網站的公告抓下來，用 AI 分成考試、活動、獎學金，只通知跟你年級和社團有關的。',
        use: '學校網站、AI API',
      },
    ],
  },
  {
    name: '工程',
    en: 'Mechanical · Electrical · Biomedical · Civil',
    ref: 'MIT Maker Portfolio',
    refNote: '有人交電動卡丁車、義肢、太陽能電池',
    topics: [
      {
        t: '教室空氣監測',
        d: '用感測器量教室一整天的二氧化碳，超過 1000 ppm 提醒開窗，畫出一週曲線，看哪一節課最悶。',
        use: 'micro:bit 或 Arduino、CO₂ 感測器',
      },
      {
        t: '校園無障礙路線圖',
        d: '實際走一遍校園，量坡道、樓梯和電梯位置，做出輪椅和推車走得通的路線，標出哪裡需要改善。',
        use: '捲尺、手機、地圖工具',
      },
    ],
  },
  {
    name: '醫學、健康',
    en: 'Pre-med · Nursing · Public Health',
    ref: 'LAAS',
    refNote: '用 AR 輔助聽診肺音',
    topics: [
      {
        t: '長輩用藥小幫手',
        d: '拍下藥袋，用 AI 讀出藥名、劑量和吃藥時間，變成大字提醒，家人手機也同步收到有沒有吃。',
        use: '手機相機、AI 文字辨識',
      },
      {
        t: '運動傷害自我判斷',
        d: '問幾個問題（哪裡痛、怎麼受傷），告訴你該冰敷、休息還是去看醫生，每一個建議都要附資料來源。',
        use: '運動醫學衛教資料',
      },
    ],
  },
  {
    name: '生物、化學',
    en: 'Biology · Chemistry · Neuroscience',
    ref: 'BioDock AI',
    refNote: 'Congressional App Challenge 2024 冠軍',
    topics: [
      {
        t: '校園生物地圖',
        d: '拍下校園裡的植物、鳥和昆蟲，辨識後標在地圖上，連續記錄幾週，看看季節變化帶來哪些不同。',
        use: 'iNaturalist、AI 影像辨識',
      },
      {
        t: '實驗課前預演',
        d: '上實驗課前，先在網頁上一步一步模擬，像稀釋強酸要先加水還是先加酸，選錯就告訴你為什麼危險。',
        use: '化學課本的實驗',
      },
    ],
  },
  {
    name: '心理',
    en: 'Psychology · Cognitive Science',
    ref: 'Steady Hands',
    refNote: '幫手會抖的人穩定筆畫',
    topics: [
      {
        t: '考前焦慮紀錄',
        d: '每天花 30 秒記錄心情、睡眠和手機時間，兩週後幫你找出焦慮最跟哪一件事有關。',
        use: '自己和同學的紀錄',
      },
      {
        t: '手機通知專注力實驗',
        d: '做一個反應時間測驗，找同學在有通知和沒通知的情況下各測一次，比較結果，寫成一份小研究。',
        use: '網頁測驗、試算表',
      },
    ],
  },
  {
    name: '社會、政治、法律',
    en: 'Political Science · Sociology · Public Policy',
    ref: 'Civic AI Action Hub',
    refNote: 'Congressional App Challenge 2025 冠軍',
    topics: [
      {
        t: '政見並排比較',
        d: '把候選人的政見依教育、交通、住宅分類並排，讓第一次投票的人五分鐘就看懂誰主張什麼。',
        use: '中選會選舉公報',
      },
      {
        t: '打工權益問答',
        d: '高中生打工最常遇到的問題（時薪、加班、試用期），做成問答機器人，每個回答都附上法條。',
        use: '勞基法、勞動部資料',
      },
    ],
  },
  {
    name: '環境、永續',
    en: 'Environmental Science · Sustainability',
    ref: 'Asuo',
    refNote: '淹水時即時找避難路線',
    topics: [
      {
        t: '家庭避難計畫',
        d: '依家裡人數、有沒有長輩和寵物，產生避難包清單，並找出離家最近的避難收容處所和走法。',
        use: '政府避難收容處所資料',
      },
      {
        t: '營養午餐剩食追蹤',
        d: '記錄班上一個月每天剩多少、哪道菜最常剩，找出原因，提出能讓剩食變少的建議。',
        use: '自己記錄、試算表',
      },
    ],
  },
  {
    name: '教育、語言、人文',
    en: 'Education · Linguistics · History',
    ref: 'LeViola',
    refNote: '沒有琴也能練中提琴',
    topics: [
      {
        t: '台語情境對話',
        d: '設計點餐、問路、跟阿公阿嬤聊天等情境，可以聽發音、跟著唸，讓年輕人敢開口講台語。',
        use: '教育部臺灣台語常用詞辭典',
      },
      {
        t: '地方老故事地圖',
        d: '訪問家人或社區長輩，把老店、老地名背後的故事放上地圖，配上照片和錄音。',
        use: '訪談、地圖工具',
      },
    ],
  },
  {
    name: '設計、傳播、藝術',
    en: 'Design · Architecture · Communications · Film',
    ref: 'Hanafuda Tactics',
    refNote: '把日本花札做成手機遊戲',
    topics: [
      {
        t: '社團貼文產生器',
        d: '輸入活動名稱、時間、地點，自動排出符合社團風格的 IG 貼文和海報，有好幾種版型可以換。',
        use: 'Canva 或網頁',
      },
      {
        t: '校園聲音導覽',
        d: '錄下校園各角落的聲音和介紹，牆上貼 QR Code，新生和來參觀的人掃了就能聽。',
        use: '錄音、QR Code',
      },
    ],
  },
];

const Majors: Page = () => (
  <SitePage>
    <Head
      label="主題 · 先選科系"
      title="十類常見的美國大學科系"
      sub="選一個你以後想念的，跟選同一類的人坐一起。"
    />
    <div
      className="ace-fadeup"
      style={{
        width: 1600,
        marginTop: 52,
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 20,
        animationDelay: '200ms',
      }}
    >
      {majors.map((m, i) => (
        <div
          key={m.name}
          style={{
            height: 220,
            padding: '28px 26px',
            borderRadius: 26,
            background: site.surface,
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ fontSize: 22, color: site.muted, fontFamily: mono }}>
            {String(i + 1).padStart(2, '0')}
          </div>
          <div
            style={{
              fontSize: 29,
              fontWeight: 600,
              marginTop: 12,
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
            }}
          >
            {m.name}
          </div>
          <div style={{ fontSize: 19, color: site.muted, marginTop: 'auto', lineHeight: 1.45 }}>
            {m.en}
          </div>
        </div>
      ))}
    </div>
  </SitePage>
);

const TopicCard = ({ topic }: { topic: Topic }) => (
  <div
    style={{
      flex: 1,
      padding: '26px 32px 28px',
      borderRadius: 24,
      background: site.surface,
      textAlign: 'left',
    }}
  >
    <div style={{ fontSize: 31, fontWeight: 600 }}>{topic.t}</div>
    <div style={{ fontSize: 23, color: site.muted, lineHeight: 1.55, marginTop: 10 }}>
      <Clauses text={topic.d} />
    </div>
    <div style={{ fontSize: 20, color: site.blue, marginTop: 14 }}>用到：{topic.use}</div>
  </div>
);

const MajorTopics = ({ start }: { start: number }) => (
  <SitePage>
    <Head label={`主題 · 題目參考 ${start / 2 + 1}/5`} title="選一題做，或自己改得更好" />
    <div
      className="ace-fadeup"
      style={{
        width: 1640,
        marginTop: 36,
        display: 'flex',
        flexDirection: 'column',
        gap: 30,
        animationDelay: '200ms',
      }}
    >
      {majors.slice(start, start + 2).map((m, i) => (
        <div key={m.name}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 16,
              marginBottom: 14,
              textAlign: 'left',
            }}
          >
            <span style={{ fontSize: 22, color: site.faint, fontFamily: mono }}>
              {String(start + i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontSize: 36, fontWeight: 600 }}>{m.name}</span>
            <span style={{ marginLeft: 'auto', fontSize: 21, color: site.faint }}>
              別人做過：{m.ref}，{m.refNote}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 22 }}>
            {m.topics.map((t) => (
              <TopicCard key={t.t} topic={t} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </SitePage>
);

const MajorTopicsA: Page = () => <MajorTopics start={0} />;
const MajorTopicsB: Page = () => <MajorTopics start={2} />;
const MajorTopicsC: Page = () => <MajorTopics start={4} />;
const MajorTopicsD: Page = () => <MajorTopics start={6} />;
const MajorTopicsE: Page = () => <MajorTopics start={8} />;

const TeamRules: Page = () => (
  <SitePage>
    <Head label="組隊" title="1～4 個人，自己找" />
    <Rows>
      <TermRow k="人數" v="1～4 人一組" small="想一個人做也可以" />
      <TermRow
        k="要比 SSC 的人"
        v="請一人一組"
        small="Apple Swift Student Challenge 只收個人作品，不能組隊"
      />
      <TermRow k="怎麼找" v="找想念同一類科系的人" small="不一定要找最強的，要找會一起做完的" />
      <TermRow k="時間" v="5 分鐘內決定" />
      <TermRow k="組好之後" v="坐在一起，派一個人把名單給我" />
    </Rows>
  </SitePage>
);

const TeamUp: Page = () => (
  <Countdown
    seconds={300}
    label="組隊時間"
    title="去找隊友"
    doneTitle="時間到"
    hint="還沒找到的，先舉手，我幫你。"
    doneHint="坐回位子，跟隊友坐在一起。"
  />
);

const StepCard = ({
  n,
  title,
  body,
  delay,
}: {
  n: string;
  title: string;
  body: string;
  delay: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      flex: 1,
      background: site.surface,
      borderRadius: 28,
      padding: '44px 40px',
      textAlign: 'left',
      animationDelay: `${delay}ms`,
    }}
  >
    <div style={{ fontSize: 22, color: site.muted, fontFamily: mono }}>{n}</div>
    <div style={{ fontSize: 40, fontWeight: 600, marginTop: 14, lineHeight: 1.25 }}>{title}</div>
    <div style={{ fontSize: 26, color: site.muted, marginTop: 16, lineHeight: 1.55 }}>
      <Clauses text={body} />
    </div>
  </div>
);

const IdeaMethod: Page = () => (
  <SitePage>
    <Head label="想點子 · 三步" title="先找問題，不要先想 App" />
    <div style={{ display: 'flex', gap: 28, width: 1600, marginTop: 120 }}>
      <StepCard
        n="01 · 3 分鐘"
        title="寫下 3 件讓你煩的事"
        body="在主題範圍裡，最近什麼事讓你覺得麻煩？越具體越好。"
        delay={150}
      />
      <StepCard
        n="02 · 4 分鐘"
        title="挑一件，問五次為什麼"
        body="一直問到真正的原因。做到第三次通常就會發現，問題跟你一開始想的不一樣。"
        delay={300}
      />
      <StepCard
        n="03 · 3 分鐘"
        title="寫成一句話"
        body="我想幫＿＿＿＿解決＿＿＿＿，因為＿＿＿＿。"
        delay={450}
      />
    </div>
  </SitePage>
);

const IdeaTime: Page = () => (
  <Countdown
    seconds={600}
    label="想點子 · 10 分鐘"
    title="寫下 3 件事 → 問五次為什麼 → 寫成一句話"
    doneTitle="時間到"
    hint="我想幫＿＿＿＿解決＿＿＿＿，因為＿＿＿＿。"
    doneHint="把那一句話拍照存起來，下週要用。"
  />
);

const Closing: Page = () => (
  <Frame>
    <HeroGlow />
    <HeroText
      label="下週 11/19（四）· 一樣到教室，老師線上"
      title="UI/UX 與 AI"
      sub="帶著你那一句話來。"
    />
  </Frame>
);

export const meta: SlideMeta = {
  title: '2026/11/12 ACE Club Lesson 6 · 下半學期開始',
  theme: 'aurora',
  createdAt: '2026-11-11T12:00:00+08:00',
};

export default [
  Cover,
  Agenda,
  Recap,
  VoteRules,
  Vote,
  Winner,
  ConsolationPrize,
  Schedule,
  ChallengeSSC,
  ChallengeAsia,
  ChallengeTimeline,
  Theme,
  Majors,
  MajorTopicsA,
  MajorTopicsB,
  MajorTopicsC,
  MajorTopicsD,
  MajorTopicsE,
  TeamRules,
  TeamUp,
  IdeaMethod,
  IdeaTime,
  Closing,
] satisfies Page[];
