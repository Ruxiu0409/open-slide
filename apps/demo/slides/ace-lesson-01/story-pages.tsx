import { type Page, useSlidePageNumber } from '@open-slide/core';
import { useLayoutEffect, useRef, useState } from 'react';
import competitionActivity01 from '../my-story-30min-figma/assets/competition-activity-01.jpeg';
import competitionActivity02 from '../my-story-30min-figma/assets/competition-activity-02-landscape.jpeg';
import competitionActivity03 from '../my-story-30min-figma/assets/competition-activity-03.jpeg';
import competitionActivity04 from '../my-story-30min-figma/assets/competition-activity-04-landscape.jpeg';
import competitionActivity05 from '../my-story-30min-figma/assets/competition-activity-05-landscape.jpeg';
import competitionActivity06 from '../my-story-30min-figma/assets/competition-activity-06.jpeg';
import contestCanBeFunJudging from '../my-story-30min-figma/assets/contest-can-be-fun-judging.jpeg';
import contestCanBeFunTeam from '../my-story-30min-figma/assets/contest-can-be-fun-team.jpeg';
import contestCanBeFunTrophy from '../my-story-30min-figma/assets/contest-can-be-fun-trophy.jpeg';
import highSchoolClubPhoto from '../my-story-30min-figma/assets/high-school-club.jpeg';
import awardTeamPhoto from '../my-story-30min-figma/assets/national-electronic-design-award.jpg';
import realRouteMap from '../my-story-30min-figma/assets/real-route-map.png';
import shanghaiFunCalligraphy from '../my-story-30min-figma/assets/shanghai-fun-calligraphy.jpeg';
import shanghaiFunCityModel from '../my-story-30min-figma/assets/shanghai-fun-citymodel.jpeg';
import shanghaiFunDrinks from '../my-story-30min-figma/assets/shanghai-fun-drinks.jpeg';
import shanghaiFunHanfu from '../my-story-30min-figma/assets/shanghai-fun-hanfu.jpeg';
import shanghaiFunSelfie from '../my-story-30min-figma/assets/shanghai-fun-selfie.jpeg';
import shanghaiFunYuyuan from '../my-story-30min-figma/assets/shanghai-fun-yuyuan.jpeg';
import shanghaiGradTrip01 from '../my-story-30min-figma/assets/shanghai-grad-trip-01.mp4';
import shanghaiGradTrip02 from '../my-story-30min-figma/assets/shanghai-grad-trip-02.mp4';
import shanghaiGradTrip03 from '../my-story-30min-figma/assets/shanghai-grad-trip-03.mp4';
import shanghaiLuggagePhoto from '../my-story-30min-figma/assets/shanghai-luggage.jpeg';
import sportsClassPhoto from '../my-story-30min-figma/assets/sports-class.jpeg';

const palette = {
  bg: '#ffffff',
  canvas: '#ffffff',
  text: '#000000',
  muted: '#4a4a4a',
  faint: '#6f6f6f',
  line: '#e6e6e6',
  mint: '#c8e6cd',
  coral: '#f3c9b6',
  gold: '#f4ecd6',
  blue: '#c5b0f4',
  primary: '#ff3d8b',
  surface: '#ffffff',
  surfaceStrong: '#f7f7f5',
  lime: '#dceeb1',
  lilac: '#c5b0f4',
  cream: '#f4ecd6',
  pink: '#efd4d4',
  navy: '#1f1d3d',
  black: '#000000',
};

const fill = {
  width: '100%',
  height: '100%',
  fontFamily: 'var(--osd-font-body)',
  color: 'var(--osd-text)',
  background: 'var(--osd-bg)',
  position: 'relative',
  overflow: 'hidden',
} as const;

const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';

const keyframes = `
@keyframes storyFadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes storyFade {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes storyLine {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@keyframes storyRoute {
  from { stroke-dashoffset: 620; }
  to { stroke-dashoffset: 0; }
}
@keyframes storyPulse {
  0%, 100% { transform: scale(1); opacity: 0.74; }
  50% { transform: scale(1.55); opacity: 0.18; }
}
.story-fadeup { animation: storyFadeUp 900ms ${ease} both; }
.story-fade { animation: storyFade 1000ms ${ease} both; }
.story-line { animation: storyLine 1100ms ${ease} both; transform-origin: left center; }
.story-route { stroke-dasharray: 620; stroke-dashoffset: 620; animation: storyRoute 1800ms ${ease} 520ms both; }
.story-pulse { transform-box: fill-box; transform-origin: center; animation: storyPulse 1800ms ease-in-out infinite; }
`;

const Style = () => <style>{keyframes}</style>;

const PAD_X = 156;

const PAD_Y = 92;

const PageShell = ({
  children,
  section = 'My story',
  accent = palette.mint,
  showNumber = true,
  showHeader = true,
  mode = 'light',
}: {
  children: React.ReactNode;
  section?: string;
  accent?: string;
  showNumber?: boolean;
  showHeader?: boolean;
  mode?: 'light' | 'dark';
}) => {
  const isDark = mode === 'dark';
  const pageBg = isDark ? palette.black : palette.bg;
  const pageText = isDark ? '#ffffff' : palette.text;
  const pageMuted = isDark ? 'rgba(255,255,255,0.68)' : palette.muted;
  const pageAccent = accent;

  return (
    <div style={{ ...fill, background: pageBg, color: pageText }}>
      <Style />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: -112,
          top: 152,
          width: 360,
          height: 230,
          borderRadius: 36,
          background: isDark ? palette.lilac : pageAccent,
          opacity: isDark ? 0.16 : 0.2,
          transform: 'rotate(-8deg)',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: -92,
          bottom: 116,
          width: 250,
          height: 170,
          borderRadius: 32,
          background: isDark ? palette.lime : palette.cream,
          opacity: isDark ? 0.18 : 0.55,
          transform: 'rotate(7deg)',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: `${PAD_Y}px ${PAD_X}px`,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1,
        }}
      >
        {showHeader ? (
          <div
            className="story-fade"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: '"SF Mono", "Figma Mono", ui-monospace, monospace',
              fontSize: 14,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: pageMuted,
            }}
          >
            <span style={{ color: pageAccent, fontWeight: 700 }}>{section}</span>
            <span>30 min share</span>
          </div>
        ) : null}
        {children}
      </div>
      {showNumber ? (
        <PageNumber accent={pageAccent} muted={isDark ? 'rgba(245,245,247,0.38)' : palette.faint} />
      ) : null}
    </div>
  );
};

const PageNumber = ({ accent, muted = palette.faint }: { accent: string; muted?: string }) => {
  const { current, total } = useSlidePageNumber();

  return (
    <div
      style={{
        position: 'absolute',
        left: PAD_X,
        bottom: 52,
        color: muted,
        fontFamily: '"SF Mono", "Figma Mono", ui-monospace, monospace',
        fontSize: 14,
        letterSpacing: '0.06em',
        display: 'flex',
        gap: 14,
        alignItems: 'center',
      }}
    >
      <span style={{ color: accent }}>{String(current).padStart(2, '0')}</span>
      <span>/</span>
      <span>{String(total).padStart(2, '0')}</span>
    </div>
  );
};

const HugeTitle = ({
  children,
  size = 112,
  maxWidth = 1300,
  minSize,
  lineHeight = 1,
  letterSpacing = -1.2,
  fontWeight = 340,
  animationClass = 'story-fadeup',
}: {
  children: React.ReactNode;
  size?: number;
  maxWidth?: number;
  minSize?: number;
  lineHeight?: number;
  letterSpacing?: number | string;
  fontWeight?: number;
  animationClass?: string;
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const fittedMinSize = minSize ?? Math.max(36, Math.floor(size * 0.45));
  const [fittedSize, setFittedSize] = useState(size);

  // biome-ignore lint/correctness/useExhaustiveDependencies: children must stay a dependency so the auto-fit remeasures when the title text changes
  useLayoutEffect(() => {
    const frame = frameRef.current;
    const title = titleRef.current;

    if (!frame || !title) {
      return;
    }

    let frameId = 0;
    let cancelled = false;

    const measure = () => {
      if (cancelled) {
        return;
      }

      const availableWidth = frame.clientWidth;
      if (!availableWidth) {
        return;
      }

      const previousFontSize = title.style.fontSize;
      title.style.fontSize = `${size}px`;
      const requiredWidth = title.scrollWidth;
      title.style.fontSize = previousFontSize;

      const nextSize =
        requiredWidth > availableWidth
          ? Math.max(fittedMinSize, Math.floor(size * (availableWidth / requiredWidth)))
          : size;

      setFittedSize((current) => (current === nextSize ? current : nextSize));
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(measure);
    };

    scheduleMeasure();

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(frame);

    const fontReady = document.fonts?.ready;
    if (fontReady) {
      void fontReady.then(() => {
        scheduleMeasure();
      });
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [children, fittedMinSize, size]);

  return (
    <div ref={frameRef} style={{ width: '100%', maxWidth }}>
      <h1
        ref={titleRef}
        className={animationClass}
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: fittedSize,
          fontWeight,
          lineHeight,
          letterSpacing,
          margin: 0,
          whiteSpace: 'nowrap',
          display: 'inline-block',
        }}
      >
        {children}
      </h1>
    </div>
  );
};

const Lead = ({
  children,
  maxWidth = 1080,
  delay = 150,
  size = 32,
  lineHeight = 1.48,
  opacity = 0.72,
}: {
  children: React.ReactNode;
  maxWidth?: number;
  delay?: number;
  size?: number;
  lineHeight?: number;
  opacity?: number;
}) => (
  <p
    className="story-fadeup"
    style={{
      animationDelay: `${delay}ms`,
      fontSize: size,
      lineHeight,
      color: 'currentColor',
      opacity,
      margin: 0,
      maxWidth,
    }}
  >
    {children}
  </p>
);

const AccentLine = ({
  color: _color = palette.mint,
  delay = 120,
}: {
  color?: string;
  delay?: number;
}) => (
  <div
    className="story-line"
    style={{
      animationDelay: `${delay}ms`,
      width: 120,
      height: 4,
      background: palette.primary,
      borderRadius: 999,
      margin: '32px 0',
    }}
  />
);

const RouteMap = ({ height = 250, delay = 260 }: { height?: number | string; delay?: number }) => {
  const routeD =
    'M 594 18 C 540 18 492 20 440 24 C 390 28 344 34 318 54 C 298 70 282 96 260 123 C 232 158 202 196 150 238';

  return (
    <div
      className="story-fadeup"
      style={{
        animationDelay: `${delay}ms`,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 18,
        background: palette.surface,
        border: `1px solid ${palette.line}`,
        height,
      }}
    >
      <img
        src={realRouteMap}
        alt="逢甲大學到台中至善國中的真實地圖路線"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '50% 47%',
          display: 'block',
          filter: 'saturate(0.95) contrast(1.02)',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.12)' }} />
      <div style={{ position: 'absolute', left: 18, top: 16, zIndex: 3 }}>
        <div style={{ color: palette.primary, fontSize: 18, fontWeight: 700 }}>幾個路口的距離</div>
        <div style={{ marginTop: 4, color: palette.text, fontSize: 24, fontWeight: 700 }}>
          逢甲大學 → 至善國中
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 18,
          top: 18,
          zIndex: 3,
          borderRadius: 999,
          padding: '9px 14px',
          background: 'rgba(255,255,255,0.92)',
          boxShadow: '0 8px 26px rgba(29,29,31,0.12)',
          color: palette.primary,
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        近到有點意外
      </div>
      <svg
        viewBox="0 0 680 250"
        width="100%"
        height="100%"
        aria-label="逢甲大學到至善國中的路線動畫"
        style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}
      >
        <path
          d={routeD}
          fill="none"
          stroke="rgba(0,102,204,0.16)"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="story-route"
          d={routeD}
          fill="none"
          stroke={palette.primary}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="594" cy="18" r="18" fill="#ffffff" stroke={palette.primary} strokeWidth="5" />
        <circle cx="594" cy="18" r="7" fill={palette.primary} />
        <circle cx="150" cy="238" r="18" fill="#ffffff" stroke="#d93025" strokeWidth="5" />
        <circle cx="150" cy="238" r="7" fill="#d93025" />
        <circle className="story-pulse" cx="150" cy="238" r="14" fill="#d93025" />
        <circle r="9" fill={palette.primary} stroke="#ffffff" strokeWidth="4">
          <animateMotion dur="3.2s" repeatCount="indefinite" path={routeD} />
        </circle>
      </svg>
      <div
        style={{
          position: 'absolute',
          right: 18,
          bottom: 16,
          zIndex: 3,
          padding: '8px 12px',
          borderRadius: 12,
          background: 'rgba(255,255,255,0.92)',
          boxShadow: '0 8px 26px rgba(29,29,31,0.1)',
          color: palette.text,
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        逢甲大學大門口
      </div>
      <div
        style={{
          position: 'absolute',
          left: 18,
          bottom: 16,
          zIndex: 3,
          padding: '8px 12px',
          borderRadius: 12,
          background: 'rgba(255,255,255,0.92)',
          boxShadow: '0 8px 26px rgba(29,29,31,0.1)',
          color: palette.text,
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        台中至善國中門口
      </div>
    </div>
  );
};

export const StoryRoots: Page = () => (
  <PageShell section="My roots" accent={palette.gold}>
    <div
      style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '0.8fr 1.2fr',
        gap: 56,
        alignItems: 'stretch',
      }}
    >
      <div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 0 }}
      >
        <div>
          <div
            className="story-fadeup"
            style={{
              color: palette.primary,
              fontSize: 28,
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            在介紹以前的我之前
          </div>
          <HugeTitle size={88} maxWidth={760}>
            我其實是從體育班開始的。
          </HugeTitle>
          <AccentLine color={palette.gold} />
          <Lead maxWidth={660}>
            我想先打破一個想像：我不是從小就很會寫程式，也不是一開始就知道自己要走資訊。我的起點跟大家想像的不太一樣，但改變就是從這種普通又不確定的地方開始。
          </Lead>
        </div>

        <div style={{ display: 'grid', gap: 18, alignContent: 'end' }}>
          <div
            className="story-fadeup"
            style={{
              animationDelay: '180ms',
              maxWidth: 540,
              borderLeft: `4px solid ${palette.gold}`,
              paddingLeft: 22,
            }}
          >
            <div style={{ color: palette.gold, fontSize: 18, fontWeight: 800, marginBottom: 12 }}>
              真正想說的是
            </div>
            <div style={{ fontSize: 33, fontWeight: 650, lineHeight: 1.28 }}>
              改變不一定從很遠的地方開始。
            </div>
          </div>

          <div
            className="story-fadeup"
            style={{
              animationDelay: '140ms',
              borderRadius: 18,
              overflow: 'hidden',
              background: palette.canvas,
              border: `1px solid ${palette.line}`,
            }}
          >
            <img
              src={sportsClassPhoto}
              alt="至善國中體育班合照"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ minHeight: 0, display: 'flex' }}>
        <RouteMap height="100%" delay={180} />
      </div>
    </div>
  </PageShell>
);

export const StoryHighSchoolClub: Page = () => (
  <PageShell section="High school" accent={palette.coral}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 34 }}>
      <div style={{ width: '100%' }}>
        <div
          className="story-fadeup"
          style={{
            color: palette.primary,
            fontSize: 26,
            fontWeight: 600,
            marginBottom: 22,
          }}
        >
          高中：台中二中
        </div>
        <HugeTitle size={76} maxWidth={1460}>
          高中社團，現代視覺文化同人社。
        </HugeTitle>
        <AccentLine color={palette.coral} />
        <Lead maxWidth={1460}>
          它叫「現代視覺文化同人社」。不是資訊社、不是競賽隊，也不是看起來會直接變成成果的地方。但那時候的我，就是被創作、視覺文化和同人作品吸引。
        </Lead>
      </div>
      <div
        className="story-fadeup"
        style={{
          animationDelay: '160ms',
          height: 560,
          borderRadius: 18,
          border: `1px solid rgba(29,29,31,0.12)`,
          background: '#1d1d1f',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src={highSchoolClubPhoto}
          alt="高中同人社照片"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '48% 48%',
            display: 'block',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.08) 58%, rgba(0,0,0,0.76) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 34,
            top: 34,
            bottom: 30,
            width: 340,
            color: '#f5f5f7',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ color: 'rgba(245,245,247,0.82)', fontSize: 25, lineHeight: 1.34 }}>
              這不是一個「跟現在成果有關」的社團。
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 22 }}>
              {['創作', '視覺文化', '同人作品', '好奇心'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    borderRadius: 999,
                    border: '1px solid rgba(245,245,247,0.28)',
                    background: 'rgba(245,245,247,0.08)',
                    padding: '8px 13px',
                    color: 'rgba(245,245,247,0.88)',
                    fontSize: 17,
                    fontWeight: 700,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div style={{ color: 'rgba(245,245,247,0.68)', fontSize: 19, lineHeight: 1.42 }}>
              它代表的不是成果，而是我願意走進一個完全不同的世界。
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageShell>
);

const experienceStats = [
  {
    title: '競賽',
    count: '10+',
    detail: '電子設計、海峽創客、腦神經科學、黑客松',
    focus: '不是為了堆數量，而是不斷把想法丟進真實評審和時限裡。',
  },
  {
    title: '開發',
    count: '3',
    detail: '半逢遇甲、行動逢甲、KindReach',
    focus: '每個專案都逼我從功能思維，慢慢走向真正要解的使用者問題。',
  },
  {
    title: '幹部與社群',
    count: '5+',
    detail: 'iOS Club 社長、GDG on Campus Associate Lead',
    focus: '開始學的不只是自己做，而是怎麼把一群人帶到同一個方向。',
  },
  {
    title: '教學與助教',
    count: '8+',
    detail: 'iOS、程式設計、Swift Camp、Code for Future',
    focus: '教別人的時候，我也被迫把模糊的理解整理成真的能被帶走的方法。',
  },
  {
    title: '講座',
    count: '3',
    detail: '企業宣講、Developer Workshop、校園社群分享',
    focus: '站上台後我更明白，表達不是背稿，而是把經驗整理成別人聽得懂的形狀。',
  },
  {
    title: '證照',
    count: '9+',
    detail: 'Apple、Swift、GenAI、Linux、EMT-1',
    focus: '它們不是亮點本身，比較像是我願意一路把基礎補齊的證明。',
  },
] as const;

export const StoryExperienceWall: Page = () => (
  <PageShell section="The present" accent={palette.blue}>
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        paddingTop: 34,
        paddingBottom: 8,
      }}
    >
      <div
        style={{
          minHeight: 190,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <HugeTitle size={70} maxWidth={1180}>
          那現在的我，是什麼樣子？
        </HugeTitle>
        <p
          className="story-fadeup"
          style={{
            animationDelay: '100ms',
            fontSize: 28,
            lineHeight: 1.38,
            color: palette.muted,
            margin: '18px 0 0',
            maxWidth: 1520,
            whiteSpace: 'nowrap',
          }}
        >
          經歷看起來很多，但這頁不逐條念。重點是：它們不是突然出現，而是一次一次嘗試累積出來的。
        </p>
      </div>

      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
          gap: 20,
        }}
      >
        {experienceStats.map(({ title, count, detail, focus }, i) => (
          <div
            key={title}
            className="story-fadeup"
            style={{
              animationDelay: `${140 + i * 70}ms`,
              minHeight: 0,
              borderRadius: 18,
              border: `1px solid ${palette.line}`,
              background: palette.surface,
              padding: '28px 30px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 18,
                }}
              >
                <div
                  style={{ color: palette.text, fontSize: 38, fontWeight: 800, lineHeight: 1.08 }}
                >
                  {title}
                </div>
                <div
                  style={{
                    color: palette.primary,
                    fontSize: 54,
                    fontWeight: 800,
                    lineHeight: 0.95,
                  }}
                >
                  {count}
                </div>
              </div>
              <div style={{ color: palette.muted, fontSize: 27, lineHeight: 1.32 }}>{detail}</div>
            </div>
            <div
              style={{
                marginTop: 16,
                paddingTop: 16,
                borderTop: `1px solid ${palette.line}`,
                color: palette.text,
                fontSize: 23,
                lineHeight: 1.34,
                fontWeight: 650,
              }}
            >
              {focus}
            </div>
          </div>
        ))}
      </div>
    </div>
  </PageShell>
);

export const StoryAwardMoment: Page = () => (
  <PageShell section="Award moment" accent={palette.primary}>
    <div
      style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.08fr 0.92fr',
        gap: 44,
        minHeight: 0,
        alignItems: 'stretch',
      }}
    >
      <div
        className="story-fadeup"
        style={{
          borderRadius: 32,
          overflow: 'hidden',
          position: 'relative',
          background: palette.text,
          border: `1px solid ${palette.black}`,
          boxShadow: '14px 14px 0 rgba(255,61,139,0.28)',
          minHeight: 0,
        }}
      >
        <img
          src={awardTeamPhoto}
          alt="逢甲大學資訊工程學系團隊獲 2024 全國電子設計創意競賽智慧大數據及行動 APP 類冠軍"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 50%',
            display: 'block',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.02) 42%, rgba(0,0,0,0.78) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 34,
            right: 34,
            bottom: 30,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          <div>
            <div
              style={{
                color: 'rgba(255,255,255,0.76)',
                fontSize: 22,
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              2024 全國電子設計創意競賽
            </div>
            <div style={{ color: '#fff', fontSize: 46, lineHeight: 1.02, fontWeight: 900 }}>
              智慧大數據及行動 APP 類冠軍
            </div>
          </div>
          <div
            style={{
              borderRadius: 999,
              padding: '14px 22px',
              background: 'rgba(255,255,255,0.92)',
              color: palette.black,
              fontSize: 22,
              fontWeight: 900,
              whiteSpace: 'nowrap',
            }}
          >
            冠軍
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          gap: 24,
          minHeight: 0,
        }}
      >
        <div>
          <div
            className="story-fadeup"
            style={{
              animationDelay: '120ms',
              color: palette.primary,
              fontSize: 24,
              fontWeight: 900,
              marginBottom: 20,
            }}
          >
            從「我可以幫什麼」到「我們做到了」
          </div>
          <HugeTitle size={68} maxWidth={760}>
            第一次走進比賽，我們拿到了冠軍。
          </HugeTitle>
        </div>

        <div
          className="story-fadeup"
          style={{
            animationDelay: '200ms',
            borderRadius: 28,
            border: `1px solid ${palette.line}`,
            background: '#fff',
            padding: '30px 32px',
            display: 'grid',
            gap: 12,
            minHeight: 0,
            boxShadow: '10px 10px 0 rgba(220,238,177,0.95)',
          }}
        >
          {[
            ['賽事', '2024 第二十屆全國電子設計創意競賽'],
            ['作品', '基於影像辨識與互動回饋輔助輪椅族群運動之應用程式'],
            ['結果', '智慧大數據及行動 APP 類 冠軍'],
          ].map(([label, value], i) => (
            <div
              key={label}
              style={{
                display: 'grid',
                gridTemplateColumns: '118px 1fr',
                gap: 24,
                alignItems: 'center',
                minHeight: i === 1 ? 116 : 78,
                padding: i === 1 ? '14px 0' : '8px 0',
                borderTop: i === 0 ? 'none' : `1px solid ${palette.line}`,
              }}
            >
              <div
                style={{
                  color: i === 2 ? palette.black : palette.primary,
                  fontSize: 28,
                  lineHeight: 1.05,
                  fontWeight: 950,
                  letterSpacing: '0.02em',
                }}
              >
                {label}
              </div>
              <div
                style={{
                  color: palette.text,
                  fontSize: i === 1 ? 36 : 40,
                  lineHeight: i === 1 ? 1.18 : 1.12,
                  fontWeight: i === 2 ? 930 : 820,
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        <div
          className="story-fadeup"
          style={{
            animationDelay: '300ms',
            borderRadius: 24,
            background: palette.black,
            color: '#fff',
            padding: '28px 32px',
            display: 'grid',
            gap: 12,
          }}
        >
          <div style={{ color: palette.lime, fontSize: 22, fontWeight: 900 }}>我後來才懂</div>
          <div style={{ fontSize: 34, lineHeight: 1.28, fontWeight: 820 }}>
            我一開始只是想幫上忙，後來才發現自己真的在團隊裡有位置。
          </div>
          <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: 19, lineHeight: 1.4 }}>
            Source: 逢甲大學資訊工程學系新聞，2024-03-28
          </div>
        </div>
      </div>
    </div>
  </PageShell>
);

const activityPhotoCards = [
  {
    src: competitionActivity03,
    alt: '設計思考活動現場，講者正在介紹雙鑽流程',
    objectPosition: 'center 46%',
    style: { left: 414, top: 38, width: 474, height: 224 },
  },
  {
    src: competitionActivity02,
    alt: 'Today at Apple 的 Swift 活動看板與討論人群',
    objectPosition: 'center 56%',
    style: { left: 916, top: 38, width: 474, height: 224 },
  },
  {
    src: competitionActivity01,
    alt: '比賽相關講座現場，投影片上寫著真實感的計畫書',
    objectPosition: 'center 44%',
    style: { left: 414, top: 286, width: 474, height: 224 },
  },
  {
    src: competitionActivity04,
    alt: 'iCHEF 團隊組成與完整工程團隊支援簡報',
    objectPosition: 'center 47%',
    style: { left: 916, top: 286, width: 474, height: 224 },
  },
  {
    src: competitionActivity05,
    alt: 'Apple 平台進階技術簡報，內容包含 Vision、Speech、Natural Language',
    objectPosition: 'center 50%',
    style: { left: 414, top: 534, width: 474, height: 224 },
  },
  {
    src: competitionActivity06,
    alt: '故事重要元素簡報，包含 Set-up、Conflict、Resolution',
    objectPosition: 'center 42%',
    style: { left: 916, top: 534, width: 474, height: 224 },
  },
] as const;

export const StoryActivityHunt: Page = () => (
  <PageShell section="Activity hunt" accent={palette.primary} mode="dark">
    <div
      style={{
        flex: 1,
        position: 'relative',
        minHeight: 0,
        marginTop: 24,
      }}
    >
      <div
        className="story-fadeup"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 38,
          border: '2px solid rgba(255,255,255,0.82)',
          background:
            'radial-gradient(circle at 24px 24px, rgba(255,255,255,0.15) 1.8px, transparent 1.8px), linear-gradient(135deg, #0c0c0f 0%, #181820 58%, #0f0f12 100%)',
          backgroundSize: '42px 42px, 100% 100%',
          overflow: 'hidden',
          boxShadow: '18px 18px 0 rgba(255,61,139,0.24)',
        }}
      >
        <svg
          aria-hidden
          viewBox="0 0 1608 800"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            color: palette.lime,
            opacity: 0.22,
          }}
        >
          <path
            className="story-route"
            d="M-40 688 C 36 624, 114 596, 202 618"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            className="story-route"
            d="M1468 146 C 1418 194, 1376 252, 1338 326"
            fill="none"
            stroke={palette.primary}
            strokeLinecap="round"
            strokeWidth="3"
            style={{ animationDelay: '360ms' }}
          />
        </svg>

        <div
          className="story-fadeup"
          style={{
            animationDelay: '120ms',
            position: 'absolute',
            left: 46,
            top: 86,
            width: 318,
            borderRadius: 28,
            border: `2px solid ${palette.black}`,
            background: palette.cream,
            color: palette.black,
            padding: '24px 26px 24px',
            transform: 'rotate(-0.6deg)',
            boxShadow: '8px 8px 0 rgba(220,238,177,0.72)',
            zIndex: 5,
          }}
        >
          <div
            style={{
              color: palette.primary,
              fontSize: 17,
              fontWeight: 950,
              letterSpacing: '0.06em',
              marginBottom: 14,
            }}
          >
            我開始瘋狂參與活動
          </div>
          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 46,
              lineHeight: 1.03,
              fontWeight: 920,
              letterSpacing: -0.4,
            }}
          >
            只要跟比賽有關，
            <br />
            我就去。
          </div>
          <div
            style={{
              marginTop: 16,
              color: palette.muted,
              fontSize: 20,
              lineHeight: 1.34,
              fontWeight: 560,
            }}
          >
            講座、工作坊、分享、團隊討論，只要能讓我離比賽更近一點，我都想去看、去聽、去學。
          </div>
          <div
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: `2px solid rgba(0,0,0,0.1)`,
              display: 'grid',
              gap: 6,
            }}
          >
            <div style={{ color: palette.primary, fontSize: 18, lineHeight: 1.2, fontWeight: 900 }}>
              有關就去，去了就學。
            </div>
            <div style={{ color: palette.black, fontSize: 17, lineHeight: 1.28, fontWeight: 760 }}>
              不是刷履歷，是把自己丟進更多方法裡。
            </div>
          </div>
        </div>

        {activityPhotoCards.map(({ src, alt, style, objectPosition }, i) => (
          <div
            key={alt}
            className="story-fadeup"
            style={{
              animationDelay: `${220 + i * 70}ms`,
              position: 'absolute',
              borderRadius: 18,
              border: `2px solid ${palette.black}`,
              background: '#fff',
              padding: 4,
              boxShadow:
                i % 2 === 0
                  ? '7px 7px 0 rgba(255,255,255,0.13)'
                  : '7px 7px 0 rgba(255,61,139,0.17)',
              zIndex: 3,
              ...style,
            }}
          >
            <img
              src={src}
              alt={alt}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 12,
                objectFit: 'cover',
                objectPosition: objectPosition ?? 'center',
                display: 'block',
                filter: 'contrast(1.05) saturate(0.92)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  </PageShell>
);

export const StoryFirstTimeAbroad: Page = () => (
  <PageShell section="First abroad" accent={palette.lime} showHeader={false} mode="dark">
    <div
      style={{
        flex: 1,
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div
        aria-hidden
        className="story-fade"
        style={{
          position: 'absolute',
          width: 900,
          height: 520,
          borderRadius: 80,
          background: 'linear-gradient(135deg, rgba(220,238,177,0.2), rgba(255,61,139,0.14))',
          transform: 'rotate(-4deg)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <HugeTitle size={138} maxWidth={1380} fontWeight={920}>
          這是我第一次出國。
        </HugeTitle>
      </div>
    </div>
  </PageShell>
);

export const StorySummerScheduleClash: Page = () => (
  <PageShell section="Summer clash" accent={palette.gold} showHeader={false} mode="dark">
    <div
      style={{
        flex: 1,
        position: 'relative',
        minHeight: 0,
        marginTop: 12,
      }}
    >
      <div
        className="story-fadeup"
        style={{
          position: 'absolute',
          inset: '0 0 10px',
          borderRadius: 42,
          border: '2px solid rgba(255,255,255,0.78)',
          background: palette.black,
          overflow: 'hidden',
          boxShadow: '18px 18px 0 rgba(244,236,214,0.22)',
        }}
      >
        <img
          src={shanghaiLuggagePhoto}
          alt="準備出發到上海參加競賽時的行李"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 52%',
            display: 'block',
            filter: 'saturate(0.9) contrast(1.08)',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.62) 39%, rgba(0,0,0,0.18) 72%, rgba(0,0,0,0.48) 100%)',
          }}
        />

        <div
          className="story-fadeup"
          style={{
            animationDelay: '120ms',
            position: 'absolute',
            left: 58,
            top: 58,
            display: 'flex',
            gap: 14,
            alignItems: 'center',
            fontFamily: '"SF Mono", "Figma Mono", ui-monospace, monospace',
            fontSize: 18,
            lineHeight: 1,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 900,
          }}
        >
          <span style={{ color: palette.gold }}>2024 summer</span>
          <span style={{ color: 'rgba(255,255,255,0.42)' }}>/</span>
          <span style={{ color: palette.lime }}>two contests, same week</span>
        </div>

        <div
          className="story-fadeup"
          style={{
            animationDelay: '220ms',
            position: 'absolute',
            left: 58,
            bottom: 70,
            width: 760,
            color: '#fff',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 78,
              lineHeight: 1.02,
              letterSpacing: -1.2,
              fontWeight: 930,
              margin: 0,
              textShadow: '0 18px 54px rgba(0,0,0,0.5)',
            }}
          >
            那年暑假，
            <br />
            兩場競賽直接撞期。
          </h1>
          <div
            style={{
              marginTop: 28,
              color: 'rgba(255,255,255,0.78)',
              fontSize: 31,
              lineHeight: 1.38,
              fontWeight: 560,
              maxWidth: 720,
            }}
          >
            MAIC
            行動應用創新賽和海峽兩岸青少年創客大賽時間衝突。同學已經飛到上海，而我晚了幾天，只有同隊的夥伴跟我一起飛。
          </div>
        </div>

        <div
          className="story-fadeup"
          style={{
            animationDelay: '360ms',
            position: 'absolute',
            right: 72,
            top: 80,
            width: 480,
            borderRadius: 34,
            border: `2px solid ${palette.black}`,
            background: palette.cream,
            color: palette.black,
            padding: '36px 38px',
            transform: 'rotate(2deg)',
            boxShadow: '14px 14px 0 rgba(255,61,139,0.32)',
          }}
        >
          <div
            style={{
              color: palette.primary,
              fontFamily: '"SF Mono", "Figma Mono", ui-monospace, monospace',
              fontSize: 17,
              lineHeight: 1,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 950,
              marginBottom: 26,
            }}
          >
            schedule collision
          </div>
          <div style={{ display: 'grid', gap: 22 }}>
            {[
              ['MAIC', '先完成行動應用創新賽'],
              ['上海', '晚幾天接上創客大賽'],
              ['同行', '只剩同隊夥伴一起飛'],
            ].map(([label, text], i) => (
              <div
                key={label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '96px 1fr',
                  gap: 18,
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: 82,
                    height: 82,
                    borderRadius: '50%',
                    background: i === 1 ? palette.lime : i === 2 ? palette.lilac : palette.primary,
                    color: i === 0 ? '#fff' : palette.black,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 22,
                    fontWeight: 950,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{ color: palette.black, fontSize: 28, lineHeight: 1.25, fontWeight: 840 }}
                >
                  {text}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="story-fadeup"
          style={{
            animationDelay: '560ms',
            position: 'absolute',
            right: 118,
            bottom: 86,
            borderRadius: 999,
            border: `2px solid ${palette.black}`,
            background: palette.black,
            color: '#fff',
            padding: '20px 30px',
            fontSize: 31,
            lineHeight: 1,
            fontWeight: 950,
            boxShadow: '10px 10px 0 rgba(220,238,177,0.36)',
          }}
        >
          行李一拉，就接下一場。
        </div>
      </div>
    </div>
  </PageShell>
);

export const StoryAbroadWithFriends: Page = () => (
  <PageShell section="Travel mood" accent={palette.lilac} showHeader={false} mode="dark">
    <div
      style={{
        flex: 1,
        position: 'relative',
        minHeight: 0,
        marginTop: 10,
      }}
    >
      <div
        className="story-fadeup"
        style={{
          position: 'absolute',
          inset: '0 0 10px',
          borderRadius: 42,
          border: '2px solid rgba(255,255,255,0.78)',
          background:
            'radial-gradient(circle at 20% 18%, rgba(197,176,244,0.34), transparent 34%), linear-gradient(135deg, #08080a 0%, #16111e 48%, #2b120f 100%)',
          overflow: 'hidden',
          boxShadow: '18px 18px 0 rgba(255,61,139,0.22)',
        }}
      >
        <img
          src={shanghaiFunYuyuan}
          alt="上海豫園夜景"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.72,
            filter: 'saturate(1.08) contrast(1.02)',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.5) 36%, rgba(0,0,0,0.18) 62%, rgba(0,0,0,0.66) 100%)',
          }}
        />

        <div
          className="story-fadeup"
          style={{
            animationDelay: '120ms',
            position: 'absolute',
            left: 68,
            top: 72,
            width: 710,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              borderRadius: 999,
              border: '2px solid rgba(255,255,255,0.72)',
              background: 'rgba(8,8,10,0.62)',
              color: palette.lime,
              fontFamily: '"SF Mono", "Figma Mono", ui-monospace, monospace',
              fontSize: 18,
              lineHeight: 1,
              fontWeight: 950,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '14px 18px',
              marginBottom: 28,
              backdropFilter: 'blur(14px)',
            }}
          >
            <span
              style={{ width: 10, height: 10, borderRadius: '50%', background: palette.primary }}
            />
            Shanghai / after contest
          </div>
          <h1
            style={{
              fontFamily: 'var(--osd-font-display)',
              color: '#fff',
              fontSize: 82,
              lineHeight: 1.02,
              letterSpacing: -1.2,
              fontWeight: 930,
              margin: 0,
              textShadow: '0 18px 48px rgba(0,0,0,0.5)',
            }}
          >
            與其說是
            <br />
            出國競賽，
            <br />
            更像是跟同學
            <br />
            出國玩。
          </h1>
        </div>

        <div
          className="story-fadeup"
          style={{
            animationDelay: '260ms',
            position: 'absolute',
            left: 80,
            bottom: 76,
            width: 640,
            borderRadius: 30,
            border: '2px solid rgba(255,255,255,0.76)',
            background: 'rgba(8,8,10,0.7)',
            color: '#fff',
            padding: '26px 30px',
            boxShadow: '12px 12px 0 rgba(197,176,244,0.2)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div
            style={{
              color: palette.lilac,
              fontSize: 19,
              fontWeight: 950,
              letterSpacing: '0.08em',
              marginBottom: 16,
            }}
          >
            TRAVEL LOG
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.25, fontWeight: 820 }}>
            競賽壓力是真的，但第一次出國、第一次跟同學一起走在陌生城市，也是真的。
          </div>
        </div>

        {[
          {
            src: shanghaiFunSelfie,
            label: '同學合照',
            left: 910,
            top: 70,
            width: 500,
            height: 285,
            rotate: -3,
            delay: 340,
          },
          {
            src: shanghaiFunCityModel,
            label: '城市模型',
            left: 1116,
            top: 304,
            width: 330,
            height: 288,
            rotate: 4,
            delay: 430,
          },
          {
            src: shanghaiFunDrinks,
            label: '喜茶補給',
            left: 808,
            top: 392,
            width: 282,
            height: 374,
            rotate: -5,
            delay: 520,
          },
          {
            src: shanghaiFunHanfu,
            label: '亂入換裝',
            left: 1128,
            top: 614,
            width: 320,
            height: 238,
            rotate: -2,
            delay: 610,
          },
          {
            src: shanghaiFunCalligraphy,
            label: '路上的展覽',
            left: 778,
            top: 790,
            width: 350,
            height: 178,
            rotate: 3,
            delay: 700,
          },
        ].map(({ src, label, left, top, width, height, rotate, delay }) => (
          <figure
            key={label}
            className="story-fadeup"
            style={{
              animationDelay: `${delay}ms`,
              position: 'absolute',
              left,
              top,
              width,
              height,
              margin: 0,
              borderRadius: 26,
              border: '2px solid rgba(255,255,255,0.86)',
              background: '#fff',
              overflow: 'hidden',
              transform: `rotate(${rotate}deg)`,
              boxShadow: '0 26px 58px rgba(0,0,0,0.38)',
            }}
          >
            <img
              src={src}
              alt={label}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
            <figcaption
              style={{
                position: 'absolute',
                left: 14,
                bottom: 14,
                borderRadius: 999,
                background: 'rgba(8,8,10,0.74)',
                color: '#fff',
                padding: '10px 15px',
                fontSize: 18,
                lineHeight: 1,
                fontWeight: 900,
                backdropFilter: 'blur(10px)',
              }}
            >
              {label}
            </figcaption>
          </figure>
        ))}

        <div
          className="story-fadeup"
          style={{
            animationDelay: '780ms',
            position: 'absolute',
            right: 78,
            bottom: 54,
            borderRadius: 999,
            border: `2px solid ${palette.black}`,
            background: palette.lime,
            color: palette.black,
            padding: '16px 24px',
            fontSize: 26,
            lineHeight: 1,
            fontWeight: 950,
            transform: 'rotate(3deg)',
            boxShadow: '8px 8px 0 rgba(255,255,255,0.22)',
          }}
        >
          比賽以外，也是青春的一部分。
        </div>
      </div>
    </div>
  </PageShell>
);

export const StoryEarlyGraduationTrip: Page = () => (
  <PageShell section="Graduation trip?" accent={palette.lime} showHeader={false} mode="dark">
    <div
      style={{
        flex: 1,
        position: 'relative',
        minHeight: 0,
        marginTop: 10,
      }}
    >
      <div
        className="story-fadeup"
        style={{
          position: 'absolute',
          inset: '0 0 10px',
          borderRadius: 42,
          border: '2px solid rgba(255,255,255,0.78)',
          background:
            'radial-gradient(circle at 16% 20%, rgba(220,238,177,0.28), transparent 30%), radial-gradient(circle at 86% 78%, rgba(255,61,139,0.22), transparent 28%), #08080a',
          overflow: 'hidden',
          boxShadow: '18px 18px 0 rgba(220,238,177,0.18)',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 28,
            borderRadius: 32,
            border: '1px solid rgba(255,255,255,0.14)',
          }}
        />

        <div
          className="story-fadeup"
          style={{
            animationDelay: '100ms',
            position: 'absolute',
            left: 68,
            top: 66,
            width: 700,
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              borderRadius: 999,
              border: '2px solid rgba(255,255,255,0.7)',
              background: 'rgba(255,255,255,0.08)',
              color: palette.lime,
              fontFamily: '"SF Mono", "Figma Mono", ui-monospace, monospace',
              fontSize: 18,
              lineHeight: 1,
              fontWeight: 950,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '14px 18px',
              marginBottom: 34,
              backdropFilter: 'blur(14px)',
            }}
          >
            <span
              style={{ width: 10, height: 10, borderRadius: '50%', background: palette.primary }}
            />
            freshman summer
          </div>
          <h1
            style={{
              fontFamily: 'var(--osd-font-display)',
              color: '#fff',
              fontSize: 78,
              lineHeight: 1.04,
              letterSpacing: -1.2,
              fontWeight: 930,
              margin: 0,
              textShadow: '0 18px 48px rgba(0,0,0,0.46)',
            }}
          >
            學長姐說，
            <br />
            畢業旅行要出國。
          </h1>
        </div>

        <div
          className="story-fadeup"
          style={{
            animationDelay: '240ms',
            position: 'absolute',
            left: 76,
            bottom: 72,
            width: 670,
            borderRadius: 30,
            border: '2px solid rgba(255,255,255,0.72)',
            background: 'rgba(8,8,10,0.72)',
            color: '#fff',
            padding: '30px 34px',
            boxShadow: '12px 12px 0 rgba(255,61,139,0.22)',
            backdropFilter: 'blur(16px)',
            zIndex: 2,
          }}
        >
          <div
            style={{
              color: palette.lilac,
              fontSize: 20,
              fontWeight: 950,
              letterSpacing: '0.08em',
              marginBottom: 18,
            }}
          >
            PLOT TWIST
          </div>
          <div style={{ fontSize: 38, lineHeight: 1.26, fontWeight: 850 }}>
            而我們大一，就先體驗了一把別人所說的畢業旅行。
          </div>
        </div>

        {[
          {
            src: shanghaiGradTrip01,
            label: '城市夜景',
            left: 790,
            top: 62,
            width: 330,
            height: 580,
            rotate: -4,
            delay: 320,
          },
          {
            src: shanghaiGradTrip03,
            label: '旅程片段',
            left: 1112,
            top: 150,
            width: 300,
            height: 532,
            rotate: 3,
            delay: 430,
          },
          {
            src: shanghaiGradTrip02,
            label: '一起走過',
            left: 914,
            top: 512,
            width: 410,
            height: 318,
            rotate: -2,
            delay: 540,
          },
        ].map(({ src, label, left, top, width, height, rotate, delay }) => (
          <figure
            key={label}
            className="story-fadeup"
            style={{
              animationDelay: `${delay}ms`,
              position: 'absolute',
              left,
              top,
              width,
              height,
              margin: 0,
              borderRadius: 30,
              border: '2px solid rgba(255,255,255,0.86)',
              background: palette.black,
              overflow: 'hidden',
              transform: `rotate(${rotate}deg)`,
              boxShadow: '0 30px 74px rgba(0,0,0,0.48)',
            }}
          >
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                filter: 'saturate(1.08) contrast(1.04)',
              }}
            />
            <figcaption
              style={{
                position: 'absolute',
                left: 16,
                bottom: 16,
                borderRadius: 999,
                background: 'rgba(8,8,10,0.74)',
                color: '#fff',
                padding: '10px 15px',
                fontSize: 18,
                lineHeight: 1,
                fontWeight: 900,
                backdropFilter: 'blur(10px)',
              }}
            >
              {label}
            </figcaption>
          </figure>
        ))}

        <div
          className="story-fadeup"
          style={{
            animationDelay: '680ms',
            position: 'absolute',
            right: 74,
            bottom: 62,
            borderRadius: 999,
            border: `2px solid ${palette.black}`,
            background: palette.lime,
            color: palette.black,
            padding: '16px 24px',
            fontSize: 26,
            lineHeight: 1,
            fontWeight: 950,
            transform: 'rotate(4deg)',
            boxShadow: '8px 8px 0 rgba(255,255,255,0.18)',
          }}
        >
          不是畢業，卻像先偷跑了一次。
        </div>
      </div>
    </div>
  </PageShell>
);

export const StoryContestCanBeFun: Page = () => (
  <PageShell section="Competition mood" accent={palette.lime} showHeader={false}>
    <div
      style={{
        flex: 1,
        position: 'relative',
        minHeight: 0,
        marginTop: 10,
      }}
    >
      <div
        className="story-fadeup"
        style={{
          position: 'absolute',
          inset: '0 0 10px',
          borderRadius: 42,
          border: `2px solid ${palette.black}`,
          background:
            'radial-gradient(circle at 12% 16%, rgba(220,238,177,0.9), transparent 30%), radial-gradient(circle at 84% 24%, rgba(197,176,244,0.54), transparent 26%), linear-gradient(135deg, #fffdf4 0%, #eef8d9 46%, #f7e6ed 100%)',
          overflow: 'hidden',
          boxShadow: '18px 18px 0 rgba(0,0,0,0.12)',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: -120,
            bottom: 108,
            width: 560,
            height: 150,
            borderRadius: 999,
            background: palette.lime,
            border: `2px solid ${palette.black}`,
            transform: 'rotate(-8deg)',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: -104,
            top: 56,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: palette.primary,
            opacity: 0.9,
          }}
        />

        <figure
          className="story-fadeup"
          style={{
            animationDelay: '120ms',
            position: 'absolute',
            right: 78,
            top: 74,
            width: 760,
            height: 470,
            margin: 0,
            borderRadius: 34,
            border: `2px solid ${palette.black}`,
            overflow: 'hidden',
            background: '#fff',
            transform: 'rotate(2deg)',
            boxShadow: '18px 18px 0 rgba(255,61,139,0.22)',
            zIndex: 1,
          }}
        >
          <img
            src={contestCanBeFunTeam}
            alt="團隊穿著亮綠色活動衣合照"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 45%',
              display: 'block',
            }}
          />
        </figure>

        <figure
          className="story-fadeup"
          style={{
            animationDelay: '260ms',
            position: 'absolute',
            right: 98,
            bottom: 74,
            width: 520,
            height: 252,
            margin: 0,
            borderRadius: 30,
            border: `2px solid ${palette.black}`,
            overflow: 'hidden',
            background: '#fff',
            transform: 'rotate(-2.5deg)',
            boxShadow: '14px 14px 0 rgba(0,0,0,0.12)',
            zIndex: 3,
          }}
        >
          <img
            src={contestCanBeFunJudging}
            alt="向評審介紹作品的現場"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 48%',
              display: 'block',
            }}
          />
        </figure>

        <figure
          className="story-fadeup"
          style={{
            animationDelay: '360ms',
            position: 'absolute',
            left: 654,
            bottom: 104,
            width: 132,
            height: 132,
            margin: 0,
            borderRadius: 30,
            border: `2px solid ${palette.black}`,
            overflow: 'hidden',
            background: '#fff',
            transform: 'rotate(8deg)',
            boxShadow: '12px 12px 0 rgba(197,176,244,0.42)',
            zIndex: 4,
          }}
        >
          <img
            src={contestCanBeFunTrophy}
            alt="海峽兩岸青少年創客大賽獎盃"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
          <figcaption
            style={{
              position: 'absolute',
              left: 14,
              bottom: 14,
              borderRadius: 999,
              background: palette.black,
              color: '#fff',
              padding: '7px 10px',
              fontSize: 14,
              lineHeight: 1,
              fontWeight: 900,
            }}
          >
            成果之外
          </figcaption>
        </figure>

        <div
          className="story-fadeup"
          style={{
            animationDelay: '140ms',
            position: 'absolute',
            left: 70,
            top: 76,
            width: 650,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              borderRadius: 999,
              border: `2px solid ${palette.black}`,
              background: '#fff',
              color: palette.primary,
              fontFamily: '"SF Mono", "Figma Mono", ui-monospace, monospace',
              fontSize: 18,
              lineHeight: 1,
              fontWeight: 950,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '14px 18px',
              marginBottom: 30,
              boxShadow: '7px 7px 0 rgba(0,0,0,0.1)',
            }}
          >
            <span
              style={{ width: 10, height: 10, borderRadius: '50%', background: palette.lime }}
            />
            loosen up
          </div>
          <h1
            style={{
              fontFamily: 'var(--osd-font-display)',
              color: palette.black,
              fontSize: 96,
              lineHeight: 1.03,
              letterSpacing: -1.2,
              fontWeight: 930,
              margin: 0,
            }}
          >
            認真，
            <br />
            也可以
            <br />
            很開心。
          </h1>
        </div>

        <div
          className="story-fadeup"
          style={{
            animationDelay: '440ms',
            position: 'absolute',
            left: 82,
            bottom: 76,
            width: 560,
            borderRadius: 28,
            border: `2px solid ${palette.black}`,
            background: palette.black,
            color: '#fff',
            padding: '28px 32px',
            boxShadow: '12px 12px 0 rgba(220,238,177,0.36)',
          }}
        >
          <div
            style={{
              color: palette.lime,
              fontSize: 20,
              fontWeight: 950,
              letterSpacing: '0.08em',
              marginBottom: 16,
            }}
          >
            MINDSET SHIFT
          </div>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <div
                style={{
                  color: palette.lime,
                  fontSize: 22,
                  lineHeight: 1,
                  fontWeight: 900,
                  marginBottom: 8,
                }}
              >
                以前以為
              </div>
              <div style={{ fontSize: 30, lineHeight: 1.28, fontWeight: 820 }}>
                競賽就是緊繃、比較、不能出錯。
              </div>
            </div>
            <div>
              <div
                style={{
                  color: palette.lime,
                  fontSize: 22,
                  lineHeight: 1,
                  fontWeight: 900,
                  marginBottom: 8,
                }}
              >
                後來發現
              </div>
              <div style={{ fontSize: 30, lineHeight: 1.28, fontWeight: 820 }}>
                和隊友一起把作品帶出去，也可以很開心。
              </div>
            </div>
          </div>
        </div>

        {[
          { text: '不是考試', left: 420, top: 318, color: palette.lime },
          { text: '不是上戰場', left: 466, top: 374, color: palette.lilac },
          { text: '是跟一群人一起完成一件事', left: 340, top: 430, color: palette.primary },
        ].map(({ text, left, top, color }, i) => (
          <div
            key={text}
            className="story-fadeup"
            style={{
              animationDelay: `${540 + i * 80}ms`,
              position: 'absolute',
              left,
              top,
              borderRadius: 999,
              border: `2px solid ${palette.black}`,
              background: color,
              color: i === 2 ? '#fff' : palette.black,
              padding: '14px 20px',
              fontSize: i === 2 ? 21 : 24,
              lineHeight: 1,
              fontWeight: 950,
              transform: `rotate(${[-5, 4, -2][i]}deg)`,
              boxShadow: '7px 7px 0 rgba(0,0,0,0.12)',
              zIndex: 5,
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  </PageShell>
);

export const StoryHalfFcuTopia: Page = () => (
  <PageShell section="Product building" accent={palette.lime} showHeader={false}>
    <div
      style={{
        flex: 1,
        position: 'relative',
        minHeight: 0,
        marginTop: 10,
      }}
    >
      <div
        className="story-fadeup"
        style={{
          position: 'absolute',
          inset: '0 0 10px',
          borderRadius: 42,
          border: `2px solid ${palette.black}`,
          background: 'linear-gradient(135deg, #ffffff 0%, #dceeb1 46%, #c5b0f4 100%)',
          overflow: 'hidden',
          boxShadow: '18px 18px 0 rgba(0,0,0,0.12)',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 18px 18px, rgba(0,0,0,0.08) 1.6px, transparent 1.6px)',
            backgroundSize: '34px 34px',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: -96,
            top: -90,
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: palette.primary,
            border: `2px solid ${palette.black}`,
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: -120,
            bottom: 92,
            width: 520,
            height: 150,
            borderRadius: 999,
            background: palette.cream,
            border: `2px solid ${palette.black}`,
            transform: 'rotate(-7deg)',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '0.95fr 1.05fr',
            gap: 46,
            padding: '68px 74px 58px',
          }}
        >
          <div
            className="story-fadeup"
            style={{
              animationDelay: '90ms',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 0,
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  borderRadius: 999,
                  border: `2px solid ${palette.black}`,
                  background: palette.black,
                  color: palette.lime,
                  fontFamily: '"SF Mono", "Figma Mono", ui-monospace, monospace',
                  fontSize: 18,
                  lineHeight: 1,
                  fontWeight: 950,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '14px 18px',
                  marginBottom: 34,
                  boxShadow: '7px 7px 0 rgba(255,61,139,0.24)',
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: palette.primary,
                  }}
                />
                side project to product
              </div>
              <h1
                style={{
                  fontFamily: 'var(--osd-font-display)',
                  color: palette.black,
                  fontSize: 84,
                  lineHeight: 1.02,
                  letterSpacing: -1.3,
                  fontWeight: 940,
                  margin: 0,
                }}
              >
                我還開發了
                <br />
                半逢遇甲。
              </h1>
              <p
                style={{
                  margin: '32px 0 0',
                  color: palette.muted,
                  fontSize: 32,
                  lineHeight: 1.36,
                  fontWeight: 720,
                  maxWidth: 640,
                }}
              >
                這不是比賽作品，而是一個真的給逢甲學生使用的校園資訊整合 App。
              </p>
            </div>

            <div
              className="story-fadeup"
              style={{
                animationDelay: '260ms',
                borderRadius: 30,
                border: `2px solid ${palette.black}`,
                background: '#fff',
                color: palette.black,
                padding: '26px 30px',
                boxShadow: '10px 10px 0 rgba(0,0,0,0.12)',
              }}
            >
              <div
                style={{
                  color: palette.primary,
                  fontSize: 20,
                  fontWeight: 950,
                  letterSpacing: '0.08em',
                  marginBottom: 14,
                }}
              >
                APP STORE
              </div>
              <div style={{ fontSize: 34, lineHeight: 1.28, fontWeight: 850 }}>
                開發者：Tsai Cheng-Yeh
                <br />
                類別：工具程式 / 評分 4.8
              </div>
            </div>
          </div>

          <div
            className="story-fadeup"
            style={{
              animationDelay: '160ms',
              position: 'relative',
              minHeight: 0,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 26,
                top: 34,
                width: 360,
                height: 706,
                borderRadius: 58,
                border: `3px solid ${palette.black}`,
                background: palette.black,
                transform: 'rotate(-3deg)',
                boxShadow: '16px 16px 0 rgba(0,0,0,0.16)',
                padding: 18,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 42,
                  background: '#f8f8f4',
                  overflow: 'hidden',
                  padding: '28px 24px',
                  color: palette.black,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 26,
                  }}
                >
                  <div
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: 22,
                      border: `2px solid ${palette.black}`,
                      background: `linear-gradient(135deg, ${palette.lime}, ${palette.lilac})`,
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 28,
                      fontWeight: 950,
                      boxShadow: '5px 5px 0 rgba(0,0,0,0.12)',
                    }}
                  >
                    逢
                  </div>
                  <div
                    style={{
                      borderRadius: 999,
                      background: palette.black,
                      color: '#fff',
                      padding: '10px 13px',
                      fontFamily: '"SF Mono", "Figma Mono", ui-monospace, monospace',
                      fontSize: 13,
                      fontWeight: 950,
                    }}
                  >
                    fcu.topia
                  </div>
                </div>
                <div style={{ fontSize: 35, lineHeight: 1.08, fontWeight: 940, marginBottom: 12 }}>
                  半逢遇甲
                </div>
                <div
                  style={{
                    color: palette.muted,
                    fontSize: 20,
                    lineHeight: 1.3,
                    fontWeight: 700,
                    marginBottom: 26,
                  }}
                >
                  提供逢甲學生方便的校務體驗
                </div>

                <div style={{ display: 'grid', gap: 14 }}>
                  {[
                    ['課表', '一頁式課表與桌面 / 鎖定畫面 Widget'],
                    ['整合', 'MyFCU、iLearn、校網、系網與行事曆'],
                    ['提醒', 'iLearn 作業清單與通知'],
                    ['校園', '車位資訊與常用連結'],
                  ].map(([label, text], i) => (
                    <div
                      key={label}
                      style={{
                        borderRadius: 20,
                        border: `2px solid ${palette.black}`,
                        background: [palette.lime, palette.cream, palette.lilac, '#fff'][i],
                        padding: '16px 16px',
                        display: 'grid',
                        gridTemplateColumns: '64px 1fr',
                        gap: 12,
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          borderRadius: 999,
                          background: palette.black,
                          color: '#fff',
                          padding: '10px 0',
                          textAlign: 'center',
                          fontSize: 18,
                          lineHeight: 1,
                          fontWeight: 950,
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          color: palette.black,
                          fontSize: 19,
                          lineHeight: 1.22,
                          fontWeight: 760,
                        }}
                      >
                        {text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 72,
                width: 330,
                borderRadius: 32,
                border: `2px solid ${palette.black}`,
                background: palette.black,
                color: '#fff',
                padding: '30px 32px',
                boxShadow: '12px 12px 0 rgba(255,61,139,0.24)',
              }}
            >
              <div
                style={{
                  color: palette.lime,
                  fontFamily: '"SF Mono", "Figma Mono", ui-monospace, monospace',
                  fontSize: 17,
                  lineHeight: 1,
                  fontWeight: 950,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 18,
                }}
              >
                why it matters
              </div>
              <div style={{ fontSize: 38, lineHeight: 1.12, fontWeight: 930, marginBottom: 22 }}>
                從活動，
                <br />
                變成產品。
              </div>
              <div
                style={{
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: 25,
                  lineHeight: 1.34,
                  fontWeight: 620,
                }}
              >
                我不只是辦一次活動，而是開始思考：能不能做一個東西，長期改善大家每天遇到的小麻煩？
              </div>
            </div>

            <div
              className="story-fadeup"
              style={{
                animationDelay: '360ms',
                position: 'absolute',
                right: 20,
                bottom: 46,
                width: 392,
                borderRadius: 28,
                border: `2px solid ${palette.black}`,
                background: palette.primary,
                color: '#fff',
                padding: '24px 28px',
                transform: 'rotate(2deg)',
                boxShadow: '10px 10px 0 rgba(0,0,0,0.14)',
              }}
            >
              <div style={{ fontSize: 30, lineHeight: 1.28, fontWeight: 880 }}>
                這頁可以講：我開始把「社團服務」變成「真的有人使用的工具」。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageShell>
);

export const StoryHungryAfterAward: Page = () => (
  <PageShell section="After award" accent={palette.lime}>
    <div
      style={{
        flex: 1,
        position: 'relative',
        minHeight: 0,
        paddingTop: 26,
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '48px 0 16px',
          borderRadius: 40,
          background:
            'linear-gradient(135deg, rgba(220,238,177,0.74), rgba(244,236,214,0.82) 44%, rgba(239,212,212,0.8))',
          border: `2px solid ${palette.black}`,
          transform: 'rotate(-1deg)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '0.92fr 1.08fr',
          gap: 42,
          alignItems: 'stretch',
          padding: '64px 58px 54px',
        }}
      >
        <div
          className="story-fadeup"
          style={{
            borderRadius: 34,
            border: `2px solid ${palette.black}`,
            background: palette.black,
            color: '#fff',
            padding: '48px 46px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '14px 14px 0 rgba(255,61,139,0.24)',
          }}
        >
          <div>
            <div
              style={{
                color: palette.lime,
                fontSize: 21,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 28,
              }}
            >
              得獎之後
            </div>
            <h1
              style={{
                fontFamily: 'var(--osd-font-display)',
                fontSize: 76,
                lineHeight: 1.02,
                letterSpacing: -1.2,
                fontWeight: 920,
                margin: 0,
              }}
            >
              但我從來
              <br />
              不滿足。
            </h1>
          </div>
          <div style={{ display: 'grid', gap: 20 }}>
            <div
              style={{
                color: 'rgba(255,255,255,0.76)',
                fontSize: 34,
                lineHeight: 1.36,
                fontWeight: 620,
              }}
            >
              我花了很多時間，可不是為了只拿到一個三等獎。
            </div>
            <div
              style={{
                alignSelf: 'flex-start',
                borderRadius: 999,
                background: palette.primary,
                color: '#fff',
                padding: '16px 24px',
                fontSize: 28,
                lineHeight: 1,
                fontWeight: 920,
              }}
            >
              我想了解更多，因為我想變強。
            </div>
          </div>
        </div>

        <div
          className="story-fadeup"
          style={{
            animationDelay: '160ms',
            position: 'relative',
            borderRadius: 34,
            border: `2px solid ${palette.black}`,
            background:
              'radial-gradient(circle at 18px 18px, rgba(0,0,0,0.09) 1.6px, transparent 1.6px), #fff',
            backgroundSize: '34px 34px',
            overflow: 'hidden',
            padding: '42px 42px',
            boxShadow: '14px 14px 0 rgba(0,0,0,0.12)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 34,
              fontFamily: '"SF Mono", "Figma Mono", ui-monospace, monospace',
              fontSize: 18,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 900,
            }}
          >
            <span style={{ color: palette.primary }}>field notes</span>
            <span style={{ color: palette.faint }}>賽後觀察 / 交流 / 拆解</span>
          </div>

          <div style={{ position: 'relative', height: 'calc(100% - 58px)' }}>
            <div
              aria-hidden
              style={{
                position: 'absolute',
                left: 292,
                top: 92,
                width: 132,
                borderTop: `3px dashed ${palette.primary}`,
                opacity: 0.34,
                transform: 'rotate(10deg)',
              }}
            />
            <div
              aria-hidden
              style={{
                position: 'absolute',
                left: 260,
                top: 268,
                width: 190,
                borderTop: `3px dashed ${palette.lilac}`,
                opacity: 0.34,
                transform: 'rotate(-13deg)',
              }}
            />
            {[
              {
                title: '聽別人的作品',
                text: '不是只看排名，而是去理解他們怎麼定義問題、怎麼包裝價值。',
                color: palette.lime,
                mark: '01',
                titleSize: 34,
                bodySize: 23,
                style: { left: 0, top: 6, width: 318, transform: 'rotate(-2deg)', zIndex: 3 },
              },
              {
                title: '跟很多人交流',
                text: '評審、參賽者、學長姐，只要有機會我就問，想知道自己缺在哪。',
                color: palette.cream,
                mark: '02',
                titleSize: 31,
                bodySize: 22,
                style: { right: 0, top: 54, width: 292, transform: 'rotate(2deg)', zIndex: 2 },
              },
              {
                title: '追問開發細節',
                text: '這個 API 怎麼串？資料怎麼處理？你們為什麼用這個架構？',
                color: palette.lilac,
                mark: '03',
                titleSize: 32,
                bodySize: 22,
                style: { left: 48, top: 292, width: 394, transform: 'rotate(1deg)', zIndex: 3 },
              },
            ].map(({ title, text, color, style, titleSize, bodySize, mark }, i) => (
              <div
                key={title}
                className="story-fadeup"
                style={{
                  animationDelay: `${260 + i * 110}ms`,
                  position: 'absolute',
                  borderRadius: 24,
                  border: `2px solid ${palette.black}`,
                  background: color,
                  color: palette.black,
                  padding: '24px 26px',
                  boxShadow:
                    i === 1 ? '10px 10px 0 rgba(255,61,139,0.18)' : '10px 10px 0 rgba(0,0,0,0.1)',
                  ...style,
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: -15,
                    width: 74,
                    height: 26,
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.68)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    transform: 'translateX(-50%) rotate(-2deg)',
                    boxShadow: '0 8px 18px rgba(0,0,0,0.1)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    right: 18,
                    top: 16,
                    color: 'rgba(0,0,0,0.34)',
                    fontFamily: '"SF Mono", "Figma Mono", ui-monospace, monospace',
                    fontSize: 16,
                    lineHeight: 1,
                    fontWeight: 950,
                  }}
                >
                  {mark}
                </div>
                <div
                  style={{
                    color: palette.black,
                    fontSize: titleSize ?? 36,
                    lineHeight: 1.08,
                    fontWeight: 930,
                    marginBottom: 16,
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    color: palette.muted,
                    fontSize: bodySize ?? 25,
                    lineHeight: 1.35,
                    fontWeight: 620,
                  }}
                >
                  {text}
                </div>
              </div>
            ))}

            <div
              className="story-fadeup"
              style={{
                animationDelay: '640ms',
                position: 'absolute',
                right: 18,
                bottom: 10,
                borderRadius: 999,
                border: `2px solid ${palette.black}`,
                background: palette.black,
                color: '#fff',
                padding: '18px 26px',
                fontSize: 31,
                lineHeight: 1,
                fontWeight: 950,
                boxShadow: '8px 8px 0 rgba(197,176,244,0.32)',
              }}
            >
              下一次，我要更強。
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageShell>
);

export const StoryClosingDream: Page = () => (
  <PageShell section="Closing" accent={palette.primary} showHeader={false}>
    <div
      style={{
        flex: 1,
        position: 'relative',
        minHeight: 0,
        marginTop: 10,
      }}
    >
      <div
        className="story-fadeup"
        style={{
          position: 'absolute',
          inset: '0 0 10px',
          borderRadius: 42,
          border: `2px solid ${palette.black}`,
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.055) 1px, transparent 1px), linear-gradient(0deg, rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(135deg, #fffdf6 0%, #f6f0ff 52%, #f0ffd2 100%)',
          backgroundSize: '52px 52px, 52px 52px, 100% 100%',
          overflow: 'hidden',
          boxShadow: '18px 18px 0 rgba(0,0,0,0.12)',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: -100,
            top: -110,
            width: 410,
            height: 410,
            borderRadius: '50%',
            background: palette.primary,
            border: `2px solid ${palette.black}`,
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: -90,
            bottom: -130,
            width: 430,
            height: 430,
            borderRadius: '50%',
            background: palette.lime,
            border: `2px solid ${palette.black}`,
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: 210,
            bottom: 80,
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: palette.lilac,
            border: `2px solid ${palette.black}`,
            transform: 'rotate(8deg)',
          }}
        />

        <div
          className="story-fadeup"
          style={{
            animationDelay: '100ms',
            position: 'absolute',
            left: 82,
            top: 76,
            right: 82,
            zIndex: 3,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              borderRadius: 999,
              border: `2px solid ${palette.black}`,
              background: palette.black,
              color: palette.lime,
              fontFamily: '"SF Mono", "Figma Mono", ui-monospace, monospace',
              fontSize: 18,
              lineHeight: 1,
              fontWeight: 950,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '14px 18px',
              marginBottom: 34,
              boxShadow: '7px 7px 0 rgba(255,61,139,0.22)',
            }}
          >
            <span
              style={{ width: 10, height: 10, borderRadius: '50%', background: palette.primary }}
            />
            back to the first question
          </div>
          <h1
            style={{
              fontFamily: 'var(--osd-font-display)',
              color: palette.black,
              fontSize: 92,
              lineHeight: 1.01,
              letterSpacing: -1.7,
              fontWeight: 950,
              margin: 0,
              maxWidth: 1120,
            }}
          >
            所以，夢想不是一開始就知道。
            <br />
            是做著做著，才慢慢變清楚。
          </h1>
        </div>

        <div
          className="story-fadeup"
          style={{
            animationDelay: '230ms',
            position: 'absolute',
            left: 88,
            bottom: 86,
            width: 760,
            zIndex: 4,
            borderRadius: 34,
            border: `2px solid ${palette.black}`,
            background: '#fff',
            padding: '32px 36px',
            boxShadow: '12px 12px 0 rgba(0,0,0,0.12)',
          }}
        >
          <div
            style={{
              color: palette.primary,
              fontSize: 20,
              lineHeight: 1,
              fontWeight: 950,
              letterSpacing: '0.09em',
              marginBottom: 18,
            }}
          >
            WHAT I WANT TO LEAVE WITH YOU
          </div>
          <div style={{ color: palette.black, fontSize: 37, lineHeight: 1.32, fontWeight: 850 }}>
            如果現在還不知道自己要去哪裡，也沒關係。先把眼前的機會接住，先讓自己進到現場，經驗會慢慢把方向推近。
          </div>
        </div>

        <div
          className="story-fadeup"
          style={{
            animationDelay: '320ms',
            position: 'absolute',
            right: 88,
            bottom: 92,
            width: 360,
            zIndex: 5,
            display: 'grid',
            gap: 16,
          }}
        >
          {[
            ['01', '先參與', palette.lime],
            ['02', '先累積', palette.cream],
            ['03', '再回答', palette.pink],
          ].map(([num, label, color], index) => (
            <div
              key={num}
              className="story-fadeup"
              style={{
                animationDelay: `${380 + index * 80}ms`,
                borderRadius: 26,
                border: `2px solid ${palette.black}`,
                background: color,
                color: palette.black,
                padding: '22px 26px',
                boxShadow: '7px 7px 0 rgba(0,0,0,0.12)',
                transform: `rotate(${[-2, 1, -1][index]}deg)`,
                display: 'flex',
                alignItems: 'center',
                gap: 18,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: `2px solid ${palette.black}`,
                  background: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 19,
                  lineHeight: 1,
                  fontWeight: 950,
                }}
              >
                {num}
              </div>
              <div style={{ fontSize: 34, lineHeight: 1, fontWeight: 950 }}>{label}</div>
            </div>
          ))}
        </div>

        <div
          className="story-fadeup"
          style={{
            animationDelay: '520ms',
            position: 'absolute',
            right: 82,
            top: 74,
            zIndex: 4,
            borderRadius: 28,
            border: `2px solid ${palette.black}`,
            background: palette.black,
            color: '#fff',
            padding: '20px 26px',
            fontSize: 31,
            lineHeight: 1,
            fontWeight: 950,
            transform: 'rotate(3deg)',
            boxShadow: '8px 8px 0 rgba(255,255,255,0.5)',
          }}
        >
          謝謝大家
        </div>
      </div>
    </div>
  </PageShell>
);

export const notes: (string | undefined)[] = [
  '開場先停一下，微笑，說明這不是成功學演講，而是蔡承曄真實的故事。暱稱放到下一頁再講，首頁保持乾淨。',
  '這頁用 60 到 90 秒介紹自己。重點帶過資訊三乙、iOS Club 9th 社長、10th 顧問，以及 GDG on Campus Associated Lead。',
  '用「你的夢想是什麼？」開場。重點不是立刻給出標準答案，而是承認以前的你也答不出來，接著說這場分享會帶大家看見：夢想是怎麼在嘗試、失敗、被信任和重新選擇裡慢慢變成方向。',
  '快速帶過四段，不要講太細。這頁的任務是讓聽眾知道接下來會去哪裡。',
  '這頁先用反差感補身世背景：你來自至善國中體育班。重點不是說體育班讓你比較特別，而是讓同學驚訝你不是一開始就在資訊路上，接著帶到普通起點也能慢慢轉向。',
  '這頁要 focus 在「高中社團是同人社」這件事。先讓大家感受到反差：它不是資訊社、不是競賽隊，而是現代視覺文化同人社；這段不一定直接變成成果，但是真實代表你的好奇和喜歡。',
  '這頁講四個看起來不相關的嘗試：YouTuber、陪玩師、模特、麥當勞店員。重點不是它們直接變成現在成果，而是你因為好奇，所以一直願意嘗試不同角色。',
  '這頁是經歷牆，不要逐條念完。讓大家先看到現在的你有很多競賽、開發、幹部、助教、講座、社群和證照經驗，再接下一頁：究竟是什麼讓你變成這個樣子？',
  '這頁是轉場。說明接下來不要直接從現在講，而是先倒回大一，從還不知道自己能做什麼的狀態開始介紹。',
  '這頁一定要換成你的真實轉折事件。老師通常最想聽這裡。',
  '講第一個小行動。重點是不要把自己講成突然變強，而是慢慢開始。',
  '分享這次得獎事蹟。不要只講冠軍，要把重點拉回「我一開始只是想幫上忙，後來發現自己真的在團隊裡有位置」。',
  '講學長問你要不要當隊長。這頁不要把自己講成很有自信，而是講「被信任」其實也會帶來壓力。',
  '講你怎麼開始扛責任。重點不是證明自己很強，而是說明你開始理解「負責」不是自己全部做完。',
  '講分工之後的下一層：隊長不是什麼都自己做，但要知道全局。每一塊未必要親自做，可是目標、進度、風險都不能完全不知道。',
  '講真正開始帶隊後的混亂期。重點不是賣慘，而是承認卡住、比較、重來都會同時發生，然後才慢慢把亂掉的地方接起來。',
  '講比賽低谷期。重點放在「只要是我帶隊的競賽，連續兩場都沒有得獎，甚至連決賽都沒有入圍」，讓觀眾感受到責任感和自我懷疑。',
  '講低谷後仍持續努力。重點不是硬撐，而是過程中一直學到新東西、新想法，所以想把學到的東西展現出來，讓大家知道自己做得到。',
  '講 MAIC 行動應用創新賽的轉折。這頁重點是主動性：換了新團隊後，主動跟學長說想當隊長，也主動說這次想自己寫程式試試看。',
  '講高頻開會的節奏。重點是你跟學長姐提議每 1-2 天開一次會，因為你相信會得獎的作品背後一定要付出極大的努力。',
  '講 MAIC 的成果。重點不是把三等獎講成終點，而是說明前面那些高頻開會、主動學習、瘋狂參與，終於變成看得見的結果。',
  '講得獎後的不滿足。重點是你沒有停在三等獎，而是在比賽中主動交流、聽別人的作品、追問細節技術，因為你想了解更多、變得更強。',
  '講活動狂刷期。重點不是為了堆履歷，而是只要跟比賽有關就去參與，從講座、工作坊、分享和討論裡補方法、補想法。',
  '講那年暑假的兩場競賽撞期。重點是 MAIC 和海峽兩岸青少年創客大賽時間衝突，同學已經先飛到上海，而你晚幾天，只和同隊夥伴一起飛過去接下一場。',
  '停一下，讓這句話單獨成立：這是我第一次出國。不要急著解釋，讓觀眾先感受到這件事對你來說很大。',
  '這頁把氣氛放輕一點：雖然名義上是出國競賽，但第一次出國、跟同學一起飛、一起走行程，實際上也很像一趟同學旅行。',
  '講這趟旅程的荒謬感：學長姐常說畢業旅行才會出國，但你們大一就因為競賽，先體驗了一把像畢業旅行的行程。',
  '講心態鬆動的瞬間：以前覺得競賽一定要很緊繃、很嚴肅，但這次才發現，認真做作品的同時也可以很開心。',
  '轉到大二後的社團教學長故事。重點是每週都要交出一堂課，而且不是有講就好，而是內容、實作、節奏和品質都要被要求。',
  '講教學長不只是上課，還要一起辦活動。重點放在社團營運：企劃、宣傳、流程、控場、復盤都要有人接住，這也是第一次理解社團是在經營一個社群。',
  '講半逢遇甲。重點是你不只是辦活動，也開始把逢甲學生每天會遇到的校務、課表、iLearn、車位、作業提醒等需求，做成一個真的有人下載使用的校園資訊整合 App。',
  '講 2025 第21屆全國電子設計創意競賽。重點不是只講獎項，而是說明你開始帶著學弟妹進入競賽，從被學長帶著做事，變成自己要帶下一批人一起上場。',
  '講 Google APAC 競賽。重點放在舞台變大：這不是單純把作品丟出去，而是第一次很明確地把學弟妹帶到更大的競賽尺度，讓整個團隊一起被看見、一起被檢視。',
  '講經濟部競賽。重點放在現場觀察：你同時看見產業組和學生組的作品，才理解作品成熟度不只在功能，而是在場域、成本、導入、維運和說服力。補一句：這次只有入圍，沒有得獎，但它讓你看懂差距。',
  '講一路到暑假的 2025 海峽兩岸青少年創客大賽，你都沒有得獎。重點不是賣慘，而是讓觀眾感受到：你已經開始帶人、開始做作品、開始看懂差距，但成果還沒有立刻出現。',
  '講去海峽兩岸之前的中壢夜店插曲。這頁讓氣氛從低谷稍微放鬆，重點是故事真實感：沒有得獎的暑假也不是只有痛苦，還有朋友、現場和一些很荒謬但會記得的瞬間。',
  '講海峽兩岸青少年創客大賽的出發過程。重點是從集合、移動、抵達，到拿出逢甲旗幟的那一刻，讓觀眾感覺你不是只去參加一場比賽，而是代表一個團隊和學校走進更大的現場。',
  '結尾回扣第 3 頁的問題：你的夢想是什麼？重點不是把夢想講成一開始就知道的答案，而是說它會在參與、累積、失敗和重新選擇的過程中慢慢變清楚。最後用「先參與、先累積、再回答」收束。',
];
