import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import { CSSProperties } from 'react';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>香港的士筆試練習 - Hong Kong Taxi Written Test Practice</title>
        <meta name="description" content="香港的士筆試練習應用 - Practice app for Hong Kong taxi written test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>
            🚕
          </h1>
          <p style={styles.description}>
            歡迎來到香港的士筆試練習應用程式
          </p>
          <p style={styles.subtitle}>
            Welcome to Hong Kong Taxi Written Test Practice App
          </p>
          
          <div style={styles.disclaimer}>
            <p style={styles.disclaimerText}>
              📋 題庫內容適用於 2025 年 2 月 3 日及以後的考試，此題庫乃用作參考用途，並無任何法律效力，運輸署駕駛事務組可據實際情況或需要，作出修改，而不另行通知。
            </p>
          </div>
          
          <div style={styles.grid}>
            <Link href="/practice" style={{ textDecoration: 'none' }}>
              <div style={styles.card}>
                <h2>開始練習 &rarr;</h2>
                <p>選擇不同類型的題目進行練習</p>
              </div>
            </Link>
            
            {/* <div style={styles.card}>
              <h2>模擬考試 &rarr;</h2>
              <p>進行完整的模擬考試</p>
            </div>
            
            <div style={styles.card}>
              <h2>學習資源 &rarr;</h2>
              <p>查看相關學習資料</p>
            </div> */}
          </div>
          
          <div style={styles.sponsorContainer}>
            <p style={styles.sponsorText}>如果這個工具對您有幫助，請考慮支持開發者</p>
            <a 
              href="https://github.com/sponsors/apophislee" 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.sponsorButton}
            >
              ❤️ GitHub Sponsors
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    padding: '4rem 0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #003f7f 0%, #001a3a 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  },
  container: {
    maxWidth: '1200px',
    width: '100%',
    padding: '0 2rem',
  },
  title: {
    margin: 0,
    lineHeight: 1.15,
    fontSize: '4rem',
    textAlign: 'center' as const,
    color: 'white',
    marginBottom: '1rem',
  },
  description: {
    textAlign: 'center' as const,
    lineHeight: 1.5,
    fontSize: '1.5rem',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '0.5rem',
  },
  subtitle: {
    textAlign: 'center' as const,
    lineHeight: 1.5,
    fontSize: '1.2rem',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '3rem',
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
    maxWidth: '800px',
    margin: '0 auto',
  },
  card: {
    margin: '1rem',
    padding: '1.5rem',
    textAlign: 'left' as const,
    color: '#003f7f',
    textDecoration: 'none',
    border: '2px solid #d12029',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    maxWidth: '300px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 63, 127, 0.1)',
  },
  disclaimer: {
    maxWidth: '800px',
    margin: '0 auto 2rem auto',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  disclaimerText: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 1.4,
    margin: 0,
    textAlign: 'center' as const,
  },
  sponsorContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '3rem',
    padding: '1rem',
  },
  sponsorText: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '1rem',
    textAlign: 'center' as const,
  },
  sponsorButton: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#fd3978',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease',
  },
};

export default Home;
