import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import { useEffect, useState } from 'react';

export const design: DesignSystem = {
  palette: { bg: '#F5F5F7', text: '#1D1D1F', accent: '#2E6FE0' },
  fonts: {
    display: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif',
  },
  typeScale: { hero: 112, body: 28 },
  radius: 18,
};

const palette = {
  bg: '#F5F5F7',
  surface: '#FFFFFF',
  surfaceHi: '#F5F5F7',
  border: '#E8E8ED',
  chipBorder: '#D2D2D7',
  text: '#1D1D1F',
  muted: '#6E6E73',
  accent: '#2E6FE0',
  accentSoft: 'rgba(46, 111, 224, 0.1)',
  ink: '#1D1D1F',
  inkBorder: '#3A3A3C',
  inkText: '#F5F5F7',
  inkMuted: '#98989D',
  inkGreen: '#5AC8A8',
};

const fonts = {
  sans: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif',
  mono: '"SF Mono", "JetBrains Mono", "Menlo", monospace',
};

const cardShadow = '0 8px 28px rgba(0, 0, 0, 0.07)';

const accentGrad = 'linear-gradient(135deg, #8AA2C6 0%, #4A80DB 50%, #2E6FE0 100%)';

const gradText = {
  backgroundImage: accentGrad,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

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
`;

const Style = () => <style>{keyframes}</style>;

const Glow = ({
  x = '50%',
  y = '50%',
  size = 1200,
  opacity = 0.28,
}: {
  x?: string;
  y?: string;
  size?: number;
  opacity?: number;
}) => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      transform: 'translate(-50%, -50%)',
      opacity,
      pointerEvents: 'none',
    }}
  >
    <div
      className="ace-glow"
      style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, var(--osd-accent) 0%, transparent 60%)',
        filter: 'blur(40px)',
      }}
    />
  </div>
);

const AceMark = ({ size = 64 }: { size?: number }) => (
  <div
    style={{
      position: 'relative',
      width: size,
      height: size,
      borderRadius: size * 0.24,
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 6px 18px rgba(46, 111, 224, 0.2)',
      flexShrink: 0,
    }}
  >
    <span
      style={{
        position: 'absolute',
        top: size * 0.08,
        left: size * 0.14,
        fontFamily: fonts.mono,
        fontSize: size * 0.2,
        fontWeight: 700,
        ...gradText,
        lineHeight: 1,
      }}
    >
      A
    </span>
    <span style={{ fontSize: size * 0.48, ...gradText, lineHeight: 1 }}>♠</span>
  </div>
);

const Eyebrow = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div
    className="ace-fadeup"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 18px',
      borderRadius: 999,
      border: `1px solid ${palette.border}`,
      background: palette.surface,
      fontSize: 21,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: palette.muted,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
      animationDelay: `${delay}ms`,
    }}
  >
    <span style={{ color: 'var(--osd-accent)', fontSize: 20, lineHeight: 1 }}>♠</span>
    {children}
  </div>
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
        color: palette.muted,
        fontFamily: fonts.mono,
        letterSpacing: '0.04em',
      }}
    >
      <span>ACE Club · 社課 Lesson 04</span>
      <span>
        {String(current).padStart(2, '0')}{' '}
        <span style={{ opacity: 0.45 }}>/ {String(total).padStart(2, '0')}</span>
      </span>
    </div>
  );
};

const Heading = ({ children, delay = 120 }: { children: React.ReactNode; delay?: number }) => (
  <h2
    className="ace-fadeup"
    style={{
      fontSize: 64,
      fontWeight: 800,
      margin: '26px 0 40px',
      lineHeight: 1.12,
      letterSpacing: '-0.02em',
      animationDelay: `${delay}ms`,
    }}
  >
    {children}
  </h2>
);

const FootNote = ({ children, delay = 620 }: { children: React.ReactNode; delay?: number }) => (
  <p
    className="ace-fadeup"
    style={{
      fontSize: 22,
      color: palette.muted,
      marginTop: 36,
      lineHeight: 1.5,
      animationDelay: `${delay}ms`,
    }}
  >
    {children}
  </p>
);

const Card = ({
  children,
  delay = 0,
  primary = false,
}: {
  children: React.ReactNode;
  delay?: number;
  primary?: boolean;
}) => (
  <div
    className="ace-fadeup"
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '30px 30px 34px',
      borderRadius: 'var(--osd-radius)',
      background: primary ? palette.accentSoft : palette.surface,
      border: `1px solid ${primary ? 'rgba(46, 111, 224, 0.28)' : palette.border}`,
      boxShadow: cardShadow,
      animationDelay: `${delay}ms`,
    }}
  >
    {children}
  </div>
);

const CardTag = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontFamily: fonts.mono,
      fontSize: 16,
      letterSpacing: '0.12em',
      color: 'var(--osd-accent)',
      textTransform: 'uppercase',
      marginTop: 8,
    }}
  >
    {children}
  </div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 33, fontWeight: 700, marginTop: 10, letterSpacing: '-0.01em' }}>
    {children}
  </div>
);

const CardBody = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 23, color: palette.muted, marginTop: 14, lineHeight: 1.55 }}>
    {children}
  </div>
);

const BigNum = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{ fontFamily: fonts.mono, fontSize: 42, fontWeight: 700, lineHeight: 1, ...gradText }}
  >
    {children}
  </div>
);

const Terminal = ({ children }: { children: React.ReactNode }) => (
  <div
    className="ace-fadeup"
    style={{
      borderRadius: 'var(--osd-radius)',
      background: palette.ink,
      border: `1px solid ${palette.inkBorder}`,
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.22)',
      padding: '34px 38px',
      fontFamily: fonts.mono,
      fontSize: 25,
      lineHeight: 1.7,
      color: palette.inkText,
      animationDelay: '260ms',
    }}
  >
    {children}
  </div>
);

const TermLine = ({
  sign,
  children,
  dim = false,
}: {
  sign: string;
  children: React.ReactNode;
  dim?: boolean;
}) => (
  <div style={{ display: 'flex', gap: 16, color: dim ? palette.inkMuted : palette.inkText }}>
    <span style={{ color: palette.inkGreen, flexShrink: 0 }}>{sign}</span>
    <span>{children}</span>
  </div>
);

const Centered = ({ children, glowY = '50%' }: { children: React.ReactNode; glowY?: string }) => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y={glowY} size={1600} opacity={0.32} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 160px',
      }}
    >
      {children}
    </div>
    <Footer />
  </div>
);

const Divider = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <Centered>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h1
      className="ace-fadeup"
      style={{
        fontSize: 116,
        fontWeight: 800,
        margin: '34px 0 0',
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
        ...gradText,
        animationDelay: '140ms',
      }}
    >
      {title}
    </h1>
  </Centered>
);

const Quote = ({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) => (
  <div
    style={{
      fontSize: 27,
      marginTop: 16,
      color: muted ? palette.muted : palette.text,
      lineHeight: 1.55,
    }}
  >
    {children}
  </div>
);

const useCountUp = (target: number, delay: number) => {
  const active = useIsActivePage();
  const [n, setN] = useState(target);
  useEffect(() => {
    if (!active || target <= 1) {
      setN(target);
      return;
    }
    setN(1);
    const duration = target <= 10 ? 900 : 1500;
    const start = performance.now() + delay;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / duration, 0), 1);
      const eased = 1 - (1 - t) ** 3;
      setN(Math.round(1 + (target - 1) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, delay]);
  return n;
};

const Stat = ({
  value,
  unit,
  size = 440,
  dim = false,
  delay = 120,
}: {
  value: string;
  unit?: string;
  size?: number;
  dim?: boolean;
  delay?: number;
}) => {
  const n = useCountUp(Number(value), delay);
  const numStyle = {
    fontSize: size,
    letterSpacing: '-0.05em',
    fontVariantNumeric: 'tabular-nums',
    paddingRight: '0.05em',
  } as const;
  return (
    <div
      className="ace-fadeup"
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        gap: size * 0.04,
        fontFamily: fonts.sans,
        fontWeight: 800,
        lineHeight: 0.9,
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Invisible final value reserves the width so the unit doesn't shift while counting. */}
      <span style={{ position: 'relative', display: 'inline-block' }}>
        <span style={{ ...numStyle, visibility: 'hidden' }}>{value}</span>
        <span
          style={{
            ...numStyle,
            position: 'absolute',
            right: 0,
            bottom: 0,
            ...(dim ? { color: palette.text } : gradText),
          }}
        >
          {n}
        </span>
      </span>
      {unit && (
        <span style={{ fontSize: Math.max(size * 0.2, 40), color: palette.text, letterSpacing: 0 }}>
          {unit}
        </span>
      )}
    </div>
  );
};

const StatCaption = ({ children, delay = 240 }: { children: React.ReactNode; delay?: number }) => (
  <p
    className="ace-fadeup"
    style={{
      fontSize: 34,
      fontWeight: 600,
      color: palette.text,
      margin: '48px 0 0',
      lineHeight: 1.45,
      animationDelay: `${delay}ms`,
    }}
  >
    {children}
  </p>
);

const StatNote = ({ children, delay = 320 }: { children: React.ReactNode; delay?: number }) => (
  <p
    className="ace-fadeup"
    style={{
      fontSize: 24,
      color: palette.muted,
      margin: '18px 0 0',
      lineHeight: 1.5,
      animationDelay: `${delay}ms`,
    }}
  >
    {children}
  </p>
);

const StatLabel = ({
  title,
  body,
  accent = false,
}: {
  title: string;
  body?: string;
  accent?: boolean;
}) => (
  <div style={{ marginTop: 28, textAlign: 'center' }}>
    <div
      style={{
        fontSize: 36,
        fontWeight: 700,
        color: accent ? 'var(--osd-accent)' : palette.text,
      }}
    >
      {title}
    </div>
    {body && (
      <div style={{ fontSize: 22, color: palette.muted, marginTop: 10, lineHeight: 1.5 }}>
        {body}
      </div>
    )}
  </div>
);

const Cover: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="28%" y="42%" size={1300} opacity={0.3} />
    <div
      className="ace-fade"
      style={{
        position: 'absolute',
        top: 56,
        right: 120,
        fontFamily: fonts.mono,
        fontSize: 21,
        color: palette.muted,
        letterSpacing: '0.04em',
      }}
    >
      10/8
    </div>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 520px',
        alignItems: 'center',
        padding: '0 120px',
        gap: 80,
      }}
    >
      <div>
        <div className="ace-fadeup" style={{ marginBottom: 28 }}>
          <AceMark size={64} />
        </div>
        <Eyebrow delay={80}>FHJH Thursday Club</Eyebrow>
        <h1
          className="ace-fadeup"
          style={{
            fontSize: 76,
            fontWeight: 800,
            margin: '28px 0 16px',
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            ...gradText,
            animationDelay: '160ms',
          }}
        >
          AI Creators
          <br />
          &amp; Executors
        </h1>
        <p
          className="ace-fadeup"
          style={{
            fontSize: 32,
            color: palette.muted,
            margin: '0 0 24px',
            animationDelay: '200ms',
          }}
        >
          社課第四堂 · 發表準備
        </p>
        <div
          className="ace-fadeup"
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 14,
            fontSize: 26,
            animationDelay: '260ms',
          }}
        >
          <span style={{ color: 'var(--osd-accent)', fontSize: 20 }}>◉</span>
          東西做出來了，下一步是讓別人聽懂。
        </div>
      </div>
      <div
        className="ace-fade"
        style={{ animationDelay: '300ms', display: 'flex', justifyContent: 'flex-end' }}
      >
        <div
          style={{
            width: 520,
            padding: 44,
            borderRadius: 'var(--osd-radius)',
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            boxShadow: cardShadow,
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 17,
              color: 'var(--osd-accent)',
              letterSpacing: '0.12em',
            }}
          >
            今天的流程 · RUNDOWN
          </div>
          <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 22 }}>
            {['發表日長什麼樣', '三分鐘怎麼講', 'Demo 不翻車', '分組排練'].map((t, i) => (
              <div key={t} style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
                <span style={{ fontFamily: fonts.mono, fontSize: 22, ...gradText }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 27 }}>{t}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 30,
              paddingTop: 22,
              borderTop: `1px solid ${palette.border}`,
              fontSize: 22,
              color: palette.muted,
              lineHeight: 1.5,
            }}
          >
            下課前，每組要計時
            <br />
            完整講過一次。
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const Countdown: Page = () => (
  <Centered>
    <Stat value="7" unit="天" size={560} />
    <StatCaption>10/15（四）換你們站上台。</StatCaption>
  </Centered>
);

const Recap: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="80%" y="72%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>線上兩週之後 · Check-in</Eyebrow>
      <Heading>
        你們這組<span style={gradText}>在哪一格？</span>
      </Heading>
      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
        <Card delay={240}>
          <CardTag>還沒上線</CardTag>
          <CardTitle>網址還打不開</CardTitle>
          <CardBody>今天先處理這個。沒有網址，下週就只能放截圖。</CardBody>
        </Card>
        <Card delay={340}>
          <CardTag>上線了</CardTag>
          <CardTitle>打得開，但很陽春</CardTitle>
          <CardBody>夠了。今天不加功能，把現在有的講清楚。</CardBody>
        </Card>
        <Card delay={440} primary>
          <CardTag>有人用過</CardTag>
          <CardTitle>給同學試過了</CardTitle>
          <CardBody>很好。他們的反應就是你發表最好的素材。</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>
        不管在哪一格，今天的重點都一樣：把現在手上的東西，講到別人聽得懂。
      </FootNote>
    </div>
    <Footer />
  </div>
);

const NoNewFeatures: Page = () => (
  <Centered glowY="55%">
    <Eyebrow>這週的原則 · Freeze</Eyebrow>
    <h1
      className="ace-fadeup"
      style={{
        fontSize: 92,
        fontWeight: 800,
        margin: '36px 0 26px',
        lineHeight: 1.14,
        letterSpacing: '-0.02em',
        animationDelay: '120ms',
      }}
    >
      這週不加新功能
      <br />
      <span style={gradText}>只修會卡的地方</span>
    </h1>
    <p
      className="ace-fadeup"
      style={{
        fontSize: 26,
        color: palette.muted,
        lineHeight: 1.5,
        margin: 0,
        maxWidth: 1100,
        animationDelay: '220ms',
      }}
    >
      發表前一晚加的功能，通常就是台上壞掉的那一個。
    </p>
  </Centered>
);

const DividerFormat: Page = () => <Divider eyebrow="第一段 · Demo Day" title="發表日長什麼樣" />;

const DemoDayFormat: Page = () => (
  <Centered>
    <div style={{ display: 'flex', alignItems: 'center', gap: 90 }}>
      <div>
        <Stat value="3" unit="分鐘" size={380} />
        <StatLabel title="發表 + Demo" body="時間到就停" />
      </div>
      <div
        className="ace-fade"
        style={{
          fontSize: 140,
          fontWeight: 300,
          color: palette.chipBorder,
          animationDelay: '200ms',
        }}
      >
        +
      </div>
      <div>
        <Stat value="2" unit="分鐘" size={380} dim delay={200} />
        <StatLabel title="問答" body="全組都可以回答" />
      </div>
    </div>
    <div style={{ marginTop: 40 }}>
      <StatNote delay={360}>全組一起上台 · 順序現場抽籤 · 有調整會公告在 Classroom</StatNote>
    </div>
  </Centered>
);

const TwoWaysToPresent: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="70%" y="72%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>上台方式 · Two options</Eyebrow>
      <Heading>
        做簡報，<span style={gradText}>或直接 Demo</span>
      </Heading>
      <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
        <Card delay={240}>
          <CardTag>Option A</CardTag>
          <CardTitle>準備簡報</CardTitle>
          <CardBody>幾頁投影片講問題和做法，中間切到網站 Demo。</CardBody>
          <CardBody>適合想把故事講完整的組。頁數不用多，五頁以內就夠。</CardBody>
        </Card>
        <Card delay={360} primary>
          <CardTag>Option B</CardTag>
          <CardTitle>直接 Demo</CardTitle>
          <CardBody>不做投影片，邊操作邊講。網站本身就是你的簡報。</CardBody>
          <CardBody>
            <b style={{ color: palette.text }}>設備要自己帶</b>
            ：筆電或平板、充電線、轉接頭，上台前先接好測過。
          </CardBody>
        </Card>
      </div>
      <FootNote delay={560}>
        兩種都可以，選你們講得最順的那個。今天排練就用你們選的方式跑。
      </FootNote>
    </div>
    <Footer />
  </div>
);

const WhatWeLookAt: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="80%" y="28%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>台下在看什麼 · What matters</Eyebrow>
      <Heading>
        不是誰的網站<span style={gradText}>最漂亮</span>
      </Heading>
      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
        <Card delay={240}>
          <CardTag>Problem</CardTag>
          <CardTitle>問題是真的嗎</CardTitle>
          <CardBody>你說的麻煩，台下有沒有人點頭說「對，我也是」。</CardBody>
        </Card>
        <Card delay={340}>
          <CardTag>Product</CardTag>
          <CardTitle>東西能用嗎</CardTitle>
          <CardBody>現場打得開、按得下去，真的解決了那個麻煩。</CardBody>
        </Card>
        <Card delay={440} primary>
          <CardTag>Pitch</CardTag>
          <CardTitle>講得清楚嗎</CardTitle>
          <CardBody>聽完之後，別人能用一句話轉述你們做了什麼。</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>三樣都普通，比一樣很強、兩樣很弱，更容易讓人記住。</FootNote>
    </div>
    <Footer />
  </div>
);

const PeopleRemember: Page = () => (
  <Centered glowY="55%">
    <Eyebrow>記住這句 · Remember</Eyebrow>
    <h1
      className="ace-fadeup"
      style={{
        fontSize: 88,
        fontWeight: 800,
        margin: '36px 0 26px',
        lineHeight: 1.16,
        letterSpacing: '-0.02em',
        animationDelay: '120ms',
      }}
    >
      沒有人記得你用了什麼技術
      <br />
      <span style={gradText}>大家記得你幫了誰</span>
    </h1>
    <p
      className="ace-fadeup"
      style={{
        fontSize: 26,
        color: palette.muted,
        lineHeight: 1.5,
        margin: 0,
        animationDelay: '220ms',
      }}
    >
      所以開場不要講「我們用了 Claude 跟 Vercel」，先講那個人。
    </p>
  </Centered>
);

const DividerPitch: Page = () => <Divider eyebrow="第二段 · Pitch" title="三分鐘怎麼講" />;

const pitchBlocks = [
  { sec: '30', label: '問題', body: '誰遇到什麼麻煩' },
  { sec: '30', label: '做法', body: '一句話講完' },
  { sec: '90', label: 'Demo', body: '現場走一遍', primary: true },
  { sec: '30', label: '下一步', body: '還缺什麼' },
];

const PitchStructure: Page = () => (
  <Centered>
    <Eyebrow>180 秒 · Structure</Eyebrow>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 80, marginTop: 70 }}>
      {pitchBlocks.map((b, i) => (
        <div key={b.label}>
          <Stat
            value={b.sec}
            unit="秒"
            size={b.primary ? 300 : 170}
            dim={!b.primary}
            delay={160 + i * 80}
          />
          <StatLabel title={b.label} body={b.body} accent={b.primary} />
        </div>
      ))}
    </div>
  </Centered>
);

const DemoNinety: Page = () => (
  <Centered>
    <Stat value="90" unit="秒" size={520} />
    <StatCaption>Demo 是整場最值錢的九十秒。</StatCaption>
    <StatNote>用講的說服不了人，用看的可以。</StatNote>
  </Centered>
);

const FirstTen: Page = () => (
  <Centered>
    <Stat value="10" unit="秒" size={520} />
    <StatCaption>台下要不要聽，開場前十秒就決定了。</StatCaption>
  </Centered>
);

const TwoOpenings: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="20%" y="78%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>開場 · First 10 seconds</Eyebrow>
      <Heading>
        同一組，<span style={gradText}>兩種開場</span>
      </Heading>
      <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
        <Card delay={240}>
          <div style={{ fontSize: 30, color: palette.muted }}>✕</div>
          <Quote muted>
            「大家好，我們是第三組，我們這組做的是一個作業管理的網站，那我們先介紹一下組員⋯⋯」
          </Quote>
          <CardBody>台下這時候已經在滑手機了。</CardBody>
        </Card>
        <Card delay={360} primary>
          <div style={{ fontSize: 30, color: 'var(--osd-accent)' }}>✓</div>
          <Quote>「上禮拜有多少人半夜十一點才想起來，隔天要交英文作業？舉個手。」</Quote>
          <CardBody>台下舉手的那一刻，大家就在聽了。</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>組員介紹可以放最後，或乾脆不講。大家想知道的是你們做了什麼。</FootNote>
    </div>
    <Footer />
  </div>
);

const PitchTemplate: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="85%" y="30%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>填空 · Template</Eyebrow>
      <Heading>
        先把這兩句<span style={gradText}>寫下來</span>
      </Heading>
      <Terminal>
        <TermLine sign="01">
          <span style={{ color: palette.inkMuted }}>「</span>
          <span style={{ color: palette.inkGreen }}>______</span> 的人，常常{' '}
          <span style={{ color: palette.inkGreen }}>______</span>。
          <span style={{ color: palette.inkMuted }}>」</span>
        </TermLine>
        <TermLine sign="02">
          <span style={{ color: palette.inkMuted }}>「</span>所以我們做了{' '}
          <span style={{ color: palette.inkGreen }}>______</span>，讓他們可以{' '}
          <span style={{ color: palette.inkGreen }}>______</span>。
          <span style={{ color: palette.inkMuted }}>」</span>
        </TermLine>
        <div style={{ height: 22 }} />
        <TermLine sign="#" dim>
          例：住校的同學常常不知道今天餐廳吃什麼，
        </TermLine>
        <TermLine sign="#" dim>
          所以我們做了一個每日菜單頁，讓他們出門前就能決定要不要訂外送。
        </TermLine>
      </Terminal>
      <FootNote delay={420}>
        這兩句就是你的前三十秒。寫不出來，代表題目還沒想清楚，先回去想。
      </FootNote>
    </div>
    <Footer />
  </div>
);

const DemoOnePath: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="78%" y="70%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>Demo 怎麼走 · One path</Eyebrow>
      <Heading>
        只走<span style={gradText}>一條路</span>，走完它
      </Heading>
      <div style={{ display: 'flex', gap: 22, alignItems: 'stretch' }}>
        <Card delay={220}>
          <BigNum>01</BigNum>
          <CardTitle>打開</CardTitle>
          <CardBody>用使用者的角度，從第一個畫面開始。</CardBody>
        </Card>
        <Card delay={300}>
          <BigNum>02</BigNum>
          <CardTitle>做一件事</CardTitle>
          <CardBody>就是開場講的那個麻煩，現場解決一次。</CardBody>
        </Card>
        <Card delay={380} primary>
          <BigNum>03</BigNum>
          <CardTitle>看到結果</CardTitle>
          <CardBody>停在這裡讓大家看兩秒，不要急著切走。</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>
        不要每個按鈕都點給大家看。功能講越多，大家越記不住哪一個重要。
      </FootNote>
    </div>
    <Footer />
  </div>
);

const DividerDemo: Page = () => <Divider eyebrow="第三段 · Plan B" title="Demo 不翻車" />;

const DemoChecklist: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="30%" y="70%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>上台前 · Checklist</Eyebrow>
      <Heading>
        台上會壞的，<span style={gradText}>台下先想好</span>
      </Heading>
      <div style={{ display: 'flex', gap: 22, alignItems: 'stretch' }}>
        <Card delay={220}>
          <CardTag>網路</CardTag>
          <CardTitle>開熱點備用</CardTitle>
          <CardBody>學校 Wi-Fi 不一定撐得住，手機熱點先設好。</CardBody>
        </Card>
        <Card delay={300}>
          <CardTag>設備</CardTag>
          <CardTitle>自己的電腦先接好</CardTitle>
          <CardBody>充電線、轉接頭帶齊。網址先打開，縮放調到 150%。</CardBody>
        </Card>
        <Card delay={380}>
          <CardTag>資料</CardTag>
          <CardTitle>先填好範例</CardTitle>
          <CardBody>不要在台上現打一大段字，事先放好幾筆假資料。</CardBody>
        </Card>
        <Card delay={460} primary>
          <CardTag>備案</CardTag>
          <CardTitle>錄一支影片</CardTitle>
          <CardBody>Demo 完整錄一次。真的壞了就播影片，照樣講。</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>Mac 按 ⌘ + Shift + 5，Windows 按 Win + Alt + R，就能錄螢幕。</FootNote>
    </div>
    <Footer />
  </div>
);

const WhenItBreaks: Page = () => (
  <Centered glowY="55%">
    <Eyebrow>真的壞了 · If it breaks</Eyebrow>
    <h1
      className="ace-fadeup"
      style={{
        fontSize: 88,
        fontWeight: 800,
        margin: '36px 0 26px',
        lineHeight: 1.16,
        letterSpacing: '-0.02em',
        animationDelay: '120ms',
      }}
    >
      不要在台上修 bug
      <br />
      <span style={gradText}>切影片，繼續講</span>
    </h1>
    <p
      className="ace-fadeup"
      style={{
        fontSize: 26,
        color: palette.muted,
        lineHeight: 1.5,
        margin: 0,
        maxWidth: 1100,
        animationDelay: '220ms',
      }}
    >
      「現場網路不太穩，我們放錄好的版本。」講完就切，台下不會在意。
      <br />
      大家在意的是你們站在那裡慌了三十秒。
    </p>
  </Centered>
);

const QnA: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="80%" y="28%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>問答 · Q&amp;A</Eyebrow>
      <Heading>
        被問倒的時候，<span style={gradText}>三種回法</span>
      </Heading>
      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
        <Card delay={240}>
          <CardTag>還沒做</CardTag>
          <Quote>「這個我們還沒做，下一步就是它。」</Quote>
          <CardBody>誠實講，順便告訴大家你們有想過。</CardBody>
        </Card>
        <Card delay={340}>
          <CardTag>有取捨</CardTag>
          <Quote>「我們有想過，但先選了 A，因為⋯⋯」</Quote>
          <CardBody>有理由的取捨，比什麼都做更有說服力。</CardBody>
        </Card>
        <Card delay={440}>
          <CardTag>不確定</CardTag>
          <Quote>「這個我不確定，我們回去查清楚再跟你說。」</Quote>
          <CardBody>不要硬掰。掰錯比不知道更扣分。</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>今天排練的時候，請隔壁組幫你們想三個最難的問題。</FootNote>
    </div>
    <Footer />
  </div>
);

const Roles: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="22%" y="70%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>分工 · Roles</Eyebrow>
      <Heading>
        上台前，<span style={gradText}>每個人都要知道自己做什麼</span>
      </Heading>
      <div style={{ display: 'flex', gap: 22, alignItems: 'stretch' }}>
        <Card delay={220}>
          <CardTag>講</CardTag>
          <CardTitle>主講</CardTitle>
          <CardBody>負責開場和收尾。最好是組裡最敢講的那個。</CardBody>
        </Card>
        <Card delay={300}>
          <CardTag>操作</CardTag>
          <CardTitle>Demo 手</CardTitle>
          <CardBody>只管電腦。主講講到哪，畫面就跟到哪。</CardBody>
        </Card>
        <Card delay={380}>
          <CardTag>計時</CardTag>
          <CardTitle>時間管理</CardTitle>
          <CardBody>剩一分鐘、剩三十秒，用手勢提醒主講。</CardBody>
        </Card>
        <Card delay={460} primary>
          <CardTag>回答</CardTag>
          <CardTitle>問答主力</CardTitle>
          <CardBody>最懂這個東西怎麼做的人，問答時站前面。</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>
        人數不夠就一人兼兩個。但主講和 Demo 手最好分開，不然很容易手忙腳亂。
      </FootNote>
    </div>
    <Footer />
  </div>
);

const DividerHandsOn: Page = () => <Divider eyebrow="第四段 · Rehearsal" title="換你們了" />;

const sessionBlocks = [
  { min: '5', label: '分工', body: '誰講、誰操作、誰回答' },
  { min: '10', label: '寫講稿', body: '先填那兩句' },
  { min: '10', label: '組內練', body: '超過三分鐘就砍' },
  { min: '15', label: '兩組互看', body: '輪流講給對方聽', primary: true },
];

const WorkSession: Page = () => (
  <Centered>
    <Eyebrow>40 分鐘 · Work session</Eyebrow>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 90, marginTop: 70 }}>
      {sessionBlocks.map((b, i) => (
        <div key={b.label}>
          <Stat
            value={b.min}
            unit="分"
            size={b.primary ? 260 : 200}
            dim={!b.primary}
            delay={160 + i * 80}
          />
          <StatLabel title={b.label} body={b.body} accent={b.primary} />
        </div>
      ))}
    </div>
    <div style={{ marginTop: 40 }}>
      <StatNote delay={520}>我會一組一組走過去。想先試講給我聽的，舉手。</StatNote>
    </div>
  </Centered>
);

const PeerFeedback: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="78%" y="70%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>互看的時候 · Feedback</Eyebrow>
      <Heading>
        聽完，<span style={gradText}>回答他們三題</span>
      </Heading>
      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
        <Card delay={240}>
          <CardTag>Q1</CardTag>
          <CardTitle>他們在幫誰？</CardTitle>
          <CardBody>答不出來，代表開場沒講清楚。</CardBody>
        </Card>
        <Card delay={340}>
          <CardTag>Q2</CardTag>
          <CardTitle>你記得哪個畫面？</CardTitle>
          <CardBody>最好是 Demo 最後那一格。記得的是別的，就要調整。</CardBody>
        </Card>
        <Card delay={440} primary>
          <CardTag>Q3</CardTag>
          <CardTitle>哪裡聽不懂？</CardTitle>
          <CardBody>照實講。下週台下的人不會客氣，今天你也不用。</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>不用講「很棒」。具體指出一個地方，對方才知道要改什麼。</FootNote>
    </div>
    <Footer />
  </div>
);

const DefinitionOfDone: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="80%" y="28%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>下課前 · Before you leave</Eyebrow>
      <Heading>
        今天的<span style={gradText}>驗收標準</span>
      </Heading>
      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
        <Card delay={240}>
          <CardTag>Check 01</CardTag>
          <CardTitle>分工定了</CardTitle>
          <CardBody>每個人講得出自己上台要做什麼。</CardBody>
        </Card>
        <Card delay={340}>
          <CardTag>Check 02</CardTag>
          <CardTitle>完整講過一次</CardTitle>
          <CardBody>有計時，從開場到收尾沒有中斷。</CardBody>
        </Card>
        <Card delay={440}>
          <CardTag>Check 03</CardTag>
          <CardTitle>知道要改哪裡</CardTitle>
          <CardBody>從隔壁組的回饋裡，挑出一件這週要改的事。</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>三個都打勾就可以走。卡住的話留下來，我陪你們再跑一次。</FootNote>
    </div>
    <Footer />
  </div>
);

const ThisWeek: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="30%" y="70%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>這一週 · Before 10/15</Eyebrow>
      <Heading>
        回家之後，<span style={gradText}>還有三件事</span>
      </Heading>
      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
        <Card delay={240}>
          <CardTag>修</CardTag>
          <CardTitle>修一個最卡的地方</CardTitle>
          <CardBody>從今天的回饋挑一個。改完記得再部署一次。</CardBody>
        </Card>
        <Card delay={340}>
          <CardTag>錄</CardTag>
          <CardTitle>錄好備用影片</CardTitle>
          <CardBody>Demo 那九十秒完整錄一次，存在手機和電腦裡。</CardBody>
        </Card>
        <Card delay={440} primary>
          <CardTag>練</CardTag>
          <CardTitle>再練兩次</CardTitle>
          <CardBody>線上約一次也可以，至少要計時跑兩遍。</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>
        網址和影片 10/14（三）晚上前貼到 Classroom。要自己 Demo 的組，設備前一晚先充飽電。
      </FootNote>
    </div>
    <Footer />
  </div>
);

const Closing: Page = () => (
  <Centered>
    <AceMark size={80} />
    <div style={{ height: 32 }} />
    <Eyebrow delay={80}>下週見 · See you on 10/15</Eyebrow>
    <h1
      className="ace-fadeup"
      style={{
        fontSize: 96,
        fontWeight: 800,
        margin: '32px 0 0',
        lineHeight: 1.12,
        letterSpacing: '-0.02em',
        ...gradText,
        animationDelay: '160ms',
      }}
    >
      做得出來是一半
      <br />
      講得出來是另一半
    </h1>
    <p
      className="ace-fadeup"
      style={{
        fontSize: 'var(--osd-size-body)',
        color: palette.muted,
        maxWidth: 1000,
        marginTop: 28,
        lineHeight: 1.5,
        animationDelay: '240ms',
      }}
    >
      三分鐘不長，但夠讓別人記住你們。
    </p>
  </Centered>
);

export const meta: SlideMeta = {
  title: '2026/10/8 ACE Club Lesson 4 · 發表準備',
  theme: 'aurora',
  createdAt: '2026-10-07T12:00:00+08:00',
};

export default [
  Cover,
  Countdown,
  Recap,
  NoNewFeatures,
  DividerFormat,
  DemoDayFormat,
  TwoWaysToPresent,
  WhatWeLookAt,
  PeopleRemember,
  DividerPitch,
  PitchStructure,
  DemoNinety,
  FirstTen,
  TwoOpenings,
  PitchTemplate,
  DemoOnePath,
  DividerDemo,
  DemoChecklist,
  WhenItBreaks,
  QnA,
  Roles,
  DividerHandsOn,
  WorkSession,
  PeerFeedback,
  DefinitionOfDone,
  ThisWeek,
  Closing,
] satisfies Page[];
