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
  takeaway?: string;
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
    {takeaway && (
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
    )}
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
      <h2 style={{ fontSize: 34, lineHeight: 1.3, fontWeight: 550, margin: '0 0 6px' }}>{label}</h2>
      <p style={{ fontSize: 28, lineHeight: 1.45, color: muted, margin: 0 }}>{body}</p>
    </div>
  </div>
);

const Notes = ({ children, top = 22 }: { children: ReactNode; top?: number }) => (
  <div
    style={{
      marginTop: top,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      fontSize: 28,
      lineHeight: 1.45,
    }}
  >
    {children}
  </div>
);

const Note = ({ term, children }: { term?: string; children: ReactNode }) => (
  <p style={{ margin: 0 }}>
    {term && <strong style={{ fontWeight: 600, color: accent }}>{term}：</strong>}
    {children}
  </p>
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
    source="資料：v6平台交易明細（MultiCharts匯出Excel）；加分改版_v7／規則凍結.json；MultiCharts設定截圖"
    takeaway="追蹤停損改為2.5倍；進場風險預算仍用3倍，其餘沿用v6。"
  >
    <div style={{ display: 'flex', gap: 90, marginBottom: 26 }}>
      <Metric label="v6追蹤距離" value="3" unit="倍固定進場波幅" />
      <Metric label="v7追蹤距離" value="2.5" unit="倍固定進場波幅" />
      <Metric label="進場預算" value="3" unit="倍固定進場波幅，不變" />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Rule
        number="01"
        label="先看虧損發生在哪裡"
        body="RiskStop是追蹤停損出場。v6平台交易明細72筆中有29筆RiskStop，其中23筆的最大有利波動（持倉期間最多曾浮盈多少）不到10萬元，這23筆合計虧損210.86萬元。"
      />
      <Rule
        number="02"
        label="先試進場篩選"
        body="也試過50日均線斜率濾網、停損後冷卻5日，都沒有採用。"
      />
      <Rule
        number="03"
        label="再試追蹤倍數"
        body="比較過1.5倍、2倍、2.5倍的追蹤距離，選定2.5倍；未採用的設定都保留紀錄。"
      />
    </div>
  </Frame>
);

export const ComparisonPage: Page = () => (
  <Frame
    title="MultiCharts實測：v6與v7"
    source="TXF1日K，2020/1/10–2025/12/31；v6取自平台匯出Excel，v7取自平台畫面；金額單位：萬元"
    takeaway="v7的PF達2.08，最大策略虧損也由60.58萬降到53.22萬。"
  >
    <table
      data-evidence="table"
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        tableLayout: 'fixed',
        fontSize: 30,
        lineHeight: 1.35,
      }}
    >
      <colgroup>
        <col style={{ width: '43%' }} />
        <col style={{ width: '28.5%' }} />
        <col style={{ width: '28.5%' }} />
      </colgroup>
      <thead>
        <tr style={{ background: '#E9E4D8', color: accent }}>
          {['指標', '前一版 v6', '最終策略 v7'].map((heading) => (
            <th
              key={heading}
              style={{ padding: '8px 20px', border: `1px solid ${border}`, textAlign: 'left' }}
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
                  padding: '4px 20px',
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
    <Notes>
      <Note term="測試條件">
        兩版都以MultiCharts
        TXF1日K回測，交易只到2025年底，成本同為每口每邊佣金500元、滑價200元；v6勝率取自Excel。
      </Note>
      <Note term="回撤餘裕">
        最大年獲利減最大策略虧損，表示回撤門檻還剩多少空間。
      </Note>
    </Notes>
  </Frame>
);

export const YearlyPage: Page = () => (
  <Frame
    title="v7各年損益：2022仍虧損"
    source="MultiCharts v7年週期分析原始畫面，2020–2025；單位：新臺幣元"
    takeaway="2023、2024、2025連續為正；最高年度為2024年的74.46萬元。"
  >
    <div style={{ display: 'flex', alignItems: 'start', gap: 56 }}>
      <div style={{ width: 830, flexShrink: 0 }}>
        <div style={{ fontSize: 28, color: muted, marginBottom: 16 }}>MultiCharts平台原始畫面</div>
        <Screenshot
          src={yearlyImage}
          alt="MultiCharts v7年週期分析。2020至2025年損益依序為69.49、32.96、負29.87、74.17、74.46、39.47萬元。"
          width={830}
        />
        <div style={{ display: 'flex', gap: 90, marginTop: 22 }}>
          <Metric label="2022年虧損" value="−29.87" unit="萬元，5筆交易" />
          <Metric label="2024年獲利" value="＋74.46" unit="萬元，13筆交易" />
        </div>
      </div>
      <Notes top={56}>
        <Note>本頁是平台年週期分析的原始畫面，只裁掉左側選單與空白，數字未改動。</Note>
        <Note term="認列方式">
          平台的年度損益是當年每日權益變化的合計，年底仍持有的部位按評價損益計入，跨年交易會分在兩個年度。
        </Note>
        <Note>以v6實測Excel核對，每日損益依年份加總正好等於年週期表的數字。</Note>
        <Note>近三年門檻與最大年獲利都用這張表。</Note>
      </Notes>
    </div>
  </Frame>
);

export const SummaryTopPage: Page = () => (
  <Frame
    title="平台原始畫面：策略績效總結果（上）"
    source="MultiCharts v7策略績效總結果，原始畫面裁切；2020/1/10–2025/12/31"
  >
    <Screenshot
      src={summaryTopImage}
      alt="MultiCharts v7策略績效總結果上半部，顯示淨利2,606,800元、最大策略虧損532,200元、最大平倉交易虧損385,600元。"
      width={1600}
    />
  </Frame>
);

export const SummaryBottomPage: Page = () => (
  <Frame
    title="平台原始畫面：策略績效總結果（下）"
    source="MultiCharts v7策略績效總結果，原始畫面裁切；與上一頁為同一報表"
  >
    <Screenshot
      src={summaryBottomImage}
      alt="MultiCharts v7策略績效總結果下半部，顯示獲利因子2.08、交易總次數79、勝率55.7%。"
      width={1600}
    />
  </Frame>
);

export const SettingsPage: Page = () => (
  <Frame title="平台原始畫面：策略參數與回測設定" source="MultiCharts v7設定原始畫面，裁切">
    <Screenshot
      src={settingsImage}
      alt="MultiCharts v7設定，TrailMultiple為2.5、EntryBudgetMultiple為3、ModelSlippagePoints為1。"
      width={1500}
    />
  </Frame>
);
