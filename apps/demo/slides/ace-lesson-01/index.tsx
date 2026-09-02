import { type DesignSystem, type Page, type SlideMeta, useSlidePageNumber } from '@open-slide/core';
import focusLoop from './assets/focusloop.png';
import focusLoopScreens from './assets/focusloop-screens.png';
import life01 from './assets/life-01.jpg';
import life02 from './assets/life-02.jpg';
import life04 from './assets/life-04.jpg';
import nickPhoto from './assets/nick-daloisio.jpg';
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
          <LauncherRow icon="📅" title="這學期怎麼跑" sub="What this term looks like" delay={870} />
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
          className="ace-fade"
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
  photo,
  photoAlt,
  tag,
  name,
  nameEn,
  sub,
  delay = 0,
}: {
  photo: string;
  photoAlt: string;
  tag: string;
  name: string;
  nameEn: string;
  sub: string;
  delay?: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      flex: 1,
      borderRadius: 'var(--osd-radius)',
      overflow: 'hidden',
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: cardShadow,
      animationDelay: `${delay}ms`,
    }}
  >
    <img
      src={photo}
      alt={photoAlt}
      style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
    />
    <div style={{ padding: '26px 30px 30px' }}>
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
      <div
        style={{
          fontSize: 56,
          fontWeight: 800,
          marginTop: 10,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
        }}
      >
        {name}
      </div>
      <div style={{ fontSize: 22, color: palette.muted, marginTop: 8 }}>{nameEn}</div>
      <div style={{ fontSize: 19, marginTop: 16, lineHeight: 1.5, color: palette.muted }}>
        {sub}
      </div>
    </div>
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
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: -60,
        top: -80,
        fontSize: 620,
        lineHeight: 1,
        color: 'var(--osd-accent)',
        opacity: 0.06,
        pointerEvents: 'none',
      }}
    >
      ♠
    </div>
    <div style={{ padding: '120px 160px 0' }}>
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
        AI Creators &amp; Executors
      </h2>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 26,
          color: palette.muted,
          lineHeight: 1.4,
          margin: '0 0 40px',
          animationDelay: '200ms',
        }}
      >
        AI 創作者 × 執行者
      </p>
      <div style={{ display: 'flex', gap: 24 }}>
        <PillarCard
          photo={life02}
          photoAlt="電腦教室裡的社課工作坊"
          tag="A"
          name="AI"
          nameEn="artificial intelligence"
          sub="不用先會寫程式。AI 是我們的工具，不是入場門檻。"
          delay={280}
        />
        <PillarCard
          photo={life01}
          photoAlt="社課帶大家拍片"
          tag="C"
          name="Creators"
          nameEn="動手創作"
          sub="不只學工具，每堂社課都要親手做出一個東西。"
          delay={380}
        />
        <PillarCard
          photo={life04}
          photoAlt="帶著作品去教小朋友動手做"
          tag="E"
          name="Executors"
          nameEn="落地執行"
          sub="做出來還要用出去。帶到真的人面前，才算完成。"
          delay={480}
        />
      </div>
    </div>
    <Footer />
  </div>
);
const wishes = [
  { t: '學到技術', x: '8%', y: '12%', r: -10, size: 26, o: 1 },
  { t: '做出作品', x: '25%', y: '21%', r: 7, size: 24, o: 0.9 },
  { t: '增加履歷', x: '44%', y: '10%', r: -6, size: 28, o: 1 },
  { t: '出國比賽', x: '62%', y: '20%', r: 12, size: 23, o: 0.88 },
  { t: '比賽拿獎', x: '82%', y: '11%', r: -9, size: 25, o: 1 },
  { t: '學習歷程', x: '91%', y: '25%', r: 11, size: 24, o: 0.92 },
  { t: '交到同好', x: '7%', y: '28%', r: 6, size: 23, o: 0.88 },
  { t: '找到方向', x: '14%', y: '44%', r: -13, size: 26, o: 1 },
  { t: '用 AI 做東西', x: '86%', y: '42%', r: 8, size: 25, o: 1 },
  { t: '做一個 App', x: '10%', y: '60%', r: 10, size: 24, o: 0.9 },
  { t: '被看見', x: '90%', y: '58%', r: -8, size: 27, o: 1 },
  { t: '認識朋友', x: '19%', y: '73%', r: 7, size: 25, o: 0.94 },
  { t: '有人一起做', x: '38%', y: '82%', r: -11, size: 23, o: 0.88 },
  { t: '還沒想好', x: '57%', y: '75%', r: 9, size: 26, o: 1 },
  { t: '朋友揪的', x: '76%', y: '83%', r: -7, size: 24, o: 0.9 },
  { t: '打發時間', x: '89%', y: '72%', r: 14, size: 22, o: 0.86 },
];

const ClubIntro2: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="52%" size={1500} opacity={0.32} />
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {wishes.map((w, i) => (
        <span
          key={w.t}
          style={{
            position: 'absolute',
            left: w.x,
            top: w.y,
            transform: `translate(-50%, -50%) rotate(${w.r}deg)`,
            opacity: w.o,
          }}
        >
          <span
            className="ace-fadeup"
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              padding: '12px 26px',
              borderRadius: 999,
              background: palette.surface,
              border: `1px solid ${palette.chipBorder}`,
              fontSize: w.size,
              color: palette.muted,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
              animationDelay: `${340 + i * 55}ms`,
            }}
          >
            {w.t}
          </span>
        </span>
      ))}
    </div>
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
        pointerEvents: 'none',
      }}
    >
      <Eyebrow>換你說 · Your turn</Eyebrow>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 104,
          fontWeight: 800,
          margin: '36px 0 24px',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          animationDelay: '120ms',
        }}
      >
        你想從這裡
        <br />
        <span style={gradText}>帶走什麼？</span>
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
        What do you want to take away from ACE Club?
      </p>
    </div>
    <Footer />
  </div>
);

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
          'linear-gradient(100deg, rgba(245,245,247,0.96) 0%, rgba(245,245,247,0.9) 46%, rgba(245,245,247,0.5) 64%, rgba(245,245,247,0.12) 82%)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 460px',
        gap: 70,
        alignItems: 'center',
        padding: '0 140px',
      }}
    >
      <div>
        <Eyebrow>破冰 · Icebreaker</Eyebrow>
        <h2
          className="ace-fadeup"
          style={{
            fontSize: 72,
            fontWeight: 800,
            margin: '28px 0 16px',
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
            fontSize: 22,
            color: palette.muted,
            lineHeight: 1.55,
            margin: '0 0 36px',
            maxWidth: 620,
            animationDelay: '200ms',
          }}
        >
          Odd One Out — Google 藝術與文化的小實驗。一幅名畫裡藏了一樣不屬於那個年代的東西。
        </p>
        <div style={{ maxWidth: 640 }}>
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
                alignItems: 'baseline',
                gap: 22,
                padding: '18px 0',
                borderTop: i === 0 ? 'none' : `1px solid ${palette.border}`,
                animationDelay: `${300 + i * 110}ms`,
              }}
            >
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 19,
                  letterSpacing: '0.1em',
                  color: 'var(--osd-accent)',
                }}
              >
                {c.n}
              </span>
              <span>
                <span style={{ fontSize: 25, fontWeight: 700, display: 'block' }}>{c.t}</span>
                <span
                  style={{
                    fontSize: 19,
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
      <div
        className="ace-fade"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          padding: '28px 28px 32px',
          borderRadius: 26,
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.16)',
          animationDelay: '300ms',
        }}
      >
        <div style={{ fontSize: 25, fontWeight: 700 }}>掃描開始玩</div>
        <img
          src={qrOddOneOut}
          alt="掃描開始玩 Odd One Out"
          style={{ width: 260, height: 260, display: 'block', borderRadius: 8 }}
        />
        <a
          href={game.url}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '15px 28px',
            borderRadius: 999,
            backgroundImage: accentGrad,
            color: '#FFFFFF',
            fontSize: 21,
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 10px 30px rgba(46, 111, 224, 0.32)',
          }}
        >
          在新分頁開始玩
          <span style={{ fontSize: 18 }}>↗</span>
        </a>
      </div>
    </div>
    <Footer />
  </div>
);

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

const StatCard = ({
  value,
  label,
  labelEn,
  delay = 0,
}: {
  value: string;
  label: string;
  labelEn: string;
  delay?: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      flex: 1,
      padding: '22px 22px 24px',
      borderRadius: 'var(--osd-radius)',
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: cardShadow,
      animationDelay: `${delay}ms`,
    }}
  >
    <div style={{ fontSize: 42, fontWeight: 800, lineHeight: 1, ...gradText }}>{value}</div>
    <div style={{ fontSize: 19, fontWeight: 600, marginTop: 12 }}>{label}</div>
    <div style={{ fontSize: 15, color: palette.muted, marginTop: 3 }}>{labelEn}</div>
  </div>
);

const StoryFocusLoop: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="78%" y="42%" size={1200} opacity={0.26} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 980px',
        gap: 60,
        alignItems: 'center',
        padding: '0 120px',
      }}
    >
      <div>
        <Eyebrow>FocusLoop · 專注迴圈</Eyebrow>
        <h2
          className="ace-fadeup"
          style={{
            fontSize: 60,
            fontWeight: 800,
            margin: '26px 0 14px',
            lineHeight: 1.14,
            letterSpacing: '-0.02em',
            animationDelay: '120ms',
          }}
        >
          三個大學生
          <br />
          一個 App
          <br />
          <span style={gradText}>1,377 件裡的第一名</span>
        </h2>
        <p
          className="ace-fadeup"
          style={{
            fontSize: 20,
            color: palette.muted,
            lineHeight: 1.6,
            margin: '0 0 32px',
            animationDelay: '200ms',
          }}
        >
          逢甲大學資工系的林永富、陳宥蓁、陳瑞昌，也是校內 iOS Club 的社員。他們做的《FocusLoop
          專注迴圈》用遊戲訓練兒童專注力，再讓 AI 分析數據，家長一眼看得懂孩子的狀況。
        </p>
        <div style={{ display: 'flex', gap: 14 }}>
          <StatCard value="1,377" label="初賽作品" labelEn="Entries" delay={300} />
          <StatCard value="35" label="進決賽" labelEn="Finalists" delay={400} />
          <StatCard value="一等獎" label="應用賽道" labelEn="First prize" delay={500} />
        </div>
      </div>
      <div
        className="ace-fade"
        style={{
          borderRadius: 26,
          overflow: 'hidden',
          border: `1px solid ${palette.border}`,
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.14)',
          animationDelay: '240ms',
        }}
      >
        <img src={focusLoop} alt="FocusLoop 專注迴圈" style={{ width: 980, display: 'block' }} />
      </div>
    </div>
    <Footer />
  </div>
);

const StoryFocusLoopScreens: Page = () => (
  <div style={fill}>
    <Style />
    <img
      src={focusLoopScreens}
      alt="FocusLoop 的八個小遊戲畫面"
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
    <div style={{ position: 'absolute', top: 76, left: 140 }}>
      <Eyebrow>FocusLoop · 八種專注力訓練</Eyebrow>
    </div>
    <Footer />
  </div>
);

const StoryNick: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="80%" y="30%" size={1100} opacity={0.26} />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 460px',
        gap: 70,
        alignItems: 'start',
        padding: '150px 140px 0',
      }}
    >
      <div>
        <Eyebrow>Summly · 2013</Eyebrow>
        <h2
          className="ace-fadeup"
          style={{
            fontSize: 76,
            fontWeight: 800,
            margin: '28px 0 16px',
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            animationDelay: '120ms',
          }}
        >
          17 歲，把自己寫的 App
          <br />
          <span style={gradText}>賣給了 Yahoo</span>
        </h2>
        <p
          className="ace-fadeup"
          style={{
            fontSize: 24,
            color: palette.muted,
            lineHeight: 1.55,
            margin: '0 0 44px',
            maxWidth: 1040,
            animationDelay: '200ms',
          }}
        >
          Nick D’Aloisio 在倫敦的臥室裡做出 Summly，一個把長新聞壓成幾句話的 App。2013 年 Yahoo
          買下它，媒體報導的金額大約三千萬美金。那年他 17 歲，還在念書。
          <br />
          He built Summly in his bedroom. Yahoo acquired it in 2013 — reportedly around $30M. He was
          17.
        </p>
        <div style={{ display: 'flex', gap: 24 }}>
          <StatCard value="17" label="收購時的年紀" labelEn="Age at acquisition" delay={300} />
          <StatCard value="約 $30M" label="媒體報導金額" labelEn="Reported price" delay={400} />
          <StatCard value="2013" label="Yahoo 收購" labelEn="Acquired by Yahoo" delay={500} />
        </div>
      </div>
      <div
        className="ace-fade"
        style={{
          borderRadius: 24,
          overflow: 'hidden',
          border: `1px solid ${palette.border}`,
          background: palette.surface,
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.12)',
          animationDelay: '240ms',
        }}
      >
        <img
          src={nickPhoto}
          alt="Nick D’Aloisio"
          style={{ width: 460, height: 460, objectFit: 'cover', display: 'block' }}
        />
        <div style={{ padding: '18px 24px 22px' }}>
          <div style={{ fontSize: 24, fontWeight: 700 }}>Nick D’Aloisio</div>
          <div style={{ fontSize: 17, color: palette.muted, marginTop: 4 }}>
            Summly 創辦人 · 照片攝於 2021
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const wwdcStory = {
  embedUrl: 'https://www.youtube-nocookie.com/embed/9l5rsLOT1ww?rel=0&modestbranding=1',
  title: '蘋果 WWDC 挑戰賽 台灣 8 名學生獲獎創新高',
  channel: '三立財經 iNEWS',
};

const StoryWWDC: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="45%" size={1500} opacity={0.22} />
    <div style={{ position: 'absolute', top: 64, left: 240, right: 240 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Eyebrow>台灣的大學生也在做</Eyebrow>
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
          {wwdcStory.channel} · WWDC Swift Student Challenge
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
        src={wwdcStory.embedUrl}
        title={wwdcStory.title}
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
  DividerStories,
  StoryVideo,
  StoryFocusLoop,
  StoryFocusLoopScreens,
  StoryNick,
  StoryWWDC,
  QA,
  Closing,
] satisfies Page[];
