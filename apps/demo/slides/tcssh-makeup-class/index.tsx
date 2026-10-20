import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { Step, Steps } from '@open-slide/core';
import type { ReactNode } from 'react';
import closing from './assets/closing.jpg';
import colorWheel from './assets/color-wheel.png';
import concealer from './assets/concealer.png';
import concealerLiquid from './assets/concealer-liquid.png';
import concealerPalette from './assets/concealer-palette.png';
import concealerStick from './assets/concealer-stick.png';
import cosmeticsAct from './assets/cosmetics-act.jpg';
import coverIllustration from './assets/cover-illustration.png';
import foundation from './assets/foundation.png';
import foundationCompact from './assets/foundation-compact.png';
import foundationCushion from './assets/foundation-cushion.png';
import foundationLiquid from './assets/foundation-liquid.png';
import foundationStick from './assets/foundation-stick.png';
import linerGel from './assets/liner-gel.png';
import linerLiquid from './assets/liner-liquid.png';
import linerPencil from './assets/liner-pencil.png';
import loosePowder from './assets/loose-powder.jpg';
import pressedPowder from './assets/pressed-powder.png';
import primer from './assets/primer.png';
import primerSamples from './assets/primer-samples.png';
import qrInstagram from './assets/qr-instagram.png';
import qrSurvey from './assets/qr-survey.png';
import skincare from './assets/skincare.jpg';
import speaker from './assets/speaker.jpg';
import toolBrush from './assets/tool-brush.png';
import toolCushionPuff from './assets/tool-cushion-puff.png';
import toolPuff from './assets/tool-puff.png';
import toolSponge from './assets/tool-sponge.png';
import tools from './assets/tools.png';

export const design: DesignSystem = {
  palette: { bg: '#ffffff', text: '#1f1f1f', accent: '#486aa2' },
  fonts: {
    display: '"Noto Serif TC", "Songti TC", "PMingLiU", serif',
    body: '"PingFang TC", "Noto Sans TC", "Microsoft JhengHei", sans-serif',
  },
  typeScale: { hero: 128, body: 36 },
  radius: 999,
};

const pill = '#a4c2e6';
const pillFaded = '#e3ebf6';
const muted = '#5b5b5b';
const paperGray = '#e9e9e9';
const sand = '#d2cdb4';
const cream = '#f1efc3';
const TERM = '113學年度 第二學期';
const CLUB = '現代視覺文化同人社';

const fill = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
} as const;

const serif = { fontFamily: 'var(--osd-font-display)', fontWeight: 700 } as const;

const bulletList = {
  margin: 0,
  paddingLeft: 36,
  listStyle: 'disc',
  fontSize: 30,
  lineHeight: 1.5,
} as const;

const Highlight = ({
  children,
  color = pill,
  size,
}: {
  children: ReactNode;
  color?: string;
  size: number;
}) => (
  <span style={{ position: 'relative', display: 'inline-block', zIndex: 0 }}>
    <span
      style={{
        position: 'absolute',
        left: -size * 0.2,
        right: -size * 0.2,
        bottom: size * 0.02,
        height: size * 0.42,
        background: color,
        borderRadius: 'var(--osd-radius)',
        zIndex: -1,
      }}
    />
    {children}
  </span>
);

const Tab = ({ label, active }: { label: string; active: boolean }) => (
  <div
    style={{
      width: 260,
      height: 74,
      borderRadius: 'var(--osd-radius)',
      background: active ? pill : pillFaded,
      color: active ? 'var(--osd-text)' : '#a3acb9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 36,
      ...serif,
      fontWeight: 500,
    }}
  >
    {label}
  </div>
);

const Header = ({ tab }: { tab?: 'base' | 'color' }) => (
  <div
    style={{
      position: 'absolute',
      inset: '0 0 auto 0',
      height: 216,
      background: 'var(--osd-accent)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 80px 0 120px',
    }}
  >
    <div style={{ ...serif, fontSize: 104, color: '#fff', lineHeight: 1.1 }}>
      <Highlight size={104} color="rgba(255,255,255,0.55)">
        基礎化妝課程
      </Highlight>
    </div>
    {tab && (
      <div style={{ display: 'flex', gap: 80, alignSelf: 'flex-end', marginBottom: 26 }}>
        <Tab label="底妝" active={tab === 'base'} />
        <Tab label="彩妝" active={tab === 'color'} />
      </div>
    )}
  </div>
);

const Body = ({ children }: { children: ReactNode }) => (
  <div style={{ position: 'absolute', top: 216, left: 0, right: 0, bottom: 0 }}>{children}</div>
);

const TermCover: Page = () => (
  <div
    style={{
      ...fill,
      background: paperGray,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingLeft: 430,
    }}
  >
    <div style={{ ...serif, fontWeight: 500, fontSize: 44, marginLeft: 260 }}>{TERM}</div>
    <div style={{ ...serif, fontSize: 112, marginTop: 72 }}>{CLUB}</div>
  </div>
);

const Speaker: Page = () => (
  <div style={fill}>
    <img
      src={speaker}
      alt=""
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 1480,
        height: 1080,
        objectFit: 'cover',
        objectPosition: 'center 30%',
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: -200,
        left: -400,
        width: 1240,
        height: 1480,
        borderRadius: '50%',
        background: 'var(--osd-bg)',
        boxShadow: '18px 0 0 -6px #d5dbe5',
      }}
    />
    <div style={{ position: 'absolute', top: 150, left: 90, ...serif, fontSize: 96 }}>
      瑞瑞<span style={{ color: 'var(--osd-accent)' }}>.</span>
    </div>
    <div
      style={{
        position: 'absolute',
        top: 300,
        left: 120,
        writingMode: 'vertical-rl',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        ...serif,
        fontWeight: 500,
        fontSize: 36,
        lineHeight: 1.4,
        color: muted,
      }}
    >
      <div>2020 逢甲百鬼夜行特聘化妝師</div>
      <div>現代視覺文化同人社 16 屆公關</div>
      <div>TCS 中部動漫文化祭 12 屆副召集人</div>
    </div>
  </div>
);

const QandA: Page = () => (
  <div
    style={{
      ...fill,
      display: 'flex',
      alignItems: 'center',
      gap: 80,
      padding: '0 160px',
    }}
  >
    <svg width="300" height="300" viewBox="0 0 100 100" aria-hidden>
      <path
        d="M14 58V22a8 8 0 0 1 8-8h40"
        fill="none"
        stroke="var(--osd-accent)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M30 24h52a8 8 0 0 1 8 8v34a8 8 0 0 1-8 8H50L36 88V74h-6a8 8 0 0 1-8-8V32a8 8 0 0 1 8-8z"
        fill={pillFaded}
        stroke="var(--osd-accent)"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <circle cx="42" cy="49" r="5" fill="var(--osd-accent)" />
      <circle cx="56" cy="49" r="5" fill="var(--osd-accent)" />
      <circle cx="70" cy="49" r="5" fill="var(--osd-accent)" />
    </svg>
    <div>
      <div style={{ ...serif, fontSize: 112, lineHeight: 1.2 }}>
        <Highlight size={112}>有問題嗎？</Highlight>
      </div>
      <div style={{ fontSize: 40, color: muted, marginTop: 40 }}>
        Audience Q&amp;A · 歡迎用 Slido 匿名發問
      </div>
    </div>
  </div>
);

const Topics: Page = () => (
  <div
    style={{
      ...fill,
      background: paperGray,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingLeft: 430,
    }}
  >
    <div style={{ ...serif, fontWeight: 500, fontSize: 44, marginLeft: 260 }}>{TERM}</div>
    <div style={{ ...serif, fontSize: 112, marginTop: 20 }}>{CLUB}</div>
    <div style={{ display: 'flex', gap: 420, marginTop: 150, ...serif, fontSize: 104 }}>
      <div>假髮</div>
      <div>化妝</div>
    </div>
  </div>
);

const CourseCover = ({ title }: { title: string }) => (
  <div style={{ ...fill, background: 'var(--osd-accent)', color: '#fff' }}>
    <div
      style={{
        position: 'absolute',
        left: 1010,
        top: 380,
        width: 1300,
        height: 1300,
        borderRadius: '50%',
        background: '#fff',
      }}
    />
    <img
      src={coverIllustration}
      alt=""
      style={{ position: 'absolute', left: 1080, top: 380, width: 760 }}
    />
    <div style={{ position: 'absolute', left: 150, top: 150 }}>
      <div style={{ fontSize: 40, fontWeight: 700 }}>{TERM}</div>
      <div style={{ ...serif, fontWeight: 500, fontSize: 64, marginTop: 20 }}>{CLUB}</div>
      <div style={{ ...serif, fontSize: 'var(--osd-size-hero)', marginTop: 150, lineHeight: 1.2 }}>
        <Highlight size={128} color="rgba(255,255,255,0.55)">
          {title}
        </Highlight>
      </div>
    </div>
  </div>
);

const BasicCover: Page = () => <CourseCover title="基礎化妝課程" />;
const DemoCover: Page = () => <CourseCover title="實作示範課程" />;

const SideBand = () => (
  <div
    style={{
      position: 'absolute',
      inset: '0 auto 0 0',
      width: 360,
      background: 'var(--osd-accent)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        writingMode: 'vertical-rl',
        ...serif,
        fontSize: 130,
        color: '#fff',
        lineHeight: 1,
        letterSpacing: '0.12em',
        position: 'relative',
        zIndex: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 20,
          bottom: -10,
          left: -8,
          width: 50,
          borderRadius: 'var(--osd-radius)',
          background: 'rgba(255,255,255,0.45)',
          zIndex: -1,
        }}
      />
      基礎化妝課程
    </div>
  </div>
);

const CanYouMakeup: Page = () => (
  <div style={fill}>
    <SideBand />
    <div
      style={{
        position: 'absolute',
        inset: '0 0 0 360px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...serif,
        fontSize: 120,
      }}
    >
      你會化妝嗎？
    </div>
  </div>
);

const CosmeticsLaw: Page = () => (
  <div style={fill}>
    <SideBand />
    <img
      src={cosmeticsAct}
      alt="化粧品衛生安全管理法 第三條條文截圖"
      style={{
        position: 'absolute',
        left: 470,
        top: 30,
        width: 1400,
        height: 1050,
        objectFit: 'cover',
        objectPosition: 'top',
      }}
    />
    <Steps>
      <Step>
        <div
          style={{
            position: 'absolute',
            left: 800,
            bottom: 50,
            width: 1000,
            padding: '36px 48px',
            borderRadius: 32,
            background: '#c9d8ee',
            ...serif,
            fontWeight: 500,
            fontSize: 46,
            lineHeight: 1.5,
            boxShadow: '0 12px 40px rgba(30,50,90,0.18)',
          }}
        >
          化粧品：指施於人體外部、牙齒或口腔黏膜，用以潤澤髮膚、刺激嗅覺、改善體味、修飾容貌或清潔身體之製劑。
        </div>
      </Step>
    </Steps>
  </div>
);

const BigPill = ({ label }: { label: string }) => (
  <div style={{ ...serif, fontWeight: 500, fontSize: 140 }}>
    <Highlight size={140}>
      <span style={{ padding: '0 60px' }}>{label}</span>
    </Highlight>
  </div>
);

const BaseVsColor: Page = () => (
  <div style={fill}>
    <Header />
    <Body>
      <div
        style={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 120px 80px',
        }}
      >
        <BigPill label="底妝" />
        <BigPill label="彩妝" />
      </div>
    </Body>
  </div>
);

const Product = ({ src, label, dim = false }: { src: string; label: string; dim?: boolean }) => (
  <div
    style={{
      width: 290,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20,
      opacity: dim ? 0.22 : 1,
    }}
  >
    <img src={src} alt={label} style={{ width: 290, height: 440, objectFit: 'contain' }} />
    <div style={{ ...serif, fontWeight: 500, fontSize: 42 }}>{label}</div>
  </div>
);

type BaseItem = 'primer' | 'tools' | 'foundation' | 'concealer' | 'powder';

const BaseOverview = ({ focus }: { focus?: BaseItem }) => {
  const dim = (item: BaseItem | 'skincare') => focus !== undefined && focus !== item;
  return (
    <div style={fill}>
      <Header tab="base" />
      <Body>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            height: '100%',
            padding: '0 90px 110px',
          }}
        >
          <Product src={skincare} label="保養品" dim={dim('skincare')} />
          <Product src={foundation} label="粉底" dim={dim('foundation')} />
          <Product src={tools} label="上妝工具" dim={dim('tools')} />
          <Product src={concealer} label="遮瑕" dim={dim('concealer')} />
          <Product src={loosePowder} label="蜜粉" dim={dim('powder')} />
          <Product src={primer} label="妝前乳" dim={dim('primer')} />
        </div>
      </Body>
    </div>
  );
};

const BaseIntro: Page = () => <BaseOverview />;
const NextPrimer: Page = () => <BaseOverview focus="primer" />;
const NextTools: Page = () => <BaseOverview focus="tools" />;
const NextFoundation: Page = () => <BaseOverview focus="foundation" />;
const NextConcealer: Page = () => <BaseOverview focus="concealer" />;
const NextPowder: Page = () => <BaseOverview focus="powder" />;

const DetailLayout = ({
  src,
  label,
  children,
}: {
  src: string;
  label: string;
  children: ReactNode;
}) => (
  <div style={fill}>
    <Header tab="base" />
    <Body>
      <div
        style={{
          position: 'absolute',
          left: 50,
          top: 90,
          width: 340,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
        }}
      >
        <img src={src} alt={label} style={{ width: 340, height: 540, objectFit: 'contain' }} />
        <div style={{ ...serif, fontSize: 56 }}>{label}</div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 440,
          top: 130,
          height: 620,
          borderLeft: '8px dashed var(--osd-accent)',
        }}
      />
      <div style={{ position: 'absolute', left: 520, top: 110, right: 100, bottom: 60 }}>
        {children}
      </div>
    </Body>
  </div>
);

const Question = ({ children }: { children: ReactNode }) => (
  <div style={{ ...serif, fontWeight: 500, fontSize: 60, lineHeight: 1.3 }}>
    <Highlight size={60}>{children}</Highlight>
  </div>
);

const reasonList = {
  margin: '40px 0 0',
  paddingLeft: 48,
  listStyle: 'disc',
  fontSize: 44,
  lineHeight: 1.7,
} as const;

const Skincare: Page = () => (
  <DetailLayout src={skincare} label="保養品">
    <Steps>
      <Question>為什麼要保養？</Question>
      <Step>
        <ul style={reasonList}>
          <li>基底好，化完妝更好看</li>
          <li>避免乾燥起皮，讓妝不服貼</li>
        </ul>
      </Step>
      <Step>
        <div style={{ ...serif, fontSize: 64, lineHeight: 1.4, marginTop: 120 }}>
          沒保養，1–2 小時脫妝；
          <br />
          有保養，撐 <span style={{ color: 'var(--osd-accent)' }}>8 小時</span>沒問題
        </div>
      </Step>
    </Steps>
  </DetailLayout>
);

const Primer: Page = () => (
  <DetailLayout src={primer} label="妝前乳">
    <div style={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
      <div>
        <Steps>
          <Question>為什麼要妝前？</Question>
          <Step>
            <ul style={reasonList}>
              <li>修飾表面，讓膚色更均勻</li>
              <li>填滿缺陷，讓妝容更服貼</li>
            </ul>
          </Step>
          <Step>
            <div style={{ ...serif, fontWeight: 500, fontSize: 52, marginTop: 80 }}>舉例：</div>
            <ul style={reasonList}>
              <li>妝前乳、BB 霜、CC 霜</li>
            </ul>
          </Step>
        </Steps>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
          width: 520,
          marginTop: -60,
        }}
      >
        <Steps>
          <Step>
            <img
              src={primerSamples}
              alt="各色妝前乳"
              style={{ width: 500, height: 300, objectFit: 'contain' }}
            />
          </Step>
          <Step>
            <img
              src={colorWheel}
              alt="色相環與互補色"
              style={{ width: 320, height: 380, objectFit: 'contain' }}
            />
          </Step>
        </Steps>
      </div>
    </div>
  </DetailLayout>
);

const Variant = ({
  src,
  name,
  children,
  imgSize = 230,
}: {
  src: string;
  name: string;
  children: ReactNode;
  imgSize?: number;
}) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
    <img
      src={src}
      alt={name}
      style={{ width: imgSize, height: imgSize, objectFit: 'contain', flexShrink: 0 }}
    />
    <div>
      <div
        style={{ ...serif, fontWeight: 500, fontSize: 42, marginBottom: 12, whiteSpace: 'nowrap' }}
      >
        {name}
      </div>
      <ul style={bulletList}>{children}</ul>
    </div>
  </div>
);

const variantGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridAutoRows: 300,
  columnGap: 60,
  rowGap: 40,
  marginTop: -30,
} as const;

const Tools: Page = () => (
  <DetailLayout src={tools} label="上妝工具">
    <div style={variantGrid}>
      <Steps>
        <Step>
          <Variant src={toolPuff} name="粉撲">
            <li>傳統用具</li>
            <li>易消耗化妝品</li>
          </Variant>
        </Step>
        <Step>
          <Variant src={toolCushionPuff} name="氣墊粉撲">
            <li>較不易消耗</li>
            <li>無須用水</li>
            <li>無法搭配粉餅使用</li>
          </Variant>
        </Step>
        <Step>
          <Variant src={toolBrush} name="刷具">
            <li>須一定技法</li>
            <li>易有刷痕（不推）</li>
          </Variant>
        </Step>
        <Step>
          <Variant src={toolSponge} name="美妝蛋">
            <li>需用水（不方便）</li>
            <li>較易消耗化妝品</li>
            <li>初學者愛用款</li>
          </Variant>
        </Step>
      </Steps>
    </div>
  </DetailLayout>
);

const Foundation: Page = () => (
  <DetailLayout src={foundation} label="粉底">
    <div style={variantGrid}>
      <Steps>
        <Step>
          <Variant src={foundationCompact} name="粉餅">
            <li>適合中性膚質</li>
            <li>難推開</li>
            <li>能駕馭的人不多</li>
          </Variant>
        </Step>
        <Step>
          <Variant src={foundationCushion} name="氣墊粉餅（氣墊）">
            <li>適合中性膚質</li>
            <li>較好推開</li>
            <li>啞光愛好者</li>
          </Variant>
        </Step>
        <Step>
          <Variant src={foundationLiquid} name="粉底液">
            <li>適合油／乾性膚質</li>
            <li>超推開</li>
            <li>市面上最受喜愛</li>
          </Variant>
        </Step>
        <Step>
          <Variant src={foundationStick} name="粉底棒">
            <li>底妝感重</li>
            <li>難推開</li>
            <li>
              近年推出的產品
              <br />
              （沒看過有人用…）
            </li>
          </Variant>
        </Step>
      </Steps>
    </div>
  </DetailLayout>
);

const Concealer: Page = () => (
  <DetailLayout src={concealer} label="遮瑕">
    <div style={variantGrid}>
      <Steps>
        <Step>
          <Variant src={concealerLiquid} name="遮瑕膏">
            <li>易推開</li>
            <li>市面上的愛用款</li>
            <li>單一使用</li>
          </Variant>
        </Step>
        <Step>
          <Variant src={concealerPalette} name="遮瑕盤">
            <li>化妝師愛用</li>
            <li>具有一定實力</li>
            <li>能清楚辨識顏色</li>
            <li>使用範圍廣泛</li>
          </Variant>
        </Step>
        <Step>
          <Variant src={concealerStick} name="遮瑕棒">
            <li>用量好抓</li>
            <li>不易推開，妝感重</li>
            <li>遮瑕力極佳</li>
          </Variant>
        </Step>
      </Steps>
    </div>
  </DetailLayout>
);

const PowderCard = ({
  src,
  name,
  children,
}: {
  src: string;
  name: string;
  children: ReactNode;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 560 }}>
    <img src={src} alt={name} style={{ width: 460, height: 360, objectFit: 'contain' }} />
    <div style={{ ...serif, fontSize: 60, marginTop: 24 }}>{name}</div>
    <div style={{ fontSize: 40, lineHeight: 1.6, marginTop: 20, textAlign: 'center' }}>
      {children}
    </div>
  </div>
);

const Powder: Page = () => (
  <div style={fill}>
    <Header tab="base" />
    <Body>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 240,
          paddingTop: 110,
        }}
      >
        <Steps>
          <PowderCard src={loosePowder} name="蜜粉">
            搭配刷子使用
            <br />
            適合油性膚質
          </PowderCard>
          <Step>
            <PowderCard src={pressedPowder} name="蜜粉餅">
              搭配粉撲使用
              <br />
              適合乾性膚質
            </PowderCard>
          </Step>
        </Steps>
      </div>
    </Body>
  </div>
);

const Arrow = () => (
  <div style={{ fontSize: 56, color: 'var(--osd-accent)', alignSelf: 'center', marginTop: -90 }}>
    →
  </div>
);

const BaseOrder: Page = () => (
  <div style={fill}>
    <Header tab="base" />
    <Body>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: 24,
          height: '100%',
          padding: '0 80px 110px',
        }}
      >
        <Product src={skincare} label="保養品" />
        <Arrow />
        <Product src={primer} label="妝前乳" />
        <Arrow />
        <Product src={foundation} label="粉底" />
        <Arrow />
        <Product src={concealer} label="遮瑕" />
        <Arrow />
        <Product src={loosePowder} label="蜜粉" />
      </div>
    </Body>
  </div>
);

const ColorItem = ({ name, sub }: { name: string; sub?: string }) => (
  <div style={{ textAlign: 'center', height: 170 }}>
    <div style={{ ...serif, fontWeight: 500, fontSize: 80 }}>{name}</div>
    {sub && <div style={{ fontSize: 34, color: muted, marginTop: 6 }}>{sub}</div>}
  </div>
);

const ColorOverview: Page = () => (
  <div style={fill}>
    <Header tab="color" />
    <Body>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 560px)',
          justifyContent: 'center',
          rowGap: 40,
          paddingTop: 110,
        }}
      >
        <ColorItem name="眉毛" />
        <ColorItem name="眼線" />
        <ColorItem name="腮紅" />
        <ColorItem name="眼影" />
        <ColorItem name="鼻影" />
        <ColorItem name="修容" />
        <div />
        <ColorItem name="口紅" />
      </div>
    </Body>
  </div>
);

const ColorTools: Page = () => (
  <div style={fill}>
    <Header tab="color" />
    <Body>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 560px)',
          justifyContent: 'center',
          rowGap: 40,
          paddingTop: 110,
        }}
      >
        <ColorItem name="眉毛" sub="眉粉／眉筆" />
        <ColorItem name="眼線" sub="眼線筆／眼線膠筆／眼線液" />
        <ColorItem name="腮紅" />
        <ColorItem name="眼影" />
        <ColorItem name="鼻影" />
        <ColorItem name="修容" sub="修容盤／修容棒" />
        <div />
        <ColorItem name="口紅" />
      </div>
    </Body>
  </div>
);

const Liner = ({ src, children }: { src: string; children: ReactNode }) => (
  <div style={{ display: 'flex', gap: 24, width: 540 }}>
    <img src={src} alt="" style={{ width: 160, height: 500, objectFit: 'cover', flexShrink: 0 }} />
    <ul style={{ ...bulletList, fontSize: 28, marginTop: 10 }}>{children}</ul>
  </div>
);

const Eyeliner: Page = () => (
  <div style={fill}>
    <Header tab="color" />
    <Body>
      <div style={{ textAlign: 'center', paddingTop: 70 }}>
        <div style={{ ...serif, fontWeight: 500, fontSize: 80 }}>眼線</div>
        <div style={{ fontSize: 38, color: muted, marginTop: 8 }}>眼線筆／眼線膠筆／眼線液</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 50 }}>
        <Steps>
          <Step>
            <Liner src={linerPencil}>
              <li>需要削</li>
              <li>不尖不好使用</li>
              <li>可以根據力度掌控使用量</li>
            </Liner>
          </Step>
          <Step>
            <Liner src={linerGel}>
              <li>新手愛用款</li>
              <li>沒辦法畫細筆</li>
              <li>好施力，比較不怕</li>
            </Liner>
          </Step>
          <Step>
            <Liner src={linerLiquid}>
              <li>可以畫比較細</li>
              <li>筆觸流暢</li>
              <li>需要練習</li>
              <li>戳到眼睛很麻煩</li>
            </Liner>
          </Step>
        </Steps>
      </div>
    </Body>
  </div>
);

const QrCode = ({ src, label }: { src: string; label: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
    <div style={{ fontSize: 28 }}>{label}</div>
    <img
      src={src}
      alt={label}
      style={{ width: 230, height: 230, background: '#fff', padding: 12, borderRadius: 8 }}
    />
  </div>
);

const ClosingLayout = ({ children }: { children?: ReactNode }) => (
  <div style={{ ...fill, background: sand }}>
    <img
      src={closing}
      alt=""
      style={{
        position: 'absolute',
        inset: '0 auto 0 0',
        width: 760,
        height: 1080,
        objectFit: 'cover',
      }}
    />
    <div style={{ position: 'absolute', left: 940, top: 150 }}>
      <div
        style={{
          display: 'inline-block',
          ...serif,
          fontSize: 80,
          padding: '6px 60px',
          borderRadius: 'var(--osd-radius)',
          background: cream,
        }}
      >
        瑞瑞
      </div>
      <div style={{ ...serif, fontSize: 64, lineHeight: 1.45, marginTop: 120 }}>
        不要透過化妝而喜歡自己
        <br />
        對自己保有信心
        <br />
        才能透過化妝讓別人喜歡你
      </div>
    </div>
    {children}
  </div>
);

const Closing: Page = () => <ClosingLayout />;

const ClosingWithLinks: Page = () => (
  <ClosingLayout>
    <div style={{ position: 'absolute', left: 1210, bottom: 60, display: 'flex', gap: 100 }}>
      <QrCode src={qrSurvey} label="問卷調查" />
      <QrCode src={qrInstagram} label="Instagram" />
    </div>
  </ClosingLayout>
);

const Poll = ({ question }: { question: string }) => (
  <div style={fill}>
    <Header />
    <Body>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 160px 80px',
        }}
      >
        <div
          style={{
            fontSize: 34,
            letterSpacing: '0.2em',
            color: 'var(--osd-accent)',
            fontWeight: 700,
          }}
        >
          SLIDO 投票
        </div>
        <div style={{ ...serif, fontSize: 104, lineHeight: 1.3, marginTop: 40 }}>
          <Highlight size={104}>{question}</Highlight>
        </div>
      </div>
    </Body>
  </div>
);

const PollPowder: Page = () => <Poll question="誰適合用蜜粉？" />;
const PollCanYou: Page = () => <Poll question="你會化妝嗎？" />;
const PollOrder: Page = () => <Poll question="下列哪個化粧順序是對的？" />;
const PollWig: Page = () => <Poll question="假髮可以用離子夾造型？" />;
const PollSpeaker: Page = () => <Poll question="講師叫什麼？" />;

export const meta: SlideMeta = {
  title: '台中二中上課簡報：基礎化妝課程',
  createdAt: '2026-10-20T12:34:28.227Z',
};

export default [
  TermCover,
  Speaker,
  QandA,
  Topics,
  BasicCover,
  CanYouMakeup,
  CosmeticsLaw,
  BaseVsColor,
  BaseIntro,
  Skincare,
  NextPrimer,
  Primer,
  NextTools,
  Tools,
  NextFoundation,
  Foundation,
  NextConcealer,
  Concealer,
  NextPowder,
  Powder,
  BaseOrder,
  ColorOverview,
  ColorTools,
  Eyeliner,
  DemoCover,
  BaseOrder,
  ColorTools,
  QandA,
  Closing,
  PollPowder,
  PollCanYou,
  PollOrder,
  PollWig,
  PollSpeaker,
  ClosingWithLinks,
] satisfies Page[];
