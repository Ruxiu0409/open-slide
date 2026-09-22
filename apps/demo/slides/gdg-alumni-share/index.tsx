import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { ImagePlaceholder } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

import adIconDrop from './assets/ad-icon-drop.mp4';
import adPhones from './assets/ad-phones.mp4';
import appStoreRank from './assets/app-store-rank.png';
import awardBoard from './assets/award-board.jpg';
import awardDessert from './assets/award-dessert.jpg';
import awardNews from './assets/award-news.jpg';
import awardStage from './assets/award-stage.jpg';
import contestBadge from './assets/contest-badge.jpg';
import contestBooth from './assets/contest-booth.jpg';
import contestIpad from './assets/contest-ipad.jpg';
import contestMeme from './assets/contest-meme.jpg';
import contestNight from './assets/contest-night.mp4';
import contestPoster from './assets/contest-poster.jpg';
import coverPortrait from './assets/cover-portrait.jpg';
import eda2025Stage from './assets/eda-2025-stage.jpg';
import edaMrPoster from './assets/eda-mr-poster.jpg';
import edaParcelPoster from './assets/eda-parcel-poster.jpg';
import fcuAdmission from './assets/fcu-admission.jpg';
import gsatScore from './assets/gsat-score.jpg';
import hackathonBooth from './assets/hackathon-booth.jpg';
import hackathonDisplay from './assets/hackathon-display.jpg';
import hackathonJudges from './assets/hackathon-judges.jpg';
import hackathonPrize from './assets/hackathon-prize.jpg';
import lastQr from './assets/last-qr.png';
import lifeBilliards from './assets/life-billiards.jpg';
import lifeCampusGroup from './assets/life-campus-group.jpg';
import lifeDinner from './assets/life-dinner.jpg';
import lifeEscapeRoom from './assets/life-escape-room.jpg';
import lifeFrisbee from './assets/life-frisbee.jpg';
import lifeHallwayGroup from './assets/life-hallway-group.jpg';
import lifeNightGroup from './assets/life-night-group.jpg';
import lifeSelfieFilter from './assets/life-selfie-filter.jpg';
import maicFloorCode from './assets/maic-floor-code.jpg';
import maicPlush from './assets/maic-plush.jpg';
import maicRoom from './assets/maic-room.jpg';
import maicSelfie from './assets/maic-selfie.jpg';
import maicStage from './assets/maic-stage.jpg';
import makerBooth from './assets/maker-booth.jpg';
import makerTrophy from './assets/maker-trophy.jpg';
import neuroCertificate from './assets/neuro-certificate.png';
import pinkCrowd from './assets/pink-crowd.jpg';
import pinkNeon from './assets/pink-neon.jpg';
import pinkSeated from './assets/pink-seated.jpg';
import shBridge from './assets/sh-bridge.jpg';
import shCave from './assets/sh-cave.jpg';
import shClocktower from './assets/sh-clocktower.jpg';
import shCostume from './assets/sh-costume.jpg';
import shCrayfish from './assets/sh-crayfish.jpg';
import shDinner from './assets/sh-dinner.jpg';
import shKfc from './assets/sh-kfc.jpg';
import shKtv from './assets/sh-ktv.jpg';
import shMcdonalds from './assets/sh-mcdonalds.jpg';
import shMilktea from './assets/sh-milktea.jpg';
import shMuseum from './assets/sh-museum.jpg';
import shSkewers from './assets/sh-skewers.jpg';
import shYuyuanDay from './assets/sh-yuyuan-day.jpg';
import shYuyuanNight from './assets/sh-yuyuan-night.jpg';
import sunsetSea from './assets/sunset-sea.jpg';
import tripBreakfast from './assets/trip-breakfast.jpg';
import tripClaw from './assets/trip-claw.jpg';
import tripNightmarket from './assets/trip-nightmarket.jpg';
import tripTrain from './assets/trip-train.jpg';

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
  '一三上下不中了二亞享他代以任但位何作佳來個們候僅像優入全兩具冠出分切別到創力加努動勤南原厲去參及友取只可名單嗎國圖團在城報多大天好始姐子學完定客害導少就展山岸峽工己師年度式很後得從心恂想意慧應成我所手才投排接換擇據攻放數文新星是時晚智更會有未松架校梗棄榜樣機次每比決沒洲活海測為然爭爽特獎玩班生用甲當發的看真研社神秀科程究競第等簡系級統經網績繁群老考者聞胡能腦自與舉舞英融行表被裝要見覺覽言計訊設說課請論讀變資賽軍通逢進過選邀還都重量金銅錄長開電青靠類高黑，？';
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

const Shot = ({ src, ratio }: { src: string; ratio: number }) => (
  <img
    src={src}
    alt=""
    style={{
      flex: `${ratio} 1 0`,
      minWidth: 0,
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    }}
  />
);

const RealCollege: Page = () => (
  <div style={{ ...canvas, display: 'flex', flexDirection: 'column', gap: 10 }}>
    <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>
      <Shot src={lifeFrisbee} ratio={0.75} />
      <Shot src={lifeEscapeRoom} ratio={1.335} />
      <Shot src={lifeSelfieFilter} ratio={0.562} />
      <Shot src={lifeDinner} ratio={1.333} />
      <Shot src={lifeHallwayGroup} ratio={0.562} />
    </div>
    <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>
      <Shot src={lifeCampusGroup} ratio={1.778} />
      <Shot src={lifeNightGroup} ratio={1.333} />
      <Shot src={lifeBilliards} ratio={1.335} />
    </div>
  </div>
);

const ShotVideo = ({ src, ratio }: { src: string; ratio: number }) => (
  <video
    src={src}
    autoPlay
    muted
    loop
    playsInline
    style={{
      flex: `${ratio} 1 0`,
      minWidth: 0,
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    }}
  />
);

const FirstContest: Page = () => (
  <div style={{ ...canvas, display: 'flex', flexDirection: 'column', gap: 10 }}>
    <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 40,
          padding: '0 60px 0 100px',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 36, color: MUTED }}>2024 全國電子設計創意競賽</div>
          <div style={{ marginTop: 20, fontSize: 96, fontWeight: 700, lineHeight: 1.15 }}>
            第一次比賽
          </div>
          <div style={{ marginTop: 24, fontSize: 40, color: MUTED }}>智慧大數據及行動 APP 類</div>
        </div>
        <img
          src={contestMeme}
          alt=""
          style={{ flex: 'none', width: 450, height: 339, objectFit: 'cover', borderRadius: 12 }}
        />
      </div>
      <img
        src={contestPoster}
        alt=""
        style={{ flex: 'none', width: 364, height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <img
        src={contestBadge}
        alt=""
        style={{ flex: 'none', width: 401, height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
    <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>
      <ShotVideo src={contestNight} ratio={1.778} />
      <Shot src={contestIpad} ratio={1.386} />
      <Shot src={contestBooth} ratio={1.333} />
    </div>
  </div>
);

const AwardWin: Page = () => (
  <div style={{ ...canvas, display: 'flex', flexDirection: 'column', gap: 10 }}>
    <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 60px 0 140px',
        }}
      >
        <div style={{ fontSize: 34, lineHeight: 1.45, color: MUTED }}>
          2024 全國電子設計創意競賽
          <br />
          智慧大數據及行動 APP 類
        </div>
        <div style={{ marginTop: 32, fontSize: 96, fontWeight: 700, lineHeight: 1.15 }}>
          我得獎了
        </div>
        <div style={{ marginTop: 8, fontSize: 168, fontWeight: 700, lineHeight: 1.1 }}>
          <A>冠軍</A>
        </div>
      </div>
      <img
        src={awardNews}
        alt=""
        style={{ flex: 'none', width: 951, height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
    <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>
      <Shot src={awardStage} ratio={1.333} />
      <Shot src={awardBoard} ratio={1.333} />
      <Shot src={awardDessert} ratio={0.75} />
    </div>
  </div>
);

const Moment = ({ who, what }: { who: string; what: ReactNode }) => (
  <div>
    <div style={{ fontSize: 36, color: MUTED }}>{who}</div>
    <div style={{ marginTop: 16, fontSize: 80, fontWeight: 700, lineHeight: 1.3 }}>{what}</div>
  </div>
);

const TeachersNoticed: Page = () => (
  <div
    style={{
      ...canvas,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 96,
      padding: '0 140px',
    }}
  >
    <Moment who="班導" what="在班群發我上校網新聞" />
    <Moment
      who="英文老師"
      what={
        <>
          下課的時候說他有看到，<A>很厲害</A>
        </>
      }
    />
  </div>
);

const NotOnlyGrades: Page = () => (
  <Ask>
    原來能被看見的，不只有<A>成績單</A>
  </Ask>
);

const ManyContests: Page = () => (
  <Ask>
    我開始參加<A>大量</A>的競賽
  </Ask>
);

const AwardRow = ({
  year,
  category,
  prize,
  prizeSize,
}: {
  year: string;
  category?: string;
  prize: ReactNode;
  prizeSize: number;
}) => (
  <div style={{ display: 'flex', gap: 40 }}>
    <div
      style={{
        flex: 'none',
        width: 140,
        fontFamily: SANS,
        fontSize: 44,
        fontWeight: 700,
        lineHeight: 1.4,
        color: MUTED,
      }}
    >
      {year}
    </div>
    <div>
      {category ? (
        <div style={{ fontSize: 32, lineHeight: 1.3, color: MUTED }}>{category}</div>
      ) : null}
      <div
        style={{
          fontSize: prizeSize,
          fontWeight: 700,
          lineHeight: 1.25,
          color: 'var(--osd-accent)',
        }}
      >
        {prize}
      </div>
    </div>
  </div>
);

const Contest = ({
  name,
  media,
  children,
}: {
  name: ReactNode;
  media?: ReactNode;
  children: ReactNode;
}) => (
  <div
    style={{
      ...canvas,
      display: 'flex',
      alignItems: 'center',
      gap: 90,
      padding: '0 140px',
    }}
  >
    <div style={media ? { flex: 'none', width: 640 } : { flex: 1 }}>
      <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.25 }}>{name}</div>
      <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {children}
      </div>
    </div>
    {media}
  </div>
);

const EdaRow = ({ year, prize, note }: { year: string; prize: string; note?: string }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 40 }}>
    <div
      style={{
        flex: 'none',
        width: 140,
        fontFamily: SANS,
        fontSize: 36,
        fontWeight: 700,
        color: MUTED,
      }}
    >
      {year}
    </div>
    <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.25, color: 'var(--osd-accent)' }}>
      {prize}
    </div>
    {note ? <div style={{ fontSize: 28, color: MUTED }}>{note}</div> : null}
  </div>
);

const ContestEda: Page = () => (
  <div style={{ ...canvas, display: 'flex', flexDirection: 'column', gap: 10 }}>
    <div style={{ display: 'flex', gap: 10, flex: '0 0 640px', minHeight: 0 }}>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 60px 0 140px',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.25 }}>全國電子設計創意競賽</div>
        <div style={{ marginTop: 8, fontSize: 32, color: MUTED }}>智慧大數據及行動 APP 類</div>
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <EdaRow year="2024" prize="冠軍" />
          <EdaRow year="2025" prize="IEEE Tainan Section 特別獎" />
          <EdaRow year="2026" prize="亞軍" />
          <EdaRow year="2026" prize="佳作" note="資通類" />
        </div>
      </div>
      <img
        src={awardStage}
        alt=""
        style={{ flex: 'none', width: 852, height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
    <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>
      <Shot src={eda2025Stage} ratio={1.333} />
      <Shot src={edaMrPoster} ratio={1.333} />
      <Shot src={edaParcelPoster} ratio={1.333} />
    </div>
  </div>
);

const ContestApp: Page = () => (
  <div style={{ ...canvas, display: 'flex', flexDirection: 'column', gap: 10 }}>
    <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 40px 0 120px',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.25 }}>App 行動應用創新賽</div>
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <AwardRow year="2024" prize="三等獎" prizeSize={96} />
          <AwardRow year="2026" prize="三等獎" prizeSize={96} />
        </div>
      </div>
      <img
        src={maicStage}
        alt=""
        style={{ flex: 'none', width: 951, height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
    <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>
      <Shot src={maicRoom} ratio={1.333} />
      <Shot src={maicFloorCode} ratio={0.562} />
      <Shot src={maicPlush} ratio={1.333} />
      <Shot src={maicSelfie} ratio={0.562} />
    </div>
  </div>
);

const ContestMaker: Page = () => (
  <Contest
    name={
      <>
        海峽兩岸青少年
        <br />
        創客大賽
      </>
    }
    media={
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 20 }}>
        <img
          src={makerTrophy}
          alt=""
          style={{
            flex: 'none',
            width: 435,
            height: 580,
            objectFit: 'cover',
            borderRadius: 20,
            boxShadow: '0 24px 64px rgba(0,0,0,0.16)',
          }}
        />
        <img
          src={makerBooth}
          alt=""
          style={{
            flex: 'none',
            width: 435,
            height: 580,
            objectFit: 'cover',
            borderRadius: 20,
            boxShadow: '0 24px 64px rgba(0,0,0,0.16)',
          }}
        />
      </div>
    }
  >
    <AwardRow year="2024" prize="三等獎" prizeSize={88} />
    <AwardRow
      year="2025"
      prize={
        <>
          二等獎
          <br />
          優秀展覽獎
        </>
      }
      prizeSize={88}
    />
  </Contest>
);

const StripShot = ({ src, ratio, position }: { src: string; ratio: number; position?: string }) => (
  <img
    src={src}
    alt=""
    style={{
      flex: `${ratio} 1 0`,
      minWidth: 0,
      height: 340,
      objectFit: 'cover',
      objectPosition: position ?? 'center',
      borderRadius: 18,
      display: 'block',
      boxShadow: '0 18px 48px rgba(0,0,0,0.14)',
    }}
  />
);

const ContestCell = ({
  name,
  year,
  prize,
  divided,
}: {
  name: string;
  year: string;
  prize: string;
  divided?: boolean;
}) => (
  <div
    style={{
      flex: 1,
      minWidth: 0,
      paddingLeft: divided ? 44 : 0,
      paddingRight: 44,
      borderLeft: divided ? '1px solid rgba(17,17,19,0.14)' : undefined,
    }}
  >
    <div style={{ height: 130, fontSize: 48, fontWeight: 700, lineHeight: 1.3 }}>{name}</div>
    <div style={{ fontFamily: SANS, fontSize: 32, fontWeight: 700, color: MUTED }}>{year}</div>
    <div
      style={{
        marginTop: 6,
        fontSize: 96,
        fontWeight: 700,
        lineHeight: 1.15,
        color: 'var(--osd-accent)',
      }}
    >
      {prize}
    </div>
  </div>
);

const ContestOthers: Page = () => (
  <div
    style={{
      ...canvas,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 80,
      padding: '0 140px',
    }}
  >
    <div style={{ display: 'flex', gap: 20 }}>
      <StripShot src={hackathonBooth} ratio={1.333} />
      <StripShot src={hackathonJudges} ratio={0.75} position="center 32%" />
      <StripShot src={hackathonDisplay} ratio={1.333} />
      <StripShot src={hackathonPrize} ratio={1.333} />
      <img
        src={neuroCertificate}
        alt=""
        style={{
          flex: 'none',
          width: 240,
          height: 340,
          objectFit: 'cover',
          borderRadius: 18,
          display: 'block',
          boxShadow: '0 18px 48px rgba(0,0,0,0.14)',
        }}
      />
    </div>
    <div style={{ display: 'flex' }}>
      <ContestCell name="南投山城數位黑客松" year="2024" prize="銅獎" />
      <ContestCell name="逢甲大學英文簡報比賽" year="2025" prize="佳作" divided />
      <ContestCell name="亞洲青少年腦神經科學大賽" year="2025" prize="亞軍" divided />
    </div>
  </div>
);

const PartyShot = ({ src, width }: { src: string; width: number }) => (
  <img
    src={src}
    alt=""
    style={{
      flex: 'none',
      width,
      height: 480,
      objectFit: 'cover',
      borderRadius: 20,
      display: 'block',
      boxShadow: '0 20px 56px rgba(0,0,0,0.16)',
    }}
  />
);

const PinkParty: Page = () => (
  <div
    style={{
      ...canvas,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 60,
      padding: '0 140px',
    }}
  >
    <div>
      <div style={{ fontSize: 40, color: MUTED }}>不是比賽</div>
      <div style={{ marginTop: 16, fontSize: 88, fontWeight: 700, lineHeight: 1.25 }}>
        金融研究社的 Pink Party
      </div>
      <div style={{ marginTop: 16, fontSize: 40, color: MUTED }}>
        邀請友社，還請到 Sabrina 胡恂舞
      </div>
    </div>
    <div style={{ display: 'flex', gap: 20 }}>
      <PartyShot src={pinkNeon} width={360} />
      <PartyShot src={pinkSeated} width={360} />
      <PartyShot src={pinkCrowd} width={640} />
    </div>
  </div>
);

const MoreThanContests: Page = () => (
  <Ask>
    但比賽，從來就<A>不只是比賽</A>
  </Ask>
);

const TripShot = ({ src }: { src: string }) => (
  <img
    src={src}
    alt=""
    style={{
      flex: 'none',
      width: 390,
      height: 520,
      objectFit: 'cover',
      borderRadius: 20,
      display: 'block',
      boxShadow: '0 20px 56px rgba(0,0,0,0.16)',
    }}
  />
);

const GoingOut: Page = () => (
  <div
    style={{
      ...canvas,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 60,
      padding: '0 140px',
    }}
  >
    <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.3 }}>
      比完賽，就換我們<A>出去玩</A>
    </div>
    <div style={{ display: 'flex', gap: 20 }}>
      <TripShot src={tripTrain} />
      <TripShot src={tripBreakfast} />
      <TripShot src={tripClaw} />
      <TripShot src={tripNightmarket} />
    </div>
  </div>
);

const WallShot = ({ src, position }: { src: string; position?: string }) => (
  <img
    src={src}
    alt=""
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: position ?? 'center 38%',
      display: 'block',
    }}
  />
);

const ShanghaiTrip: Page = () => (
  <div style={{ ...canvas, display: 'flex', flexDirection: 'column', gap: 10 }}>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 10,
        flex: 1,
        minHeight: 0,
      }}
    >
      <WallShot src={shBridge} />
      <WallShot src={shYuyuanNight} />
      <WallShot src={shMuseum} />
      <WallShot src={shClocktower} />
      <WallShot src={shCostume} />
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 10,
        flex: 1,
        minHeight: 0,
      }}
    >
      <WallShot src={shMcdonalds} />
      <WallShot src={shKfc} />
      <WallShot src={shCave} />
      <WallShot src={shMilktea} />
      <WallShot src={shSkewers} />
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 10,
        flex: 1,
        minHeight: 0,
      }}
    >
      <WallShot src={shYuyuanDay} position="center" />
      <WallShot src={shDinner} position="center" />
      <WallShot src={shKtv} position="center" />
      <WallShot src={shCrayfish} position="center" />
    </div>
  </div>
);

const NoLife: Page = () => (
  <Ask>
    選擇努力，真的沒有<A>生活</A>嗎？
  </Ask>
);

const NeverGiveUp: Page = () => (
  <Ask>
    不放棄任何可以<A>變好</A>的機會
  </Ask>
);

const Contact: Page = () => (
  <div
    style={{
      ...canvas,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 48,
    }}
  >
    <img
      src={lastQr}
      alt=""
      style={{
        width: 460,
        height: 460,
        display: 'block',
        filter: 'drop-shadow(0 20px 48px rgba(0,0,0,0.16))',
      }}
    />
    <div style={{ fontFamily: SANS, fontSize: 64, fontWeight: 700 }}>@cy_4.9</div>
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
  RealCollege,
  FirstContest,
  AwardWin,
  TeachersNoticed,
  NotOnlyGrades,
  ManyContests,
  ContestOthers,
  ContestEda,
  MoreThanContests,
  GoingOut,
  ContestApp,
  Blank,
  ContestMaker,
  ShanghaiTrip,
  NeverGiveUp,
  Blank,
  NoLife,
  PinkParty,
  Blank,
  ClubIsYourChoice,
  Closing,
  Contact,
] satisfies Page[];
