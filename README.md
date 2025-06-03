# 香港的士筆試練習 Hong Kong Taxi Written Test Practice

> 本專案為 GitHub Copilot 協作開發實驗項目，主要內容由 LLM 生成，並經人工審核與優化。

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-GitHub_Pages-blue?style=for-the-badge)](https://apophislee.github.io/hong-kong-taxi-written-test-practice/)

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![License](https://img.shields.io/badge/License-GPL--3.0-green)

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

- 🚕 **交通規則練習** - 香港道路交通條例相關題目 （TODO）
- 🗺️ **路線練習** - 香港主要道路、隧道和行車路線（TODO）
- 📍 **地方練習** - 香港地理位置和地標認識
- 📝 **綜合考試** - 模擬真實考試環境（TODO）
- 📱 **響應式設計** - 支援手機、平板和桌面設備（TODO）
- 🌐 **雙語支援** - 中英文界面（TODO）
- 📊 **詳細分析** - 答題結果和錯題解析（TODO）
- 🚀 **快速部署** - 自動部署到 GitHub Pages

## 如何使用

### 線上版本（推薦）
直接訪問 [線上版本](https://apophislee.github.io/hong-kong-taxi-written-test-practice/) 即可開始練習

### 本地使用
1. 克隆項目到本地
2. 安裝依賴並啟動開發伺服器
3. 在瀏覽器中打開 `http://localhost:3000`

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
├── pages/                     # Next.js 頁面
│   ├── _app.tsx              # 應用程式入口
│   ├── index.tsx             # 首頁
│   ├── practice.tsx          # 練習選擇頁面
│   ├── traffic-practice.tsx  # 交通規則練習
│   ├── route-practice.tsx    # 路線練習
│   ├── location-practice.tsx # 地方練習
│   └── comprehensive-exam.tsx # 綜合考試
├── types/                    # TypeScript 類型定義
│   └── index.ts             # 共用類型
├── styles/                   # 樣式文件
│   └── globals.css          # 全局樣式
├── docs/                     # 題庫文檔
│   ├── 路線題庫.txt         # 路線題庫參考
│   └── 地方題庫.txt         # 地方題庫參考
├── public/                   # 靜態資源
├── .github/workflows/        # GitHub Actions 配置
└── next.config.js           # Next.js 配置
```

## 技術棧

- **框架**: Next.js 15.3.3
- **前端**: React 19.1.0  
- **語言**: TypeScript 5.0
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

本專案使用 GPL-3.0 授權。
