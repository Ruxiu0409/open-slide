import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  Step,
  Steps,
  useSlidePageNumber,
} from '@open-slide/core';
import airpodsMax from './assets/airpods-max.jpeg';
import appleLogo from './assets/apple.svg';
import canvaLogo from './assets/canva.svg';
import canvaMelanie from './assets/canva-melanie.jpg';
import crestColumbia from './assets/crest-columbia.svg';
import crestHarvard from './assets/crest-harvard.svg';
import crestPenn from './assets/crest-penn.svg';
import crestPrinceton from './assets/crest-princeton.svg';
import crestStanford from './assets/crest-stanford.svg';
import crestUC from './assets/crest-uc.svg';
import crestYale from './assets/crest-yale.svg';
import dcardLogo from './assets/dcard-logo.png';
import gogolookFounders from './assets/gogolook-founders.jpg';
import kytuPhoto from './assets/kytu-lin-dcard.jpg';
import life01 from './assets/life-01.jpg';
import life02 from './assets/life-02.jpg';
import life03 from './assets/life-03.jpg';
import life04 from './assets/life-04.jpg';
import life05 from './assets/life-05.jpg';
import life06 from './assets/life-06.jpg';
import qrInstagram from './assets/qr-instagram.png';
import qrLinkedin from './assets/qr-linkedin.png';
import qrX from './assets/qr-x.png';
import rayAvatar from './assets/ray-avatar.jpg';
import raycastIcon from './assets/raycast.svg';
import swiftLogo from './assets/swift.svg';
import whoscallBrand from './assets/whoscall-brand.jpg';

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

const EnSub = ({
  children,
  mb = 40,
  delay = 200,
}: {
  children: React.ReactNode;
  mb?: number;
  delay?: number;
}) => (
  <p
    className="ace-fadeup"
    style={{
      fontSize: 26,
      color: palette.muted,
      lineHeight: 1.4,
      margin: `0 0 ${mb}px`,
      animationDelay: `${delay}ms`,
    }}
  >
    {children}
  </p>
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
      <span>ACE Club · 幹訓 Officer Training 01</span>
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

const CredentialRow = ({
  icon,
  text,
  sub,
  compact = false,
  delay = 0,
}: {
  icon: React.ReactNode;
  text: string;
  sub: string;
  compact?: boolean;
  delay?: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: compact ? 14 : 20,
      padding: compact ? '12px 18px' : '15px 28px',
      borderRadius: 14,
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: cardShadow,
      animationDelay: `${delay}ms`,
    }}
  >
    <span style={{ fontSize: compact ? 24 : 26 }}>{icon}</span>
    <span>
      <span style={{ fontSize: compact ? 22 : 24, fontWeight: 600, display: 'block' }}>{text}</span>
      <span
        style={{
          fontSize: compact ? 15 : 17,
          color: palette.muted,
          display: 'block',
          marginTop: 3,
        }}
      >
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

const RoleCard = ({
  sym,
  name,
  nameEn,
  count,
  desc,
  descEn,
  open = false,
  delay = 0,
}: {
  sym: string;
  name: string;
  nameEn: string;
  count: string;
  desc: string;
  descEn: string;
  open?: boolean;
  delay?: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      padding: 24,
      borderRadius: 'var(--osd-radius)',
      background: palette.surface,
      border: `1px solid ${open ? 'var(--osd-accent)' : palette.border}`,
      boxShadow: cardShadow,
      animationDelay: `${delay}ms`,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          background: palette.accentSoft,
          color: 'var(--osd-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 21,
        }}
      >
        {sym}
      </div>
      <span
        style={{
          marginLeft: 'auto',
          fontFamily: fonts.mono,
          fontSize: 14,
          padding: '4px 10px',
          borderRadius: 999,
          background: open ? accentGrad : palette.surfaceHi,
          color: open ? '#FFFFFF' : palette.muted,
          border: open ? 'none' : `1px solid ${palette.chipBorder}`,
        }}
      >
        {count}
      </span>
    </div>
    <div style={{ fontSize: 26, fontWeight: 700 }}>
      {name} <span style={{ fontSize: 16, fontWeight: 500, color: palette.muted }}>{nameEn}</span>
    </div>
    <div style={{ fontSize: 18, marginTop: 8, lineHeight: 1.45 }}>{desc}</div>
    <div style={{ fontSize: 15, color: palette.muted, marginTop: 6, lineHeight: 1.45 }}>
      {descEn}
    </div>
  </div>
);

const ToolCard = ({
  icon,
  name,
  nameEn,
  desc,
  descEn,
  delay = 0,
}: {
  icon: string;
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
  delay?: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      padding: '32px 36px',
      borderRadius: 'var(--osd-radius)',
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: cardShadow,
      display: 'flex',
      alignItems: 'center',
      gap: 26,
      animationDelay: `${delay}ms`,
    }}
  >
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: 16,
        background: palette.accentSoft,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30,
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div>
      <div style={{ fontSize: 30, fontWeight: 700 }}>
        {name}{' '}
        <span style={{ fontSize: 18, fontWeight: 500, color: palette.muted, marginLeft: 4 }}>
          {nameEn}
        </span>
      </div>
      <div style={{ fontSize: 20, marginTop: 6, lineHeight: 1.45 }}>{desc}</div>
      <div style={{ fontSize: 16, color: palette.muted, marginTop: 4, lineHeight: 1.45 }}>
        {descEn}
      </div>
    </div>
  </div>
);

const CompareRow = ({
  mark,
  text,
  textEn,
  good = false,
}: {
  mark: string;
  text: string;
  textEn: string;
  good?: boolean;
}) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, padding: '14px 0' }}>
    <span
      style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: good ? palette.accentSoft : palette.surfaceHi,
        color: good ? 'var(--osd-accent)' : palette.muted,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        flexShrink: 0,
        marginTop: 2,
      }}
    >
      {mark}
    </span>
    <span>
      <span
        style={{
          fontSize: 25,
          color: good ? 'var(--osd-text)' : palette.muted,
          lineHeight: 1.35,
          display: 'block',
          fontWeight: good ? 600 : 400,
        }}
      >
        {text}
      </span>
      <span
        style={{
          fontSize: 17,
          color: palette.muted,
          lineHeight: 1.35,
          display: 'block',
          marginTop: 2,
        }}
      >
        {textEn}
      </span>
    </span>
  </div>
);

const PhaseCard = ({
  num,
  name,
  nameEn,
  desc,
  descEn,
}: {
  num: string;
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
}) => (
  <div
    style={{
      padding: '26px 24px',
      borderRadius: 'var(--osd-radius)',
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: cardShadow,
      height: '100%',
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
      {num}
    </div>
    <div style={{ fontSize: 32, fontWeight: 700, marginTop: 12 }}>{name}</div>
    <div style={{ fontSize: 17, color: palette.muted, marginTop: 2 }}>{nameEn}</div>
    <div style={{ fontSize: 18, marginTop: 10, lineHeight: 1.5 }}>{desc}</div>
    <div style={{ fontSize: 15, color: palette.muted, marginTop: 6, lineHeight: 1.45 }}>
      {descEn}
    </div>
  </div>
);

const TimelineNode = ({
  num,
  name,
  nameEn,
  desc,
  descEn,
}: {
  num: string;
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
}) => (
  <div>
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        width: 26,
        height: 26,
        borderRadius: 999,
        background: accentGrad,
        border: `5px solid ${palette.bg}`,
        boxShadow: '0 4px 14px rgba(46, 111, 224, 0.35)',
      }}
    />
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 17,
        color: 'var(--osd-accent)',
        letterSpacing: '0.1em',
        marginTop: 22,
      }}
    >
      {num}
    </div>
    <div style={{ fontSize: 34, fontWeight: 700, marginTop: 10 }}>{name}</div>
    <div style={{ fontSize: 18, color: palette.muted, marginTop: 3 }}>{nameEn}</div>
    <div style={{ fontSize: 19, marginTop: 12, lineHeight: 1.5, maxWidth: 460 }}>{desc}</div>
    <div
      style={{ fontSize: 16, color: palette.muted, marginTop: 6, lineHeight: 1.45, maxWidth: 460 }}
    >
      {descEn}
    </div>
  </div>
);

const AgendaRow = ({
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
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      padding: '26px 40px',
      borderRadius: 'var(--osd-radius)',
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: cardShadow,
    }}
  >
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 30,
        fontWeight: 600,
        color: 'var(--osd-accent)',
        width: 70,
        flexShrink: 0,
      }}
    >
      {num}
    </div>
    <div style={{ fontSize: 33, fontWeight: 700, width: 380, flexShrink: 0 }}>{title}</div>
    <div>
      <div style={{ fontSize: 23, lineHeight: 1.35 }}>{sub}</div>
      <div style={{ fontSize: 17, color: palette.muted, lineHeight: 1.35, marginTop: 4 }}>
        {subEn}
      </div>
    </div>
  </div>
);

const PromiseRow = ({
  num,
  title,
  titleEn,
  sub,
  subEn,
}: {
  num: string;
  title: string;
  titleEn: string;
  sub: string;
  subEn: string;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      padding: '26px 44px',
      borderRadius: 'var(--osd-radius)',
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: cardShadow,
    }}
  >
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 28,
        fontWeight: 600,
        color: 'var(--osd-accent)',
        width: 64,
        flexShrink: 0,
      }}
    >
      {num}
    </div>
    <div style={{ width: 380, flexShrink: 0 }}>
      <div style={{ fontSize: 34, fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 17, color: palette.muted, marginTop: 4 }}>{titleEn}</div>
    </div>
    <div>
      <div style={{ fontSize: 23, lineHeight: 1.4 }}>{sub}</div>
      <div style={{ fontSize: 17, color: palette.muted, lineHeight: 1.4, marginTop: 4 }}>
        {subEn}
      </div>
    </div>
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

const Cover: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="30%" y="40%" size={1200} opacity={0.32} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        padding: '0 120px',
        gap: 80,
      }}
    >
      <div>
        <div className="ace-fadeup" style={{ marginBottom: 28 }}>
          <AceMark size={64} />
        </div>
        <Eyebrow delay={80}>AI Creators & Executors · 2026–27</Eyebrow>
        <h1
          className="ace-fadeup"
          style={{
            fontSize: 'var(--osd-size-hero)',
            fontWeight: 800,
            margin: '28px 0 16px',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            animationDelay: '160ms',
          }}
        >
          歡迎加入
          <br />
          <span style={gradText}>ACE Club</span>
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
          Welcome to ACE Club
        </p>
        <p
          className="ace-fadeup"
          style={{
            fontSize: 22,
            color: palette.muted,
            maxWidth: 820,
            lineHeight: 1.55,
            margin: 0,
            animationDelay: '240ms',
          }}
        >
          幹訓第一堂：我們是誰、怎麼運作，以及 AI 如何成為我們的超能力。
          <br />
          Lesson 01 — who we are, how we run, and how AI becomes our superpower.
        </p>
      </div>
      <div
        className="ace-fade"
        style={{ animationDelay: '300ms', display: 'flex', justifyContent: 'flex-end' }}
      >
        <Launcher query="開始幹訓" label="Today · 今天的內容">
          <LauncherRow
            icon="⚡"
            title="幹訓 01"
            sub="Officer training · Lesson 1"
            kbd="↵"
            active
            delay={600}
          />
          <LauncherRow icon="👋" title="認識指導老師" sub="Meet your advisor — Ray" delay={690} />
          <LauncherRow icon="🧭" title="社團定位與分工" sub="Why ACE · How we run" delay={780} />
          <LauncherRow icon="🤖" title="AI 實戰工作流" sub="Make AI a daily workflow" delay={870} />
          <LauncherRow
            icon="💡"
            title="創意思考"
            sub="Hands-on: find your pain point"
            delay={960}
          />
        </Launcher>
      </div>
    </div>
    <Footer />
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
          叫我 CY 也可以。我是 ACE Club 的指導老師，這學期帶大家把社團從零開始。
          <br />
          Call me CY — I'm the club advisor, growing ACE Club from zero with you this term.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <CredGroupLabel>稱號 · Roles</CredGroupLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <CredentialRow
                compact
                icon="📱"
                text="iOS Club Lead（2025–26）"
                sub="iOS Club Lead 2025–26"
                delay={300}
              />
              <CredentialRow
                compact
                icon="🚀"
                text="GDG on Campus Associated Lead（2025–26）"
                sub="Google Developer Group 校園副負責人"
                delay={390}
              />
              <CredentialRow
                compact
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
                compact
                icon="🏆"
                text="全國電子設計與 App 競賽第一名"
                sub="1st place · National Electronic Design & App Competition"
                delay={330}
              />
              <CredentialRow
                compact
                icon="🍎"
                text="Apple Teacher Swift Playgrounds"
                sub="Apple 教師認證 · Swift Playgrounds"
                delay={420}
              />
              <CredentialRow
                compact
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

const DividerWhy: Page = () => (
  <Divider
    num="PART 01"
    title="Why ACE"
    sub="一個名字，就是一份行動宣言。"
    subEn="Solving problems. Impacting futures."
  />
);

const NameMeaning: Page = () => (
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
        <span style={gradText}>A</span>I <span style={gradText}>C</span>reators &{' '}
        <span style={gradText}>E</span>xecutors Club
      </h2>
      <EnSub mb={48}>AI 創作者 × 執行者</EnSub>
      <div style={{ display: 'flex', gap: 24 }}>
        <PillarCard
          tag="CREATORS"
          name="動手創作"
          nameEn="Make things"
          sub="不只學工具，每堂社課都要親手做出一個東西。"
          subEn="Every session ends with something you made yourself."
          delay={280}
        />
        <PillarCard
          tag="EXECUTORS"
          name="落地執行"
          nameEn="Ship things"
          sub="想法要變成上線的作品、真實的影響力——做完才算數。"
          subEn="Ideas only count once they ship and make real impact."
          delay={380}
        />
      </div>
    </div>
    <Footer />
  </div>
);

const WhatWeDo: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="100%" y="100%" size={1000} opacity={0.24} />
    <div style={{ padding: '130px 160px 0' }}>
      <Eyebrow>我們做什麼 · What We Do</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 76,
          fontWeight: 800,
          margin: '26px 0 8px',
          lineHeight: 1.1,
          animationDelay: '120ms',
        }}
      >
        Observe. <span style={gradText}>Build.</span> Launch.
      </h2>
      <EnSub mb={36}>觀察 → 打造 → 上線</EnSub>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 1520 }}>
        <Steps>
          <Step>
            <AgendaRow
              num="01"
              title="Problem Discovery"
              sub="用 5 Whys 等業界框架，找出校園與生活的真痛點"
              subEn="Industry frameworks like 5 Whys to spot real pain points"
            />
          </Step>
          <Step>
            <AgendaRow
              num="02"
              title="Skill Building"
              sub="一步步學會 Codex、FigJam 等 AI 與設計工具"
              subEn="Step-by-step mastery of Codex, FigJam & more"
            />
          </Step>
          <Step>
            <AgendaRow
              num="03"
              title="Real Web Execution"
              sub="期末交出能用的網站或工具，不是靜態簡報"
              subEn="Ship a working site or tool by term end — not static slides"
            />
          </Step>
          <Step>
            <AgendaRow
              num="04"
              title="Competition Track"
              sub="這學期打好基礎，下學期代表社團出賽"
              subEn="Build foundations now, compete for the club next semester"
            />
          </Step>
        </Steps>
      </div>
    </div>
    <Footer />
  </div>
);

const Positioning: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="0%" size={1200} opacity={0.2} />
    <div style={{ padding: '150px 160px 0' }}>
      <Eyebrow>定位 · Positioning</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 76,
          fontWeight: 800,
          margin: '30px 0 10px',
          lineHeight: 1.1,
          animationDelay: '120ms',
        }}
      >
        受夠 <span style={gradText}>Basic Clubs</span> 了嗎？
      </h2>
      <EnSub mb={40}>Tired of basic clubs? So are we.</EnSub>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 1600 }}>
        <div
          className="ace-fadeup"
          style={{
            padding: '26px 40px',
            borderRadius: 'var(--osd-radius)',
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            boxShadow: cardShadow,
            animationDelay: '260ms',
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 17,
              color: palette.muted,
              letterSpacing: '0.14em',
              marginBottom: 6,
            }}
          >
            NOT THIS
          </div>
          <CompareRow mark="✕" text="聽完就散的講座社" textEn="Sit-and-listen lecture clubs" />
          <CompareRow
            mark="✕"
            text="只有靜態簡報，沒有作品"
            textEn="Static slides, nothing shipped"
          />
          <CompareRow
            mark="✕"
            text="成員只是名單上的人數"
            textEn="Members as headcount on a roster"
          />
        </div>
        <div
          className="ace-fadeup"
          style={{
            padding: '26px 40px',
            borderRadius: 'var(--osd-radius)',
            background: palette.surface,
            border: `1.5px solid var(--osd-accent)`,
            boxShadow: cardShadow,
            animationDelay: '380ms',
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 17,
              color: 'var(--osd-accent)',
              letterSpacing: '0.14em',
              marginBottom: 6,
            }}
          >
            THIS
          </div>
          <CompareRow mark="✓" text="每堂課都動手做" textEn="Hands-on, every single session" good />
          <CompareRow
            mark="✓"
            text="期末有真的上線的作品"
            textEn="A real, live project by term end"
            good
          />
          <CompareRow
            mark="✓"
            text="培養 creators & problem solvers"
            textEn="We grow creators & problem solvers"
            good
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const Crest = ({
  src,
  x,
  y,
  size,
  rot = 0,
}: {
  src: string;
  x: number;
  y: number;
  size: number;
  rot?: number;
}) => (
  <img
    src={src}
    alt=""
    aria-hidden="true"
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      opacity: 0.1,
      transform: `rotate(${rot}deg)`,
    }}
  />
);

const TargetMembers: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="0%" y="0%" size={1000} opacity={0.24} />
    <Crest src={crestUC} x={1600} y={110} size={150} rot={-6} />
    <Crest src={crestHarvard} x={1360} y={60} size={100} rot={8} />
    <Crest src={crestYale} x={1300} y={240} size={88} rot={-10} />
    <Crest src={crestStanford} x={1735} y={310} size={105} rot={5} />
    <Crest src={crestPrinceton} x={200} y={780} size={105} rot={-8} />
    <Crest src={crestColumbia} x={720} y={820} size={92} rot={6} />
    <Crest src={crestPenn} x={1520} y={775} size={100} rot={-4} />
    <div style={{ padding: '160px 160px 0' }}>
      <Eyebrow>為誰而開 · Who It's For</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 76,
          fontWeight: 800,
          margin: '30px 0 10px',
          lineHeight: 1.1,
          animationDelay: '120ms',
        }}
      >
        這三種人，來對了。
      </h2>
      <EnSub mb={44}>Built for three kinds of people.</EnSub>
      <div style={{ display: 'flex', gap: 24 }}>
        <PillarCard
          tag="TYPE 01"
          name="想解決痛點的人"
          nameEn="The fixer"
          sub="學校那些小麻煩，你早就想有人做個東西來解決。那個人可以是你。"
          subEn="Those school hassles? You've wanted someone to fix them. That someone can be you."
          delay={280}
        />
        <PillarCard
          tag="TYPE 02"
          name="想被看見的申請者"
          nameEn="The applicant"
          sub="申請 UC、Ivy League、M7 時，想有一個別人複製不來的作品可以寫。"
          subEn="Wants one project on the application that nobody else can copy."
          delay={380}
        />
        <PillarCard
          tag="TYPE 03"
          name="零基礎的好奇者"
          nameEn="The curious"
          sub="對 AI、設計、科技好奇，但完全沒寫過程式。沒關係，我們就是從這裡開始。"
          subEn="Curious about AI, design or tech, with zero coding. That's exactly where we start."
          delay={480}
        />
      </div>
    </div>
    <Footer />
  </div>
);

const TrackPanel = ({
  tag,
  ghost,
  icon,
  name,
  nameEn,
  desc,
  descEn,
  goal,
  goalEn,
  featured = false,
  delay = 0,
}: {
  tag: string;
  ghost: string;
  icon: string;
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
  goal: string;
  goalEn: string;
  featured?: boolean;
  delay?: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      flex: 1,
      position: 'relative',
      overflow: 'hidden',
      minHeight: 556,
      padding: '44px 46px',
      borderRadius: 28,
      background: featured ? accentGrad : palette.surface,
      border: featured ? 'none' : `1px solid ${palette.border}`,
      boxShadow: featured
        ? '0 32px 80px rgba(46, 111, 224, 0.32)'
        : '0 18px 50px rgba(0, 0, 0, 0.08)',
      color: featured ? '#FFFFFF' : 'var(--osd-text)',
      animationDelay: `${delay}ms`,
    }}
  >
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: -18,
        bottom: -78,
        fontSize: 300,
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: '-0.04em',
        color: featured ? 'rgba(255, 255, 255, 0.16)' : 'rgba(46, 111, 224, 0.08)',
      }}
    >
      {ghost}
    </div>
    <div style={{ position: 'relative' }}>
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          background: featured ? 'rgba(255, 255, 255, 0.2)' : palette.accentSoft,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 18,
          letterSpacing: '0.16em',
          marginTop: 26,
          color: featured ? 'rgba(255, 255, 255, 0.82)' : 'var(--osd-accent)',
        }}
      >
        {tag}
      </div>
      <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.05, marginTop: 8 }}>{name}</div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 500,
          marginTop: 6,
          color: featured ? 'rgba(255, 255, 255, 0.8)' : palette.muted,
        }}
      >
        {nameEn}
      </div>
      <div style={{ fontSize: 23, lineHeight: 1.55, marginTop: 26, maxWidth: 620 }}>{desc}</div>
      <div
        style={{
          fontSize: 17,
          lineHeight: 1.5,
          marginTop: 6,
          maxWidth: 620,
          color: featured ? 'rgba(255, 255, 255, 0.76)' : palette.muted,
        }}
      >
        {descEn}
      </div>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          marginTop: 28,
          padding: '12px 24px',
          borderRadius: 999,
          fontSize: 21,
          fontWeight: 700,
          background: featured ? 'rgba(255, 255, 255, 0.18)' : palette.accentSoft,
          color: featured ? '#FFFFFF' : 'var(--osd-accent)',
        }}
      >
        <span style={{ fontFamily: fonts.mono, fontSize: 15, opacity: 0.75 }}>GOAL</span>
        {goal}
      </div>
      <div
        style={{
          fontSize: 16,
          marginTop: 8,
          color: featured ? 'rgba(255, 255, 255, 0.72)' : palette.muted,
        }}
      >
        {goalEn}
      </div>
    </div>
  </div>
);

const Goals: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="100%" y="100%" size={1100} opacity={0.3} />
    <Glow x="0%" y="10%" size={900} opacity={0.22} />
    <div style={{ padding: '128px 140px 0' }}>
      <Eyebrow>這學期的目標 · Semester Goals</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 84,
          fontWeight: 800,
          margin: '28px 0 10px',
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          animationDelay: '120ms',
        }}
      >
        分兩組走，<span style={gradText}>各自定義成功。</span>
      </h2>
      <EnSub mb={36}>Two tracks — each defines its own win.</EnSub>
      <div style={{ display: 'flex', gap: 28 }}>
        <TrackPanel
          tag="TRACK 01"
          ghost="01"
          icon="🛠️"
          name="創客組"
          nameEn="Maker"
          desc="做出想做的東西，然後分享出去——沒有評審，只有你想不想做。"
          descEn="Build the thing you want, then share it. No judges — just whether you want it."
          goal="做出來，分享就達標"
          goalEn="Build it, share it — that's the win"
          delay={260}
        />
        <TrackPanel
          featured
          tag="TRACK 02"
          ghost="02"
          icon="🏆"
          name="競賽組"
          nameEn="Competition"
          desc="以賽促學——期末成品做成 App Playground，投稿 Swift Student Challenge。"
          descEn="Learn by competing — ship an App Playground to the Swift Student Challenge."
          goal="投出去，履歷上多一行"
          goalEn="Submit it — earn a line on your résumé"
          delay={360}
        />
      </div>
    </div>
    <Footer />
  </div>
);

const SscStat = ({
  num,
  unit,
  name,
  nameEn,
  desc,
  descEn,
  featured = false,
  delay = 0,
}: {
  num: string;
  unit: string;
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
  featured?: boolean;
  delay?: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      flex: 1,
      padding: '30px 32px',
      borderRadius: 'var(--osd-radius)',
      background: featured ? accentGrad : palette.surface,
      border: featured ? 'none' : `1px solid ${palette.border}`,
      boxShadow: featured ? '0 20px 48px rgba(46, 111, 224, 0.26)' : cardShadow,
      color: featured ? '#FFFFFF' : 'var(--osd-text)',
      animationDelay: `${delay}ms`,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
      <span
        style={{
          fontSize: 88,
          fontWeight: 800,
          lineHeight: 1,
          ...(featured ? {} : gradText),
        }}
      >
        {num}
      </span>
      <span
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: featured ? 'rgba(255, 255, 255, 0.86)' : palette.muted,
        }}
      >
        {unit}
      </span>
    </div>
    <div style={{ fontSize: 26, fontWeight: 700, marginTop: 12 }}>{name}</div>
    <div
      style={{
        fontSize: 18,
        color: featured ? 'rgba(255, 255, 255, 0.78)' : palette.muted,
        marginTop: 4,
      }}
    >
      {nameEn}
    </div>
    <div style={{ fontSize: 19, lineHeight: 1.45, marginTop: 12 }}>{desc}</div>
    <div
      style={{
        fontSize: 16,
        color: featured ? 'rgba(255, 255, 255, 0.78)' : palette.muted,
        lineHeight: 1.45,
        marginTop: 4,
      }}
    >
      {descEn}
    </div>
  </div>
);

const PrizeItem = ({ text, textEn }: { text: string; textEn: string }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
    <span style={{ color: 'var(--osd-accent)', fontSize: 17, flexShrink: 0 }}>✓</span>
    <div>
      <span style={{ fontSize: 21, fontWeight: 600 }}>{text}</span>
      <span style={{ fontSize: 16, color: palette.muted, marginLeft: 8 }}>{textEn}</span>
    </div>
  </div>
);

const SwiftStudentChallenge: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="70%" y="20%" size={1150} opacity={0.24} />
    <div style={{ padding: '150px 160px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Eyebrow>競賽組目標 · Swift Student Challenge</Eyebrow>
        <div
          className="ace-fade"
          style={{ display: 'flex', alignItems: 'center', gap: 24, animationDelay: '240ms' }}
        >
          <img src={appleLogo} alt="Apple" style={{ height: 54, display: 'block' }} />
          <div style={{ width: 1, height: 42, background: palette.chipBorder }} />
          <img src={swiftLogo} alt="Swift" style={{ height: 62, display: 'block' }} />
        </div>
      </div>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 68,
          fontWeight: 800,
          margin: '30px 0 10px',
          lineHeight: 1.15,
          animationDelay: '120ms',
        }}
      >
        Apple 官方的全球學生賽，<span style={gradText}>一年一次。</span>
      </h2>
      <EnSub mb={30}>
        Apple's Swift Student Challenge — one shot a year, open to students worldwide.
      </EnSub>
      <div style={{ display: 'flex', gap: 24 }}>
        <PillarCard
          tag="THE BRIEF · 做什麼"
          name="一個 App Playground"
          nameEn="Build an App Playground"
          sub="用 Swift 做一個三分鐘內玩完的互動作品。"
          subEn="An interactive piece playable in three minutes."
          delay={280}
        />
        <PillarCard
          tag="THE BAR · 評什麼"
          name="創意與影響力"
          nameEn="How it's judged"
          sub="評審看創新、創意、社會影響力與包容性，不是比誰程式碼多。"
          subEn="Innovation, creativity, social impact, inclusivity."
          delay={380}
        />
        <PillarCard
          tag="WHO · 誰能投"
          name="13 歲以上在學生"
          nameEn="Students, 13 and up"
          sub="在學就能投，只要你不是全職開發者。"
          subEn="Enrolled students who aren't full-time developers."
          delay={480}
        />
      </div>
      <div
        className="ace-fadeup"
        style={{
          marginTop: 22,
          padding: '16px 26px',
          borderRadius: 14,
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          fontFamily: fonts.mono,
          fontSize: 18,
          color: palette.muted,
          animationDelay: '580ms',
        }}
      >
        <div>
          時程：每年 2 月開放投稿 · 3 月底公布得獎 · 規格：.swiftpm 專案、25 MB
          以內、離線可跑、內容用英文
        </div>
        <div style={{ fontSize: 15, marginTop: 7, opacity: 0.85 }}>
          Timeline: submissions open in February, winners announced late March · Specs: .swiftpm
          project, under 25 MB, runs offline, content in English
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const SscPrizes: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="30%" y="25%" size={1150} opacity={0.24} />
    <div style={{ padding: '150px 160px 0' }}>
      <Eyebrow>得獎有什麼 · What You Win</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 68,
          fontWeight: 800,
          margin: '30px 0 10px',
          lineHeight: 1.15,
          animationDelay: '120ms',
        }}
      >
        全世界只選 350 人，<span style={gradText}>50 人飛去 Apple Park。</span>
      </h2>
      <EnSub mb={30}>350 winners worldwide — 50 of them flown to Apple Park.</EnSub>
      <div style={{ display: 'flex', gap: 22 }}>
        <SscStat
          num="350"
          unit="人"
          name="全球得獎者"
          nameEn="Winners worldwide"
          desc="今年 350 位得獎者來自 37 個國家與地區。"
          descEn="This year's 350 came from 37 countries."
          delay={280}
        />
        <SscStat
          num="50"
          unit="人"
          name="飛去 Apple Park"
          nameEn="Distinguished Winners"
          desc="作品最出色的 50 位，Apple 招待三天。"
          descEn="The standouts get a three-day visit."
          featured
          delay={380}
        />
        <SscStat
          num="300"
          unit="人"
          name="抽籤有機會去"
          nameEn="A shot at the trip"
          desc="其餘得獎者抽籤，一樣有機會走一趟。"
          descEn="The rest enter a draw for the same visit."
          delay={480}
        />
      </div>
      <div
        className="ace-fadeup"
        style={{
          marginTop: 22,
          display: 'flex',
          alignItems: 'center',
          gap: 36,
          padding: '24px 32px',
          borderRadius: 'var(--osd-radius)',
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          boxShadow: cardShadow,
          animationDelay: '580ms',
        }}
      >
        <img
          src={airpodsMax}
          alt="AirPods Max"
          style={{ height: 168, width: 'auto', flexShrink: 0 }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 30, fontWeight: 700 }}>
            每一位得獎者都拿到
            <span style={{ fontSize: 19, fontWeight: 500, color: palette.muted, marginLeft: 10 }}>
              Every winner gets
            </span>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px 32px',
              marginTop: 16,
            }}
          >
            <PrizeItem text="AirPods Max 2" textEn="就是這副耳機" />
            <PrizeItem text="個人化證書" textEn="A personalized certificate" />
            <PrizeItem text="一年 Apple Developer Program" textEn="One-year membership, free" />
            <PrizeItem text="免費考 Swift 認證" textEn="Free Swift certification exam" />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const WinnerTrait = ({
  icon,
  name,
  nameEn,
  desc,
  descEn,
  example,
  delay = 0,
}: {
  icon: string;
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
  example: string;
  delay?: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '30px 28px',
      borderRadius: 'var(--osd-radius)',
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: cardShadow,
      animationDelay: `${delay}ms`,
    }}
  >
    <div style={{ fontSize: 40, lineHeight: 1 }}>{icon}</div>
    <div style={{ fontSize: 28, fontWeight: 700, marginTop: 18 }}>{name}</div>
    <div style={{ fontSize: 17, color: palette.muted, marginTop: 3 }}>{nameEn}</div>
    <div style={{ fontSize: 19, lineHeight: 1.5, marginTop: 14 }}>{desc}</div>
    <div style={{ fontSize: 15, color: palette.muted, lineHeight: 1.45, marginTop: 5 }}>
      {descEn}
    </div>
    <div
      style={{
        marginTop: 'auto',
        paddingTop: 16,
        borderTop: `1px solid ${palette.border}`,
        fontFamily: fonts.mono,
        fontSize: 14,
        lineHeight: 1.45,
        color: 'var(--osd-accent)',
      }}
    >
      {example}
    </div>
  </div>
);

const WhoWins: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="80%" y="15%" size={1100} opacity={0.24} />
    <div style={{ padding: '140px 140px 0' }}>
      <Eyebrow>什麼樣的人會得獎 · Who Wins</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 68,
          fontWeight: 800,
          margin: '28px 0 10px',
          lineHeight: 1.15,
          animationDelay: '120ms',
        }}
      >
        得獎的不是最會寫程式的人，<span style={gradText}>是最有話想說的人。</span>
      </h2>
      <EnSub mb={32}>
        Winners aren't the best coders — they're the ones with something to say.
      </EnSub>
      <div style={{ display: 'flex', gap: 20, alignItems: 'stretch' }}>
        <WinnerTrait
          icon="🎯"
          name="切身之痛"
          nameEn="Personal motivation"
          desc="題目來自自己或身邊人真的遇過的事，不是想像出來的。"
          descEn="Problems they lived through themselves."
          example="Fast Aid · 急救步驟即時指引（印度）"
          delay={260}
        />
        <WinnerTrait
          icon="🌍"
          name="幫到別人"
          nameEn="Social impact"
          desc="讓被忽略的人被照顧、讓難懂的事變好懂。"
          descEn="Care for the overlooked; clarity for the confused."
          example="MyCycle · 用人話講生理健康（德國）"
          delay={330}
        />
        <WinnerTrait
          icon="🧩"
          name="現學現做"
          nameEn="Self-taught"
          desc="為了把作品做出來，臨時去學一個全新的技能。"
          descEn="Learned whatever it took to ship it."
          example="Yume's Spellbook · 玩遊戲搞懂 LLM（巴西）"
          delay={400}
        />
        <WinnerTrait
          icon="🤝"
          name="願意分享"
          nameEn="Community"
          desc="跟同伴一起學，也把學到的東西帶回去教別人。"
          descEn="They learn with peers and pass it on."
          example="和我們的第三個約定一樣：學到就分享"
          delay={470}
        />
      </div>
      <div
        className="ace-fadeup"
        style={{
          marginTop: 24,
          fontFamily: fonts.mono,
          fontSize: 16,
          color: palette.muted,
          lineHeight: 1.5,
          animationDelay: '560ms',
        }}
      >
        2025 年 Distinguished Winners
        來自印度、巴西、美國、日本、中國、德國——六個國家，六個不同的痛點。
        <br />
        developer.apple.com/swift-student-challenge/distinguished-winners
      </div>
    </div>
    <Footer />
  </div>
);

const Roadmap: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="100%" size={1200} opacity={0.24} />
    <div style={{ padding: '160px 160px 0' }}>
      <Eyebrow>16 堂課藍圖 · 16-Lesson Roadmap</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 76,
          fontWeight: 800,
          margin: '30px 0 10px',
          lineHeight: 1.1,
          animationDelay: '120ms',
        }}
      >
        十六堂課，三個階段。
      </h2>
      <EnSub mb={40}>Sixteen lessons, three phases.</EnSub>
      <div
        className="ace-fadeup"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: fonts.mono,
          fontSize: 16,
          color: palette.muted,
          letterSpacing: '0.08em',
          marginBottom: 16,
          animationDelay: '220ms',
        }}
      >
        <span>LESSON 01</span>
        <span>LESSON 16</span>
      </div>
      <div style={{ position: 'relative' }}>
        <div
          aria-hidden="true"
          className="ace-fade"
          style={{
            position: 'absolute',
            left: 4,
            right: 10,
            top: 11,
            height: 4,
            borderRadius: 2,
            background: accentGrad,
            animationDelay: '260ms',
          }}
        />
        <div
          aria-hidden="true"
          className="ace-fade"
          style={{
            position: 'absolute',
            right: -4,
            top: 2,
            width: 0,
            height: 0,
            borderTop: '11px solid transparent',
            borderBottom: '11px solid transparent',
            borderLeft: '16px solid #2E6FE0',
            animationDelay: '260ms',
          }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
          <Steps>
            <Step>
              <TimelineNode
                num="PHASE 01"
                name="Discover & Plan"
                nameEn="發現與規劃"
                desc="找出真實的校園與生活問題，用 AI 工具規劃解法。"
                descEn="Spot real school & life problems; plan solutions with AI tools."
              />
            </Step>
            <Step>
              <TimelineNode
                num="PHASE 02"
                name="Build & Design"
                nameEn="打造與設計"
                desc="做出可互動、可點擊的網頁原型——不需要程式背景。"
                descEn="Create interactive, clickable web prototypes — no coding needed."
              />
            </Step>
            <Step>
              <TimelineNode
                num="PHASE 03"
                name="Launch & Portfolio"
                nameEn="上線與作品集"
                desc="打磨、發表，帶走一個能放進大學申請的作品。"
                descEn="Polish, present, and walk away with a college-ready piece."
              />
            </Step>
          </Steps>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const DividerHow: Page = () => (
  <Divider
    num="PART 02"
    title="How we run"
    sub="好的社團不是靠熱情硬撐，是靠系統運轉。"
    subEn="Great clubs run on systems, not adrenaline."
  />
);

const Roles: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="0%" size={1300} opacity={0.24} />
    <div style={{ padding: '120px 120px 0' }}>
      <Eyebrow>幹部分工 · Officer Roles</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 64,
          fontWeight: 800,
          margin: '26px 0 8px',
          lineHeight: 1.1,
          animationDelay: '120ms',
        }}
      >
        每個位置，都是關鍵角色。
      </h2>
      <EnSub mb={32}>Every seat is a key role.</EnSub>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
        <RoleCard
          sym="♠"
          name="社長"
          nameEn="President"
          count="×1"
          desc="定方向、扛決策、對外代表社團。"
          descEn="Direction, decisions, the face of the club."
          delay={260}
        />
        <RoleCard
          sym="♥"
          name="副社長"
          nameEn="Vice President"
          count="×1"
          desc="補位一切、盯進度，社長的第二大腦。"
          descEn="Covers gaps, tracks progress."
          delay={320}
        />
        <RoleCard
          sym="📚"
          name="學術長"
          nameEn="Academic Lead"
          count="×2"
          desc="設計社課與教材，社課品質的靈魂。"
          descEn="Designs lessons & materials."
          delay={380}
        />
        <RoleCard
          sym="🎪"
          name="活動長"
          nameEn="Events Lead"
          count="×2"
          desc="主辦園遊會等活動，從企劃到執行。"
          descEn="Runs events like the school fair."
          delay={440}
        />
        <RoleCard
          sym="📣"
          name="公關長"
          nameEn="PR Lead"
          count="×2"
          desc="對外聯繫與溝通：學校、廠商、其他社團。"
          descEn="External contact & communication."
          delay={500}
        />
        <RoleCard
          sym="💰"
          name="財務長"
          nameEn="Finance Lead"
          count="×2"
          desc="管理社費：收支、預算、報帳。"
          descEn="Club fees — budget & expenses."
          delay={560}
        />
        <RoleCard
          sym="✍️"
          name="秘書"
          nameEn="Secretary"
          count="×1"
          desc="社團資料、表單與紀錄的守門人。"
          descEn="Owns paperwork, forms & records."
          delay={620}
        />
        <RoleCard
          sym="🎨"
          name="美編"
          nameEn="Design"
          count="缺 OPEN"
          desc="視覺與社群圖文——虛位以待，歡迎學弟妹。"
          descEn="Visuals & graphics — open for juniors!"
          open
          delay={680}
        />
      </div>
    </div>
    <Footer />
  </div>
);

const Collaboration: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="0%" y="100%" size={1000} opacity={0.28} />
    <div style={{ padding: '170px 160px 0' }}>
      <Eyebrow>協作方式 · How We Work</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 80,
          fontWeight: 800,
          margin: '30px 0 10px',
          lineHeight: 1.1,
          animationDelay: '120ms',
        }}
      >
        我們怎麼一起工作。
      </h2>
      <EnSub mb={48}>Three habits that keep us running.</EnSub>
      <div style={{ display: 'flex', gap: 24 }}>
        <PillarCard
          tag="01 · 每週四"
          name="Club Period"
          nameEn="同步"
          sub="每週四社課日，課前十分鐘對齊：誰主帶、誰支援、器材誰負責。"
          subEn="Ten minutes before each Thursday session: who leads, who supports, who owns gear."
          delay={280}
        />
        <PillarCard
          tag="02 · 一切留痕"
          name="文件即記憶"
          nameEn="Docs as memory"
          sub="決議、教材、範本全進共用文件庫，新幹部隨時接得上。"
          subEn="Decisions, materials, templates — all in shared docs, so anyone can pick up."
          delay={380}
        />
        <PillarCard
          tag="03 · 互相補位"
          name="沒有孤軍"
          nameEn="No lone wolves"
          sub="忙不過來就提早喊，任務有人接——這是團隊的默契。"
          subEn="Shout early when overloaded — someone will catch the task."
          delay={480}
        />
      </div>
    </div>
    <Footer />
  </div>
);

const Lifecycle: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="100%" size={1200} opacity={0.24} />
    <div style={{ padding: '150px 120px 0' }}>
      <div style={{ padding: '0 40px' }}>
        <Eyebrow>SOP · 活動流程</Eyebrow>
        <h2
          className="ace-fadeup"
          style={{
            fontSize: 76,
            fontWeight: 800,
            margin: '30px 0 10px',
            lineHeight: 1.1,
            animationDelay: '120ms',
          }}
        >
          一場活動（社課）的生命週期。
        </h2>
        <EnSub mb={40}>The life of an event — or a session — in five beats.</EnSub>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 18,
          padding: '0 40px',
        }}
      >
        <Steps>
          <Step>
            <PhaseCard
              num="01"
              name="提案"
              nameEn="Propose"
              desc="一頁企劃：目標、對象、產出。"
              descEn="One-page plan: goal, audience, output."
            />
          </Step>
          <Step>
            <PhaseCard
              num="02"
              name="籌備"
              nameEn="Prepare"
              desc="拆任務、認領、排時程。"
              descEn="Split tasks, claim them, set the timeline."
            />
          </Step>
          <Step>
            <PhaseCard
              num="03"
              name="宣傳"
              nameEn="Promote"
              desc="美編＋公關聯手，AI 出素材初稿。"
              descEn="Design × PR, with AI drafting assets."
            />
          </Step>
          <Step>
            <PhaseCard
              num="04"
              name="執行"
              nameEn="Run"
              desc="照 checklist 跑，突發有人補位。"
              descEn="Run the checklist; surprises get covered."
            />
          </Step>
          <Step>
            <PhaseCard
              num="05"
              name="復盤"
              nameEn="Review"
              desc="15 分鐘記下：下次怎麼更好。"
              descEn="15 minutes: what to improve next time."
            />
          </Step>
        </Steps>
      </div>
    </div>
    <Footer />
  </div>
);

const DividerAI: Page = () => (
  <Divider
    num="PART 03"
    title="AI in action"
    sub="工具不會讓社團變強，工作流才會。"
    subEn="Tools don't make a club strong — workflows do."
  />
);

const Mindset: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="30%" y="30%" size={1000} opacity={0.24} />
    <div style={{ padding: '150px 160px 0' }}>
      <Eyebrow>心法 · Mindset</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 72,
          fontWeight: 800,
          margin: '30px 0 10px',
          lineHeight: 1.15,
          animationDelay: '120ms',
        }}
      >
        AI 不是取代你，<span style={gradText}>是放大你。</span>
      </h2>
      <EnSub mb={40}>AI doesn't replace you. It amplifies you.</EnSub>
      <div
        style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 40, alignItems: 'start' }}
      >
        <div
          className="ace-fadeup"
          style={{
            background: '#1D1D1F',
            color: '#F5F5F7',
            borderRadius: 'var(--osd-radius)',
            padding: '28px 32px',
            fontFamily: fonts.mono,
            fontSize: 21,
            lineHeight: 1.7,
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.18)',
            animationDelay: '280ms',
          }}
        >
          <div style={{ color: '#86868B' }}>{'// 幹部的日常 prompt · a daily officer prompt'}</div>
          <div style={{ marginTop: 10 }}>
            <span style={{ color: '#6C9BF0' }}>&gt;</span> 把這份社課大綱，
          </div>
          <div style={{ paddingLeft: 26 }}>改寫成 3 則 IG 貼文文案，</div>
          <div style={{ paddingLeft: 26 }}>語氣：活潑、對象：高一新生，</div>
          <div style={{ paddingLeft: 26 }}>
            範本：參考{' '}
            <a
              href="https://www.instagram.com/fcu.iosclub/"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#6C9BF0', textDecoration: 'underline', textUnderlineOffset: 4 }}
            >
              @fcu.iosclub
            </a>{' '}
            的 IG 貼文
            <span
              className="ace-caret"
              style={{
                display: 'inline-block',
                width: 2,
                height: 21,
                background: '#6C9BF0',
                marginLeft: 6,
                verticalAlign: 'middle',
              }}
            />
          </div>
          <div style={{ color: '#86868B', marginTop: 12, fontSize: 17 }}>
            {'// "Rewrite as 3 IG captions — upbeat, for freshmen, styled after @fcu.iosclub."'}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            className="ace-fadeup"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              padding: '18px 24px',
              borderRadius: 14,
              background: palette.surface,
              border: `1px solid ${palette.border}`,
              boxShadow: cardShadow,
              animationDelay: '360ms',
            }}
          >
            <div style={{ minWidth: 96 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--osd-accent)' }}>更快</div>
              <div style={{ fontSize: 14, color: palette.muted }}>Faster</div>
            </div>
            <div>
              <div style={{ fontSize: 20, lineHeight: 1.4 }}>初稿交給 AI，你負責判斷與修改</div>
              <div style={{ fontSize: 16, color: palette.muted, lineHeight: 1.4, marginTop: 2 }}>
                AI drafts; you judge and refine
              </div>
            </div>
          </div>
          <div
            className="ace-fadeup"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              padding: '18px 24px',
              borderRadius: 14,
              background: palette.surface,
              border: `1px solid ${palette.border}`,
              boxShadow: cardShadow,
              animationDelay: '460ms',
            }}
          >
            <div style={{ minWidth: 96 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--osd-accent)' }}>更穩</div>
              <div style={{ fontSize: 14, color: palette.muted }}>Steadier</div>
            </div>
            <div>
              <div style={{ fontSize: 20, lineHeight: 1.4 }}>丟範本給 AI，品質不看運氣</div>
              <div style={{ fontSize: 16, color: palette.muted, lineHeight: 1.4, marginTop: 2 }}>
                Feed AI good examples — quality without luck
              </div>
            </div>
          </div>
          <div
            className="ace-fadeup"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              padding: '18px 24px',
              borderRadius: 14,
              background: palette.surface,
              border: `1px solid ${palette.border}`,
              boxShadow: cardShadow,
              animationDelay: '560ms',
            }}
          >
            <div style={{ minWidth: 96 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--osd-accent)' }}>更遠</div>
              <div style={{ fontSize: 14, color: palette.muted }}>Further</div>
            </div>
            <div>
              <div style={{ fontSize: 20, lineHeight: 1.4 }}>時間留給只有你能做的事</div>
              <div style={{ fontSize: 16, color: palette.muted, lineHeight: 1.4, marginTop: 2 }}>
                Save your time for what only you can do
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const SpeakHumanCard = ({
  zh,
  en,
  desc,
  descEn,
  delay = 0,
}: {
  zh: string;
  en: string;
  desc: string;
  descEn: string;
  delay?: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      padding: '18px 24px',
      borderRadius: 14,
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: cardShadow,
      animationDelay: `${delay}ms`,
    }}
  >
    <div style={{ minWidth: 96 }}>
      <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--osd-accent)' }}>{zh}</div>
      <div style={{ fontSize: 14, color: palette.muted }}>{en}</div>
    </div>
    <div>
      <div style={{ fontSize: 20, lineHeight: 1.4 }}>{desc}</div>
      <div style={{ fontSize: 16, color: palette.muted, lineHeight: 1.4, marginTop: 2 }}>
        {descEn}
      </div>
    </div>
  </div>
);

const SpeakHuman: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="80%" y="25%" size={1100} opacity={0.22} />
    <div style={{ padding: '150px 160px 0' }}>
      <Eyebrow>主講重點 · Key Message</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 72,
          fontWeight: 800,
          margin: '30px 0 10px',
          lineHeight: 1.15,
          animationDelay: '120ms',
        }}
      >
        要讓 AI 不像 AI，<span style={gradText}>不然人家會反感。</span>
      </h2>
      <EnSub mb={36}>
        Make AI not sound like AI — the moment it reads like a robot, people push back.
      </EnSub>
      <div
        style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 40, alignItems: 'start' }}
      >
        <div
          className="ace-fadeup"
          style={{
            background: '#1D1D1F',
            color: '#F5F5F7',
            borderRadius: 'var(--osd-radius)',
            padding: '28px 32px',
            fontFamily: fonts.mono,
            fontSize: 21,
            lineHeight: 1.7,
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.18)',
            animationDelay: '280ms',
          }}
        >
          <div style={{ color: '#86868B' }}>{'// 裝好之後，只要說 · once installed, just say'}</div>
          <div style={{ marginTop: 10 }}>
            <span style={{ color: '#6C9BF0' }}>&gt;</span> 幫這段去 AI 味
            <span
              className="ace-caret"
              style={{
                display: 'inline-block',
                width: 2,
                height: 21,
                background: '#6C9BF0',
                marginLeft: 6,
                verticalAlign: 'middle',
              }}
            />
          </div>
          <div style={{ color: '#86868B', marginTop: 18 }}>{'// Before · AI 味'}</div>
          <div style={{ color: '#B7B7BC' }}>
            在快速發展的數位時代，我們致力於打造全方位的學習體驗。
          </div>
          <div style={{ color: '#86868B', marginTop: 12 }}>{'// After · 人話'}</div>
          <div style={{ color: '#6C9BF0' }}>我們想讓每個社員，都真的學到東西。</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <SpeakHumanCard
            zh="會反感"
            en="Backfire"
            desc="一眼認出是 AI，讀的人就先扣分"
            descEn="Spot the AI, and the reader tunes out"
            delay={360}
          />
          <SpeakHumanCard
            zh="沒誠意"
            en="Feels lazy"
            desc="社團貼文像機器人寫的，很傷"
            descEn="Robot-sounding club posts cost us trust"
            delay={460}
          />
          <SpeakHumanCard
            zh="有解法"
            en="The fix"
            desc="speak-human-tw 抓 38 種 AI 痕跡"
            descEn="speak-human-tw flags 38 AI tells"
            delay={560}
          />
        </div>
      </div>
      <a
        className="ace-fadeup"
        href="https://github.com/Raymondhou0917/speak-human-tw"
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 14,
          marginTop: 28,
          padding: '14px 26px',
          borderRadius: 999,
          border: `1px solid ${palette.chipBorder}`,
          background: palette.surface,
          boxShadow: cardShadow,
          fontFamily: fonts.mono,
          fontSize: 20,
          color: 'var(--osd-text)',
          textDecoration: 'none',
          animationDelay: '660ms',
        }}
      >
        <span aria-hidden="true">⭐</span>
        github.com/Raymondhou0917/speak-human-tw
        <span style={{ color: palette.muted, fontFamily: fonts.sans, fontSize: 18 }}>
          免費開源，回去就能試 · free & open source
        </span>
      </a>
    </div>
    <Footer />
  </div>
);

const Toolbox: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="50%" size={1400} opacity={0.2} />
    <div style={{ padding: '150px 160px 0' }}>
      <Eyebrow>工具箱 · Toolbox</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 72,
          fontWeight: 800,
          margin: '30px 0 10px',
          lineHeight: 1.1,
          animationDelay: '120ms',
        }}
      >
        四類工具，覆蓋幹部 90% 的日常。
      </h2>
      <EnSub mb={36}>Four tool families cover 90% of the job.</EnSub>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22 }}>
        <ToolCard
          icon="💬"
          name="對話助手"
          nameEn="Chat assistants"
          desc="ChatGPT／Claude／Gemini：企劃、文案、腦力激盪。"
          descEn="Plans, copywriting, brainstorms."
          delay={260}
        />
        <ToolCard
          icon="🛠️"
          name="AI 寫程式"
          nameEn="AI coding"
          desc="Codex：零程式背景，也能把原型變成真的。"
          descEn="From prototype to real — no coding background."
          delay={350}
        />
        <ToolCard
          icon="🎨"
          name="設計協作"
          nameEn="Design tools"
          desc="FigJam：流程圖、海報、社群素材。"
          descEn="Flowcharts, posters, social assets."
          delay={440}
        />
        <ToolCard
          icon="📚"
          name="知識整理"
          nameEn="Knowledge base"
          desc="NotebookLM：教材、研究、紀錄一站搞定。"
          descEn="Materials, research and notes in one place."
          delay={530}
        />
      </div>
    </div>
    <Footer />
  </div>
);

const Expectations: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="100%" y="0%" size={1000} opacity={0.28} />
    <div style={{ padding: '150px 160px 0' }}>
      <Eyebrow>期待與約定 · Our Promises</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 80,
          fontWeight: 800,
          margin: '30px 0 10px',
          lineHeight: 1.1,
          animationDelay: '120ms',
        }}
      >
        三個約定。
      </h2>
      <EnSub mb={40}>Three promises we make to each other.</EnSub>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1500 }}>
        <Steps>
          <Step>
            <PromiseRow
              num="01"
              title="出席，或提前說"
              titleEn="Show up — or speak up early"
              sub="來不了不是問題，消失才是——提早喊就有人補位。"
              subEn="Missing is fine; vanishing isn't. Call early and someone covers."
            />
          </Step>
          <Step>
            <PromiseRow
              num="02"
              title="主導一件事"
              titleEn="Own one thing"
              sub="每學期至少當一次 owner：一堂課、一場活動、一個專案。"
              subEn="Be the owner at least once a term: a lesson, an event, a project."
            />
          </Step>
          <Step>
            <PromiseRow
              num="03"
              title="學到就分享"
              titleEn="Learn it, share it"
              sub="發現好用的 AI 工作流，帶回來教大家。"
              subEn="Found a great AI workflow? Bring it back and teach us."
            />
          </Step>
        </Steps>
      </div>
    </div>
    <Footer />
  </div>
);

const DividerThink: Page = () => (
  <Divider
    num="PART 04"
    title="Think Creative"
    sub="說明結束——換你們動腦。"
    subEn="Enough talk. Your turn to think."
  />
);

const WhatWouldYouBuild: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="45%" size={1400} opacity={0.34} />
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
      <Eyebrow>換你動腦 · Your Turn</Eyebrow>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 44,
          fontWeight: 600,
          lineHeight: 1.4,
          margin: '44px 0 0',
          animationDelay: '140ms',
        }}
      >
        如果現在要讓你解決一個問題，
        <br />
        或是做出一個作品——
      </p>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 104,
          fontWeight: 800,
          lineHeight: 1.1,
          margin: '26px 0 0',
          ...gradText,
          animationDelay: '260ms',
        }}
      >
        你會想做什麼？
      </h1>
      <p
        className="ace-fadeup"
        style={{ fontSize: 26, color: palette.muted, margin: '20px 0 0', animationDelay: '340ms' }}
      >
        If you could fix one problem or build one thing — what would it be?
      </p>
    </div>
    <Footer />
  </div>
);

const BelongsToYou: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="40%" size={1400} opacity={0.32} />
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
      <Eyebrow>為自己而做 · Make It Yours</Eyebrow>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 96,
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
          margin: '40px 0 0',
          animationDelay: '140ms',
        }}
      >
        Build something
        <br />
        <span style={gradText}>that belongs to you.</span>
      </h1>
      <p
        className="ace-fadeup"
        style={{ fontSize: 40, fontWeight: 600, margin: '30px 0 0', animationDelay: '260ms' }}
      >
        做一個真正屬於你的東西。
      </p>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 26,
          lineHeight: 1.6,
          maxWidth: 1150,
          margin: '30px 0 0',
          animationDelay: '340ms',
        }}
      >
        不是為了交作業，也不是為了分數。是那種你會主動想拿給朋友看、下課還想繼續改下去的東西。
      </p>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 21,
          color: palette.muted,
          lineHeight: 1.55,
          maxWidth: 1150,
          margin: '14px 0 0',
          animationDelay: '400ms',
        }}
      >
        Not for a grade, not for homework — the kind of thing you'd show a friend unprompted, and
        keep tinkering with after class.
      </p>
    </div>
    <Footer />
  </div>
);

const LifePhoto = ({ src, alt, delay = 0 }: { src: string; alt: string; delay?: number }) => (
  <img
    className="ace-fadeup"
    src={src}
    alt={alt}
    style={{
      width: '100%',
      aspectRatio: '606 / 353',
      objectFit: 'cover',
      display: 'block',
      borderRadius: 18,
      border: `1px solid ${palette.border}`,
      boxShadow: cardShadow,
      animationDelay: `${delay}ms`,
    }}
  />
);

const ExperienceYourLife: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="0%" size={1100} opacity={0.24} />
    <div style={{ padding: '104px 140px 0' }}>
      <Eyebrow>但先去生活 · But First</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 76,
          fontWeight: 800,
          margin: '22px 0 8px',
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          animationDelay: '120ms',
        }}
      >
        But first, <span style={gradText}>experience your life.</span>
      </h2>
      <p
        className="ace-fadeup"
        style={{ fontSize: 24, color: palette.muted, margin: '0 0 26px', animationDelay: '200ms' }}
      >
        靈感不會從螢幕裡長出來——先去把日子過得精彩，題目自己會找上你。
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        <LifePhoto src={life01} alt="社課帶大家拍片" delay={280} />
        <LifePhoto src={life02} alt="電腦教室裡的工作坊" delay={330} />
        <LifePhoto src={life03} alt="錄影訪談" delay={380} />
        <LifePhoto src={life04} alt="教小朋友動手做" delay={430} />
        <LifePhoto src={life05} alt="迪士尼樂園" delay={480} />
        <LifePhoto src={life06} alt="體驗 eVTOL 載人飛行器" delay={530} />
      </div>
    </div>
    <Footer />
  </div>
);

const CodePowerZh: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="45%" size={1400} opacity={0.26} />
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
        style={{ fontSize: 32, color: palette.muted, letterSpacing: '0.01em' }}
      >
        - The power of code drives change in the world -
      </div>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 96,
          fontWeight: 800,
          lineHeight: 1.24,
          letterSpacing: '-0.01em',
          margin: '40px 0 0',
          animationDelay: '80ms',
        }}
      >
        <span style={{ position: 'relative', display: 'inline-block' }}>
          程式碼
          <span
            className="ace-swipe"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 2,
              height: 8,
              borderRadius: 4,
              background: 'var(--osd-accent)',
              animationDelay: '380ms',
            }}
          />
        </span>
        的力量，
        <br />
        推動
        <span style={{ position: 'relative', display: 'inline-block', padding: '0 20px' }}>
          <span
            className="ace-swipe"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: -4,
              bottom: -4,
              borderRadius: 999,
              background: 'rgba(46, 111, 224, 0.16)',
              animationDelay: '540ms',
            }}
          />
          <span style={{ position: 'relative' }}>世界的改變</span>
        </span>
        。
      </h2>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 34,
          lineHeight: 1.75,
          maxWidth: 1180,
          margin: '44px 0 0',
          animationDelay: '600ms',
        }}
      >
        學習編碼，有助於學生在一開始就建立信心，並培養解決問題的技能。用 Apple
        編寫程式碼，為教育工作者帶來各種工具和資源，幫助學生表達自我，無論將來從事哪一行，都能做好充分準備。
      </p>
      <div
        className="ace-fadeup"
        style={{
          fontFamily: fonts.mono,
          fontSize: 20,
          color: palette.muted,
          marginTop: 20,
          animationDelay: '680ms',
        }}
      >
        — Apple 教育
      </div>
    </div>
    <Footer />
  </div>
);

const CodePowerLine = ({ focus }: { focus?: string }) => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="50%" size={1400} opacity={0.2} />
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
        style={{ fontSize: 86, fontWeight: 800, lineHeight: 1.14, letterSpacing: '-0.02em' }}
      >
        The power of code drives change
      </div>
      <div
        className="ace-fadeup"
        style={{
          fontSize: 104,
          fontWeight: 800,
          lineHeight: 1.14,
          letterSpacing: '-0.02em',
          animationDelay: '120ms',
        }}
      >
        in {focus ? <span style={{ color: 'var(--osd-accent)' }}>{focus}</span> : 'the'} world
      </div>
    </div>
    <Footer />
  </div>
);

const CodeChangeWorld: Page = () => <CodePowerLine />;
const CodeChangeFriend: Page = () => <CodePowerLine focus="your friend’s" />;
const CodeChangeSchool: Page = () => <CodePowerLine focus="your school’s" />;
const CodeChangeClub: Page = () => <CodePowerLine focus="your club’s" />;
const CodeChangeYou: Page = () => <CodePowerLine focus="your" />;

const IdentifyProblem: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="15%" y="55%" size={1200} opacity={0.3} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 160px',
      }}
    >
      <Eyebrow>第一步 · Step One</Eyebrow>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 100,
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
          margin: '36px 0 0',
          animationDelay: '140ms',
        }}
      >
        Identify the problem
        <br />
        <span style={gradText}>you want to solve.</span>
      </h1>
      <p
        className="ace-fadeup"
        style={{ fontSize: 40, fontWeight: 600, margin: '32px 0 0', animationDelay: '260ms' }}
      >
        先找出你想解決的那個問題。
      </p>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 24,
          color: palette.muted,
          lineHeight: 1.6,
          maxWidth: 1100,
          margin: '14px 0 0',
          animationDelay: '340ms',
        }}
      >
        不用是大問題。越具體、越貼近你自己的生活，越好做。
      </p>
    </div>
    <Footer />
  </div>
);

const CoreValue: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="45%" size={1300} opacity={0.32} />
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
      <Eyebrow>創作動機與目的 · Why We Create</Eyebrow>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 108,
          fontWeight: 800,
          margin: '44px 0 18px',
          lineHeight: 1.1,
          ...gradText,
          animationDelay: '140ms',
        }}
      >
        找出產品核心價值
      </h1>
      <p
        className="ace-fadeup"
        style={{ fontSize: 30, color: palette.muted, margin: 0, animationDelay: '220ms' }}
      >
        Find your product's core value.
      </p>
      <p
        className="ace-fadeup"
        style={{ fontSize: 34, marginTop: 52, lineHeight: 1.5, animationDelay: '300ms' }}
      >
        幫助使用者解決⋯⋯？
        <span
          className="ace-caret"
          style={{
            display: 'inline-block',
            width: 3,
            height: 32,
            background: 'var(--osd-accent)',
            marginLeft: 8,
            verticalAlign: 'middle',
          }}
        />
      </p>
      <p
        className="ace-fadeup"
        style={{ fontSize: 22, color: palette.muted, margin: '10px 0 0', animationDelay: '360ms' }}
      >
        What does it help your users solve?
      </p>
    </div>
    <Footer />
  </div>
);

const PainPrompt: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="50%" size={1400} opacity={0.32} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 140px',
      }}
    >
      <Eyebrow>暖身 · Warm-up</Eyebrow>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 88,
          fontWeight: 800,
          margin: '48px 0 22px',
          lineHeight: 1.25,
          animationDelay: '140ms',
        }}
      >
        說出目前生活中遇到的<span style={gradText}>問題（痛點）</span>
      </h1>
      <p
        className="ace-fadeup"
        style={{ fontSize: 28, color: palette.muted, margin: 0, animationDelay: '240ms' }}
      >
        Call out a problem you're living with right now — a pain point.
      </p>
    </div>
    <Footer />
  </div>
);

const HearOtherStories: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="45%" size={1400} opacity={0.32} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 140px',
      }}
    >
      <Eyebrow>案例時間 · Case Studies</Eyebrow>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 96,
          fontWeight: 800,
          margin: '48px 0 22px',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          animationDelay: '140ms',
        }}
      >
        我們來聽聽<span style={gradText}>別人的故事。</span>
      </h1>
      <p
        className="ace-fadeup"
        style={{ fontSize: 28, color: palette.muted, margin: 0, animationDelay: '240ms' }}
      >
        Let's hear how other people did it.
      </p>
      <p
        className="ace-fadeup"
        style={{ fontSize: 26, lineHeight: 1.6, margin: '44px 0 0', animationDelay: '340ms' }}
      >
        三個團隊、三個痛點——看他們怎麼把自己的煩惱，變成幾百萬人在用的產品。
      </p>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 21,
          color: palette.muted,
          lineHeight: 1.55,
          margin: '12px 0 0',
          animationDelay: '400ms',
        }}
      >
        Three teams, three pain points — and how each turned a personal annoyance into a product
        millions use.
      </p>
    </div>
    <Footer />
  </div>
);

const FounderMystery: Page = () => (
  <div style={{ ...fill, background: '#0B1B2B' }}>
    <Style />
    <img
      src={kytuPhoto}
      alt="Dcard 創辦人林裕欽"
      className="ace-fade"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(to top, rgba(4, 12, 24, 0.82) 0%, rgba(4, 12, 24, 0.3) 34%, rgba(4, 12, 24, 0) 58%)',
      }}
    />
    <div
      className="ace-fadeup"
      style={{ position: 'absolute', left: 120, bottom: 96, animationDelay: '300ms' }}
    >
      <div style={{ fontSize: 56, fontWeight: 800, color: '#FFFFFF' }}>
        他，大二那年也有一個痛點。
      </div>
      <div style={{ fontSize: 24, color: 'rgba(255, 255, 255, 0.75)', marginTop: 12 }}>
        In his sophomore year, he had a pain point too.
      </div>
    </div>
  </div>
);

const DcardProduct: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="15%" y="30%" size={1000} opacity={0.28} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 1.05fr',
        alignItems: 'center',
        padding: '0 140px',
        gap: 80,
      }}
    >
      <div className="ace-fade" style={{ animationDelay: '200ms' }}>
        <img
          src={dcardLogo}
          alt="Dcard"
          style={{
            width: '100%',
            borderRadius: 24,
            display: 'block',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.16)',
          }}
        />
      </div>
      <div>
        <Eyebrow>案例 · Case Study</Eyebrow>
        <h2
          className="ace-fadeup"
          style={{
            fontSize: 60,
            fontWeight: 800,
            margin: '24px 0 8px',
            lineHeight: 1.15,
            animationDelay: '120ms',
          }}
        >
          他做出了 <span style={gradText}>Dcard</span>。
        </h2>
        <EnSub mb={30}>Flip a card at midnight, make one new friend.</EnSub>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <CredentialRow
            icon="🃏"
            text="翻卡交友：每天午夜 12 點，抽到一位神秘卡友"
            sub="Every midnight, the app deals you one mystery card"
            delay={300}
          />
          <CredentialRow
            icon="👋"
            text="互相送出邀請，配對成功就成為朋友"
            sub="Both send invites? You match and become friends"
            delay={390}
          />
          <CredentialRow
            icon="🚀"
            text="後來長成 400 萬人的匿名社群"
            sub="It grew into a 4M-member anonymous community"
            delay={480}
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const DcardPain: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="45%" size={1300} opacity={0.28} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 140px',
      }}
    >
      <Eyebrow>點名時間 · Your Turn</Eyebrow>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 76,
          fontWeight: 800,
          margin: '44px 0 18px',
          lineHeight: 1.3,
          maxWidth: 1500,
          animationDelay: '140ms',
        }}
      >
        你覺得，讀<span style={gradText}>資管系</span>的他，
        <br />
        遇到了什麼問題？
      </h1>
      <p
        className="ace-fadeup"
        style={{ fontSize: 26, color: palette.muted, margin: 0, animationDelay: '240ms' }}
      >
        What problem do you think he ran into, studying Information Management?
      </p>
      <Steps>
        <Step>
          <div
            style={{
              marginTop: 60,
              padding: '30px 52px',
              borderRadius: 'var(--osd-radius)',
              background: palette.surface,
              border: `1.5px solid var(--osd-accent)`,
              boxShadow: cardShadow,
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 700 }}>
              😅 班上女生少得可憐——他想<span style={gradText}>認識女生</span>。
            </div>
            <div style={{ fontSize: 19, color: palette.muted, marginTop: 8 }}>
              Barely any girls in class — he wanted to meet girls.
            </div>
          </div>
        </Step>
      </Steps>
    </div>
    <Footer />
  </div>
);

const PhotoCase = ({
  src,
  alt,
  caption,
  captionEn,
}: {
  src: string;
  alt: string;
  caption?: string;
  captionEn?: string;
}) => (
  <div style={{ ...fill, background: '#101418' }}>
    <Style />
    <img
      src={src}
      alt={alt}
      className="ace-fade"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
    {caption && (
      <>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(4, 12, 24, 0.8) 0%, rgba(4, 12, 24, 0.28) 34%, rgba(4, 12, 24, 0) 58%)',
          }}
        />
        <div
          className="ace-fadeup"
          style={{ position: 'absolute', left: 120, bottom: 96, animationDelay: '300ms' }}
        >
          <div style={{ fontSize: 54, fontWeight: 800, color: '#FFFFFF' }}>{caption}</div>
          {captionEn && (
            <div style={{ fontSize: 24, color: 'rgba(255, 255, 255, 0.75)', marginTop: 12 }}>
              {captionEn}
            </div>
          )}
        </div>
      </>
    )}
  </div>
);

const CanvaMystery: Page = () => (
  <PhotoCase
    src={canvaMelanie}
    alt="Canva 創辦人 Melanie Perkins"
    caption="她，在大學教設計軟體。"
    captionEn="She taught design software in college."
  />
);

const CanvaPain: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="45%" size={1300} opacity={0.28} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 140px',
      }}
    >
      <Eyebrow>點名時間 · Your Turn</Eyebrow>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 76,
          fontWeight: 800,
          margin: '44px 0 18px',
          lineHeight: 1.3,
          maxWidth: 1600,
          animationDelay: '140ms',
        }}
      >
        你覺得，教 <span style={gradText}>Photoshop／InDesign</span> 的她，
        <br />
        看見了什麼問題？
      </h1>
      <p
        className="ace-fadeup"
        style={{ fontSize: 26, color: palette.muted, margin: 0, animationDelay: '240ms' }}
      >
        Teaching Photoshop & InDesign, what problem did she keep seeing?
      </p>
      <Steps>
        <Step>
          <div
            style={{
              marginTop: 60,
              padding: '30px 52px',
              borderRadius: 'var(--osd-radius)',
              background: palette.surface,
              border: `1.5px solid var(--osd-accent)`,
              boxShadow: cardShadow,
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 700 }}>
              😖 學生花一整學期只學會基本操作——工具<span style={gradText}>又貴又難</span>。
            </div>
            <div style={{ fontSize: 19, color: palette.muted, marginTop: 8 }}>
              Students burned a whole term on the basics — the tools were pricey and hard.
            </div>
          </div>
        </Step>
      </Steps>
    </div>
    <Footer />
  </div>
);

const CanvaProduct: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="15%" y="30%" size={1000} opacity={0.28} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 1.05fr',
        alignItems: 'center',
        padding: '0 140px',
        gap: 80,
      }}
    >
      <div
        className="ace-fade"
        style={{
          borderRadius: 24,
          background: 'linear-gradient(135deg, #00C4CC 0%, #7D2AE8 100%)',
          boxShadow: '0 24px 60px rgba(125, 42, 232, 0.28)',
          padding: '72px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
          animationDelay: '200ms',
        }}
      >
        <div
          style={{
            width: 190,
            height: 190,
            borderRadius: 44,
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.18)',
          }}
        >
          <img src={canvaLogo} alt="Canva" style={{ width: 130, height: 130, display: 'block' }} />
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
          Canva
        </div>
        <div style={{ fontSize: 23, color: 'rgba(255, 255, 255, 0.88)' }}>
          Design made easy, and free.
        </div>
      </div>
      <div>
        <Eyebrow>案例 · Case Study</Eyebrow>
        <h2
          className="ace-fadeup"
          style={{
            fontSize: 60,
            fontWeight: 800,
            margin: '24px 0 8px',
            lineHeight: 1.15,
            animationDelay: '120ms',
          }}
        >
          她做出了 <span style={gradText}>Canva</span>。
        </h2>
        <EnSub mb={30}>Design made easy, and free.</EnSub>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <CredentialRow
            icon="🖱️"
            text="拖拉就能設計，範本直接套用"
            sub="Drag-and-drop design — start from a template"
            delay={300}
          />
          <CredentialRow
            icon="🆓"
            text="免費開始，打開瀏覽器就能用"
            sub="Free to start — runs right in the browser"
            delay={390}
          />
          <CredentialRow
            icon="🚀"
            text="現在：全球每月上億人使用"
            sub="Now: 100M+ people design with it every month"
            delay={480}
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const GogolookMystery: Page = () => (
  <PhotoCase
    src={gogolookFounders}
    alt="Gogolook 三位創辦人"
    caption="這三個工程師，也有一個共同的痛點。"
    captionEn="These three engineers shared a pain point, too."
  />
);

const GogolookPain: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="45%" size={1300} opacity={0.28} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 140px',
      }}
    >
      <Eyebrow>點名時間 · Your Turn</Eyebrow>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 76,
          fontWeight: 800,
          margin: '44px 0 18px',
          lineHeight: 1.3,
          maxWidth: 1500,
          animationDelay: '140ms',
        }}
      >
        你接過<span style={gradText}>最煩的電話</span>，
        <br />
        是哪一種？
      </h1>
      <p
        className="ace-fadeup"
        style={{ fontSize: 26, color: palette.muted, margin: 0, animationDelay: '240ms' }}
      >
        What's the most annoying call you've ever picked up?
      </p>
      <Steps>
        <Step>
          <div
            style={{
              marginTop: 60,
              padding: '30px 52px',
              borderRadius: 'var(--osd-radius)',
              background: palette.surface,
              border: `1.5px solid var(--osd-accent)`,
              boxShadow: cardShadow,
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 700 }}>
              📵 詐騙、推銷、貸款——這三個工程師也<span style={gradText}>受夠了</span>。
            </div>
            <div style={{ fontSize: 19, color: palette.muted, marginTop: 8 }}>
              Scams, telemarketing, loan offers — these three engineers were fed up too.
            </div>
          </div>
        </Step>
      </Steps>
    </div>
    <Footer />
  </div>
);

const GogolookReveal: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="40%" size={1300} opacity={0.28} />
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
      <Eyebrow>案例 · Case Study</Eyebrow>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 88,
          fontWeight: 800,
          margin: '40px 0 14px',
          lineHeight: 1.15,
          ...gradText,
          animationDelay: '140ms',
        }}
      >
        Gogolook（走著瞧）
      </h1>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 26,
          color: palette.muted,
          margin: '0 0 44px',
          animationDelay: '220ms',
        }}
      >
        "Let's see who's calling." — 名字就是態度。
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          width: 1100,
          textAlign: 'left',
        }}
      >
        <CredentialRow
          icon="💡"
          text="他們做出 Whoscall：來電辨識＋自動封鎖"
          sub="They built Whoscall: caller ID + automatic spam blocking"
          delay={300}
        />
        <CredentialRow
          icon="🌏"
          text="全球下載破億，東亞防詐第一品牌"
          sub="100M+ downloads — East Asia's leading anti-scam app"
          delay={390}
        />
        <CredentialRow
          icon="🚀"
          text="台灣防詐國家隊，2023 年掛牌上市（6902）"
          sub="Taiwan's anti-scam champion — listed in 2023 (ticker 6902)"
          delay={480}
        />
      </div>
    </div>
    <Footer />
  </div>
);

const WhoscallBrand: Page = () => <PhotoCase src={whoscallBrand} alt="Whoscall 品牌識別" />;

const StorySense: Page = () => (
  <div style={fill}>
    <Style />
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
      <h1
        className="ace-fadeup"
        style={{ fontSize: 100, fontWeight: 800, margin: '0 0 96px', letterSpacing: '0.1em' }}
      >
        <span style={gradText}>真實感</span>
        <span style={{ marginLeft: 32 }}>的故事</span>
      </h1>
      <div style={{ display: 'flex', gap: 130 }}>
        <div
          className="ace-fadeup"
          style={{
            width: 430,
            padding: '60px 32px',
            border: '3px solid #1D1D1F',
            animationDelay: '200ms',
          }}
        >
          <div style={{ fontSize: 72, fontWeight: 900 }}>理性</div>
          <div style={{ fontSize: 32, fontWeight: 700, marginTop: 30 }}>利益點</div>
          <div style={{ fontSize: 27, fontWeight: 600, marginTop: 6 }}>（具體資訊／數據）</div>
          <div style={{ fontSize: 17, color: palette.muted, marginTop: 16 }}>
            Rational · concrete info & data
          </div>
        </div>
        <div
          className="ace-fadeup"
          style={{
            width: 430,
            padding: '60px 32px',
            border: '2px solid #C7C7CC',
            animationDelay: '320ms',
          }}
        >
          <div style={{ fontSize: 72, fontWeight: 900, ...gradText }}>感性</div>
          <div style={{ fontSize: 32, fontWeight: 700, marginTop: 30, color: 'var(--osd-accent)' }}>
            吸引力
          </div>
          <div style={{ fontSize: 27, fontWeight: 600, marginTop: 6, ...gradText }}>
            （使用者心態／情緒）
          </div>
          <div style={{ fontSize: 17, color: palette.muted, marginTop: 16 }}>
            Emotional · mindset & feelings
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const JobsQuote: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="55%" size={1500} opacity={0.32} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 140px',
      }}
    >
      <div
        aria-hidden="true"
        className="ace-fadeup"
        style={{
          fontSize: 150,
          lineHeight: 0.5,
          fontFamily: 'Georgia, "Times New Roman", serif',
          ...gradText,
          marginBottom: 8,
        }}
      >
        “
      </div>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 60,
          fontWeight: 800,
          margin: 0,
          lineHeight: 1.4,
          maxWidth: 1500,
          ...gradText,
          animationDelay: '140ms',
        }}
      >
        設計不只是外觀，
        <br />
        更重要的是人們的感受與使用方式。
      </h1>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 25,
          color: palette.muted,
          margin: '32px 0 0',
          animationDelay: '240ms',
        }}
      >
        "Design is not just what it looks like and feels like. Design is how it works."
      </p>
      <p
        className="ace-fadeup"
        style={{ fontSize: 27, fontWeight: 600, margin: '30px 0 0', animationDelay: '320ms' }}
      >
        — Steve Jobs
      </p>
    </div>
    <Footer />
  </div>
);

const DesignThinking: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="0%" size={1100} opacity={0.2} />
    <div style={{ padding: '150px 160px 0' }}>
      <Eyebrow>方法 · Method</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 72,
          fontWeight: 800,
          margin: '28px 0 10px',
          lineHeight: 1.1,
          animationDelay: '120ms',
        }}
      >
        設計思考，雙鑽石。
      </h2>
      <EnSub mb={30}>Design Thinking — the Double Diamond.</EnSub>
      <svg
        viewBox="0 0 1600 470"
        width="100%"
        role="img"
        aria-label="設計思考雙鑽石流程圖"
        className="ace-fade"
        style={{ display: 'block', animationDelay: '260ms' }}
      >
        <defs>
          <linearGradient id="aceDd" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8AA2C6" />
            <stop offset="50%" stopColor="#4A80DB" />
            <stop offset="100%" stopColor="#2E6FE0" />
          </linearGradient>
        </defs>
        <polygon
          points="20,235 330,50 640,235 330,420"
          fill="url(#aceDd)"
          opacity="0.13"
          stroke="#2E6FE0"
          strokeOpacity="0.45"
          strokeWidth="2"
        />
        <line
          x1="330"
          y1="50"
          x2="330"
          y2="420"
          stroke="#2E6FE0"
          strokeOpacity="0.25"
          strokeWidth="2"
        />
        <polygon
          points="700,235 1140,50 1580,235 1140,420"
          fill="url(#aceDd)"
          opacity="0.13"
          stroke="#2E6FE0"
          strokeOpacity="0.45"
          strokeWidth="2"
        />
        <line
          x1="995"
          y1="112"
          x2="995"
          y2="358"
          stroke="#2E6FE0"
          strokeOpacity="0.25"
          strokeWidth="2"
        />
        <line
          x1="1300"
          y1="120"
          x2="1300"
          y2="350"
          stroke="#2E6FE0"
          strokeOpacity="0.25"
          strokeWidth="2"
        />
        <text x="175" y="228" textAnchor="middle" fontSize="30" fontWeight="700" fill="#1D1D1F">
          同理使用者
        </text>
        <text x="175" y="262" textAnchor="middle" fontSize="17" fill="#6E6E73">
          Empathize
        </text>
        <text x="482" y="228" textAnchor="middle" fontSize="30" fontWeight="700" fill="#1D1D1F">
          定義問題
        </text>
        <text x="482" y="262" textAnchor="middle" fontSize="17" fill="#6E6E73">
          Define
        </text>
        <text x="848" y="228" textAnchor="middle" fontSize="30" fontWeight="700" fill="#1D1D1F">
          創意發想
        </text>
        <text x="848" y="262" textAnchor="middle" fontSize="17" fill="#6E6E73">
          Ideate
        </text>
        <text x="1148" y="228" textAnchor="middle" fontSize="30" fontWeight="700" fill="#1D1D1F">
          原型製作
        </text>
        <text x="1148" y="262" textAnchor="middle" fontSize="17" fill="#6E6E73">
          Prototype
        </text>
        <text x="1440" y="228" textAnchor="middle" fontSize="30" fontWeight="700" fill="#1D1D1F">
          快速測試
        </text>
        <text x="1440" y="262" textAnchor="middle" fontSize="17" fill="#6E6E73">
          Test
        </text>
        <text x="130" y="115" fontSize="22" fill="#6E6E73">
          發散
        </text>
        <text x="490" y="115" fontSize="22" fill="#6E6E73">
          收斂
        </text>
        <text x="795" y="115" fontSize="22" fill="#6E6E73">
          發散
        </text>
        <text x="1430" y="115" fontSize="22" fill="#6E6E73">
          收斂
        </text>
      </svg>
    </div>
    <Footer />
  </div>
);

const GoldenCircle: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="20%" y="60%" size={1000} opacity={0.24} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: '480px 1fr',
        alignItems: 'center',
        padding: '0 160px',
        gap: 100,
      }}
    >
      <svg
        viewBox="0 0 480 480"
        width={480}
        role="img"
        aria-label="黃金圈：WHY、HOW、WHAT 同心圓"
        className="ace-fade"
        style={{ display: 'block', animationDelay: '240ms' }}
      >
        <circle cx="240" cy="240" r="230" fill="rgba(46, 111, 224, 0.1)" />
        <circle cx="240" cy="240" r="155" fill="rgba(46, 111, 224, 0.22)" />
        <circle cx="240" cy="240" r="82" fill="#2E6FE0" />
        <text x="240" y="250" textAnchor="middle" fontSize="32" fontWeight="800" fill="#FFFFFF">
          WHY
        </text>
        <text x="240" y="365" textAnchor="middle" fontSize="26" fontWeight="700" fill="#1D4FA8">
          HOW
        </text>
        <text x="240" y="442" textAnchor="middle" fontSize="26" fontWeight="700" fill="#2E6FE0">
          WHAT
        </text>
      </svg>
      <div>
        <Eyebrow>黃金圈 · Golden Circle</Eyebrow>
        <h2
          className="ace-fadeup"
          style={{
            fontSize: 64,
            fontWeight: 800,
            margin: '26px 0 8px',
            lineHeight: 1.15,
            animationDelay: '120ms',
          }}
        >
          從 <span style={gradText}>WHY</span> 開始說。
        </h2>
        <EnSub mb={32}>Start with why. — Simon Sinek</EnSub>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 800 }}>
          <CredentialRow
            icon="🧭"
            text="WHY · 為什麼"
            sub="理念、目的、動機 — beliefs, purpose, motive"
            delay={300}
          />
          <CredentialRow
            icon="🛠️"
            text="HOW · 如何做"
            sub="方法、步驟 — methods & process"
            delay={390}
          />
          <CredentialRow
            icon="📦"
            text="WHAT · 做什麼"
            sub="產品服務、成果 — products & outcomes"
            delay={480}
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const Slot = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      display: 'inline-block',
      padding: '4px 22px',
      margin: '0 8px',
      borderRadius: 14,
      border: '2px dashed rgba(46, 111, 224, 0.45)',
      fontWeight: 700,
      ...gradText,
    }}
  >
    {children}
  </span>
);

const ValueProp: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="50%" size={1400} opacity={0.28} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 140px',
      }}
    >
      <Eyebrow>價值主張 · Value Proposition</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 64,
          fontWeight: 800,
          margin: '30px 0 8px',
          lineHeight: 1.15,
          animationDelay: '120ms',
        }}
      >
        一句話，說清楚你的產品。
      </h2>
      <EnSub mb={52}>Your product, in one sentence.</EnSub>
      <div
        className="ace-fadeup"
        style={{ fontSize: 40, lineHeight: 2.1, maxWidth: 1560, animationDelay: '280ms' }}
      >
        <Slot>團隊名稱</Slot> 提供的 <Slot>產品或服務</Slot>，
        <br />
        利用 <Slot>特色功能或價值</Slot>，
        <br />
        幫助 <Slot>目標使用者</Slot> 解決 <Slot>問題描述</Slot>
      </div>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 22,
          color: palette.muted,
          margin: '44px 0 0',
          animationDelay: '360ms',
        }}
      >
        [Team]'s [product] uses [key value] to help [target users] solve [problem].
      </p>
    </div>
    <Footer />
  </div>
);

const VercelDeploy: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="100%" y="0%" size={1000} opacity={0.28} />
    <div style={{ padding: '150px 160px 0' }}>
      <Eyebrow>上線 · Go Live</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 76,
          fontWeight: 800,
          margin: '30px 0 10px',
          lineHeight: 1.1,
          animationDelay: '120ms',
        }}
      >
        網站做好了，先丟上 <span style={gradText}>Vercel</span> 測試。
      </h2>
      <EnSub mb={40}>Site's working? Put it on Vercel — for free.</EnSub>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1500 }}>
        <Steps>
          <Step>
            <AgendaRow
              num="01"
              title="註冊帳號"
              sub="到 vercel.com 用 Email 免費註冊"
              subEn="Sign up free at vercel.com with your email"
            />
          </Step>
          <Step>
            <AgendaRow
              num="02"
              title="打開終端機"
              sub="先裝好 Node.js，再 cd 進你的網站資料夾"
              subEn="Install Node.js, then cd into your site folder"
            />
          </Step>
          <Step>
            <AgendaRow
              num="03"
              title="輸入 npx vercel"
              sub="照提示一路按 Enter，電腦裡的檔案直接上傳"
              subEn="Follow the prompts — your local files upload directly"
            />
          </Step>
          <Step>
            <AgendaRow
              num="04"
              title="拿到免費網址"
              sub="「你的專案.vercel.app」上線！改完再跑一次就更新"
              subEn="your-project.vercel.app is live — rerun after edits to update"
            />
          </Step>
        </Steps>
      </div>
    </div>
    <Footer />
  </div>
);

const Homework: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="45%" size={1300} opacity={0.32} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 140px',
      }}
    >
      <Eyebrow>回家作業 · Homework</Eyebrow>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 84,
          fontWeight: 800,
          margin: '44px 0 16px',
          lineHeight: 1.2,
          animationDelay: '140ms',
        }}
      >
        想長期上架的話，回家想一個 <span style={gradText}>domain</span>。
      </h1>
      <p
        className="ace-fadeup"
        style={{ fontSize: 28, color: palette.muted, margin: 0, animationDelay: '220ms' }}
      >
        If it's here to stay, pick a domain name for it.
      </p>
      <div
        className="ace-fadeup"
        style={{
          marginTop: 56,
          padding: '26px 52px',
          borderRadius: 'var(--osd-radius)',
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          boxShadow: cardShadow,
          fontFamily: fonts.mono,
          fontSize: 27,
          animationDelay: '300ms',
        }}
      >
        e.g. <span style={{ color: 'var(--osd-accent)' }}>lunch-hero.tw</span> ·{' '}
        <span style={{ color: 'var(--osd-accent)' }}>quiet-study.app</span> ·{' '}
        <span style={{ color: 'var(--osd-accent)' }}>yourname.dev</span>
      </div>
      <div
        className="ace-fadeup"
        style={{ display: 'flex', gap: 14, marginTop: 34, animationDelay: '380ms' }}
      >
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 18,
            padding: '8px 20px',
            borderRadius: 999,
            border: `1px solid ${palette.chipBorder}`,
            color: palette.muted,
          }}
        >
          好記 memorable
        </span>
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 18,
            padding: '8px 20px',
            borderRadius: 999,
            border: `1px solid ${palette.chipBorder}`,
            color: palette.muted,
          }}
        >
          好唸 easy to say
        </span>
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 18,
            padding: '8px 20px',
            borderRadius: 999,
            border: `1px solid ${palette.chipBorder}`,
            color: palette.muted,
          }}
        >
          像你的產品 on-brand
        </span>
      </div>
    </div>
    <Footer />
  </div>
);

const Closing: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="50%" size={1600} opacity={0.4} />
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
      <div className="ace-fadeup" style={{ marginBottom: 32 }}>
        <AceMark size={80} />
      </div>
      <Eyebrow delay={80}>Join the ACE Evolution</Eyebrow>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 96,
          fontWeight: 800,
          margin: '32px 0 14px',
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          animationDelay: '160ms',
        }}
      >
        Ready to <span style={gradText}>create?</span>
      </h1>
      <p
        className="ace-fadeup"
        style={{ fontSize: 30, color: palette.muted, margin: 0, animationDelay: '200ms' }}
      >
        準備好開始創造了嗎？
      </p>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 26,
          color: palette.muted,
          maxWidth: 1000,
          marginTop: 36,
          lineHeight: 1.6,
          animationDelay: '260ms',
        }}
      >
        每週四 Club Period 見 ·{' '}
        <span style={{ color: 'var(--osd-text)', fontWeight: 600 }}>IG @aceclub_2026</span>
        <br />
        See you every Thursday club period.
      </p>
    </div>
    <Footer />
  </div>
);

export const meta: SlideMeta = {
  title: 'ACE Club 幹部訓練 01 · Officer Training 01',
  createdAt: '2026-08-11T13:53:47.284Z',
};

export default [
  Cover,
  AboutMe,
  DividerWhy,
  NameMeaning,
  WhatWeDo,
  Positioning,
  TargetMembers,
  Roadmap,
  Goals,
  SwiftStudentChallenge,
  SscPrizes,
  WhoWins,
  DividerHow,
  Roles,
  Collaboration,
  Lifecycle,
  DividerAI,
  Mindset,
  SpeakHuman,
  Toolbox,
  Expectations,
  DividerThink,
  WhatWouldYouBuild,
  BelongsToYou,
  ExperienceYourLife,
  CodePowerZh,
  CodeChangeWorld,
  CodeChangeFriend,
  CodeChangeSchool,
  CodeChangeClub,
  CodeChangeYou,
  IdentifyProblem,
  CoreValue,
  PainPrompt,
  HearOtherStories,
  FounderMystery,
  DcardPain,
  DcardProduct,
  CanvaMystery,
  CanvaPain,
  CanvaProduct,
  GogolookMystery,
  GogolookPain,
  GogolookReveal,
  WhoscallBrand,
  StorySense,
  JobsQuote,
  DesignThinking,
  GoldenCircle,
  ValueProp,
  VercelDeploy,
  Homework,
  Closing,
] satisfies Page[];
