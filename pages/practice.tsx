import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { PracticeOption } from '../types';
import locationQuestions from '../data/location-questions.json';
import routeQuestions from '../data/route-questions.json';
import operationQuestions from '../data/operation-questions.json';
import roadUserQuestions from '../data/road-user-questions.json';

// Extract unique question types from location data
const locationTypes: string[] = Array.from(
  new Set(locationQuestions.map((q) => q.type))
);

const practiceOptions: PracticeOption[] = [
  {
    title: "載客服務知識練習",
    description: "溫習的士與網約車營運、安全、顧客服務及牌證要求（四選一）",
    href: "/location-practice?category=operation",
    icon: "🚕",
    questions: operationQuestions.length,
    format: "四選一"
  },
  {
    title: "地方試題練習",
    description: "練習官方小冊子所列的香港地方、建築物和地標（四選一）",
    href: "/location-practice?category=location",
    icon: "📍",
    questions: locationQuestions.length,
    format: "四選一"
  },
  {
    title: "路線試題練習",
    description: "練習官方小冊子所列的最直接可行路線（三選一）",
    href: "/location-practice?category=route",
    icon: "🛣️",
    questions: routeQuestions.length,
    format: "三選一"
  },
  {
    title: "道路使用者守則練習",
    description: "練習運輸署已公開的道路交通規例及安全駕駛示例題（三選一）",
    href: "/location-practice?category=road-user",
    icon: "🚦",
    questions: roadUserQuestions.length,
    format: "三選一"
  }
];

export default function Practice() {
  return (
    <div>
      <Head>
        <title>選擇練習類型 - 的士及網約車綜合筆試練習</title>
        <meta name="description" content="選擇的士及網約車綜合筆試四類練習題" />
      </Head>
      
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.header}>
            <Link href="/" style={styles.backButton}>← 返回首頁</Link>
          </div>

          <h1 style={styles.title}>選擇練習類型</h1>
          <p style={styles.subtitle}>Choose Your Practice Type</p>

          <div style={styles.disclaimer}>
            <p style={styles.disclaimerText}>
              📋 已按 2026 年 8 月 3 日起生效的運輸署教材更新。營運知識題為依教材編寫的練習題，道路使用者守則目前只收錄官方公開示例；本網站並非運輸署官方服務。
            </p>
          </div>

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
                      <span style={styles.metaItem}>🔢 {option.format}</span>
                    </div>
                  </div>
                ) : (
                  <div style={{...styles.card, ...styles.activeCard}}>
                    <div style={styles.cardHeader}>
                      <span style={styles.icon}>{option.icon}</span>
                      <span style={styles.availableBadge}>可使用</span>
                    </div>
                    <h3 style={styles.cardTitle}>{option.title}</h3>
                    <p style={styles.cardDescription}>{option.description}</p>
                    <div style={styles.cardMeta}>
                      <span style={styles.metaItem}>📊 {option.questions} 題</span>
                      <span style={styles.metaItem}>🔢 {option.format}</span>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
                      <Link href={`${option.href}&random=false`} style={{ textDecoration: 'none' }}>
                        <div style={styles.startButton}>順序練習</div>
                      </Link>
                      <Link href={`${option.href}&random=true`} style={{ textDecoration: 'none' }}>
                        <div style={{...styles.startButton, backgroundColor: '#FF5722'}}>隨機練習</div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div> {/* end of styles.grid */}

          {/* 地方題類型練習選擇區 */}
          <div style={styles.typeSection}>
            <h2 style={styles.typeTitle}>依地方類型練習</h2>
            <div style={styles.grid}>
              {locationTypes.map((type, i) => {
                const count = locationQuestions.filter(q => q.type === type).length;
                return (
                  <div key={i} style={styles.cardWrapper}>
                    <div style={{...styles.card, ...styles.activeCard}}>
                      <h3 style={styles.cardTitle}>{type}</h3>
                      <div style={styles.cardMeta}>
                        <span style={styles.metaItem}>📊 {count} 題</span>
                      </div>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
                        <Link href={`/location-practice?category=location&type=${encodeURIComponent(type)}&random=false`} style={{ textDecoration: 'none' }}>
                          <div style={styles.startButton}>順序練習</div>
                        </Link>
                        <Link href={`/location-practice?category=location&type=${encodeURIComponent(type)}&random=true`} style={{ textDecoration: 'none' }}>
                          <div style={{...styles.startButton, backgroundColor: '#FF5722'}}>隨機練習</div>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={styles.tipsSection}>
            <h2 style={styles.tipsTitle}>練習建議 💡</h2>
            <div style={styles.tipsList}>
              <div style={styles.tip}>
                <span style={styles.tipNumber}>1</span>
                <span style={styles.tipText}>甲部共 30 題：載客服務知識 20 題、地方 9 題、路線 1 題</span>
              </div>
              <div style={styles.tip}>
                <span style={styles.tipNumber}>2</span>
                <span style={styles.tipText}>乙部共 35 題，考核道路交通規例及安全駕駛知識</span>
              </div>
              <div style={styles.tip}>
                <span style={styles.tipNumber}>3</span>
                <span style={styles.tipText}>載客服務及地方題為四選一；路線及道路使用者守則為三選一</span>
              </div>
              <div style={styles.tip}>
                <span style={styles.tipNumber}>4</span>
                <span style={styles.tipText}>正式考試須甲部達 25/30、乙部達 30/35，兩部均須及格</span>
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
    background: 'linear-gradient(135deg, #003f7f 0%, #001a3a 100%)',
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
    display: 'inline-block',
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    textDecoration: 'none',
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
  typeSection: {
    marginBottom: '3rem',
  },
  typeTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1.5rem',
    textAlign: 'center' as const,
  },
};
