import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { ImagePlaceholder } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

import adIconDrop from './assets/ad-icon-drop.mp4';
import adPhones from './assets/ad-phones.mp4';
import appStoreRank from './assets/app-store-rank.png';
import coverPortrait from './assets/cover-portrait.jpg';
import fcuAdmission from './assets/fcu-admission.jpg';
import gsatScore from './assets/gsat-score.jpg';
import sunsetSea from './assets/sunset-sea.jpg';

export const design: DesignSystem = {
  palette: { bg: '#f0f1f2', text: '#111113', accent: '#e8492b' },
  fonts: {
    display: '-apple-system, BlinkMacSystemFont, "Noto Sans TC", "PingFang TC", sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "Noto Sans TC", "PingFang TC", sans-serif',
  },
  typeScale: { hero: 104, body: 38 },
  radius: 28,
};

const HAND = '-apple-system, BlinkMacSystemFont, "Noto Sans TC", "PingFang TC", sans-serif';
const SANS = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif';

const MUTED = '#a3a3a8';

const FONT_TEXT =
  '一上下不中二享代以來個僅像入具出分切勤去取名單國圖團在多大天始姐學定就工己度式很後得心想成我所手才排接攻數文星是晚更會有未架梗榜樣機每決沒活測為然爭爽玩生甲當發的研社程究第系級統績繁考者腦自與舉英行表裝要覺言訊課論讀資逢進過選都重錄長開電靠高，';
const FONT_HREF = `https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap&text=${encodeURIComponent(FONT_TEXT)}`;
const FONT_LINK_ID = 'osd-webfont-gdg-alumni-share';

if (typeof document !== 'undefined') {
  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  if (link.href !== FONT_HREF) link.href = FONT_HREF;
}

const canvas: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: HAND,
};

const A = ({ children }: { children: ReactNode }) => (
  <span style={{ color: 'var(--osd-accent)' }}>{children}</span>
);

function Crumb({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 64,
        left: 140,
        right: 140,
        textAlign: 'center',
        fontSize: 40,
        lineHeight: 1.3,
        textWrap: 'balance',
        color: light ? 'rgba(255,255,255,0.55)' : MUTED,
      }}
    >
      {children}
    </div>
  );
}

function Media({
  src,
  video,
  fit = 'cover',
  dim,
}: {
  src: string;
  video?: boolean;
  fit?: 'cover' | 'contain';
  dim?: number;
}) {
  const style: CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: fit,
  };
  return (
    <>
      {video ? (
        <video src={src} style={style} autoPlay muted playsInline />
      ) : (
        <img src={src} alt="" style={style} />
      )}
      {dim ? (
        <div style={{ position: 'absolute', inset: 0, background: `rgba(0,0,0,${dim})` }} />
      ) : null}
    </>
  );
}

function FullMedia({
  src,
  video,
  fit = 'cover',
  dim,
  crumb,
  caption,
  captionSize = 96,
}: {
  src: string;
  video?: boolean;
  fit?: 'cover' | 'contain';
  dim?: number;
  crumb?: ReactNode;
  caption?: ReactNode;
  captionSize?: number;
}) {
  return (
    <div style={canvas}>
      <Media src={src} video={video} fit={fit} dim={dim} />
      {crumb ? <Crumb light>{crumb}</Crumb> : null}
      {caption ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 160px',
            textAlign: 'center',
            color: '#fff',
            fontSize: captionSize,
            fontWeight: 700,
            lineHeight: 1.35,
            textWrap: 'balance',
            textShadow: '0 4px 40px rgba(0,0,0,0.45)',
          }}
        >
          {caption}
        </div>
      ) : null}
    </div>
  );
}

const Cover: Page = () => (
  <div
    style={{
      ...canvas,
      display: 'grid',
      gridTemplateColumns: '1fr 600px',
      alignItems: 'center',
      gap: 110,
      padding: '0 140px',
    }}
  >
    <div>
      <div
        style={{
          fontFamily: SANS,
          fontWeight: 700,
          fontSize: 46,
          color: 'var(--osd-accent)',
          marginBottom: 18,
        }}
      >
        Google 開發者學生社團
      </div>
      <div style={{ fontSize: 176, fontWeight: 700, lineHeight: 1.1 }}>學長姐分享</div>
      <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 56, marginTop: 56 }}>TSAI CY</div>
      <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 32, marginTop: 16 }}>
        GDG on Campus FCU · 2025-26 Associate Lead
      </div>
      <div style={{ fontFamily: SANS, fontSize: 32, color: MUTED, marginTop: 12 }}>2026.09.22</div>
    </div>
    <img
      src={coverPortrait}
      alt=""
      style={{
        width: '100%',
        height: 860,
        objectFit: 'cover',
        transform: 'scaleX(-1)',
        borderRadius: 48,
        boxShadow: '0 30px 80px rgba(0,0,0,0.18)',
      }}
    />
  </div>
);

const AdIconDrop: Page = () => <FullMedia src={adIconDrop} video fit="contain" />;
const AdPhones: Page = () => <FullMedia src={adPhones} video fit="contain" />;

const SeaSunset: Page = () => (
  <div style={canvas}>
    <Media src={sunsetSea} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.3) 44%, rgba(0,0,0,0) 72%)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: 140,
        top: '34%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        width: 960,
        color: '#fff',
        fontSize: 96,
        fontWeight: 700,
        lineHeight: 1.2,
        textShadow: '0 4px 40px rgba(0,0,0,0.45)',
      }}
    >
      <div>成績單裝不下的</div>
      <div style={{ marginLeft: 460 }}>才是大學</div>
    </div>
  </div>
);

function Ask({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        ...canvas,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 140px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 104, fontWeight: 700, lineHeight: 1.3, textWrap: 'balance' }}>
        {children}
      </div>
    </div>
  );
}

const GradSchool: Page = () => (
  <Ask>
    未來想讀研究所的<A>舉手</A>
  </Ask>
);

const StarPlan: Page = () => (
  <Ask>
    靠繁星進入逢甲的<A>舉手</A>
  </Ask>
);

const GradesMatter: Page = () => (
  <Ask>
    覺得成績很重要的<A>舉手</A>
  </Ask>
);

const Disclaimer: Page = () => (
  <div
    style={{
      ...canvas,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 44,
      padding: '0 140px',
      textAlign: 'center',
    }}
  >
    <div style={{ fontSize: 104, fontWeight: 700, lineHeight: 1.3 }}>以下言論僅代表我自己</div>
    <div style={{ fontSize: 60, lineHeight: 1.4, color: MUTED }}>
      不代表 Google 開發者學生社團 與 iOS Club
    </div>
  </div>
);

const ClubIsYourChoice: Page = () => (
  <div
    style={{
      ...canvas,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 140px',
      textAlign: 'center',
    }}
  >
    <div style={{ fontSize: 56, color: MUTED }}>大學</div>
    <div style={{ marginTop: 40, fontSize: 104, fontWeight: 700, lineHeight: 1.35 }}>
      沒有選社系統，沒有考勤
      <br />
      在社團的一切都是<A>自己決定</A>
    </div>
  </div>
);

const Closing: Page = () => (
  <Ask>
    大學開始，機會得<A>自己爭取</A>
  </Ask>
);

const AppStoreRank: Page = () => (
  <div style={{ ...canvas, background: '#000', color: '#fff' }}>
    <img
      src={appStoreRank}
      alt=""
      style={{ position: 'absolute', left: 197, top: 68, width: 436, height: 944 }}
    />
    <div
      style={{
        position: 'absolute',
        left: 134,
        top: 297,
        width: 563,
        height: 106,
        boxSizing: 'border-box',
        border: '6px solid #fff',
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: 1105,
        top: 255,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ fontSize: 56, lineHeight: 1.35 }}>上架當天攻上 App Store</div>
      <div style={{ fontSize: 56, lineHeight: 1.35, marginTop: 38 }}>工具程式排行榜</div>
      <div
        style={{
          marginTop: 111,
          fontSize: 180,
          fontWeight: 700,
          lineHeight: 1.1,
          background: 'linear-gradient(90deg, #f2ab74 0%, #d182a0 48%, #62afe1 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        }}
      >
        第二名
      </div>
    </div>
  </div>
);

const Score = ({ subject, grade }: { subject: string; grade: string }) => (
  <div>
    <div style={{ fontSize: 36, color: MUTED }}>{subject}</div>
    <div style={{ marginTop: 8, fontFamily: SANS, fontSize: 96, fontWeight: 700, lineHeight: 1.1 }}>
      {grade}
      <span
        style={{ fontFamily: HAND, fontSize: 32, fontWeight: 400, color: MUTED, marginLeft: 14 }}
      >
        級分
      </span>
    </div>
  </div>
);

const GsatScore: Page = () => (
  <div
    style={{
      ...canvas,
      display: 'grid',
      gridTemplateColumns: '640px 1fr',
      alignItems: 'center',
      gap: 110,
      padding: '0 140px',
    }}
  >
    <img
      src={gsatScore}
      alt=""
      style={{
        width: 640,
        height: 853,
        objectFit: 'cover',
        borderRadius: 24,
        boxShadow: '0 30px 80px rgba(0,0,0,0.18)',
      }}
    />
    <div>
      <div style={{ fontSize: 56, color: MUTED }}>我的學測成績</div>
      <div
        style={{
          marginTop: 56,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          rowGap: 44,
          columnGap: 80,
        }}
      >
        <Score subject="國文" grade="12" />
        <Score subject="英文" grade="8" />
        <Score subject="數學A" grade="10" />
        <Score subject="數學B" grade="11" />
        <Score subject="社會" grade="8" />
        <Score subject="自然" grade="10" />
      </div>
    </div>
  </div>
);

const FcuAdmission: Page = () => (
  <div
    style={{
      ...canvas,
      display: 'grid',
      gridTemplateColumns: '1fr 920px',
      alignItems: 'center',
      gap: 90,
      padding: '0 140px',
    }}
  >
    <div>
      <div style={{ fontSize: 56, color: MUTED }}>一樣分發錄取</div>
      <div style={{ marginTop: 32, fontSize: 88, fontWeight: 700, lineHeight: 1.25 }}>
        逢甲大學
        <br />
        <A>資訊工程學系</A>
      </div>
    </div>
    <img
      src={fcuAdmission}
      alt=""
      style={{
        width: 920,
        height: 690,
        objectFit: 'cover',
        borderRadius: 24,
        boxShadow: '0 30px 80px rgba(0,0,0,0.18)',
      }}
    />
  </div>
);

const ExpectedCollege: Page = () => (
  <div
    style={{
      ...canvas,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 56,
      padding: '0 140px',
      textAlign: 'center',
    }}
  >
    <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.45, textWrap: 'balance' }}>
      我以為接下來就是更多的高中電腦課，然後每天晚上出去玩，度過一個很爽很開心的大學生活
    </div>
    <ImagePlaceholder hint="想像中的爽大學生活梗圖" width={800} height={450} />
  </div>
);

const Blank: Page = () => <div style={canvas} />;

export const meta: SlideMeta = {
  title: 'GDG 學長姐分享',
  createdAt: '2026-09-20T07:48:07.514Z',
};

export default [
  Cover,
  AdIconDrop,
  AdPhones,
  SeaSunset,
  StarPlan,
  GradesMatter,
  GradSchool,
  Disclaimer,
  AppStoreRank,
  GsatScore,
  FcuAdmission,
  ExpectedCollege,
  Blank,
  Blank,
  ClubIsYourChoice,
  Blank,
  Closing,
] satisfies Page[];
