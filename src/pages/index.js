import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Featured from '../components/Featured';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Food Delivery App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
    </div>
  );
}
