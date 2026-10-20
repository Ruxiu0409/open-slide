import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

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
      {'2026年10月20日'}
    </div>
    <div style={{ position: 'absolute', left: 112, bottom: 70, fontSize: 25, color: '#77726A' }}>
      公開資料歷史研究＋MultiCharts TXF1實測（2020–2025）
    </div>
  </section>
);

const Page02: Page = () => (
  <Frame
    title={'研究問題與目前結果'}
    source={
      'MultiCharts TXF1日K日盤，2020–2025，初始100萬元，固定一口，手續費每邊500元、滑價每邊200元'
    }
    takeaway={'MultiCharts實測三項門檻都通過；獲利因子1.86，未達2的加分線'}
  >
    <p style={{ fontSize: 42, lineHeight: 1.5, margin: '0 0 145px' }}>
      {'一口台指期的趨勢交易，能否同時符合獲利與回撤門檻？'}
    </p>
    <div style={{ display: 'flex', gap: 75 }}>
      <Metric label={'MultiCharts淨利'} value={'224.32'} unit={'萬元'} />
      <Metric label={'最大策略虧損'} value={'60.58'} unit={'萬元'} gold />
      <Metric label={'最大年獲利（2024）'} value={'69.82'} unit={'萬元'} />
    </div>
  </Frame>
);

const Page03: Page = () => (
  <Frame
    title={'作業要求與研究設定'}
    source={'來源：Lecture05第31–32頁；近三年先採逐年為正的較嚴格解讀'}
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
        <col style={{ width: 328.45 }} />
        <col style={{ width: 1367.55 }} />
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
            {'項目'}
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
            {'講義要求與本研究設定'}
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
            {'商品與期間'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'台指期TX、日K；2019–2025，共七年'}
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
            {'部位與本金'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'一次0或1口、只做多、不加碼；初始100萬元'}
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
            {'成本與結算'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'來回費1,000元；另加每邊1點滑價；參與月結算'}
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
            {'績效門檻'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'近三年為正、淨利＞120萬元、最大策略虧損＜最大年獲利'}
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
            {'報告內容'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'發想、程式、優缺點、修正、績效；簡報與.pla'}
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
            {'評分比重'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'策略合理性40%、策略績效30%、策略發想30%'}
          </td>
        </tr>
      </tbody>
    </table>
  </Frame>
);

const Page04: Page = () => (
  <Frame
    title={'200日趨勢與波動的設計依據'}
    source={''}
    takeaway={'文獻提供動機，台指期規則與參數須由自己的資料驗證'}
  >
    <div style={{ display: 'flex', gap: 96 }}>
      <Column title={'文獻支持的研究方向'}>
        <p style={{ margin: 0 }}>{'跨市場期貨研究提供趨勢追蹤的實證動機'}</p>
        <p style={{ margin: 0 }}>{'Faber以10個月均線判斷長期趨勢'}</p>
        <p style={{ margin: 0 }}>{'高波動降低曝險，作為風控研究方向'}</p>
      </Column>
      <Column title={'本研究另行驗證的假說'}>
        <p style={{ margin: 0 }}>{'日K、200日均線與20日平均真實波幅'}</p>
        <p style={{ margin: 0 }}>{'1倍波幅緩衝帶、3倍固定波幅出場'}</p>
        <p style={{ margin: 0 }}>{'20萬元進場預算，均非文獻證明的最佳參數'}</p>
      </Column>
    </div>
  </Frame>
);

const Page05: Page = () => (
  <Frame
    title={'資料期間與驗證順序'}
    source={''}
    takeaway={'v6所有現有績效都是歷史開發證據，沒有獨立樣本外結果'}
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
        <col style={{ width: 388.17 }} />
        <col style={{ width: 1307.83 }} />
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
            {'資料'}
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
            {'用途與目前狀態'}
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
            {'2017–2018'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'指標前置資料，不列入作業獲利'}
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
            {'2019–2022'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'主要開發與鄰近參數檢查'}
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
            {'2023–2025'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'早期曾作驗證／保留期；後續改版已反覆看過'}
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
            {'2026/01–10/16'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'v5首次新資料檢查失敗；v6已用來診斷與改版'}
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
            {'v6凍結後的新行情'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'可另作未見資料檢查；目前沒有可報告的結果'}
          </td>
        </tr>
      </tbody>
    </table>
  </Frame>
);

const Page06: Page = () => (
  <Frame
    title={'原始均線與v1緩衝帶'}
    source={''}
    takeaway={'v1日結回撤89.34萬元，仍高於最大年獲利76.70萬元'}
  >
    <div style={{ display: 'flex', gap: 96 }}>
      <Column title={'原始200日均線'}>
        <p style={{ margin: 0 }}>{'收盤高於均線，次日開盤做多'}</p>
        <p style={{ margin: 0 }}>{'低於均線，次日開盤退出'}</p>
        <p style={{ margin: 0 }}>{'規則簡單，盤整可能反覆切換'}</p>
      </Column>
      <Column title={'v1加入波動緩衝'}>
        <p style={{ margin: 0 }}>{'上緣＝均線＋20日平均真實波幅'}</p>
        <p style={{ margin: 0 }}>{'下緣＝均線－20日平均真實波幅'}</p>
        <p style={{ margin: 0 }}>{'突破才切換方向，帶內保留原狀態'}</p>
      </Column>
    </div>
  </Frame>
);

const Page07: Page = () => (
  <Frame
    title={'v2追蹤退出仍遇到跳空損失'}
    source={''}
    takeaway={'七年OHLC回撤89.56萬元＞最大年獲利82.24萬元，未通過'}
  >
    <p style={{ fontSize: 38, color: muted, margin: '-10px 0 45px' }}>
      {'固定進場前波幅，避免下跌時出場線反而放寬'}
    </p>
    <table
      data-evidence="table"
      style={{
        width: 1696,
        height: 475,
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        fontSize: 35,
        lineHeight: 1.4,
      }}
    >
      <colgroup>
        <col style={{ width: 388.17 }} />
        <col style={{ width: 1307.83 }} />
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
            {'事件'}
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
            {'實際序列'}
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
            {'2024/07/17'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'月結算後，長期趨勢仍偏多'}
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
            {'2024/07/19'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'重新進場23,149點；固定波幅371.05點'}
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
            {'2024/08/02'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'收盤才確認觸發追蹤退出'}
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
            {'2024/08/05'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'跳空後20,711點賣出；該筆淨虧48.86萬元'}
          </td>
        </tr>
      </tbody>
    </table>
  </Frame>
);

const Page08: Page = () => (
  <Frame
    title={'v3與v4的進場修正都未通過'}
    source={'相同2019–2025期間、一口與成本；金額為新臺幣'}
    takeaway={'v3錯過未創新高的反彈；v4頻繁切換，後段回撤更大'}
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
        <col style={{ width: 164.23 }} />
        <col style={{ width: 761.41 }} />
        <col style={{ width: 268.73 }} />
        <col style={{ width: 501.63 }} />
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
            {'修改與預期'}
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
            {'七年淨利'}
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
            {'OHLC回撤／最大年獲利'}
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
            {'收盤突破前20日高點才進場\n減少下跌中的結算後重進'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'126.94萬'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'88.06萬／52.96萬'}
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
            {'長期趨勢內改用20日均線進出\n希望較早離開弱勢行情'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'159.76萬'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'123.22萬／44.22萬'}
          </td>
        </tr>
      </tbody>
    </table>
  </Frame>
);

const Page09: Page = () => (
  <Frame
    title={'v5先算好隔日日盤出場線'}
    source={''}
    takeaway={'當日最高價不能回頭提高當日已生效的停損線'}
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
        <col style={{ width: 313.52 }} />
        <col style={{ width: 1382.48 }} />
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
            {'時間'}
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
            {'可使用資訊與成交規則'}
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
            {'當日收盤'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'只用已完成收盤資料，算出明日日盤賣出停損價'}
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
            {'次日開盤'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'若開盤≤停損價，以開盤價減1點賣出'}
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
            {'次日盤中'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'否則最低價觸線，以停損價減1點賣出'}
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
            {'成交限制'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'線向下取整至1點；實際進場當天沒有盤中停損'}
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
            {'重新進場'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'停損當日關閉目標；最早再隔一個交易日開盤重進'}
          </td>
        </tr>
      </tbody>
    </table>
  </Frame>
);

const Page10: Page = () => (
  <Frame
    title={'v5在首次2026新資料檢查失敗'}
    source={'單位：萬元；2026僅至10/16；完整年度最大獲利為2024年'}
    takeaway={'2026重置測試仍賺93.14萬元，回撤卻達186.94萬元'}
  >
    <svg
      data-evidence="chart"
      role="img"
      aria-label={'v5在首次2026新資料檢查失敗'}
      width={1696}
      height={590}
      viewBox="0 0 1696 590"
      style={{ fontFamily: 'var(--osd-font-body)' }}
    >
      <line x1="110" x2="1668" y1="452.0" y2="452.0" stroke="#D8D2C4" strokeWidth="1.6" />
      <text x={88.0} y={461.0} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
        {'0'}
      </text>
      <line
        x1="110"
        x2="1668"
        y1="357.22727272727275"
        y2="357.22727272727275"
        stroke="#D8D2C4"
        strokeWidth="1"
      />
      <text x={88.0} y={366.23} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
        {'50'}
      </text>
      <line
        x1="110"
        x2="1668"
        y1="262.45454545454544"
        y2="262.45454545454544"
        stroke="#D8D2C4"
        strokeWidth="1"
      />
      <text x={88.0} y={271.45} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
        {'100'}
      </text>
      <line
        x1="110"
        x2="1668"
        y1="167.6818181818182"
        y2="167.6818181818182"
        stroke="#D8D2C4"
        strokeWidth="1"
      />
      <text x={88.0} y={176.68} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
        {'150'}
      </text>
      <line
        x1="110"
        x2="1668"
        y1="72.90909090909088"
        y2="72.90909090909088"
        stroke="#D8D2C4"
        strokeWidth="1"
      />
      <text x={88.0} y={81.91} textAnchor="end" fontSize={26} fontWeight={400} fill="#77726A">
        {'200'}
      </text>
      <text x={88.0} y={16.0} textAnchor="end" fontSize={25} fontWeight={400} fill="#77726A">
        {'萬元'}
      </text>
      <rect x="329.50" y="329.67" width="161.00" height="122.33" rx="3" fill="#B4432A" />
      <text
        x={410.0}
        y={314.67}
        textAnchor="middle"
        fontSize={32}
        fontWeight={400}
        fill="var(--osd-text)"
      >
        {'64.54'}
      </text>
      <rect x="499.50" y="270.19" width="161.00" height="181.81" rx="3" fill="#2F6B4F" />
      <text
        x={580.0}
        y={255.19}
        textAnchor="middle"
        fontSize={32}
        fontWeight={400}
        fill="var(--osd-text)"
      >
        {'95.92'}
      </text>
      <text x={499.5} y={520.0} textAnchor="middle" fontSize={29} fontWeight={400} fill="#77726A">
        {'2019–2025'}
      </text>
      <rect x="1108.50" y="97.66" width="161.00" height="354.34" rx="3" fill="#B4432A" />
      <text
        x={1189.0}
        y={82.66}
        textAnchor="middle"
        fontSize={32}
        fontWeight={400}
        fill="var(--osd-text)"
      >
        {'186.94'}
      </text>
      <rect x="1278.50" y="270.19" width="161.00" height="181.81" rx="3" fill="#2F6B4F" />
      <text
        x={1359.0}
        y={255.19}
        textAnchor="middle"
        fontSize={32}
        fontWeight={400}
        fill="var(--osd-text)"
      >
        {'95.92'}
      </text>
      <text x={1278.5} y={520.0} textAnchor="middle" fontSize={29} fontWeight={400} fill="#77726A">
        {'2019–2026/10/16'}
      </text>
      <rect x="548.0" y="558" width="16" height="16" rx="2" fill="#B4432A" />
      <text
        x={576.0}
        y={574.0}
        textAnchor="start"
        fontSize={27}
        fontWeight={400}
        fill="var(--osd-text)"
      >
        {'OHLC回撤界線'}
      </text>
      <rect x="834.0" y="558" width="16" height="16" rx="2" fill="#2F6B4F" />
      <text
        x={862.0}
        y={574.0}
        textAnchor="start"
        fontSize={27}
        fontWeight={400}
        fill="var(--osd-text)"
      >
        {'最大完整年平倉獲利'}
      </text>
    </svg>
  </Frame>
);

const Page11: Page = () => (
  <Frame
    title={'v6把一口契約換算成資金風險'}
    source={'20萬元是進場時的估算門檻；跳空與進場當日損失仍可超過預算'}
    takeaway={'只在估值≤20萬元時允許新倉；固定預算不隨獲利放大'}
  >
    <p
      style={{
        fontSize: 47,
        color: 'var(--osd-accent)',
        fontWeight: 550,
        margin: '20px 0 60px',
        lineHeight: 1.4,
      }}
    >
      {'規劃風險＝3 × 20日平均真實波幅 × 200 ＋ 1,600元'}
    </p>
    <p style={{ fontSize: 36, color: muted, margin: '0 0 65px' }}>
      {'1,600元＝來回費1,000＋兩邊滑價400＋取整預留200'}
    </p>
    <table
      data-evidence="table"
      style={{
        width: 1696,
        height: 275,
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        fontSize: 37,
        lineHeight: 1.4,
      }}
    >
      <colgroup>
        <col style={{ width: 612.11 }} />
        <col style={{ width: 477.75 }} />
        <col style={{ width: 606.14 }} />
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
            {'當前平均真實波幅'}
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
            {'規劃風險'}
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
            {'在預算條件下'}
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
            {'波幅300點'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'181,600元'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'允許評估進場'}
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
            {'波幅400點'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'241,600元'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'不送新買單'}
          </td>
        </tr>
      </tbody>
    </table>
  </Frame>
);

const Page12: Page = () => (
  <Frame
    title={'目前v6的完整交易規則'}
    source={''}
    takeaway={'停損後重新判斷趨勢；全程0或1口、不放空、不加碼'}
  >
    <Rule
      number="01"
      label={'趨勢狀態'}
      body={'200日均線±1倍20日平均真實波幅；越上緣開啟，跌破下緣關閉'}
    />
    <Rule
      number="02"
      label={'進場許可'}
      body={'空手、趨勢開啟且規劃風險≤20萬元，才送次日開盤買進一口'}
    />
    <Rule
      number="03"
      label={'固定波幅追蹤'}
      body={'最大已完成收盤／進場價，減3倍進場前波幅，作隔日盤中出場線'}
    />
    <Rule
      number="04"
      label={'退出與結算'}
      body={'保留趨勢轉弱次日退出；月結算處理持倉，之後保留一個空手日盤'}
    />
  </Frame>
);

const Page13: Page = () => (
  <Frame
    title={'Python研究與MultiCharts實測對照'}
    source={'TXF1與研究CSV的換月及價差處理可能不同；MultiCharts資料起點較晚，2019年沒有交易'}
    takeaway={'兩邊行情與結算口徑不同，淨利差距不是設定錯誤'}
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
        <col style={{ width: 253.8 }} />
        <col style={{ width: 661.38 }} />
        <col style={{ width: 780.82 }} />
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
            {'項目'}
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
            {'Python研究主版'}
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
            {'MultiCharts實測版'}
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
            {'行情'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'官方未調整近月日盤日K'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'內建TXF1日盤日K，每點200元'}
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
            {'月結算'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'官方最後結算價處理'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'日K收盤代理（This Bar On Close）'}
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
            {'回測淨利'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'301.92萬元（2019–2025）'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'224.32萬元（2020–2025，72筆）'}
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
            {'訂單時間'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'收盤判斷，次日開盤／既定停損'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'日K、IOG關閉，已完成回測'}
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
            {'正式狀態'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'公開資料歷史模擬已完成'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'四支程式編譯成功，已匯出.pla'}
          </td>
        </tr>
      </tbody>
    </table>
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
    source={'Python研究，2019–2025，單位：萬元；不含夜盤逐筆路徑與無法成交情況'}
    takeaway={'Python界線78.40萬＜108.38萬；MultiCharts最大策略虧損60.58萬＜69.82萬'}
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
    source={'2019–2025，單位：萬元；費用固定來回1,000元，滑價另計'}
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
    source={'MultiCharts TXF1策略績效報告，2020–2025；Python七年數字見第13頁'}
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
            {'2020–2025六年，72筆；一次最多1口'}
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
            {'結算日收盤平倉；佣金7.20萬、滑價2.88萬'}
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
            {'2023＋53.95、2024＋69.82、2025＋36.53萬'}
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
            {'224.32萬元'}
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
            {'60.58萬＜69.82萬元（2024）'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'通過，差9.24萬'}
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
            {'繳交簡報與.pla'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'簡報、講稿、.pla（含原始碼）'}
          </td>
          <td
            style={{
              padding: '14px 18px',
              border: '1px solid #D8D2C4',
              verticalAlign: 'middle',
              whiteSpace: 'pre-line',
            }}
          >
            {'已輸出'}
          </td>
        </tr>
      </tbody>
    </table>
  </Frame>
);

const Page21: Page = () => (
  <Frame
    title={'策略發想的差異與研究限制'}
    source={''}
    takeaway={'貢獻是可追溯的規則與失敗修正，未宣稱提出全新交易理論'}
  >
    <div style={{ display: 'flex', gap: 96 }}>
      <Column title={'相對課堂範例的差異'}>
        <p style={{ margin: 0 }}>{'長期均線帶判斷背景，固定波幅管理退出'}</p>
        <p style={{ margin: 0 }}>{'前一收盤決定隔日停損，明確保留跳空損失'}</p>
        <p style={{ margin: 0 }}>{'以0或1口對應固定本金的金額風險預算'}</p>
      </Column>
      <Column title={'目前證據的限制'}>
        <p style={{ margin: 0 }}>{'單一市場與七年主期間，改版已反覆看資料'}</p>
        <p style={{ margin: 0 }}>{'不含夜盤路徑、流動性不足與保證金追繳'}</p>
        <p style={{ margin: 0 }}>{'獲利因子1.86；20%預算未證明最適'}</p>
      </Column>
    </div>
  </Frame>
);

const Page22: Page = () => (
  <Frame title={'結論與後續檢查'} source={''}>
    <Rule
      number="01"
      label={'目前結論'}
      body={'v6在MultiCharts實測通過三項門檻，淨利224.32萬、最大策略虧損60.58萬元'}
    />
    <Rule
      number="02"
      label={'MultiCharts實測'}
      body={'函數、訊號與兩支指標已編譯並匯出.pla；與Python的差距來自行情與起始年'}
    />
    <Rule
      number="03"
      label={'需要補強'}
      body={'獲利因子1.86未達2；回撤只比最大年獲利少9.24萬元，餘裕很小'}
    />
    <Rule
      number="04"
      label={'下一段獨立檢查'}
      body={'補齊官方日曆後固定規則，使用凍結後未看過資料；不在該段挑參數'}
    />
  </Frame>
);

const Page23: Page = () => (
  <Frame title={'附錄A　指標與訂單的精確定義'} source={''} appendix>
    <Definition
      title={'真實波幅與平均方式'}
      body={
        'TR＝max（高－低，|高－前收|，|低－前收|）\n20日波幅＝最近20個TR的算術平均，並非Wilder平滑'
      }
    />
    <Definition
      title={'隔日追蹤出場線'}
      body={
        '峰值＝max（進場含滑價成交價，持倉已完成收盤價）\n停損價＝向下取整（峰值－3×固定進場前波幅），以1點為單位'
      }
    />
    <Definition
      title={'進場風險預算'}
      body={
        '3×當前20日波幅×200＋1,000＋400＋200≤200,000元\n只限制新買單；已有部位不因預算超標而事後新增退出'
      }
    />
  </Frame>
);

const Page24: Page = () => (
  <Frame
    title={'附錄B　20萬元預算的鄰近檢查'}
    source={'僅2019–2022開發期，單位：萬元；不在2023–2026搜尋預算網格'}
    takeaway={'預算越小不代表回撤必然越低；沒有改挑較賺的30萬元版'}
    appendix
  >
    <table
      data-evidence="table"
      style={{
        width: 1696,
        height: 570,
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
  </Frame>
);

const Page25: Page = () => (
  <Frame title={'附錄C　年度認列與補充績效'} source={''} appendix>
    <table
      data-evidence="table"
      style={{
        width: 1696,
        height: 335,
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        fontSize: 34,
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
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '45px 100px', marginTop: 70 }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          fontSize: 34,
        }}
      >
        <span style={{ color: muted }}>{'七年獲利因子'}</span>
        <strong style={{ color: 'var(--osd-accent)', fontWeight: 550, fontSize: 38 }}>
          {'2.23'}
        </strong>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          fontSize: 34,
        }}
      >
        <span style={{ color: muted }}>{'完成交易／勝率'}</span>
        <strong style={{ color: 'var(--osd-accent)', fontWeight: 550, fontSize: 38 }}>
          {'82筆／60.98%'}
        </strong>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          fontSize: 34,
        }}
      >
        <span style={{ color: muted }}>{'平均每筆淨利'}</span>
        <strong style={{ color: 'var(--osd-accent)', fontWeight: 550, fontSize: 38 }}>
          {'36,820元'}
        </strong>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          fontSize: 34,
        }}
      >
        <span style={{ color: muted }}>{'收盤持倉日比例'}</span>
        <strong style={{ color: 'var(--osd-accent)', fontWeight: 550, fontSize: 38 }}>
          {'54.73%'}
        </strong>
      </div>
    </div>
  </Frame>
);

const Page26: Page = () => (
  <Frame
    title={'附錄D　基準、來源與重現資料'}
    source={'2019–2025，單位：萬元；完整網址與證據路徑見本頁備註及講稿'}
    takeaway={'基準也是參與結算、相同成本與一次一口；基準回撤均用日結口徑'}
    appendix
  >
    <table
      data-evidence="table"
      style={{
        width: 1696,
        height: 355,
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        fontSize: 32,
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
    <div
      style={{
        marginTop: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: 19,
        color: muted,
        fontSize: 29,
        lineHeight: 1.4,
      }}
    >
      <p style={{ margin: 0 }}>{'作業：Lecture05第31–32頁；逐版原因：兩份策略發展歷程'}</p>
      <p style={{ margin: 0 }}>{'行情與規格：期交所TX；原始網址、時間及SHA256均有保存'}</p>
      <p style={{ margin: 0 }}>
        {'文獻：Moskowitz等（2012）、Faber（2013）、Moreira與Muir、Cederburg等'}
      </p>
      <p style={{ margin: 0 }}>{'重現：44項既有行為測試、23組來源核對、3組CSV重跑紀錄'}</p>
    </div>
  </Frame>
);
const Page27: Page = () => (
  <Frame
    title="附錄E　PowerLanguage程式節錄"
    source="完整Signal、官方結算日函數及兩個Indicator已匯出於.pla；本頁為條件節錄"
    appendix
  >
    <p style={{ fontSize: 35, color: muted, margin: '0 0 42px' }}>
      以進場預算決定買單，前一收盤決定隔日停損線
    </p>
    <pre
      style={{
        fontFamily: 'Menlo,Consolas,monospace',
        fontSize: 29,
        lineHeight: 1.48,
        whiteSpace: 'pre',
        margin: 0,
      }}
    >
      {
        'PlannedRiskTWD = TrailMultiple * RangeMean * PointValueTWD\n    + RoundTripFeeTWD + 2 * ModelSlippagePoints * PointValueTWD\n    + TickSize * PointValueTWD;\n\nif (MP = 0) and TargetLong\n   and (PlannedRiskTWD <= RiskBudgetTWD) then\n    Buy ("BudgetLong") 1 Contract Next Bar At Market;\n\nPeakClose = MaxList(PeakClose, Close);\nNextStop = IntPortion((PeakClose - TrailMultiple * FrozenEntryRange)\n    / TickSize) * TickSize;\n\nSell ("RiskStop") Next Bar At NextStop Stop;'
      }
    </pre>
  </Frame>
);

export const meta: SlideMeta = {
  title: '台指期長期趨勢策略與一口風險預算',
  createdAt: '2026-10-19T09:01:40.677Z',
};

export const notes: string[] = [
  '本報告研究台指期一口交易，說明原始均線策略如何經過失敗診斷與修正，形成目前的v6。先用期交所公開資料完成Python研究，再移到MultiCharts，用內建TXF1日K實際回測，並已匯出.pla。後面的金額除了特別標明MultiCharts的頁面，都是Python的歷史模擬。\n\n資料來源\nLecture05_MultiCharts策略開發實務.pptx，第31–32頁；1151_智慧量化交易_課程介紹.pptx，第4–5頁。\nMultiCharts實測\nMultiCharts實測/TXF1  FCU_TrendBudget_Signal 策略回測績效報告.xlsx；MultiCharts實測/FCUpla.pla。',
  '這頁先講MultiCharts實測的結果。用內建TXF1日K、只開日盤，2020到2025年，初始資金100萬元，固定一口，手續費每邊500元、滑價每邊200元。淨利224萬3,200元，最大策略虧損60萬5,800元，最大年獲利是2024年的69萬8,200元，所以回撤小於最大年獲利。2023到2025每年都賺錢，三項門檻都通過。獲利因子1.86，沒有到2，拿不到那項加分。Python版七年淨利301.92萬元，兩邊差在行情來源和起始年，第13頁會說明。\n\n資料來源\nMultiCharts實測\nMultiCharts實測/TXF1  FCU_TrendBudget_Signal 策略回測績效報告.xlsx；MultiCharts實測/FCUpla.pla。',
  '以Lecture05第31頁專題要求為準，第32頁是專題評分比重，與課程總成績的期中30%不同。講義的『近三年績效為正』未細分是否逐年，因此本研究採較嚴格的2023、2024、2025各年為正。課程介紹第4頁將專題一期中報告暫訂在10月27日。滑價1點是研究額外假設，費用1,000元是講義固定成本，未聲稱是真實券商費稅明細。\n\n資料來源\nLecture05_MultiCharts策略開發實務.pptx，第31–32頁；1151_智慧量化交易_課程介紹.pptx，第4–5頁。\n臺灣期貨交易所，臺股期貨契約規格：https://www.taifex.com.tw/cht/2/tX?menuid1=12 ，2026/10/20核對。',
  'Moskowitz等人的時間序列動能研究涵蓋58種期貨與遠期契約，與本報告只做多的台指期均線規則不同。Faber的模型是月底檢查10個月均線，本研究改成每日判斷200日均線，屬於改編。Moreira與Muir提供高波動時降低風險的動機；Cederburg等人提醒樣本內優勢不易轉為即時可實施績效。上述來源都沒有驗證本策略或20%預算。\n\n資料來源\nMoskowitz, Ooi & Pedersen (2012), Time Series Momentum. https://www.aqr.com/Insights/Research/Journal-Article/Time-Series-Momentum 。Faber (2013), QTAA Update: Conclusions and FAQs. https://mebfaber.com/2013/06/14/qtaa-update-conclustions-and-faqs/ 。2026/10/20核對。\nMoreira & Muir (2016/2017), Volatility-Managed Portfolios. https://www.nber.org/papers/w22208 。Cederburg et al. (2020), On the performance of volatility-managed portfolios. https://www.sciencedirect.com/science/article/pii/S0304405X2030132X 。2026/10/20核對摘要。',
  '價格為期交所TX一般交易時段、未調整近月日K，保留到期與換月價差，沒有用現貨指數計算期貨損益。資料原先依時間切割，但經歷數次改版後，2019至2025已成為已看過資料。2026對v5曾是首次新資料，對根據其失敗而設計的v6則已不是。v6在2026年10月19日18:20台北時間凍結，後續未見行情才可重新安排獨立檢查，短期低頻或無交易也不足以證明成功。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。\n公開資料回測/來源紀錄.json；風控改版_v5/2026新增來源紀錄.json。',
  '一開始希望用最簡單的趨勢規則建立比較基準。v1在第一次價格回測前就提出波動緩衝，假說是減少盤整交易，代價是較晚進出。原始無緩衝均線版的日結回撤也是89.34萬元，最大年獲利74.46萬元；v1緩衝版最大年獲利76.70萬元，均未過風險門檻。不是因為獲利不足才加更多指標，下一步要追查持倉回撤與出場速度。\n\n資料來源\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。\n公開資料回測/結果/full_mode1.json；公開資料回測/結果/full_mode2.json。',
  'v2以進場成交價與持倉最高已完成收盤價中的較高者，減3倍進場前平均真實波幅，產生追蹤退出參考。只向上提高，波幅進場時固定。當時仍等待當日收盤確認，再次日開盤賣出。7月結算後重進，剛好遇到8月急跌，不能在事後假設已於22,035.85點附近成交。問題包含弱勢重進與出場等待，後續分開試驗。\n\n資料來源\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。\n風控改版_v2/結果/full_same_period_risk3.json。',
  'v3通道排除當日最高價，收盤突破後仍次日開盤成交，避免不可能的當日最高價條件。它在2025年虧4萬4,800元，也未滿足近三年逐年為正。v4移除嚴格創高限制，改用20日均線判斷進出，但盤整與反彈切換效果不好。兩版在開發期曾通過風險比較，七年卻失敗，不能只挑開發期結果採用。兩個分支均保留，主策略回到長期趨勢與固定波幅出場。\n\n資料來源\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。\n風控改版_v6/報告資料.json。',
  'v5的重點是訂單時間，並非再縮短均線。停損價在前一收盤已知，次日日盤有效，不使用當日最高價重新計算再假設同日成交。開盤跳空採更差價格，保留跳空風險。進場當天缺少盤中保護，停損後也不立即反覆進場。這與MultiCharts的OHLC模擬仍需逐筆核對，尤其Bar Magnifier、IOG、日盤設定與停損跳空行為。\n\n資料來源\nMultiCharts官方文件，Stop：https://www.multicharts.com/trading-software/index.php?title=Stop ；Intra-bar Price Movement Assumptions：https://www.multicharts.com/trading-software/index.php?title=Intra-bar_Price_Movement_Assumptions 。2026/10/20核對。\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。',
  '2019至2025時，v5的64.54萬元OHLC回撤小於最大完整年獲利95.92萬元，先通過舊歷史。首次下載2026新資料後，以100萬元空手重置的測試雖有93.14萬元淨利，OHLC回撤達186.94萬元。連續跑到10月16日也有同樣回撤。圖中刻意只用完整年度的95.92萬元作年獲利比較，沒有把2026部分年當完整年。即便寬鬆納入2026部分年的134.90萬元，回撤仍超過它。因此總獲利為正不能取代風險門檻。\n\n資料來源\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。\n風控改版_v5/結果/new_2026_v5_stop3.json；風控改版_v5/結果/continuous_to_2026_v5_stop3.json。',
  'v5在2026年的進場前波幅由年初308.55點放大到6月底1,395.8點，3倍波幅的一口風險連同成本預留由186,730元增加到839,080元。固定一口並不代表固定金額風險。課堂不准減成半口，所以v6只能在0與1口間選擇，超過20萬元就不進場。20萬元是初始100萬元的20%，是事前固定的課堂風控假說。它不是單筆最大虧損保證，跳空、進場當日波動仍可能超過預算。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。\nMoreira & Muir (2016/2017), Volatility-Managed Portfolios. https://www.nber.org/papers/w22208 。Cederburg et al. (2020), On the performance of volatility-managed portfolios. https://www.sciencedirect.com/science/article/pii/S0304405X2030132X 。2026/10/20核對摘要。\n臺灣期貨交易所，臺股期貨契約規格：https://www.taifex.com.tw/cht/2/tX?menuid1=12 ，2026/10/20核對。',
  '帶內與相等時延續原趨勢狀態，避免每日重新分類。固定波幅是買進前一收盤可知的20日平均真實波幅，進場後不隨波動擴大而放寬。峰值以進場含模型滑價成交價與持倉已完成收盤價的最大值計算。第一條停損線在實際進場隔日才生效。停損當日強制關閉趨勢目標，下個空手收盤重新判斷，最早再下一個開盤重進。結算日不新增買單，退出後留一個完整空手日盤。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。\n風控改版_v6/PowerLanguage/FCU_TrendBudget_Signal.txt。',
  '這頁比較Python研究和MultiCharts實測。Python用期交所未調整近月日K，結算日按官方最後結算價；MultiCharts用內建TXF1，結算日用日K收盤代理。MultiCharts的資料起點比較晚，扣掉200日均線的暖機期，第一筆交易在2020年1月10日，2019年沒有交易，所以是六年72筆，Python是七年82筆。TXF1的換月時間和價差調整也可能跟研究CSV不同，均線和停損位置會跟著變。淨利224萬比301萬少，是資料口徑不同，不是設定錯誤。四支程式都編譯成功，也匯出了.pla。\n\n資料來源\n臺灣期貨交易所，臺股期貨契約規格：https://www.taifex.com.tw/cht/2/tX?menuid1=12 ，2026/10/20核對。\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/full_close_proxy.json；風控改版_v6/MultiCharts操作單.md。\nMultiCharts實測\nMultiCharts實測/TXF1  FCU_TrendBudget_Signal 策略回測績效報告.xlsx；MultiCharts實測/FCUpla.pla。',
  '這張表一律使用2019至2025，成本、一口限制與結算口徑一致。v3和v4沒有因結果差而從發展歷程消失。v5在這七年淨利最高、回撤較小，卻在後續首次2026新資料失敗。v6針對該失敗加入資金預算，所以後面要同時報告七年取捨與延伸結果。表中『通過』只指Python模型風險比較，正式MultiCharts欄位仍待驗證。\n\n資料來源\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。\n風控改版_v6/報告資料.json。',
  '年度資料以已完成交易在平倉年度認列，七年合計301萬9,200元。2023獲利52.68萬元、2024獲利108.38萬元、2025獲利21.34萬元。2022仍虧10.68萬元，顯示趨勢與波動規則並不能消除所有市場風險。此表的2025包含12月31日期末強制平倉，和延伸回測的連續持倉認列不同，附錄另對照。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。',
  '這張圖為2019至2025每日評價權益的每月最後交易日抽樣，包含未平倉損益與100萬元起始本金，單位萬元。抽樣方便展示長期資金變化，不用它重新估計日內風險；所有回撤數字都由完整每日及OHLC路徑計算。v6不是整段都比v5好，不能靠曲線終點較高或較平滑宣稱穩健。七年淨利與回撤取捨在下一張風險與後續表格說明。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。\n公開資料回測/結果/full_mode2.json；風控改版_v5/結果/full_v5_stop3.json。',
  '最大回撤是權益從高點掉下來的最大金額，不等於最大單筆虧損。這頁是Python的三種口徑：只看已平倉是44.56萬元，每日收盤評價是71.44萬元，日盤OHLC保守界線是78.40萬元，都小於最大年獲利108.38萬元。MultiCharts的正式欄位「最大策略虧損」是60.58萬元，對照的最大年獲利是69.82萬元，也通過。MultiCharts的最大平倉交易虧損是45.92萬元。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/本輪固定設定.json。\nMultiCharts實測\nMultiCharts實測/TXF1  FCU_TrendBudget_Signal 策略回測績效報告.xlsx；MultiCharts實測/FCUpla.pla。',
  '每邊2點完整重跑淨利302.96萬元，比1點主版多1.04萬元，不能說成本越高越好。因為成交價會初始化停損峰值，邊界日期的退出與後續進場可能改變。固定主版原成交路徑，只多扣每個需滑價成交1點，則會少22,600元，淨利降至299.66萬元。前者是完整策略敏感度，後者是純成本算術檢查。收盤結算代理則是準備MultiCharts比對的資料口徑。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。',
  'v6在舊七年少賺73萬3,400元，OHLC回撤還比v5多13萬8,600元；改善的是納入2026高波動期間之後的資金風險相容性。2026重置結果只有1筆，淨利27萬200元，之後167個合格空手判斷日因預算被擋。這是日數，不能說避開167筆虧損交易。連續2019至2026年10月16日淨利346萬5,200元，與分段測試因持倉與期末認列不同，不能直接相加。所有2026數字對v6均是已看過資料。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。',
  '這頁全部用MultiCharts的策略績效報告判定。回測2020到2025六年，共72筆，一次最多一口。結算日在收盤平倉，佣金總共7萬2,000元，等於每筆來回1,000元，滑價2萬8,800元，等於每邊200元。近三年2023賺53.95萬、2024賺69.82萬、2025賺36.53萬。淨利224.32萬元，大於120萬。最大策略虧損60.58萬元，小於2024年的69.82萬元，不過只差9.24萬元，餘裕不大。.pla已經匯出，裡面有函數、訊號和兩支指標，含原始碼。\n\n資料來源\nLecture05_MultiCharts策略開發實務.pptx，第31–32頁。\nMultiCharts實測\nMultiCharts實測/TXF1  FCU_TrendBudget_Signal 策略回測績效報告.xlsx；MultiCharts實測/FCUpla.pla。',
  '課堂已介紹高低通道突破，因此報告不把任何單一指標稱為創新。這份作業的差異在於將長期趨勢、因果明確的盤中訂單與固定本金預算整合，並留下每次錯誤、失敗與代價。日盤OHLC無法還原夜間最大浮虧，漲跌停或流動性也可能讓模擬價無法成交。均線、波幅、20%預算及多輪改版都有選擇偏誤，歷史通過不能證明未來能獲利。\n\n資料來源\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。\nLecture05_MultiCharts策略開發實務.pptx，第31–32頁；1151_智慧量化交易_課程介紹.pptx，第4–5頁。',
  '最後回到研究問題：一口台指期的趨勢策略，能不能同時過獲利和回撤門檻。v6在MultiCharts實測三項都過了，淨利224.32萬元，最大策略虧損60.58萬元。程式已經編譯並匯出.pla，跟Python的差距來自行情來源和起始年。還要補強的有兩點：獲利因子1.86，沒到2；回撤只比最大年獲利少9.24萬元，換一段行情就可能不過。之後如果要做獨立檢查，要先固定規則，用凍結後沒看過的資料，不在那段挑參數。\n\n資料來源\nMultiCharts實測\nMultiCharts實測/TXF1  FCU_TrendBudget_Signal 策略回測績效報告.xlsx；MultiCharts實測/FCUpla.pla。\n風控改版_v6/規則凍結.json。',
  '真實波幅跨近月切換時，以前一個已選近月收盤計算，包含未調整價差，這是明示資料選擇。固定進場前波幅是掛買單時已知的波幅。峰值以完成收盤而非當日最高價計算，賣出停損向下取整到1點，才符合TX最小升降單位。20萬元只作進場資格，不代表實際損失上限，也不會把後來變大的波幅回填到過去決策。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。\n臺灣期貨交易所，臺股期貨契約規格：https://www.taifex.com.tw/cht/2/tX?menuid1=12 ，2026/10/20核對。',
  '這是2019至2022開發期檢查，不是七年績效。10萬元版淨利21.30萬元、回撤42.74萬元，大於最大年獲利37.72萬元。20萬元主版淨利119.52萬元、回撤42.04萬元、最大年56.84萬元。30萬元淨利153.38萬元、回撤36.06萬元，開發期更好，但本輪主版在回測前已固定20萬元，沒有看結果後換成冠軍。鄰近設定只在開發期跑，不能把這張表拿來證明20%最適或穩健。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。\n策略發展歷程_從原始均線到公開資料回測.md；策略發展歷程_風控改版v2到v6.md。',
  '2025年最後一筆交易在七年測試於12月31日強制平倉，連續測試則延續到2026才認列，所以2025平倉獲利由21.34萬元變為12.46萬元。分段各自重置本金與空手，不能把七年與2026重置結果相加。獲利因子2.2318採每筆淨損益的正值合計除以負值絕對合計，勝率50/82即60.98%，平均每筆36,820元，收盤持倉日比例54.73%。這些定義在正式平台可能不同，不混用平台毛利與本報告淨損益。\n\n資料來源\n風控改版_v6/結果/full_primary200k.json；風控改版_v6/結果/continuous_primary200k.json；風控改版_v6/本輪固定設定.json；風控改版_v6/規則凍結.json。',
  '持續做多一口基準七年淨利413.12萬元，日結回撤176.34萬元，大於最大年獲利95萬元。原始無緩衝200日均線七年淨利與回撤均由full_mode1.json取值。這張基準比較使用三版都有的每日評價最大回撤，不把它與前文v6的OHLC界線混稱。完整來源URL附在本頁備註與講稿，交易明細和PowerLanguage檔保存在v6轉移包。44項測試、23組來源稽核及3組CSV重跑是既有研究驗證紀錄，不等於MultiCharts實機驗證。\n\n資料來源\nLecture05_MultiCharts策略開發實務.pptx，第31–32頁；1151_智慧量化交易_課程介紹.pptx，第4–5頁。\n臺灣期貨交易所，臺股期貨契約規格：https://www.taifex.com.tw/cht/2/tX?menuid1=12 ，2026/10/20核對。\nMoskowitz, Ooi & Pedersen (2012), Time Series Momentum. https://www.aqr.com/Insights/Research/Journal-Article/Time-Series-Momentum 。Faber (2013), QTAA Update: Conclusions and FAQs. https://mebfaber.com/2013/06/14/qtaa-update-conclustions-and-faqs/ 。2026/10/20核對。\nMoreira & Muir (2016/2017), Volatility-Managed Portfolios. https://www.nber.org/papers/w22208 。Cederburg et al. (2020), On the performance of volatility-managed portfolios. https://www.sciencedirect.com/science/article/pii/S0304405X2030132X 。2026/10/20核對摘要。\nMultiCharts官方文件，Stop：https://www.multicharts.com/trading-software/index.php?title=Stop ；Intra-bar Price Movement Assumptions：https://www.multicharts.com/trading-software/index.php?title=Intra-bar_Price_Movement_Assumptions 。2026/10/20核對。\n風控改版_v6/驗證結果.json；風控改版_v6/帳務與成交核對.json；風控改版_v6/匯出資料重跑核對.json。\n公開資料回測/結果/full_mode0.json；公開資料回測/結果/full_mode1.json。',
  '這一頁摘錄v6的核心條件。進場預算用已經收完的資料計算，合格才送隔天的買單；峰值減掉固定的進場前波幅，就是下一根日K的停損線。完整程式還處理趨勢退出、結算、進場當天沒有停損保護，以及停損後怎麼重新進場，這一段不能單獨拿去編譯。完整程式已在MultiCharts編譯成功，並匯出.pla。\n\n來源：風控改版_v6/PowerLanguage/FCU_TrendBudget_Signal.txt；MultiCharts實測/FCUpla.pla',
];

export default [
  Page01,
  Page02,
  Page03,
  Page04,
  Page05,
  Page06,
  Page07,
  Page08,
  Page09,
  Page10,
  Page11,
  Page12,
  Page13,
  Page14,
  Page15,
  Page16,
  Page17,
  Page18,
  Page19,
  Page20,
  Page21,
  Page22,
  Page23,
  Page24,
  Page25,
  Page26,
  Page27,
] satisfies Page[];
