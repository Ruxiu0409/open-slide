import { type DesignSystem, type Page, type SlideMeta, useSlidePageNumber } from '@open-slide/core';
import claudeIcon from './assets/claude-ai-icon.svg';
import openaiIcon from './assets/openai.svg';
import vercelIcon from './assets/vercel.svg';

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
      <span>ACE Club · 社課 Lesson 03</span>
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

const ToolChip = ({ src, name, cmd }: { src: string; name: string; cmd: string }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 16,
      padding: '16px 26px',
      borderRadius: 999,
      background: palette.surface,
      border: `1px solid ${palette.chipBorder}`,
      boxShadow: cardShadow,
    }}
  >
    <img src={src} alt="" style={{ width: 34, height: 34 }} />
    <span style={{ fontSize: 26, fontWeight: 700 }}>{name}</span>
    <span style={{ fontFamily: fonts.mono, fontSize: 24, color: 'var(--osd-accent)' }}>{cmd}</span>
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
      9/17
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
          社課第三堂 · 實作測試
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
          今天不聊概念，今天把東西做出來。
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
            <div style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
              <span style={{ fontFamily: fonts.mono, fontSize: 22, ...gradText }}>01</span>
              <span style={{ fontSize: 27 }}>把想法講清楚</span>
            </div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
              <span style={{ fontFamily: fonts.mono, fontSize: 22, ...gradText }}>02</span>
              <span style={{ fontSize: 27 }}>現場看我做一次</span>
            </div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
              <span style={{ fontFamily: fonts.mono, fontSize: 22, ...gradText }}>03</span>
              <span style={{ fontSize: 27 }}>把東西丟上線</span>
            </div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
              <span style={{ fontFamily: fonts.mono, fontSize: 22, ...gradText }}>04</span>
              <span style={{ fontSize: 27 }}>換你們動手做</span>
            </div>
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
            下課前，每組要有一個
            <br />
            別人打得開的網址。
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const Recap: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="80%" y="72%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>上週的作業 · Last week</Eyebrow>
      <Heading>
        你現在<span style={gradText}>在哪一格？</span>
      </Heading>
      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
        <Card delay={240}>
          <CardTag>還在想</CardTag>
          <CardTitle>什麼都還沒有</CardTitle>
          <CardBody>沒關係。等一下第一段，我們一起把題目挖出來。</CardBody>
        </Card>
        <Card delay={340}>
          <CardTag>想好了</CardTag>
          <CardTitle>有題目沒動手</CardTitle>
          <CardBody>今天最重要的就是你。看完示範就開工。</CardBody>
        </Card>
        <Card delay={440} primary>
          <CardTag>開始做了</CardTag>
          <CardTitle>已經有一點東西</CardTitle>
          <CardBody>很好。今天把它測過一輪，找出下一個要修的地方。</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>三格都可以。今天結束前，每個人手上都要有一個跑得起來的版本。</FootNote>
    </div>
    <Footer />
  </div>
);

const TodayFourSteps: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="20%" y="78%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>今天 · Today</Eyebrow>
      <Heading>
        四步，把想法<span style={gradText}>變成別人打得開的東西</span>
      </Heading>
      <div style={{ display: 'flex', gap: 22, alignItems: 'stretch' }}>
        <Card delay={220}>
          <BigNum>01</BigNum>
          <CardTitle>說清楚</CardTitle>
          <CardTag>Describe</CardTag>
          <CardBody>你要做給誰、解決什麼、做出來長什麼樣。</CardBody>
        </Card>
        <Card delay={300}>
          <BigNum>02</BigNum>
          <CardTitle>做出第一版</CardTitle>
          <CardTag>Build</CardTag>
          <CardBody>不求好看、不求完整，求「打得開」。</CardBody>
        </Card>
        <Card delay={380}>
          <BigNum>03</BigNum>
          <CardTitle>自己測，再改</CardTitle>
          <CardTag>Test</CardTag>
          <CardBody>你是第一個使用者。哪裡卡住，就改哪裡。</CardBody>
        </Card>
        <Card delay={460} primary>
          <BigNum>04</BigNum>
          <CardTitle>讓別人打得開</CardTitle>
          <CardTag>Ship</CardTag>
          <CardBody>丟到網路上，傳一個連結給別人。</CardBody>
        </Card>
      </div>
      <FootNote delay={580}>這四步會一直循環。上線之後，再回到第一步講得更清楚。</FootNote>
    </div>
    <Footer />
  </div>
);

const MindsetUgly: Page = () => (
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
        第一版一定很醜
        <br />
        <span style={gradText}>而且那是對的</span>
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
        醜的東西可以改，不存在的東西不行。
        <br />
        You can fix ugly. You can't fix nothing.
      </p>
    </div>
    <Footer />
  </div>
);

const SayItClear: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="85%" y="30%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>第一步 · Describe</Eyebrow>
      <Heading>
        AI 需要知道的<span style={gradText}>三件事</span>
      </Heading>
      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
        <Card delay={240}>
          <CardTag>Who</CardTag>
          <CardTitle>做給誰用</CardTitle>
          <CardBody>「給我們班上要交作業的人用。」</CardBody>
        </Card>
        <Card delay={340}>
          <CardTag>What</CardTag>
          <CardTitle>解決什麼麻煩</CardTitle>
          <CardBody>「大家常常忘記哪科作業什麼時候要交。」</CardBody>
        </Card>
        <Card delay={440}>
          <CardTag>How</CardTag>
          <CardTitle>長什麼樣子</CardTitle>
          <CardBody>「一頁清單，可以新增、打勾、按日期排。」</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>這三句講得出來，AI 就有辦法動手。講不出來，它只能猜。</FootNote>
    </div>
    <Footer />
  </div>
);

const TwoWaysToAsk: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="70%" y="72%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>同一個題目 · Two ways</Eyebrow>
      <Heading>
        差別不在 AI，<span style={gradText}>在你那一句</span>
      </Heading>
      <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
        <Card delay={240}>
          <div style={{ fontSize: 30, color: palette.muted }}>✕</div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 27,
              marginTop: 16,
              color: palette.muted,
              lineHeight: 1.5,
            }}
          >
            「幫我做一個作業 App」
          </div>
          <CardBody>它會給你一個看起來很完整、但不是你要的東西。</CardBody>
          <CardBody>你不知道哪裡可以改。</CardBody>
        </Card>
        <Card delay={360} primary>
          <div style={{ fontSize: 30, color: 'var(--osd-accent)' }}>✓</div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 27,
              marginTop: 16,
              lineHeight: 1.5,
            }}
          >
            「做一頁作業清單，給我們班用。
            <br />
            可以新增、打勾、按截止日排。」
          </div>
          <CardBody>它會給你一個你講得出來的東西。</CardBody>
          <CardBody>不對的地方，你指得出來。</CardBody>
        </Card>
      </div>
      <FootNote delay={520}>越具體越好。你講得越清楚，改起來越快。</FootNote>
    </div>
    <Footer />
  </div>
);

const PromptTemplate: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="30%" y="75%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>照抄就好 · Copy this</Eyebrow>
      <Heading>
        你的<span style={gradText}>第一句話</span>
      </Heading>
      <div
        className="ace-fadeup"
        style={{
          padding: '40px 46px',
          borderRadius: 'var(--osd-radius)',
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          boxShadow: cardShadow,
          fontSize: 32,
          lineHeight: 1.85,
          animationDelay: '260ms',
        }}
      >
        我想做一個給<span style={{ ...gradText, fontWeight: 700 }}>＿＿＿＿</span>
        用的東西，
        <br />
        解決<span style={{ ...gradText, fontWeight: 700 }}>＿＿＿＿</span>這個麻煩。
        <br />
        先做最簡單的版本就好，做完跟我說怎麼打開。
      </div>
      <FootNote delay={420}>
        「先做最簡單的版本」這句很重要 — 少了它，AI 會一次做一堆你用不到的功能。
      </FootNote>
    </div>
    <Footer />
  </div>
);

const FourActions: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="80%" y="70%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>第二步 · Build</Eyebrow>
      <Heading>
        開工只有<span style={gradText}>四個動作</span>
      </Heading>
      <div style={{ display: 'flex', gap: 22, alignItems: 'stretch' }}>
        <Card delay={220}>
          <BigNum>01</BigNum>
          <CardTitle>開一個資料夾</CardTitle>
          <CardBody>放在桌面就好，取一個你看得懂的名字。</CardBody>
        </Card>
        <Card delay={300}>
          <BigNum>02</BigNum>
          <CardTitle>開終端機</CardTitle>
          <CardBody>把資料夾拖進去，位置就對了。</CardBody>
        </Card>
        <Card delay={380}>
          <BigNum>03</BigNum>
          <CardTitle>叫出工具</CardTitle>
          <CardBody>輸入 claude 或 codex，按 Enter。</CardBody>
        </Card>
        <Card delay={460}>
          <BigNum>04</BigNum>
          <CardTitle>講你的第一句</CardTitle>
          <CardBody>上一頁那句，貼進去就好。</CardBody>
        </Card>
      </div>
      <div
        className="ace-fadeup"
        style={{ display: 'flex', gap: 20, marginTop: 36, animationDelay: '560ms' }}
      >
        <ToolChip src={claudeIcon} name="Claude Code" cmd="claude" />
        <ToolChip src={openaiIcon} name="Codex" cmd="codex" />
      </div>
    </div>
    <Footer />
  </div>
);

const TerminalLooksLike: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="25%" y="30%" size={1100} opacity={0.2} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>畫面長這樣 · What you'll see</Eyebrow>
      <Heading>
        不會有按鈕，<span style={gradText}>只有對話</span>
      </Heading>
      <Terminal>
        <TermLine sign="$">claude</TermLine>
        <TermLine sign="&gt;">我想做一個給我們班用的作業清單…</TermLine>
        <TermLine sign="✻" dim>
          正在建立檔案 index.html
        </TermLine>
        <TermLine sign="✻" dim>
          正在寫入樣式…
        </TermLine>
        <TermLine sign="✓">做好了，在瀏覽器打開 index.html 就看得到。</TermLine>
      </Terminal>
      <FootNote delay={420}>
        它問你要不要繼續的時候，看懂再按。不確定就先問它「這一步在做什麼」。
      </FootNote>
    </div>
    <Footer />
  </div>
);

const DividerDemo: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="50%" size={1500} opacity={0.32} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Eyebrow>現場示範 · Live demo</Eyebrow>
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
        看我做一次
      </h1>
    </div>
    <Footer />
  </div>
);

const DemoGuide: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="75%" y="68%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>示範 · Watch for this</Eyebrow>
      <Heading>
        我做什麼，<span style={gradText}>你看什麼</span>
      </Heading>
      <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
        <Card delay={240}>
          <CardTag>我會做</CardTag>
          <div style={{ fontSize: 27, lineHeight: 1.9, marginTop: 18 }}>
            01　開資料夾、開終端機
            <br />
            02　講出那三件事
            <br />
            03　等它做完，直接打開看
            <br />
            04　挑一個地方叫它改
          </div>
        </Card>
        <Card delay={360} primary>
          <CardTag>你要注意</CardTag>
          <div style={{ fontSize: 27, lineHeight: 1.9, marginTop: 18 }}>
            ◉　我第一句講了多少細節
            <br />
            ◉　東西做出來多快、多醜
            <br />
            ◉　我怎麼跟它講「這裡不對」
          </div>
        </Card>
      </div>
      <FootNote delay={500}>不用抄。等一下你會做一模一樣的流程。</FootNote>
    </div>
    <Footer />
  </div>
);

const WhenStuck: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="20%" y="72%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>卡住的時候 · When stuck</Eyebrow>
      <Heading>
        三種狀況，<span style={gradText}>三句話解決</span>
      </Heading>
      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
        <Card delay={240}>
          <CardTag>跳出紅字</CardTag>
          <CardTitle>整段貼回去</CardTitle>
          <CardBody>不用看懂，複製錯誤訊息丟給它，說「修好」。</CardBody>
        </Card>
        <Card delay={340}>
          <CardTag>做出來不對</CardTag>
          <CardTitle>指出哪裡不對</CardTitle>
          <CardBody>「日期排序反了，最近要交的放最上面。」</CardBody>
        </Card>
        <Card delay={440}>
          <CardTag>做太多了</CardTag>
          <CardTitle>叫它先講計畫</CardTitle>
          <CardBody>「先講你要改哪些地方，我同意你再動手。」</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>
        最沒用的一句是「壞了」。最有用的一句是「我按了什麼，結果發生什麼」。
      </FootNote>
    </div>
    <Footer />
  </div>
);

const TestYourself: Page = () => (
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
        padding: '0 160px',
      }}
    >
      <Eyebrow>第三步 · Test</Eyebrow>
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
        你是<span style={gradText}>第一個使用者</span>
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
        從頭到尾自己用一次，把卡住的地方記下來。
        <br />
        那張清單，就是你接下來要改的東西。
      </p>
    </div>
    <Footer />
  </div>
);

const DividerDeploy: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="50%" size={1500} opacity={0.32} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Eyebrow>第四步 · Ship</Eyebrow>
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
        讓別人打得開
      </h1>
    </div>
    <Footer />
  </div>
);

const WhyDeploy: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="72%" y="70%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>為什麼 · Why ship</Eyebrow>
      <Heading>
        做完了，<span style={gradText}>然後呢？</span>
      </Heading>
      <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
        <Card delay={240}>
          <div style={{ fontSize: 30, color: palette.muted }}>✕</div>
          <CardTitle>只存在你的電腦裡</CardTitle>
          <CardBody>要給人看，只能把筆電轉過去。</CardBody>
          <CardBody>回家、換一台，就打不開了。</CardBody>
        </Card>
        <Card delay={360} primary>
          <div style={{ fontSize: 30, color: 'var(--osd-accent)' }}>✓</div>
          <CardTitle>有一個網址</CardTitle>
          <CardBody>傳一條連結，誰都點得開。</CardBody>
          <CardBody>手機、學校電腦、你阿嬤的平板都行。</CardBody>
        </Card>
      </div>
      <FootNote delay={520}>沒有網址的作品，很難被別人看到，也很難被記得。</FootNote>
    </div>
    <Footer />
  </div>
);

const WhatIsVercel: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="25%" y="72%" size={1200} opacity={0.22} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>工具 · Vercel</Eyebrow>
      <Heading>
        把資料夾<span style={gradText}>變成一個網址</span>
      </Heading>
      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
        <Card delay={240}>
          <CardTag>免費</CardTag>
          <CardTitle>學生做作品夠用</CardTitle>
          <CardBody>不用綁信用卡，用 GitHub 帳號登入就好。</CardBody>
        </Card>
        <Card delay={340}>
          <CardTag>很快</CardTag>
          <CardTitle>一行指令就上去</CardTitle>
          <CardBody>不用設定伺服器，也不用懂什麼是伺服器。</CardBody>
        </Card>
        <Card delay={440}>
          <CardTag>可以一直改</CardTag>
          <CardTitle>改完再上一次</CardTitle>
          <CardBody>網址不會變，內容會換成新的。</CardBody>
        </Card>
      </div>
      <div
        className="ace-fadeup"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 16,
          marginTop: 36,
          padding: '16px 28px',
          borderRadius: 999,
          background: palette.surface,
          border: `1px solid ${palette.chipBorder}`,
          boxShadow: cardShadow,
          animationDelay: '560ms',
        }}
      >
        <img src={vercelIcon} alt="" style={{ width: 30, height: 26 }} />
        <span style={{ fontFamily: fonts.mono, fontSize: 24 }}>vercel.com</span>
        <span style={{ fontSize: 22, color: palette.muted }}>先去註冊一個帳號</span>
      </div>
    </div>
    <Footer />
  </div>
);

const DeployTerminal: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="78%" y="32%" size={1100} opacity={0.2} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>上線 · Ship it</Eyebrow>
      <Heading>
        在同一個終端機，<span style={gradText}>多打一行</span>
      </Heading>
      <Terminal>
        <TermLine sign="$">npx vercel</TermLine>
        <TermLine sign="?" dim>
          Log in to Vercel — 選 GitHub，瀏覽器會自己跳出來
        </TermLine>
        <TermLine sign="?" dim>
          Set up and deploy? — 接下來一路按 Enter
        </TermLine>
        <TermLine sign="✓">Production: https://你的專案.vercel.app</TermLine>
      </Terminal>
      <FootNote delay={420}>第一次會問你幾個問題，看不懂就按 Enter，預設值都是對的。</FootNote>
    </div>
    <Footer />
  </div>
);

const DeployAfter: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="30%" y="70%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>拿到網址之後 · After</Eyebrow>
      <Heading>
        接下來<span style={gradText}>三件事</span>
      </Heading>
      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
        <Card delay={240}>
          <CardTag>傳出去</CardTag>
          <CardTitle>先找三個人試</CardTitle>
          <CardBody>貼到群組，看他們第一眼會點哪裡。</CardBody>
        </Card>
        <Card delay={340}>
          <CardTag>再上一次</CardTag>
          <CardTitle>改完重跑一次</CardTitle>
          <CardBody>
            輸入 <span style={{ fontFamily: fonts.mono }}>vercel --prod</span>，網址不變。
          </CardBody>
        </Card>
        <Card delay={440} primary>
          <CardTag>懶得記</CardTag>
          <CardTitle>叫 AI 幫你上</CardTitle>
          <CardBody>「幫我把這個專案部署到 Vercel。」</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>不用等做完才上線。每改好一版就上一次，進度才看得見。</FootNote>
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
          <CardTitle>有一個網址</CardTitle>
          <CardBody>別人用手機點你的連結，打得開。</CardBody>
        </Card>
        <Card delay={340}>
          <CardTag>Check 02</CardTag>
          <CardTitle>講得出來</CardTitle>
          <CardBody>一句話說完它是給誰、解決什麼。</CardBody>
        </Card>
        <Card delay={440}>
          <CardTag>Check 03</CardTag>
          <CardTitle>有下一步</CardTitle>
          <CardBody>寫下一件你自己用的時候覺得卡的地方。</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>
        三個都打勾，今天就算完成。做不完也沒關係，卡在哪裡要講得出來。
      </FootNote>
    </div>
    <Footer />
  </div>
);

const DividerHandsOn: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="50%" size={1500} opacity={0.32} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Eyebrow>動手 · Your turn</Eyebrow>
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
        換你們了
      </h1>
    </div>
    <Footer />
  </div>
);

const WorkSession: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="22%" y="70%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>分組實作 · Work session</Eyebrow>
      <Heading>
        接下來這段，<span style={gradText}>照這個順序走</span>
      </Heading>
      <div style={{ display: 'flex', gap: 22, alignItems: 'stretch' }}>
        <Card delay={220}>
          <BigNum>05′</BigNum>
          <CardTitle>組內對齊</CardTitle>
          <CardBody>把那三件事講給組員聽，聽不懂就再改一次。</CardBody>
        </Card>
        <Card delay={300}>
          <BigNum>20′</BigNum>
          <CardTitle>做第一版</CardTitle>
          <CardBody>照示範的流程走，做到打得開為止。</CardBody>
        </Card>
        <Card delay={380}>
          <BigNum>05′</BigNum>
          <CardTitle>丟上線</CardTitle>
          <CardBody>跑一次 npx vercel，把連結貼到群組。</CardBody>
        </Card>
        <Card delay={460}>
          <BigNum>10′</BigNum>
          <CardTitle>互相測試</CardTitle>
          <CardBody>開隔壁組的網址，看哪裡卡住。</CardBody>
        </Card>
        <Card delay={540} primary>
          <BigNum>05′</BigNum>
          <CardTitle>各組一句話</CardTitle>
          <CardBody>做了什麼、卡在哪、下一步要修什麼。</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>我會一組一組走過去。卡住就舉手，不要卡超過五分鐘。</FootNote>
    </div>
    <Footer />
  </div>
);

const ThreeReminders: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="78%" y="70%" size={1200} opacity={0.24} />
    <div style={{ padding: '130px 140px 0' }}>
      <Eyebrow>做的時候 · Keep in mind</Eyebrow>
      <Heading>
        三個<span style={gradText}>提醒</span>
      </Heading>
      <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
        <Card delay={240}>
          <CardTag>小步</CardTag>
          <CardTitle>一次改一件事</CardTitle>
          <CardBody>一次丟五個需求，壞掉的時候你找不到是哪一個。</CardBody>
        </Card>
        <Card delay={340}>
          <CardTag>看得懂</CardTag>
          <CardTitle>不懂就問它</CardTitle>
          <CardBody>「這段在做什麼，用國中生聽得懂的說法講。」</CardBody>
        </Card>
        <Card delay={440}>
          <CardTag>留紀錄</CardTag>
          <CardTitle>能跑就先存一份</CardTitle>
          <CardBody>複製一份資料夾，改壞了還有得回去。</CardBody>
        </Card>
      </div>
      <FootNote delay={560}>你不是在學指令，你是在學怎麼把想法講到對方做得出來。</FootNote>
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
        textAlign: 'center',
        padding: '0 160px',
      }}
    >
      <AceMark size={80} />
      <div style={{ height: 32 }} />
      <Eyebrow delay={80}>今天 · Today</Eyebrow>
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
        你今天做出來的
        <br />
        就是你的第一個作品
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
        它很醜，它只有一頁。
        <br />
        但它有一個網址，你可以傳給任何人。
      </p>
    </div>
    <Footer />
  </div>
);

export const meta: SlideMeta = {
  title: '2026/9/17 ACE Club Lesson 3 · 實作測試',
  theme: 'aurora',
  createdAt: '2026-09-17T05:22:11.575Z',
};

export default [
  Cover,
  Recap,
  TodayFourSteps,
  MindsetUgly,
  SayItClear,
  TwoWaysToAsk,
  PromptTemplate,
  FourActions,
  TerminalLooksLike,
  DividerDemo,
  DemoGuide,
  WhenStuck,
  TestYourself,
  DividerDeploy,
  WhyDeploy,
  WhatIsVercel,
  DeployTerminal,
  DeployAfter,
  DefinitionOfDone,
  DividerHandsOn,
  WorkSession,
  ThreeReminders,
  Closing,
] satisfies Page[];
