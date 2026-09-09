import { type DesignSystem, type Page, type SlideMeta, useSlidePageNumber } from '@open-slide/core';
import claudeIcon from './assets/claude-ai-icon.svg';
import codexIcon from './assets/codex_light.svg';
import cursorLogo from './assets/cursor_light.svg';
import focusLoop from './assets/focusloop.png';
import focusLoopScreens from './assets/focusloop-screens.png';
import geminiIcon from './assets/gemini.svg';
import { StoryHalfFcuTopia } from './story-pages';

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
      <span>ACE Club · 社課 Lesson 02</span>
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
      9/10
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
          社課第二堂 · 創意發想
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
          <LauncherRow icon="📖" title="我的故事" sub="How I got here" delay={690} />
          <LauncherRow icon="♠" title="社團介紹" sub="What ACE Club is" delay={780} />
          <LauncherRow
            icon="🤖"
            title="AI 工具與課程導讀"
            sub="Tools and the term ahead"
            delay={870}
          />
          <LauncherRow icon="🧊" title="破冰時間" sub="Icebreaker — 一起玩一場" delay={960} />
          <LauncherRow icon="💡" title="其他人的故事" sub="Stories worth telling" delay={1050} />
        </Launcher>
      </div>
    </div>
    <Footer />
  </div>
);

const DoubleDiamond: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="10%" size={1200} opacity={0.2} />
    <div style={{ padding: '120px 140px 0' }}>
      <Eyebrow>創意思考 · Double Diamond</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 64,
          fontWeight: 800,
          margin: '26px 0 14px',
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          animationDelay: '120ms',
        }}
      >
        設計思考，<span style={gradText}>雙鑽石。</span>
      </h2>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 24,
          color: palette.muted,
          lineHeight: 1.4,
          margin: '0 0 34px',
          animationDelay: '200ms',
        }}
      >
        做兩輪發散收斂：第一顆鑽石找對問題，第二顆鑽石把東西做出來、拿去測。
      </p>
      <svg
        viewBox="0 0 1600 470"
        width={1640}
        role="img"
        aria-label="設計思考雙鑽石流程圖：同理使用者、定義問題、創意發想、原型製作、快速測試"
        className="ace-fade"
        style={{ display: 'block', animationDelay: '260ms' }}
      >
        <defs>
          <linearGradient id="aceDdLesson2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8AA2C6" />
            <stop offset="50%" stopColor="#4A80DB" />
            <stop offset="100%" stopColor="#2E6FE0" />
          </linearGradient>
        </defs>
        <polygon
          points="20,235 330,50 640,235 330,420"
          fill="url(#aceDdLesson2)"
          opacity="0.13"
          stroke="var(--osd-accent)"
          strokeOpacity="0.45"
          strokeWidth="2"
        />
        <polygon
          points="700,235 1140,50 1580,235 1140,420"
          fill="url(#aceDdLesson2)"
          opacity="0.13"
          stroke="var(--osd-accent)"
          strokeOpacity="0.45"
          strokeWidth="2"
        />
        {[
          { x: 330, y1: 50, y2: 420 },
          { x: 995, y1: 112, y2: 358 },
          { x: 1300, y1: 120, y2: 350 },
        ].map((l) => (
          <line
            key={l.x}
            x1={l.x}
            y1={l.y1}
            x2={l.x}
            y2={l.y2}
            stroke="var(--osd-accent)"
            strokeOpacity="0.25"
            strokeWidth="2"
          />
        ))}
        {[
          { x: 175, zh: '同理使用者', en: 'Empathize' },
          { x: 482, zh: '定義問題', en: 'Define' },
          { x: 848, zh: '創意發想', en: 'Ideate' },
          { x: 1148, zh: '原型製作', en: 'Prototype' },
          { x: 1440, zh: '快速測試', en: 'Test' },
        ].map((st) => (
          <g key={st.en}>
            <text
              x={st.x}
              y={228}
              textAnchor="middle"
              fontSize="30"
              fontWeight="700"
              fill={palette.text}
            >
              {st.zh}
            </text>
            <text x={st.x} y={262} textAnchor="middle" fontSize="17" fill={palette.muted}>
              {st.en}
            </text>
          </g>
        ))}
        {[
          { x: 130, t: '發散' },
          { x: 490, t: '收斂' },
          { x: 795, t: '發散' },
          { x: 1430, t: '收斂' },
        ].map((m) => (
          <text key={m.x} x={m.x} y={115} fontSize="22" fill={palette.muted}>
            {m.t}
          </text>
        ))}
      </svg>
    </div>
    <Footer />
  </div>
);

const Divider = ({ title, sub, subEn }: { title: string; sub: string; subEn: string }) => (
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
const aiTools = [
  {
    icon: codexIcon,
    wordmark: false,
    tags: ['新手友好', '有免費額度'],
    note: '',
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
    tags: ['目前公認最聰明'],
    note: '',
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
    tags: ['搜尋最強'],
    note: '查資料很行，但真的動手做事有點笨，複雜的任務要盯著它。',
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
    tags: ['被 SpaceX 收購'],
    note: '2026 年 8 月以 600 億美金全股票成交，併進新設的 SpaceXAI 部門，是史上最大的新創收購案。未來走向還看不出來。',
    maker: 'Anysphere',
    org: 'Anysphere',
    orgNote: '2022 年由四位 MIT 學生創辦 · 2026 年併入 SpaceX',
    people: [{ n: 'Michael Truell', r: '共同創辦人' }],
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
            margin: '0 0 16px',
            ...gradText,
            animationDelay: '220ms',
          }}
        >
          {tool.zh}
        </p>
        {tool.tags.length > 0 && (
          <div
            className="ace-fadeup"
            style={{
              display: 'flex',
              gap: 10,
              marginBottom: 18,
              animationDelay: '250ms',
            }}
          >
            {tool.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '8px 18px',
                  borderRadius: 999,
                  background: palette.accentSoft,
                  color: 'var(--osd-accent)',
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <p
          className="ace-fadeup"
          style={{
            fontSize: 22,
            color: palette.muted,
            lineHeight: 1.6,
            margin: tool.note ? '0 0 14px' : '0 0 30px',
            maxWidth: 620,
            animationDelay: '280ms',
          }}
        >
          {tool.desc}
        </p>
        {tool.note && (
          <div
            className="ace-fadeup"
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 12,
              maxWidth: 620,
              marginBottom: 30,
              animationDelay: '300ms',
            }}
          >
            <span style={{ color: 'var(--osd-accent)', fontSize: 18 }}>※</span>
            <span style={{ fontSize: 21, lineHeight: 1.55 }}>{tool.note}</span>
          </div>
        )}
        <div
          className="ace-fadeup"
          style={{
            display: 'block',
            padding: '30px 38px 34px',
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
              fontSize: 17,
              letterSpacing: '0.12em',
              color: 'var(--osd-accent)',
            }}
          >
            誰做的 · WHO BUILDS IT
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, marginTop: 12 }}>{tool.org}</div>
          <div style={{ fontSize: 20, color: palette.muted, marginTop: 6 }}>{tool.orgNote}</div>
          <div
            style={{
              marginTop: 20,
              paddingTop: 20,
              borderTop: `1px solid ${palette.border}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {tool.people.map((pr) => (
              <div key={pr.n} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontSize: 27, fontWeight: 600 }}>{pr.n}</span>
                <span style={{ fontSize: 20, color: palette.muted }}>{pr.r}</span>
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
          fontSize: 72,
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
          fontSize: 26,
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
                fontSize: 20,
                letterSpacing: '0.14em',
                color: 'var(--osd-accent)',
                marginBottom: 16,
              }}
            >
              {c.n}
            </div>
            <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 14 }}>{c.t}</div>
            <div style={{ fontSize: 23, color: palette.muted, lineHeight: 1.55 }}>{c.d}</div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

const DividerStories: Page = () => (
  <Divider
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

const Closing2: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="52%" size={1500} opacity={0.32} />
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
      <Eyebrow>給你的一句話 · Just do it</Eyebrow>
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
        想要改變什麼，想要做什麼
        <br />
        <span style={gradText}>就去做</span>
      </h1>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 26,
          color: palette.muted,
          lineHeight: 1.5,
          margin: 0,
          maxWidth: 1200,
          animationDelay: '220ms',
        }}
      >
        If you want to change something — go make it.
      </p>
    </div>
    <Footer />
  </div>
);
const Closing3: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="52%" size={1600} opacity={0.32} />
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
      <Eyebrow>最後一句 · One last thing</Eyebrow>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 92,
          fontWeight: 800,
          margin: '36px 0 26px',
          lineHeight: 1.16,
          letterSpacing: '-0.02em',
          animationDelay: '120ms',
        }}
      >
        你不用很厲害才能開始
        <br />
        <span style={gradText}>你要開始才能很厲害</span>
      </h1>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 26,
          color: palette.muted,
          lineHeight: 1.5,
          margin: 0,
          maxWidth: 1200,
          animationDelay: '220ms',
        }}
      >
        You don't have to be great to start. You have to start to be great.
      </p>
    </div>
    <Footer />
  </div>
);

const QA: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="55%" size={1500} opacity={0.28} />
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
      <Eyebrow>Q &amp; A</Eyebrow>
      <h1
        className="ace-fadeup"
        style={{
          fontSize: 104,
          fontWeight: 800,
          margin: '36px 0 0',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          animationDelay: '120ms',
        }}
      >
        有問題
        <br />
        <span style={gradText}>隨時丟上來</span>
      </h1>
    </div>
    <Footer />
  </div>
);

export const meta: SlideMeta = {
  title: '2026/9/10 ACE Club Lesson 2 · 創意發想',
  theme: 'aurora',
  createdAt: '2026-09-06T11:30:00+08:00',
};

export default [
  Cover,
  DoubleDiamond,
  Icebreak4,
  DividerStories,
  StoryVideo,
  StoryFocusLoop,
  StoryFocusLoopScreens,
  StoryWWDC,
  StoryHalfFcuTopia,
  Closing2,
  Closing3,
  QA,
  ClubIntro4,
  ClubIntro6,
  ToolCodex,
  ToolClaude,
  ToolGemini,
  ToolCursor,
  Icebreak2,
  Icebreak3,
] satisfies Page[];
