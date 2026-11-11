import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import { useEffect, useState } from 'react';

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
  title: '主題待公布',
  sub: '題目範圍會在這裡公布，你要在這個範圍裡找一個真的想解決的問題。',
};

const Cover: Page = () => (
  <Frame>
    <HeroGlow />
    <HeroText
      label="ACE Club · 2026.11.12（四）· 社課第六堂"
      title="第二學期，開始"
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
          <AgendaItem i={1} time="5 分鐘" title="這學期怎麼走" body="行程、比賽、主題" />
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
      label="上學期回顧 · ACE Pitch Day"
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
      <TermRow k="怎麼投" v="在紙上寫一個號碼，對折交上來" small="號碼就是上一頁的上台順序" />
      <TermRow k="不能投自己" v="有上台的人，不能寫自己的號碼" />
      <TermRow k="怎麼算" v="票數最多的拿第一名" small="同票由評審決定" />
      <TermRow k="獎品" v="Claude Team Premium 帳號一個月" />
    </Rows>
  </SitePage>
);

const Vote: Page = () => (
  <Countdown
    seconds={60}
    size={220}
    label="投票時間"
    title="寫下一個號碼"
    doneTitle="投票截止"
    hint="不能寫自己。寫好對折，傳到前面。"
    doneHint="筆放下，票交上來，現場開票。"
  >
    <div style={{ display: 'flex', gap: 16, marginTop: 44 }}>
      {founders.map((name, i) => (
        <div
          key={name}
          style={{
            width: 210,
            padding: '20px 0',
            borderRadius: 22,
            background: site.surface,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <div style={{ fontSize: 56, fontWeight: 500, lineHeight: 1 }}>{i + 1}</div>
          <div style={{ fontSize: 24, fontWeight: 600 }}>{name}</div>
        </div>
      ))}
    </div>
  </Countdown>
);

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
      <div style={{ fontSize: 30, color: 'rgba(255, 255, 255, 0.9)', marginTop: 22 }}>
        恭喜！請上台領獎。
      </div>
    </div>
  </Frame>
);

const kindStyle = {
  實體: { bg: 'rgba(46, 111, 224, 0.12)', fg: site.blue },
  線上: { bg: site.surface, fg: site.muted },
  不用到: { bg: 'transparent', fg: site.faint },
} as const;

const term2: { d: string; k: keyof typeof kindStyle; t: string; today?: boolean }[] = [
  { d: '11/12', k: '實體', t: '分組、創意發想', today: true },
  { d: '11/19', k: '線上', t: 'UI/UX、AI 應用' },
  { d: '11/26', k: '實體', t: '世界咖啡館、動手做' },
  { d: '12/3', k: '線上', t: '線上討論' },
  { d: '12/24', k: '實體', t: '發表日' },
  { d: '12/31', k: '不用到', t: '慶功日' },
];

const Schedule: Page = () => (
  <SitePage>
    <Head label="第二學期 · 六次社課" title="12/24 再上台一次" />
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
              color: s.k === '不用到' ? site.faint : undefined,
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
                border: s.k === '不用到' ? `1px solid ${site.line}` : 'none',
              }}
            >
              {s.k}
            </span>
          </div>
          <div style={{ fontSize: 32, color: s.k === '不用到' ? site.faint : undefined }}>
            {s.t}
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, color: site.blue }}>
            {s.today ? '今天' : ''}
          </div>
        </div>
      ))}
    </div>
  </SitePage>
);

const ChallengeSSC: Page = () => (
  <SitePage>
    <Head
      label="這學期的比賽 · Apple 官方"
      title="Swift Student Challenge"
      sub="Apple 每年辦給學生的 App 比賽。2027 年 2/8～2/28 交作品。"
    />
    <Rows>
      <TermRow k="誰能參加" v="13 歲以上的學生" small="免費註冊 Apple 開發者帳號就能報" />
      <TermRow
        k="做什麼"
        v="用 Swift Playground 或 Xcode 做一個 App"
        small="3 分鐘內玩得完，不能用網路，內容要英文"
      />
      <TermRow k="今年新規則" v="iPhone、iPad、Mac、Vision Pro、Watch、TV 都可以" />
      <TermRow k="幾個人" v="只能一個人做，不能組隊" />
      <TermRow
        k="得獎"
        v="一年 Apple Developer Program 會員"
        small="最頂尖的 Distinguished Winners 會被邀請到 Cupertino"
      />
    </Rows>
  </SitePage>
);

const ChallengeAsia: Page = () => (
  <SitePage>
    <Head
      label="這學期的比賽 · 台灣"
      title="Asia Student App Challenge"
      sub="規則跟 Apple 的一樣，但提早一個月交，先拿到回饋。"
    />
    <Rows>
      <TermRow k="誰能參加" v="13 歲以上的台灣學生" small="沒寫過程式也可以，一樣只能一個人做" />
      <TermRow k="報名" v="11/30 23:59 前" small="appchallenge.asia/tw" />
      <TermRow k="開幕" v="11/19 18:00，逢甲大學人言大樓 10F" />
      <TermRow k="交作品" v="2027/1/9～1/13，線上繳交" />
      <TermRow k="頒獎" v="1/28，逢甲大學" small="每個人都會收到歷屆得獎者給的回饋" />
    </Rows>
  </SitePage>
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
    <HeroText label="這學期的主題" title={theme.title} sub="">
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

const TeamRules: Page = () => (
  <SitePage>
    <Head label="組隊" title="1～4 個人，自己找" />
    <Rows>
      <TermRow k="人數" v="1～4 人一組" small="想一個人做也可以" />
      <TermRow k="怎麼找" v="找聊得來、時間對得上的人" small="不一定要找最強的，要找會一起做完的" />
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
    <HeroText label="下週 11/19（四）· 線上" title="UI/UX 與 AI" sub="帶著你那一句話來。" />
  </Frame>
);

export const meta: SlideMeta = {
  title: '2026/11/12 ACE Club Lesson 6 · 第二學期開始',
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
  Schedule,
  ChallengeSSC,
  ChallengeAsia,
  ChallengeTimeline,
  Theme,
  TeamRules,
  TeamUp,
  IdeaMethod,
  IdeaTime,
  Closing,
] satisfies Page[];
