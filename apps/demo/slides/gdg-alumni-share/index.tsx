import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

import adIconDrop from './assets/ad-icon-drop.mp4';
import adPhones from './assets/ad-phones.mp4';
import awardsBg from './assets/awards-bg.jpg';
import bridge from './assets/bridge.jpg';
import cosplay from './assets/cosplay.mp4';
import coverPortrait from './assets/cover-portrait.jpg';
import disney1 from './assets/disney-1.jpg';
import disney2 from './assets/disney-2.jpg';
import disney3 from './assets/disney-3.jpg';
import disney4 from './assets/disney-4.jpg';
import disney5 from './assets/disney-5.jpg';
import fcuNews from './assets/fcu-news.jpg';
import hangzhou1 from './assets/hangzhou-1.jpg';
import hangzhou2 from './assets/hangzhou-2.jpg';
import hangzhou3 from './assets/hangzhou-3.jpg';
import lastPhoto from './assets/last-photo.jpg';
import lastQr from './assets/last-qr.png';
import maicBg from './assets/maic-bg.jpg';
import maker1 from './assets/maker-1.jpg';
import maker2 from './assets/maker-2.jpg';
import maker3 from './assets/maker-3.jpg';
import maker4 from './assets/maker-4.jpg';
import petscan from './assets/petscan.jpg';
import shanghai1 from './assets/shanghai-1.jpg';
import shanghai2 from './assets/shanghai-2.jpg';
import shanghai3 from './assets/shanghai-3.jpg';
import shanghai4 from './assets/shanghai-4.jpg';
import shanghai5 from './assets/shanghai-5.jpg';
import suzhou1 from './assets/suzhou-1.jpg';
import suzhou2 from './assets/suzhou-2.jpg';
import suzhou3 from './assets/suzhou-3.jpg';
import suzhou4 from './assets/suzhou-4.jpg';

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
  '、一三上下不且世中也了事二亞享人今以任但位作你佳來信個們做備優入內全兩其具冠出分別到創力加努勇動半南卻參及受只可同吧員問喜國圍團在城域報士外夢大天奮好姊始姐子學定客家實專對少尼展山岸峽州工己已師帶幫年幹座式強待很後得從復心情想意慧應成我戰找把投拿挑揮搞據教敢數文斜新是智最會有期杭松案極槓樣歡每比求沒法洲海漫為然特獎獲班現瑞生用甲界畫當病發的盡直碼社神秀私科程積立站競等簡累組經群者而育能腦自興英蘇行表被裡要覺覽計設誒語說讀變讓資賽贏超跟身軍迪追這通逢遇遊過達部都量銅錯長開限隊雖雙難電青項領願類顧飛驗體高黑，？';
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

function Stage({
  crumb,
  main,
  sub,
  children,
  mainSize = 104,
  gap = 44,
}: {
  crumb?: ReactNode;
  main?: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
  mainSize?: number;
  gap?: number;
}) {
  return (
    <div
      style={{
        ...canvas,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '190px 140px 120px',
        textAlign: 'center',
        gap,
      }}
    >
      {crumb ? <Crumb>{crumb}</Crumb> : null}
      {children}
      {main ? (
        <div
          style={{
            fontSize: mainSize,
            fontWeight: 700,
            lineHeight: 1.35,
            maxWidth: 1580,
            textWrap: 'balance',
          }}
        >
          {main}
        </div>
      ) : null}
      {sub ? (
        <div
          style={{
            fontSize: 44,
            lineHeight: 1.5,
            maxWidth: 1480,
            textWrap: 'balance',
            color: 'rgba(17,17,19,0.82)',
          }}
        >
          {sub}
        </div>
      ) : null}
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
        <video src={src} style={style} autoPlay muted loop playsInline />
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

const shot: CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'var(--osd-radius)',
  boxShadow: '0 18px 48px rgba(0,0,0,0.14)',
  display: 'block',
};

function Wall({
  title,
  photos,
  columns,
  rowHeight,
  gap = 22,
}: {
  title?: ReactNode;
  photos: string[];
  columns: number;
  rowHeight: number;
  gap?: number;
}) {
  return (
    <div
      style={{
        ...canvas,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: title ? '150px 110px 90px' : '90px 110px',
        gap: 52,
      }}
    >
      {title ? (
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.25, textWrap: 'balance' }}>
          {title}
        </div>
      ) : null}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridAutoRows: `${rowHeight}px`,
          gap,
          width: '100%',
          flex: 1,
          alignContent: 'center',
        }}
      >
        {photos.map((src) => (
          <img key={src} src={src} alt="" style={shot} />
        ))}
      </div>
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
      <div style={{ fontSize: 52, marginTop: 56 }}>
        <S>GDG on Campus</S> 顧問　瑞瑞
      </div>
      <div style={{ fontFamily: SANS, fontSize: 36, color: MUTED, marginTop: 22 }}>2026.09.22</div>
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
          <S>GDG on Campus</S> 現任顧問
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

const PeClass: Page = () => <FullMedia src={bridge} dim={0.42} caption="我國中讀體育班" />;

const PeClassPlain: Page = () => <Stage main="我國中讀體育班" />;

const Cosplay: Page = () => <FullMedia src={cosplay} video fit="contain" />;

const FcuNews: Page = () => (
  <div style={{ ...canvas, display: 'grid', placeItems: 'center' }}>
    <img src={fcuNews} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
  </div>
);

const ThreeContests: Page = () => (
  <Stage
    main="大一下，我後來參加了三個競賽"
    mainSize={88}
    sub={
      <span style={{ fontSize: 96 }}>
        <A>三個都沒有入圍</A>
      </span>
    }
  />
);

const SoSad: Page = () => (
  <Stage
    crumb="大一下，我後來參加了三個競賽"
    main="幹，我超難過"
    sub="我開始覺得是學長很強，我只是被帶飛而已"
  />
);

const BeCaptain: Page = () => (
  <FullMedia
    src={maicBg}
    dim={0.45}
    crumb="幹，我超難過"
    caption={
      <div>
        <div style={{ fontSize: 56, opacity: 0.9, marginBottom: 36 }}>
          直到社團的兩位學長姐跟我說
        </div>
        <div style={{ marginBottom: 30 }}>行動應用創新賽，能不能跟我一組</div>
        <div>
          <A>而且你當隊長</A>
        </div>
      </div>
    }
    captionSize={86}
  />
);

const AreYouSure: Page = () => (
  <Stage
    crumb="直到社團的兩位學長姐跟我說"
    main="沒搞錯吧？我大一誒"
    sub="兩個都得過獎的人，找我一個不會得獎的當隊長，是不是有病？"
  />
);

const GoWild: Page = () => (
  <Stage
    crumb="沒搞錯吧？我大一誒"
    main="盡情發揮你的想法"
    sub="只要想得出來，學姊一定幫你設計出來，學長也會幫你把程式做出來"
  />
);

const NoConfidence: Page = () => (
  <Stage
    crumb="學長卻跟我說"
    main="備受期待的我，過程中其實很沒信心"
    mainSize={88}
    sub="作為團隊的一員，努力把專案做好"
  />
);

const ThirdPrize: Page = () => (
  <Stage crumb="備受期待的我，過程中其實很沒信心" main="最後，我們拿到了三等獎" mainSize={92}>
    <img
      src={petscan}
      alt=""
      style={{
        width: 560,
        height: 470,
        objectFit: 'cover',
        borderRadius: 'var(--osd-radius)',
        boxShadow: '0 20px 56px rgba(0,0,0,0.18)',
      }}
    />
  </Stage>
);

const SpeakUp: Page = () => (
  <Stage crumb="最後，我們拿到了三等獎" main="敢說、敢做" sub="把想法表達出來" />
);

const AWARDS: [string, string][] = [
  ['2024 全國電子設計創意競賽 智慧大數據及行動 APP 類', '冠軍'],
  ['2024 App 行動應用創新賽', '三等獎'],
  ['2024 海峽兩岸青少年創客大賽', '三等獎'],
  ['2024 南投山城數位黑客松', '銅獎'],
  ['2025 全國電子設計創意競賽 智慧大數據及行動 APP 類', 'IEEE Tainan Section 特別獎'],
  ['2025 海峽兩岸青少年創客大賽', '二等獎、優秀展覽獎'],
  ['2025 逢甲大學英文簡報比賽', '佳作'],
  ['2025 亞洲青少年腦神經科學大賽', '亞軍'],
  ['2026 全國電子設計創意競賽 智慧大數據及行動 APP 類', '亞軍'],
  ['2026 全國電子設計創意競賽 資通類', '佳作'],
  ['2026 App 行動應用創新賽', '三等獎'],
];

const ElevenAwards: Page = () => (
  <div style={canvas}>
    <Media src={awardsBg} dim={0.62} />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '110px 130px',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 76, fontWeight: 700, marginBottom: 34, textWrap: 'balance' }}>
        最後累積贏得 <S>11</S> 座獎項
      </div>
      <div style={{ fontSize: 28, lineHeight: 1.95 }}>
        {AWARDS.map(([name, prize]) => (
          <div key={name}>
            <span style={{ fontFamily: SANS, fontWeight: 600 }}>{name}</span>
            <span style={{ opacity: 0.5 }}>｜</span>
            <A>{prize}</A>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 56, marginTop: 40 }}>成為可以站在這裡分享的人</div>
    </div>
  </div>
);

const MakerContest: Page = () => (
  <Wall
    title="海峽兩岸青少年創客大賽"
    photos={[maker1, maker2, maker3, maker4]}
    columns={4}
    rowHeight={560}
  />
);

const Suzhou: Page = () => (
  <Wall title="蘇州" photos={[suzhou1, suzhou2, suzhou3, suzhou4]} columns={4} rowHeight={620} />
);

const Hangzhou: Page = () => (
  <Wall title="杭州" photos={[hangzhou1, hangzhou2, hangzhou3]} columns={3} rowHeight={600} />
);

const Shanghai: Page = () => (
  <Wall
    title="上海漫遊"
    photos={[shanghai1, shanghai2, shanghai3, shanghai4, shanghai5]}
    columns={5}
    rowHeight={620}
  />
);

const Disney: Page = () => (
  <Wall
    title="上海迪士尼"
    photos={[disney1, disney2, disney3, disney4, disney5]}
    columns={5}
    rowHeight={620}
  />
);

const JustATool: Page = () => (
  <Stage
    crumb={
      <>
        <S>iOS App</S> 對我來說，其實只是一個工具
      </>
    }
    main="但從來沒有一個團隊"
    sub={
      <span style={{ fontSize: 76 }}>
        願意奮不顧身挑戰自己的<A>極限</A>
      </span>
    }
  />
);

const EveryoneShines: Page = () => (
  <Stage main="在這裡，每個人可以發揮自己的專長" mainSize={88} sub="追求自己喜歡的事情" />
);

const ThinkDifferent: Page = () => (
  <Stage crumb="從今天開始">
    <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 150 }}>Think Different</div>
    <div style={{ fontFamily: SANS, fontSize: 40, color: MUTED, marginTop: 70 }}>Apple</div>
  </Stage>
);

const WhereImFrom: Page = () => (
  <Stage
    crumb={
      <>
        我來自逢甲大學 <S>iOS Club</S>
      </>
    }
    main="雖然大家都在不同領域"
    sub={
      <span style={{ fontSize: 88, color: 'var(--osd-text)' }}>
        但我們是一群<A>勇敢追夢</A>的人
      </span>
    }
  />
);

const Closing: Page = () => (
  <div
    style={{
      ...canvas,
      display: 'grid',
      gridTemplateColumns: '480px 1fr',
      alignItems: 'center',
      gap: 110,
      padding: '90px 140px',
    }}
  >
    <img
      src={lastPhoto}
      alt=""
      style={{
        width: '100%',
        height: 900,
        objectFit: 'cover',
        borderRadius: 40,
        boxShadow: '0 26px 70px rgba(0,0,0,0.18)',
      }}
    />
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 54, color: MUTED }}>用程式碼的力量</div>
      <div
        style={{
          fontSize: 92,
          fontWeight: 700,
          marginTop: 24,
          lineHeight: 1.35,
          textWrap: 'balance',
        }}
      >
        讓<A>世界</A>變成自己喜歡樣子
      </div>
      <img src={lastQr} alt="" style={{ width: 300, marginTop: 66, borderRadius: 28 }} />
      <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 34, color: MUTED, marginTop: 20 }}>
        @cy_4.9
      </div>
    </div>
  </div>
);

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
  PeClass,
  PeClassPlain,
  Cosplay,
  FcuNews,
  ThreeContests,
  SoSad,
  BeCaptain,
  AreYouSure,
  GoWild,
  NoConfidence,
  ThirdPrize,
  SpeakUp,
  ElevenAwards,
  MakerContest,
  Suzhou,
  Hangzhou,
  Shanghai,
  Disney,
  JustATool,
  EveryoneShines,
  ThinkDifferent,
  WhereImFrom,
  Closing,
] satisfies Page[];
