import Head from 'next/head';
import Link from 'next/link';

export default function TrafficPracticeRedirect() {
  return (
    <main style={styles.main}>
      <Head>
        <title>道路使用者守則練習 - 的士及網約車綜合筆試練習</title>
        <meta
          name="description"
          content="前往最新的道路使用者守則官方模擬題練習"
        />
      </Head>
      <section style={styles.card}>
        <h1 style={styles.title}>道路使用者守則練習已更新</h1>
        <p style={styles.text}>
          舊交通規則題頁已停止使用，避免把未核實的舊題誤作 2026 年綜合筆試內容。
          新題庫現收錄運輸署指引公開的 4 條官方模擬題。
        </p>
        <Link
          href="/location-practice?category=road-user&random=false"
          style={styles.primaryLink}
        >
          前往道路使用者守則練習
        </Link>
        <Link href="/practice" style={styles.secondaryLink}>
          返回練習選擇
        </Link>
      </section>
    </main>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    padding: '2rem',
    background: 'linear-gradient(135deg, #003f7f 0%, #001a3a 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  } as const,
  card: {
    width: '100%',
    maxWidth: '680px',
    padding: '2rem',
    borderRadius: '15px',
    background: 'rgba(255, 255, 255, 0.96)',
    textAlign: 'center' as const,
  },
  title: {
    color: '#003f7f',
    marginTop: 0,
  },
  text: {
    color: '#444',
    lineHeight: 1.7,
    marginBottom: '2rem',
  },
  primaryLink: {
    display: 'inline-block',
    padding: '0.8rem 1.2rem',
    borderRadius: '8px',
    backgroundColor: '#003f7f',
    color: 'white',
    margin: '0.4rem',
  },
  secondaryLink: {
    display: 'inline-block',
    padding: '0.8rem 1.2rem',
    borderRadius: '8px',
    backgroundColor: '#666',
    color: 'white',
    margin: '0.4rem',
  },
};
