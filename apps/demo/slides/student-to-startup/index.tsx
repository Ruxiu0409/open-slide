import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  useIsActivePage,
} from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';
import appleParkIosClub from './assets/apple-park-ios-club.jpg';
import avatar from './assets/avatar.jpg';
import banfengLogo from './assets/banfeng-logo.png';
import bitrigHacks from './assets/bitrig-hacks.jpg';
import champion2024 from './assets/champion-2024.jpg';
import highSchool from './assets/high-school.jpg';
import startupIsland from './assets/startup-island.jpg';
import ycSign from './assets/yc-sign.jpg';

export const design: DesignSystem = {
  palette: { bg: '#FFFFFF', text: '#1D1D1F', accent: '#B6531C' },
  fonts: {
    display:
      '"SF Pro Display", "PingFang TC", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
    body: '"SF Pro Text", "PingFang TC", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
  },
  typeScale: { hero: 176, body: 40 },
  radius: 32,
};

const SECOND = '#6E6E73';
const MIST = '#F5F5F7';
const MUTED = '#A1A1A6';
const HAIR = '#D2D2D7';

const SLIDE_ID = 'student-to-startup';
const STYLE_ID = `osd-styles-${SLIDE_ID}`;
const KEYFRAMES = `
@keyframes sts-rise { from { opacity: 0; transform: translateY(28px); filter: blur(10px) } to { opacity: 1; transform: none; filter: blur(0) } }
@keyframes sts-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes sts-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
`;

if (typeof document !== 'undefined') {
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  if (style.textContent !== KEYFRAMES) style.textContent = KEYFRAMES;
}

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 260,
  exit: { duration: 260, easing: EASE_IN, keyframes: [{ opacity: 1 }, { opacity: 1 }] },
  enter: { duration: 260, easing: EASE_OUT, keyframes: [{ opacity: 0 }, { opacity: 1 }] },
};

const HEAD: CSSProperties = {
  fontFamily: 'var(--osd-font-display)',
  fontWeight: 600,
  letterSpacing: '-0.025em',
  lineHeight: 1.05,
  margin: 0,
  color: 'var(--osd-text)',
};

const EYEBROW: CSSProperties = {
  fontFamily: 'var(--osd-font-display)',
  fontSize: 32,
  fontWeight: 600,
  letterSpacing: '-0.005em',
  color: 'var(--osd-accent)',
  margin: 0,
};

const COPY: CSSProperties = {
  fontFamily: 'var(--osd-font-body)',
  fontSize: 'var(--osd-size-body)',
  fontWeight: 500,
  lineHeight: 1.42,
  letterSpacing: '-0.012em',
  color: SECOND,
  margin: 0,
};

const Stage = ({
  children,
  center = false,
  mist = false,
}: {
  children: ReactNode;
  center?: boolean;
  mist?: boolean;
}) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      background: mist ? MIST : 'var(--osd-bg)',
      color: 'var(--osd-text)',
      fontFamily: 'var(--osd-font-body)',
      WebkitFontSmoothing: 'antialiased',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: center ? 'center' : 'flex-start',
      textAlign: 'center',
    }}
  >
    {children}
  </div>
);

const HandUnderline = ({
  live,
  width,
  top = '100%',
}: {
  live: boolean;
  width: number;
  top?: string;
}) => (
  <svg
    width={width}
    height={44}
    viewBox="0 0 420 44"
    preserveAspectRatio="none"
    style={{ position: 'absolute', left: -4, top, marginTop: 4, overflow: 'visible' }}
    aria-hidden="true"
  >
    <path
      d="M6 30 C90 18 210 10 330 14 C362 15 392 18 412 22"
      pathLength={1}
      style={{
        fill: 'none',
        stroke: 'var(--osd-accent)',
        strokeWidth: 8,
        strokeLinecap: 'round',
        strokeDasharray: 1,
        strokeDashoffset: 0,
        animation: live ? `sts-draw 0.9s ${EASE_OUT} 0.9s both` : undefined,
      }}
    />
  </svg>
);

const Cover: Page = () => {
  const live = useIsActivePage();
  const rise = (delay: number): CSSProperties =>
    live ? { animation: `sts-rise 1.4s ${EASE_OUT} ${delay}s both` } : {};
  const fade = (delay: number): CSSProperties =>
    live ? { animation: `sts-fade 1.2s ${EASE_OUT} ${delay}s both` } : {};
  return (
    <Stage center>
      <p
        style={{
          ...HEAD,
          fontSize: 34,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          position: 'absolute',
          top: 96,
          left: 0,
          right: 0,
          ...fade(0),
        }}
      >
        iOS Night · Student to Startup
      </p>
      <h1
        style={{
          ...HEAD,
          letterSpacing: '-0.035em',
          fontSize: 150,
          lineHeight: 1.25,
          ...rise(0.2),
        }}
      >
        大人眼中的
        <Underlined live={live} width={600}>
          不務正業
        </Underlined>
      </h1>
      <p style={{ ...COPY, fontSize: 56, color: 'var(--osd-text)', marginTop: 72, ...fade(0.5) }}>
        創業好瘋，但樂在其中
      </p>
      <p style={{ ...COPY, marginTop: 96, ...fade(0.7) }}>瑞瑞 · 2026/11/19</p>
    </Stage>
  );
};

const Fact = ({ value, label }: { value: string; label: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 380 }}>
    <div style={{ ...HEAD, fontSize: 72, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</div>
    <div style={{ ...COPY, fontSize: 30, marginTop: 18 }}>{label}</div>
  </div>
);

const AboutMe: Page = () => {
  const live = useIsActivePage();
  const fade = (delay: number): CSSProperties =>
    live ? { animation: `sts-fade 0.8s ${EASE_OUT} ${delay}s both` } : {};
  return (
    <Stage center>
      <img
        src={avatar}
        alt="瑞瑞"
        style={{
          width: 220,
          height: 220,
          borderRadius: '50%',
          objectFit: 'cover',
          display: 'block',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 14px 36px rgba(0,0,0,0.12)',
          marginBottom: 40,
        }}
      />
      <p style={EYEBROW}>About me</p>
      <h1 style={{ ...HEAD, fontSize: 120, marginTop: 18, translate: '0px 0px' }}>瑞瑞</h1>
      <p style={{ ...COPY, fontSize: 44, color: 'var(--osd-text)', marginTop: 28 }}>
        想到就去做，先想到人。
      </p>
      <div style={{ width: 1520, height: 2, background: HAIR, marginTop: 72, ...fade(0.2) }} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 64, ...fade(0.35) }}>
        <Fact value="資工大四" label="逢甲大學" />
        <Fact value="前社長" label="逢甲 iOS Club" />
        <Fact value="Founder" label="半逢遇甲工作室" />
        <Fact value="WWDC26" label="Apple Park 實體參加" />
      </div>
    </Stage>
  );
};

const useFade = () => {
  const live = useIsActivePage();
  return {
    live,
    fade: (delay: number): CSSProperties =>
      live ? { animation: `sts-fade 0.8s ${EASE_OUT} ${delay}s both` } : {},
    rise: (delay: number): CSSProperties =>
      live ? { animation: `sts-rise 1.2s ${EASE_OUT} ${delay}s both` } : {},
  };
};

const Underlined = ({
  children,
  live,
  width,
}: {
  children: ReactNode;
  live: boolean;
  width: number;
}) => (
  <span style={{ position: 'relative', display: 'inline-block' }}>
    {children}
    <HandUnderline live={live} width={width} top="78%" />
  </span>
);

const NotStudy: Page = () => (
  <Split visual={<Photo src={highSchool} width={600} height={800} />}>
    <p style={KICKER}>高中</p>
    <h2 style={{ ...GIANT, fontSize: 128 }}>不愛讀書</h2>
    <p style={SPLIT_COPY}>
      <Em>原本想讀國立大學，</Em>
      <br />
      最後來到了逢甲。
    </p>
  </Split>
);

const FirstCode: Page = () => {
  const { live, rise, fade } = useFade();
  return (
    <Stage center mist>
      <p style={{ ...EYEBROW, ...fade(0) }}>大一</p>
      <h2 style={{ ...HEAD, fontSize: 112, lineHeight: 1.3, marginTop: 40, ...rise(0.1) }}>
        才開始學
        <Underlined live={live} width={330}>
          iOS 開發
        </Underlined>
      </h2>
      <p style={{ ...COPY, fontSize: 48, marginTop: 96, ...fade(0.8) }}>
        原來我不是不愛學，<span style={{ color: 'var(--osd-text)' }}>只是還沒找到喜歡的事。</span>
      </p>
    </Stage>
  );
};

const Champion: Page = () => (
  <Split visual={<Photo src={champion2024} width={820} height={560} />}>
    <p style={KICKER}>全國電子設計創意競賽 · 2024.03</p>
    <h2 style={{ ...GIANT, fontSize: 160 }}>冠軍</h2>
    <p style={SPLIT_COPY}>
      <Em>大一下，第一次參加比賽。</Em>
      <br />
      作品「椅上健康」，第一次被肯定。
    </p>
  </Split>
);

const WORKS: [string, string, string][] = [
  ['2024.03', '椅上健康', '全國電子設計創意競賽 冠軍'],
  ['2024', '健身管家', '兩岸青少年創客大賽 三等獎'],
  ['2024.07', 'PetScan', 'MAIC 三等獎 · 第一次當隊長'],
  ['2024.10', '旅文寫手', '南投山城黑客松 銅獎'],
  ['2024.10', '半逢遇甲', '首次下載 12,000+'],
  ['2024.12', '行動逢甲', '學校官方 App'],
  ['2025.03', 'Hand Maestro', 'IEEE Tainan Section 特別獎'],
  ['2025.07', '三診隨行', '兩岸青少年創客大賽 二等獎'],
  ['2026.03', 'Vision Pro 復健系統', '全國賽亞軍 · 國科會計畫'],
  ['2026.03', '智慧包裹系統', '全國電子設計創意競賽 佳作'],
  ['2026.07', 'LumaStage', 'MAIC 三等獎'],
  ['2026.10', '笑死', '梗圖收藏 App'],
];

const Work = ({ when, name, note }: { when: string; name: string; note: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ ...COPY, fontSize: 22, color: 'var(--osd-accent)' }}>{when}</div>
    <div style={{ ...HEAD, fontSize: 38, marginTop: 8, whiteSpace: 'nowrap' }}>{name}</div>
    <div style={{ ...COPY, fontSize: 22, marginTop: 6, whiteSpace: 'nowrap' }}>{note}</div>
  </div>
);

const Club: Page = () => {
  const { fade } = useFade();
  return (
    <Stage center>
      <p style={EYEBROW}>2024 – 2026</p>
      <h2 style={{ ...HEAD, fontSize: 88, marginTop: 18 }}>做了很多作品</h2>
      <p style={{ ...COPY, fontSize: 32, marginTop: 24 }}>
        想做一個作品，或解決一個問題。<span style={{ color: 'var(--osd-text)' }}>沒想過賺錢。</span>
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 380px)',
          rowGap: 48,
          marginTop: 72,
          ...fade(0.2),
        }}
      >
        {WORKS.map(([when, name, note]) => (
          <Work key={name} when={when} name={name} note={note} />
        ))}
      </div>
    </Stage>
  );
};

const KICKER: CSSProperties = {
  ...HEAD,
  fontSize: 40,
  letterSpacing: '-0.015em',
};

const GIANT: CSSProperties = {
  ...HEAD,
  fontSize: 140,
  letterSpacing: '-0.035em',
  marginTop: 18,
};

const SPLIT_COPY: CSSProperties = { ...COPY, fontSize: 36, marginTop: 30 };

const Em = ({ children }: { children: ReactNode }) => (
  <span style={{ color: 'var(--osd-text)' }}>{children}</span>
);

const Split = ({
  visual,
  children,
  footnote,
}: {
  visual: ReactNode;
  children: ReactNode;
  footnote?: string;
}) => {
  const { fade, rise } = useFade();
  return (
    <Stage>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 160,
        }}
      >
        <div style={{ flexShrink: 0, ...fade(0) }}>{visual}</div>
        <div
          style={{
            position: 'relative',
            alignSelf: 'stretch',
            maxWidth: 760,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'left',
            ...rise(0.15),
          }}
        >
          {children}
          {footnote && (
            <p
              style={{
                ...COPY,
                position: 'absolute',
                left: 0,
                bottom: 80,
                width: 'max-content',
                fontSize: 20,
                color: '#86868B',
                textAlign: 'left',
              }}
            >
              {footnote}
            </p>
          )}
        </div>
      </div>
    </Stage>
  );
};

const MiniStat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <div style={{ ...HEAD, fontSize: 64, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</div>
    <div style={{ ...COPY, fontSize: 24, marginTop: 12, whiteSpace: 'nowrap' }}>{label}</div>
  </div>
);

const AppIcon = ({ size }: { size: number }) => (
  <img
    src={banfengLogo}
    alt="半逢遇甲"
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.2237,
      display: 'block',
      boxShadow:
        '0 0 0 1px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.06), 0 14px 36px rgba(0,0,0,0.12)',
    }}
  />
);

const BanFeng: Page = () => (
  <Split visual={<AppIcon size={420} />}>
    <p style={KICKER}>半逢遇甲</p>
    <h2 style={GIANT}>12,000+</h2>
    <p style={SPLIT_COPY}>
      <Em>首次下載。</Em>同學想一眼看到整週的課表，
      <br />
      學校 App 卻要上下左右滑才找得到課。
    </p>
    <div style={{ display: 'flex', gap: 64, marginTop: 56 }}>
      <MiniStat value="No.2" label="上架首日 工具程式免費榜" />
      <MiniStat value="4.9" label="App Store 評分" />
    </div>
  </Split>
);

const Photo = ({ src, width, height }: { src: string; width: number; height: number }) => (
  <img
    src={src}
    alt=""
    style={{
      width,
      height,
      objectFit: 'cover',
      borderRadius: 24,
      display: 'block',
      boxShadow: '0 2px 6px rgba(0,0,0,0.06), 0 18px 48px rgba(0,0,0,0.12)',
    }}
  />
);

const Wwdc: Page = () => (
  <Split visual={<Photo src={appleParkIosClub} width={820} height={560} />}>
    <p style={KICKER}>WWDC26 · 2026.06</p>
    <h2 style={{ ...GIANT, fontSize: 128 }}>Apple Park</h2>
    <p style={SPLIT_COPY}>
      <Em>把 iOS Club 的貼紙，</Em>
      <br />
      帶到 Apple Park。
    </p>
  </Split>
);

const StartupIsland: Page = () => (
  <Split visual={<Photo src={startupIsland} width={820} height={560} />}>
    <p style={KICKER}>Startup Island TAIWAN</p>
    <h2 style={GIANT}>灣區現況</h2>
    <p style={SPLIT_COPY}>
      <Em>在 Silicon Valley Hub，</Em>
      <br />
      跟他們聊灣區現在的產業狀態。
    </p>
  </Split>
);

const Hackathon: Page = () => (
  <Split visual={<Photo src={ycSign} width={820} height={560} />}>
    <p style={KICKER}>Bitrig Hackathon</p>
    <h2 style={{ ...GIANT, fontSize: 96 }}>@ Y Combinator</h2>
    <p style={SPLIT_COPY}>
      <Em>在 Y Combinator 的辦公室，</Em>
      <br />
      參加 Bitrig 的黑客松。
    </p>
    <div style={{ marginTop: 56 }}>
      <Photo src={bitrigHacks} width={360} height={203} />
    </div>
  </Split>
);

const Talk = ({
  who,
  title,
  copy,
  mist,
}: {
  who: string;
  title: ReactNode;
  copy: ReactNode;
  mist?: boolean;
}) => {
  const { rise, fade } = useFade();
  return (
    <Stage center mist={mist}>
      <p style={{ ...EYEBROW, ...fade(0) }}>{who}</p>
      <h2 style={{ ...HEAD, fontSize: 104, lineHeight: 1.3, marginTop: 40, ...rise(0.1) }}>
        {title}
      </h2>
      <p style={{ ...COPY, fontSize: 40, marginTop: 80, ...fade(0.7) }}>{copy}</p>
    </Stage>
  );
};

const Ink = ({ children }: { children: ReactNode }) => (
  <span style={{ color: 'var(--osd-text)' }}>{children}</span>
);

const StartupSchool: Page = () => {
  const { live, rise, fade } = useFade();
  return (
    <Stage center mist>
      <p style={{ ...EYEBROW, ...fade(0) }}>2026.11.12 · 台北信義</p>
      <h2 style={{ ...HEAD, fontSize: 132, lineHeight: 1.3, marginTop: 40, ...rise(0.1) }}>
        YC{' '}
        <Underlined live={live} width={760}>
          Startup School
        </Underlined>
      </h2>
      <p style={{ ...COPY, fontSize: 44, marginTop: 96, ...fade(0.8) }}>
        上週，<Ink>Y Combinator 來到台北。</Ink>
      </p>
    </Stage>
  );
};

const TalkOllama: Page = () => (
  <Talk
    who="Michael Chiang · Ollama"
    title="成功不是一夕之間"
    copy={
      <>
        超過 1,000 萬開發者在用，團隊大約 16 人。<Ink>先做你自己想要的東西。</Ink>
      </>
    }
  />
);

const TalkMedumo: Page = () => (
  <Talk
    who="Adeel Yang · Medumo"
    title="十件事砍掉九件"
    copy={
      <>
        離開醫學院去創業，後來又回去把書讀完。<Ink>專心做最重要的那一件。</Ink>
      </>
    }
  />
);

const TalkSafeBase: Page = () => (
  <Talk
    who="Al Yang · SafeBase"
    title="你現在遇到什麼問題"
    copy={
      <>
        不是問你有什麼點子，<Ink>而是問你看見了什麼問題。</Ink>
      </>
    }
  />
);

const TalkVest: Page = () => (
  <Talk
    who="Jeff Chang · Vest"
    title="拒絕輸掉"
    copy={
      <>
        韌性、影響力、創造力，<Ink>聰明排在最後。</Ink>
      </>
    }
  />
);

const TalkXendit: Page = () => (
  <Talk
    who="Moses Lo · Xendit"
    title={
      <>
        難的不是知識
        <br />
        是願不願意執行
      </>
    }
    copy={
      <>
        6 週 1.6 萬個用戶。<Ink>用樂高、網路攝影機和膠帶，做出自動按按鈕的機器。</Ink>
      </>
    }
  />
);

const TalkDoorDash: Page = () => (
  <Talk
    who="Andy Fang · DoorDash"
    title="45 分鐘做出來的網站"
    copy={
      <>
        一開始，創辦人自己去送餐。<Ink>他 20 歲就開始了。</Ink>
      </>
    }
  />
);

const TalkDiana: Page = () => (
  <Talk
    who="Diana Hu · YC 合夥人"
    title={
      <>
        台積電、聯發科的創辦人
        <br />
        跟你沒有不同
      </>
    }
    copy={
      <>
        Intel 也一樣。<Ink>他們一開始，也只是一個想做事的人。</Ink>
      </>
    }
    mist
  />
);

const TalkGarry: Page = () => (
  <Talk
    who="Garry Tan · YC 執行長"
    title="只有 1% 的新創真正用好 AI"
    copy={
      <>
        讓 agent 去檢查 agent。<Ink>你們每天在 vibe coding，已經站在起跑線上。</Ink>
      </>
    }
    mist
  />
);

const TalkJon: Page = () => (
  <Talk
    who="Jon Xu · YC 合夥人"
    title="從好奇心開始"
    copy={
      <>
        不用先想好要不要創業，<Ink>先對一件事好奇。</Ink>
      </>
    }
    mist
  />
);

const TalkAnkit: Page = () => (
  <Talk
    who="Ankit Gupta · YC 合夥人"
    title="最壞會發生什麼"
    copy={
      <>
        想做一件事之前，<Ink>先問自己這一句。</Ink>
      </>
    }
    mist
  />
);

const Question = ({ lead, ask, strong }: { lead: string; ask: string; strong?: boolean }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 760 }}>
    <p style={{ ...COPY, fontSize: 36 }}>{lead}</p>
    <p
      style={{
        ...HEAD,
        fontSize: 76,
        lineHeight: 1.3,
        marginTop: 36,
        color: strong ? 'var(--osd-text)' : MUTED,
        whiteSpace: 'pre-line',
      }}
    >
      {ask}
    </p>
  </div>
);

const Contrast: Page = () => {
  const { fade } = useFade();
  return (
    <Stage center>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Question lead="在台灣，我最常被問" ask="你哪間學校" />
        <div style={{ width: 2, height: 360, background: HAIR, margin: '0 60px' }} />
        <div style={fade(0.3)}>
          <Question lead="在那裡，大家只問" ask={'你解決什麼問題\n第一筆生意在哪'} strong />
        </div>
      </div>
    </Stage>
  );
};

const Sponsor: Page = () => (
  <Split visual={<AppIcon size={420} />}>
    <p style={KICKER}>半逢遇甲 · 第三年</p>
    <h2 style={{ ...GIANT, fontSize: 112 }}>開始收贊助</h2>
    <p style={SPLIT_COPY}>
      <Em>作品 → 有人用 → 生意。</Em>
      <br />
      這條路，自己走過一遍了。
    </p>
  </Split>
);

const Milestone = ({ when, what }: { when: string; what: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 300 }}>
    <div style={{ width: 20, height: 20, borderRadius: 10, background: 'var(--osd-accent)' }} />
    <div style={{ ...COPY, fontSize: 28, marginTop: 36, whiteSpace: 'nowrap' }}>{when}</div>
    <div style={{ ...HEAD, fontSize: 44, marginTop: 14, whiteSpace: 'nowrap' }}>{what}</div>
  </div>
);

const Journey: Page = () => {
  const { fade } = useFade();
  return (
    <Stage center>
      <p style={EYEBROW}>一路做到現在</p>
      <h2 style={{ ...HEAD, fontSize: 96, marginTop: 18 }}>喜歡的事，就一直做下去</h2>
      <div style={{ position: 'relative', marginTop: 120, ...fade(0.2) }}>
        <div
          style={{
            position: 'absolute',
            left: 150,
            right: 150,
            top: 9,
            height: 2,
            background: HAIR,
          }}
        />
        <div style={{ display: 'flex', position: 'relative' }}>
          <Milestone when="2023 · 大一" what="開始學 iOS" />
          <Milestone when="2024.03" what="全國冠軍" />
          <Milestone when="2024.10" what="半逢遇甲" />
          <Milestone when="大三" what="iOS Club 社長" />
          <Milestone when="2026.06" what="WWDC26" />
        </div>
      </div>
    </Stage>
  );
};

const NotStartup: Page = () => {
  const { rise, fade } = useFade();
  return (
    <Stage center mist>
      <p style={{ ...COPY, fontSize: 56 }}>找到喜歡的事，</p>
      <h2 style={{ ...HEAD, fontSize: 132, marginTop: 56, ...rise(0.3) }}>不一定要創業</h2>
      <p style={{ ...COPY, fontSize: 44, marginTop: 80, ...fade(0.8) }}>
        可以是比賽、社團、工作，
        <span style={{ color: 'var(--osd-text)' }}>或是做給自己用的小東西。</span>
      </p>
    </Stage>
  );
};

const ThisEra: Page = () => {
  const { live, rise, fade } = useFade();
  return (
    <Stage center>
      <p style={EYEBROW}>現在這個時代</p>
      <h2 style={{ ...HEAD, fontSize: 112, lineHeight: 1.3, marginTop: 40, ...rise(0.1) }}>
        一個人就能做到
        <br />
        以前
        <Underlined live={live} width={570}>
          想不到的事
        </Underlined>
      </h2>
      <p style={{ ...COPY, fontSize: 44, marginTop: 96, ...fade(0.8) }}>
        AI 和 vibe coding，
        <span style={{ color: 'var(--osd-text)' }}>讓想法離做出來只差一步。</span>
      </p>
    </Stage>
  );
};

const Closing: Page = () => {
  const { live, rise, fade } = useFade();
  return (
    <Stage center mist>
      <h2 style={{ ...HEAD, fontSize: 132, lineHeight: 1.3, ...rise(0) }}>
        有想做的事
        <br />就
        <Underlined live={live} width={670}>
          大膽去做吧
        </Underlined>
      </h2>
      <p style={{ ...COPY, fontSize: 48, marginTop: 110, ...fade(0.8) }}>
        不愛讀書的小孩，<span style={{ color: 'var(--osd-text)' }}>也有未來。</span>
      </p>
    </Stage>
  );
};

const Slogan: Page = () => {
  const { live, rise, fade } = useFade();
  return (
    <Stage center>
      <p style={{ ...COPY, fontSize: 56, ...fade(0) }}>如果有一天</p>
      <h2 style={{ ...HEAD, fontSize: 132, lineHeight: 1.3, marginTop: 56, ...rise(0.2) }}>
        可以做喜歡的事情賺錢
        <br />
        聽起來不
        <Underlined live={live} width={280}>
          好玩
        </Underlined>
        嗎
      </h2>
    </Stage>
  );
};

const Thanks: Page = () => (
  <Stage center>
    <p style={EYEBROW}>Q&amp;A</p>
    <h1
      style={{
        ...HEAD,
        fontSize: 'var(--osd-size-hero)',
        letterSpacing: '-0.035em',
        marginTop: 24,
      }}
    >
      謝謝大家
    </h1>
    <p style={{ ...COPY, fontSize: 48, color: 'var(--osd-text)', marginTop: 80 }}>tsaicy.dev</p>
  </Stage>
);

export const meta: SlideMeta = {
  title: '大人眼中的不務正業',
  createdAt: '2026-11-18T12:12:56.385Z',
};

export default [
  Cover,
  AboutMe,
  NotStudy,
  FirstCode,
  Champion,
  Club,
  BanFeng,
  Journey,
  Wwdc,
  StartupIsland,
  Hackathon,
  StartupSchool,
  TalkOllama,
  TalkMedumo,
  TalkSafeBase,
  TalkVest,
  TalkXendit,
  TalkDoorDash,
  TalkDiana,
  TalkGarry,
  TalkJon,
  TalkAnkit,
  Contrast,
  Sponsor,
  NotStartup,
  ThisEra,
  Closing,
  Slogan,
  Thanks,
] satisfies Page[];

export const notes: (string | undefined)[] = [
  '開場：今天不講技術，想跟大家聊聊一個不愛讀書的小孩，是怎麼一路走到現在的。',
  '自我介紹：簡單帶過四個身份，最後停在「其實我以前很不愛讀書」，接到下一段。',
  `先講真話：我是一個很不喜歡讀書的人。
原本想讀國立大學，最後來到了逢甲。`,
  `大一進來，才開始學 iOS 開發。
那時候才發現：原來我不是不愛學，只是還沒找到喜歡的事。`,
  `大一下第一次參加全國電子設計創意競賽，作品是「椅上健康」，拿到冠軍。
這是我第一次被肯定，也是我決定繼續做下去的原因。`,
  '後來在社團做了很多作品，每一個都是因為「想做」或「想解決一個問題」。',
  `半逢遇甲的起點很簡單：同學想一眼看到整週的課表。
上架第一天衝到工具程式免費榜第 2 名，首次下載超過一萬兩千次。`,
  '把時間軸拉開來看：從大一開始學 iOS，到全國冠軍、半逢遇甲、社長，最後走到 WWDC26。喜歡的事，就一直做下去。',
  'WWDC26，第一次到 Apple Park。我把 iOS Club 的貼紙一起帶過去。',
  'Startup Island TAIWAN：跟他們聊灣區現在的產業狀態。（待補：印象最深的一兩個重點）',
  `我是參加 Bitrig 的黑客松去的，地點在 Y Combinator 的辦公室。
Bitrig 在做的事，跟你們每天在做的 vibe coding 很像。`,
  `回台灣之後，上週 YC 也來到台北，辦了 Startup School。
我也去了。接下來幾頁，是那天講者說的話裡，我覺得最想帶給你們的。`,
  'Ollama 的 Michael Chiang：很容易把成功看成一夕之間發生。Ollama 現在超過一千萬開發者在用，團隊只有大約 16 個人。他說，先做你自己想要的東西。',
  'Medumo 的 Adeel Yang：他離開醫學院去創業，後來又回去把書讀完。他說，十件事裡要砍掉九件，專心做最重要的。',
  'SafeBase 的 Al Yang 最常問的一句話：你現在遇到什麼問題？好的產品是從一個真實的問題開始的。',
  'Vest 的 Jeff Chang 排了創辦人最重要的特質：韌性第一，影響力第二，創造力第三，聰明排最後。他說的是「拒絕輸掉」。',
  'Xendit 的 Moses Lo：六週就有一萬六千個用戶。他們用樂高、網路攝影機和膠帶做了一台自動按按鈕的機器。他說，困難的往往不是取得知識，而是願不願意執行。',
  'DoorDash 的 Andy Fang：第一個網站只花 45 分鐘做出來，一開始創辦人自己去送餐。他 20 歲就開始了。',
  'YC 合夥人 Diana Hu：Intel、台積電、聯發科的創辦人，跟你沒有不同。',
  'YC 執行長 Garry Tan：大概只有 1% 的新創真正用好 AI，他們會讓 agent 去檢查 agent。你們每天在 vibe coding，其實已經站在起跑線上。',
  'YC 合夥人 Jon Xu：從好奇心開始。',
  `YC 合夥人 Ankit Gupta：最壞會發生什麼？
想清楚最壞的情況，通常就敢做了。這也是我今天最想說的。`,
  `在台灣，我最常被問的是：你哪間學校？
在那裡，從來沒有人問我這個。大家只談怎麼解決問題、怎麼拿到第一筆生意。
對一個不愛讀書的人來說，這件事很重要。`,
  `後來，半逢遇甲做到第三年，開始收贊助。
喜歡的事，也可以慢慢變成收入。`,
  `但我想說的是：找到喜歡的事，不一定要創業。
可以是比賽、社團、工作，或是做給自己用的小東西。`,
  `現在這個時代很不一樣。
AI 和 vibe coding，讓一個人就能做到以前想不到的事。你們現在就在用。`,
  `所以，有想做的事，就大膽去做吧。
不愛讀書的小孩，也有未來。`,
  `最後想留一句話給大家：
如果有一天，可以做喜歡的事情賺錢，聽起來不好玩嗎？`,
  '謝謝大家，開放提問。',
];
