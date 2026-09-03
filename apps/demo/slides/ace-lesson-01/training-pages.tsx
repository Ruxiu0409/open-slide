import { type Page, Step, Steps, useSlidePageNumber } from '@open-slide/core';
import airpodsMax from '../ace-training-01/assets/airpods-max.jpeg';
import appleLogo from '../ace-training-01/assets/apple.svg';
import crestColumbia from '../ace-training-01/assets/crest-columbia.svg';
import crestHarvard from '../ace-training-01/assets/crest-harvard.svg';
import crestPenn from '../ace-training-01/assets/crest-penn.svg';
import crestPrinceton from '../ace-training-01/assets/crest-princeton.svg';
import crestStanford from '../ace-training-01/assets/crest-stanford.svg';
import crestUC from '../ace-training-01/assets/crest-uc.svg';
import crestYale from '../ace-training-01/assets/crest-yale.svg';
import sscKeitaro from '../ace-training-01/assets/ssc-keitaro-kawahara.jpg';
import sscRuoshan from '../ace-training-01/assets/ssc-ruoshan-li.jpg';
import swiftLogo from '../ace-training-01/assets/swift.svg';
import whoWinsBg from './assets/who-wins-bg.jpg';

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

const EnSub = ({
  children,
  mb = 40,
  delay = 200,
}: {
  children: React.ReactNode;
  mb?: number;
  delay?: number;
}) => (
  <p
    className="ace-fadeup"
    style={{
      fontSize: 26,
      color: palette.muted,
      lineHeight: 1.4,
      margin: `0 0 ${mb}px`,
      animationDelay: `${delay}ms`,
    }}
  >
    {children}
  </p>
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
      <span>ACE Club · 幹訓 Officer Training 01</span>
      <span>
        {String(current).padStart(2, '0')}{' '}
        <span style={{ opacity: 0.45 }}>/ {String(total).padStart(2, '0')}</span>
      </span>
    </div>
  );
};

const PillarCard = ({
  tag,
  name,
  nameEn,
  sub,
  subEn,
  delay = 0,
}: {
  tag: string;
  name: string;
  nameEn: string;
  sub: string;
  subEn: string;
  delay?: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      flex: 1,
      padding: 36,
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
        letterSpacing: '0.1em',
      }}
    >
      {tag}
    </div>
    <div style={{ fontSize: 36, fontWeight: 700, marginTop: 14 }}>
      {name}{' '}
      <span style={{ fontSize: 20, fontWeight: 500, color: palette.muted, marginLeft: 4 }}>
        {nameEn}
      </span>
    </div>
    <div style={{ fontSize: 21, marginTop: 12, lineHeight: 1.5 }}>{sub}</div>
    <div style={{ fontSize: 17, color: palette.muted, marginTop: 8, lineHeight: 1.5 }}>{subEn}</div>
  </div>
);

const TimelineNode = ({
  num,
  name,
  nameEn,
  desc,
  descEn,
}: {
  num: string;
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
}) => (
  <div>
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        width: 26,
        height: 26,
        borderRadius: 999,
        background: accentGrad,
        border: `5px solid ${palette.bg}`,
        boxShadow: '0 4px 14px rgba(46, 111, 224, 0.35)',
      }}
    />
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 17,
        color: 'var(--osd-accent)',
        letterSpacing: '0.1em',
        marginTop: 22,
      }}
    >
      {num}
    </div>
    <div style={{ fontSize: 34, fontWeight: 700, marginTop: 10 }}>{name}</div>
    <div style={{ fontSize: 18, color: palette.muted, marginTop: 3 }}>{nameEn}</div>
    <div style={{ fontSize: 19, marginTop: 12, lineHeight: 1.5, maxWidth: 460 }}>{desc}</div>
    <div
      style={{ fontSize: 16, color: palette.muted, marginTop: 6, lineHeight: 1.45, maxWidth: 460 }}
    >
      {descEn}
    </div>
  </div>
);

const Crest = ({
  src,
  x,
  y,
  size,
  rot = 0,
}: {
  src: string;
  x: number;
  y: number;
  size: number;
  rot?: number;
}) => (
  <img
    src={src}
    alt=""
    aria-hidden="true"
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      opacity: 0.1,
      transform: `rotate(${rot}deg)`,
    }}
  />
);

export const TrainingTargetMembers: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="0%" y="0%" size={1000} opacity={0.24} />
    <Crest src={crestUC} x={1600} y={110} size={150} rot={-6} />
    <Crest src={crestHarvard} x={1360} y={60} size={100} rot={8} />
    <Crest src={crestYale} x={1300} y={240} size={88} rot={-10} />
    <Crest src={crestStanford} x={1735} y={310} size={105} rot={5} />
    <Crest src={crestPrinceton} x={200} y={780} size={105} rot={-8} />
    <Crest src={crestColumbia} x={720} y={820} size={92} rot={6} />
    <Crest src={crestPenn} x={1520} y={775} size={100} rot={-4} />
    <div style={{ padding: '160px 160px 0' }}>
      <Eyebrow>為誰而開 · Who It's For</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 76,
          fontWeight: 800,
          margin: '30px 0 10px',
          lineHeight: 1.1,
          animationDelay: '120ms',
        }}
      >
        這三種人，來對了。
      </h2>
      <EnSub mb={44}>Built for three kinds of people.</EnSub>
      <div style={{ display: 'flex', gap: 24 }}>
        <PillarCard
          tag="TYPE 01"
          name="想解決痛點的人"
          nameEn="The fixer"
          sub="學校那些小麻煩，你早就想有人做個東西來解決。那個人可以是你。"
          subEn="Those school hassles? You've wanted someone to fix them. That someone can be you."
          delay={280}
        />
        <PillarCard
          tag="TYPE 02"
          name="想被看見的申請者"
          nameEn="The applicant"
          sub="申請 UC、Ivy League、M7 時，想有一個別人複製不來的作品可以寫。"
          subEn="Wants one project on the application that nobody else can copy."
          delay={380}
        />
        <PillarCard
          tag="TYPE 03"
          name="零基礎的好奇者"
          nameEn="The curious"
          sub="對 AI、設計、科技好奇，但完全沒寫過程式。沒關係，我們就是從這裡開始。"
          subEn="Curious about AI, design or tech, with zero coding. That's exactly where we start."
          delay={480}
        />
      </div>
    </div>
    <Footer />
  </div>
);

const TrackPanel = ({
  tag,
  ghost,
  icon,
  name,
  nameEn,
  desc,
  descEn,
  goal,
  goalEn,
  featured = false,
  delay = 0,
}: {
  tag: string;
  ghost: string;
  icon: string;
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
  goal: string;
  goalEn: string;
  featured?: boolean;
  delay?: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      flex: 1,
      position: 'relative',
      overflow: 'hidden',
      minHeight: 556,
      padding: '44px 46px',
      borderRadius: 28,
      background: featured ? accentGrad : palette.surface,
      border: featured ? 'none' : `1px solid ${palette.border}`,
      boxShadow: featured
        ? '0 32px 80px rgba(46, 111, 224, 0.32)'
        : '0 18px 50px rgba(0, 0, 0, 0.08)',
      color: featured ? '#FFFFFF' : 'var(--osd-text)',
      animationDelay: `${delay}ms`,
    }}
  >
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: -18,
        bottom: -78,
        fontSize: 300,
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: '-0.04em',
        color: featured ? 'rgba(255, 255, 255, 0.16)' : 'rgba(46, 111, 224, 0.08)',
      }}
    >
      {ghost}
    </div>
    <div style={{ position: 'relative' }}>
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          background: featured ? 'rgba(255, 255, 255, 0.2)' : palette.accentSoft,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 18,
          letterSpacing: '0.16em',
          marginTop: 26,
          color: featured ? 'rgba(255, 255, 255, 0.82)' : 'var(--osd-accent)',
        }}
      >
        {tag}
      </div>
      <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.05, marginTop: 8 }}>{name}</div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 500,
          marginTop: 6,
          color: featured ? 'rgba(255, 255, 255, 0.8)' : palette.muted,
        }}
      >
        {nameEn}
      </div>
      <div style={{ fontSize: 23, lineHeight: 1.55, marginTop: 26, maxWidth: 620 }}>{desc}</div>
      <div
        style={{
          fontSize: 17,
          lineHeight: 1.5,
          marginTop: 6,
          maxWidth: 620,
          color: featured ? 'rgba(255, 255, 255, 0.76)' : palette.muted,
        }}
      >
        {descEn}
      </div>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          marginTop: 28,
          padding: '12px 24px',
          borderRadius: 999,
          fontSize: 21,
          fontWeight: 700,
          background: featured ? 'rgba(255, 255, 255, 0.18)' : palette.accentSoft,
          color: featured ? '#FFFFFF' : 'var(--osd-accent)',
        }}
      >
        <span style={{ fontFamily: fonts.mono, fontSize: 15, opacity: 0.75 }}>GOAL</span>
        {goal}
      </div>
      <div
        style={{
          fontSize: 16,
          marginTop: 8,
          color: featured ? 'rgba(255, 255, 255, 0.72)' : palette.muted,
        }}
      >
        {goalEn}
      </div>
    </div>
  </div>
);

export const TrainingGoals: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="100%" y="100%" size={1100} opacity={0.3} />
    <Glow x="0%" y="10%" size={900} opacity={0.22} />
    <div style={{ padding: '128px 140px 0' }}>
      <Eyebrow>這學期的目標 · Semester Goals</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 84,
          fontWeight: 800,
          margin: '28px 0 10px',
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          animationDelay: '120ms',
        }}
      >
        分兩組走，<span style={gradText}>兩組的達標線不一樣。</span>
      </h2>
      <EnSub mb={36}>Two tracks, two different finish lines.</EnSub>
      <div style={{ display: 'flex', gap: 28 }}>
        <TrackPanel
          tag="TRACK 01"
          ghost="01"
          icon="🛠️"
          name="創客組"
          nameEn="Maker"
          desc="做出想做的東西，然後分享出去。沒有評審，只有你想不想做。"
          descEn="Build the thing you want, then share it. No judges — just whether you want it."
          goal="做出來，分享就達標"
          goalEn="Build it, share it — that's the win"
          delay={260}
        />
        <TrackPanel
          featured
          tag="TRACK 02"
          ghost="02"
          icon="🏆"
          name="競賽組"
          nameEn="Competition"
          desc="期末成品做成 App Playground，投稿 Swift Student Challenge。有截止日，才會真的做完。"
          descEn="Learn by competing — ship an App Playground to the Swift Student Challenge."
          goal="投出去，履歷上多一行"
          goalEn="Submit it — earn a line on your résumé"
          delay={360}
        />
      </div>
    </div>
    <Footer />
  </div>
);

const SscStat = ({
  num,
  unit,
  name,
  nameEn,
  desc,
  descEn,
  featured = false,
  delay = 0,
}: {
  num: string;
  unit: string;
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
  featured?: boolean;
  delay?: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      flex: 1,
      padding: '30px 32px',
      borderRadius: 'var(--osd-radius)',
      background: featured ? accentGrad : palette.surface,
      border: featured ? 'none' : `1px solid ${palette.border}`,
      boxShadow: featured ? '0 20px 48px rgba(46, 111, 224, 0.26)' : cardShadow,
      color: featured ? '#FFFFFF' : 'var(--osd-text)',
      animationDelay: `${delay}ms`,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
      <span
        style={{
          fontSize: 88,
          fontWeight: 800,
          lineHeight: 1,
          ...(featured ? {} : gradText),
        }}
      >
        {num}
      </span>
      <span
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: featured ? 'rgba(255, 255, 255, 0.86)' : palette.muted,
        }}
      >
        {unit}
      </span>
    </div>
    <div style={{ fontSize: 26, fontWeight: 700, marginTop: 12 }}>{name}</div>
    <div
      style={{
        fontSize: 18,
        color: featured ? 'rgba(255, 255, 255, 0.78)' : palette.muted,
        marginTop: 4,
      }}
    >
      {nameEn}
    </div>
    <div style={{ fontSize: 19, lineHeight: 1.45, marginTop: 12 }}>{desc}</div>
    <div
      style={{
        fontSize: 16,
        color: featured ? 'rgba(255, 255, 255, 0.78)' : palette.muted,
        lineHeight: 1.45,
        marginTop: 4,
      }}
    >
      {descEn}
    </div>
  </div>
);

const PrizeItem = ({ text, textEn }: { text: string; textEn: string }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
    <span style={{ color: 'var(--osd-accent)', fontSize: 17, flexShrink: 0 }}>✓</span>
    <div>
      <span style={{ fontSize: 21, fontWeight: 600 }}>{text}</span>
      <span style={{ fontSize: 16, color: palette.muted, marginLeft: 8 }}>{textEn}</span>
    </div>
  </div>
);

export const TrainingSwiftStudentChallenge: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="70%" y="20%" size={1150} opacity={0.24} />
    <div style={{ padding: '150px 160px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Eyebrow>競賽組目標 · Swift Student Challenge</Eyebrow>
        <div
          className="ace-fade"
          style={{ display: 'flex', alignItems: 'center', gap: 24, animationDelay: '240ms' }}
        >
          <img src={appleLogo} alt="Apple" style={{ height: 54, display: 'block' }} />
          <div style={{ width: 1, height: 42, background: palette.chipBorder }} />
          <img src={swiftLogo} alt="Swift" style={{ height: 62, display: 'block' }} />
        </div>
      </div>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 68,
          fontWeight: 800,
          margin: '30px 0 10px',
          lineHeight: 1.15,
          animationDelay: '120ms',
        }}
      >
        Apple 官方的全球學生賽，<span style={gradText}>一年一次。</span>
      </h2>
      <EnSub mb={30}>
        Apple's Swift Student Challenge — one shot a year, open to students worldwide.
      </EnSub>
      <div style={{ display: 'flex', gap: 24 }}>
        <PillarCard
          tag="THE BRIEF · 做什麼"
          name="一個 App Playground"
          nameEn="Build an App Playground"
          sub="用 Swift 做一個三分鐘內玩完的互動作品。"
          subEn="An interactive piece playable in three minutes."
          delay={280}
        />
        <PillarCard
          tag="THE BAR · 評什麼"
          name="創意與影響力"
          nameEn="How it's judged"
          sub="評審看創新、創意、社會影響力與包容性，不是比誰程式碼多。"
          subEn="Innovation, creativity, social impact, inclusivity."
          delay={380}
        />
        <PillarCard
          tag="WHO · 誰能投"
          name="13 歲以上在學生"
          nameEn="Students, 13 and up"
          sub="在學就能投，只要你不是全職開發者。"
          subEn="Enrolled students who aren't full-time developers."
          delay={480}
        />
      </div>
      <div
        className="ace-fadeup"
        style={{
          marginTop: 22,
          padding: '16px 26px',
          borderRadius: 14,
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          fontFamily: fonts.mono,
          fontSize: 18,
          color: palette.muted,
          animationDelay: '580ms',
        }}
      >
        <div>
          時程：每年 2 月開放投稿 · 3 月底公布得獎 · 規格：.swiftpm 專案、25 MB
          以內、離線可跑、內容用英文
        </div>
        <div style={{ fontSize: 15, marginTop: 7, opacity: 0.85 }}>
          Timeline: submissions open in February, winners announced late March · Specs: .swiftpm
          project, under 25 MB, runs offline, content in English
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export const TrainingSscPrizes: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="30%" y="25%" size={1150} opacity={0.24} />
    <div style={{ padding: '150px 160px 0' }}>
      <Eyebrow>得獎有什麼 · What You Win</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 68,
          fontWeight: 800,
          margin: '30px 0 10px',
          lineHeight: 1.15,
          animationDelay: '120ms',
        }}
      >
        全世界只選 350 人，<span style={gradText}>50 人飛去 Apple Park。</span>
      </h2>
      <EnSub mb={30}>350 winners worldwide — 50 of them flown to Apple Park.</EnSub>
      <div style={{ display: 'flex', gap: 22 }}>
        <SscStat
          num="350"
          unit="人"
          name="全球得獎者"
          nameEn="Winners worldwide"
          desc="今年 350 位得獎者來自 37 個國家與地區。"
          descEn="This year's 350 came from 37 countries."
          delay={280}
        />
        <SscStat
          num="50"
          unit="人"
          name="飛去 Apple Park"
          nameEn="Distinguished Winners"
          desc="作品最出色的 50 位，Apple 招待三天。"
          descEn="The standouts get a three-day visit."
          featured
          delay={380}
        />
        <SscStat
          num="300"
          unit="人"
          name="抽籤有機會去"
          nameEn="A shot at the trip"
          desc="其餘得獎者抽籤，一樣有機會走一趟。"
          descEn="The rest enter a draw for the same visit."
          delay={480}
        />
      </div>
      <div
        className="ace-fadeup"
        style={{
          marginTop: 22,
          display: 'flex',
          alignItems: 'center',
          gap: 36,
          padding: '24px 32px',
          borderRadius: 'var(--osd-radius)',
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          boxShadow: cardShadow,
          animationDelay: '580ms',
        }}
      >
        <img
          src={airpodsMax}
          alt="AirPods Max"
          style={{ height: 168, width: 'auto', flexShrink: 0 }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 30, fontWeight: 700 }}>
            每一位得獎者都拿到
            <span style={{ fontSize: 19, fontWeight: 500, color: palette.muted, marginLeft: 10 }}>
              Every winner gets
            </span>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px 32px',
              marginTop: 16,
            }}
          >
            <PrizeItem text="AirPods Max" textEn="The ones pictured here" />
            <PrizeItem text="個人化證書" textEn="A personalized certificate" />
            <PrizeItem text="一年 Apple Developer Program" textEn="One-year membership, free" />
            <PrizeItem text="免費考 Swift 認證" textEn="Free Swift certification exam" />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const WinnerTrait = ({
  icon,
  name,
  nameEn,
  desc,
  descEn,
  example,
  delay = 0,
}: {
  icon: string;
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
  example: string;
  delay?: number;
}) => (
  <div
    className="ace-fadeup"
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '30px 28px',
      borderRadius: 'var(--osd-radius)',
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      boxShadow: cardShadow,
      animationDelay: `${delay}ms`,
    }}
  >
    <div style={{ fontSize: 40, lineHeight: 1 }}>{icon}</div>
    <div style={{ fontSize: 28, fontWeight: 700, marginTop: 18 }}>{name}</div>
    <div style={{ fontSize: 17, color: palette.muted, marginTop: 3 }}>{nameEn}</div>
    <div style={{ fontSize: 19, lineHeight: 1.5, marginTop: 14 }}>{desc}</div>
    <div style={{ fontSize: 15, color: palette.muted, lineHeight: 1.45, marginTop: 5 }}>
      {descEn}
    </div>
    <div
      style={{
        marginTop: 'auto',
        paddingTop: 16,
        borderTop: `1px solid ${palette.border}`,
        fontFamily: fonts.mono,
        fontSize: 14,
        lineHeight: 1.45,
        color: 'var(--osd-accent)',
      }}
    >
      {example}
    </div>
  </div>
);

export const TrainingWhoWins: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="80%" y="15%" size={1100} opacity={0.24} />
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, left: '50%', overflow: 'hidden' }}
    >
      <img
        src={whoWinsBg}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, #F5F5F7 0%, rgba(245,245,247,0.82) 26%, rgba(245,245,247,0.55) 100%)',
        }}
      />
    </div>
    <div style={{ padding: '140px 140px 0' }}>
      <Eyebrow>什麼樣的人會得獎 · Who Wins</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 68,
          fontWeight: 800,
          margin: '28px 0 10px',
          lineHeight: 1.15,
          animationDelay: '120ms',
        }}
      >
        得獎的不是最會寫程式的人，<span style={gradText}>是最有話想說的人。</span>
      </h2>
      <EnSub mb={32}>
        Winners aren't the best coders — they're the ones with something to say.
      </EnSub>
      <div style={{ display: 'flex', gap: 20, alignItems: 'stretch' }}>
        <WinnerTrait
          icon="🎯"
          name="切身之痛"
          nameEn="Personal motivation"
          desc="題目來自自己或身邊人真的遇過的事，不是想像出來的。"
          descEn="Problems they lived through themselves."
          example="Fast Aid · 急救步驟即時指引（印度）"
          delay={260}
        />
        <WinnerTrait
          icon="🌍"
          name="幫到別人"
          nameEn="Social impact"
          desc="讓被忽略的人被照顧、讓難懂的事變好懂。"
          descEn="Care for the overlooked; clarity for the confused."
          example="MyCycle · 用人話講生理健康（德國）"
          delay={330}
        />
        <WinnerTrait
          icon="🧩"
          name="現學現做"
          nameEn="Self-taught"
          desc="為了把作品做出來，臨時去學一個全新的技能。"
          descEn="Learned whatever it took to ship it."
          example="Yume's Spellbook · 玩遊戲搞懂 LLM（巴西）"
          delay={400}
        />
        <WinnerTrait
          icon="🤝"
          name="願意分享"
          nameEn="Community"
          desc="跟同伴一起學，也把學到的東西帶回去教別人。"
          descEn="They learn with peers and pass it on."
          example="和我們的第三個約定一樣：學到就分享"
          delay={470}
        />
      </div>
      <div
        className="ace-fadeup"
        style={{
          marginTop: 24,
          fontFamily: fonts.mono,
          fontSize: 16,
          color: palette.muted,
          lineHeight: 1.5,
          animationDelay: '560ms',
        }}
      >
        2025 年 Distinguished Winners
        來自印度、巴西、美國、日本、中國、德國。六個國家，六個不同的痛點。
        <br />
        developer.apple.com/swift-student-challenge/distinguished-winners
      </div>
    </div>
    <Footer />
  </div>
);

export const TrainingRoadmap: Page = () => (
  <div style={fill}>
    <Style />
    <Glow x="50%" y="100%" size={1200} opacity={0.24} />
    <div style={{ padding: '160px 160px 0' }}>
      <Eyebrow>16 堂課藍圖 · 16-Lesson Roadmap</Eyebrow>
      <h2
        className="ace-fadeup"
        style={{
          fontSize: 76,
          fontWeight: 800,
          margin: '30px 0 10px',
          lineHeight: 1.1,
          animationDelay: '120ms',
        }}
      >
        十六堂課，三個階段。
      </h2>
      <EnSub mb={40}>Sixteen lessons, three phases.</EnSub>
      <div
        className="ace-fadeup"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: fonts.mono,
          fontSize: 16,
          color: palette.muted,
          letterSpacing: '0.08em',
          marginBottom: 16,
          animationDelay: '220ms',
        }}
      >
        <span>LESSON 01</span>
        <span>LESSON 16</span>
      </div>
      <div style={{ position: 'relative' }}>
        <div
          aria-hidden="true"
          className="ace-fade"
          style={{
            position: 'absolute',
            left: 4,
            right: 10,
            top: 11,
            height: 4,
            borderRadius: 2,
            background: accentGrad,
            animationDelay: '260ms',
          }}
        />
        <div
          aria-hidden="true"
          className="ace-fade"
          style={{
            position: 'absolute',
            right: -4,
            top: 2,
            width: 0,
            height: 0,
            borderTop: '11px solid transparent',
            borderBottom: '11px solid transparent',
            borderLeft: '16px solid #2E6FE0',
            animationDelay: '260ms',
          }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
          <Steps>
            <Step>
              <TimelineNode
                num="PHASE 01"
                name="Discover & Plan"
                nameEn="發現與規劃"
                desc="找出真實的校園與生活問題，用 AI 工具規劃解法。"
                descEn="Spot real school & life problems; plan solutions with AI tools."
              />
            </Step>
            <Step>
              <TimelineNode
                num="PHASE 02"
                name="Build & Design"
                nameEn="打造與設計"
                desc="做出可互動、可點擊的網頁原型，不需要程式背景。"
                descEn="Create interactive, clickable web prototypes — no coding needed."
              />
            </Step>
            <Step>
              <TimelineNode
                num="PHASE 03"
                name="Launch & Portfolio"
                nameEn="上線與作品集"
                desc="打磨、發表，帶走一個能放進大學申請的作品。"
                descEn="Polish, present, and walk away with a college-ready piece."
              />
            </Step>
          </Steps>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const WinnerStory = ({
  photo,
  alt,
  caption,
  name,
  country,
  school,
  schoolEn,
  year,
  app,
  appDesc,
  appDescEn,
  quote,
  quoteEn,
}: {
  photo: string;
  alt: string;
  caption: string;
  name: string;
  country: string;
  school: string;
  schoolEn: string;
  year: string;
  app: string;
  appDesc: string;
  appDescEn: string;
  quote: string;
  quoteEn: string;
}) => (
  <div style={fill}>
    <Style />
    <Glow x="78%" y="30%" size={1100} opacity={0.22} />
    <div style={{ padding: '150px 160px 0' }}>
      <Eyebrow>真實案例 · Real Winner</Eyebrow>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '515px 1fr',
          gap: 60,
          alignItems: 'center',
          marginTop: 30,
        }}
      >
        <div className="ace-fadeup" style={{ animationDelay: '160ms' }}>
          <img
            src={photo}
            alt={alt}
            style={{
              width: 515,
              height: 620,
              objectFit: 'cover',
              borderRadius: 'var(--osd-radius)',
              boxShadow: cardShadow,
              display: 'block',
            }}
          />
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 15,
              color: palette.muted,
              marginTop: 12,
            }}
          >
            {caption}
          </div>
        </div>
        <div>
          <div
            className="ace-fadeup"
            style={{ fontSize: 54, fontWeight: 800, lineHeight: 1.15, animationDelay: '240ms' }}
          >
            {name}
            <span style={{ fontSize: 26, fontWeight: 500, color: palette.muted, marginLeft: 16 }}>
              {country}
            </span>
          </div>
          <div
            className="ace-fadeup"
            style={{ fontSize: 24, marginTop: 14, lineHeight: 1.4, animationDelay: '300ms' }}
          >
            {school}
            <div style={{ fontSize: 18, color: palette.muted, marginTop: 4 }}>{schoolEn}</div>
          </div>
          <div
            className="ace-fadeup"
            style={{
              marginTop: 26,
              padding: '20px 26px',
              borderRadius: 14,
              background: palette.surface,
              border: `1px solid ${palette.border}`,
              boxShadow: cardShadow,
              animationDelay: '380ms',
            }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 17,
                color: 'var(--osd-accent)',
                letterSpacing: '0.08em',
              }}
            >
              {year}
            </div>
            <div style={{ fontSize: 36, fontWeight: 700, marginTop: 8 }}>{app}</div>
            <div style={{ fontSize: 22, marginTop: 8, lineHeight: 1.5 }}>{appDesc}</div>
            <div style={{ fontSize: 17, color: palette.muted, marginTop: 4, lineHeight: 1.5 }}>
              {appDescEn}
            </div>
          </div>
          <div className="ace-fadeup" style={{ marginTop: 26, animationDelay: '470ms' }}>
            <div style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.55 }}>「{quote}」</div>
            <div style={{ fontSize: 19, color: palette.muted, marginTop: 10, lineHeight: 1.5 }}>
              “{quoteEn}”
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export const TrainingWinnerKeitaro: Page = () => (
  <WinnerStory
    photo={sscKeitaro}
    alt="Keitaro Kawahara 在 Apple Park 戶外與其他得獎者交談，胸前掛著 WWDC24 識別證"
    caption="照片 · Apple｜攝於 Apple Park，WWDC24"
    name="Keitaro Kawahara"
    country="日本 Japan"
    school="東京・青山學院大學，讀的是經濟，不是資工。"
    schoolEn="Aoyama Gakuin University, Tokyo — an economics major, not computer science."
    year="2024 · DISTINGUISHED WINNER"
    app="PuzzlePix"
    appDesc="把你手機裡的照片自動變成拼圖，難度可以調，小孩到大人都能玩。靈感來自看妹妹翻出舊拼圖在玩。妹妹也是他的第一個測試者。"
    appDescEn="Turns your own photos into puzzles at adjustable difficulty. The idea came from watching his little sister play with an old puzzle — she became his main playtester."
    quote="軟體工程是一種團隊運動：反覆討論和失敗，都是成功的必要條件。"
    quoteEn="Software engineering is a team sport, where multiple discussions and failures are crucial to success."
  />
);

export const TrainingWinnerRuoshan: Page = () => (
  <WinnerStory
    photo={sscRuoshan}
    alt="Ruoshan Li 拿著 iPad 和 Apple Pencil，與 Tim Cook 一起看她的作品"
    caption="照片 · Apple｜她與 Tim Cook 一起看自己的作品"
    name="Ruoshan Li"
    country="中國 China"
    school="三年前在學校的 iOS 社團開始學程式和設計。大學主修社會工作。"
    schoolEn="Started coding and design three years ago in her school's iOS club. Social work major."
    year="DISTINGUISHED WINNER"
    app="Deep Blue Tangram"
    appDesc="用 AR 做的海洋主題七巧板遊戲，給幼兒園和國小的孩子玩。她家一堆姪子姪女整天在玩手機遊戲，她想做一個對他們有幫助的。"
    appDescEn="An ocean-themed AR tangram game for young children — built for the many nephews and nieces in her family who all play mobile games."
    quote="我不是資工系的，我讀的是社會工作，所以我學了很多新東西。"
    quoteEn="I'm not a computer science major; I'm studying social work. So I've learned a lot of new skills."
  />
);
