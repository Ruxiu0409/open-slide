import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';
import {
  ComparisonPage,
  SelectionPage,
  SettingsPage,
  SummaryBottomPage,
  SummaryTopPage,
  YearlyPage,
} from './v7-pages';
import {
  VersionV1CodePage,
  VersionV1Page,
  VersionV2Page,
  VersionV3Page,
  VersionV4Page,
  VersionV5Page,
  VersionV6CodePage,
  VersionV6Page,
  VersionV7Page,
} from './versions-pages';

export const design: DesignSystem = {
  palette: { bg: '#F4F1E8', text: '#1D1C1A', accent: '#B4432A' },
  fonts: {
    display: '"Songti TC", "Noto Serif TC", "PMingLiU", Georgia, serif',
    body: '-apple-system, BlinkMacSystemFont, "PingFang TC", "Noto Sans TC", "Microsoft JhengHei", sans-serif',
  },
  typeScale: { hero: 112, body: 38 },
  radius: 6,
};

export const transition: SlideTransition = {
  duration: 260,
  exit: {
    duration: 260,
    easing: 'cubic-bezier(0.4,0,1,1)',
    keyframes: [{ opacity: 1 }, { opacity: 1 }],
  },
  enter: {
    duration: 260,
    easing: 'cubic-bezier(0,0,0.2,1)',
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};
const muted = '#77726A';
const canvas = {
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  position: 'relative',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
} satisfies CSSProperties;

const Footer = ({ source }: { source?: string }) => {
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
  source?: string;
  takeaway?: string;
  children: ReactNode;
}) => (
  <section lang="zh-Hant" data-report-page={title} style={canvas}>
    <div
      style={{ position: 'absolute', left: 112, top: 51, fontSize: 25, color: 'var(--osd-accent)' }}
    >
      {'智慧量化交易　期中報告'}
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
          color: 'var(--osd-accent)',
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

const Metric = ({
  label,
  value,
  unit,
  gold,
}: {
  label: string;
  value: string;
  unit: string;
  gold?: boolean;
}) => (
  <div style={{ width: 515 }}>
    <div style={{ fontSize: 34, color: muted, marginBottom: 38 }}>{label}</div>
    <div
      style={{
        fontSize: 98,
        fontFamily: 'Arial,sans-serif',
        fontWeight: 700,
        lineHeight: 1.15,
        color: gold ? '#b48a43' : 'var(--osd-accent)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {value}
    </div>
    <div style={{ fontSize: 32, color: muted, marginTop: 20 }}>{unit}</div>
  </div>
);

const Page01: Page = () => (
  <section lang="zh-Hant" data-report-page="封面" style={{ ...canvas, padding: 112 }}>
    <div style={{ fontSize: 34, color: '#B4432A', paddingTop: 10 }}>
      {'智慧量化交易　專題一期中報告'}
    </div>
    <h1
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 'var(--osd-size-hero)',
        fontWeight: 600,
        lineHeight: 1.12,
        margin: '120px 0 70px',
        whiteSpace: 'pre-line',
      }}
    >
      {'台指期長期趨勢策略\n與一口風險預算'}
    </h1>
    <p style={{ fontSize: 40, color: '#77726A', margin: 0, lineHeight: 1.5 }}>
      {'200日趨勢帶、隔日盤中追蹤出場、固定資金預算'}
    </p>
    <div style={{ position: 'absolute', left: 112, bottom: 205, fontSize: 33, color: '#77726A' }}>
      蔡承曄　D1249429
    </div>
    <div style={{ position: 'absolute', left: 112, bottom: 127, fontSize: 31, color: '#77726A' }}>
      {'2026年10月24日'}
    </div>
    <div style={{ position: 'absolute', left: 112, bottom: 66, fontSize: 28, color: '#77726A' }}>
      {'公開資料回測（2019–2025）＋MultiCharts TXF1平台實測（2020–2025）'}
    </div>
  </section>
);

const Page02: Page = () => (
  <Frame
    title={'研究問題與目前結果'}
    source={
      'MultiCharts TXF1日K日盤，2020–2025，初始100萬元，固定一口，手續費每邊500元、滑價每邊200元'
    }
    takeaway={'v7平台實測四項門檻全過，獲利因子2.08也達到2以上的加分條件'}
  >
    <p style={{ fontSize: 40, lineHeight: 1.4, fontWeight: 550, margin: '0 0 26px' }}>
      {'一口台指期的趨勢交易，能否同時符合獲利與回撤門檻？'}
    </p>
    <p style={{ fontSize: 30, lineHeight: 1.5, margin: '0 0 56px' }}>
      {
        '本報告的最終策略是v7。前一版v6在相同平台設定下為72筆、淨利224.32萬元、獲利因子1.86；v7只把獲利後的追蹤停損距離由3倍改為2.5倍固定進場前波幅，進場預算仍以3倍波幅計算。下方是v7的平台實測：MultiCharts TXF1日K，2020年1月10日至2025年12月31日，初始資金100萬元，只做多、最多一口，手續費每邊500元、滑價每邊200元（1點），共79筆交易。'
      }
    </p>
    <div style={{ display: 'flex', gap: 75 }}>
      <Metric label={'v7平台淨利'} value={'260.68'} unit={'萬元'} />
      <Metric label={'最大策略虧損'} value={'53.22'} unit={'萬元'} gold />
      <Metric label={'最大年獲利（2024）'} value={'74.46'} unit={'萬元'} />
    </div>
  </Frame>
);

const contents = [
  { label: '研究設定', detail: '作業要求、設計依據', page: 4 },
  { label: '策略修正歷程', detail: 'v1到v7各版規則、程式與修正原因', page: 6 },
  { label: 'MultiCharts實測績效', detail: 'v6與v7對照、門檻核對、平台原始畫面', page: 24 },
  { label: '結論', detail: '', page: 30 },
  { label: '參考文獻', detail: '', page: 31 },
];

const PageContents: Page = () => (
  <Frame title={'目錄'}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {contents.map((item, index) => (
        <div
          key={item.label}
          style={{
            display: 'grid',
            gridTemplateColumns: '100px 560px 1fr 120px',
            alignItems: 'baseline',
            padding: '14px 0',
            lineHeight: 1.3,
            borderBottom: '1px solid #D8D2C4',
          }}
        >
          <span
            style={{
              fontSize: 34,
              fontFamily: 'Arial,sans-serif',
              fontWeight: 700,
              color: 'var(--osd-accent)',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{ fontSize: 42, fontWeight: 550 }}>{item.label}</span>
          <span style={{ fontSize: 32, color: muted }}>{item.detail}</span>
          <span
            style={{
              fontSize: 34,
              fontFamily: 'Arial,sans-serif',
              color: muted,
              textAlign: 'right',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {item.page}
          </span>
        </div>
      ))}
    </div>
  </Frame>
);

const A_border = '1px solid #D8D2C4';

const A_Table = ({
  widths,
  head,
  rows,
  fontSize = 28,
  padding = '10px 16px',
}: {
  widths: number[];
  head: string[];
  rows: ReactNode[][];
  fontSize?: number;
  padding?: string;
}) => (
  <table
    data-evidence="table"
    style={{
      width: 1696,
      tableLayout: 'fixed',
      borderCollapse: 'collapse',
      fontSize,
      lineHeight: 1.4,
    }}
  >
    <colgroup>
      {widths.map((w, i) => (
        <col key={`${i}-${w}`} style={{ width: w }} />
      ))}
    </colgroup>
    <thead>
      <tr>
        {head.map((h) => (
          <th
            key={h}
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding,
              border: A_border,
            }}
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, r) => (
        <tr key={`row-${r}`} style={{ background: r % 2 === 0 ? '#FAF8F2' : '#EAE5D8' }}>
          {row.map((cell, c) => (
            <td
              key={`cell-${r}-${c}`}
              style={{
                padding,
                border: A_border,
                verticalAlign: 'middle',
                whiteSpace: 'pre-line',
              }}
            >
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const A_P = ({
  children,
  size = 30,
  color,
  margin = 0,
}: {
  children: ReactNode;
  size?: number;
  color?: string;
  margin?: string | number;
}) => (
  <p style={{ fontSize: size, lineHeight: 1.45, color: color ?? 'var(--osd-text)', margin }}>
    {children}
  </p>
);

const Page03: Page = () => (
  <Frame
    title={'作業要求與研究設定'}
    source={
      '來源：課程講義Lecture05第31–32頁［7］；臺灣期貨交易所臺股期貨契約規格［5］，2026/10/20核對'
    }
  >
    <A_Table
      widths={[210, 690, 796]}
      head={['項目', '講義要求', '本研究的設定']}
      rows={[
        ['商品與期間', '台指期，日線或分線，至少5年', 'TX日K，2019–2025共七年；每點200元［5］'],
        ['部位與本金', '一口、不加碼；初始資金100萬元', '一次0或1口，只做多，不放空'],
        ['交易成本', '來回手續費1,000元', '另加每邊1點滑價（200元），是本研究額外的假設'],
        ['結算', '參與結算', '持倉在月結算日了結，結算後重新判斷是否進場'],
        [
          '績效門檻',
          '近三年績效為正、淨利＞120萬元、最大策略虧損＜最大年獲利',
          '2023、2024、2025各年皆為正',
        ],
        ['繳交內容', '發想、程式、優缺點、修正、績效；簡報與.pla', '本報告與平台匯出的v7.pla'],
      ]}
    />
  </Frame>
);

const Page04: Page = () => (
  <Frame
    title={'200日趨勢與波動的設計依據'}
    source={
      '文獻：［1］Moskowitz, Ooi & Pedersen (2012)；［2］Faber (2013)；［3］Moreira & Muir (2017)；［4］Cederburg et al. (2020)。完整書目見參考文獻頁'
    }
    takeaway={'文獻提供動機，台指期規則與參數須由自己的資料驗證'}
  >
    <A_Table
      widths={[400, 620, 676]}
      head={['文獻', '提供的依據', '與本研究的差異']}
      rows={[
        [
          'Moskowitz、Ooi與Pedersen（2012）［1］',
          '涵蓋58種期貨與遠期契約的時間序列動能，支持測試趨勢追蹤',
          '本研究只做多台指期一口，用均線判斷趨勢',
        ],
        [
          'Faber（2013）［2］',
          '每月底檢查10個月均線，決定持有或空手',
          '本研究改成每日判斷200日均線，屬於改編，不是原規則',
        ],
        [
          'Moreira與Muir（2017）［3］',
          '高波動時降低曝險的研究動機',
          '本研究不能減成半口，只能用預算決定做0或1口',
        ],
        [
          'Cederburg等人（2020）［4］',
          '樣本內的優勢不容易變成即時可實施的績效',
          '本研究所有歷史數字都屬於開發證據',
        ],
      ]}
    />
    <A_P size={28} margin="30px 0 0">
      {
        '文獻提供研究方向，具體參數由本研究設定：200日均線、20日平均真實波幅、1倍緩衝帶、3倍固定波幅出場與20萬元進場預算，都是事前設定、再用台指期歷史資料檢驗的假說。真實波幅取「高減低、高減前收、低減前收」三者絕對值的最大值，20日採簡單平均。'
      }
    </A_P>
  </Frame>
);

const Page06: Page = () => (
  <Frame
    title={'原始均線與v1緩衝帶'}
    source={
      '公開資料回測，2019–2025，一口，來回1,000元＋每邊1點滑價；日結回撤以每日收盤評價、含未平倉損益；年獲利依平倉年度認列'
    }
    takeaway={'v1日結回撤89.34萬元，仍高於最大年獲利76.70萬元'}
  >
    <A_P color={muted} margin="0 0 26px">
      {
        'v1規則見前一頁。原始均線版是比較基準；緩衝帶在第一次價格回測前就提出，假說是減少盤整時的來回交易。'
      }
    </A_P>
    <A_Table
      widths={[260, 560, 220, 150, 230, 276]}
      head={['版本', '規則與用意', '七年淨利', '交易', '日結回撤', '最大年獲利']}
      rows={[
        [
          '原始200日均線',
          '收盤穿越均線，次日開盤進出；最簡單的基準',
          '332.02萬',
          '83筆',
          '89.34萬',
          '74.46萬',
        ],
        [
          'v1緩衝帶',
          '均線±1倍20日平均真實波幅，帶內維持原狀態',
          '339.08萬',
          '68筆',
          '89.34萬',
          '76.70萬',
        ],
      ]}
    />
    <A_P margin="30px 0 0">
      {
        '緩衝帶減少了交易，訊號出場由17筆降為4筆，但兩版的最大日結回撤相同，都來自2024年7月11日到8月5日的急跌：8月5日收盤仍在v1下緣之上，沒有觸發退出。問題在持倉回撤與出場速度，不是獲利不足。v1的已平倉回撤57.38萬元雖小於年獲利，本研究不改用較有利的口徑。'
      }
    </A_P>
  </Frame>
);

const Page07: Page = () => (
  <Frame
    title={'v2追蹤退出仍遇到跳空損失'}
    source={
      '公開資料回測，一口，來回1,000元＋每邊1點滑價。OHLC回撤：用日盤開高低收估算盤中權益，假設先到最高價再到最低價，是對策略不利的保守界線'
    }
    takeaway={'七年OHLC回撤89.56萬元＞最大年獲利82.24萬元，未通過'}
  >
    <A_P margin="0 0 28px">
      {
        'v2規則見前一頁。v2想解決200日均線退出太慢的問題，固定進場前波幅，避免下跌時出場線反而放寬。開發期2019–2022淨利160.24萬元、OHLC回撤33.84萬元，通過；延伸到2019–2025，淨利358.44萬元，卻遇到下面這筆交易。'
      }
    </A_P>
    <A_Table
      widths={[300, 1396]}
      head={['日期', '實際序列']}
      fontSize={30}
      rows={[
        ['2024/07/17', '月結算平倉；200日趨勢仍偏多，新合約被當成新交易'],
        ['2024/07/19', '重新進場23,149點；固定波幅371.05點，追蹤線約22,035.85點'],
        ['2024/08/02', '收盤跌破追蹤線，規則要等收盤才確認退出'],
        ['2024/08/05', '開盤跳空，20,711點賣出（含1點滑價）；該筆淨虧48.86萬元'],
      ]}
    />
    <A_P margin="28px 0 0">
      {
        '這筆不能事後假設在22,035.85點附近成交。失敗包含兩個問題：結算後在弱勢中重新進場，以及等收盤才處理風險。v3、v4先試著處理前者，v5處理後者。'
      }
    </A_P>
  </Frame>
);

const Page08: Page = () => (
  <Frame
    title={'v3與v4的進場修正都未通過'}
    source={
      '公開資料回測，2019–2025，一口，來回1,000元＋每邊1點滑價；OHLC回撤為日盤開高低收估算的保守界線；年獲利依平倉年度認列'
    }
    takeaway={'v3錯過未創新高的反彈；v4頻繁切換，後段回撤更大'}
  >
    <A_P color={muted} margin="0 0 26px">
      {'兩版規則見前一頁。兩版都針對v2「結算後在弱勢中重進」的問題修改進場或短期退出。'}
    </A_P>
    <A_Table
      widths={[110, 520, 190, 360, 516]}
      head={['版本', '想解決的問題與修改', '七年淨利', 'OHLC回撤／最大年獲利', '未通過的原因']}
      rows={[
        [
          'v3',
          '避免下跌中重進：收盤須突破前20日最高價（不含當日）才進場',
          '126.94萬',
          '88.06萬／52.96萬',
          '回撤過大；2025年虧4.48萬元，近三年未逐年為正',
        ],
        [
          'v4',
          '較早離開弱勢行情：長期趨勢內改用20日均線進出',
          '159.76萬',
          '123.22萬／44.22萬',
          '頻繁切換又錯過反彈，回撤比v3更大',
        ],
      ]}
    />
    <A_P margin="30px 0 0">
      {
        '兩版在開發期2019–2022都通過風險比較，延伸到七年卻失敗；只挑開發期結果，就會選到這兩版。兩個分支都保留為失敗紀錄，主策略回到v2的長期趨勢與固定波幅出場，改從出場時間著手。'
      }
    </A_P>
  </Frame>
);

const Page09: Page = () => (
  <Frame
    title={'v5先算好隔日日盤出場線'}
    source={
      '公開資料回測的成交假設；MultiCharts官方文件Stop、Intra-bar Price Movement Assumptions［6］，2026/10/20核對'
    }
    takeaway={'當日最高價不能回頭提高當日已生效的停損線'}
  >
    <A_P margin="0 0 24px">
      {
        'v5規則見前一頁。v5要解決v2「等收盤才確認」的問題：v2的1,104個隔夜持倉日中，有43日盤中觸及前一收盤已知的追蹤線，其中18日收盤又站回線上。這是改用盤中停損的動機，不代表能省下這43日的損失。'
      }
    </A_P>
    <A_Table
      widths={[290, 1406]}
      head={['時間', '可使用的資訊與成交規則']}
      padding="9px 16px"
      rows={[
        ['當日收盤', '只用已完成的收盤資料，算出明日日盤的賣出停損價'],
        ['次日開盤', '若開盤≤停損價，視為跳空，以開盤價減1點賣出'],
        ['次日盤中', '否則最低價觸及停損線時，以停損價減1點賣出'],
        ['成交限制', '停損線向下取整到1點；實際進場當天沒有盤中停損'],
        ['重新進場', '停損當日不再進場；最早隔一個交易日開盤重進'],
      ]}
    />
    <A_P margin="24px 0 0">
      {
        '停損單參照MultiCharts的Stop指令；平台以K棒的開高低收模擬盤中成交［6］。本研究對跳空的處理較保守，但兩者的成交模擬沒有逐筆對照，也不保證實盤能在停損價成交。'
      }
    </A_P>
  </Frame>
);

const Page10: Page = () => (
  <Frame
    title={'v5在首次2026新資料檢查失敗'}
    source={
      '公開資料回測，初始100萬元，一口，來回1,000元＋每邊1點滑價；單位萬元；2026僅至10/16；OHLC回撤為日盤開高低收估算的保守界線'
    }
    takeaway={'2026重置測試仍賺93.14萬元，回撤卻達186.94萬元'}
  >
    <div style={{ display: 'flex', gap: 56 }}>
      <svg
        data-evidence="chart"
        role="img"
        aria-label={'v5在首次2026新資料檢查失敗'}
        width={1010}
        height={590}
        viewBox="0 0 1010 590"
        style={{ fontFamily: 'var(--osd-font-body)', flexShrink: 0 }}
      >
        <line x1="110" x2="990" y1="452.0" y2="452.0" stroke="#D8D2C4" strokeWidth="1.6" />
        <text x={88.0} y={461.0} textAnchor="end" fontSize={26} fill="#77726A">
          {'0'}
        </text>
        <line x1="110" x2="990" y1="357.23" y2="357.23" stroke="#D8D2C4" strokeWidth="1" />
        <text x={88.0} y={366.23} textAnchor="end" fontSize={26} fill="#77726A">
          {'50'}
        </text>
        <line x1="110" x2="990" y1="262.45" y2="262.45" stroke="#D8D2C4" strokeWidth="1" />
        <text x={88.0} y={271.45} textAnchor="end" fontSize={26} fill="#77726A">
          {'100'}
        </text>
        <line x1="110" x2="990" y1="167.68" y2="167.68" stroke="#D8D2C4" strokeWidth="1" />
        <text x={88.0} y={176.68} textAnchor="end" fontSize={26} fill="#77726A">
          {'150'}
        </text>
        <line x1="110" x2="990" y1="72.91" y2="72.91" stroke="#D8D2C4" strokeWidth="1" />
        <text x={88.0} y={81.91} textAnchor="end" fontSize={26} fill="#77726A">
          {'200'}
        </text>
        <text x={88.0} y={16.0} textAnchor="end" fontSize={25} fill="#77726A">
          {'萬元'}
        </text>
        <rect x="190" y="329.67" width="140" height="122.33" rx="3" fill="#B4432A" />
        <text x={260} y={314.67} textAnchor="middle" fontSize={32} fill="var(--osd-text)">
          {'64.54'}
        </text>
        <rect x="339" y="270.19" width="140" height="181.81" rx="3" fill="#2F6B4F" />
        <text x={409} y={255.19} textAnchor="middle" fontSize={32} fill="var(--osd-text)">
          {'95.92'}
        </text>
        <text x={334.5} y={520.0} textAnchor="middle" fontSize={29} fill="#77726A">
          {'2019–2025'}
        </text>
        <rect x="620" y="97.66" width="140" height="354.34" rx="3" fill="#B4432A" />
        <text x={690} y={82.66} textAnchor="middle" fontSize={32} fill="var(--osd-text)">
          {'186.94'}
        </text>
        <rect x="769" y="270.19" width="140" height="181.81" rx="3" fill="#2F6B4F" />
        <text x={839} y={255.19} textAnchor="middle" fontSize={32} fill="var(--osd-text)">
          {'95.92'}
        </text>
        <text x={764.5} y={520.0} textAnchor="middle" fontSize={29} fill="#77726A">
          {'2019–2026/10/16'}
        </text>
        <rect x="200" y="558" width="16" height="16" rx="2" fill="#B4432A" />
        <text x={228} y={574.0} textAnchor="start" fontSize={27} fill="var(--osd-text)">
          {'OHLC回撤界線'}
        </text>
        <rect x="500" y="558" width="16" height="16" rx="2" fill="#2F6B4F" />
        <text x={528} y={574.0} textAnchor="start" fontSize={27} fill="var(--osd-text)">
          {'最大完整年平倉獲利'}
        </text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26, width: 630 }}>
        <A_P size={28}>
          {'2019–2025：OHLC回撤64.54萬元，小於最大完整年獲利95.92萬元（2024年），通過舊歷史。'}
        </A_P>
        <A_P size={28}>
          {
            '2026新資料：v5規則凍結後才下載。以100萬元空手重置測試，16筆交易淨利93.14萬元，OHLC回撤卻達186.94萬元；從2019連續跑到10/16，回撤相同。'
          }
        </A_P>
        <A_P size={28}>
          {
            '右組的年獲利只用完整年度。即使寬鬆納入2026部分年的134.90萬元，回撤仍超過它。總獲利為正，不能取代風險門檻。'
          }
        </A_P>
      </div>
    </div>
  </Frame>
);

const Page11: Page = () => (
  <Frame
    title={'v6把一口契約換算成資金風險'}
    source={
      '20萬元只決定能否進場，不是單筆虧損上限；跳空與進場當日波動仍可超過預算。波幅與風險估值來自2026年公開資料回測'
    }
    takeaway={'只在估值≤20萬元時允許新倉；固定預算不隨獲利放大'}
  >
    <A_P margin="0 0 22px">
      {
        'v6規則見前一頁。v5在2026年失敗，是因為進場前20日平均真實波幅由年初308.55點放大到6月底1,395.8點，一口的規劃風險由186,730元增加到839,080元。固定一口，不等於固定金額風險。'
      }
    </A_P>
    <p
      style={{
        fontSize: 42,
        color: 'var(--osd-accent)',
        fontWeight: 550,
        margin: '0 0 10px',
        lineHeight: 1.4,
      }}
    >
      {'規劃風險＝3 × 20日平均真實波幅 × 200元 ＋ 1,600元'}
    </p>
    <A_P size={28} color={muted} margin="0 0 22px">
      {'每點200元［5］；1,600元＝來回費1,000＋兩邊各1點滑價400＋取整預留1點200'}
    </A_P>
    <A_Table
      widths={[612, 478, 606]}
      head={['當前平均真實波幅', '規劃風險', '在預算條件下']}
      fontSize={30}
      padding="9px 16px"
      rows={[
        ['波幅300點', '181,600元', '允許評估進場'],
        ['波幅400點', '241,600元', '不送新買單'],
      ]}
    />
    <A_P size={28} margin="24px 0 0">
      {
        '20萬元是初始100萬元的20%，在任何v6回測前固定，是課堂風控假說。課堂限定一口，不能減成半口，只能在0與1口之間選擇。Moreira與Muir（2017）［3］支持高波動時降低曝險；Cederburg等人（2020）［4］指出樣本內優勢不容易變成即時可實施的績效。20%是本研究自行設定的參數。'
      }
    </A_P>
  </Frame>
);

const A_RuleRow = ({
  number,
  label,
  tag,
  body,
}: {
  number: string;
  label: string;
  tag: string;
  body: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '80px 330px 1fr',
      gap: 30,
      padding: '14px 0',
      borderTop: A_border,
    }}
  >
    <div
      style={{
        fontSize: 36,
        fontFamily: 'Arial,sans-serif',
        fontWeight: 700,
        color: 'var(--osd-accent)',
      }}
    >
      {number}
    </div>
    <div>
      <div style={{ fontSize: 34, fontWeight: 550, lineHeight: 1.3 }}>{label}</div>
      <div style={{ fontSize: 28, color: muted, lineHeight: 1.4, marginTop: 4 }}>{tag}</div>
    </div>
    <p style={{ fontSize: 29, lineHeight: 1.45, margin: 0 }}>{body}</p>
  </div>
);

const Page12: Page = () => (
  <Frame
    title={'v7的完整交易規則'}
    source={
      'MultiCharts訊號參數：EntryBudgetMultiple＝3、TrailMultiple＝2.5、每邊滑價1點（平台設定畫面）；程式匯出為v7.pla'
    }
    takeaway={'停損後重新判斷趨勢；全程0或1口、不放空、不加碼'}
  >
    <A_RuleRow
      number="01"
      label={'趨勢狀態'}
      tag={'沿用v1'}
      body={'200日均線±1倍20日平均真實波幅。收盤高於上緣開啟趨勢，低於下緣關閉，帶內維持原狀態。'}
    />
    <A_RuleRow
      number="02"
      label={'進場許可'}
      tag={'沿用v6'}
      body={'空手、趨勢開啟，且以3倍當前波幅估算的一口規劃風險≤20萬元，才送次日開盤買單。'}
    />
    <A_RuleRow
      number="03"
      label={'固定波幅追蹤'}
      tag={'v7唯一修改：3倍改2.5倍'}
      body={
        '進場價與持倉最高已完成收盤取較高者，減2.5倍固定進場前波幅，向下取整到1點，作隔日日盤停損線。'
      }
    />
    <A_RuleRow
      number="04"
      label={'退出與結算'}
      tag={'未修改'}
      body={
        '收盤跌破下緣，次日開盤退出；月結算日了結持倉，之後至少空手一個日盤；停損後重新判斷趨勢。'
      }
    />
    <A_P size={28} color={muted} margin="20px 0 0">
      {'3倍只用在進場前估算預算，2.5倍只用在持倉後的停損距離，兩個倍數不可混用。'}
    </A_P>
  </Frame>
);

const B_line = '#D8D2C4';
const B_gold = '#b48a43';

const B_Th = ({ children, width }: { children: ReactNode; width: number }) => (
  <th
    style={{
      width,
      background: 'var(--osd-text)',
      color: 'var(--osd-bg)',
      fontWeight: 600,
      textAlign: 'left',
      padding: '10px 16px',
      border: `1px solid ${B_line}`,
    }}
  >
    {children}
  </th>
);

const B_Td = ({ children, strong }: { children: ReactNode; strong?: boolean }) => (
  <td
    style={{
      padding: '8px 16px',
      border: `1px solid ${B_line}`,
      verticalAlign: 'middle',
      color: strong ? 'var(--osd-accent)' : undefined,
      fontWeight: strong ? 600 : undefined,
    }}
  >
    {children}
  </td>
);

const B_Table = ({ children }: { children: ReactNode }) => (
  <table
    data-evidence="table"
    style={{
      width: 1696,
      tableLayout: 'fixed',
      borderCollapse: 'collapse',
      fontSize: 30,
      lineHeight: 1.4,
    }}
  >
    {children}
  </table>
);

const Page20: Page = () => (
  <Frame
    title={'作業門檻的核對結果'}
    source={
      'v7（最終策略）：MultiCharts TXF1日K，2020/1/10–2025/12/31；前一版v6作對照；門檻依課程講義［7］'
    }
  >
    <B_Table>
      <thead>
        <tr>
          <B_Th width={500}>{'條件'}</B_Th>
          <B_Th width={800}>{'MultiCharts實測'}</B_Th>
          <B_Th width={396}>{'判定'}</B_Th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ background: '#FAF8F2' }}>
          <B_Td>{'至少五年、一口不加碼'}</B_Td>
          <B_Td>{'2020–2025六年，79筆；一次最多1口'}</B_Td>
          <B_Td>{'通過'}</B_Td>
        </tr>
        <tr style={{ background: '#EAE5D8' }}>
          <B_Td>{'參與結算與固定成本'}</B_Td>
          <B_Td>{'結算日收盤平倉；佣金7.90萬、滑價3.16萬'}</B_Td>
          <B_Td>{'設定符合'}</B_Td>
        </tr>
        <tr style={{ background: '#FAF8F2' }}>
          <B_Td>{'近三年逐年獲利'}</B_Td>
          <B_Td>{'2023＋74.17、2024＋74.46、2025＋39.47萬'}</B_Td>
          <B_Td>{'通過'}</B_Td>
        </tr>
        <tr style={{ background: '#EAE5D8' }}>
          <B_Td>{'淨利＞120萬元'}</B_Td>
          <B_Td>{'260.68萬元（v6：224.32萬）'}</B_Td>
          <B_Td>{'通過'}</B_Td>
        </tr>
        <tr style={{ background: '#FAF8F2' }}>
          <B_Td>{'最大策略虧損＜最大年獲利'}</B_Td>
          <B_Td>{'53.22萬＜74.46萬元（2024）'}</B_Td>
          <B_Td>{'通過'}</B_Td>
        </tr>
        <tr style={{ background: '#EAE5D8' }}>
          <B_Td>{'獲利因子≥2（加分）'}</B_Td>
          <B_Td>{'v7：2.08；前一版v6：1.86'}</B_Td>
          <B_Td strong>{'v7通過'}</B_Td>
        </tr>
      </tbody>
    </B_Table>
  </Frame>
);

const C_Ref = ({ number, children }: { number: string; children: ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '92px 1fr',
      fontSize: 26,
      lineHeight: 1.4,
      overflowWrap: 'anywhere',
    }}
  >
    <span style={{ color: 'var(--osd-accent)', whiteSpace: 'nowrap' }}>{number}</span>
    <span>{children}</span>
  </div>
);

const C_DataItem = ({ children }: { children: ReactNode }) => (
  <div style={{ fontSize: 26, lineHeight: 1.4, display: 'flex', gap: 14 }}>
    <span style={{ color: 'var(--osd-accent)' }}>{'・'}</span>
    <span>{children}</span>
  </div>
);

const Page22: Page = () => (
  <Frame title={'結論'} source={'平台實測：MultiCharts TXF1日K，2020/1/10–2025/12/31，初始100萬元'}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 34,
        fontSize: 32,
        lineHeight: 1.55,
      }}
    >
      <p style={{ margin: 0 }}>
        {
          '本研究以台指期日K檢驗一口長期趨勢策略能否同時符合作業的獲利與回撤門檻。策略以200日均線帶判斷背景，用前一日收盤算好的隔日停損線出場，並在一口的規劃風險超過20萬元時不進場。v1到v6的每次修改，都對應前一版留下的問題：出場等待、開盤跳空、盤整期的來回進出，以及2026年高波動時一口風險放大。'
        }
      </p>
      <p style={{ margin: 0 }}>
        {
          '前一版v6在平台實測為72筆、淨利224.32萬元、獲利因子1.86。最終版v7只把追蹤停損距離改為2.5倍固定進場前波幅，在相同平台設定下為79筆、淨利260.68萬元、獲利因子2.08；2023至2025年逐年獲利，最大策略虧損53.22萬元低於2024年獲利74.46萬元，相差21.24萬元。作業門檻與獲利因子2的加分線都有達到。'
        }
      </p>
      <p style={{ margin: 0 }}>
        {
          '這些結果只說明策略在已看過的歷史資料上符合條件。v7是比較過v6的結果後才選定，沒有樣本外驗證，平台也只用每邊1點滑價測試，因此不能據此推論未來行情會有相同表現。'
        }
      </p>
    </div>
  </Frame>
);

const Page27: Page = () => (
  <Frame title="v7的PowerLanguage程式節錄" source="v7已由平台匯出v7.pla；本頁為條件節錄">
    <p style={{ fontSize: 28, lineHeight: 1.5, color: muted, margin: '0 0 24px' }}>
      {
        '節錄v7的進場與停損條件，不能單獨編譯。EntryBudgetMultiple預設3，乘上當前20日波幅估算一口的規劃風險；TrailMultiple預設2.5，乘上固定進場前波幅算出隔日停損線。'
      }
    </p>
    <pre
      style={{
        fontFamily: 'Menlo,Consolas,monospace',
        fontSize: 28,
        lineHeight: 1.45,
        whiteSpace: 'pre',
        margin: 0,
      }}
    >
      {
        'PlannedRiskTWD = EntryBudgetMultiple * RangeMean * PointValueTWD\n    + RoundTripFeeTWD + 2 * ModelSlippagePoints * PointValueTWD\n    + TickSize * PointValueTWD;\n\nif (MP = 0) and TargetLong\n   and (PlannedRiskTWD <= RiskBudgetTWD) then\n    Buy ("BudgetLong") 1 Contract Next Bar At Market;\n\nPeakClose = MaxList(PeakClose, Close);\nNextStop = IntPortion((PeakClose - TrailMultiple * FrozenEntryRange)\n    / TickSize) * TickSize;\n\nSell ("RiskStop") Next Bar At NextStop Stop;'
      }
    </pre>
    <p style={{ fontSize: 28, lineHeight: 1.5, color: muted, margin: '24px 0 0' }}>
      {'完整程式另外處理月結算退出、趨勢退出與停損後重新進場。'}
    </p>
  </Frame>
);

const PageReferences: Page = () => (
  <Frame title={'參考文獻'}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <C_Ref number={'［1］'}>
        {'Moskowitz, T. J., Ooi, Y. H., & Pedersen, L. H. (2012). Time series momentum. '}
        <em>{'Journal of Financial Economics, 104'}</em>
        {'(2), 228–250.'}
      </C_Ref>
      <C_Ref number={'［2］'}>
        {
          'Faber, M. (2013, June 14). QTAA update: Conclusions and FAQs. https://mebfaber.com/2013/06/14/qtaa-update-conclustions-and-faqs/'
        }
      </C_Ref>
      <C_Ref number={'［3］'}>
        {'Moreira, A., & Muir, T. (2017). Volatility-managed portfolios. '}
        <em>{'Journal of Finance, 72'}</em>
        {'(4), 1611–1644. （NBER Working Paper 22208, 2016）'}
      </C_Ref>
      <C_Ref number={'［4］'}>
        {
          "Cederburg, S., O'Doherty, M. S., Wang, F., & Yan, X. (2020). On the performance of volatility-managed portfolios. "
        }
        <em>{'Journal of Financial Economics, 138'}</em>
        {'(1), 95–117.'}
      </C_Ref>
      <C_Ref number={'［5］'}>
        {
          '臺灣期貨交易所。臺股期貨契約規格。https://www.taifex.com.tw/cht/2/tX?menuid1=12（2026年10月20日查閱）'
        }
      </C_Ref>
      <C_Ref number={'［6］'}>
        {
          'MultiCharts. Stop；Intra-bar Price Movement Assumptions；How Scripts Work。https://www.multicharts.com/trading-software/index.php?title=Stop 等（2026年10月20日查閱）'
        }
      </C_Ref>
      <C_Ref number={'［7］'}>{'課程講義：Lecture05 MultiCharts策略開發實務，第31–32頁。'}</C_Ref>
    </div>
    <h2
      style={{
        fontSize: 30,
        fontWeight: 550,
        lineHeight: 1.3,
        color: 'var(--osd-accent)',
        margin: '40px 0 14px',
      }}
    >
      {'研究資料'}
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <C_DataItem>
        {'臺灣期貨交易所TX一般交易時段公開日K資料（未調整近月），2017年至2026年10月16日'}
      </C_DataItem>
      <C_DataItem>
        {'MultiCharts「TXF1 FCU_TrendBudget_Signal 策略回測績效報告」xlsx（v6）'}
      </C_DataItem>
      <C_DataItem>
        {'2026年10月24日MultiCharts平台截圖四張：績效總表、年週期分析、策略設定（v7）'}
      </C_DataItem>
      <C_DataItem>{'平台匯出程式：v7.pla（最終版）、FCUpla.pla（v6）'}</C_DataItem>
    </div>
  </Frame>
);

export const meta: SlideMeta = {
  title: '台指期長期趨勢策略與一口風險預算',
  createdAt: '2026-10-19T09:01:40.677Z',
};

export const notes: string[] = [
  '這份報告的最終策略是v7，前面先交代從原始均線一路改到v6的過程。v7只把獲利後追蹤停損距離從3倍改成2.5倍，進場預算仍用3倍波幅。今天更新的是MultiCharts TXF1平台實測，v1至v6的歷程頁採公開資料歷史回測。\n\n資料來源\nWindows回傳_2026-10-24 截圖：220622、221025、221051、221109；Windows回傳_2026-10-24/v7.pla。\n加分改版_v7/結果_完整評估/摘要.json。',
  '這頁是最終版v7在MultiCharts的結果。TXF1日K從2020年1月10日測到2025年底，初始100萬元，每邊佣金500元、滑價200元，只做多且最多一口。79筆交易，淨利260.68萬元，最大策略虧損53.22萬元，2024年獲利74.46萬元。PF是2.08，達到2以上的加分條件。前一版v6是PF 1.86、淨利224.32萬元。\n\n資料來源\nWindows回傳_2026-10-24 截圖：220622、221025、221109；Windows回傳_2026-10-24/v7.pla。',
  '目錄照作業要求的順序排。先交代作業要求和研究設定，再講策略從v1一路修到v7的過程。績效分兩段：v1到v6是公開資料回測，v7看MultiCharts實測和平台原始畫面。最後是策略發想、限制和結論，附錄放指標定義、預算檢查和程式節錄。\n\n資料來源\nLecture05_MultiCharts策略開發實務.pptx，第31–32頁。',
  '以Lecture05第31頁專題要求為準。近三年績效為正，本研究以2023、2024、2025各年皆為正來核對。滑價1點是本研究額外的假設。\n\n資料來源\nLecture05_MultiCharts策略開發實務.pptx，第31–32頁；1151_智慧量化交易_課程介紹.pptx，第4–5頁。\n臺灣期貨交易所，臺股期貨契約規格：https://www.taifex.com.tw/cht/2/tX?menuid1=12 ，2026/10/20核對。',
  'Moskowitz等人的時間序列動能研究涵蓋58種期貨與遠期契約，與本報告只做多的台指期均線規則不同。Faber的模型是月底檢查10個月均線，本研究改成每日判斷200日均線，屬於改編。Moreira與Muir提供高波動時降低風險的動機；Cederburg等人提醒樣本內優勢不易轉為即時可實施績效。具體參數由本研究自行設定。\n\n資料來源\nMoskowitz, Ooi & Pedersen (2012), Time Series Momentum. https://www.aqr.com/Insights/Research/Journal-Article/Time-Series-Momentum 。Faber (2013), QTAA Update: Conclusions and FAQs. https://mebfaber.com/2013/06/14/qtaa-update-conclustions-and-faqs/ 。2026/10/20核對。\nMoreira & Muir (2016/2017), Volatility-Managed Portfolios. https://www.nber.org/papers/w22208 。Cederburg et al. (2020), On the performance of volatility-managed portfolios. https://www.sciencedirect.com/science/article/pii/S0304405X2030132X 。2026/10/20核對摘要。',
  '這頁把最早的兩版放在一起看。原始均線只用一條200日均線，收盤在上面就隔天開盤買一口，掉到下面就隔天開盤賣掉。v1在第一次回測之前就提出，只改趨勢判斷：均線上下各加一倍20日平均真實波幅，收盤要高過上緣才進場、低於下緣才出場，中間不動。兩版都沒有停損，結算日一律平倉，隔一個日盤再判斷。',
  '這是早期草稿的實際程式，原始均線和v1是同一支訊號，用Mode切換。Mode等於1時帶寬是0，就是原始均線；等於2時帶寬是一倍波幅。買賣都用Next Bar At Market，也就是收盤確認、隔天開盤成交。這份草稿當時沒有在平台編譯，結算用收盤價代理，公開資料回測則改用期交所最後結算價，兩者口徑不同。',
  '一開始希望用最簡單的趨勢規則建立比較基準。v1在第一次價格回測前就提出波動緩衝，假說是減少盤整交易，代價是較晚進出。原始無緩衝均線版的日結回撤也是89.34萬元，最大年獲利74.46萬元；v1緩衝版最大年獲利76.70萬元，均未過風險門檻。問題在持倉回撤與出場速度，不是獲利不足。\n\n資料來源\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。\n公開資料回測/結果/full_mode1.json；公開資料回測/結果/full_mode2.json。',
  'v2開始加出場保護。進場那天先把訊號日的平均真實波幅記下來，持倉期間不再更新；峰值取進場成交價和持倉後最高收盤的較高者。收盤跌破峰值減3倍固定波幅，就隔天開盤賣出，同時把趨勢狀態關掉，要等收盤再站上上緣才重新進場。右邊是依凍結規則寫的虛擬碼，v2沒有平台程式。',
  'v2以進場成交價與持倉最高已完成收盤價中的較高者，減3倍進場前平均真實波幅，產生追蹤退出參考。只向上提高，波幅進場時固定。當時仍等待當日收盤確認，再次日開盤賣出。7月結算後重進，剛好遇到8月急跌，不能在事後假設已於22,035.85點附近成交。問題包含弱勢重進與出場等待，後續分開試驗。\n\n資料來源\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。\n風控改版_v2/結果/full_same_period_risk3.json。',
  'v3只動進場。v2在月結算後會在下跌途中重新買回，所以v3要求每次進場前，收盤都要高過前20個交易日的最高價，不含當天。出場仍是v2的3倍追蹤退出。20日沿用通道的常見預設，沒有掃參數。右邊一樣是虛擬碼。',
  'v4換一個方向：拿掉v3的新高條件，也拿掉3倍追蹤退出，改用20日均線管進出。200日帶還在，只是當作背景；在多頭背景裡，收盤高於20日均線就買、低於就賣。跌破20日均線不會關掉長期趨勢，所以站回來就再買。剛好等於20日均線時不新進場。',
  'v3通道排除當日最高價，收盤突破後仍次日開盤成交，避免不可能的當日最高價條件。它在2025年虧4萬4,800元，也未滿足近三年逐年為正。v4移除嚴格創高限制，改用20日均線判斷進出，但盤整與反彈切換效果不好。兩版在開發期曾通過風險比較，七年卻失敗，不能只挑開發期結果採用。兩個分支均保留，主策略回到長期趨勢與固定波幅出場。\n\n資料來源\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。\n風控改版_v6/報告資料.json。',
  'v5回到v2的進場，改的是停損的時間。每天收盤先算好隔天的停損價，取整到1點，隔天日盤直接掛停損單，不用等收盤。開盤就跳空跌破，用開盤價再減1點成交，不假設在停損價成交。進場當天還沒有停損單。停損當天把趨勢關掉，之後收盤再站上上緣才重進。平台實際寫法在v6程式頁。',
  'v5的重點是訂單時間，並非再縮短均線。停損價在前一收盤已知，次日日盤有效，不使用當日最高價重新計算再假設同日成交。開盤跳空採更差價格，保留跳空風險。進場當天缺少盤中保護，停損後也不立即反覆進場。這與MultiCharts的OHLC模擬仍需逐筆核對，尤其Bar Magnifier、IOG、日盤設定與停損跳空行為。\n\n資料來源\nMultiCharts官方文件，Stop：https://www.multicharts.com/trading-software/index.php?title=Stop ；Intra-bar Price Movement Assumptions：https://www.multicharts.com/trading-software/index.php?title=Intra-bar_Price_Movement_Assumptions 。2026/10/20核對。\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。',
  '2019至2025時，v5的64.54萬元OHLC回撤小於最大完整年獲利95.92萬元，先通過舊歷史。首次下載2026新資料後，以100萬元空手重置的測試雖有93.14萬元淨利，OHLC回撤達186.94萬元。連續跑到10月16日也有同樣回撤。圖中刻意只用完整年度的95.92萬元作年獲利比較，沒有把2026部分年當完整年。即便寬鬆納入2026部分年的134.90萬元，回撤仍超過它。因此總獲利為正不能取代風險門檻。\n\n資料來源\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。\n風控改版_v5/結果/new_2026_v5_stop3.json；風控改版_v5/結果/continuous_to_2026_v5_stop3.json。',
  'v6只多一個進場許可。空手、趨勢開啟時，先估一口的規劃風險：3倍當前波幅乘每點200元，再加1,600元的費用、滑價和取整預留。小於等於20萬元才送隔天的買單，超過就不進場。預算固定20萬元，不跟著獲利放大。下面兩段是v6訊號程式的原文，注意這裡算預算用的是TrailMultiple，也就是和停損同一個3倍。',
  '這頁是v6程式裡停損的部分，也就是v5規則在平台上的寫法。第67到69行在進場那根K棒記下前一日的平均波幅和進場價；第71到73行每天更新峰值和隔天的停損價，向下取整到1點。第88行在停損當天把趨勢關掉。第105到110行：趨勢已經轉弱就隔天市價賣，否則掛停損單。',
  'v5在2026年的進場前波幅由年初308.55點放大到6月底1,395.8點，3倍波幅的一口風險連同成本預留由186,730元增加到839,080元。固定一口並不代表固定金額風險。課堂不准減成半口，所以v6只能在0與1口間選擇，超過20萬元就不進場。20萬元是初始100萬元的20%，是事前固定的課堂風控假說。它不是單筆最大虧損保證，跳空、進場當日波動仍可能超過預算。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。\nMoreira & Muir (2016/2017), Volatility-Managed Portfolios. https://www.nber.org/papers/w22208 。Cederburg et al. (2020), On the performance of volatility-managed portfolios. https://www.sciencedirect.com/science/article/pii/S0304405X2030132X 。2026/10/20核對摘要。\n臺灣期貨交易所，臺股期貨契約規格：https://www.taifex.com.tw/cht/2/tX?menuid1=12 ，2026/10/20核對。',
  'v7是最終策略，和前一版v6相比只改出場距離。v6的停損和預算共用TrailMultiple這個3倍，v7把它拆成兩個參數：TrailMultiple改成2.5，只管停損線；新增EntryBudgetMultiple，維持3，只管進場預算。所以進場的門檻跟v6一樣，持倉後停損拉近半倍波幅。程式另外多一行檢查，預算倍數不能小於追蹤倍數。',
  '這次v7只動一個地方，就是獲利後的追蹤停損，從原本3倍固定進場波幅改成2.5倍。進場時要不要做這一口，還是用3倍波幅去算20萬元預算。我先回頭看v6的29筆RiskStop，其中23筆連10萬元的最大有利波動都沒有，合計虧了210.86萬元。先試過50日均線斜率和停損後冷卻5日，開發期都變差。第二輪的1.5倍、2倍也讓PF下降，2.5倍在開發期從1.69提高到1.74，選定後才跑完整期間。失敗的結果都有保留。\n\n資料來源\n加分改版_v7/虧損階段統計.json；加分改版_v7/結果/摘要.json；加分改版_v7/結果_第二輪/摘要.json；加分改版_v7/規則凍結.json；Windows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 221109.png。',
  'v7沿用200日趨勢帶、20萬元預算和0或1口限制。這次只動追蹤停損倍數：進場預算照舊用3倍當前波幅估算，持倉的隔日停損線改成峰值減2.5倍固定進場前波幅。不要把兩個倍數混在一起。月結算與停損後重新判斷趨勢的規則沒有改。\n\n資料來源\nWindows回傳_2026-10-24 截圖：221109；Windows回傳_2026-10-24/v7.pla。\n加分改版_v7/規則凍結.json；加分改版_v7/結果_完整評估/摘要.json。',
  '這段是v7的條件節錄，不能單獨編譯。進場預算用EntryBudgetMultiple，預設3倍；停損線用TrailMultiple，預設2.5倍固定進場前波幅。完整程式還處理結算、趨勢退出與停損後重新進場。平台已匯出v7.pla。\n\n資料來源\nWindows回傳_2026-10-24 截圖：221109；Windows回傳_2026-10-24/v7.pla。\n加分改版_v7/規則凍結.json。',
  '這張是同一個MultiCharts TXF1期間的結果。前一版v6是72筆、淨利224.32萬、PF 1.86；最終版v7是79筆、淨利260.68萬、PF 2.08。最大策略虧損從60.58萬降到53.22萬。回撤餘裕就是最大年獲利減掉最大策略虧損，v7有21.24萬，v6只有9.24萬。v6的勝率是從原始Excel查到的54.2%。\n\n資料來源\n期中報告/MultiCharts實測/TXF1  FCU_TrendBudget_Signal 策略回測績效報告.xlsx；Windows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 221025.png；Windows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 220622.png。',
  '這是平台年週期分析的原始表格，只裁掉左邊選單和空白。2020年賺69.49萬，2021年32.96萬，2022年虧29.87萬。之後2023到2025年都正獲利，最高是2024年的74.46萬。我不把2022年的虧損藏掉，因為這就是策略實際要承受的年度波動。\n\n資料來源\nWindows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 220622.png；同資料夾的221051.png為相同年週期表格。',
  '這頁只用MultiCharts的v7策略報告判定。從2020年1月10日到2025年底，79筆，最多一口。佣金7.90萬元、滑價3.16萬元。逐年看，2020賺69.49萬、2021賺32.96萬、2022虧29.87萬、2023賺74.17萬、2024賺74.46萬、2025賺39.47萬；淨利260.68萬，勝率55.7%。最大策略虧損53.22萬，比2024年的年獲利低21.24萬。PF 2.08，四項門檻都過。前一版v6是72筆、PF 1.86、淨利224.32萬，回撤與最大年獲利只差9.24萬。v7.pla已從平台匯出。\n\n資料來源\nLecture05_MultiCharts策略開發實務.pptx，第31–32頁。\nWindows回傳_2026-10-24 截圖：220622、221025、221051、221109；Windows回傳_2026-10-24/v7.pla。\nMultiCharts實測/TXF1  FCU_TrendBudget_Signal 策略回測績效報告.xlsx。',
  '這張是MultiCharts策略績效總結果的上半段原始畫面。淨利欄是260.68萬，最大策略虧損是53.22萬。注意最大平倉交易虧損是38.56萬，它只看每筆平倉後的累積權益，不含持倉期間的浮動虧損，也不是單筆交易的最大虧損，不能拿來代替最大策略虧損。\n\n資料來源\nWindows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 221025.png；Windows回傳_2026-10-24/v7.pla。',
  '這裡接著看同一張報表的下半段。平台列出的獲利因子是2.08，交易總次數79筆，勝率55.7%。這三個數字和前面的比較表是同一份平台結果。\n\n資料來源\nWindows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 221025.png；加分改版_v7/結果_完整評估/摘要.json。',
  '最後看平台的設定畫面，追蹤倍數確實是2.5，進場預算倍數仍是3，畫面上的模型滑價是每邊1點。v7在平台的PF過2。2019到2025都是看過的資料，也還沒有樣本外驗證。每邊2點滑價雖已在公開資料模型測過，平台還沒有重跑。\n\n資料來源\nWindows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 221109.png；加分改版_v7/結果_完整評估/摘要.json；加分改版_v8/改版結果與下一步.md；加分改版_v8/MultiCharts操作單.md。',
  '結論是最終版v7在這張TXF1圖表的歷史回測四項門檻都過：PF 2.08、淨利260.68萬、近三年每年正獲利，最大策略虧損53.22萬低於最大年獲利74.46萬，差21.24萬。程式已匯出為v7.pla。2019至2025沒有樣本外資料，而且每邊2點滑價還沒在平台重跑。\n\n資料來源\nWindows回傳_2026-10-24 截圖：220622、221025、221109；Windows回傳_2026-10-24/v7.pla。\n加分改版_v7/結果_完整評估/摘要.json。',
  '參考文獻依正文引用的［1］到［7］排序，期刊論文、網路文件和課程講義都列在這裡；下面另列報告用到的研究資料。',
];

export default [
  Page01,
  Page02,
  PageContents,
  Page03,
  Page04,
  VersionV1Page,
  VersionV1CodePage,
  Page06,
  VersionV2Page,
  Page07,
  VersionV3Page,
  VersionV4Page,
  Page08,
  VersionV5Page,
  Page09,
  Page10,
  VersionV6Page,
  VersionV6CodePage,
  Page11,
  VersionV7Page,
  SelectionPage,
  Page12,
  Page27,
  ComparisonPage,
  YearlyPage,
  Page20,
  SummaryTopPage,
  SummaryBottomPage,
  SettingsPage,
  Page22,
  PageReferences,
] satisfies Page[];
