# 香港的士及網約車綜合筆試練習

Hong Kong Taxi and Ride-hailing Vehicle Combined Written Test Practice

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-GitHub_Pages-blue?style=for-the-badge)](https://apophislee.github.io/hong-kong-taxi-written-test-practice/)
![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![License](https://img.shields.io/badge/License-GPL--3.0-green)

這是一個非官方、免費及開源的繁體中文練習平台，內容按香港運輸署《的士及網約車綜合筆試指引》及自 **2026 年 8 月 3 日**起生效的《的士及網約車營運小冊子》整理。專案涵蓋載客服務知識、地方、路線及《道路使用者守則》四類題目，並可靜態部署至 GitHub Pages。

運輸署由 **2026 年 8 月 3 日**起接受綜合筆試申請，首批考生於 **2026 年 9 月中**開始應考；教材生效日不等同首日開考日期。

> 本專案並非香港運輸署網站，亦不代表運輸署。練習題不等同正式試題；報考及應試前，請以運輸署最新公布及教材為準。

## 最新考試形式

綜合筆試限時 **45 分鐘**，考生須完成兩部分：

| 部分 | 題型 | 正式考試題數 | 選項數目 | 及格要求 |
| --- | --- | ---: | ---: | --- |
| 甲部：的士及網約車營運 | 載客服務知識 | 20 | 4 | 甲部合計最少 25/30 |
| 甲部：的士及網約車營運 | 地方 | 9 | 4 | 甲部合計最少 25/30 |
| 甲部：的士及網約車營運 | 路線 | 1 | 3 | 甲部合計最少 25/30 |
| 乙部：《道路使用者守則》 | 道路使用者守則 | 35 | 3 | 最少 30/35 |

考生必須在甲、乙兩部均取得及格成績，才算通過綜合筆試。

## 本專案題庫

| 題庫 | 練習題數 | 選項數目 | 題庫性質 |
| --- | ---: | ---: | --- |
| 載客服務知識 | 30 | 4 | 按運輸署小冊子內容編寫的衍生練習題 |
| 地方 | 255 | 4 | 對應官方地方表；題幹、干擾選項及解說由本專案整理 |
| 路線 | 18 | 3 | 對應官方路線表；題幹、干擾選項及解說由本專案整理 |
| 道路使用者守則 | 4 | 3 | 按運輸署網頁及指引所列官方模擬題作文字化整理 |

以上數字是本專案的題庫記錄數，並不是正式考試的題數，也不表示已涵蓋所有可能考核內容。載客服務知識、地方及路線練習題不應被理解為運輸署正式或曾使用的試題。

## 功能

- 四大題型獨立練習
- 地方題可按醫院、旅遊景點、酒店、政府樓宇、商業大廈、購物商場、住宅樓宇及大專院校篩選
- 題目及選項隨機排序
- 即時顯示答案與解說
- 儲存練習進度，方便稍後繼續
- 響應式介面，支援手機、平板及桌面瀏覽器
- 靜態輸出及 GitHub Pages 自動部署

## 使用方法

直接開啟[線上版本](https://apophislee.github.io/hong-kong-taxi-written-test-practice/)，選擇題型後開始練習。

## 本地開發

需要 Node.js 及 npm。首次下載專案後，以 lockfile 安裝依賴：

```bash
npm ci
```

啟動開發伺服器：

```bash
npm run dev
```

然後開啟 [http://localhost:3000](http://localhost:3000)。

提交變更前，驗證題庫結構及正式建置：

```bash
npm test
npm run build
```

題庫 manifest 的 SHA-256 用作變更審查提示，確保題目、選項、答案、解說或分類被修改時須同步覆核；它不會自行證明題庫與官方原文一致，內容仍須按下列官方來源人工核對。

`npm run build` 會以 Next.js 靜態輸出設定建立 `out/`。

## 專案結構

```text
├── data/
│   ├── location-questions.json   # 255 條地方題
│   ├── operation-questions.json  # 30 條載客服務知識衍生題
│   ├── question-bank-manifest.json # 考制版本、來源及題庫規格
│   ├── road-user-questions.json  # 4 條官方道路使用者守則模擬題
│   └── route-questions.json      # 18 條路線題
├── docs/
│   └── 的士則例.md               # 綜合筆試溫習摘要及資料來源
├── pages/
│   ├── _app.tsx                  # 應用程式入口
│   ├── comprehensive-exam.tsx    # 題庫不足時的完整模擬試停用說明
│   ├── index.tsx                 # 首頁
│   ├── location-practice.tsx     # 統一題型練習頁面
│   ├── practice.tsx              # 題型選擇頁面
│   ├── regulations.tsx           # Markdown 溫習資料頁面
│   └── traffic-practice.tsx      # 舊交通題路徑的更新說明
├── scripts/
│   └── validate-question-banks.mjs # 題數、分類、選項及 ID 驗證
├── styles/                       # 全域樣式
├── types/                        # TypeScript 共用類型
├── next.config.js                # Next.js 靜態輸出設定
└── package.json                  # 指令及依賴
```

## 官方資料來源

- [運輸署：的士及網約車綜合筆試](https://www.td.gov.hk/tc/public_services/licences_and_permits/driving_test/tarhvcwt/index.html)
- [《的士及網約車綜合筆試指引》](https://www.td.gov.hk/filemanager/tc/content_5405/Guide%20to%20Taxi%20and%20Ride-hailing%20Vehicle%20Combined%20Written%20Test_C.pdf)
- [《的士及網約車營運小冊子》](https://www.td.gov.hk/filemanager/tc/content_5405/New%20Combined%20Written%20Test%20Booklet_C.pdf)

本專案資料版本按上述來源整理，考制基準日為 2026 年 8 月 3 日。官方資料可能隨時修訂；如題庫與最新官方資料有差異，應以運輸署版本為準。

## 部署

專案使用 `output: 'export'` 靜態輸出，並已設定 GitHub Pages 所需的 `basePath`、停用圖片最佳化及保留 `public/.nojekyll`。推送至 `main` 後，GitHub Actions 可自動建置及發布；也可以自行執行 `npm run build`，再部署 `out/` 內容。

## 支持專案

如果這個專案對你有幫助，歡迎透過 [GitHub Sponsors](https://github.com/sponsors/apophislee) 支持後續維護。

## 授權

原始碼依 [GNU General Public License v3.0](LICENSE) 發布。運輸署資料及教材的權利仍歸其各自權利人所有。
