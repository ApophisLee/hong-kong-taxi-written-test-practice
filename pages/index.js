import React from 'react';
import Head from 'next/head';

export default function Home() {
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
            <div style={styles.card}>
              <h2>開始練習 &rarr;</h2>
              <p>開始你的的士筆試練習</p>
            </div>
            
            <div style={styles.card}>
              <h2>考試規則 &rarr;</h2>
              <p>了解考試規則和要求</p>
            </div>
            
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
    textAlign: 'center',
    color: 'white',
    marginBottom: '1rem',
  },
  description: {
    textAlign: 'center',
    lineHeight: 1.5,
    fontSize: '1.5rem',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '0.5rem',
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 1.5,
    fontSize: '1.2rem',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '3rem',
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '800px',
    margin: '0 auto',
  },
  card: {
    margin: '1rem',
    padding: '1.5rem',
    textAlign: 'left',
    color: 'inherit',
    textDecoration: 'none',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    transition: 'color 0.15s ease, border-color 0.15s ease',
    maxWidth: '300px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    cursor: 'pointer',
  },
};
