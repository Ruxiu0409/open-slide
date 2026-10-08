import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import { useEffect, useState } from 'react';
import pitchQr from './assets/pitch-site-qr.svg';

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

const pitchUrl = 'https://pitch.tsaicy.dev';

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

const EnvelopeArt = ({ height }: { height: number }) => (
  <svg
    viewBox="0 0 160 100"
    style={{ height, width: 'auto', overflow: 'visible' }}
    aria-hidden="true"
  >
    <g className="site-float">
      <g transform="rotate(-6 80 28)">
        <rect
          x="50"
          y="6"
          width="60"
          height="38"
          rx="4"
          fill={site.billFill}
          stroke={site.billInk}
          strokeWidth="1.5"
        />
        <text x="58" y="20" fontSize="8" fontWeight="700" fill={site.billInk} letterSpacing="1">
          ACE
        </text>
        <text x="100" y="38" fontSize="11" fill={site.billInk} textAnchor="middle">
          ♠
        </text>
      </g>
    </g>
    <rect
      x="30"
      y="34"
      width="100"
      height="60"
      rx="6"
      fill="#fff"
      stroke={site.text}
      strokeWidth="2"
    />
    <path
      d="M31 38 L80 70 L129 38"
      fill="none"
      stroke={site.text}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M33 91 L66 64 M127 91 L94 64" stroke={site.text} strokeOpacity=".2" strokeWidth="2" />
    <circle cx="80" cy="70" r="7" fill={site.claude} />
  </svg>
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

const BallotArt = ({ height }: { height: number }) => (
  <svg
    viewBox="0 0 160 100"
    style={{ height, width: 'auto', overflow: 'visible' }}
    aria-hidden="true"
  >
    <g className="site-drop">
      <g transform="rotate(8 80 26)">
        <rect
          x="56"
          y="8"
          width="48"
          height="34"
          rx="3"
          fill={site.billFill}
          stroke={site.billInk}
          strokeWidth="1.5"
        />
        <text x="80" y="30" fontSize="11" fill={site.billInk} textAnchor="middle">
          ♠
        </text>
      </g>
    </g>
    <rect x="34" y="44" width="92" height="52" rx="6" fill={site.text} />
    <rect x="28" y="36" width="104" height="12" rx="4" fill={site.text} />
    <rect x="58" y="40" width="44" height="4" rx="2" fill={site.muted} />
    <text x="80" y="82" fontSize="22" fill={site.claude} textAnchor="middle">
      ♠
    </text>
  </svg>
);

const SlidesArt = ({ height }: { height: number }) => (
  <svg
    viewBox="0 0 160 100"
    style={{ height, width: 'auto', overflow: 'visible' }}
    aria-hidden="true"
  >
    <rect
      x="40"
      y="10"
      width="96"
      height="62"
      rx="6"
      fill="#fff"
      stroke={site.text}
      strokeOpacity=".25"
      strokeWidth="2"
    />
    <rect
      x="32"
      y="18"
      width="96"
      height="62"
      rx="6"
      fill="#fff"
      stroke={site.text}
      strokeOpacity=".5"
      strokeWidth="2"
    />
    <g className="site-float">
      <rect
        x="24"
        y="26"
        width="96"
        height="62"
        rx="6"
        fill="#fff"
        stroke={site.text}
        strokeWidth="2"
      />
      <rect x="34" y="38" width="44" height="7" rx="3.5" fill={site.text} />
      <rect x="34" y="52" width="60" height="5" rx="2.5" fill={site.line} />
      <rect x="34" y="62" width="50" height="5" rx="2.5" fill={site.line} />
      <circle cx="104" cy="70" r="8" fill={site.claude} />
    </g>
  </svg>
);

const DemoArt = ({ height }: { height: number }) => (
  <svg
    viewBox="0 0 160 100"
    style={{ height, width: 'auto', overflow: 'visible' }}
    aria-hidden="true"
  >
    <rect
      x="30"
      y="12"
      width="100"
      height="64"
      rx="5"
      fill="#fff"
      stroke={site.text}
      strokeWidth="2"
    />
    <rect
      x="30"
      y="12"
      width="100"
      height="12"
      rx="5"
      fill={site.surface}
      stroke={site.text}
      strokeWidth="2"
    />
    <circle cx="39" cy="18" r="2" fill={site.claude} />
    <circle cx="46" cy="18" r="2" fill={site.line} />
    <rect x="42" y="34" width="40" height="6" rx="3" fill={site.text} />
    <rect x="42" y="46" width="76" height="20" rx="4" fill={site.blue} fillOpacity=".15" />
    <rect x="92" y="50" width="22" height="12" rx="3" fill={site.blue} />
    <path d="M18 80 H142 L136 88 H24 Z" fill={site.text} />
    <g className="site-float">
      <path
        d="M100 54 L100 72 L105 67 L109 75 L112 73 L108 66 L115 65 Z"
        fill={site.text}
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
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

const CapitalCard = ({
  n,
  art,
  title,
  body,
  delay,
}: {
  n: string;
  art: React.ReactNode;
  title: string;
  body: string;
  delay: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      flex: 1,
      background: site.surface,
      borderRadius: 32,
      padding: '40px 36px 44px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      animationDelay: `${delay}ms`,
    }}
  >
    <div style={{ fontSize: 22, color: site.muted }}>{n}</div>
    <div
      className="site-drift"
      style={{ height: 170, margin: '22px 0 26px', animationDelay: `${delay / 1000}s` }}
    >
      {art}
    </div>
    <div style={{ fontSize: 38, fontWeight: 600 }}>{title}</div>
    <div style={{ fontSize: 26, color: site.muted, marginTop: 12, lineHeight: 1.5 }}>
      <Clauses text={body} />
    </div>
  </div>
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

const FormatCard = ({
  tag,
  art,
  title,
  children,
  delay,
}: {
  tag: string;
  art: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      flex: 1,
      background: site.surface,
      borderRadius: 32,
      padding: '40px 48px 44px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      animationDelay: `${delay}ms`,
    }}
  >
    <div style={{ fontSize: 22, color: site.muted }}>{tag}</div>
    <div
      className="site-drift"
      style={{ height: 170, margin: '22px 0 26px', animationDelay: `${delay / 1000}s` }}
    >
      {art}
    </div>
    <div style={{ fontSize: 40, fontWeight: 600 }}>{title}</div>
    <div style={{ fontSize: 26, color: site.muted, marginTop: 12, lineHeight: 1.55 }}>
      {children}
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

const LinkPoint = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: 16,
      fontSize: 30,
      color: site.muted,
      lineHeight: 1.5,
    }}
  >
    <span style={{ color: site.claude }}>♠</span>
    {children}
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
            {['認識創投與 YC', 'Pitch Day 怎麼玩', '三分鐘怎麼講', 'Demo 不翻車', '上台排練'].map(
              (t, i) => (
                <div key={t} style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: fonts.mono, fontSize: 22, ...gradText }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: 27 }}>{t}</span>
                </div>
              ),
            )}
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
            下課前，每個人都要計時
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
        你現在<span style={gradText}>在哪一格？</span>
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

const DividerPitch: Page = () => <Divider eyebrow="第三段 · Pitch" title="三分鐘怎麼講" />;

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
        同一個作品，<span style={gradText}>兩種開場</span>
      </Heading>
      <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
        <Card delay={240}>
          <div style={{ fontSize: 30, color: palette.muted }}>✕</div>
          <Quote muted>
            「大家好，我是第三組的王小明，我做的是一個作業管理的網站，那我先講一下我的動機⋯⋯」
          </Quote>
          <CardBody>台下這時候已經在滑手機了。</CardBody>
        </Card>
        <Card delay={360} primary>
          <div style={{ fontSize: 30, color: 'var(--osd-accent)' }}>✓</div>
          <Quote>「上禮拜有多少人半夜十一點才想起來，隔天要交英文作業？舉個手。」</Quote>
          <CardBody>台下舉手的那一刻，大家就在聽了。</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>自我介紹一句帶過就好。大家想知道的是你做了什麼。</FootNote>
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
          <span style={{ color: palette.inkMuted }}>「</span>所以我做了{' '}
          <span style={{ color: palette.inkGreen }}>______</span>，讓他們可以{' '}
          <span style={{ color: palette.inkGreen }}>______</span>。
          <span style={{ color: palette.inkMuted }}>」</span>
        </TermLine>
        <div style={{ height: 22 }} />
        <TermLine sign="#" dim>
          例：住校的同學常常不知道今天餐廳吃什麼，
        </TermLine>
        <TermLine sign="#" dim>
          所以我做了一個每日菜單頁，讓他們出門前就能決定要不要訂外送。
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

const DividerDemo: Page = () => <Divider eyebrow="第四段 · Plan B" title="Demo 不翻車" />;

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
          <CardBody>誠實講，順便告訴大家你有想過。</CardBody>
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
      <FootNote delay={560}>今天排練的時候，請旁邊的同學幫你想三個最難的問題。</FootNote>
    </div>
    <Footer />
  </div>
);

const SoloStage: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="22%" y="70%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>一個人上台 · Solo</Eyebrow>
      <Heading>
        又要講又要點，<span style={gradText}>把兩件事分開</span>
      </Heading>
      <div style={{ display: 'flex', gap: 22, alignItems: 'stretch' }}>
        <Card delay={220}>
          <CardTag>講</CardTag>
          <CardTitle>先講，再點</CardTitle>
          <CardBody>一句話講完再動滑鼠。邊講邊找按鈕，兩邊都會卡。</CardBody>
        </Card>
        <Card delay={300}>
          <CardTag>點</CardTag>
          <CardTitle>路線寫下來</CardTitle>
          <CardBody>要點哪幾下、停在哪個畫面，寫在便利貼上，貼在螢幕旁邊。</CardBody>
        </Card>
        <Card delay={380}>
          <CardTag>時間</CardTag>
          <CardTitle>計時放眼前</CardTitle>
          <CardBody>手機計時器放桌上。剩一分鐘還沒進 Demo，就直接跳過去。</CardBody>
        </Card>
        <Card delay={460} primary>
          <CardTag>幫手</CardTag>
          <CardTitle>找一個朋友</CardTitle>
          <CardBody>坐第一排幫你比時間。壞掉的時候，也有人幫你切影片。</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>朋友可以幫你比時間、切影片，但上台講的是你自己。</FootNote>
    </div>
    <Footer />
  </div>
);

const DividerHandsOn: Page = () => <Divider eyebrow="第五段 · Rehearsal" title="換你們了" />;

const sessionBlocks = [
  { min: '3', label: '畫路線', body: 'Demo 要點哪幾下' },
  { min: '5', label: '自己練', body: '計時，超過三分鐘就砍' },
  { min: '10', label: '兩兩互看', body: '輪流講給對方聽', primary: true },
];

const WorkSession: Page = () => (
  <Centered>
    <Eyebrow>18 分鐘 · Work session</Eyebrow>
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
      <StatNote delay={520}>我會一個一個走過去。想先試講給我聽的，舉手。</StatNote>
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
        聽完，<span style={gradText}>回答他三題</span>
      </Heading>
      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
        <Card delay={240}>
          <CardTag>Q1</CardTag>
          <CardTitle>他在幫誰？</CardTitle>
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
          <CardTitle>路線定了</CardTitle>
          <CardBody>Demo 要點哪幾下、停在哪個畫面，寫下來了。</CardBody>
        </Card>
        <Card delay={340}>
          <CardTag>Check 02</CardTag>
          <CardTitle>完整講過一次</CardTitle>
          <CardBody>有計時，從開場到收尾沒有中斷。</CardBody>
        </Card>
        <Card delay={440}>
          <CardTag>Check 03</CardTag>
          <CardTitle>知道要改哪裡</CardTitle>
          <CardBody>從互看同學的回饋裡，挑出一件這週要改的事。</CardBody>
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
          <CardBody>講給家人或朋友聽也可以，至少要計時跑兩遍。</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>
        網址 10/14（三）21:00 前貼到 Classroom。流程和條款隨時看 pitch.tsaicy.dev。
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
      三分鐘不長，但夠讓別人記住你。
    </p>
    <p
      className="ace-fadeup"
      style={{
        fontFamily: fonts.mono,
        fontSize: 26,
        color: 'var(--osd-accent)',
        marginTop: 20,
        animationDelay: '320ms',
      }}
    >
      pitch.tsaicy.dev
    </p>
  </Centered>
);

const SiteHero: Page = () => (
  <div style={{ ...fill, background: site.bg, color: site.text, fontFamily: siteFont }}>
    <Style />
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
        ACE Club 天使輪 · 2026.10.15（四）社課時間
      </div>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 190,
          fontWeight: 500,
          letterSpacing: '-0.035em',
          lineHeight: 1.02,
          margin: '22px 0 0',
          animationDelay: '120ms',
        }}
      >
        ACE Pitch Day
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
        三分鐘，讓全場為你全押。
      </p>
      <a
        href={pitchUrl}
        target="_blank"
        rel="noreferrer"
        className="ace-fadeup"
        style={{
          marginTop: 40,
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 14,
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
        pitch.tsaicy.dev
        <span style={{ opacity: 0.6 }}>↗</span>
      </a>
    </div>
    <SiteFooter />
  </div>
);

const SiteDivider: Page = () => (
  <SitePage>
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
      <div className="ace-fadeup" style={{ fontSize: 28, color: site.muted }}>
        第二段 · Pitch Day
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
        比賽怎麼玩
      </h1>
    </div>
  </SitePage>
);

const SiteFinale: Page = () => (
  <div style={{ ...fill, background: site.bg, color: site.text, fontFamily: siteFont }}>
    <Style />
    <div
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
        aria-hidden="true"
        className="ace-glow"
        style={{
          position: 'absolute',
          inset: -60,
          background:
            'radial-gradient(40% 55% at 22% 30%, #8FB4FF 0%, transparent 70%), radial-gradient(35% 50% at 78% 65%, #2E6FE0 0%, transparent 70%), radial-gradient(30% 40% at 60% 20%, #F2C9A8 0%, transparent 70%), radial-gradient(45% 60% at 35% 85%, #C9D8FF 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 48,
        }}
      >
        <div
          className="site-drift"
          style={{
            padding: 16,
            borderRadius: 24,
            background: '#fff',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.1)',
          }}
        >
          <img
            src={pitchQr}
            alt="pitch.tsaicy.dev QR code"
            style={{ display: 'block', width: 180, height: 180 }}
          />
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 26, color: site.muted }}>規則、議程、獎品都在這</div>
          <a
            href={pitchUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'block',
              fontSize: 56,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              marginTop: 8,
              color: site.text,
              textDecoration: 'none',
            }}
          >
            pitch.tsaicy.dev ↗
          </a>
        </div>
      </div>
    </div>
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
        下週見 · 2026.10.15（四）社課時間
      </div>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 190,
          fontWeight: 500,
          letterSpacing: '-0.035em',
          lineHeight: 1.02,
          margin: '22px 0 0',
          animationDelay: '120ms',
        }}
      >
        ACE Pitch Day
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
        三分鐘，讓全場為你全押。
      </p>
      <div
        className="ace-fadeup"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          marginTop: 34,
          animationDelay: '280ms',
        }}
      >
        <span style={{ fontSize: 26, color: site.muted }}>
          作品網址 10/14（三）21:00 前貼到 Classroom
        </span>
      </div>
    </div>
    <SiteFooter />
  </div>
);

const SiteAgenda: Page = () => {
  const active = useIsActivePage();
  return (
    <SitePage>
      <SiteHead label="議程" title="路演當天怎麼進行" sub="10/15（四）社課時間，全程約 30 分鐘。" />
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
              <SplitSeg delay={2.3} color={site.claude} />
            </div>
            <div
              style={{ display: 'flex', gap: 24, marginTop: 14, fontSize: 20, color: site.muted }}
            >
              <LegendDot color={site.text} label="路演" />
              <LegendDot color={site.claude} label="提問" />
            </div>
          </AgendaItem>
          <AgendaItem i={2} time="4 分鐘" title="開放注資" body="把資金投進你看好的新創" />
          <AgendaItem i={3} time="4 分鐘" title="結算募資、頒獎" body="募資金額最高者勝出" />
        </div>
      </div>
    </SitePage>
  );
};

const SiteCapital: Page = () => (
  <SitePage>
    <SiteHead
      label="資本"
      title="每位投資人的資本都不一樣"
      sub="今天台下每個人都是天使投資人，信封裡是你的 ACE 幣資本。"
    />
    <div style={{ display: 'flex', gap: 24, width: 1600, marginTop: 64 }}>
      <CapitalCard
        n="01"
        art={<EnvelopeArt height={170} />}
        title="領取資本"
        body="拆開看看你的資本，不用告訴別人。"
        delay={200}
      />
      <CapitalCard
        n="02"
        art={<PresenterArt height={170} />}
        title="聽路演"
        body="每位創辦人 3 分鐘，想想你要投誰？"
        delay={320}
      />
      <CapitalCard
        n="03"
        art={<BallotArt height={170} />}
        title="投資"
        body="路演結束才注資，可全押也可分散投資。"
        delay={440}
      />
    </div>
  </SitePage>
);

const SiteBill: Page = () => (
  <SitePage>
    <SiteHead
      label="資本"
      title="信封裡有多少，拆開才知道"
      sub="有人多、有人少。你的資本只有你自己知道。"
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
      label="盡職調查"
      title="注資前，先做功課"
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

const SiteFormat: Page = () => (
  <SitePage>
    <SiteHead label="形式" title="做簡報，或直接 Demo" sub="兩種都可以，選你講得最順的那個。" />
    <div style={{ display: 'flex', gap: 24, width: 1600, marginTop: 64 }}>
      <FormatCard tag="Option A" art={<SlidesArt height={170} />} title="準備簡報" delay={200}>
        幾頁投影片講痛點和解法，中間切到網站 Demo。
        <br />
        五頁以內就夠。
      </FormatCard>
      <FormatCard tag="Option B" art={<DemoArt height={170} />} title="直接 Demo" delay={320}>
        邊操作邊講，網站本身就是你的簡報。
        <br />
        <b style={{ color: site.text, fontWeight: 600 }}>設備自己帶：</b>
        筆電或平板、充電線、轉接頭。
      </FormatCard>
    </div>
  </SitePage>
);

const SiteTerms: Page = () => (
  <SitePage>
    <SiteHead label="條款" title="路演和注資前，先看條款" />
    <div
      className="ace-fadeup"
      style={{
        width: 1100,
        marginTop: 48,
        borderTop: `1px solid ${site.line}`,
        animationDelay: '200ms',
      }}
    >
      <TermRow k="路演" v="每位創辦人 3 分鐘，時間到就停" small="之後有 1 分鐘投資人提問" />
      <TermRow
        k="形式"
        v="可以做簡報，也可以直接 Demo"
        small="直接 Demo 請自己帶設備：筆電或平板、充電線、轉接頭"
      />
      <TermRow k="作品網址" v="10/14（三）21:00 前貼到 Classroom" />
      <TermRow k="備案" v="建議先錄一支 Demo 影片" small="現場網路或設備出問題，就直接播影片" />
      <TermRow k="注資時機" v="所有路演結束才開放注資" small="後面上台的創辦人不會吃虧" />
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
      <div style={{ fontSize: 26, color: 'rgba(255, 255, 255, 0.8)', marginTop: 56 }}>獎品</div>
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
        募到最多資金的創辦人勝出。
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

const SiteLink: Page = () => (
  <SitePage>
    <SiteHead label="活動網站" title="規則都在這，隨時回去看" />
    <div
      className="ace-fadeup"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 88,
        marginTop: 72,
        animationDelay: '200ms',
      }}
    >
      <a
        href={pitchUrl}
        target="_blank"
        rel="noreferrer"
        className="site-drift"
        style={{
          display: 'block',
          padding: 32,
          borderRadius: 36,
          background: '#fff',
          border: `1px solid ${site.line}`,
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
        }}
      >
        <img
          src={pitchQr}
          alt="pitch.tsaicy.dev QR code"
          style={{ display: 'block', width: 340, height: 340 }}
        />
      </a>
      <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <a
          href={pitchUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: 92,
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: 18,
            color: site.text,
            textDecoration: 'underline',
            textDecorationThickness: 4,
            textUnderlineOffset: 14,
            textDecorationColor: site.line,
          }}
        >
          pitch.tsaicy.dev ↗
        </a>
        <LinkPoint>議程、資本、盡職調查、條款、獎品</LinkPoint>
        <LinkPoint>中文、English 兩種版本</LinkPoint>
        <LinkPoint>創辦人名單確定後，也會更新在這裡</LinkPoint>
      </div>
    </div>
  </SitePage>
);

const PersonBulbArt = () => (
  <svg viewBox="0 0 120 120" style={{ width: 150, height: 150 }} aria-hidden="true">
    <g className="site-float">
      <path
        d="M60 4 V10 M38 12 L42 17 M82 12 L78 17"
        stroke={palette.accent}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="60" cy="30" r="13" fill="#FFE7A8" stroke={palette.text} strokeWidth="2.5" />
      <rect x="54" y="42" width="12" height="7" rx="2" fill={palette.text} />
    </g>
    <circle cx="60" cy="68" r="12" fill={palette.text} />
    <path d="M36 118 Q36 84 60 84 Q84 84 84 118 Z" fill={palette.accent} />
  </svg>
);

const PersonCoinsArt = () => (
  <svg viewBox="0 0 120 120" style={{ width: 150, height: 150 }} aria-hidden="true">
    <circle cx="44" cy="58" r="12" fill={palette.text} />
    <path d="M20 118 Q20 74 44 74 Q68 74 68 118 Z" fill={palette.inkBorder} />
    <g className="site-float">
      <ellipse
        cx="92"
        cy="104"
        rx="18"
        ry="6"
        fill="#E9B949"
        stroke={palette.text}
        strokeWidth="2"
      />
      <ellipse
        cx="92"
        cy="94"
        rx="18"
        ry="6"
        fill="#F5CD5B"
        stroke={palette.text}
        strokeWidth="2"
      />
      <ellipse
        cx="92"
        cy="84"
        rx="18"
        ry="6"
        fill="#FADB78"
        stroke={palette.text}
        strokeWidth="2"
      />
      <text x="92" y="88" fontSize="9" fontWeight="700" textAnchor="middle" fill={palette.text}>
        $
      </text>
    </g>
  </svg>
);

const Party = ({
  art,
  title,
  body,
  delay,
}: {
  art: React.ReactNode;
  title: string;
  body: string;
  delay: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      padding: '30px 30px 34px',
      borderRadius: 'var(--osd-radius)',
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: cardShadow,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      animationDelay: `${delay}ms`,
    }}
  >
    {art}
    <div style={{ fontSize: 36, fontWeight: 700, marginTop: 14 }}>{title}</div>
    <div style={{ fontSize: 23, color: palette.muted, marginTop: 10, lineHeight: 1.5 }}>{body}</div>
  </div>
);

const FlowArrow = ({
  y,
  reverse = false,
  color,
  label,
}: {
  y: number;
  reverse?: boolean;
  color: string;
  label: string;
}) => (
  <g>
    <path
      d={reverse ? `M640 ${y} H40` : `M40 ${y} H640`}
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeDasharray="14 14"
      style={{ animation: 'aceFlow 1s linear infinite' }}
    />
    <path
      d={
        reverse ? `M60 ${y - 18} L36 ${y} L60 ${y + 18}` : `M620 ${y - 18} L644 ${y} L620 ${y + 18}`
      }
      fill="none"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <text
      x="340"
      y={reverse ? y - 26 : y + 50}
      fontSize="30"
      fontWeight="700"
      fill={color}
      textAnchor="middle"
    >
      {label}
    </text>
  </g>
);

const VcDivider: Page = () => <Divider eyebrow="第一段 · Venture Capital" title="先認識創投" />;

const VcDeal: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="70%" size={1300} opacity={0.22} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>創投 · Venture Capital</Eyebrow>
      <Heading>
        用錢，換<span style={gradText}>一小塊未來</span>
      </Heading>
      <div
        style={{ display: 'grid', gridTemplateColumns: '440px 1fr 440px', alignItems: 'center' }}
      >
        <Party
          art={<PersonBulbArt />}
          title="創辦人"
          body="有點子、有產品，缺錢把它做大"
          delay={200}
        />
        <svg viewBox="0 0 680 300" style={{ width: '100%', height: 'auto' }} aria-hidden="true">
          <FlowArrow y={100} reverse color={palette.accent} label="資金 $" />
          <FlowArrow y={200} color={palette.text} label="股份 %" />
        </svg>
        <Party
          art={<PersonCoinsArt />}
          title="投資人"
          body="有錢，想找到下一家大公司"
          delay={320}
        />
      </div>
      <FootNote delay={520}>
        公司還沒賺錢，投資人買的是「它有機會變很大」。押對一家，就能賺回很多倍。
      </FootNote>
    </div>
    <Footer />
  </div>
);

const Round = ({
  name,
  en,
  body,
  h,
  delay,
  here = false,
}: {
  name: string;
  en: string;
  body: string;
  h: number;
  delay: number;
  here?: boolean;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: 540,
    }}
  >
    {here && (
      <div
        className="site-bob"
        style={{
          marginBottom: 16,
          padding: '8px 20px',
          borderRadius: 999,
          background: 'var(--osd-accent)',
          color: '#fff',
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        你們在這 ↓
      </div>
    )}
    <div
      className="ace-fadeup"
      style={{ textAlign: 'center', marginBottom: 18, animationDelay: `${delay + 200}ms` }}
    >
      <div
        style={{ fontSize: 34, fontWeight: 700, color: here ? 'var(--osd-accent)' : palette.text }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 18,
          color: palette.muted,
          marginTop: 4,
          letterSpacing: '0.06em',
        }}
      >
        {en}
      </div>
      <div style={{ fontSize: 22, color: palette.muted, marginTop: 8 }}>{body}</div>
    </div>
    <div
      style={{
        width: '100%',
        height: h,
        borderRadius: '18px 18px 0 0',
        background: here ? accentGrad : 'linear-gradient(180deg, #DCE6F7 0%, #C9D7F2 100%)',
        transformOrigin: 'bottom',
        animation: `siteGrowY 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both`,
      }}
    />
  </div>
);

const VcStages: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="20%" y="80%" size={1200} opacity={0.22} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>募資輪次 · Rounds</Eyebrow>
      <Heading>
        一家新創，<span style={gradText}>會募好幾輪錢</span>
      </Heading>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 24,
          borderBottom: `2px solid ${palette.chipBorder}`,
        }}
      >
        <Round name="天使輪" en="ANGEL" body="點子加原型" h={70} delay={200} here />
        <Round name="種子輪" en="SEED" body="做出產品、找用戶" h={130} delay={280} />
        <Round name="A 輪" en="SERIES A" body="有人買單，開始擴張" h={200} delay={360} />
        <Round name="B、C 輪" en="SERIES B / C" body="規模化" h={270} delay={440} />
        <Round name="上市" en="IPO" body="股票公開交易" h={340} delay={520} />
      </div>
    </div>
    <Footer />
  </div>
);

const outcome = {
  lost: '#D2D2D7',
  small: '#A1A1A6',
  good: '#8FB4FF',
  big: '#2E6FE0',
};

const outcomeOf = (i: number) => {
  if (i < 65) return outcome.lost;
  if (i < 90) return outcome.small;
  if (i < 96) return outcome.good;
  return outcome.big;
};

const Waffle = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 44px)', gap: 8 }}>
    {Array.from({ length: 100 }, (_, i) => (
      <div
        key={i}
        className="ace-fade"
        style={{
          width: 44,
          height: 44,
          borderRadius: 8,
          background: outcomeOf(i),
          animationDelay: `${200 + i * 12}ms`,
        }}
      />
    ))}
  </div>
);

const Bucket = ({
  color,
  pct,
  label,
  sub,
  accent = false,
}: {
  color: string;
  pct: string;
  label: string;
  sub: string;
  accent?: boolean;
}) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
    <span style={{ width: 28, height: 28, borderRadius: 7, background: color, flexShrink: 0 }} />
    <span
      style={{
        fontFamily: fonts.mono,
        fontSize: 60,
        fontWeight: 700,
        width: 150,
        lineHeight: 1,
        ...(accent ? gradText : { color: palette.text }),
      }}
    >
      {pct}
    </span>
    <div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: accent ? 'var(--osd-accent)' : palette.text,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 22, color: palette.muted, marginTop: 4 }}>{sub}</div>
    </div>
  </div>
);

const VcPowerLaw: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="85%" y="35%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>冪次法則 · Power law</Eyebrow>
      <Heading>
        投一百家，<span style={gradText}>只有四家賺十倍</span>
      </Heading>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '512px 1fr',
          gap: 110,
          alignItems: 'center',
        }}
      >
        <Waffle />
        <div
          className="ace-fadeup"
          style={{ display: 'flex', flexDirection: 'column', gap: 40, animationDelay: '400ms' }}
        >
          <Bucket color={outcome.lost} pct="65%" label="賠錢" sub="拿回來的比投進去的少" />
          <Bucket color={outcome.small} pct="25%" label="1–5 倍" sub="小賺" />
          <Bucket color={outcome.good} pct="6%" label="5–10 倍" sub="賺不少" />
          <Bucket
            color={outcome.big}
            pct="4%"
            label="10 倍以上"
            sub="創投真正在找的那一家"
            accent
          />
        </div>
      </div>
      <FootNote delay={700}>
        資料：Correlation Ventures 統計 2004–2013 年超過 21,000 筆創投投資（Seth Levine 整理）。
      </FootNote>
    </div>
    <Footer />
  </div>
);

const YcFact = ({ value, label }: { value: string; label: string }) => (
  <div>
    <div
      style={{ fontFamily: fonts.mono, fontSize: 64, fontWeight: 700, lineHeight: 1, ...gradText }}
    >
      {value}
    </div>
    <div style={{ fontSize: 24, color: palette.muted, marginTop: 12 }}>{label}</div>
  </div>
);

const YcIntro: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="25%" y="50%" size={1300} opacity={0.28} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: '420px 1fr',
        alignItems: 'center',
        gap: 110,
        padding: '0 160px',
      }}
    >
      <div className="site-bob" style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            width: 360,
            height: 360,
            borderRadius: 56,
            background: site.yc,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 250,
            fontWeight: 700,
            lineHeight: 1,
            boxShadow: '0 30px 70px rgba(251, 101, 30, 0.35)',
          }}
        >
          Y
        </div>
      </div>
      <div>
        <Eyebrow>加速器 · Accelerator</Eyebrow>
        <h1
          className="ace-fadeup"
          style={{
            fontSize: 104,
            fontWeight: 800,
            margin: '26px 0 12px',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            animationDelay: '120ms',
          }}
        >
          Y Combinator
        </h1>
        <p
          className="ace-fadeup"
          style={{ fontSize: 34, color: palette.muted, margin: 0, animationDelay: '180ms' }}
        >
          全世界最有名的新創加速器，大家都叫它 YC。
        </p>
        <div
          className="ace-fadeup"
          style={{ display: 'flex', gap: 72, marginTop: 54, animationDelay: '260ms' }}
        >
          <YcFact value="2005" label="創立" />
          <YcFact value="4" label="每年梯次" />
          <YcFact value="$500K" label="投資每家公司" />
        </div>
        <p
          className="ace-fadeup"
          style={{
            fontSize: 22,
            color: palette.muted,
            marginTop: 48,
            lineHeight: 1.5,
            animationDelay: '340ms',
          }}
        >
          創辦人：Paul Graham、Jessica Livingston、Robert Morris、Trevor Blackwell
        </p>
      </div>
    </div>
    <Footer />
  </div>
);

const DealPart = ({
  amount,
  title,
  body,
  color,
  delay,
}: {
  amount: string;
  title: string;
  body: string;
  color: string;
  delay: number;
}) => (
  <div className="ace-fadeup" style={{ animationDelay: `${delay}ms` }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
      <span style={{ fontFamily: fonts.mono, fontSize: 48, fontWeight: 700, color }}>{amount}</span>
      <span style={{ fontSize: 30, fontWeight: 700 }}>{title}</span>
    </div>
    <div style={{ fontSize: 23, color: palette.muted, marginTop: 10, lineHeight: 1.55 }}>
      {body}
    </div>
  </div>
);

const YcDeal: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="80%" y="75%" size={1200} opacity={0.22} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>標準條件 · The YC deal</Eyebrow>
      <Heading>
        每家公司，YC 投 <span style={gradText}>$500K</span>
      </Heading>
      <div
        style={{
          display: 'flex',
          height: 120,
          borderRadius: 22,
          overflow: 'hidden',
          marginTop: 10,
        }}
      >
        <div
          style={{
            flex: 1,
            background: site.yc,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 32,
            fontFamily: fonts.mono,
            fontSize: 36,
            fontWeight: 700,
            transformOrigin: 'left',
            animation: 'siteGrowX 600ms cubic-bezier(0.22, 1, 0.36, 1) 200ms both',
          }}
        >
          $125K
        </div>
        <div
          style={{
            flex: 3,
            background: palette.ink,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 32,
            fontFamily: fonts.mono,
            fontSize: 36,
            fontWeight: 700,
            transformOrigin: 'left',
            animation: 'siteGrowX 700ms cubic-bezier(0.22, 1, 0.36, 1) 500ms both',
          }}
        >
          $375K
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginTop: 48 }}>
        <DealPart
          amount="$125K"
          title="換 7% 股份"
          body="post-money SAFE：投完之後，YC 確定拿到公司 7%。"
          color={site.yc}
          delay={600}
        />
        <DealPart
          amount="$375K"
          title="無上限 SAFE"
          body="uncapped MFN SAFE：先給錢，等下一輪募資，照那時的條件換成股份。"
          color={palette.text}
          delay={720}
        />
      </div>
      <FootNote delay={860}>
        SAFE（Simple Agreement for Future Equity）是 YC 在 2013
        年推出的合約：先拿錢，以後再換成股份。現在很多天使輪都在用。
      </FootNote>
    </div>
    <Footer />
  </div>
);

const Alum = ({
  name,
  batch,
  what,
  color,
  delay,
}: {
  name: string;
  batch: string;
  what: string;
  color: string;
  delay: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      padding: '30px 30px 32px',
      borderRadius: 'var(--osd-radius)',
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: cardShadow,
      animationDelay: `${delay}ms`,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ width: 22, height: 22, borderRadius: 7, background: color }} />
      <span
        style={{ fontFamily: fonts.mono, fontSize: 20, color: site.yc, letterSpacing: '0.06em' }}
      >
        {batch}
      </span>
    </div>
    <div style={{ fontSize: 40, fontWeight: 800, marginTop: 22, letterSpacing: '-0.02em' }}>
      {name}
    </div>
    <div style={{ fontSize: 23, color: palette.muted, marginTop: 8 }}>{what}</div>
  </div>
);

const YcAlumni: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="15%" y="30%" size={1200} opacity={0.22} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>校友 · Alumni</Eyebrow>
      <Heading>
        這些公司，<span style={gradText}>都從 YC 出發</span>
      </Heading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }}>
        <Alum name="Reddit" batch="S05" what="論壇社群" color="#FF4500" delay={200} />
        <Alum name="Dropbox" batch="S07" what="雲端硬碟" color="#0061FF" delay={260} />
        <Alum name="Twitch" batch="W07" what="直播，前身 Justin.tv" color="#9146FF" delay={320} />
        <Alum name="Airbnb" batch="W09" what="訂房與民宿" color="#FF5A5F" delay={380} />
        <Alum name="Stripe" batch="S09" what="線上金流" color="#635BFF" delay={440} />
        <Alum name="Coinbase" batch="S12" what="加密貨幣交易所" color="#0052FF" delay={500} />
        <Alum name="Instacart" batch="S12" what="生鮮外送" color="#43B02A" delay={560} />
        <Alum name="DoorDash" batch="S13" what="餐點外送" color="#FF3008" delay={620} />
      </div>
      <FootNote delay={760}>
        S = 夏季梯、W = 冬季梯。每一家剛進 YC 的時候，都只是幾個人和一個沒人看好的點子。
      </FootNote>
    </div>
    <Footer />
  </div>
);

const CerealBox = ({
  name,
  color,
  tilt,
  delay,
}: {
  name: string;
  color: string;
  tilt: number;
  delay: number;
}) => (
  <div className="site-drift" style={{ animationDelay: `${delay}s` }}>
    <svg
      viewBox="0 0 140 200"
      style={{ width: 230, height: 'auto', transform: `rotate(${tilt}deg)` }}
      aria-hidden="true"
    >
      <path d="M14 18 L28 6 H134 L126 18 Z" fill={color} opacity=".7" />
      <path d="M126 18 L134 6 V182 L126 194 Z" fill={color} opacity=".55" />
      <rect
        x="6"
        y="18"
        width="120"
        height="176"
        rx="4"
        fill={color}
        stroke={palette.text}
        strokeWidth="2.5"
      />
      <rect x="18" y="32" width="96" height="40" rx="6" fill="#fff" />
      <text
        x="66"
        y="57"
        fontSize={name.length > 10 ? 13 : 15}
        fontWeight="800"
        textAnchor="middle"
        fill={palette.text}
        textLength={name.length > 10 ? 84 : undefined}
        lengthAdjust="spacingAndGlyphs"
      >
        {name}
      </text>
      <ellipse cx="66" cy="150" rx="38" ry="12" fill="#fff" />
      <path d="M28 146 Q66 186 104 146 Z" fill="#fff" stroke={palette.text} strokeWidth="2" />
      <circle cx="50" cy="144" r="6" fill="#F2B544" />
      <circle cx="64" cy="140" r="6" fill="#F2B544" />
      <circle cx="78" cy="145" r="6" fill="#F2B544" />
      <circle cx="58" cy="134" r="5" fill="#E8A33A" />
      <circle cx="72" cy="132" r="5" fill="#E8A33A" />
      <text x="66" y="104" fontSize="13" fontWeight="700" textAnchor="middle" fill="#fff">
        $40
      </text>
    </svg>
  </div>
);

const StoryBeat = ({
  n,
  children,
  delay,
}: {
  n: string;
  children: React.ReactNode;
  delay: number;
}) => (
  <div
    className="ace-fadeup"
    style={{ display: 'flex', gap: 24, alignItems: 'baseline', animationDelay: `${delay}ms` }}
  >
    <BigNum>{n}</BigNum>
    <div style={{ fontSize: 30, lineHeight: 1.5 }}>{children}</div>
  </div>
);

const YcAirbnb: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="22%" y="62%" size={1200} opacity={0.26} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>故事 · Airbnb, 2008</Eyebrow>
      <Heading>
        先活下來，<span style={gradText}>再變大</span>
      </Heading>
      <div
        style={{ display: 'grid', gridTemplateColumns: '560px 1fr', gap: 80, alignItems: 'center' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
          <CerealBox name="Obama O's" color="#3B6FD8" tilt={-5} delay={0} />
          <CerealBox name="Cap'n McCain's" color="#D9483B" tilt={5} delay={0.6} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          <StoryBeat n="01" delay={240}>
            網站沒什麼人用，創辦人刷卡刷到欠了一堆卡債。
          </StoryBeat>
          <StoryBeat n="02" delay={340}>
            趁美國總統大選，自己設計候選人麥片盒，一盒賣 40 美元。
          </StoryBeat>
          <StoryBeat n="03" delay={440}>
            賣了大約 3 萬美元撐下去，隔年進了 YC。
          </StoryBeat>
        </div>
      </div>
      <FootNote delay={600}>
        Paul Graham：「能讓人花 40 美元買一盒麥片，大概也能讓人願意睡陌生人家的氣墊床。」
      </FootNote>
    </div>
    <Footer />
  </div>
);

const YcMotto: Page = () => (
  <Centered glowY="55%">
    <Eyebrow>YC 的座右銘 · Motto</Eyebrow>
    <h1
      className="ace-fadeup"
      style={{
        fontSize: 128,
        fontWeight: 800,
        margin: '36px 0 24px',
        lineHeight: 1.08,
        letterSpacing: '-0.03em',
        ...gradText,
        animationDelay: '120ms',
      }}
    >
      Make something
      <br />
      people want.
    </h1>
    <p
      className="ace-fadeup"
      style={{ fontSize: 44, fontWeight: 600, margin: 0, animationDelay: '220ms' }}
    >
      做出大家真的想要的東西。
    </p>
    <StatNote delay={320}>下週台下的天使投資人，看的就是這件事。</StatNote>
  </Centered>
);

const CompareRow = ({ k, yc, ace }: { k: string; yc: string; ace: string }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '200px 1fr 1fr',
      gap: 24,
      padding: '22px 0',
      borderBottom: `1px solid ${palette.border}`,
      alignItems: 'baseline',
    }}
  >
    <div style={{ fontSize: 24, color: palette.muted }}>{k}</div>
    <div style={{ fontSize: 30 }}>{yc}</div>
    <div style={{ fontSize: 30, fontWeight: 700, color: 'var(--osd-accent)' }}>{ace}</div>
  </div>
);

const YcDemoDay: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="80%" y="30%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>Demo Day → Pitch Day</Eyebrow>
      <Heading>
        我們的 Pitch Day，<span style={gradText}>就是迷你版 Demo Day</span>
      </Heading>
      <div className="ace-fadeup" style={{ animationDelay: '220ms' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr 1fr',
            gap: 24,
            paddingBottom: 16,
            borderBottom: `2px solid ${palette.text}`,
            fontFamily: fonts.mono,
            fontSize: 22,
            letterSpacing: '0.1em',
          }}
        >
          <span />
          <span style={{ color: site.yc }}>YC DEMO DAY</span>
          <span style={{ color: 'var(--osd-accent)' }}>ACE PITCH DAY</span>
        </div>
        <CompareRow k="誰上台" yc="一整梯的新創團隊" ace="你們每一個人" />
        <CompareRow k="台下" yc="精選的投資人和媒體" ace="全班都是天使投資人" />
        <CompareRow k="比什麼" yc="誰能拿到下一輪資金" ace="誰募到最多 ACE 幣" />
        <CompareRow k="多久一次" yc="每年四梯，每梯一次" ace="10/15（四）這一次" />
      </div>
      <FootNote delay={520}>接下來，看看我們的 Pitch Day 怎麼進行。</FootNote>
    </div>
    <Footer />
  </div>
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
  SiteHero,
  VcDivider,
  VcDeal,
  VcStages,
  VcPowerLaw,
  YcIntro,
  YcDeal,
  YcAlumni,
  YcAirbnb,
  YcMotto,
  YcDemoDay,
  SiteDivider,
  SiteAgenda,
  SiteCapital,
  SiteBill,
  SiteCriteria,
  SiteFormat,
  SiteTerms,
  SitePrize,
  SiteLink,
  DividerPitch,
  PitchStructure,
  DemoNinety,
  FirstTen,
  TwoOpenings,
  PitchTemplate,
  DemoOnePath,
  DividerDemo,
  DemoChecklist,
  QnA,
  SoloStage,
  DividerHandsOn,
  WorkSession,
  PeerFeedback,
  DefinitionOfDone,
  ThisWeek,
  Closing,
  SiteFinale,
] satisfies Page[];
