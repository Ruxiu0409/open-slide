import type { Page } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';
import settingsImage from './assets/mc-v7-settings-top.png';
import summaryBottomImage from './assets/mc-v7-summary-bottom.png';
import summaryTopImage from './assets/mc-v7-summary-top.png';
import yearlyImage from './assets/mc-v7-yearly.png';

const muted = '#77726A';
const border = '#D8D2C4';
const accent = '#B4432A';
const canvas = {
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  position: 'relative',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
} satisfies CSSProperties;

const Footer = ({ source }: { source: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <footer
      style={{
        position: 'absolute',
        bottom: 43,
        left: 112,
        right: 112,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
        gap: 30,
        color: muted,
        fontSize: 22,
        lineHeight: 1.4,
      }}
    >
      <span style={{ maxWidth: 1480 }}>{source}</span>
      <span style={{ whiteSpace: 'nowrap', fontFamily: 'Arial,sans-serif' }}>
        {String(current).padStart(2, '0')} / {total}
      </span>
    </footer>
  );
};

const Frame = ({
  title,
  source,
  takeaway,
  children,
}: {
  title: string;
  source: string;
  takeaway: string;
  children: ReactNode;
}) => (
  <section lang="zh-Hant" data-report-page={title} style={canvas}>
    <div style={{ position: 'absolute', left: 112, top: 51, fontSize: 25, color: accent }}>
      智慧量化交易　期中報告
    </div>
    <h1
      style={{
        position: 'absolute',
        left: 112,
        right: 112,
        top: 123,
        margin: 0,
        fontSize: 64,
        fontWeight: 650,
        lineHeight: 1.2,
        fontFamily: 'var(--osd-font-display)',
      }}
    >
      {title}
    </h1>
    <div data-content-region style={{ position: 'absolute', left: 112, right: 112, top: 265 }}>
      {children}
    </div>
    <p
      data-takeaway
      style={{
        position: 'absolute',
        left: 112,
        right: 112,
        top: 914,
        margin: 0,
        color: accent,
        fontSize: 35,
        fontWeight: 550,
        lineHeight: 1.4,
      }}
    >
      {takeaway}
    </p>
    <Footer source={source} />
  </section>
);

const Metric = ({ label, value, unit }: { label: string; value: string; unit: string }) => (
  <div>
    <div style={{ fontSize: 30, color: muted, marginBottom: 14 }}>{label}</div>
    <div
      style={{
        fontSize: 74,
        fontFamily: 'Arial,sans-serif',
        fontWeight: 700,
        color: accent,
        lineHeight: 1.05,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {value}
    </div>
    <div style={{ fontSize: 27, color: muted, marginTop: 10 }}>{unit}</div>
  </div>
);

const Rule = ({ number, label, body }: { number: string; label: string; body: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '86px 1fr', gap: 30 }}>
    <div style={{ fontSize: 38, fontFamily: 'Arial,sans-serif', fontWeight: 700, color: accent }}>
      {number}
    </div>
    <div>
      <h2 style={{ fontSize: 36, fontWeight: 550, margin: '0 0 10px' }}>{label}</h2>
      <p style={{ fontSize: 31, lineHeight: 1.42, color: muted, margin: 0 }}>{body}</p>
    </div>
  </div>
);

const Screenshot = ({ src, alt, width }: { src: string; alt: string; width: number }) => (
  <img
    src={src}
    alt={alt}
    style={{ display: 'block', width, height: 'auto', border: `1px solid ${border}` }}
  />
);

const comparison = [
  ['交易筆數', '72 筆', '79 筆'],
  ['淨利', '224.32 萬', '260.68 萬'],
  ['獲利因子', '1.86', '2.08'],
  ['最大策略虧損', '60.58 萬', '53.22 萬'],
  ['最大平倉交易虧損', '45.92 萬', '38.56 萬'],
  ['最大年獲利', '69.82 萬', '74.46 萬（2024）'],
  ['回撤餘裕', '9.24 萬', '21.24 萬'],
  ['勝率', '54.2%', '55.7%'],
];

export const SelectionPage: Page = () => (
  <Frame
    title="v7只改一處：獲利後追蹤距離"
    source="資料：加分改版_v7／虧損階段統計、結果、結果_第二輪；MultiCharts設定截圖"
    takeaway="追蹤停損改為2.5倍；進場風險預算仍用3倍，其餘沿用v6。"
  >
    <div style={{ display: 'flex', gap: 90, marginBottom: 46 }}>
      <Metric label="v6追蹤距離" value="3" unit="倍固定進場波幅" />
      <Metric label="v7追蹤距離" value="2.5" unit="倍固定進場波幅" />
      <Metric label="進場預算" value="3" unit="倍固定進場波幅，不變" />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
      <Rule
        number="01"
        label="先看虧損發生在哪裡"
        body="v6的29筆RiskStop中，23筆最大有利波動不到10萬元，合計虧損210.86萬元。"
      />
      <Rule
        number="02"
        label="先試進場篩選，沒有改善"
        body="50日均線斜率與停損後冷卻5日，在2019–2022開發期都使績效變差。"
      />
      <Rule
        number="03"
        label="再試追蹤倍數"
        body="1.5、2倍的開發期PF低於v6；2.5倍提高至1.74，之後才跑完整期間。失敗結果均留存。"
      />
    </div>
  </Frame>
);

export const ComparisonPage: Page = () => (
  <Frame
    title="MultiCharts實測：v6與v7"
    source="TXF1日K，2020–2025；v6原始Excel、v7平台截圖；金額單位：新臺幣元換算為萬元"
    takeaway="v7的PF達2.08，最大策略虧損也由60.58萬降到53.22萬。"
  >
    <table
      data-evidence="table"
      style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', fontSize: 32 }}
    >
      <colgroup>
        <col style={{ width: '43%' }} />
        <col style={{ width: '28.5%' }} />
        <col style={{ width: '28.5%' }} />
      </colgroup>
      <thead>
        <tr style={{ background: '#E9E4D8', color: accent }}>
          {['指標', '已繳交 v6', '加分候選 v7'].map((heading) => (
            <th
              key={heading}
              style={{ padding: '10px 20px', border: `1px solid ${border}`, textAlign: 'left' }}
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {comparison.map(([label, v6, v7]) => (
          <tr key={label}>
            {[label, v6, v7].map((value, index) => (
              <td
                key={value}
                style={{
                  padding: '8px 20px',
                  border: `1px solid ${border}`,
                  fontFamily: index === 0 ? undefined : 'Arial,sans-serif',
                  fontVariantNumeric: 'tabular-nums',
                  color: index === 2 ? accent : undefined,
                }}
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </Frame>
);

export const YearlyPage: Page = () => (
  <Frame
    title="v7各年損益：2022仍虧損"
    source="MultiCharts年週期分析原始畫面，2020–2025；單位：新臺幣元"
    takeaway="2023、2024、2025連續為正；最高年度為2024年的74.46萬元。"
  >
    <div style={{ display: 'flex', alignItems: 'start', gap: 55 }}>
      <div>
        <div style={{ fontSize: 28, color: muted, marginBottom: 18 }}>MultiCharts平台原始畫面</div>
        <Screenshot
          src={yearlyImage}
          alt="MultiCharts v7年週期分析。2020至2025年損益依序為69.49、32.96、負29.87、74.17、74.46、39.47萬元。"
          width={1216}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 45, paddingTop: 75 }}>
        <Metric label="2022年虧損" value="−29.87" unit="萬元" />
        <Metric label="2024年獲利" value="＋74.46" unit="萬元" />
      </div>
    </div>
  </Frame>
);

export const SummaryTopPage: Page = () => (
  <Frame
    title="平台原始畫面：淨利與回撤"
    source="MultiCharts v7策略績效總結果，原始畫面裁切；2020/1/10–2025/12/31"
    takeaway="淨利260.68萬元；最大策略虧損53.22萬元。"
  >
    <Screenshot
      src={summaryTopImage}
      alt="MultiCharts v7策略績效總結果上半部，顯示淨利2,606,800元、最大策略虧損532,200元、最大平倉交易虧損385,600元。"
      width={1500}
    />
  </Frame>
);

export const SummaryBottomPage: Page = () => (
  <Frame
    title="平台原始畫面：PF與勝率"
    source="MultiCharts v7策略績效總結果，原始畫面裁切；與上一頁為同一報表"
    takeaway="獲利因子2.08、79筆交易、勝率55.7%。"
  >
    <Screenshot
      src={summaryBottomImage}
      alt="MultiCharts v7策略績效總結果下半部，顯示獲利因子2.08、交易總次數79、勝率55.7%。"
      width={1500}
    />
    <div style={{ fontSize: 42, color: accent, marginTop: 52, fontVariantNumeric: 'tabular-nums' }}>
      PF 2.08　／　79筆交易　／　勝率55.7%
    </div>
  </Frame>
);

export const SettingsPage: Page = () => (
  <Frame
    title="平台設定與仍待確認的差異"
    source="MultiCharts v7設定原始畫面；加分改版_v7／結果_完整評估；加分改版_v8／改版結果與下一步"
    takeaway="平台PF過2，但公開資料方向相反；後續須對齊行情並做樣本外驗證。"
  >
    <div style={{ display: 'flex', gap: 58, alignItems: 'start' }}>
      <div>
        <div style={{ fontSize: 28, color: muted, marginBottom: 16 }}>MultiCharts平台原始畫面</div>
        <Screenshot
          src={settingsImage}
          alt="MultiCharts v7設定，TrailMultiple為2.5、EntryBudgetMultiple為3、ModelSlippagePoints為1。"
          width={1130}
        />
      </div>
      <div
        style={{ width: 500, display: 'flex', flexDirection: 'column', gap: 35, paddingTop: 42 }}
      >
        <Rule number="01" label="公開資料結果相反" body="同段期間Python PF：v7為2.09，v6為2.22。" />
        <Rule
          number="02"
          label="差異尚未拆開"
          body="日期、交易時段、價格與TXF1串接都待逐筆對齊。"
        />
      </div>
    </div>
    <p style={{ fontSize: 30, lineHeight: 1.45, margin: '24px 0 0', color: muted }}>
      2019–2025皆為已看過資料，尚無樣本外驗證；每邊2點滑價尚未在平台重跑。
    </p>
  </Frame>
);
