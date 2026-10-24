import type { Page } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

const muted = '#77726A';
const border = '#D8D2C4';
const accent = 'var(--osd-accent)';
const mono = 'Menlo,Consolas,monospace';
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
  children,
}: {
  title: string;
  source: string;
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
    <Footer source={source} />
  </section>
);

const DiffLine = ({ label, body }: { label: string; body: string }) => (
  <p style={{ fontSize: 30, lineHeight: 1.4, margin: '0 0 20px' }}>
    <span style={{ color: accent, fontWeight: 600 }}>{label}　</span>
    {body}
  </p>
);

const ChangedTag = () => (
  <span
    style={{
      display: 'inline-block',
      marginLeft: 10,
      padding: '0 8px',
      fontSize: 22,
      lineHeight: 1.4,
      color: 'var(--osd-bg)',
      background: accent,
      borderRadius: 4,
      verticalAlign: 2,
    }}
  >
    改
  </span>
);

type RuleRow = { label: string; body: string; changed?: boolean };

const headCell: CSSProperties = {
  background: 'var(--osd-text)',
  color: 'var(--osd-bg)',
  fontWeight: 600,
  textAlign: 'left',
  padding: '8px 16px',
  border: `1px solid ${border}`,
};

const bodyCell: CSSProperties = {
  padding: '8px 16px',
  border: `1px solid ${border}`,
  verticalAlign: 'middle',
};

const RuleTable = ({
  rows,
  heading,
  width,
}: {
  rows: RuleRow[];
  heading?: string;
  width: number;
}) => (
  <table
    data-evidence="table"
    style={{
      width,
      tableLayout: 'fixed',
      borderCollapse: 'collapse',
      fontSize: 28,
      lineHeight: 1.4,
    }}
  >
    <colgroup>
      <col style={{ width: 222 }} />
      <col style={{ width: width - 222 }} />
    </colgroup>
    {heading && (
      <thead>
        <tr>
          <th style={headCell}>項目</th>
          <th style={headCell}>{heading}</th>
        </tr>
      </thead>
    )}
    <tbody>
      {rows.map((row, index) => (
        <tr key={row.label} style={{ background: index % 2 === 0 ? '#FAF8F2' : '#EAE5D8' }}>
          <td
            style={{
              ...bodyCell,
              whiteSpace: 'nowrap',
              color: row.changed ? accent : undefined,
              fontWeight: row.changed ? 600 : undefined,
            }}
          >
            {row.label}
            {row.changed && <ChangedTag />}
          </td>
          <td style={bodyCell}>{row.body}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const CodeLabel = ({ kind, file }: { kind: string; file: string }) => (
  <div style={{ fontSize: 26, lineHeight: 1.4, margin: '0 0 10px', color: muted }}>
    <span style={{ color: accent, fontWeight: 600 }}>{kind}</span>
    {file && `　${file}`}
  </div>
);

const preStyle: CSSProperties = {
  fontFamily: mono,
  fontSize: 24,
  lineHeight: 1.4,
  whiteSpace: 'pre',
  margin: 0,
  padding: '10px 20px',
  background: '#FAF8F2',
  border: `1px solid ${border}`,
};

const PseudoCode = ({ code }: { code: string }) => (
  <div>
    <CodeLabel kind="規則虛擬碼" file="虛擬碼，非平台實際程式" />
    <pre style={preStyle}>{code}</pre>
  </div>
);

type SourceLine = [number, string];

const SourceExcerpt = ({ file, chunks }: { file: string; chunks: SourceLine[][] }) => (
  <div>
    <CodeLabel kind="PowerLanguage原始碼節錄" file={`${file}（左側為原始行號）`} />
    <pre style={preStyle}>
      {chunks.map((chunk, chunkIndex) => (
        <div key={chunk[0][0]} style={{ marginTop: chunkIndex === 0 ? 0 : 8 }}>
          {chunk.map(([lineNo, text]) => (
            <div key={lineNo}>
              <span style={{ color: muted, display: 'inline-block', width: 72 }}>{lineNo}</span>
              {text}
            </div>
          ))}
        </div>
      ))}
    </pre>
  </div>
);

const SideBySide = ({ table, code }: { table: ReactNode; code: ReactNode }) => (
  <div style={{ display: 'flex', gap: 40, alignItems: 'start' }}>
    {table}
    <div style={{ width: 646, flexShrink: 0 }}>{code}</div>
  </div>
);

const trendRow: RuleRow = {
  label: '趨勢判斷',
  body: '200日均線±1倍20日平均真實波幅；收盤高於上緣開啟，低於下緣關閉，帶內維持原狀態',
};

const flatPositionRow: RuleRow = {
  label: '部位',
  body: '0或1口，只做多、不加碼；沒有資金預算限制',
};

const sideTableWidth = 1010;

const v1Rows: { label: string; base: string; band: string; shared?: boolean }[] = [
  {
    label: '趨勢判斷',
    base: '200日收盤簡單均線，沒有緩衝帶',
    band: '同一條均線，上下各加1倍20日平均真實波幅，形成上緣與下緣',
  },
  {
    label: '進場',
    base: '空手且收盤高於均線，次一交易日開盤市價買進',
    band: '空手且收盤高於上緣，次一交易日開盤市價買進',
  },
  {
    label: '出場與停損',
    base: '收盤低於均線，次一交易日開盤賣出；沒有停損',
    band: '收盤低於下緣，次一交易日開盤賣出；沒有停損',
  },
  {
    label: '部位',
    base: '兩版相同：0或1口，只做多、不加碼；沒有資金預算限制',
    band: '',
    shared: true,
  },
  {
    label: '結算日',
    base: '兩版相同：結算日以期交所最後結算價平倉；次一交易日整天空手，收盤重新判斷，最早再隔日開盤進場',
    band: '',
    shared: true,
  },
  {
    label: '停損後重進',
    base: '沒有停損；退出後收盤再高於均線，次日開盤買回',
    band: '沒有停損；退出後收盤須再高於上緣，次日開盤買回',
  },
];

export const VersionV1Page: Page = () => (
  <Frame
    title="原始均線與v1緩衝帶：交易規則"
    source="依據：策略提案_長期均線趨勢濾網.md；策略發展歷程_從原始均線到公開資料回測.md；公開資料回測／事前設定.json"
  >
    <DiffLine
      label="v1的修改"
      body="趨勢判斷由一條線改成一段帶，進出場門檻隨之改為上緣、下緣；帶內維持原狀態。"
    />
    <table
      data-evidence="table"
      style={{
        width: 1696,
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        fontSize: 28,
        lineHeight: 1.4,
      }}
    >
      <colgroup>
        <col style={{ width: 222 }} />
        <col style={{ width: 737 }} />
        <col style={{ width: 737 }} />
      </colgroup>
      <thead>
        <tr>
          <th style={headCell}>項目</th>
          <th style={headCell}>原始均線</th>
          <th style={headCell}>v1緩衝帶</th>
        </tr>
      </thead>
      <tbody>
        {v1Rows.map((row, index) => (
          <tr key={row.label} style={{ background: index % 2 === 0 ? '#FAF8F2' : '#EAE5D8' }}>
            <td
              style={{
                ...bodyCell,
                whiteSpace: 'nowrap',
                color: row.label === '趨勢判斷' ? accent : undefined,
                fontWeight: row.label === '趨勢判斷' ? 600 : undefined,
              }}
            >
              {row.label}
              {row.label === '趨勢判斷' && <ChangedTag />}
            </td>
            {row.shared ? (
              <td style={bodyCell} colSpan={2}>
                {row.base}
              </td>
            ) : (
              <>
                <td style={bodyCell}>{row.base}</td>
                <td style={bodyCell}>{row.band}</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
    <p style={{ fontSize: 28, lineHeight: 1.4, color: muted, margin: '22px 0 0' }}>
      20日平均真實波幅：最近20日真實波幅的簡單平均。例：均線20,000點、波幅200點，上緣20,200、下緣19,800；收在20,100時，空手不進場，已持有則續抱。
    </p>
  </Frame>
);

export const VersionV1CodePage: Page = () => (
  <Frame
    title="原始均線與v1：早期PowerLanguage程式"
    source="說明依據：策略發展歷程_從原始均線到公開資料回測.md；公開資料回測／事前設定.json"
  >
    <DiffLine
      label="同一支訊號程式"
      body="Mode＝1時BandWidth為0，就是原始均線；Mode＝2時寬度為1倍波幅，就是v1。"
    />
    <SourceExcerpt
      file="策略實作／PowerLanguage／FCU_TrendBand_Signal.txt"
      chunks={[
        [
          [45, 'RangeMean = Average(TrueRangeValue, RangeLength);'],
          [46, 'BandWidth = 0;'],
          [47, 'if Mode = 2 then'],
          [48, '    BandWidth = BandMultiple * RangeMean;'],
          [49, 'UpperBand = TrendMean + BandWidth;'],
          [50, 'LowerBand = TrendMean - BandWidth;'],
        ],
        [
          [63, '    else if Close > UpperBand then'],
          [64, '        TargetLong = True'],
          [65, '    else if Close < LowerBand then'],
          [66, '        TargetLong = False;'],
        ],
        [
          [73, '        if (MarketPosition = 0) and TargetLong then'],
          [74, '            Buy ("TrendLong") 1 Contract Next Bar At Market;'],
          [75, '        if (MarketPosition = 1) and (not TargetLong) then'],
          [76, '            Sell ("TrendExit") Next Bar At Market;'],
        ],
      ]}
    />
    <p style={{ fontSize: 28, lineHeight: 1.4, color: muted, margin: '18px 0 0' }}>
      第73–76行位於非結算日的分支；結算日由第70行Sell ("SettleProxy") This Bar On
      Close以收盤價代理平倉，公開資料回測則改用期交所最後結算價。此為早期草稿，當時尚未在MultiCharts編譯。
    </p>
  </Frame>
);

export const VersionV2Page: Page = () => (
  <Frame
    title="v2追蹤退出：規則與程式"
    source="依據：風控改版_v2／本輪固定設定.json、規則凍結.json；策略發展歷程_風控改版v2到v6.md"
  >
    <DiffLine label="與v1差異" body="新增3倍固定波幅的追蹤退出；退出後須重新站上上緣才可再進場。" />
    <SideBySide
      table={
        <RuleTable
          width={sideTableWidth}
          heading="v2規則"
          rows={[
            {
              ...trendRow,
              body: '同v1：200日均線±1倍20日平均真實波幅，高於上緣開啟、低於下緣關閉',
            },
            {
              label: '進場',
              body: '空手且趨勢開啟，次一交易日開盤買進；訊號日的平均真實波幅記為「固定波幅」',
            },
            {
              label: '出場與停損',
              body: '峰值＝進場成交價與持倉最高收盤取高者。收盤低於峰值－3×固定波幅，或低於下緣，次日開盤賣出',
              changed: true,
            },
            flatPositionRow,
            {
              label: '結算日',
              body: '結算日平倉，次一交易日空手；新合約當新交易，重記固定波幅與峰值',
            },
            {
              label: '停損後重進',
              body: '追蹤退出當天把趨勢關閉；收盤須再高於上緣，次日開盤才重進',
              changed: true,
            },
          ]}
        />
      }
      code={
        <PseudoCode
          code={`if MP = 0 and TargetLong then begin
  FrozenRange = RangeMean;
  Buy Next Bar At Market;
end;
if MP = 1 then begin
  Peak = MaxList(Peak, Close);
  Trail = Peak - 3 * FrozenRange;
  if Close < Trail then begin
    TargetLong = False;
    Sell Next Bar At Market;
  end;
end;
{ Peak 初值為進場成交價 }`}
        />
      }
    />
  </Frame>
);

export const VersionV3Page: Page = () => (
  <Frame
    title="v3突破進場：規則與程式"
    source="依據：風控改版_v3／本輪固定設定.json、規則凍結.json；策略發展歷程_風控改版v2到v6.md"
  >
    <DiffLine label="與v2差異" body="只改進場：每一次進場都要收盤突破前20個交易日的最高價。" />
    <SideBySide
      table={
        <RuleTable
          width={sideTableWidth}
          heading="v3規則"
          rows={[
            {
              ...trendRow,
              body: '同v1：200日均線±1倍20日平均真實波幅，高於上緣開啟、低於下緣關閉',
            },
            {
              label: '進場',
              body: '空手、趨勢開啟，且收盤高於前20日最高價（不含當日），次一交易日開盤買進',
              changed: true,
            },
            {
              label: '出場與停損',
              body: '同v2：收盤低於峰值－3×固定波幅，或低於下緣，次一交易日開盤賣出',
            },
            flatPositionRow,
            {
              label: '結算日',
              body: '結算日平倉，次一交易日空手；之後重進同樣要突破前20日最高價',
            },
            {
              label: '停損後重進',
              body: '趨勢關閉；須再收盤高於上緣，且突破前20日最高價，次日開盤才重進',
            },
          ]}
        />
      }
      code={
        <PseudoCode
          code={`BreakHigh = Highest(High, 20)[1];
if MP = 0 and TargetLong
   and Close > BreakHigh then begin
  FrozenRange = RangeMean;
  Buy Next Bar At Market;
end;
{ 出場與 v2 相同 }
if MP = 1 and Close < Trail then begin
  TargetLong = False;
  Sell Next Bar At Market;
end;`}
        />
      }
    />
  </Frame>
);

export const VersionV4Page: Page = () => (
  <Frame
    title="v4短均線進出：規則與程式"
    source="依據：風控改版_v4／本輪固定設定.json、規則凍結.json；策略發展歷程_風控改版v2到v6.md"
  >
    <DiffLine
      label="與v3差異"
      body="取消20日新高與3倍追蹤退出，改用20日均線決定進出；200日帶保留。"
    />
    <SideBySide
      table={
        <RuleTable
          width={sideTableWidth}
          heading="v4規則"
          rows={[
            {
              ...trendRow,
              body: '同v1：200日均線±1倍20日平均真實波幅，當作長期背景',
            },
            {
              label: '進場',
              body: '空手、趨勢開啟，且收盤高於20日均線，次一交易日開盤買進；剛好等於不進場',
              changed: true,
            },
            {
              label: '出場與停損',
              body: '收盤低於20日均線，或低於下緣，次一交易日開盤賣出；不設3倍追蹤退出',
              changed: true,
            },
            flatPositionRow,
            {
              label: '結算日',
              body: '結算日平倉，次一交易日空手；重進仍須收盤高於20日均線',
            },
            {
              label: '停損後重進',
              body: '沒有停損；跌破20日均線不關閉長期趨勢，收盤再站上即次日買回',
              changed: true,
            },
          ]}
        />
      }
      code={
        <PseudoCode
          code={`FastMean = Average(Close, 20);
if MP = 0 and TargetLong
   and Close > FastMean then
  Buy Next Bar At Market;
if MP = 1 and (Close < FastMean
   or not TargetLong) then
  Sell Next Bar At Market;
{ 主版不計算 3 倍追蹤線 }`}
        />
      }
    />
  </Frame>
);

export const VersionV5Page: Page = () => (
  <Frame
    title="v5隔日停損單：規則與程式"
    source="依據：風控改版_v5／本輪固定設定.json、規則凍結.json；策略發展歷程_風控改版v2到v6.md"
  >
    <DiffLine label="與v4差異" body="放棄v3、v4的進場濾網，回到v2；追蹤線改成隔日日盤的停損單。" />
    <SideBySide
      table={
        <RuleTable
          width={sideTableWidth}
          heading="v5規則"
          rows={[
            {
              ...trendRow,
              body: '同v1：200日均線±1倍20日平均真實波幅，高於上緣開啟、低於下緣關閉',
            },
            {
              label: '進場',
              body: '回到v2：空手且趨勢開啟，次一交易日開盤買進，記下固定波幅',
              changed: true,
            },
            {
              label: '出場與停損',
              body: '每日收盤算停損價＝峰值－3×固定波幅，取整到1點，隔日日盤有效。開盤已低於停損價，以開盤價減1點成交；盤中觸及，以停損價減1點成交。進場當天沒有停損',
              changed: true,
            },
            flatPositionRow,
            {
              label: '結算日',
              body: '結算日平倉，次一交易日空手；同日觸及停損時先處理停損',
            },
            {
              label: '停損後重進',
              body: '停損當日關閉趨勢，不當日重進；收盤再高於上緣，下一個開盤才買進',
              changed: true,
            },
          ]}
        />
      }
      code={
        <PseudoCode
          code={`if MP = 1 then begin
  Peak = MaxList(Peak, Close);
  NextStop = Floor(Peak
    - 3 * FrozenRange);
  if not TargetLong then
    Sell Next Bar At Market
  else
    Sell Next Bar At NextStop Stop;
end;
if StoppedToday then
  TargetLong = False;`}
        />
      }
    />
  </Frame>
);

export const VersionV6Page: Page = () => (
  <Frame
    title="v6進場風險預算：規則與程式"
    source="依據：風控改版_v6／本輪固定設定.json、規則凍結.json；策略發展歷程_風控改版v2到v6.md"
  >
    <DiffLine
      label="與v5差異"
      body="只加進場許可：估算一口的風險超過20萬元就不送買單，其餘沿用v5。"
    />
    <RuleTable
      width={1696}
      rows={[
        trendRow,
        {
          label: '進場',
          body: '空手、趨勢開啟，且規劃風險≤20萬元，次一交易日開盤買進；超過則當日不進場',
          changed: true,
        },
        {
          label: '出場與停損',
          body: '同v5：峰值－3×固定波幅取整為隔日日盤停損單；收盤低於下緣，次日開盤賣出',
        },
        {
          label: '部位',
          body: '0或1口；規劃風險＝3×當前波幅×200＋1,600元，上限固定20萬元，不隨獲利放大',
          changed: true,
        },
        {
          label: '結算日',
          body: '結算日平倉，次一交易日空手；公開資料回測用最後結算價，平台程式用收盤價代理',
        },
        {
          label: '停損後重進',
          body: '停損當日關閉趨勢；收盤再高於上緣，且預算通過，下一個開盤才買進',
        },
      ]}
    />
    <div style={{ marginTop: 24 }}>
      <SourceExcerpt
        file="風控改版_v6／PowerLanguage／FCU_TrendBudget_Signal.txt"
        chunks={[
          [
            [55, 'PlannedRiskTWD = TrailMultiple * RangeMean * PointValueTWD'],
            [56, '    + RoundTripFeeTWD + 2 * ModelSlippagePoints * PointValueTWD'],
            [57, '    + TickSize * PointValueTWD;'],
          ],
          [
            [112, '        else if TargetLong and (PlannedRiskTWD <= RiskBudgetTWD) then'],
            [113, '            Buy ("BudgetLong") 1 Contract Next Bar At Market;'],
          ],
        ]}
      />
    </div>
  </Frame>
);

export const VersionV6CodePage: Page = () => (
  <Frame
    title="v6程式：固定波幅、隔日停損與趨勢退出"
    source="依據：風控改版_v6／本輪固定設定.json；風控改版_v5／本輪固定設定.json；策略發展歷程_風控改版v2到v6.md"
  >
    <DiffLine
      label="v5的停損在平台上的寫法"
      body="進場那根記下前一日波幅與峰值；每日收盤更新隔日的停損價。"
    />
    <SourceExcerpt
      file="風控改版_v6／PowerLanguage／FCU_TrendBudget_Signal.txt"
      chunks={[
        [
          [66, 'if MP = 1 then begin'],
          [67, '    if MP[1] <> 1 then begin'],
          [68, '        FrozenEntryRange = RangeMean[1];'],
          [69, '        PeakClose = Open + ModelSlippagePoints;'],
          [70, '    end;'],
          [71, '    PeakClose = MaxList(PeakClose, Close);'],
          [72, '    NextStop = IntPortion((PeakClose - TrailMultiple * FrozenEntryRange)'],
          [73, '        / TickSize) * TickSize;'],
        ],
        [
          [88, '    if StoppedToday then'],
          [89, '        TargetLong = False;'],
        ],
        [
          [104, '        if MP = 1 then begin'],
          [105, '            if not TargetLong then begin'],
          [106, '                Sell ("TrendExit") Next Bar At Market;'],
          [107, '                MarketExitScheduled = True;'],
          [108, '            end'],
          [109, '            else'],
          [110, '                Sell ("RiskStop") Next Bar At NextStop Stop;'],
        ],
      ]}
    />
  </Frame>
);

export const VersionV7Page: Page = () => (
  <Frame
    title="v7最終策略：規則與程式"
    source="依據：加分改版_v7／規則凍結.json、完整評估規格.json、第二輪規格.json"
  >
    <DiffLine label="與v6差異" body="只改出場：追蹤停損由3倍改為2.5倍固定波幅；進場預算仍用3倍。" />
    <RuleTable
      width={1696}
      rows={[
        trendRow,
        {
          label: '進場',
          body: '同v6：空手、趨勢開啟，且規劃風險≤20萬元，次一交易日開盤買進',
        },
        {
          label: '出場與停損',
          body: '峰值－2.5×固定波幅取整為隔日日盤停損單；收盤低於下緣，次日開盤賣出',
          changed: true,
        },
        {
          label: '部位',
          body: '同v6：0或1口；規劃風險仍以3×當前波幅×200＋1,600元估算，上限20萬元',
        },
        {
          label: '結算日',
          body: '結算日平倉，次一交易日空手；公開資料回測用最後結算價，平台程式用收盤價代理',
        },
        {
          label: '停損後重進',
          body: '同v6：停損當日關閉趨勢；收盤再高於上緣且預算通過，下一個開盤才買進',
        },
      ]}
    />
    <div style={{ marginTop: 24 }}>
      <CodeLabel kind="與v6不同的程式行" file="FCU_TrendBudget_V7_Candidate.txt" />
      <pre style={preStyle}>
        {[
          ['v6 18', '－', '    TrailMultiple(3),'],
          ['v7 16', '＋', '    TrailMultiple(2.5),'],
          ['v7 17', '＋', '    EntryBudgetMultiple(3),'],
          ['v6 55', '－', 'PlannedRiskTWD = TrailMultiple * RangeMean * PointValueTWD'],
          ['v7 55', '＋', 'PlannedRiskTWD = EntryBudgetMultiple * RangeMean * PointValueTWD'],
        ].map(([where, mark, text]) => (
          <div key={where}>
            <span style={{ color: muted, display: 'inline-block', width: 110 }}>{where}</span>
            <span
              style={{
                color: mark === '＋' ? accent : muted,
                display: 'inline-block',
                width: 40,
              }}
            >
              {mark}
            </span>
            {text}
          </div>
        ))}
      </pre>
    </div>
  </Frame>
);

export const versionNotes: Record<string, string> = {
  VersionV1Page:
    '這頁把最早的兩版放在一起看。原始均線只用一條200日均線，收盤在上面就隔天開盤買一口，掉到下面就隔天開盤賣掉。v1在第一次回測之前就提出，只改趨勢判斷：均線上下各加一倍20日平均真實波幅，收盤要高過上緣才進場、低於下緣才出場，中間不動。兩版都沒有停損，結算日一律平倉，隔一個日盤再判斷。',
  VersionV1CodePage:
    '這是早期草稿的實際程式，原始均線和v1是同一支訊號，用Mode切換。Mode等於1時帶寬是0，就是原始均線；等於2時帶寬是一倍波幅。買賣都用Next Bar At Market，也就是收盤確認、隔天開盤成交。這份草稿當時沒有在平台編譯，結算用收盤價代理，公開資料回測則改用期交所最後結算價，兩者口徑不同。',
  VersionV2Page:
    'v2開始加出場保護。進場那天先把訊號日的平均真實波幅記下來，持倉期間不再更新；峰值取進場成交價和持倉後最高收盤的較高者。收盤跌破峰值減3倍固定波幅，就隔天開盤賣出，同時把趨勢狀態關掉，要等收盤再站上上緣才重新進場。右邊是依凍結規則寫的虛擬碼，v2沒有平台程式。',
  VersionV3Page:
    'v3只動進場。v2在月結算後會在下跌途中重新買回，所以v3要求每次進場前，收盤都要高過前20個交易日的最高價，不含當天。出場仍是v2的3倍追蹤退出。20日沿用通道的常見預設，沒有掃參數。右邊一樣是虛擬碼。',
  VersionV4Page:
    'v4換一個方向：拿掉v3的新高條件，也拿掉3倍追蹤退出，改用20日均線管進出。200日帶還在，只是當作背景；在多頭背景裡，收盤高於20日均線就買、低於就賣。跌破20日均線不會關掉長期趨勢，所以站回來就再買。剛好等於20日均線時不新進場。',
  VersionV5Page:
    'v5回到v2的進場，改的是停損的時間。每天收盤先算好隔天的停損價，取整到1點，隔天日盤直接掛停損單，不用等收盤。開盤就跳空跌破，用開盤價再減1點成交，不假設在停損價成交。進場當天還沒有停損單。停損當天把趨勢關掉，之後收盤再站上上緣才重進。平台實際寫法在v6程式頁。',
  VersionV6Page:
    'v6只多一個進場許可。空手、趨勢開啟時，先估一口的規劃風險：3倍當前波幅乘每點200元，再加1,600元的費用、滑價和取整預留。小於等於20萬元才送隔天的買單，超過就不進場。預算固定20萬元，不跟著獲利放大。下面兩段是v6訊號程式的原文，注意這裡算預算用的是TrailMultiple，也就是和停損同一個3倍。',
  VersionV6CodePage:
    '這頁是v6程式裡停損的部分，也就是v5規則在平台上的寫法。第67到69行在進場那根K棒記下前一日的平均波幅和進場價；第71到73行每天更新峰值和隔天的停損價，向下取整到1點。第88行在停損當天把趨勢關掉。第105到110行：趨勢已經轉弱就隔天市價賣，否則掛停損單。',
  VersionV7Page:
    'v7是最終策略，和前一版v6相比只改出場距離。v6的停損和預算共用TrailMultiple這個3倍，v7把它拆成兩個參數：TrailMultiple改成2.5，只管停損線；新增EntryBudgetMultiple，維持3，只管進場預算。所以進場的門檻跟v6一樣，持倉後停損拉近半倍波幅。程式另外多一行檢查，預算倍數不能小於追蹤倍數。',
};
