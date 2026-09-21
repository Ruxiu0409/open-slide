import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

import adIconDrop from './assets/ad-icon-drop.mp4';
import adPhones from './assets/ad-phones.mp4';
import bridge from './assets/bridge.jpg';
import coverPortrait from './assets/cover-portrait.jpg';

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
  '、下不中享代以來僅入內分動半問國團外大姐學實專己師很得復想成我所手教斜星是未槓獎獲瑞生甲畫發的研社私究立競績繁者自興舉行表要覺言計語論讀賽逢進遇部重長開雙靠項顧驗高';
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

const S = ({ children }: { children: ReactNode }) => (
  <span style={{ fontFamily: SANS, fontWeight: 700 }}>{children}</span>
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
      <div style={{ fontSize: 56, marginTop: 56 }}>瑞瑞</div>
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

const BridgeFull: Page = () => <FullMedia src={bridge} />;

const Intro: Page = () => (
  <div style={canvas}>
    <Media src={bridge} />
    <div
      style={{
        position: 'absolute',
        top: 190,
        right: 90,
        width: 840,
        padding: '56px 60px',
        borderRadius: 44,
        background: 'rgba(233,242,250,0.82)',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 24px 70px rgba(0,0,0,0.2)',
      }}
    >
      <div style={{ fontSize: 36, color: 'rgba(17,17,19,0.55)' }}>我是</div>
      <div style={{ fontSize: 60, marginTop: 6 }}>
        斜槓 <S>UI/UX Designer</S>
      </div>
      <div
        style={{
          height: 1,
          background: 'rgba(17,17,19,0.16)',
          margin: '34px 0 30px',
        }}
      />
      <div style={{ fontSize: 34, lineHeight: 1.85 }}>
        <div>
          <S>GDG on Campus FCU</S> 2025-26 Associate Lead
        </div>
        <div>
          <S>iOS Club 8th</S> 教學長・<S>9th</S> 社長・<S>10th</S> 顧問
        </div>
        <div>私立復興實驗高中雙語部社團教師</div>
        <div>半逢遇甲、行動逢甲開發者</div>
        <div>1 項大專生計畫</div>
        <div>11 項國內外競賽獲獎</div>
      </div>
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
  <Ask>
    以下言論僅代表我自己
    <br />
    不代表社團
  </Ask>
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
  BridgeFull,
  Intro,
  StarPlan,
  GradesMatter,
  GradSchool,
  Disclaimer,
  Blank,
  Blank,
  Blank,
  Blank,
  Blank,
  Blank,
  Blank,
  Blank,
  Blank,
] satisfies Page[];
