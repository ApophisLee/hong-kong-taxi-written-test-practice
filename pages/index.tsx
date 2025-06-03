import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import { CSSProperties } from 'react';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hong Kong Taxi Written Test Practice</title>
        <meta name="description" content="Practice app for Hong Kong taxi written test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>
            Hello World! 🚕
          </h1>
          <p style={styles.description}>
            歡迎來到香港的士筆試練習應用程式
          </p>
          <p style={styles.subtitle}>
            Welcome to Hong Kong Taxi Written Test Practice App
          </p>
          
          <div style={styles.grid}>
            <Link href="/practice" style={{ textDecoration: 'none' }}>
              <div style={styles.card}>
                <h2>開始練習 &rarr;</h2>
                <p>選擇不同類型的題目進行練習</p>
              </div>
            </Link>
            
            <Link href="/location-practice" style={{ textDecoration: 'none' }}>
              <div style={styles.card}>
                <h2>地點試題 &rarr;</h2>
                <p>練習香港地點和建築物題目</p>
              </div>
            </Link>
            
            <Link href="/route-practice" style={{ textDecoration: 'none' }}>
              <div style={styles.card}>
                <h2>路線試題 &rarr;</h2>
                <p>練習香港道路和行車路線題目</p>
              </div>
            </Link>
            
            <div style={styles.card}>
              <h2>模擬考試 &rarr;</h2>
              <p>進行完整的模擬考試</p>
            </div>
            
            <div style={styles.card}>
              <h2>學習資源 &rarr;</h2>
              <p>查看相關學習資料</p>
            </div>
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
};

export default Home;
