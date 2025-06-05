import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

interface RegulationsProps {
  content: string;
}

const Regulations: NextPage<RegulationsProps> = ({ content }) => (
  <div style={styles.container}>
    <Head>
      <title>的士則例簡介 - 香港的士筆試練習</title>
    </Head>
    <article dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

export const getStaticProps: GetStaticProps<RegulationsProps> = async () => {
  const filePath = path.join(process.cwd(), 'docs', '的士則例.md');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  // @ts-ignore
  const processed = await remark().use(remarkHtml as any).process(fileContent);
  return { props: { content: processed.toString() } };
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif',
    lineHeight: 1.6,
  },
};

export default Regulations;
