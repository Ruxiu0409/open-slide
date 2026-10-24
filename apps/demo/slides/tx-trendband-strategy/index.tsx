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
  appendix,
  children,
}: {
  title: string;
  source?: string;
  takeaway?: string;
  appendix?: boolean;
  children: ReactNode;
}) => (
  <section lang="zh-Hant" data-report-page={title} style={canvas}>
    <div
      style={{ position: 'absolute', left: 112, top: 51, fontSize: 25, color: 'var(--osd-accent)' }}
    >
      {appendix ? '研究附錄' : '智慧量化交易　期中報告'}
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

const Column = ({ title, children }: { title: string; children: ReactNode }) => (
  <div style={{ width: 800 }}>
    <h2
      style={{
        fontSize: 42,
        fontWeight: 550,
        color: 'var(--osd-accent)',
        margin: '12px 0 65px',
        lineHeight: 1.3,
      }}
    >
      {title}
    </h2>
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 52, fontSize: 37, lineHeight: 1.5 }}
    >
      {children}
    </div>
  </div>
);

const Rule = ({ label, body, number }: { label: string; body: string; number: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 40, minHeight: 148 }}>
    <div
      style={{
        fontSize: 42,
        fontFamily: 'Arial,sans-serif',
        fontWeight: 700,
        color: 'var(--osd-accent)',
      }}
    >
      {number}
    </div>
    <div>
      <h2 style={{ fontSize: 39, lineHeight: 1.25, fontWeight: 550, margin: '0 0 20px' }}>
        {label}
      </h2>
      <p style={{ fontSize: 35, lineHeight: 1.5, color: muted, margin: 0 }}>{body}</p>
    </div>
  </div>
);

const Definition = ({ title, body }: { title: string; body: string }) => (
  <div style={{ marginBottom: 42 }}>
    <h2 style={{ fontSize: 40, fontWeight: 550, color: 'var(--osd-accent)', margin: '0 0 20px' }}>
      {title}
    </h2>
    <p style={{ fontSize: 36, lineHeight: 1.5, whiteSpace: 'pre-line', margin: 0 }}>{body}</p>
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
  { label: '研究設定', detail: '作業要求、設計依據、資料期間', page: 4 },
  { label: '策略修正歷程', detail: 'v1到v6的失敗與修正，v7只改追蹤距離', page: 7 },
  { label: '公開資料回測績效', detail: 'v1–v6同期間比較、v6年度損益與回撤', page: 15 },
  { label: 'MultiCharts實測績效', detail: 'v6與v7對照、門檻核對、平台原始畫面', page: 21 },
  { label: '策略發想與限制', detail: '和課堂方法的差異，證據範圍', page: 27 },
  { label: '結論', detail: '', page: 28 },
  { label: '附錄', detail: '指標定義、預算檢查、補充績效、程式節錄', page: 29 },
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
            padding: '18px 0',
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
      '來源：課程講義Lecture05第31–32頁、1151智慧量化交易課程介紹第4–5頁［7］；臺灣期貨交易所臺股期貨契約規格［5］，2026/10/20核對'
    }
  >
    <A_Table
      widths={[210, 690, 796]}
      head={['項目', '講義要求', '本研究的解讀與設定']}
      rows={[
        ['商品與期間', '台指期，日線或分線，至少5年', 'TX日K，2019–2025共七年；每點200元［5］'],
        ['部位與本金', '一口、不加碼；初始資金100萬元', '一次0或1口，只做多，不放空'],
        [
          '交易成本',
          '來回手續費1,000元',
          '另加每邊1點滑價，是本研究額外的假設；1,000元沿用講義的固定成本，不代表實際券商費稅',
        ],
        ['結算', '參與結算', '持倉在月結算日了結，結算後重新判斷是否進場'],
        [
          '績效門檻',
          '近三年績效為正、淨利＞120萬元、最大策略虧損＜最大年獲利',
          '講義沒有說明「近三年為正」是否逐年；本研究採較嚴格的解讀：2023、2024、2025各年皆為正',
        ],
        [
          '繳交內容',
          '發想、程式、優缺點、修正、績效；簡報與.pla',
          '期中報告依課程介紹第4頁，暫訂10月27日',
        ],
        [
          '評分比重',
          '策略合理性40%、策略績效30%、策略發想30%（第32頁）',
          '這是專題本身的評分；課程介紹第5頁的「期中30%」是整門課的總成績比重，兩者層級不同',
        ],
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
        '上述文獻都沒有驗證本策略或20%預算。200日均線、20日平均真實波幅、1倍緩衝帶、3倍固定波幅出場與20萬元進場預算，都是事前設定、再用台指期歷史資料檢驗的假說，不是文獻證明的最佳參數。真實波幅取「高減低、高減前收、低減前收」三者絕對值的最大值，20日採簡單平均。'
      }
    </A_P>
  </Frame>
);

const Page05: Page = () => (
  <Frame
    title={'資料期間與驗證順序'}
    source={
      '來源：臺灣期貨交易所期貨每日行情與最後結算價，2017–2025年度檔與2026年1–10月月檔；下載網址與SHA256保存於來源紀錄'
    }
    takeaway={'v6所有現有績效都是歷史開發證據，沒有獨立樣本外結果'}
  >
    <A_P margin="0 0 30px">
      {
        '價格是臺灣期貨交易所TX一般交易時段的未調整近月日K：近月合約持有到結算日，下一交易日才換月，保留到期與換月價差；到期以官方最後結算價了結，不用現貨指數計算期貨損益。v1至v6的數字都是這份資料的公開資料回測。'
      }
    </A_P>
    <A_Table
      widths={[330, 1366]}
      head={['資料', '用途與目前狀態']}
      rows={[
        ['2017–2018', '只供200日均線與20日波幅暖機，不列入作業損益'],
        ['2019–2022', '開發期；倍數與預算的鄰近設定只在這段比較'],
        ['2023–2025', '早期曾作保留期；之後每次改版都看過，已不算未使用資料'],
        [
          '2026/01/02–10/16',
          'v5規則凍結後才下載的190根日K，是v5的首次新資料檢查，結果失敗；v6依這次失敗設計，對v6已是看過的資料',
        ],
        ['v6凍結時點', '2026年10月19日18:20（台北時間）凍結規則與程式，之後才跑任何v6回測'],
      ]}
    />
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
        '20萬元是初始100萬元的20%，在任何v6回測前固定，是課堂風控假說。課堂限定一口，不能減成半口，只能在0與1口之間選擇。Moreira與Muir（2017）［3］支持高波動時降低曝險；Cederburg等人（2020）［4］提醒樣本內優勢不容易變成即時可實施的績效。兩者都沒有驗證本策略或20%預算。'
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

const Page14: Page = () => (
  <Frame
    title={'六個版本的同期間比較'}
    source={'2019–2025，單位：萬元；OHLC回撤界線包含未平倉損益'}
    takeaway={'v1～v4未過風險比較；v5、v6通過七年歷史門檻'}
  >
    <table
      data-evidence="table"
      style={{
        width: 1696,
        height: 585,
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        fontSize: 32,
        lineHeight: 1.4,
      }}
    >
      <colgroup>
        <col style={{ width: 149.3 }} />
        <col style={{ width: 641.97 }} />
        <col style={{ width: 301.58 }} />
        <col style={{ width: 301.58 }} />
        <col style={{ width: 301.58 }} />
      </colgroup>
      <thead>
        <tr>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'版本'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'主要改動'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'淨利'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'OHLC回撤'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'最大年獲利'}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ background: '#FAF8F2' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'v1'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'200日均線＋波動緩衝'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'339.08'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'90.10'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'76.70'}
          </td>
        </tr>
        <tr style={{ background: '#EAE5D8' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'v2'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'加入收盤確認的追蹤退出'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'358.44'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'89.56'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'82.24'}
          </td>
        </tr>
        <tr style={{ background: '#FAF8F2' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'v3'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'進場須收盤突破前20日高點'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'126.94'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'88.06'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'52.96'}
          </td>
        </tr>
        <tr style={{ background: '#EAE5D8' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'v4'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'改用20日均線進出場'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'159.76'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'123.22'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'44.22'}
          </td>
        </tr>
        <tr style={{ background: '#FAF8F2' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'v5'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'前一收盤算好隔日盤中出場線'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'375.26'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'64.54'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'95.92'}
          </td>
        </tr>
        <tr style={{ background: '#EAE5D8' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'v6'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'v5加上20萬元進場風險預算'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'301.92'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'78.40'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'108.38'}
          </td>
        </tr>
      </tbody>
    </table>
  </Frame>
);

const Page15: Page = () => (
  <Frame
    title={'v6七年年度損益'}
    source={'2019–2025，單位：萬元；按平倉年度認列，期末強制平倉'}
    takeaway={'2023、2024、2025逐年為正；2022仍虧損10.68萬元'}
  >
    <svg
      data-evidence="chart"
      role="img"
      aria-label={'v6七年年度損益'}
      width={1696}
      height={590}
      viewBox="0 0 1696 590"
      style={{ fontFamily: 'var(--osd-font-body)' }}
    >
      <line x1="110" x2="1668" y1="452.0" y2="452.0" stroke="#D8D2C4" strokeWidth="1" />
      <text x={88.0} y={461.0} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
        {'-25'}
      </text>
      <line x1="110" x2="1668" y1="382.5" y2="382.5" stroke="#D8D2C4" strokeWidth="1.6" />
      <text x={88.0} y={391.5} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
        {'0'}
      </text>
      <line x1="110" x2="1668" y1="313.0" y2="313.0" stroke="#D8D2C4" strokeWidth="1" />
      <text x={88.0} y={322.0} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
        {'25'}
      </text>
      <line
        x1="110"
        x2="1668"
        y1="243.50000000000003"
        y2="243.50000000000003"
        stroke="#D8D2C4"
        strokeWidth="1"
      />
      <text x={88.0} y={252.5} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
        {'50'}
      </text>
      <line x1="110" x2="1668" y1="174.0" y2="174.0" stroke="#D8D2C4" strokeWidth="1" />
      <text x={88.0} y={183.0} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
        {'75'}
      </text>
      <line x1="110" x2="1668" y1="104.5" y2="104.5" stroke="#D8D2C4" strokeWidth="1" />
      <text x={88.0} y={113.5} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
        {'100'}
      </text>
      <line
        x1="110"
        x2="1668"
        y1="35.00000000000006"
        y2="35.00000000000006"
        stroke="#D8D2C4"
        strokeWidth="1"
      />
      <text x={88.0} y={44.0} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
        {'125'}
      </text>
      <text x={88.0} y={16.0} textAnchor="end" fontSize={25} fontWeight={400} fill="#77726A">
        {'萬元'}
      </text>
      <rect x="141.16" y="277.64" width="151.25" height="104.86" rx="3" fill="#2F6B4F" />
      <text
        x={216.79}
        y={262.64}
        textAnchor="middle"
        fontSize={32}
        fontWeight={400}
        fill="var(--osd-text)"
      >
        {'37.72'}
      </text>
      <text x={221.29} y={520.0} textAnchor="middle" fontSize={29} fontWeight={400} fill="#77726A">
        {'2019'}
      </text>
      <rect x="363.73" y="283.42" width="151.25" height="99.08" rx="3" fill="#2F6B4F" />
      <text
        x={439.36}
        y={268.42}
        textAnchor="middle"
        fontSize={32}
        fontWeight={400}
        fill="var(--osd-text)"
      >
        {'35.64'}
      </text>
      <text x={443.86} y={520.0} textAnchor="middle" fontSize={29} fontWeight={400} fill="#77726A">
        {'2020'}
      </text>
      <rect x="586.30" y="224.48" width="151.25" height="158.02" rx="3" fill="#2F6B4F" />
      <text
        x={661.93}
        y={209.48}
        textAnchor="middle"
        fontSize={32}
        fontWeight={400}
        fill="var(--osd-text)"
      >
        {'56.84'}
      </text>
      <text x={666.43} y={520.0} textAnchor="middle" fontSize={29} fontWeight={400} fill="#77726A">
        {'2021'}
      </text>
      <rect x="808.87" y="382.50" width="151.25" height="29.69" rx="3" fill="#B4432A" />
      <text
        x={884.5}
        y={451.19}
        textAnchor="middle"
        fontSize={32}
        fontWeight={400}
        fill="var(--osd-text)"
      >
        {'-10.68'}
      </text>
      <text x={889.0} y={520.0} textAnchor="middle" fontSize={29} fontWeight={400} fill="#77726A">
        {'2022'}
      </text>
      <rect x="1031.45" y="236.05" width="151.25" height="146.45" rx="3" fill="#2F6B4F" />
      <text
        x={1107.07}
        y={221.05}
        textAnchor="middle"
        fontSize={32}
        fontWeight={400}
        fill="var(--osd-text)"
      >
        {'52.68'}
      </text>
      <text x={1111.57} y={520.0} textAnchor="middle" fontSize={29} fontWeight={400} fill="#77726A">
        {'2023'}
      </text>
      <rect x="1254.02" y="81.20" width="151.25" height="301.30" rx="3" fill="#2F6B4F" />
      <text
        x={1329.64}
        y={66.2}
        textAnchor="middle"
        fontSize={32}
        fontWeight={400}
        fill="var(--osd-text)"
      >
        {'108.38'}
      </text>
      <text x={1334.14} y={520.0} textAnchor="middle" fontSize={29} fontWeight={400} fill="#77726A">
        {'2024'}
      </text>
      <rect x="1476.59" y="323.17" width="151.25" height="59.33" rx="3" fill="#2F6B4F" />
      <text
        x={1552.21}
        y={308.17}
        textAnchor="middle"
        fontSize={32}
        fontWeight={400}
        fill="var(--osd-text)"
      >
        {'21.34'}
      </text>
      <text x={1556.71} y={520.0} textAnchor="middle" fontSize={29} fontWeight={400} fill="#77726A">
        {'2025'}
      </text>
    </svg>
  </Frame>
);

const Page16: Page = () => (
  <Frame
    title={'v1、v5與v6的資金曲線'}
    source={'權益含初始100萬元；單位：萬元；曲線取每月末，風險指標用完整日資料'}
    takeaway={'v6仍會回撤與空手，也放棄了部分原本可賺取的行情'}
  >
    <svg
      data-evidence="chart"
      role="img"
      aria-label="v1、v5及v6每月底評價權益，含初始本金100萬元"
      width="1696"
      height="600"
      viewBox="0 0 1696 600"
      style={{ fontFamily: 'var(--osd-font-body)' }}
    >
      <line x1="110" x2="1660" y1="470.0" y2="470.0" stroke="#D8D2C4" />
      <text x={86.0} y={479.0} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
        {'80'}
      </text>
      <line x1="110" x2="1660" y1="370.0" y2="370.0" stroke="#D8D2C4" />
      <text x={86.0} y={379.0} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
        {'180'}
      </text>
      <line x1="110" x2="1660" y1="270.0" y2="270.0" stroke="#D8D2C4" />
      <text x={86.0} y={279.0} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
        {'280'}
      </text>
      <line x1="110" x2="1660" y1="170.0" y2="170.0" stroke="#D8D2C4" />
      <text x={86.0} y={179.0} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
        {'380'}
      </text>
      <line x1="110" x2="1660" y1="70.0" y2="70.0" stroke="#D8D2C4" />
      <text x={86.0} y={79.0} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
        {'480'}
      </text>
      <text x={86.0} y={15.0} textAnchor="end" fontSize={25} fontWeight={400} fill="#77726A">
        {'萬元'}
      </text>
      <text x={110.0} y={520.0} textAnchor="middle" fontSize={28} fontWeight={400} fill="#77726A">
        {'2019'}
      </text>
      <text x={334.1} y={520.0} textAnchor="middle" fontSize={28} fontWeight={400} fill="#77726A">
        {'2020'}
      </text>
      <text x={558.19} y={520.0} textAnchor="middle" fontSize={28} fontWeight={400} fill="#77726A">
        {'2021'}
      </text>
      <text x={782.29} y={520.0} textAnchor="middle" fontSize={28} fontWeight={400} fill="#77726A">
        {'2022'}
      </text>
      <text x={1006.39} y={520.0} textAnchor="middle" fontSize={28} fontWeight={400} fill="#77726A">
        {'2023'}
      </text>
      <text x={1230.48} y={520.0} textAnchor="middle" fontSize={28} fontWeight={400} fill="#77726A">
        {'2024'}
      </text>
      <text x={1454.58} y={520.0} textAnchor="middle" fontSize={28} fontWeight={400} fill="#77726A">
        {'2025'}
      </text>
      <path
        d="M110.00,450.00 L128.67,450.00 L147.35,449.89 L166.02,443.23 L184.70,452.93 L203.37,447.71 L222.05,443.21 L240.72,445.69 L259.40,439.67 L278.07,430.33 L296.75,427.21 L315.42,415.61 L334.10,427.07 L352.77,429.19 L371.45,439.72 L390.12,439.72 L408.80,439.72 L427.47,436.99 L446.14,412.31 L464.82,405.33 L483.49,405.23 L502.17,406.61 L520.84,379.93 L539.52,358.27 L558.19,356.15 L576.87,338.57 L595.54,327.41 L614.22,301.13 L632.89,314.11 L651.57,299.57 L670.24,311.63 L688.92,296.31 L707.59,304.71 L726.27,313.25 L744.94,309.65 L763.61,293.81 L782.29,301.85 L800.96,299.53 L819.64,314.92 L838.31,314.92 L856.99,314.92 L875.66,314.92 L894.34,314.92 L913.01,314.92 L931.69,314.92 L950.36,314.92 L969.04,314.92 L987.71,314.92 L1006.39,314.92 L1025.06,311.87 L1043.73,303.65 L1062.41,309.23 L1081.08,295.03 L1099.76,280.67 L1118.43,269.69 L1137.11,280.41 L1155.78,278.99 L1174.46,286.87 L1193.13,259.59 L1211.81,248.75 L1230.48,255.29 L1249.16,240.87 L1267.83,224.27 L1286.51,213.77 L1305.18,199.65 L1323.86,161.97 L1342.53,165.31 L1361.20,159.61 L1379.88,174.19 L1398.55,179.43 L1417.23,193.87 L1435.90,172.67 L1454.58,174.81 L1473.25,183.49 L1491.93,205.46 L1510.60,205.46 L1529.28,205.46 L1547.95,205.46 L1566.63,194.71 L1585.30,186.07 L1603.98,160.79 L1622.65,113.27 L1641.33,129.83 L1660.00,110.92"
        fill="none"
        stroke="#B0AA9E"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <line x1="365" x2="410" y1="568" y2="568" stroke="#B0AA9E" strokeWidth="5" />
      <text
        x={426.0}
        y={577.0}
        textAnchor="start"
        fontSize={29}
        fontWeight={400}
        fill="var(--osd-text)"
      >
        {'v1 緩衝帶'}
      </text>
      <path
        d="M110.00,450.00 L128.67,450.00 L147.35,449.89 L166.02,443.23 L184.70,452.51 L203.37,447.29 L222.05,448.73 L240.72,443.79 L259.40,437.77 L278.07,428.43 L296.75,425.31 L315.42,413.71 L334.10,424.88 L352.77,423.41 L371.45,436.32 L390.12,436.32 L408.80,436.32 L427.47,438.81 L446.14,414.13 L464.82,407.15 L483.49,406.49 L502.17,407.87 L520.84,388.61 L539.52,366.95 L558.19,359.80 L576.87,343.91 L595.54,332.75 L614.22,306.47 L632.89,297.13 L651.57,282.59 L670.24,303.99 L688.92,281.03 L707.59,289.43 L726.27,295.65 L744.94,291.93 L763.61,276.09 L782.29,284.13 L800.96,283.16 L819.64,296.62 L838.31,296.62 L856.99,296.62 L875.66,296.62 L894.34,296.62 L913.01,296.62 L931.69,296.62 L950.36,296.62 L969.04,296.62 L987.71,296.62 L1006.39,296.62 L1025.06,293.57 L1043.73,286.77 L1062.41,296.09 L1081.08,281.89 L1099.76,267.53 L1118.43,260.37 L1137.11,269.57 L1155.78,268.15 L1174.46,276.03 L1193.13,248.75 L1211.81,237.91 L1230.48,239.35 L1249.16,224.93 L1267.83,208.33 L1286.51,198.67 L1305.18,184.55 L1323.86,146.87 L1342.53,148.45 L1361.20,138.65 L1379.88,153.23 L1398.55,160.20 L1417.23,163.81 L1435.90,142.61 L1454.58,143.19 L1473.25,159.95 L1491.93,170.94 L1510.60,170.94 L1529.28,170.94 L1547.95,170.94 L1566.63,160.19 L1585.30,151.55 L1603.98,126.27 L1622.65,86.97 L1641.33,93.65 L1660.00,74.74"
        fill="none"
        stroke="#b48a43"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <line x1="715" x2="760" y1="568" y2="568" stroke="#b48a43" strokeWidth="5" />
      <text
        x={776.0}
        y={577.0}
        textAnchor="start"
        fontSize={29}
        fontWeight={400}
        fill="var(--osd-text)"
      >
        {'v5 盤中出場'}
      </text>
      <path
        d="M110.00,450.00 L128.67,450.00 L147.35,449.89 L166.02,443.23 L184.70,452.51 L203.37,447.29 L222.05,448.73 L240.72,443.79 L259.40,437.77 L278.07,428.43 L296.75,425.31 L315.42,413.71 L334.10,424.88 L352.77,423.41 L371.45,436.32 L390.12,436.32 L408.80,436.32 L427.47,438.81 L446.14,414.13 L464.82,407.15 L483.49,406.49 L502.17,407.87 L520.84,388.61 L539.52,366.95 L558.19,359.80 L576.87,343.91 L595.54,332.75 L614.22,306.47 L632.89,324.74 L651.57,316.45 L670.24,337.85 L688.92,314.89 L707.59,323.29 L726.27,329.51 L744.94,325.79 L763.61,309.95 L782.29,317.99 L800.96,317.02 L819.64,330.48 L838.31,330.48 L856.99,330.48 L875.66,330.48 L894.34,330.48 L913.01,330.48 L931.69,330.48 L950.36,330.48 L969.04,330.48 L987.71,330.48 L1006.39,330.48 L1025.06,327.43 L1043.73,320.63 L1062.41,329.95 L1081.08,315.75 L1099.76,301.39 L1118.43,294.23 L1137.11,303.43 L1155.78,302.01 L1174.46,309.89 L1193.13,282.61 L1211.81,271.77 L1230.48,273.21 L1249.16,258.79 L1267.83,242.19 L1286.51,232.53 L1305.18,218.41 L1323.86,180.73 L1342.53,166.84 L1361.20,166.84 L1379.88,166.84 L1398.55,166.84 L1417.23,166.84 L1435.90,164.01 L1454.58,171.05 L1473.25,192.25 L1491.93,211.40 L1510.60,211.40 L1529.28,211.40 L1547.95,211.40 L1566.63,200.65 L1585.30,192.01 L1603.98,166.73 L1622.65,156.96 L1641.33,156.96 L1660.00,148.08"
        fill="none"
        stroke="#B4432A"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <line x1="1065" x2="1110" y1="568" y2="568" stroke="#B4432A" strokeWidth="5" />
      <text
        x={1126.0}
        y={577.0}
        textAnchor="start"
        fontSize={29}
        fontWeight={400}
        fill="var(--osd-text)"
      >
        {'v6 風險預算'}
      </text>
    </svg>
  </Frame>
);

const Page17: Page = () => (
  <Frame
    title={'三種回撤的差別'}
    source={'公開資料回測，2019–2025，單位：萬元；不含夜盤逐筆路徑與無法成交情況'}
    takeaway={'圖表為v6公開資料回測；平台v7最大策略虧損53.22萬＜2024年獲利74.46萬'}
  >
    <div style={{ display: 'flex', gap: 70 }}>
      <svg
        data-evidence="chart"
        role="img"
        aria-label={'三種回撤的差別'}
        width={1170}
        height={590}
        viewBox="0 0 1170 590"
        style={{ fontFamily: 'var(--osd-font-body)' }}
      >
        <line x1="110" x2="1142" y1="452.0" y2="452.0" stroke="#D8D2C4" strokeWidth="1.6" />
        <text x={88.0} y={461.0} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
          {'0'}
        </text>
        <line x1="110" x2="1142" y1="347.75" y2="347.75" stroke="#D8D2C4" strokeWidth="1" />
        <text x={88.0} y={356.75} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
          {'25'}
        </text>
        <line x1="110" x2="1142" y1="243.5" y2="243.5" stroke="#D8D2C4" strokeWidth="1" />
        <text x={88.0} y={252.5} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
          {'50'}
        </text>
        <line x1="110" x2="1142" y1="139.25" y2="139.25" stroke="#D8D2C4" strokeWidth="1" />
        <text x={88.0} y={148.25} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
          {'75'}
        </text>
        <line x1="110" x2="1142" y1="35.0" y2="35.0" stroke="#D8D2C4" strokeWidth="1" />
        <text x={88.0} y={44.0} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
          {'100'}
        </text>
        <text x={88.0} y={16.0} textAnchor="end" fontSize={25} fontWeight={400} fill="#77726A">
          {'萬元'}
        </text>
        <rect x="197.00" y="266.18" width="161.00" height="185.82" rx="3" fill="#b48a43" />
        <text
          x={277.5}
          y={251.18}
          textAnchor="middle"
          fontSize={32}
          fontWeight={400}
          fill="var(--osd-text)"
        >
          {'44.56'}
        </text>
        <text x={282.0} y={520.0} textAnchor="middle" fontSize={29} fontWeight={400} fill="#77726A">
          {'已平倉曲線'}
        </text>
        <rect x="541.00" y="154.10" width="161.00" height="297.90" rx="3" fill="#b48a43" />
        <text
          x={621.5}
          y={139.1}
          textAnchor="middle"
          fontSize={32}
          fontWeight={400}
          fill="var(--osd-text)"
        >
          {'71.44'}
        </text>
        <text x={626.0} y={520.0} textAnchor="middle" fontSize={29} fontWeight={400} fill="#77726A">
          {'每日評價權益'}
        </text>
        <rect x="885.00" y="125.07" width="161.00" height="326.93" rx="3" fill="#b48a43" />
        <text
          x={965.5}
          y={110.07}
          textAnchor="middle"
          fontSize={32}
          fontWeight={400}
          fill="var(--osd-text)"
        >
          {'78.40'}
        </text>
        <text x={970.0} y={520.0} textAnchor="middle" fontSize={29} fontWeight={400} fill="#77726A">
          {'日盤OHLC界線'}
        </text>
      </svg>
      <div style={{ paddingTop: 85, width: 445 }}>
        <p style={{ fontSize: 35, color: muted, margin: '0 0 45px' }}>最大年平倉獲利</p>
        <p
          style={{
            fontSize: 88,
            fontFamily: 'Arial,sans-serif',
            fontWeight: 700,
            color: 'var(--osd-accent)',
            margin: '0 0 35px',
          }}
        >
          108.38
        </p>
        <p style={{ fontSize: 30, color: muted, lineHeight: 1.5 }}>萬元，2024完整年度</p>
      </div>
    </div>
  </Frame>
);

const Page18: Page = () => (
  <Frame
    title={'成本與結算敏感度'}
    source={'v6公開資料回測，2019–2025，單位：萬元；費用固定來回1,000元，滑價另計'}
    takeaway={'滑價重跑會改變出場線與交易路徑，獲利不一定單調下降'}
  >
    <table
      data-evidence="table"
      style={{
        width: 1696,
        height: 585,
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        fontSize: 34,
        lineHeight: 1.4,
      }}
    >
      <colgroup>
        <col style={{ width: 671.83 }} />
        <col style={{ width: 343.38 }} />
        <col style={{ width: 340.39 }} />
        <col style={{ width: 340.39 }} />
      </colgroup>
      <thead>
        <tr>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'相同七年期間'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'淨利'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'OHLC回撤'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'最大年獲利'}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ background: '#FAF8F2' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'主版，每邊1點滑價'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'301.92'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'78.40'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'108.38'}
          </td>
        </tr>
        <tr style={{ background: '#EAE5D8' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'完整重跑，每邊2點滑價'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'302.96'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'78.54'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'108.18'}
          </td>
        </tr>
        <tr style={{ background: '#FAF8F2' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'結算改收盤代理'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'300.60'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'78.42'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'108.18'}
          </td>
        </tr>
        <tr style={{ background: '#EAE5D8' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'固定原路徑多收1點'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'299.66'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'不重新模擬'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'不重新模擬'}
          </td>
        </tr>
      </tbody>
    </table>
  </Frame>
);

const Page19: Page = () => (
  <Frame
    title={'v6的改善與代價'}
    source={'七年＝2019–2025；延伸＝2019–2026/10/16；2026已參與v6改版'}
    takeaway={'2026重置測試有167個合格空手判斷日因預算被擋'}
  >
    <table
      data-evidence="table"
      style={{
        width: 1696,
        height: 585,
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        fontSize: 34,
        lineHeight: 1.4,
      }}
    >
      <colgroup>
        <col style={{ width: 597.18 }} />
        <col style={{ width: 313.52 }} />
        <col style={{ width: 313.52 }} />
        <col style={{ width: 471.77 }} />
      </colgroup>
      <thead>
        <tr>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'比較'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'v5'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'v6'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'解讀'}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ background: '#FAF8F2' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'七年淨利'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'375.26萬'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'301.92萬'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'少賺73.34萬元'}
          </td>
        </tr>
        <tr style={{ background: '#EAE5D8' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'七年OHLC回撤'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'64.54萬'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'78.40萬'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'舊期間回撤反而增加'}
          </td>
        </tr>
        <tr style={{ background: '#FAF8F2' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'延伸期間OHLC回撤'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'186.94萬'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'78.40萬'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'包含2026後的風險改善'}
          </td>
        </tr>
        <tr style={{ background: '#EAE5D8' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'2026重置測試交易數'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'16'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'1'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'v6只剩1筆，證據有限'}
          </td>
        </tr>
      </tbody>
    </table>
  </Frame>
);

const Page20: Page = () => (
  <Frame
    title={'作業門檻的核對結果'}
    source={'v7候選：MultiCharts TXF1，2020/1/10–2025/12/31；已繳交v6作對照'}
  >
    <table
      data-evidence="table"
      style={{
        width: 1696,
        height: 585,
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        fontSize: 32,
        lineHeight: 1.4,
      }}
    >
      <colgroup>
        <col style={{ width: 507.35 }} />
        <col style={{ width: 782.77 }} />
        <col style={{ width: 405.88 }} />
      </colgroup>
      <thead>
        <tr>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'條件'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'MultiCharts實測'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'判定'}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ background: '#FAF8F2' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'至少五年、一口不加碼'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'2020–2025六年，79筆；一次最多1口'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'通過'}
          </td>
        </tr>
        <tr style={{ background: '#EAE5D8' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'參與結算與固定成本'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'結算日收盤平倉；佣金7.90萬、滑價3.16萬'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'設定符合'}
          </td>
        </tr>
        <tr style={{ background: '#FAF8F2' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'近三年逐年獲利'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'2023＋74.17、2024＋74.46、2025＋39.47萬'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'通過'}
          </td>
        </tr>
        <tr style={{ background: '#EAE5D8' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'淨利＞120萬元'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'260.68萬元（v6：224.32萬）'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'通過'}
          </td>
        </tr>
        <tr style={{ background: '#FAF8F2' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'最大策略虧損＜最大年獲利'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'53.22萬＜74.46萬元（2024）'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'通過，差21.24萬'}
          </td>
        </tr>
        <tr style={{ background: '#EAE5D8' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'獲利因子≥2'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'v7：2.08；已繳交v6：1.86'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'v7通過'}
          </td>
        </tr>
      </tbody>
    </table>
  </Frame>
);

const C_Heading = ({ children }: { children: ReactNode }) => (
  <h2
    style={{
      fontSize: 32,
      fontWeight: 550,
      lineHeight: 1.3,
      color: 'var(--osd-accent)',
      margin: '0 0 18px',
    }}
  >
    {children}
  </h2>
);

const C_Point = ({ label, body }: { label: string; body: string }) => (
  <div style={{ fontSize: 28, lineHeight: 1.45 }}>
    <strong style={{ fontWeight: 600 }}>{label}</strong>
    <span style={{ color: muted }}>{'：'}</span>
    {body}
  </div>
);

const C_Limit = ({ number, body }: { number: string; body: string }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '44px 1fr',
      fontSize: 28,
      lineHeight: 1.45,
    }}
  >
    <span style={{ fontFamily: 'Arial,sans-serif', fontWeight: 700, color: 'var(--osd-accent)' }}>
      {number}
    </span>
    <span>{body}</span>
  </div>
);

const C_Def = ({ title, body }: { title: string; body: string }) => (
  <div style={{ marginBottom: 34 }}>
    <h2
      style={{
        fontSize: 34,
        fontWeight: 550,
        lineHeight: 1.3,
        color: 'var(--osd-accent)',
        margin: '0 0 12px',
      }}
    >
      {title}
    </h2>
    <p style={{ fontSize: 31, lineHeight: 1.5, whiteSpace: 'pre-line', margin: 0 }}>{body}</p>
  </div>
);

const C_Para = ({ children, gap = 0 }: { children: ReactNode; gap?: number }) => (
  <p style={{ fontSize: 28, lineHeight: 1.5, margin: `${gap}px 0 0` }}>{children}</p>
);

const C_SourceLine = ({ label, body }: { label: string; body: string }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      fontSize: 28,
      lineHeight: 1.45,
    }}
  >
    <span style={{ color: muted }}>{label}</span>
    <span>{body}</span>
  </div>
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

const Page21: Page = () => (
  <Frame
    title={'策略發想的差異與研究限制'}
    source={
      '平台實測：MultiCharts TXF1日K，2020/1/10–2025/12/31；公開資料回測：期交所TX日盤日K，2019–2025'
    }
  >
    <C_Heading>{'與課堂範例的差異'}</C_Heading>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 56 }}>
      <C_Point
        label={'趨勢背景'}
        body={'以200日均線帶判斷多空背景，盤整時用波動緩衝減少來回進出'}
      />
      <C_Point
        label={'訂單時間'}
        body={'停損線在前一日收盤後算好、隔日盤中有效，開盤跳空以較差的開盤價成交'}
      />
      <C_Point label={'一口預算'} body={'只在0或1口間選擇，一口的規劃風險超過20萬元就不進場'} />
    </div>
    <C_Para gap={16}>
      {
        '課堂已介紹通道突破等指標，本報告不把單一指標當成新的交易理論；比較能說的貢獻，是把規則寫成可追溯的訂單，並保留每次失敗與修正的紀錄。'
      }
    </C_Para>
    <div style={{ height: 40 }} />
    <C_Heading>{'研究限制'}</C_Heading>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 64px' }}>
      <C_Limit number="1" body={'2019–2025年的資料在多輪改版中都已看過，沒有樣本外驗證。'} />
      <C_Limit
        number="2"
        body={'v1到v7每一版都是看過前一版的歷史結果才修改，規則與參數有選擇偏誤。'}
      />
      <C_Limit
        number="3"
        body={'平台只用每邊1點（200元）滑價測試；每邊2點只在公開資料回測做過，平台沒有重跑。'}
      />
      <C_Limit number="4" body={'20萬元預算只決定要不要進場，不是單筆交易或整段期間的損失上限。'} />
      <C_Limit number="5" body={'只用日盤OHLC，還原不了夜盤期間的浮虧；保證金追繳也沒有納入。'} />
      <C_Limit
        number="6"
        body={'遇到跳空、漲跌停或流動性不足時，實際成交價可能比模擬價差，甚至無法成交。'}
      />
    </div>
  </Frame>
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

const Page23: Page = () => (
  <Frame
    title={'附錄A　指標與訂單的精確定義'}
    source={'定義依v7凍結規則；價格單位為點，每點200元'}
    appendix
  >
    <C_Def
      title={'真實波幅與平均方式'}
      body={
        'TR＝max（高－低，|高－前收|，|低－前收|）\n20日波幅＝最近20個TR的算術平均，並非Wilder平滑'
      }
    />
    <C_Def
      title={'隔日追蹤出場線（v7）'}
      body={
        '峰值＝max（進場含滑價成交價，持倉已完成收盤價）\n停損價＝向下取整（峰值－2.5×固定進場前波幅），以1點為單位；v6為3倍\n停損線在前一日收盤後算好，隔日日盤有效；進場當天沒有盤中停損'
      }
    />
    <C_Def
      title={'進場風險預算（v6、v7相同）'}
      body={
        '3×當前20日波幅×200＋1,000＋400＋200≤200,000元\n200元為每點價值；1,000元為來回手續費，400元為進出各1點滑價，200元為1點跳動\n只限制新買單，已有部位不因超標另加退出；20萬元不是實際虧損上限'
      }
    />
  </Frame>
);

const Page24: Page = () => (
  <Frame
    title={'附錄B　20萬元預算的鄰近檢查'}
    source={'v6公開資料回測，僅2019–2022開發期，單位：萬元；不在2023–2026搜尋預算網格'}
    takeaway={'預算越小不代表回撤必然越低；沒有改挑較賺的30萬元版'}
    appendix
  >
    <table
      data-evidence="table"
      style={{
        width: 1696,
        height: 330,
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        fontSize: 34,
        lineHeight: 1.4,
      }}
    >
      <colgroup>
        <col style={{ width: 388.17 }} />
        <col style={{ width: 328.45 }} />
        <col style={{ width: 328.45 }} />
        <col style={{ width: 328.45 }} />
        <col style={{ width: 322.48 }} />
      </colgroup>
      <thead>
        <tr>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'固定預算'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'開發期淨利'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'OHLC回撤'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'最大年獲利'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'風險比較'}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ background: '#FAF8F2' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'10萬元'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'21.30'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'42.74'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'37.72'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'未過'}
          </td>
        </tr>
        <tr style={{ background: '#EAE5D8' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'20萬元主版'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'119.52'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'42.04'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'56.84'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'通過'}
          </td>
        </tr>
        <tr style={{ background: '#FAF8F2' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'30萬元'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'153.38'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'36.06'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'90.70'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'通過'}
          </td>
        </tr>
      </tbody>
    </table>
    <C_Para gap={36}>
      {
        '風險比較指開發期OHLC回撤是否小於最大年獲利。20萬元是初始資金100萬元的20%，在跑這組比較之前就定為主版；10萬元與30萬元只作鄰近比較。30萬元在開發期淨利較高、回撤較小，主版沒有因此更換。這張表只涵蓋開發期，不能證明20%是最適或穩健的預算。'
      }
    </C_Para>
  </Frame>
);

const Page25: Page = () => (
  <Frame
    title={'附錄C　年度認列與補充績效'}
    source={'v6公開資料回測；單位：萬元，平均每筆淨利單位為元'}
    appendix
  >
    <table
      data-evidence="table"
      style={{
        width: 1696,
        height: 250,
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        fontSize: 32,
        lineHeight: 1.4,
      }}
    >
      <colgroup>
        <col style={{ width: 582.25 }} />
        <col style={{ width: 350.85 }} />
        <col style={{ width: 380.7 }} />
        <col style={{ width: 382.2 }} />
      </colgroup>
      <thead>
        <tr>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'口徑'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'2025平倉損益'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'2026平倉損益'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'總淨利'}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ background: '#FAF8F2' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'2019–2025期末平倉'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'21.34萬'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'不含'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'301.92萬'}
          </td>
        </tr>
        <tr style={{ background: '#EAE5D8' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'2019–2026/10/16連續'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'12.46萬'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'53.48萬，部分年'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'346.52萬'}
          </td>
        </tr>
      </tbody>
    </table>
    <C_Para gap={24}>
      {
        '七年測試在2025年12月31日把未平倉部位強制平倉；連續測試讓這筆持倉延續到2026年才認列，所以2025年平倉損益由21.34萬元變為12.46萬元。兩種測試各自從100萬元、空手開始，結果不能相加。'
      }
    </C_Para>
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 100px', marginTop: 40 }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          fontSize: 32,
        }}
      >
        <span style={{ color: muted }}>{'七年獲利因子'}</span>
        <strong style={{ color: 'var(--osd-accent)', fontWeight: 550, fontSize: 36 }}>
          {'2.23'}
        </strong>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          fontSize: 32,
        }}
      >
        <span style={{ color: muted }}>{'完成交易／勝率'}</span>
        <strong style={{ color: 'var(--osd-accent)', fontWeight: 550, fontSize: 36 }}>
          {'82筆／60.98%'}
        </strong>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          fontSize: 32,
        }}
      >
        <span style={{ color: muted }}>{'平均每筆淨利'}</span>
        <strong style={{ color: 'var(--osd-accent)', fontWeight: 550, fontSize: 36 }}>
          {'36,820元'}
        </strong>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          fontSize: 32,
        }}
      >
        <span style={{ color: muted }}>{'收盤持倉日比例'}</span>
        <strong style={{ color: 'var(--osd-accent)', fontWeight: 550, fontSize: 36 }}>
          {'54.73%'}
        </strong>
      </div>
    </div>
    <C_Para gap={40}>
      {
        '以上四項為2019–2025年的公開資料回測。獲利因子＝各筆淨損益中正值合計÷負值絕對值合計，勝率＝獲利50筆÷82筆。平台報表的計算方式可能不同，這裡不與平台實測數字混用。'
      }
    </C_Para>
  </Frame>
);

const Page26: Page = () => (
  <Frame
    title={'附錄D　基準、來源與重現資料'}
    source={'公開資料回測，2019–2025，單位：萬元；文獻與資料出處見「參考文獻」頁'}
    appendix
  >
    <table
      data-evidence="table"
      style={{
        width: 1696,
        height: 290,
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        fontSize: 30,
        lineHeight: 1.4,
      }}
    >
      <colgroup>
        <col style={{ width: 597.18 }} />
        <col style={{ width: 365.77 }} />
        <col style={{ width: 365.77 }} />
        <col style={{ width: 367.27 }} />
      </colgroup>
      <thead>
        <tr>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'相同七年基準'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'淨利'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'日結最大回撤'}
          </th>
          <th
            style={{
              background: 'var(--osd-text)',
              color: 'var(--osd-bg)',
              fontWeight: 600,
              textAlign: 'left',
              padding: '15px 18px',
              border: '1px solid #D8D2C4',
            }}
          >
            {'最大年獲利'}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ background: '#FAF8F2' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'持續做多一口'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'413.12'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'176.34'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'95.00'}
          </td>
        </tr>
        <tr style={{ background: '#EAE5D8' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'原始200日均線'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'332.02'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'89.34'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'74.46'}
          </td>
        </tr>
        <tr style={{ background: '#FAF8F2' }}>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'v6風險預算'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'301.92'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'71.44'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'108.38'}
          </td>
        </tr>
      </tbody>
    </table>
    <C_Para gap={20}>
      {
        '三組都採一次一口、相同成本並參與月結算。回撤統一用每日收盤評價，與前文v6的日盤OHLC回撤界線78.40萬元是不同口徑。持續做多賺得最多，但回撤高於它的最大年獲利。'
      }
    </C_Para>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 26 }}>
      <C_SourceLine label={'作業要求'} body={'課程講義Lecture05第31–32頁、課程介紹第4–5頁［7］'} />
      <C_SourceLine
        label={'行情與規格'}
        body={'期交所TX一般交易時段、未調整近月日K；臺股期貨契約規格［5］'}
      />
      <C_SourceLine
        label={'設計依據'}
        body={
          '時間序列動能［1］、200日均線改編自10個月均線模型［2］、波動調整［3］及其實施限制［4］'
        }
      />
      <C_SourceLine label={'訂單語意'} body={'MultiCharts的Stop單與K棒內價格路徑假設［6］'} />
      <C_SourceLine
        label={'重現紀錄'}
        body={
          '行情保存原始網址、下載時間與SHA256；公開資料回測另有44項規則檢查、23組來源核對、3組匯出資料重跑，均不屬平台實測'
        }
      />
    </div>
  </Frame>
);

const Page27: Page = () => (
  <Frame
    title="附錄E　PowerLanguage程式節錄"
    source="v7已由平台匯出v7.pla；本頁為條件節錄"
    appendix
  >
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
  <Frame title={'參考文獻'} appendix>
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
      <C_Ref number={'［7］'}>
        {
          '課程講義：Lecture05 MultiCharts策略開發實務，第31–32頁；1151 智慧量化交易課程介紹，第4–5頁。'
        }
      </C_Ref>
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
  '以Lecture05第31頁專題要求為準，第32頁是專題評分比重，與課程總成績的期中30%不同。講義的『近三年績效為正』未細分是否逐年，因此本研究採較嚴格的2023、2024、2025各年為正。課程介紹第4頁將專題一期中報告暫訂在10月27日。滑價1點是研究額外假設，費用1,000元是講義固定成本，未聲稱是真實券商費稅明細。\n\n資料來源\nLecture05_MultiCharts策略開發實務.pptx，第31–32頁；1151_智慧量化交易_課程介紹.pptx，第4–5頁。\n臺灣期貨交易所，臺股期貨契約規格：https://www.taifex.com.tw/cht/2/tX?menuid1=12 ，2026/10/20核對。',
  'Moskowitz等人的時間序列動能研究涵蓋58種期貨與遠期契約，與本報告只做多的台指期均線規則不同。Faber的模型是月底檢查10個月均線，本研究改成每日判斷200日均線，屬於改編。Moreira與Muir提供高波動時降低風險的動機；Cederburg等人提醒樣本內優勢不易轉為即時可實施績效。上述來源都沒有驗證本策略或20%預算。\n\n資料來源\nMoskowitz, Ooi & Pedersen (2012), Time Series Momentum. https://www.aqr.com/Insights/Research/Journal-Article/Time-Series-Momentum 。Faber (2013), QTAA Update: Conclusions and FAQs. https://mebfaber.com/2013/06/14/qtaa-update-conclustions-and-faqs/ 。2026/10/20核對。\nMoreira & Muir (2016/2017), Volatility-Managed Portfolios. https://www.nber.org/papers/w22208 。Cederburg et al. (2020), On the performance of volatility-managed portfolios. https://www.sciencedirect.com/science/article/pii/S0304405X2030132X 。2026/10/20核對摘要。',
  '價格為期交所TX一般交易時段、未調整近月日K，保留到期與換月價差，沒有用現貨指數計算期貨損益。資料原先依時間切割，但經歷數次改版後，2019至2025已成為已看過資料。2026對v5曾是首次新資料，對根據其失敗而設計的v6則已不是。v6在2026年10月19日18:20台北時間凍結。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。\n公開資料回測/來源紀錄.json；風控改版_v5/2026新增來源紀錄.json。',
  '一開始希望用最簡單的趨勢規則建立比較基準。v1在第一次價格回測前就提出波動緩衝，假說是減少盤整交易，代價是較晚進出。原始無緩衝均線版的日結回撤也是89.34萬元，最大年獲利74.46萬元；v1緩衝版最大年獲利76.70萬元，均未過風險門檻。不是因為獲利不足才加更多指標，下一步要追查持倉回撤與出場速度。\n\n資料來源\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。\n公開資料回測/結果/full_mode1.json；公開資料回測/結果/full_mode2.json。',
  'v2以進場成交價與持倉最高已完成收盤價中的較高者，減3倍進場前平均真實波幅，產生追蹤退出參考。只向上提高，波幅進場時固定。當時仍等待當日收盤確認，再次日開盤賣出。7月結算後重進，剛好遇到8月急跌，不能在事後假設已於22,035.85點附近成交。問題包含弱勢重進與出場等待，後續分開試驗。\n\n資料來源\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。\n風控改版_v2/結果/full_same_period_risk3.json。',
  'v3通道排除當日最高價，收盤突破後仍次日開盤成交，避免不可能的當日最高價條件。它在2025年虧4萬4,800元，也未滿足近三年逐年為正。v4移除嚴格創高限制，改用20日均線判斷進出，但盤整與反彈切換效果不好。兩版在開發期曾通過風險比較，七年卻失敗，不能只挑開發期結果採用。兩個分支均保留，主策略回到長期趨勢與固定波幅出場。\n\n資料來源\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。\n風控改版_v6/報告資料.json。',
  'v5的重點是訂單時間，並非再縮短均線。停損價在前一收盤已知，次日日盤有效，不使用當日最高價重新計算再假設同日成交。開盤跳空採更差價格，保留跳空風險。進場當天缺少盤中保護，停損後也不立即反覆進場。這與MultiCharts的OHLC模擬仍需逐筆核對，尤其Bar Magnifier、IOG、日盤設定與停損跳空行為。\n\n資料來源\nMultiCharts官方文件，Stop：https://www.multicharts.com/trading-software/index.php?title=Stop ；Intra-bar Price Movement Assumptions：https://www.multicharts.com/trading-software/index.php?title=Intra-bar_Price_Movement_Assumptions 。2026/10/20核對。\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。',
  '2019至2025時，v5的64.54萬元OHLC回撤小於最大完整年獲利95.92萬元，先通過舊歷史。首次下載2026新資料後，以100萬元空手重置的測試雖有93.14萬元淨利，OHLC回撤達186.94萬元。連續跑到10月16日也有同樣回撤。圖中刻意只用完整年度的95.92萬元作年獲利比較，沒有把2026部分年當完整年。即便寬鬆納入2026部分年的134.90萬元，回撤仍超過它。因此總獲利為正不能取代風險門檻。\n\n資料來源\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。\n風控改版_v5/結果/new_2026_v5_stop3.json；風控改版_v5/結果/continuous_to_2026_v5_stop3.json。',
  'v5在2026年的進場前波幅由年初308.55點放大到6月底1,395.8點，3倍波幅的一口風險連同成本預留由186,730元增加到839,080元。固定一口並不代表固定金額風險。課堂不准減成半口，所以v6只能在0與1口間選擇，超過20萬元就不進場。20萬元是初始100萬元的20%，是事前固定的課堂風控假說。它不是單筆最大虧損保證，跳空、進場當日波動仍可能超過預算。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。\nMoreira & Muir (2016/2017), Volatility-Managed Portfolios. https://www.nber.org/papers/w22208 。Cederburg et al. (2020), On the performance of volatility-managed portfolios. https://www.sciencedirect.com/science/article/pii/S0304405X2030132X 。2026/10/20核對摘要。\n臺灣期貨交易所，臺股期貨契約規格：https://www.taifex.com.tw/cht/2/tX?menuid1=12 ，2026/10/20核對。',
  '這次v7只動一個地方，就是獲利後的追蹤停損，從原本3倍固定進場波幅改成2.5倍。進場時要不要做這一口，還是用3倍波幅去算20萬元預算。我先回頭看v6的29筆RiskStop，其中23筆連10萬元的最大有利波動都沒有，合計虧了210.86萬元。先試過50日均線斜率和停損後冷卻5日，開發期都變差。第二輪的1.5倍、2倍也讓PF下降，2.5倍在開發期從1.69提高到1.74，選定後才跑完整期間。失敗的結果都有保留。\n\n資料來源\n加分改版_v7/虧損階段統計.json；加分改版_v7/結果/摘要.json；加分改版_v7/結果_第二輪/摘要.json；加分改版_v7/規則凍結.json；Windows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 221109.png。',
  'v7沿用200日趨勢帶、20萬元預算和0或1口限制。這次只動追蹤停損倍數：進場預算照舊用3倍當前波幅估算，持倉的隔日停損線改成峰值減2.5倍固定進場前波幅。不要把兩個倍數混在一起。月結算與停損後重新判斷趨勢的規則沒有改。\n\n資料來源\nWindows回傳_2026-10-24 截圖：221109；Windows回傳_2026-10-24/v7.pla。\n加分改版_v7/規則凍結.json；加分改版_v7/結果_完整評估/摘要.json。',
  '這張表呈現2019至2025的公開資料回測歷程，版本只到v6。v3、v4沒有因結果差而從發展歷程消失。v5在這七年淨利較高，卻在後續首次2026新資料失敗。v6針對該失敗加入資金預算。表中通過只指公開資料回測的風險比較，不拿它代替MultiCharts v7的判定。\n\n資料來源\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。\n風控改版_v6/報告資料.json。',
  '年度資料以已完成交易在平倉年度認列，七年合計301萬9,200元。2023獲利52.68萬元、2024獲利108.38萬元、2025獲利21.34萬元。2022仍虧10.68萬元，顯示趨勢與波動規則並不能消除所有市場風險。此表的2025包含12月31日期末強制平倉，和延伸回測的連續持倉認列不同，附錄另對照。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。',
  '這張圖為2019至2025每日評價權益的每月最後交易日抽樣，包含未平倉損益與100萬元起始本金，單位萬元。抽樣方便展示長期資金變化，不用它重新估計日內風險；所有回撤數字都由完整每日及OHLC路徑計算。v6不是整段都比v5好，不能靠曲線終點較高或較平滑宣稱穩健。七年淨利與回撤取捨在下一張風險與後續表格說明。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。\n公開資料回測/結果/full_mode2.json；風控改版_v5/結果/full_v5_stop3.json。',
  '最大策略虧損是權益從高點的最大跌幅，不等於單筆交易虧損。圖上三條數字來自v6公開資料回測：平倉44.56萬、每日收盤71.44萬、日盤OHLC界線78.40萬。平台v7另有最大策略虧損53.22萬，小於2024年獲利74.46萬；最大平倉交易虧損是38.56萬。不要把不同口徑放在同一條柱子上比。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json。\nWindows回傳_2026-10-24 截圖：220622、221025。',
  '這頁是v6公開資料回測，並非v7平台的滑價檢查。每邊2點完整重跑淨利302.96萬元，比1點主版多1.04萬元，不能說成本越高越好。因為成交價會初始化停損峰值，邊界日期的退出與後續進場可能改變。固定主版原成交路徑，只多扣每個需滑價成交1點，則會少22,600元，淨利降至299.66萬元。前者是完整策略敏感度，後者是純成本算術檢查。收盤結算代理則是準備MultiCharts比對的資料口徑。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。',
  'v6在舊七年少賺73萬3,400元，OHLC回撤還比v5多13萬8,600元；改善的是納入2026高波動期間之後的資金風險相容性。2026重置結果只有1筆，淨利27萬200元，之後167個合格空手判斷日因預算被擋。這是日數，不能說避開167筆虧損交易。連續2019至2026年10月16日淨利346萬5,200元，與分段測試因持倉與期末認列不同，不能直接相加。所有2026數字對v6均是已看過資料。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。',
  '這張是同一個MultiCharts TXF1期間的結果。前一版v6是72筆、淨利224.32萬、PF 1.86；最終版v7是79筆、淨利260.68萬、PF 2.08。最大策略虧損從60.58萬降到53.22萬。回撤餘裕就是最大年獲利減掉最大策略虧損，v7有21.24萬，v6只有9.24萬。v6的勝率是從原始Excel查到的54.2%。\n\n資料來源\n期中報告/MultiCharts實測/TXF1  FCU_TrendBudget_Signal 策略回測績效報告.xlsx；Windows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 221025.png；Windows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 220622.png。',
  '這是平台年週期分析的原始表格，只裁掉左邊選單和空白。2020年賺69.49萬，2021年32.96萬，2022年虧29.87萬。之後2023到2025年都正獲利，最高是2024年的74.46萬。我不把2022年的虧損藏掉，因為這就是策略實際要承受的年度波動。\n\n資料來源\nWindows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 220622.png；同資料夾的221051.png為相同年週期表格。',
  '這頁只用MultiCharts的v7策略報告判定。從2020年1月10日到2025年底，79筆，最多一口。佣金7.90萬元、滑價3.16萬元。逐年看，2020賺69.49萬、2021賺32.96萬、2022虧29.87萬、2023賺74.17萬、2024賺74.46萬、2025賺39.47萬；淨利260.68萬，勝率55.7%。最大策略虧損53.22萬，比2024年的年獲利低21.24萬。PF 2.08，四項門檻都過。前一版v6是72筆、PF 1.86、淨利224.32萬，回撤與最大年獲利只差9.24萬。v7.pla已從平台匯出。\n\n資料來源\nLecture05_MultiCharts策略開發實務.pptx，第31–32頁。\nWindows回傳_2026-10-24 截圖：220622、221025、221051、221109；Windows回傳_2026-10-24/v7.pla。\nMultiCharts實測/TXF1  FCU_TrendBudget_Signal 策略回測績效報告.xlsx。',
  '這張是MultiCharts策略績效總結果的上半段原始畫面。淨利欄是260.68萬，最大策略虧損是53.22萬。注意最大平倉交易虧損是38.56萬，它是單筆平倉交易的數字，不能拿來代替整段資金曲線的最大策略虧損。\n\n資料來源\nWindows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 221025.png；Windows回傳_2026-10-24/v7.pla。',
  '這裡接著看同一張報表的下半段。平台列出的獲利因子是2.08，交易總次數79筆，勝率55.7%。這三個數字和前面的比較表是同一份平台結果。\n\n資料來源\nWindows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 221025.png；加分改版_v7/結果_完整評估/摘要.json。',
  '最後看平台的設定畫面，追蹤倍數確實是2.5，進場預算倍數仍是3，畫面上的模型滑價是每邊1點。v7在平台的PF過2。2019到2025都是看過的資料，也還沒有樣本外驗證。每邊2點滑價雖已在公開資料模型測過，平台還沒有重跑。\n\n資料來源\nWindows回傳_2026-10-24/螢幕擷取畫面 2026-10-24 221109.png；加分改版_v7/結果_完整評估/摘要.json；加分改版_v8/改版結果與下一步.md；加分改版_v8/MultiCharts操作單.md。',
  '課堂已介紹高低通道突破，所以不把單一指標說成創新。v7沿用長期趨勢、隔日盤中訂單與一口預算，只縮短獲利後追蹤距離。限制要明講：2019至2025的資料都看過，沒有樣本外驗證；平台還沒有用每邊2點滑價重跑。20萬元預算也不是實際損失上限。\n\n資料來源\n加分改版_v7/結果_完整評估/mc_calendar_2020_v6_control.json；加分改版_v7/結果_完整評估/mc_calendar_2020_trail2_5.json。\nWindows回傳_2026-10-24 截圖：221025、221109；Windows回傳_2026-10-24/v7.pla。',
  '結論是最終版v7在這張TXF1圖表的歷史回測四項門檻都過：PF 2.08、淨利260.68萬、近三年每年正獲利，最大策略虧損53.22萬低於最大年獲利74.46萬，差21.24萬。程式已匯出為v7.pla。2019至2025沒有樣本外資料，而且每邊2點滑價還沒在平台重跑。\n\n資料來源\nWindows回傳_2026-10-24 截圖：220622、221025、221109；Windows回傳_2026-10-24/v7.pla。\n加分改版_v7/結果_完整評估/摘要.json。',
  '這頁的停損定義已改成v7：峰值減2.5倍固定進場前波幅，停損價向下取整到1點。下方進場風險預算仍以3倍當前波幅估算，加上費用、滑價與最小跳動單位。20萬元只決定是否進場，不保證實際虧損不超過20萬元。\n\n資料來源\nWindows回傳_2026-10-24 截圖：221109；Windows回傳_2026-10-24/v7.pla。\n加分改版_v7/規則凍結.json。',
  '這是2019至2022開發期檢查，不是七年績效。10萬元版淨利21.30萬元、回撤42.74萬元，大於最大年獲利37.72萬元。20萬元主版淨利119.52萬元、回撤42.04萬元、最大年56.84萬元。30萬元淨利153.38萬元、回撤36.06萬元，開發期更好，但本輪主版在回測前已固定20萬元，沒有看結果後換成冠軍。鄰近設定只在開發期跑，不能把這張表拿來證明20%最適或穩健。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。',
  '2025年最後一筆交易在七年測試於12月31日強制平倉，連續測試則延續到2026才認列，所以2025平倉獲利由21.34萬元變為12.46萬元。分段各自重置本金與空手，不能把七年與2026重置結果相加。獲利因子2.2318採每筆淨損益的正值合計除以負值絕對合計，勝率50/82即60.98%，平均每筆36,820元，收盤持倉日比例54.73%。這些定義在正式平台可能不同，不混用平台毛利與本報告淨損益。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。',
  '持續做多一口基準七年淨利413.12萬元，日結回撤176.34萬元，大於最大年獲利95萬元。原始無緩衝200日均線七年淨利與回撤均由full_mode1.json取值。這張基準比較使用三版都有的每日評價最大回撤，不把它與前文v6的OHLC界線混稱。完整來源URL附在本頁備註與講稿，交易明細和PowerLanguage檔保存在v6轉移包。44項測試、23組來源稽核及3組CSV重跑是既有研究驗證紀錄，不等於MultiCharts實機驗證。\n\n資料來源\nLecture05_MultiCharts策略開發實務.pptx，第31–32頁；1151_智慧量化交易_課程介紹.pptx，第4–5頁。\n臺灣期貨交易所，臺股期貨契約規格：https://www.taifex.com.tw/cht/2/tX?menuid1=12 ，2026/10/20核對。\nMoskowitz, Ooi & Pedersen (2012), Time Series Momentum. https://www.aqr.com/Insights/Research/Journal-Article/Time-Series-Momentum 。Faber (2013), QTAA Update: Conclusions and FAQs. https://mebfaber.com/2013/06/14/qtaa-update-conclustions-and-faqs/ 。2026/10/20核對。\nMoreira & Muir (2016/2017), Volatility-Managed Portfolios. https://www.nber.org/papers/w22208 。Cederburg et al. (2020), On the performance of volatility-managed portfolios. https://www.sciencedirect.com/science/article/pii/S0304405X2030132X 。2026/10/20核對摘要。\nMultiCharts官方文件，Stop：https://www.multicharts.com/trading-software/index.php?title=Stop ；Intra-bar Price Movement Assumptions：https://www.multicharts.com/trading-software/index.php?title=Intra-bar_Price_Movement_Assumptions 。2026/10/20核對。\n風控改版_v6/驗證結果.json；風控改版_v6/帳務與成交核對.json；風控改版_v6/匯出資料重跑核對.json。\n公開資料回測/結果/full_mode0.json；公開資料回測/結果/full_mode1.json。',
  '這段是v7的條件節錄，不能單獨編譯。進場預算用EntryBudgetMultiple，預設3倍；停損線用TrailMultiple，預設2.5倍固定進場前波幅。完整程式還處理結算、趨勢退出與停損後重新進場。平台已匯出v7.pla。\n\n資料來源\nWindows回傳_2026-10-24 截圖：221109；Windows回傳_2026-10-24/v7.pla。\n加分改版_v7/規則凍結.json。',
  '參考文獻依正文引用的［1］到［7］排序，期刊論文、網路文件和課程講義都列在這裡；下面另列報告用到的研究資料。',
];

export default [
  Page01,
  Page02,
  PageContents,
  Page03,
  Page04,
  Page05,
  Page06,
  Page07,
  Page08,
  Page09,
  Page10,
  Page11,
  SelectionPage,
  Page12,
  Page14,
  Page15,
  Page16,
  Page17,
  Page18,
  Page19,
  ComparisonPage,
  YearlyPage,
  Page20,
  SummaryTopPage,
  SummaryBottomPage,
  SettingsPage,
  Page21,
  Page22,
  Page23,
  Page24,
  Page25,
  Page26,
  Page27,
  PageReferences,
] satisfies Page[];
