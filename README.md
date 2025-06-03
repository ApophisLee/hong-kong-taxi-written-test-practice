# 香港的士筆試練習 Hong Kong Taxi Written Test Practice

一個專為香港的士筆試考生設計的在線練習平台，提供全面的題庫和模擬考試功能。使用 Next.js 建立，支援靜態部署到 GitHub Pages。

A comprehensive online practice platform designed for Hong Kong taxi written test candidates, featuring complete question banks and mock exam functionality. Built with Next.js and supports static deployment to GitHub Pages.

## 支持專案 Support the Project

如果這個專案對您有幫助，歡迎支持開發者！  
If this project helps you, please consider supporting the developer!

### GitHub Sponsors
[![GitHub Sponsors](https://img.shields.io/badge/sponsor-GitHub%20Sponsors-ff69b4?logo=github)](https://github.com/sponsors/apophislee)

您的支持能幫助我繼續維護和改進這個專案，讓更多準備考取香港的士牌照的朋友受益！  
Your support helps me continue maintaining and improving this project for more people preparing for Hong Kong taxi license exams!

## 功能特色

- 🚕 **交通規則練習** - 香港道路交通條例相關題目
- 🗺️ **路線練習** - 香港主要道路、隧道和行車路線
- 📍 **地方練習** - 香港地理位置和地標認識
- 📝 **綜合考試** - 模擬真實考試環境
- 📱 **響應式設計** - 支援手機、平板和桌面設備
- 🌐 **雙語支援** - 中英文界面
- 📊 **詳細分析** - 答題結果和錯題解析
- 🚀 **快速部署** - 自動部署到 GitHub Pages

## 本地開發

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 在瀏覽器中查看結果。

### 建置專案

```bash
npm run build
```

建置完成後，靜態文件會生成在 `out/` 目錄中。

## 部署到 GitHub Pages

### 自動部署（推薦）

1. 將代碼推送到 GitHub 儲存庫的 `main` 分支
2. 在 GitHub 儲存庫設定中啟用 GitHub Pages
3. 選擇 "GitHub Actions" 作為來源
4. GitHub Actions 會自動建置和部署您的應用程式

### 手動部署

1. 建置專案：
   ```bash
   npm run build
   ```

2. 將 `out/` 目錄的內容複製到您的網頁伺服器

## 專案結構

```
├── pages/              # Next.js 頁面
│   ├── _app.js         # 應用程式入口
│   └── index.js        # 首頁
├── styles/             # 樣式文件
│   └── globals.css     # 全局樣式
├── public/             # 靜態資源
├── .github/workflows/  # GitHub Actions 配置
└── next.config.js      # Next.js 配置
```

## 技術棧

- **框架**: Next.js 15.3.3
- **前端**: React 19.1.0
- **樣式**: CSS-in-JS + 全局 CSS
- **部署**: GitHub Pages
- **CI/CD**: GitHub Actions

## GitHub Pages 配置說明

此專案已配置為可部署到 GitHub Pages：

1. `next.config.js` 設定了靜態導出和正確的 basePath
2. `.github/workflows/deploy.yml` 提供了自動部署工作流程
3. `public/.nojekyll` 防止 Jekyll 處理

## 開發注意事項

- 使用 `output: 'export'` 配置進行靜態生成
- 圖片最佳化已停用（`unoptimized: true`）以支援靜態託管
- basePath 設定為儲存庫名稱以正確處理 GitHub Pages 路徑

## 授權

本專案使用 ISC 授權。
