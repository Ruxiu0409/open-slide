import { type DesignSystem, type Page, type SlideMeta, useSlidePageNumber } from '@open-slide/core';
import claudeIcon from './assets/claude-ai-icon.svg';
import codexIcon from './assets/codex_light.svg';
import cursorLogo from './assets/cursor_light.svg';
import focusLoop from './assets/focusloop.png';
import focusLoopScreens from './assets/focusloop-screens.png';
import geminiIcon from './assets/gemini.svg';
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
import {
  StoryAbroadWithFriends,
  StoryActivityHunt,
  StoryAwardMoment,
  StoryClosingDream,
  StoryContestCanBeFun,
  StoryEarlyGraduationTrip,
  StoryExperienceWall,
  StoryFirstTimeAbroad,
  StoryHalfFcuTopia,
  StoryHighSchoolClub,
  StoryHungryAfterAward,
  StoryRoots,
  StorySummerScheduleClash,
} from './story-pages';
import {
  TrainingGoals,
  TrainingRoadmap,
  TrainingSscPrizes,
  TrainingSwiftStudentChallenge,
  TrainingTargetMembers,
  TrainingWhoWins,
  TrainingWinnerKeitaro,
  TrainingWinnerRuoshan,
} from './training-pages';

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
          社課第一堂 · Lesson 01
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
        <Eyebrow>先快速認識我 · About me</Eyebrow>
        <h2
          className="ace-fadeup"
          style={{
            fontSize: 68,
            fontWeight: 800,
            margin: '26px 0 16px',
            lineHeight: 1.14,
            letterSpacing: '-0.02em',
            animationDelay: '120ms',
          }}
        >
          我是 <span style={gradText}>蔡承曄</span>。
        </h2>
        <p
          className="ace-fadeup"
          style={{
            fontSize: 22,
            color: palette.muted,
            lineHeight: 1.6,
            margin: '0 0 28px',
            maxWidth: 900,
            animationDelay: '200ms',
          }}
        >
          你也可以叫我瑞瑞或 CY。逢甲大學資工系，曾經擔任 iOS Club 9th
          社長，現在也持續在社群裡學習、分享和串起更多人。
        </p>
        <div
          className="ace-fadeup"
          style={{
            borderLeft: `4px solid var(--osd-accent)`,
            paddingLeft: 22,
            fontSize: 25,
            fontWeight: 600,
            lineHeight: 1.45,
            maxWidth: 900,
            animationDelay: '260ms',
          }}
        >
          我想被記住的不是某一個職稱，而是我怎麼把技術、設計和社群經驗變成可以被看見的作品。
        </div>
        <div
          style={{
            marginTop: 34,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 16,
            maxWidth: 900,
          }}
        >
          {[
            { k: '逢甲資工', v: 'FCU · Computer Science' },
            { k: 'iOS Club', v: '9th 社長' },
            { k: 'GDG on Campus', v: 'Associated Lead' },
          ].map((c, i) => (
            <div
              key={c.k}
              className="ace-fadeup"
              style={{
                borderTop: `3px solid var(--osd-accent)`,
                paddingTop: 16,
                animationDelay: `${320 + i * 90}ms`,
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.15 }}>{c.k}</div>
              <div style={{ marginTop: 8, fontSize: 18, color: palette.muted }}>{c.v}</div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 26,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: 14,
            maxWidth: 1100,
          }}
        >
          {[
            { k: '技術', v: '用 iOS、Swift 和 AI 工具，把想法推到可以 demo 的狀態。' },
            { k: '設計', v: '在意介面、敘事和使用者第一眼看到的感覺。' },
            { k: '社群', v: '從活動籌備、帶社團，到把人和資源串在一起。' },
            { k: '分享', v: '把做過的事整理成脈絡，讓下一個人比較容易開始。' },
          ].map((c, i) => (
            <div
              key={c.k}
              className="ace-fadeup"
              style={{
                padding: '20px 22px 22px',
                borderRadius: 14,
                background: palette.surface,
                border: `1px solid ${palette.border}`,
                boxShadow: cardShadow,
                animationDelay: `${600 + i * 80}ms`,
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 700 }}>{c.k}</div>
              <div style={{ fontSize: 17, color: palette.muted, marginTop: 8, lineHeight: 1.5 }}>
                {c.v}
              </div>
            </div>
          ))}
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

const certs = [
  {
    issuer: 'Apple',
    note: '教學與開發',
    rows: [
      'Apple Teacher',
      'Apple Teacher Swift Playgrounds',
      'App Development with Swift Associate',
      'App Development with Swift Certified User',
    ],
  },
  {
    issuer: 'Google Cloud',
    note: 'AI 與生成式應用',
    rows: [
      'Develop GenAI Apps with Gemini and Streamlit',
      'Multimodality and Multimodal RAG',
      'Prompt Design in Vertex AI',
    ],
  },
  {
    issuer: '國內認證',
    note: '系統與 AI 規劃',
    rows: ['TQC Linux System Administration Professional', 'iPas AI 應用規劃師 初級'],
  },
];

const AboutMe2: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="80%" y="72%" size={1200} opacity={0.22} />
    <div style={{ padding: '120px 140px 0' }}>
      <Eyebrow>指導老師 · Your Advisor</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 60,
          fontWeight: 800,
          margin: '24px 0 34px',
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          animationDelay: '120ms',
        }}
      >
        九張 <span style={gradText}>專業認證</span>
      </h2>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        {certs.map((col, ci) => (
          <div
            key={col.issuer}
            className="ace-fadeup"
            style={{
              flex: 1,
              padding: '26px 28px 30px',
              borderRadius: 'var(--osd-radius)',
              background: palette.surface,
              border: `1px solid ${palette.border}`,
              boxShadow: cardShadow,
              animationDelay: `${240 + ci * 120}ms`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 22 }}>
              <span style={{ fontSize: 34, fontWeight: 700, ...gradText }}>{col.issuer}</span>
              <span style={{ fontSize: 20, color: palette.muted }}>{col.note}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {col.rows.map((r) => (
                <div
                  key={r}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 16,
                    padding: '18px 22px',
                    borderRadius: 12,
                    background: palette.surfaceHi,
                  }}
                >
                  <span style={{ color: 'var(--osd-accent)', fontSize: 18 }}>◉</span>
                  <span style={{ fontSize: 23, lineHeight: 1.4 }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

const competitions = [
  {
    year: '2024',
    rows: [
      { t: '全國電子設計創意競賽 · 智慧大數據及行動 APP 類', p: '冠軍', top: true },
      { t: 'App 行動應用創新賽', p: '三等獎' },
      { t: '海峽兩岸青少年創客大賽', p: '三等獎' },
      { t: '南投山城數位黑客松', p: '銅獎' },
    ],
  },
  {
    year: '2025',
    rows: [
      { t: '亞洲青少年腦神經科學大賽', p: '亞軍', top: true },
      { t: '海峽兩岸青少年創客大賽', p: '二等獎 · 優秀展覽獎' },
      { t: '全國電子設計創意競賽 · 智慧大數據及行動 APP 類', p: 'IEEE Tainan Section 特別獎' },
    ],
  },
  {
    year: '2026',
    rows: [
      { t: '全國電子設計創意競賽 · 智慧大數據及行動 APP 類', p: '亞軍', top: true },
      { t: '全國電子設計創意競賽 · 資通類', p: '佳作' },
      { t: 'App 行動應用創新賽', p: '三等獎' },
    ],
  },
];

const AboutMe3: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="20%" y="80%" size={1200} opacity={0.22} />
    <div style={{ padding: '120px 140px 0' }}>
      <Eyebrow>指導老師 · Your Advisor</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 60,
          fontWeight: 800,
          margin: '24px 0 34px',
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          animationDelay: '120ms',
        }}
      >
        三年 <span style={gradText}>十座獎</span>
      </h2>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        {competitions.map((col, ci) => (
          <div
            key={col.year}
            className="ace-fadeup"
            style={{
              flex: 1,
              padding: '26px 28px 30px',
              borderRadius: 'var(--osd-radius)',
              background: palette.surface,
              border: `1px solid ${palette.border}`,
              boxShadow: cardShadow,
              animationDelay: `${240 + ci * 120}ms`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 38,
                fontWeight: 700,
                marginBottom: 22,
                ...gradText,
              }}
            >
              {col.year}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {col.rows.map((r) => (
                <div key={r.t + r.p}>
                  <div style={{ fontSize: 22, lineHeight: 1.4, color: palette.muted }}>{r.t}</div>
                  <div
                    style={{
                      display: 'inline-block',
                      marginTop: 10,
                      padding: '7px 18px',
                      borderRadius: 999,
                      fontSize: 21,
                      fontWeight: 700,
                      background: r.top ? palette.accentSoft : palette.surfaceHi,
                      color: r.top ? 'var(--osd-accent)' : 'var(--osd-text)',
                      border: r.top ? 'none' : `1px solid ${palette.chipBorder}`,
                    }}
                  >
                    {r.p}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
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
type Scatter = { t: string; x: string; y: string; r: number; size: number; o: number };

const ScatterQuestion = ({
  eyebrow,
  line1,
  line2,
  sub,
  chips,
}: {
  eyebrow: string;
  line1: string;
  line2: string;
  sub: string;
  chips: Scatter[];
}) => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="52%" size={1500} opacity={0.32} />
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {chips.map((c, i) => (
        <span
          key={c.t}
          style={{
            position: 'absolute',
            left: c.x,
            top: c.y,
            transform: `translate(-50%, -50%) rotate(${c.r}deg)`,
            opacity: c.o,
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
              fontSize: c.size,
              color: palette.muted,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
              animationDelay: `${340 + i * 55}ms`,
            }}
          >
            {c.t}
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
      <Eyebrow>{eyebrow}</Eyebrow>
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
        {line1}
        <br />
        <span style={gradText}>{line2}</span>
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
        {sub}
      </p>
    </div>
    <Footer />
  </div>
);

const wishes: Scatter[] = [
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
  <ScatterQuestion
    eyebrow="換你說 · Your turn"
    line1="你想從這裡"
    line2="帶走什麼？"
    sub="What do you want to take away from ACE Club?"
    chips={wishes}
  />
);

const ClubIntro3: Page = () => <Blank />;
const heardTools: Scatter[] = [
  { t: 'ChatGPT', x: '9%', y: '11%', r: -9, size: 28, o: 1 },
  { t: 'Gemini', x: '26%', y: '19%', r: 7, size: 25, o: 0.9 },
  { t: 'Claude', x: '43%', y: '9%', r: -6, size: 27, o: 1 },
  { t: 'Copilot', x: '60%', y: '18%', r: 11, size: 24, o: 0.88 },
  { t: 'Midjourney', x: '80%', y: '10%', r: -8, size: 26, o: 1 },
  { t: 'Perplexity', x: '92%', y: '22%', r: 9, size: 23, o: 0.9 },
  { t: 'Canva AI', x: '6%', y: '26%', r: 6, size: 25, o: 0.92 },
  { t: 'Notion AI', x: '14%', y: '41%', r: -12, size: 24, o: 0.9 },
  { t: 'Grok', x: '89%', y: '38%', r: 8, size: 26, o: 1 },
  { t: 'Sora', x: '8%', y: '55%', r: 10, size: 27, o: 1 },
  { t: 'Suno', x: '92%', y: '52%', r: -7, size: 25, o: 0.94 },
  { t: 'NotebookLM', x: '13%', y: '68%', r: 5, size: 23, o: 0.88 },
  { t: 'Cursor', x: '88%', y: '66%', r: -10, size: 26, o: 1 },
  { t: 'DeepSeek', x: '22%', y: '80%', r: 8, size: 24, o: 0.9 },
  { t: 'CapCut AI', x: '40%', y: '87%', r: -11, size: 23, o: 0.86 },
  { t: 'ElevenLabs', x: '58%', y: '79%', r: 9, size: 25, o: 0.92 },
  { t: 'Runway', x: '75%', y: '87%', r: -6, size: 24, o: 0.88 },
  { t: 'Firefly', x: '91%', y: '79%', r: 12, size: 22, o: 0.86 },
];

const ClubIntro4: Page = () => (
  <ScatterQuestion
    eyebrow="暖身 · Warm-up"
    line1="你聽過哪些"
    line2="AI 工具？"
    sub="Which AI tools have you heard of?"
    chips={heardTools}
  />
);
const usedTools: Scatter[] = [
  { t: 'ChatGPT', x: '14%', y: '20%', r: -7, size: 34, o: 1 },
  { t: '每天都在用', x: '57%', y: '13%', r: -8, size: 28, o: 0.9 },
  { t: 'Gemini', x: '84%', y: '17%', r: 8, size: 32, o: 1 },
  { t: 'Claude', x: '8%', y: '46%', r: 6, size: 33, o: 1 },
  { t: 'Copilot', x: '90%', y: '44%', r: -9, size: 31, o: 0.94 },
  { t: 'Canva AI', x: '16%', y: '74%', r: 9, size: 32, o: 1 },
  { t: '一個都沒有', x: '44%', y: '86%', r: 7, size: 30, o: 0.9 },
  { t: 'Notion AI', x: '86%', y: '72%', r: -6, size: 30, o: 0.94 },
];

const ClubIntro5: Page = () => (
  <ScatterQuestion
    eyebrow="再問一次 · Be honest"
    line1="哪些你真的"
    line2="打開來用過？"
    sub="And which of them have you actually used?"
    chips={usedTools}
  />
);
const aiTools = [
  {
    icon: codexIcon,
    wordmark: false,
    maker: 'OpenAI',
    org: 'OpenAI',
    orgNote: '2015 年成立 · 美國舊金山',
    people: [{ n: 'Sam Altman', r: '執行長' }],
    name: 'Codex',
    zh: '終端機裡的工程師',
    desc: '給它一句話，它自己讀專案、改檔案、跑測試。',
    points: [
      '在終端機裡跑，也可以丟到雲端讓它自己做',
      '讀得懂整個專案，不是只看你貼的那一段',
      '改完會自己跑測試，錯了再回去改',
    ],
  },
  {
    icon: claudeIcon,
    wordmark: false,
    maker: 'Anthropic',
    org: 'Anthropic',
    orgNote: '2021 年成立 · 由前 OpenAI 成員創辦',
    people: [{ n: 'Dario Amodei', r: '共同創辦人暨執行長' }],
    name: 'Claude Code',
    zh: '會動手的助理',
    desc: '在你的資料夾裡直接改程式、找 bug，也有桌面版和編輯器外掛。',
    points: [
      '在你的資料夾裡直接動手改檔案',
      '終端機、桌面版、VS Code 外掛都有',
      '可以一路做到幫你送出 PR',
    ],
  },
  {
    icon: geminiIcon,
    wordmark: false,
    maker: 'Google',
    org: 'Google DeepMind',
    orgNote: 'Alphabet 旗下 · Gemini 由 DeepMind 開發',
    people: [
      { n: 'Sundar Pichai', r: 'Google 執行長' },
      { n: 'Demis Hassabis', r: 'DeepMind 執行長' },
    ],
    name: 'Gemini',
    zh: '什麼都能問',
    desc: '查資料、寫文件、寫程式都行，終端機也有 Gemini CLI 可以跑。',
    points: [
      '一次讀得進很長的文件、圖片和影片',
      '查資料、寫報告、寫程式都能問',
      '終端機也有 Gemini CLI 可以跑',
    ],
  },
  {
    icon: cursorLogo,
    wordmark: false,
    maker: 'Anysphere',
    org: 'Anysphere',
    orgNote: '2022 年成立 · 由四位 MIT 學生創辦',
    people: [{ n: 'Michael Truell', r: '共同創辦人暨執行長' }],
    name: 'Cursor',
    zh: '內建 AI 的編輯器',
    desc: '長得像 VS Code，按 Tab 補完整段，也能把整個專案交給它改。',
    points: [
      '長得跟 VS Code 一樣，會用就會用',
      '按 Tab 補完的是整段，不是只有一行',
      '也可以把整個專案交給它改',
    ],
  },
];

const ToolMark = ({ tool, size }: { tool: (typeof aiTools)[number]; size: number }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.26,
      background: palette.surfaceHi,
      border: `1px solid ${palette.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      flexShrink: 0,
    }}
  >
    <img
      src={tool.icon}
      alt=""
      style={{
        width: size * 0.54,
        height: size * 0.54,
        display: 'block',
        objectFit: tool.wordmark ? 'cover' : 'contain',
        objectPosition: 'left center',
      }}
    />
  </div>
);

const ToolPage = ({ tool }: { tool: (typeof aiTools)[number] }) => (
  <div style={fill}>
    <Style />
    <Glow x="78%" y="60%" size={1200} opacity={0.26} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 90,
        alignItems: 'center',
        padding: '0 140px',
      }}
    >
      <div>
        <div className="ace-fadeup" style={{ marginBottom: 30 }}>
          <ToolMark tool={tool} size={130} />
        </div>
        <div
          className="ace-fadeup"
          style={{
            fontFamily: fonts.mono,
            fontSize: 18,
            letterSpacing: '0.14em',
            color: 'var(--osd-accent)',
            animationDelay: '100ms',
          }}
        >
          {tool.maker}
        </div>
        <h2
          className="ace-fadeup"
          style={{
            fontSize: 78,
            fontWeight: 800,
            margin: '12px 0 14px',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            animationDelay: '160ms',
          }}
        >
          {tool.name}
        </h2>
        <p
          className="ace-fadeup"
          style={{
            fontSize: 32,
            margin: '0 0 18px',
            ...gradText,
            animationDelay: '220ms',
          }}
        >
          {tool.zh}
        </p>
        <p
          className="ace-fadeup"
          style={{
            fontSize: 22,
            color: palette.muted,
            lineHeight: 1.6,
            margin: '0 0 30px',
            maxWidth: 620,
            animationDelay: '280ms',
          }}
        >
          {tool.desc}
        </p>
        <div
          className="ace-fadeup"
          style={{
            display: 'inline-block',
            padding: '22px 28px 24px',
            borderRadius: 'var(--osd-radius)',
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            boxShadow: cardShadow,
            animationDelay: '340ms',
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 15,
              letterSpacing: '0.12em',
              color: 'var(--osd-accent)',
            }}
          >
            誰做的 · WHO BUILDS IT
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, marginTop: 10 }}>{tool.org}</div>
          <div style={{ fontSize: 17, color: palette.muted, marginTop: 4 }}>{tool.orgNote}</div>
          <div
            style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: `1px solid ${palette.border}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {tool.people.map((pr) => (
              <div key={pr.n} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontSize: 22, fontWeight: 600 }}>{pr.n}</span>
                <span style={{ fontSize: 17, color: palette.muted }}>{pr.r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {tool.points.map((pt, i) => (
          <div
            key={pt}
            className="ace-fadeup"
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 20,
              padding: '26px 30px',
              borderRadius: 'var(--osd-radius)',
              background: palette.surface,
              border: `1px solid ${palette.border}`,
              boxShadow: cardShadow,
              animationDelay: `${340 + i * 110}ms`,
            }}
          >
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 18,
                letterSpacing: '0.1em',
                color: 'var(--osd-accent)',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontSize: 24, lineHeight: 1.5 }}>{pt}</span>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

const ToolCodex: Page = () => <ToolPage tool={aiTools[0]} />;
const ToolClaude: Page = () => <ToolPage tool={aiTools[1]} />;
const ToolGemini: Page = () => <ToolPage tool={aiTools[2]} />;
const ToolCursor: Page = () => <ToolPage tool={aiTools[3]} />;

const ClubIntro6: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="85%" y="75%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>現在的 AI 工具 · The tools we use</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 64,
          fontWeight: 800,
          margin: '26px 0 40px',
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          animationDelay: '120ms',
        }}
      >
        現在的 AI <span style={gradText}>會自己動手</span>
      </h2>
      <div style={{ display: 'flex', gap: 20, alignItems: 'stretch' }}>
        {aiTools.map((t, i) => (
          <div
            key={t.name}
            className="ace-fadeup"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '28px 28px 30px',
              borderRadius: 'var(--osd-radius)',
              background: palette.surface,
              border: `1px solid ${palette.border}`,
              boxShadow: cardShadow,
              animationDelay: `${240 + i * 100}ms`,
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <ToolMark tool={t} size={64} />
            </div>
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 15,
                letterSpacing: '0.12em',
                color: 'var(--osd-accent)',
              }}
            >
              {t.maker}
            </div>
            <div style={{ fontSize: 34, fontWeight: 700, marginTop: 8 }}>{t.name}</div>
            <div style={{ fontSize: 24, marginTop: 12 }}>{t.zh}</div>
            <div style={{ fontSize: 22, color: palette.muted, marginTop: 14, lineHeight: 1.55 }}>
              {t.desc}
            </div>
          </div>
        ))}
      </div>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 22,
          color: palette.muted,
          marginTop: 36,
          animationDelay: '680ms',
        }}
      >
        這份簡報就是用 Claude Code 做出來的。
      </p>
    </div>
    <Footer />
  </div>
);

const kindStyle = {
  實體: { bg: 'rgba(46, 111, 224, 0.12)', fg: 'var(--osd-accent)' },
  線上: { bg: '#F5F5F7', fg: '#6E6E73' },
  不用到: { bg: 'transparent', fg: '#8E8E93' },
} as const;

type Session = { d: string; k: keyof typeof kindStyle; t: string; today?: boolean };

const term1: Session[] = [
  { d: '9/3', k: '實體', t: '講師介紹、故事分享、課程導讀', today: true },
  { d: '9/10', k: '實體', t: '創意發想、分組討論、軟體安裝' },
  { d: '9/17', k: '實體', t: '實作測試' },
  { d: '9/24', k: '線上', t: '線上分組討論' },
  { d: '10/1', k: '線上', t: '線上分組討論' },
  { d: '10/8', k: '實體', t: '發表準備' },
  { d: '10/15', k: '實體', t: '發表日' },
  { d: '10/22', k: '不用到', t: '讀書日 · 自習準備考試' },
];

const term2: Session[] = [
  { d: '11/12', k: '實體', t: '分組、創意發想' },
  { d: '11/19', k: '線上', t: 'UI/UX、AI 應用' },
  { d: '11/26', k: '實體', t: '世界咖啡館、分組討論實作' },
  { d: '12/3', k: '線上', t: '線上分組討論' },
  { d: '12/24', k: '實體', t: '發表日' },
  { d: '12/31', k: '不用到', t: '慶功日' },
];

const TermCard = ({
  title,
  titleEn,
  rows,
  delay,
}: {
  title: string;
  titleEn: string;
  rows: Session[];
  delay: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      flex: 1,
      padding: '28px 30px 30px',
      borderRadius: 'var(--osd-radius)',
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: cardShadow,
      animationDelay: `${delay}ms`,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 14,
        marginBottom: 18,
      }}
    >
      <span style={{ fontSize: 32, fontWeight: 700 }}>{title}</span>
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 15,
          letterSpacing: '0.12em',
          color: 'var(--osd-accent)',
        }}
      >
        {titleEn} · {rows.length} 次
      </span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {rows.map((r) => (
        <div
          key={r.d}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '10px 14px',
            borderRadius: 10,
            background: r.today ? palette.accentSoft : 'transparent',
            opacity: r.k === '不用到' ? 0.62 : 1,
          }}
        >
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 21,
              fontWeight: 700,
              minWidth: 74,
              color: r.today ? 'var(--osd-accent)' : 'var(--osd-text)',
            }}
          >
            {r.d}
          </span>
          <span
            style={{
              fontSize: 15,
              padding: '4px 12px',
              borderRadius: 999,
              minWidth: 62,
              textAlign: 'center',
              background: kindStyle[r.k].bg,
              color: kindStyle[r.k].fg,
              border: r.k === '不用到' ? `1px dashed ${palette.chipBorder}` : 'none',
            }}
          >
            {r.k}
          </span>
          <span style={{ fontSize: 19, lineHeight: 1.4 }}>{r.t}</span>
          {r.today && (
            <span
              style={{
                marginLeft: 'auto',
                fontFamily: fonts.mono,
                fontSize: 13,
                padding: '3px 10px',
                borderRadius: 999,
                background: 'var(--osd-accent)',
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
              }}
            >
              今天
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
);

const ClubIntro8: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="15%" y="85%" size={1200} opacity={0.22} />
    <div style={{ padding: '110px 140px 0' }}>
      <Eyebrow>課程導讀 · The year ahead</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 56,
          fontWeight: 800,
          margin: '22px 0 32px',
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          animationDelay: '120ms',
        }}
      >
        這一年 <span style={gradText}>十四次社課</span>，這樣跑
      </h2>
      <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
        <TermCard title="上半學期" titleEn="TERM 1" rows={term1} delay={240} />
        <TermCard title="下半學期" titleEn="TERM 2" rows={term2} delay={360} />
      </div>
    </div>
    <Footer />
  </div>
);

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

const Icebreak2: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="55%" size={1600} opacity={0.34} />
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
      <Eyebrow>心態 · Mindset</Eyebrow>
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
        AI 什麼都做得出來
        <br />
        <span style={gradText}>但它不知道你想做什麼</span>
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
        AI can build almost anything. It just doesn't know what you want to build.
      </p>
    </div>
    <Footer />
  </div>
);
const Icebreak3: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="70%" y="70%" size={1200} opacity={0.24} />
    <div style={{ padding: '140px 140px 0' }}>
      <Eyebrow>兩種用法 · Two ways</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 64,
          fontWeight: 800,
          margin: '26px 0 44px',
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          animationDelay: '120ms',
        }}
      >
        同樣一個 AI，<span style={gradText}>誰在決定？</span>
      </h2>
      <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
        {[
          {
            tag: '讓 AI 決定',
            tagEn: 'It decides',
            prompt: '「幫我做一個作品」',
            lines: [
              '它給你一個你看不懂的東西。',
              '你不知道為什麼要這樣做。',
              '下次沒有它，你還是不會。',
            ],
            primary: false,
          },
          {
            tag: '你來決定',
            tagEn: 'You decide',
            prompt: '「我想解決＿＿，幫我做＿＿」',
            lines: [
              '你知道要解決什麼問題。',
              '它幫你把想法變成真的東西。',
              '做完你說得出每一步在幹嘛。',
            ],
            primary: true,
          },
        ].map((c, i) => (
          <div
            key={c.tag}
            className="ace-fadeup"
            style={{
              flex: 1,
              padding: '34px 38px 38px',
              borderRadius: 'var(--osd-radius)',
              background: palette.surface,
              border: `1px solid ${c.primary ? 'var(--osd-accent)' : palette.border}`,
              boxShadow: cardShadow,
              opacity: c.primary ? 1 : 0.82,
              animationDelay: `${260 + i * 130}ms`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 16,
                letterSpacing: '0.12em',
                color: c.primary ? 'var(--osd-accent)' : palette.muted,
              }}
            >
              {c.tagEn}
            </div>
            <div style={{ fontSize: 40, fontWeight: 800, marginTop: 10 }}>{c.tag}</div>
            <div
              style={{
                marginTop: 22,
                marginBottom: 24,
                padding: '18px 22px',
                borderRadius: 14,
                background: c.primary ? palette.accentSoft : palette.surfaceHi,
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {c.prompt}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {c.lines.map((l) => (
                <div key={l} style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                  <span style={{ color: 'var(--osd-accent)', fontSize: 16 }}>◉</span>
                  <span style={{ fontSize: 21, lineHeight: 1.5, color: palette.muted }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);
const Icebreak4: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="20%" y="75%" size={1200} opacity={0.24} />
    <div style={{ padding: '150px 140px 0' }}>
      <Eyebrow>怎麼開始 · Where to start</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 64,
          fontWeight: 800,
          margin: '26px 0 20px',
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          animationDelay: '120ms',
        }}
      >
        先找到 <span style={gradText}>你的那件事</span>
      </h2>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 23,
          color: palette.muted,
          lineHeight: 1.55,
          margin: '0 0 44px',
          maxWidth: 1100,
          animationDelay: '200ms',
        }}
      >
        工具誰都拿得到，題目只有你自己有。這學期我們要做的，是幫你把題目找出來，再用 AI 把它做完。
      </p>
      <div style={{ display: 'flex', gap: 24 }}>
        {[
          {
            n: '01',
            t: '從你的不爽開始',
            d: '每天有什麼事讓你覺得麻煩？那就是題目。別人的痛點你不痛，做不久。',
          },
          {
            n: '02',
            t: '講清楚你要什麼',
            d: '講不清楚，AI 只能用猜的。把要什麼想明白，這一步沒有人能幫你。',
          },
          {
            n: '03',
            t: '自己看得懂才算數',
            d: 'AI 給的東西，你要說得出哪裡對、哪裡不對。看不懂就不是你的作品。',
          },
        ].map((c, i) => (
          <div
            key={c.n}
            className="ace-fadeup"
            style={{
              flex: 1,
              padding: '32px 34px 36px',
              borderRadius: 'var(--osd-radius)',
              background: palette.surface,
              border: `1px solid ${palette.border}`,
              boxShadow: cardShadow,
              animationDelay: `${300 + i * 110}ms`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 18,
                letterSpacing: '0.14em',
                color: 'var(--osd-accent)',
                marginBottom: 16,
              }}
            >
              {c.n}
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 14 }}>{c.t}</div>
            <div style={{ fontSize: 20, color: palette.muted, lineHeight: 1.55 }}>{c.d}</div>
          </div>
        ))}
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
      <div
        className="ace-fadeup"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 14,
          marginTop: 40,
          padding: '18px 34px',
          borderRadius: 999,
          background: palette.surface,
          border: `1px solid ${palette.chipBorder}`,
          boxShadow: cardShadow,
          animationDelay: '320ms',
        }}
      >
        <span style={{ color: 'var(--osd-accent)', fontSize: 22, lineHeight: 1 }}>♠</span>
        <span style={{ fontFamily: fonts.mono, fontSize: 30, fontWeight: 700 }}>9/10（四）</span>
        <span style={{ fontSize: 22, color: palette.muted }}>下次社課</span>
      </div>
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
  title: '2026/9/3 ACE Club Lesson 1',
  theme: 'aurora',
  createdAt: '2026-08-25T07:18:48+08:00',
};

export default [
  Cover,
  AboutMe,
  AboutMe2,
  AboutMe3,
  StoryRoots,
  StoryHighSchoolClub,
  StoryExperienceWall,
  StoryAwardMoment,
  StoryHungryAfterAward,
  StoryActivityHunt,
  StorySummerScheduleClash,
  StoryFirstTimeAbroad,
  StoryAbroadWithFriends,
  StoryEarlyGraduationTrip,
  StoryContestCanBeFun,
  StoryClosingDream,
  ClubIntro1,
  ClubIntro2,
  ClubIntro3,
  ClubIntro4,
  ClubIntro5,
  ClubIntro6,
  ToolCodex,
  ToolClaude,
  ToolGemini,
  ToolCursor,
  ClubIntro8,
  TrainingTargetMembers,
  TrainingRoadmap,
  TrainingGoals,
  TrainingSwiftStudentChallenge,
  TrainingSscPrizes,
  TrainingWinnerKeitaro,
  TrainingWinnerRuoshan,
  TrainingWhoWins,
  DividerIcebreaker,
  GameIntro,
  Icebreak2,
  Icebreak3,
  Icebreak4,
  DividerStories,
  StoryVideo,
  StoryFocusLoop,
  StoryFocusLoopScreens,
  StoryNick,
  StoryWWDC,
  StoryHalfFcuTopia,
  QA,
  Closing,
] satisfies Page[];
