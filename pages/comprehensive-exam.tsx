import Head from 'next/head';
import Link from 'next/link';

export default function ComprehensiveExamUnavailable() {
  return (
    <main style={styles.main}>
      <Head>
        <title>完整模擬試暫未開放 - 的士及網約車綜合筆試練習</title>
        <meta
          name="description"
          content="題庫未足以忠實組成 2026 年的士及網約車綜合筆試，完整模擬試暫未開放"
        />
      </Head>
      <section style={styles.card}>
        <h1 style={styles.title}>完整模擬試暫未開放</h1>
        <p style={styles.text}>
          正式考試限時 45 分鐘，甲部須完成 20 題載客服務知識、9 題地方及 1 題路線；
          乙部須完成 35 題道路使用者守則。現時運輸署只公開 4 條乙部模擬題，
          題庫不足以組成不重複且可信的完整模擬試。
        </p>
        <p style={styles.notice}>
          因此本頁不會重複抽題或沿用舊制題目冒充正式模擬試。你仍可使用四類獨立練習。
        </p>
        <Link href="/practice" style={styles.primaryLink}>
          前往分類練習
        </Link>
        <Link href="/" style={styles.secondaryLink}>
          返回首頁
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
    maxWidth: '760px',
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
  },
  notice: {
    color: '#7a3e00',
    lineHeight: 1.7,
    backgroundColor: '#fff3e0',
    borderRadius: '8px',
    padding: '1rem',
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
