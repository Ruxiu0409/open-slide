import { type DesignSystem, type Page, type SlideMeta, useSlidePageNumber } from '@open-slide/core';
import androidStudioIcon from './assets/android-studio.svg';
import flutterIcon from './assets/flutter.svg';
import vscodeIcon from './assets/vscode.svg';
import xcodeIcon from './assets/xcode.svg';

export const design: DesignSystem = {
  palette: { bg: '#F5F5F7', text: '#1D1D1F', accent: '#2E6FE0' },
  fonts: {
    display: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif',
  },
  typeScale: { hero: 92, body: 30 },
  radius: 18,
};

const palette = {
  bg: '#F5F5F7',
  surface: '#FFFFFF',
  surfaceHi: '#F5F5F7',
  border: '#E8E8ED',
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
@keyframes aceGlow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
.ace-fadeup { animation: aceFadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) both; }
.ace-fade { animation: aceFade 800ms ease-out both; }
.ace-glow { animation: aceGlow 5s ease-in-out infinite; }
`;

const Style = () => <style>{keyframes}</style>;

const Glow = ({
  x = '50%',
  y = '50%',
  size = 1200,
  opacity = 0.24,
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
      alignSelf: 'flex-start',
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
      <span>ACE Club · Lesson 02 · 補充資料</span>
      <span>
        {String(current).padStart(2, '0')}{' '}
        <span style={{ opacity: 0.45 }}>/ {String(total).padStart(2, '0')}</span>
      </span>
    </div>
  );
};

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 140px 70px',
    }}
  >
    {children}
  </div>
);

const IconTile = ({ src, size = 120 }: { src: string; size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.26,
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: cardShadow,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <img
      src={src}
      alt=""
      style={{ width: size * 0.5, height: size * 0.5, display: 'block', objectFit: 'contain' }}
    />
  </div>
);

const Strip = ({
  label,
  children,
  delay = 0,
}: {
  label: string;
  children: React.ReactNode;
  delay?: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      padding: '22px 28px',
      borderRadius: 'var(--osd-radius)',
      background: palette.surfaceHi,
      border: `1px solid ${palette.border}`,
      animationDelay: `${delay}ms`,
    }}
  >
    <span
      style={{
        fontFamily: fonts.mono,
        fontSize: 17,
        color: 'var(--osd-accent)',
        letterSpacing: '0.12em',
        flexShrink: 0,
      }}
    >
      {label}
    </span>
    <span style={{ fontSize: 22, lineHeight: 1.5 }}>{children}</span>
  </div>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
    <span style={{ color: 'var(--osd-accent)', fontSize: 15, flexShrink: 0 }}>◉</span>
    <span style={{ fontSize: 24, lineHeight: 1.55 }}>{children}</span>
  </div>
);

const CoverTile = ({ src, name }: { src: string; name: string }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      height: 186,
      borderRadius: 16,
      background: palette.surfaceHi,
      border: `1px solid ${palette.border}`,
    }}
  >
    <img src={src} alt="" style={{ width: 62, height: 62, display: 'block' }} />
    <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>{name}</div>
  </div>
);

const Cover: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="26%" y="44%" size={1300} opacity={0.28} />
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
      9/10 補充
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
            lineHeight: 1.14,
            letterSpacing: '-0.02em',
            ...gradText,
            animationDelay: '160ms',
          }}
        >
          第二堂 補充資料
          <br />
          該裝哪個工具
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
          你想做什麼，就裝什麼
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            className="ace-fadeup"
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 14,
              fontSize: 26,
              animationDelay: '240ms',
            }}
          >
            <span style={{ color: 'var(--osd-accent)', fontSize: 20 }}>◉</span>
            四條路，挑一條就好，不用全部裝
          </div>
          <div
            className="ace-fadeup"
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 14,
              fontSize: 26,
              animationDelay: '320ms',
            }}
          >
            <span style={{ color: 'var(--osd-accent)', fontSize: 20 }}>◉</span>
            下載都要等，找個晚上先掛著
          </div>
        </div>
      </div>
      <div className="ace-fade" style={{ animationDelay: '300ms' }}>
        <div
          style={{
            padding: 40,
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
            這份會講到的四個
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 22,
              marginTop: 26,
            }}
          >
            <CoverTile src={vscodeIcon} name="VS Code" />
            <CoverTile src={xcodeIcon} name="Xcode" />
            <CoverTile src={androidStudioIcon} name="Android Studio" />
            <CoverTile src={flutterIcon} name="Flutter" />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const WhereCodeLives: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="82%" y="26%" size={1100} opacity={0.2} />
    <Frame>
      <Eyebrow>補充資料 · Extra</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 64,
          fontWeight: 800,
          margin: '28px 0 36px',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          animationDelay: '120ms',
        }}
      >
        上週裝的 AI，還是要有個
        <span style={gradText}>地方動手</span>
      </h2>
      <div
        className="ace-fadeup"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          maxWidth: 1400,
          animationDelay: '240ms',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, fontSize: 32 }}>
          <span style={{ color: 'var(--osd-accent)', fontSize: 18 }}>◉</span>
          Codex 和 Claude Code 負責寫，但檔案得放在一個能編輯、能跑起來的地方
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, fontSize: 32 }}>
          <span style={{ color: 'var(--osd-accent)', fontSize: 18 }}>◉</span>
          那個地方就是編輯器，或是整套的開發環境
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, fontSize: 32 }}>
          <span style={{ color: 'var(--osd-accent)', fontSize: 18 }}>◉</span>
          裝哪一個，看你想做的是網站還是手機 App
        </div>
      </div>
      <div style={{ marginTop: 34 }}>
        <Strip label="先講結論" delay={380}>
          先想清楚要做什麼，再決定裝哪個。裝錯的話，白等一個晚上的下載。
        </Strip>
      </div>
    </Frame>
    <Footer />
  </div>
);

const PathCard = ({
  src,
  goal,
  tool,
  note,
  delay,
}: {
  src: string;
  goal: string;
  tool: string;
  note: string;
  delay: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 26,
      padding: 30,
      borderRadius: 'var(--osd-radius)',
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: cardShadow,
      animationDelay: `${delay}ms`,
    }}
  >
    <IconTile src={src} size={96} />
    <div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 17,
          color: 'var(--osd-accent)',
          letterSpacing: '0.12em',
        }}
      >
        {goal}
      </div>
      <div style={{ fontSize: 36, fontWeight: 800, marginTop: 8, letterSpacing: '-0.01em' }}>
        {tool}
      </div>
      <div style={{ fontSize: 22, color: palette.muted, marginTop: 8, lineHeight: 1.45 }}>
        {note}
      </div>
    </div>
  </div>
);

const PickYourPath: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="18%" y="76%" size={1150} opacity={0.2} />
    <Frame>
      <Eyebrow>對照表 · Pick One</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 60,
          fontWeight: 800,
          margin: '26px 0 12px',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          animationDelay: '120ms',
        }}
      >
        你想做什麼，就裝<span style={gradText}>對應的那個</span>
      </h2>
      <p
        className="ace-fadeup"
        style={{ fontSize: 26, color: palette.muted, margin: '0 0 40px', animationDelay: '180ms' }}
      >
        四條路各自獨立，先挑最想做的那一條
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <PathCard
          src={vscodeIcon}
          goal="想做網站"
          tool="VS Code"
          note="網頁前後端都在這裡寫，免費"
          delay={240}
        />
        <PathCard
          src={xcodeIcon}
          goal="想做 iPhone App"
          tool="Xcode"
          note="只有 Mac 能裝，沒得選"
          delay={320}
        />
        <PathCard
          src={androidStudioIcon}
          goal="想做 Android App"
          tool="Android Studio"
          note="Mac、Windows 都可以裝"
          delay={400}
        />
        <PathCard
          src={flutterIcon}
          goal="兩個平台都想要"
          tool="Flutter"
          note="寫一份程式，兩邊一起出"
          delay={480}
        />
      </div>
    </Frame>
    <Footer />
  </div>
);

const ToolDetail = ({
  src,
  maker,
  name,
  zh,
  bullets,
  site,
  siteNote,
  stripLabel,
  strip,
}: {
  src: string;
  maker: string;
  name: string;
  zh: string;
  bullets: React.ReactNode[];
  site: string;
  siteNote: string;
  stripLabel: string;
  strip: React.ReactNode;
}) => (
  <div style={fill}>
    <Style />
    <Glow x="80%" y="70%" size={1150} opacity={0.2} />
    <Frame>
      <Eyebrow>工具 · Tool</Eyebrow>
      <div
        className="ace-fadeup"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 30,
          margin: '30px 0 40px',
          animationDelay: '120ms',
        }}
      >
        <IconTile src={src} size={120} />
        <div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 18,
              color: 'var(--osd-accent)',
              letterSpacing: '0.14em',
            }}
          >
            {maker}
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              margin: '8px 0 6px',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {name}
          </div>
          <div style={{ fontSize: 30, ...gradText }}>{zh}</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
        <div
          className="ace-fadeup"
          style={{
            flex: 1.15,
            padding: 30,
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
              letterSpacing: '0.12em',
            }}
          >
            這個能幹嘛
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 22 }}>
            {bullets}
          </div>
        </div>
        <div
          className="ace-fadeup"
          style={{
            flex: 1,
            padding: 30,
            borderRadius: 'var(--osd-radius)',
            background: palette.surface,
            border: '1px solid var(--osd-accent)',
            boxShadow: cardShadow,
            animationDelay: '360ms',
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
            去哪裡拿
          </div>
          <div
            style={{
              marginTop: 20,
              padding: '16px 20px',
              borderRadius: 14,
              background: palette.surfaceHi,
              border: `1px solid ${palette.border}`,
              fontFamily: fonts.mono,
              fontSize: 22,
              fontWeight: 700,
              wordBreak: 'break-all',
            }}
          >
            {site}
          </div>
          <div style={{ fontSize: 23, lineHeight: 1.55, color: palette.muted, marginTop: 18 }}>
            {siteNote}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 26 }}>
        <Strip label={stripLabel} delay={480}>
          {strip}
        </Strip>
      </div>
    </Frame>
    <Footer />
  </div>
);

const ToolVSCode: Page = () => (
  <ToolDetail
    src={vscodeIcon}
    maker="Microsoft"
    name="VS Code"
    zh="寫網站最多人用的編輯器"
    bullets={[
      <Bullet key="a">網頁、後端、Python，大部分東西都在這裡寫</Bullet>,
      <Bullet key="b">免費，macOS、Windows、Linux 都能裝</Bullet>,
      <Bullet key="c">Codex 和 Claude Code 都有外掛，可以裝進來</Bullet>,
    ]}
    site="code.visualstudio.com"
    siteNote="點 Download，選自己的作業系統。檔案不到 200 MB，幾分鐘就好。"
    stripLabel="裝完之後"
    strip={
      <>
        點左邊那排的方塊圖示（Extensions），搜「ChatGPT」或「Claude」，就能把上週那兩個 AI
        裝進編輯器裡。
      </>
    }
  />
);

const ToolXcode: Page = () => (
  <ToolDetail
    src={xcodeIcon}
    maker="Apple"
    name="Xcode"
    zh="做 iPhone、iPad App 只有這條路"
    bullets={[
      <Bullet key="a">寫 Swift、拉畫面、跑模擬器，全部在裡面</Bullet>,
      <Bullet key="b">只有 macOS 能裝，Windows 真的沒辦法</Bullet>,
      <Bullet key="c">內建 iPhone 模擬器，手邊沒實機也能測</Bullet>,
    ]}
    site="Mac App Store 搜 Xcode"
    siteNote="免費，但檔案 10 GB 起跳。學校網路的話會等很久，建議回家裝。"
    stripLabel="要注意"
    strip={
      <>
        第一次打開還會再抓一次元件，硬碟先留個 30 GB
        比較保險。要上架才需要開發者帳號，先寫不用付錢。
      </>
    }
  />
);

const ToolAndroidStudio: Page = () => (
  <ToolDetail
    src={androidStudioIcon}
    maker="Google"
    name="Android Studio"
    zh="做 Android App 的官方工具"
    bullets={[
      <Bullet key="a">寫 Kotlin 或 Java，畫面可以直接拉</Bullet>,
      <Bullet key="b">macOS、Windows、Linux 都能裝</Bullet>,
      <Bullet key="c">內建 Android 模擬器，也可以接自己的手機測</Bullet>,
    ]}
    site="developer.android.com/studio"
    siteNote="點 Download 下載，約 1 GB。第一次打開會再抓一次 SDK，再等一下。"
    stripLabel="要注意"
    strip={<>模擬器很吃記憶體。電腦只有 8 GB RAM 的話，直接用傳輸線接 Android 手機測比較順。</>}
  />
);

const ToolFlutter: Page = () => (
  <ToolDetail
    src={flutterIcon}
    maker="Google"
    name="Flutter"
    zh="寫一份程式，兩個平台一起出"
    bullets={[
      <Bullet key="a">用 Dart 寫一次，iOS 和 Android 都能跑</Bullet>,
      <Bullet key="b">它不是編輯器，要配 VS Code 或 Android Studio 用</Bullet>,
      <Bullet key="c">要出 iOS 版，最後還是得有 Mac 和 Xcode</Bullet>,
    ]}
    site="flutter.dev"
    siteNote="點 Get started，跟著自己作業系統那一頁做。步驟比前面三個多一點。"
    stripLabel="建議順序"
    strip={
      <>
        先裝 VS Code，再裝 Flutter 外掛，然後在終端機打{' '}
        <span style={{ fontFamily: fonts.mono, fontWeight: 700 }}>flutter doctor</span>
        ，它會告訴你還缺什麼。
      </>
    }
  />
);

const NoteCard = ({
  tag,
  title,
  body,
  delay,
}: {
  tag: string;
  title: string;
  body: string;
  delay: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      padding: 28,
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
        letterSpacing: '0.12em',
      }}
    >
      {tag}
    </div>
    <div style={{ fontSize: 30, fontWeight: 800, marginTop: 10, letterSpacing: '-0.01em' }}>
      {title}
    </div>
    <div style={{ fontSize: 23, lineHeight: 1.55, color: palette.muted, marginTop: 12 }}>
      {body}
    </div>
  </div>
);

const BeforeYouInstall: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="76%" y="78%" size={1100} opacity={0.18} />
    <Frame>
      <Eyebrow>裝之前 · Heads Up</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 60,
          fontWeight: 800,
          margin: '26px 0 40px',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          animationDelay: '120ms',
        }}
      >
        四件事先<span style={gradText}>知道一下</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }}>
        <NoteCard
          tag="01"
          title="Xcode 只有 Mac 有"
          body="只有 Windows 又想做 App，就走 Android Studio，或先從網站開始。"
          delay={240}
        />
        <NoteCard
          tag="02"
          title="檔案都很大"
          body="Xcode 10 GB 起跳，Android Studio 裝完也要好幾 GB。硬碟先清一下。"
          delay={320}
        />
        <NoteCard
          tag="03"
          title="下載要等很久"
          body="找個晚上掛著讓它跑，不要上課前才開始裝。"
          delay={400}
        />
        <NoteCard
          tag="04"
          title="帳號先準備好"
          body="Xcode 要登 Apple ID，Android Studio 建議登 Google 帳號同步設定。"
          delay={480}
        />
      </div>
    </Frame>
    <Footer />
  </div>
);

const Chip = ({ src, name }: { src: string; name: string }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 22px',
      borderRadius: 999,
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
      fontSize: 24,
      fontWeight: 600,
    }}
  >
    <img src={src} alt="" style={{ width: 28, height: 28, display: 'block' }} />
    {name}
  </div>
);

const Closing: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="50%" size={1500} opacity={0.26} />
    <Frame>
      <Eyebrow>這禮拜 · Homework</Eyebrow>
      <p
        className="ace-fadeup"
        style={{
          fontSize: 40,
          color: palette.muted,
          margin: '30px 0 16px',
          animationDelay: '140ms',
        }}
      >
        不用全部裝，先做一件事就好
      </p>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 92,
          fontWeight: 800,
          margin: '0 0 26px',
          lineHeight: 1.14,
          letterSpacing: '-0.03em',
          ...gradText,
          animationDelay: '220ms',
        }}
      >
        挑一條路，把工具裝起來
      </h2>
      <p
        className="ace-fadeup"
        style={{ fontSize: 30, margin: '0 0 44px', animationDelay: '300ms' }}
      >
        下禮拜把電腦帶來，我們直接開一個專案來做。
      </p>
      <div className="ace-fadeup" style={{ display: 'flex', gap: 16, animationDelay: '400ms' }}>
        <Chip src={vscodeIcon} name="VS Code" />
        <Chip src={xcodeIcon} name="Xcode" />
        <Chip src={androidStudioIcon} name="Android Studio" />
        <Chip src={flutterIcon} name="Flutter" />
      </div>
    </Frame>
    <Footer />
  </div>
);

export const meta: SlideMeta = {
  title: '2026/9/10 ACE Club Lesson 2 · 補充資料 · 該裝哪個工具',
  theme: 'aurora',
  createdAt: '2026-09-12T07:54:30.151Z',
};

export default [
  Cover,
  WhereCodeLives,
  PickYourPath,
  ToolVSCode,
  ToolXcode,
  ToolAndroidStudio,
  ToolFlutter,
  BeforeYouInstall,
  Closing,
] satisfies Page[];
