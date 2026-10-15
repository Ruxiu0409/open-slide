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

const fonts = {
  mono: '"SF Mono", "JetBrains Mono", "Menlo", monospace',
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
@keyframes aceFade {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes aceCaret {
  0%, 60% { opacity: 1; }
  61%, 100% { opacity: 0; }
}
@keyframes aceGlow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
.ace-fadeup { animation: aceFadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) both; }
.ace-fade { animation: aceFade 800ms ease-out both; }
.ace-caret { animation: aceCaret 1.1s steps(1) infinite; }
.ace-glow { animation: aceGlow 5s ease-in-out infinite; }
@keyframes siteDrift {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-8px) rotate(-1deg); }
}
@keyframes siteFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
@keyframes siteBar {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.6); }
}
@keyframes sitePoint {
  0%, 100% { transform: rotate(0); }
  50% { transform: rotate(-12deg); }
}
@keyframes siteDrop {
  0% { transform: translateY(-8px); opacity: 0; }
  20% { opacity: 1; }
  70% { transform: translateY(14px); opacity: 1; }
  85%, 100% { transform: translateY(14px); opacity: 0; }
}
@keyframes siteBob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes siteGrowX {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@keyframes siteGrowY {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}
@keyframes siteDotOn {
  from { background: #FFFFFF; border-color: #E5E5E5; }
  to { background: #0D0D0D; border-color: #0D0D0D; }
}
@keyframes aceFlow {
  from { stroke-dashoffset: 28; }
  to { stroke-dashoffset: 0; }
}
.site-drift { animation: siteDrift 4s ease-in-out infinite; }
.site-float { animation: siteFloat 2.6s ease-in-out infinite; }
.site-bar { transform-box: fill-box; transform-origin: 50% 100%; animation: siteBar 2.4s ease-in-out infinite; }
.site-point { transform-box: fill-box; transform-origin: 0 100%; animation: sitePoint 2.4s ease-in-out infinite; }
.site-drop { animation: siteDrop 2.2s cubic-bezier(0.5, 0, 0.7, 1) infinite; }
.site-bob { animation: siteBob 2.4s ease-in-out infinite; }
`;

const Style = () => <style>{keyframes}</style>;

const site = {
  bg: '#FFFFFF',
  text: '#0D0D0D',
  muted: '#5D5D5D',
  faint: '#8F8F8F',
  line: '#E5E5E5',
  surface: '#F4F4F4',
  claude: '#D97757',
  blue: '#2E6FE0',
  cream: '#FAF9F5',
  billInk: '#2F4A2A',
  billFill: '#D5E2CF',
  yc: '#FB651E',
};

const siteFont =
  '"Inter", -apple-system, BlinkMacSystemFont, "PingFang TC", "Noto Sans TC", system-ui, sans-serif';

const Clauses = ({ text }: { text: string }) => (
  <>
    {text.split(/(?<=[，。、？！：])/).map((part) => (
      <span key={part} style={{ display: 'inline-block' }}>
        {part}
      </span>
    ))}
  </>
);

const SiteFooter = () => {
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
      <span>♠ ACE Pitch Day · pitch.tsaicy.dev</span>
      <span style={{ fontFamily: fonts.mono, letterSpacing: '0.04em' }}>
        {String(current).padStart(2, '0')}{' '}
        <span style={{ opacity: 0.45 }}>/ {String(total).padStart(2, '0')}</span>
      </span>
    </div>
  );
};

const SitePage = ({ children }: { children: React.ReactNode }) => (
  <div style={{ ...fill, background: site.bg, color: site.text, fontFamily: siteFont }}>
    <Style />
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
    <SiteFooter />
  </div>
);

const SiteHead = ({
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

const PresenterArt = ({ height }: { height: number }) => (
  <svg
    viewBox="0 0 160 100"
    style={{ height, width: 'auto', overflow: 'visible' }}
    aria-hidden="true"
  >
    <rect
      x="58"
      y="8"
      width="92"
      height="60"
      rx="6"
      fill="#fff"
      stroke={site.text}
      strokeWidth="2"
    />
    <rect className="site-bar" x="72" y="44" width="10" height="14" rx="2" fill="#C9D8FF" />
    <rect
      className="site-bar"
      x="88"
      y="34"
      width="10"
      height="24"
      rx="2"
      fill="#8FB4FF"
      style={{ animationDelay: '.2s' }}
    />
    <rect
      className="site-bar"
      x="104"
      y="26"
      width="10"
      height="32"
      rx="2"
      fill={site.blue}
      style={{ animationDelay: '.4s' }}
    />
    <rect
      className="site-bar"
      x="120"
      y="18"
      width="10"
      height="40"
      rx="2"
      fill={site.claude}
      style={{ animationDelay: '.6s' }}
    />
    <path
      className="site-point"
      d="M44 62 L60 48"
      stroke={site.blue}
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path d="M14 94 Q14 54 30 54 Q46 54 46 94 Z" fill={site.blue} />
    <circle cx="30" cy="36" r="10" fill={site.text} />
    <rect x="98" y="76" width="52" height="18" rx="9" fill={site.text} />
    <text x="124" y="89" fontSize="11" fontWeight="600" fill="#fff" textAnchor="middle">
      3:00
    </text>
  </svg>
);

const BillBackArt = ({ height, n }: { height: number; n: number }) => (
  <svg
    viewBox="0 0 160 100"
    style={{ height, width: 'auto', overflow: 'visible' }}
    aria-hidden="true"
  >
    <g transform="rotate(-6 80 50)">
      <rect
        x="22"
        y="16"
        width="116"
        height="68"
        rx="5"
        fill={site.billFill}
        stroke={site.billInk}
        strokeWidth="1.5"
      />
      <rect
        x="28"
        y="22"
        width="104"
        height="56"
        rx="3"
        fill="none"
        stroke={site.billInk}
        strokeOpacity=".35"
      />
      <text
        x="80"
        y="66"
        fontSize="40"
        fontWeight="700"
        fill={site.text}
        textAnchor="middle"
        style={{ fontFamily: '"Bradley Hand", "Marker Felt", "Comic Sans MS", cursive' }}
      >
        {n}
      </text>
    </g>
    <g className="site-float">
      <g transform="rotate(35 128 30)">
        <rect x="112" y="24" width="40" height="10" rx="2" fill={site.claude} />
        <rect x="146" y="24" width="6" height="10" rx="1" fill={site.line} />
        <path d="M112 24 L102 29 L112 34 Z" fill="#F2D3B8" />
        <path d="M105 27.5 L102 29 L105 30.5 Z" fill={site.text} />
      </g>
    </g>
  </svg>
);

const TargetIcon = () => (
  <svg viewBox="0 0 64 64" style={{ width: 96, height: 96 }} aria-hidden="true">
    <circle cx="30" cy="34" r="26" fill="#fff" stroke={site.text} strokeWidth="2" />
    <circle cx="30" cy="34" r="16" fill="none" stroke={site.text} strokeWidth="2" />
    <circle cx="30" cy="34" r="7" fill={site.claude} />
    <path
      d="M31 33 L56 8 M48 6 L58 6 L58 16"
      fill="none"
      stroke={site.text}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SolveIcon = () => (
  <svg viewBox="0 13 64 36" style={{ width: 96, height: 54 }} aria-hidden="true">
    <rect
      x="3"
      y="20"
      width="22"
      height="22"
      rx="5"
      fill="#fff"
      stroke={site.text}
      strokeWidth="2"
    />
    <path
      d="M8 34 Q11 24 14 32 T20 28"
      fill="none"
      stroke={site.muted}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M28 31 H38 M34 27 L38 31 L34 35"
      fill="none"
      stroke={site.text}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="51" cy="31" r="11" fill={site.blue} />
    <path
      d="M46 31 L50 35 L57 27"
      fill="none"
      stroke="#fff"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LaptopIcon = () => (
  <svg viewBox="0 0 64 64" style={{ width: 96, height: 96 }} aria-hidden="true">
    <rect
      x="10"
      y="14"
      width="44"
      height="30"
      rx="3"
      fill="#fff"
      stroke={site.text}
      strokeWidth="2"
    />
    <path d="M4 48 H60 L56 53 H8 Z" fill={site.text} />
    <path d="M28 22 L38 29 L28 36 Z" fill={site.claude} />
  </svg>
);

const BulbIcon = () => (
  <svg viewBox="0 0 64 64" style={{ width: 96, height: 96 }} aria-hidden="true">
    <path
      d="M32 4 V9 M12 12 L16 16 M52 12 L48 16 M5 30 H10 M59 30 H54"
      stroke={site.claude}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="32" cy="30" r="14" fill="#fff" stroke={site.text} strokeWidth="2" />
    <path
      d="M27 34 L32 26 L37 34"
      fill="none"
      stroke={site.claude}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect x="26" y="44" width="12" height="9" rx="2" fill={site.text} />
  </svg>
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

const AgendaItem = ({
  i,
  time,
  title,
  body,
  children,
}: {
  i: number;
  time: string;
  title: string;
  body: string;
  children?: React.ReactNode;
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
        background: site.bg,
        boxSizing: 'border-box',
        animation: `siteDotOn 300ms ease-out ${i * 0.8}s both`,
      }}
    />
    <div
      className="ace-fadeup"
      style={{
        animationDelay: `${i * 0.8 + 0.1}s`,
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
      {children}
    </div>
  </div>
);

const SplitSeg = ({ delay, color = site.text }: { delay: number; color?: string }) => (
  <div
    style={{ flex: 1, height: 12, borderRadius: 6, background: site.surface, overflow: 'hidden' }}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        background: color,
        transformOrigin: 'left',
        animation: `siteGrowX 400ms ease-out ${delay}s both`,
      }}
    />
  </div>
);

const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
    <span style={{ width: 12, height: 12, borderRadius: '50%', background: color }} />
    {label}
  </span>
);

const CriteriaCard = ({
  n,
  icon,
  title,
  body,
  delay,
}: {
  n: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  delay: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      background: site.surface,
      borderRadius: 28,
      padding: '32px 40px',
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      textAlign: 'left',
      animationDelay: `${delay}ms`,
    }}
  >
    <div
      className="site-drift"
      style={{
        width: 96,
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'center',
        animationDelay: `${delay / 1000}s`,
      }}
    >
      {icon}
    </div>
    <div>
      <div style={{ fontSize: 20, color: site.muted }}>{n}</div>
      <div style={{ fontSize: 34, fontWeight: 600, marginTop: 6 }}>{title}</div>
      <div style={{ fontSize: 23, color: site.muted, marginTop: 8, lineHeight: 1.5 }}>
        <Clauses text={body} />
      </div>
    </div>
  </div>
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

const SiteAgenda: Page = () => {
  const active = useIsActivePage();
  return (
    <SitePage>
      <SiteHead
        label="議程"
        title="路演當天怎麼進行"
        sub="全程約 30 分鐘，計時器會跟著投影片跑。"
      />
      <div
        key={active ? 'on' : 'off'}
        style={{ position: 'relative', width: 1600, marginTop: 110 }}
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
            background: site.text,
            transformOrigin: 'left',
            animation: 'siteGrowX 2.4s linear both',
          }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <AgendaItem i={0} time="2 分鐘" title="開場" body="領取資本、抽路演順序" />
          <AgendaItem i={1} time="每人 4 分鐘" title="創辦人路演" body="3 分鐘 Pitch + 1 分鐘提問">
            <div style={{ display: 'flex', gap: 6, width: 300, marginTop: 22 }}>
              <SplitSeg delay={1.1} />
              <SplitSeg delay={1.5} />
              <SplitSeg delay={1.9} />
              <SplitSeg delay={2.3} color={site.blue} />
            </div>
            <div
              style={{ display: 'flex', gap: 24, marginTop: 14, fontSize: 20, color: site.muted }}
            >
              <LegendDot color={site.text} label="路演" />
              <LegendDot color={site.blue} label="提問" />
            </div>
          </AgendaItem>
          <AgendaItem i={2} time="4 分鐘" title="開放注資" body="把資金投進你看好的新創" />
          <AgendaItem i={3} time="4 分鐘" title="結算募資、頒獎" body="募資金額最高者勝出" />
        </div>
      </div>
    </SitePage>
  );
};

const SiteBill: Page = () => (
  <SitePage>
    <SiteHead
      label="開場 · 領取資本"
      title="拆開信封，看看你的資本"
      sub="有人多、有人少。不用告訴別人，路演全部結束才能投。"
    />
    <div
      className="ace-fadeup"
      style={{
        marginTop: 56,
        width: 1400,
        height: 500,
        borderRadius: 36,
        background:
          'radial-gradient(60% 80% at 30% 20%, #DFE8FB 0%, transparent 70%), radial-gradient(60% 80% at 80% 90%, #F6E6D8 0%, transparent 70%), #F4F4F4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animationDelay: '200ms',
      }}
    >
      <div className="site-drift">
        <div
          style={{
            position: 'relative',
            width: 720,
            height: 327,
            borderRadius: 18,
            background: 'linear-gradient(135deg, #E8EFE3 0%, #D5E2CF 100%)',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.14)',
            padding: '30px 38px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: site.billInk,
            transform: 'rotate(-4deg)',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 14,
              border: '2.5px solid rgba(47, 74, 42, 0.35)',
              borderRadius: 10,
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: '0.12em',
            }}
          >
            <span>ACE CLUB</span>
            <span>NO. ????</span>
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 600,
              textAlign: 'center',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            <span style={{ filter: 'blur(16px)' }}>1,000,000</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: '0.12em',
            }}
          >
            <span>ACE 幣</span>
            <span style={{ fontSize: 46 }}>♠</span>
          </div>
        </div>
      </div>
    </div>
  </SitePage>
);

const SiteCriteria: Page = () => (
  <SitePage>
    <SiteHead
      label="聽路演的時候"
      title="邊聽邊想這四題"
      sub={
        <>
          天使投資人押的是最早期的點子。
          <br />
          這輪比的是解決問題，不是開公司。不用商業模式，也不用估市場規模、算營收。
        </>
      }
    />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 20,
        width: 1600,
        marginTop: 56,
      }}
    >
      <CriteriaCard
        n="01 · 痛點"
        icon={<TargetIcon />}
        title="這個痛點是真的嗎？"
        body="你或身邊的人真的遇過嗎？講得出是誰卡住，最有說服力。"
        delay={200}
      />
      <CriteriaCard
        n="02 · 解法"
        icon={<SolveIcon />}
        title="它真的解決了嗎？"
        body="用了這個作品，原本麻煩的事有變簡單嗎？"
        delay={280}
      />
      <CriteriaCard
        n="03 · MVP"
        icon={<LaptopIcon />}
        title="MVP 現在就能用嗎？"
        body="能在台上動起來，勝過只放投影片。小而完整，勝過大而未完成。"
        delay={360}
      />
      <CriteriaCard
        n="04 · 差異化"
        icon={<BulbIcon />}
        title="它的差異化在哪？"
        body="切入角度、做法或細節，有沒有你沒想到的？"
        delay={440}
      />
    </div>
  </SitePage>
);

const SitePrize: Page = () => (
  <div style={{ ...fill, background: site.bg, color: site.text, fontFamily: siteFont }}>
    <Style />
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
        本輪募資第一名
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
      <div
        style={{
          marginTop: 30,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 14,
          height: 60,
          padding: '0 28px',
          borderRadius: 999,
          background: 'rgba(255, 255, 255, 0.18)',
          fontSize: 28,
          fontWeight: 500,
        }}
      >
        價值約 NT$4,000
        <span style={{ fontSize: 22, color: 'rgba(255, 255, 255, 0.8)' }}>US$125 / 月</span>
      </div>
    </div>
    <SiteFooter />
  </div>
);

const founderCount = 5;
const pitchSeconds = 180;
const qaSeconds = 60;
const investSeconds = 240;

const founderSlots = Array.from({ length: founderCount }, (_, i) => i + 1);

const siteFill = { ...fill, background: site.bg, color: site.text, fontFamily: siteFont };

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

const Bar = ({ flex, progress, color }: { flex: number; progress: number; color: string }) => (
  <div style={{ flex, height: 14, borderRadius: 7, background: site.surface, overflow: 'hidden' }}>
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

const ClockFace = ({ children, color }: { children: string; color: string }) => (
  <div
    style={{
      fontSize: 360,
      fontWeight: 500,
      letterSpacing: '-0.05em',
      lineHeight: 1,
      fontVariantNumeric: 'tabular-nums',
      color,
      transition: 'color 400ms ease',
    }}
  >
    {children}
  </div>
);

const Phase = ({ children, color }: { children: string; color: string }) => (
  <div
    key={children}
    className="ace-fadeup"
    style={{
      fontSize: 60,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      marginTop: 14,
      color,
    }}
  >
    {children}
  </div>
);

const Hint = ({ children }: { children: string }) => (
  <p
    key={children}
    className="ace-fadeup"
    style={{ fontSize: 30, color: site.muted, margin: '40px 0 0', lineHeight: 1.5 }}
  >
    {children}
  </p>
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
  titleSize = 190,
  children,
}: {
  label: string;
  title: string;
  sub: string;
  titleSize?: number;
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
        fontSize: titleSize,
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

const CenterStack = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 110,
    }}
  >
    {children}
  </div>
);

const Cover: Page = () => (
  <div style={siteFill}>
    <Style />
    <HeroGlow />
    <HeroText
      label="ACE Club 天使輪 · 2026.10.15（四）· 社課第五堂"
      title="ACE Pitch Day"
      sub="三分鐘，讓全場為你全押。"
    >
      <div
        className="ace-fadeup"
        style={{
          marginTop: 40,
          display: 'inline-flex',
          alignItems: 'center',
          height: 62,
          padding: '0 30px',
          borderRadius: 999,
          background: site.text,
          color: '#fff',
          fontSize: 27,
          fontWeight: 500,
          animationDelay: '280ms',
        }}
      >
        今天台下每個人都是天使投資人
      </div>
    </HeroText>
    <SiteFooter />
  </div>
);

const DrawOrder: Page = () => {
  const gap = 24;
  const width = Math.min(260, (1600 - gap * (founderCount - 1)) / founderCount);
  return (
    <SitePage>
      <SiteHead
        label="開場 · 抽籤"
        title="抽路演順序"
        sub="抽到幾號，就第幾個上台。抽完記住自己的號碼。"
      />
      <div style={{ display: 'flex', gap, marginTop: 72 }}>
        {founderSlots.map((n) => (
          <div
            key={n}
            className="ace-fadeup"
            style={{
              width,
              height: 340,
              borderRadius: 28,
              background: site.surface,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 18,
              animationDelay: `${120 + n * 80}ms`,
            }}
          >
            <div
              className="site-drift"
              style={{
                fontSize: 150,
                fontWeight: 500,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                animationDelay: `${n * 0.3}s`,
              }}
            >
              {n}
            </div>
            <div style={{ fontSize: 24, color: site.muted }}>第 {n} 位上台</div>
          </div>
        ))}
      </div>
    </SitePage>
  );
};

const InvestorTerms: Page = () => (
  <SitePage>
    <SiteHead label="投資人守則" title="投資之前，先看這五條" />
    <div
      className="ace-fadeup"
      style={{
        width: 1100,
        marginTop: 48,
        borderTop: `1px solid ${site.line}`,
        animationDelay: '200ms',
      }}
    >
      <TermRow k="注資時機" v="所有路演結束才開放注資" small="聽的時候，先記下你想投誰" />
      <TermRow k="不能投自己" v="不能寫自己的號碼" />
      <TermRow
        k="怎麼投"
        v="在鈔票背面寫上創辦人的號碼"
        small="全押一家，或分成幾張投給不同人都可以"
      />
      <TermRow k="提問" v="每位路演完有 1 分鐘，舉手發問" />
      <TermRow k="同分" v="由評審決定" />
    </div>
  </SitePage>
);

const PitchDivider: Page = () => (
  <SitePage>
    <CenterStack>
      <div className="ace-fadeup" style={{ fontSize: 28, color: site.muted }}>
        {founderCount} 位創辦人 · 每人 3 分鐘路演 + 1 分鐘提問
      </div>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 140,
          fontWeight: 600,
          letterSpacing: '-0.035em',
          lineHeight: 1.05,
          margin: '28px 0 0',
          animationDelay: '120ms',
        }}
      >
        路演開始
      </h1>
    </CenterStack>
  </SitePage>
);

const OnDeck = ({ n }: { n: number }) => (
  <SitePage>
    <CenterStack>
      <div className="site-drift">
        <PresenterArt height={200} />
      </div>
      <div className="ace-fadeup" style={{ fontSize: 28, color: site.muted, marginTop: 44 }}>
        下一位 · {n} / {founderCount}
      </div>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 160,
          fontWeight: 600,
          letterSpacing: '-0.035em',
          lineHeight: 1.05,
          margin: '20px 0 0',
          animationDelay: '120ms',
        }}
      >
        第 {n} 位創辦人
      </h1>
      <p
        className="ace-fadeup"
        style={{ fontSize: 30, color: site.muted, margin: '30px 0 0', animationDelay: '200ms' }}
      >
        接好設備、打開網站。準備好了，翻下一頁就開始計時。
      </p>
    </CenterStack>
  </SitePage>
);

const PitchTimer = ({ n }: { n: number }) => {
  const elapsed = useElapsed(pitchSeconds + qaSeconds);
  const phase =
    elapsed < pitchSeconds ? 'pitch' : elapsed < pitchSeconds + qaSeconds ? 'qa' : 'done';
  const left = phase === 'pitch' ? pitchSeconds - elapsed : pitchSeconds + qaSeconds - elapsed;
  const warn = phase === 'pitch' && left <= 30;
  const color = phase === 'qa' ? site.blue : warn || phase === 'done' ? site.claude : site.text;
  const copy = {
    pitch: {
      title: '路演',
      hint: warn ? '最後 30 秒，準備收尾。' : '三分鐘，時間到就停。',
    },
    qa: { title: '投資人提問', hint: '想問的舉手，創辦人回答。' },
    done: { title: '時間到', hint: `掌聲送給第 ${n} 位創辦人。` },
  }[phase];
  return (
    <SitePage>
      <div className="ace-fadeup" style={{ fontSize: 28, color: site.muted }}>
        第 {n} 位創辦人 · {n} / {founderCount}
      </div>
      <Phase color={color}>{copy.title}</Phase>
      <div style={{ marginTop: 30 }}>
        <ClockFace color={color}>{clock(left)}</ClockFace>
      </div>
      <div style={{ display: 'flex', gap: 10, width: 1400, marginTop: 56 }}>
        <Bar flex={pitchSeconds} progress={elapsed / pitchSeconds} color={site.text} />
        <Bar flex={qaSeconds} progress={(elapsed - pitchSeconds) / qaSeconds} color={site.blue} />
      </div>
      <div
        style={{
          display: 'flex',
          gap: 10,
          width: 1400,
          marginTop: 14,
          fontSize: 22,
          color: site.muted,
          textAlign: 'left',
        }}
      >
        <span style={{ flex: pitchSeconds }}>路演 3:00</span>
        <span style={{ flex: qaSeconds }}>提問 1:00</span>
      </div>
      <Hint>{copy.hint}</Hint>
    </SitePage>
  );
};

const founderPages: Page[] = founderSlots.flatMap((n) => [
  () => <OnDeck n={n} />,
  () => <PitchTimer n={n} />,
]);

const Invest: Page = () => {
  const elapsed = useElapsed(investSeconds);
  const done = elapsed >= investSeconds;
  const color = done ? site.claude : site.text;
  return (
    <SitePage>
      <div className="ace-fadeup" style={{ fontSize: 28, color: site.muted }}>
        路演全部結束
      </div>
      <Phase color={color}>{done ? '注資截止' : '開放注資'}</Phase>
      <div style={{ display: 'flex', alignItems: 'center', gap: 80, marginTop: 30 }}>
        <BillBackArt height={260} n={3} />
        <ClockFace color={color}>{clock(investSeconds - elapsed)}</ClockFace>
      </div>
      <div style={{ display: 'flex', width: 1400, marginTop: 56 }}>
        <Bar flex={1} progress={elapsed / investSeconds} color={site.claude} />
      </div>
      <Hint>
        {done
          ? '筆放下，寫好的鈔票交上來。'
          : '在鈔票背面寫上你要投的創辦人號碼。可以全押、可以分散，就是不能寫自己。'}
      </Hint>
    </SitePage>
  );
};

const Tally: Page = () => (
  <SitePage>
    <SiteHead
      label="結算"
      title="照號碼加總 ACE 幣"
      sub="翻到背面看號碼，分堆加起來。募到最多的勝出，同分由評審決定。"
    />
    <div style={{ display: 'flex', gap: 24, width: 1600, marginTop: 64 }}>
      {founderSlots.map((n) => (
        <div
          key={n}
          className="ace-fadeup"
          style={{
            flex: 1,
            background: site.surface,
            borderRadius: 28,
            padding: '36px 20px 40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animationDelay: `${120 + n * 80}ms`,
          }}
        >
          <BillBackArt height={120} n={n} />
          <div style={{ fontSize: 32, fontWeight: 600, marginTop: 24 }}>第 {n} 位</div>
          <div style={{ fontSize: 24, color: site.muted, marginTop: 10 }}>
            <span style={{ display: 'inline-block', filter: 'blur(8px)' }}>888,888</span> ACE 幣
          </div>
        </div>
      ))}
    </div>
  </SitePage>
);

const Closing: Page = () => (
  <div style={siteFill}>
    <Style />
    <HeroGlow />
    <HeroText
      label="ACE Pitch Day · 2026.10.15"
      title="謝謝每一位創辦人"
      titleSize={150}
      sub="今天被問倒的地方，就是下一版要改的。"
    />
    <SiteFooter />
  </div>
);

export const meta: SlideMeta = {
  title: '2026/10/15 ACE Club Lesson 5 · ACE Pitch Day',
  theme: 'aurora',
  createdAt: '2026-10-15T12:00:00+08:00',
};

export default [
  Cover,
  SiteAgenda,
  SiteBill,
  DrawOrder,
  InvestorTerms,
  SiteCriteria,
  PitchDivider,
  ...founderPages,
  Invest,
  Tally,
  SitePrize,
  Closing,
] satisfies Page[];
