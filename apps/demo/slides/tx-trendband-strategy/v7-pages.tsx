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

const SelectionPage: Page = () => (
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

const ComparisonPage: Page = () => (
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

const YearlyPage: Page = () => (
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

const SummaryTopPage: Page = () => (
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

const SummaryBottomPage: Page = () => (
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

const SettingsPage: Page = () => (
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

export const v7Pages: Page[] = [
  SelectionPage,
  ComparisonPage,
  YearlyPage,
  SummaryTopPage,
  SummaryBottomPage,
  SettingsPage,
];

export const v7Notes: string[] = [
  '這次v7只動一個地方，就是獲利後的追蹤停損，從原本三倍固定進場波幅改成二點五倍。進場時要不要做這一口，還是用三倍波幅去算二十萬元預算。我先回頭看v6的二十九筆RiskStop，其中二十三筆連十萬元的最大有利波動都沒有，合計虧了二百一十點八六萬元。先試過五十日均線斜率和停損後冷卻五日，開發期都變差。第二輪的一點五倍、兩倍也讓PF下降，二點五倍在開發期提高到一點七四，選定後才跑完整期間。失敗的結果都有保留。\n\n資料來源\n加分改版_v7/虧損階段統計.json；加分改版_v7/結果/摘要.json；加分改版_v7/結果_第二輪/摘要.json；加分改版_v7/規則凍結.json；Windows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 221109.png。',
  '這張是同一個MultiCharts TXF1期間的結果。v6是已繳交版，七十二筆、淨利二百二十四點三二萬、PF一點八六；v7是候選版，七十九筆、淨利二百六十點六八萬、PF二點零八。最大策略虧損從六十點五八萬降到五十三點二二萬。回撤餘裕就是最大年獲利減掉最大策略虧損，v7有二十一點二四萬。勝率的v6數字是從原始Excel查到的五十四點二％。\n\n資料來源\n期中報告/MultiCharts實測/TXF1  FCU_TrendBudget_Signal 策略回測績效報告.xlsx；Windows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 221025.png；Windows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 220622.png。',
  '這是平台年週期分析的原始表格，只裁掉左邊選單和空白。二〇二〇年賺六十九點四九萬，二〇二一年三十二點九六萬，二〇二二年虧二十九點八七萬。之後二〇二三到二〇二五年都正獲利，最高是二〇二四年的七十四點四六萬。我不把二〇二二年的虧損藏掉，因為這就是策略實際要承受的年度波動。\n\n資料來源\nWindows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 220622.png；同資料夾的221051.png為相同年週期表格。',
  '這張是MultiCharts策略績效總結果的上半段原始畫面。淨利欄是二百六十點六八萬，最大策略虧損是五十三點二二萬。注意最大平倉交易虧損是三十八點五六萬，它是單筆平倉交易的數字，不能拿來代替整段資金曲線的最大策略虧損。\n\n資料來源\nWindows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 221025.png；Windows回傳_2026-10-24/v7.pla。',
  '這裡接著看同一張報表的下半段。平台列出的獲利因子是二點零八，交易總次數七十九筆，勝率五十五點七％。這三個數字和前面的比較表是同一份平台結果，不是拿Python結果來替代。\n\n資料來源\nWindows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 221025.png；加分改版_v7/結果_完整評估/摘要.json。',
  '最後看平台的設定畫面，追蹤倍數確實是二點五，進場預算倍數仍是三，畫面上的模型滑價是每邊一點。這個候選版在平台PF過二，但用公開資料、同一段期間跑Python，v7約二點零九，反而低於v6的二點二二。日期、交易時段、價格和TXF1的串接差異還沒逐項拆開。二〇一九到二〇二五都是看過的資料，也還沒有樣本外驗證。每邊兩點滑價雖已在公開資料模型測過，平台還沒有重跑。\n\n資料來源\nWindows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 221109.png；加分改版_v7/結果_完整評估/摘要.json；加分改版_v8/改版結果與下一步.md；加分改版_v8/MultiCharts操作單.md。',
];
