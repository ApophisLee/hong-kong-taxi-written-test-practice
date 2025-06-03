import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import { CSSProperties } from 'react';
import { PracticeOption } from '../types';

const practiceOptions: PracticeOption[] = [
  {
    title: "地點試題練習",
    description: "練習香港各區地點、建築物和地標相關題目",
    href: "/location-practice",
    icon: "📍",
    questions: 10,
    difficulty: "中等"
  },
  {
    title: "路線試題練習",
    description: "練習香港道路、隧道和行車路線題目",
    href: "/route-practice",
    icon: "🛣️",
    questions: 12,
    difficulty: "困難"
  },
  {
    title: "交通規則練習",
    description: "練習交通燈號、道路標誌和駕駛規則",
    href: "/traffic-practice",
    icon: "🚦",
    questions: 8,
    difficulty: "容易"
  },
  {
    title: "綜合模擬考試",
    description: "包含所有類型題目的完整模擬考試",
    href: "/comprehensive-exam",
    icon: "📝",
    questions: 15,
    difficulty: "綜合"
  }
];

export default function Practice() {
  return (
    <div>
      <Head>
        <title>選擇練習類型 - 香港的士筆試練習</title>
        <meta name="description" content="選擇不同類型的香港的士筆試練習" />
      </Head>
      
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.header}>
            <Link href="/">
              <button style={styles.backButton}>← 返回首頁</button>
            </Link>
          </div>

          <h1 style={styles.title}>選擇練習類型</h1>
          <p style={styles.subtitle}>Choose Your Practice Type</p>

          <div style={styles.grid}>
            {practiceOptions.map((option, index) => (
              <div key={index} style={styles.cardWrapper}>
                {option.comingSoon ? (
                  <div style={{...styles.card, ...styles.comingSoonCard}}>
                    <div style={styles.cardHeader}>
                      <span style={styles.icon}>{option.icon}</span>
                      <span style={styles.comingSoonBadge}>即將推出</span>
                    </div>
                    <h3 style={styles.cardTitle}>{option.title}</h3>
                    <p style={styles.cardDescription}>{option.description}</p>
                    <div style={styles.cardMeta}>
                      <span style={styles.metaItem}>📊 {option.questions} 題</span>
                      <span style={styles.metaItem}>⭐ {option.difficulty}</span>
                    </div>
                  </div>
                ) : (
                  <Link href={option.href} style={{ textDecoration: 'none' }}>
                    <div style={{...styles.card, ...styles.activeCard}}>
                      <div style={styles.cardHeader}>
                        <span style={styles.icon}>{option.icon}</span>
                        <span style={styles.availableBadge}>可使用</span>
                      </div>
                      <h3 style={styles.cardTitle}>{option.title}</h3>
                      <p style={styles.cardDescription}>{option.description}</p>
                      <div style={styles.cardMeta}>
                        <span style={styles.metaItem}>📊 {option.questions} 題</span>
                        <span style={styles.metaItem}>⭐ {option.difficulty}</span>
                      </div>
                      <div style={styles.startButton}>
                        開始練習 →
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div style={styles.tipsSection}>
            <h2 style={styles.tipsTitle}>練習建議 💡</h2>
            <div style={styles.tipsList}>
              <div style={styles.tip}>
                <span style={styles.tipNumber}>1</span>
                <span style={styles.tipText}>建議先從地點練習開始，熟悉香港各區域</span>
              </div>
              <div style={styles.tip}>
                <span style={styles.tipNumber}>2</span>
                <span style={styles.tipText}>路線練習較為困難，需要對香港道路有一定了解</span>
              </div>
              <div style={styles.tip}>
                <span style={styles.tipNumber}>3</span>
                <span style={styles.tipText}>每次練習後記得檢視錯誤答案的解釋</span>
              </div>
              <div style={styles.tip}>
                <span style={styles.tipNumber}>4</span>
                <span style={styles.tipText}>建議達到 70% 或以上的正確率才進行考試</span>
              </div>
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
    padding: '2rem 0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  header: {
    marginBottom: '2rem',
  },
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  title: {
    textAlign: 'center' as const,
    color: 'white',
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  subtitle: {
    textAlign: 'center' as const,
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1.2rem',
    marginBottom: '3rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  cardWrapper: {
    display: 'flex',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    width: '100%',
    position: 'relative' as const,
  },
  activeCard: {
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    }
  },
  comingSoonCard: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  icon: {
    fontSize: '2rem',
  },
  availableBadge: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '15px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  comingSoonBadge: {
    backgroundColor: '#FF9800',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '15px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem',
  },
  cardDescription: {
    fontSize: '1rem',
    color: '#666',
    lineHeight: '1.5',
    marginBottom: '1.5rem',
  },
  cardMeta: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  metaItem: {
    fontSize: '0.9rem',
    color: '#888',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  startButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    textAlign: 'center' as const,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  tipsSection: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  tipsTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1.5rem',
    textAlign: 'center' as const,
  },
  tipsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  tip: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  tipNumber: {
    backgroundColor: '#2196F3',
    color: 'white',
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  tipText: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.5',
  },
};
