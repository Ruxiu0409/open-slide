import { type DesignSystem, type Page, type SlideMeta, useSlidePageNumber } from '@open-slide/core';
import oddOneOutPreview from './assets/oddoneout-preview.jpg';
import qrInstagram from './assets/qr-instagram.png';
import qrLinkedin from './assets/qr-linkedin.png';
import qrOddOneOut from './assets/qr-oddoneout.svg';
import qrSlido from './assets/qr-slido.svg';
import qrX from './assets/qr-x.png';
import rayAvatar from './assets/ray-avatar.jpg';
import raycastIcon from './assets/raycast.svg';

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
@keyframes aceSwipe {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
.ace-swipe { transform-origin: left center; animation: aceSwipe 360ms cubic-bezier(0.22, 1, 0.36, 1) both; }
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
      <span>ACE Club · 社課 Lesson 01</span>
      <span>
        {String(current).padStart(2, '0')}{' '}
        <span style={{ opacity: 0.45 }}>/ {String(total).padStart(2, '0')}</span>
      </span>
    </div>
  );
};

const LauncherRow = ({
  icon,
  title,
  sub,
  kbd,
  active = false,
  delay = 0,
}: {
  icon: string;
  title: string;
  sub: string;
  kbd?: string;
  active?: boolean;
  delay?: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 12px',
      borderRadius: 12,
      background: active ? palette.accentSoft : 'transparent',
      animationDelay: `${delay}ms`,
    }}
  >
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        background: palette.surfaceHi,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 19,
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 21, fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 16, color: palette.muted, marginTop: 2 }}>{sub}</div>
    </div>
    {kbd && (
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 14,
          padding: '4px 8px',
          borderRadius: 6,
          background: palette.surfaceHi,
          color: palette.muted,
          border: `1px solid ${palette.chipBorder}`,
        }}
      >
        {kbd}
      </span>
    )}
  </div>
);

const Launcher = ({
  query,
  label,
  width = 820,
  children,
}: {
  query: string;
  label: string;
  width?: number;
  children: React.ReactNode;
}) => (
  <div
    style={{
      position: 'relative',
      width,
      borderRadius: 20,
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: '0 24px 60px rgba(0, 0, 0, 0.12)',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '18px 22px',
        borderBottom: `1px solid ${palette.border}`,
      }}
    >
      <AceMark size={32} />
      <div style={{ fontSize: 24, fontWeight: 600, flex: 1, color: 'var(--osd-text)' }}>
        {query}
        <span
          className="ace-caret"
          style={{
            display: 'inline-block',
            width: 2,
            height: 24,
            background: 'var(--osd-accent)',
            marginLeft: 6,
            verticalAlign: 'middle',
          }}
        />
      </div>
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 16,
          padding: '4px 10px',
          borderRadius: 6,
          background: palette.surfaceHi,
          color: palette.muted,
          border: `1px solid ${palette.chipBorder}`,
        }}
      >
        ACE
      </span>
    </div>
    <div style={{ padding: '10px 12px' }}>
      <div
        style={{
          fontSize: 14,
          color: palette.muted,
          padding: '6px 12px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      {children}
    </div>
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
      9/3
    </div>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 820px',
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
          ACE Club · 社課第一堂 · Lesson 01
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['Discover ✕ Create ✕ Execute', 'Zero Coding Needed. Just Bring Ideas.'].map(
            (line, i) => (
              <div
                key={line}
                className="ace-fadeup"
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 14,
                  fontSize: 26,
                  color: 'var(--osd-text)',
                  animationDelay: `${240 + i * 80}ms`,
                }}
              >
                <span style={{ color: 'var(--osd-accent)', fontSize: 20 }}>◉</span>
                {line}
              </div>
            ),
          )}
        </div>
      </div>
      <div
        className="ace-fade"
        style={{ animationDelay: '300ms', display: 'flex', justifyContent: 'flex-end' }}
      >
        <Launcher query="今天不寫程式" label="Today · 今天的流程">
          <LauncherRow
            icon="👋"
            title="認識指導老師"
            sub="Meet your advisor — Ray"
            kbd="↵"
            active
            delay={600}
          />
          <LauncherRow icon="🧊" title="破冰" sub="Icebreaker — 先認識彼此" delay={690} />
          <LauncherRow icon="📖" title="聽幾個故事" sub="Stories worth telling" delay={780} />
          <LauncherRow
            icon="💬"
            title="聊聊你想做什麼"
            sub="What do you want to build"
            delay={870}
          />
          <LauncherRow icon="📅" title="這學期怎麼跑" sub="What this term looks like" delay={960} />
        </Launcher>
      </div>
    </div>
    <Footer />
  </div>
);

const CredentialRow = ({
  icon,
  text,
  sub,
  delay = 0,
}: {
  icon: React.ReactNode;
  text: string;
  sub: string;
  delay?: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '12px 18px',
      borderRadius: 14,
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: cardShadow,
      animationDelay: `${delay}ms`,
    }}
  >
    <span style={{ fontSize: 24 }}>{icon}</span>
    <span>
      <span style={{ fontSize: 22, fontWeight: 600, display: 'block' }}>{text}</span>
      <span style={{ fontSize: 15, color: palette.muted, display: 'block', marginTop: 3 }}>
        {sub}
      </span>
    </span>
  </div>
);

const CredGroupLabel = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontFamily: fonts.mono,
      fontSize: 16,
      color: 'var(--osd-accent)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      marginBottom: 10,
    }}
  >
    {children}
  </div>
);

const QrChip = ({ src, label, handle }: { src: string; label: string; handle: string }) => (
  <div style={{ width: 128 }}>
    <img
      src={src}
      alt={`${label} QR code`}
      style={{
        width: 128,
        height: 128,
        display: 'block',
        borderRadius: 12,
        border: `1px solid ${palette.border}`,
        background: palette.surface,
      }}
    />
    <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>{label}</div>
    <div style={{ fontFamily: fonts.mono, fontSize: 13, color: palette.muted, marginTop: 2 }}>
      {handle}
    </div>
  </div>
);

const AboutMe: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="85%" y="20%" size={1000} opacity={0.28} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: '440px 1fr',
        alignItems: 'center',
        padding: '0 140px',
        gap: 70,
      }}
    >
      <div style={{ position: 'relative', width: 440 }}>
        <div
          className="ace-fade"
          style={{
            borderRadius: 24,
            overflow: 'hidden',
            border: `1px solid ${palette.border}`,
            background: palette.surface,
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.12)',
            animationDelay: '200ms',
          }}
        >
          <img
            src={rayAvatar}
            alt="瑞瑞（Ray）"
            style={{ width: 440, height: 440, objectFit: 'cover', display: 'block' }}
          />
        </div>
        <div
          className="ace-fadeup"
          style={{
            position: 'absolute',
            top: -26,
            right: -30,
            transform: 'rotate(6deg)',
            background: palette.surface,
            border: `1.5px solid var(--osd-accent)`,
            borderRadius: 18,
            padding: '12px 22px',
            fontSize: 24,
            fontWeight: 700,
            boxShadow: cardShadow,
            animationDelay: '520ms',
          }}
        >
          ✈️ 參加過 Apple WWDC26
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: -8,
              left: 30,
              width: 14,
              height: 14,
              background: palette.surface,
              borderRight: `1.5px solid var(--osd-accent)`,
              borderBottom: `1.5px solid var(--osd-accent)`,
              transform: 'rotate(45deg)',
            }}
          />
        </div>
        <div
          className="ace-fadeup"
          style={{ display: 'flex', gap: 14, marginTop: 26, animationDelay: '600ms' }}
        >
          <QrChip src={qrInstagram} label="Instagram" handle="@ruxiu0409" />
          <QrChip src={qrLinkedin} label="LinkedIn" handle="Cheng-Yeh Tsai" />
          <QrChip src={qrX} label="X" handle="@tsaicy0409" />
        </div>
      </div>
      <div>
        <Eyebrow>指導老師 · Your Advisor</Eyebrow>
        <h2
          className="ace-fadeup"
          style={{
            fontSize: 68,
            fontWeight: 800,
            margin: '26px 0 14px',
            lineHeight: 1.15,
            animationDelay: '120ms',
          }}
        >
          嗨，我是 <span style={gradText}>瑞瑞（Ray）</span>
        </h2>
        <p
          className="ace-fadeup"
          style={{
            fontSize: 22,
            color: palette.muted,
            lineHeight: 1.5,
            maxWidth: 940,
            margin: '0 0 30px',
            animationDelay: '200ms',
          }}
        >
          叫我 CY 也可以。我是 ACE Club 的指導老師，今天這堂帶大家做出第一個 Raycast 擴充。
          <br />
          Call me CY — I'm the club advisor. Today we ship your first Raycast extension.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <CredGroupLabel>稱號 · Roles</CredGroupLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <CredentialRow
                icon="📱"
                text="iOS Club Lead（2025–26）"
                sub="iOS Club Lead 2025–26"
                delay={300}
              />
              <CredentialRow
                icon="🚀"
                text="GDG on Campus Associated Lead（2025–26）"
                sub="Google Developer Group 校園副負責人"
                delay={390}
              />
              <CredentialRow
                icon={
                  <img
                    src={raycastIcon}
                    alt=""
                    style={{ width: 24, height: 24, display: 'block' }}
                  />
                }
                text="Raycast Ambassador"
                sub="Raycast 官方大使"
                delay={480}
              />
            </div>
          </div>
          <div>
            <CredGroupLabel>認證與獲獎 · Certs & Awards</CredGroupLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <CredentialRow
                icon="🏆"
                text="全國電子設計與 App 競賽第一名"
                sub="1st place · National Electronic Design & App Competition"
                delay={330}
              />
              <CredentialRow
                icon="🍎"
                text="Apple Teacher Swift Playgrounds"
                sub="Apple 教師認證 · Swift Playgrounds"
                delay={420}
              />
              <CredentialRow
                icon="✨"
                text="GenAI · Gemini · Vertex AI Prompt Design 認證"
                sub="Certified in GenAI, Gemini & Vertex AI Prompt Design"
                delay={510}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const Divider = ({
  num,
  title,
  sub,
  subEn,
}: {
  num: string;
  title: string;
  sub: string;
  subEn: string;
}) => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="55%" size={1500} opacity={0.36} />
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
      <div
        className="ace-fadeup"
        style={{
          fontFamily: fonts.mono,
          fontSize: 26,
          color: 'var(--osd-accent)',
          letterSpacing: '0.3em',
        }}
      >
        {num}
      </div>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 150,
          fontWeight: 800,
          margin: '36px 0 28px',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          ...gradText,
          animationDelay: '120ms',
        }}
      >
        {title}
      </h1>
      <p
        className="ace-fadeup"
        style={{ fontSize: 30, lineHeight: 1.5, margin: 0, animationDelay: '220ms' }}
      >
        {sub}
      </p>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 24,
          color: palette.muted,
          lineHeight: 1.5,
          margin: '12px 0 0',
          animationDelay: '300ms',
        }}
      >
        {subEn}
      </p>
    </div>
    <Footer />
  </div>
);

const PillarCard = ({
  tag,
  name,
  nameEn,
  sub,
  subEn,
  delay = 0,
}: {
  tag: string;
  name: string;
  nameEn: string;
  sub: string;
  subEn: string;
  delay?: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      flex: 1,
      padding: 36,
      borderRadius: 'var(--osd-radius)',
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: cardShadow,
      animationDelay: `${delay}ms`,
    }}
  >
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 17,
        color: 'var(--osd-accent)',
        letterSpacing: '0.1em',
      }}
    >
      {tag}
    </div>
    <div style={{ fontSize: 36, fontWeight: 700, marginTop: 14 }}>
      {name}{' '}
      <span style={{ fontSize: 20, fontWeight: 500, color: palette.muted, marginLeft: 4 }}>
        {nameEn}
      </span>
    </div>
    <div style={{ fontSize: 21, marginTop: 12, lineHeight: 1.5 }}>{sub}</div>
    <div style={{ fontSize: 17, color: palette.muted, marginTop: 8, lineHeight: 1.5 }}>{subEn}</div>
  </div>
);

const Blank = () => (
  <div style={fill}>
    <Style />
    <Footer />
  </div>
);

const DividerClub: Page = () => (
  <Divider
    num="PART 01"
    title="社團介紹"
    sub="我們是誰、在做什麼、這學期要去哪。"
    subEn="Who we are, what we do, where we're heading."
  />
);

const ClubIntro1: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="0%" y="100%" size={1000} opacity={0.28} />
    <div style={{ padding: '170px 160px 0' }}>
      <Eyebrow>名字的意思 · The Name</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 78,
          fontWeight: 800,
          margin: '30px 0 10px',
          lineHeight: 1.1,
          animationDelay: '120ms',
        }}
      >
        <span style={gradText}>A</span>I <span style={gradText}>C</span>reators &amp;{' '}
        <span style={gradText}>E</span>xecutors
      </h2>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 26,
          color: palette.muted,
          lineHeight: 1.4,
          margin: '0 0 48px',
          animationDelay: '200ms',
        }}
      >
        AI 創作者 × 執行者
      </p>
      <div style={{ display: 'flex', gap: 24 }}>
        <PillarCard
          tag="A · AI"
          name="AI as the tool"
          nameEn="用 AI"
          sub="不用先會寫程式。AI 是我們的工具，不是入場門檻。"
          subEn="No coding required — AI is the tool, not the barrier."
          delay={280}
        />
        <PillarCard
          tag="C · CREATORS"
          name="Make things"
          nameEn="動手創作"
          sub="不只學工具，每堂社課都要親手做出一個東西。"
          subEn="Every session ends with something you made yourself."
          delay={380}
        />
        <PillarCard
          tag="E · EXECUTORS"
          name="Ship things"
          nameEn="落地執行"
          sub="想法要變成真的打得開的網站或 App。做完才算數。"
          subEn="Ideas only count once they ship."
          delay={480}
        />
      </div>
    </div>
    <Footer />
  </div>
);
const ClubIntro2: Page = () => <Blank />;
const ClubIntro3: Page = () => <Blank />;
const ClubIntro4: Page = () => <Blank />;

const DividerIcebreaker: Page = () => (
  <Divider
    num="PART 02"
    title="破冰時間"
    sub="別急著聽我講，我們先來玩一場。"
    subEn="Icebreaker — let's play something first."
  />
);

const game = {
  url: 'https://artsandculture.google.com/experiment/odd-one-out/wAHNn4JsVTFOiw?hl=zh-TW',
  displayUrl: 'artsandculture.google.com/experiment/odd-one-out/wAHNn4JsVTFOiw',
};

const GameIntro: Page = () => (
  <div style={fill}>
    <Style />
    <img
      src={oddOneOutPreview}
      alt="Odd One Out"
      className="ace-fade"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      }}
    />
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(100deg, rgba(245,245,247,0.97) 0%, rgba(245,245,247,0.94) 36%, rgba(245,245,247,0.6) 52%, rgba(245,245,247,0) 70%)',
      }}
    />
    <div style={{ position: 'absolute', inset: 0, padding: '150px 140px 0', width: 900 }}>
      <Eyebrow>破冰 · Icebreaker</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 76,
          fontWeight: 800,
          margin: '28px 0 14px',
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          animationDelay: '120ms',
        }}
      >
        找出那個
        <br />
        <span style={gradText}>不對勁的東西</span>
      </h2>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 23,
          color: palette.muted,
          lineHeight: 1.55,
          margin: '0 0 36px',
          maxWidth: 620,
          animationDelay: '200ms',
        }}
      >
        Odd One Out — Google
        藝術與文化的小實驗。一幅名畫裡藏了一樣不屬於那個年代的東西，你要在時間內把它抓出來。
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 620 }}>
        {[
          { n: '01', t: '看一幅名畫', d: '每一關丟給你一幅世界名畫，先看清楚裡面有什麼。' },
          { n: '02', t: '找出那個外來者', d: '有一樣東西是後來被塞進去的，跟那個年代格格不入。' },
          { n: '03', t: '限時，點下去', d: '時間會跑。看你多快抓到，也看你敢不敢賭。' },
        ].map((c, i) => (
          <div
            key={c.n}
            className="ace-fadeup"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 20,
              padding: '20px 26px',
              borderRadius: 'var(--osd-radius)',
              background: 'rgba(255, 255, 255, 0.92)',
              border: `1px solid ${palette.border}`,
              boxShadow: cardShadow,
              animationDelay: `${300 + i * 110}ms`,
            }}
          >
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 20,
                letterSpacing: '0.1em',
                color: 'var(--osd-accent)',
                paddingTop: 4,
              }}
            >
              {c.n}
            </span>
            <span>
              <span style={{ fontSize: 26, fontWeight: 700, display: 'block' }}>{c.t}</span>
              <span
                style={{
                  fontSize: 20,
                  color: palette.muted,
                  lineHeight: 1.45,
                  display: 'block',
                  marginTop: 4,
                }}
              >
                {c.d}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

const GamePlay: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="50%" size={1500} opacity={0.28} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        padding: '0 140px',
        gap: 90,
      }}
    >
      <div>
        <Eyebrow>Play now</Eyebrow>
        <h2
          className="ace-fadeup"
          style={{
            fontSize: 96,
            fontWeight: 800,
            margin: '30px 0 20px',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            animationDelay: '120ms',
          }}
        >
          <span style={gradText}>開始玩</span>
        </h2>
        <p
          className="ace-fadeup"
          style={{
            fontSize: 28,
            color: palette.muted,
            lineHeight: 1.5,
            margin: '0 0 32px',
            animationDelay: '200ms',
          }}
        >
          拿手機掃右邊的 QR，各玩各的。
          <br />
          玩完講一下你卡在哪一關。
        </p>
        <a
          className="ace-fadeup"
          href={game.url}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
            padding: '20px 34px',
            borderRadius: 999,
            backgroundImage: accentGrad,
            color: '#FFFFFF',
            fontSize: 26,
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 10px 30px rgba(46, 111, 224, 0.32)',
            animationDelay: '280ms',
          }}
        >
          在新分頁開始玩
          <span style={{ fontSize: 22 }}>↗</span>
        </a>
        <div
          className="ace-fadeup"
          style={{
            marginTop: 20,
            fontFamily: fonts.mono,
            fontSize: 17,
            color: palette.muted,
            animationDelay: '340ms',
          }}
        >
          {game.displayUrl}
        </div>
      </div>
      <div
        className="ace-fade"
        style={{ display: 'flex', justifyContent: 'center', animationDelay: '300ms' }}
      >
        <div
          style={{
            padding: 36,
            borderRadius: 28,
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.12)',
          }}
        >
          <img
            src={qrOddOneOut}
            alt="掃描開始玩 Odd One Out"
            style={{ width: 420, height: 420, display: 'block', borderRadius: 10 }}
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const Closing: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="50%" size={1600} opacity={0.3} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 160px',
        textAlign: 'center',
      }}
    >
      <AceMark size={80} />
      <div style={{ height: 32 }} />
      <Eyebrow delay={80}>下週見 · See you next week</Eyebrow>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 104,
          fontWeight: 800,
          margin: '32px 0 0',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          ...gradText,
          animationDelay: '160ms',
        }}
      >
        記得帶電腦
      </h1>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 'var(--osd-size-body)',
          color: palette.muted,
          maxWidth: 900,
          marginTop: 28,
          lineHeight: 1.5,
          animationDelay: '240ms',
        }}
      >
        下週開始動手做，沒帶電腦只能在旁邊看。
        <br />
        Bring your laptop — next week we actually build something.
      </p>
    </div>
    <Footer />
  </div>
);

const slido = {
  code: '3173 378',
  joinUrl: 'slido.com',
  embedUrl: 'https://app.sli.do/event/guKaZqkHmn7ipbhLNFn6xR',
};

const DividerStories: Page = () => (
  <Divider
    num="PART 03"
    title="其他人的故事"
    sub="有人跟你一樣是高中生，然後做出了幾百萬人在用的東西。"
    subEn="Someone your age built something millions of people rely on."
  />
);

const story = {
  embedUrl:
    'https://www.youtube-nocookie.com/embed/ljq3KK-nccQ?start=0&end=107&rel=0&modestbranding=1',
  title: '當地震來襲，百萬台灣人手機同時響起！背後推手竟是一位高中生?',
  channel: '青春發言人',
};

const StoryVideo: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="45%" size={1500} opacity={0.22} />
    <div style={{ position: 'absolute', top: 64, left: 240, right: 240 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Eyebrow>他也是高中生</Eyebrow>
        <span
          className="ace-fadeup"
          style={{
            fontFamily: fonts.mono,
            fontSize: 19,
            color: palette.muted,
            letterSpacing: '0.04em',
            animationDelay: '120ms',
          }}
        >
          {story.channel} · 0:00–1:47
        </span>
      </div>
    </div>
    <div
      className="ace-fade"
      style={{
        position: 'absolute',
        top: 150,
        left: 240,
        width: 1440,
        height: 810,
        borderRadius: 20,
        overflow: 'hidden',
        border: `1px solid ${palette.border}`,
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.14)',
        background: '#000000',
        animationDelay: '200ms',
      }}
    >
      <iframe
        src={story.embedUrl}
        title={story.title}
        allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
      />
    </div>
    <Footer />
  </div>
);

const QA: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="15%" y="60%" size={1200} opacity={0.16} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 1040px',
        alignItems: 'center',
        padding: '0 120px',
        gap: 56,
      }}
    >
      <div>
        <Eyebrow>Q &amp; A</Eyebrow>
        <h2
          className="ace-fadeup"
          style={{
            fontSize: 88,
            fontWeight: 800,
            margin: '28px 0 20px',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            animationDelay: '120ms',
          }}
        >
          有問題
          <br />
          <span style={gradText}>隨時丟上來</span>
        </h2>
        <p
          className="ace-fadeup"
          style={{
            fontSize: 'var(--osd-size-body)',
            color: palette.muted,
            lineHeight: 1.5,
            margin: '0 0 44px',
            animationDelay: '200ms',
          }}
        >
          匿名也可以，按讚多的我先回答。
        </p>
        <div
          className="ace-fadeup"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 32,
            padding: 32,
            borderRadius: 'var(--osd-radius)',
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            boxShadow: cardShadow,
            animationDelay: '280ms',
          }}
        >
          <img
            src={qrSlido}
            alt="掃描加入 Slido"
            style={{ width: 220, height: 220, display: 'block', borderRadius: 8 }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.01em' }}>掃描加入</div>
            <div style={{ fontSize: 24, color: palette.muted, fontFamily: fonts.mono }}>
              {slido.joinUrl}
            </div>
            {slido.code && (
              <div style={{ fontSize: 24, color: palette.muted, marginTop: 6 }}>
                或輸入代碼{' '}
                <span style={{ fontFamily: fonts.mono, fontWeight: 700, ...gradText }}>
                  {slido.code}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="ace-fade"
        style={{
          position: 'relative',
          width: 1040,
          height: 820,
          borderRadius: 'var(--osd-radius)',
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          boxShadow: cardShadow,
          overflow: 'hidden',
          animationDelay: '360ms',
        }}
      >
        <iframe
          src={slido.embedUrl}
          title="Slido Q&A"
          allow="clipboard-write"
          style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
        />
      </div>
    </div>
    <Footer />
  </div>
);

export const meta: SlideMeta = {
  title: '第一堂課',
  theme: 'aurora',
  createdAt: '2026-08-25T07:18:48+08:00',
};

export default [
  Cover,
  AboutMe,
  DividerClub,
  ClubIntro1,
  ClubIntro2,
  ClubIntro3,
  ClubIntro4,
  DividerIcebreaker,
  GameIntro,
  GamePlay,
  DividerStories,
  StoryVideo,
  QA,
  Closing,
] satisfies Page[];
