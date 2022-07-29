import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Featured from '../components/Featured';
import PizzaList from '../components/PizzaList';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Food Delivery App</title>
      </Head>
      <Featured />
      <PizzaList />
    </div>
  );
}
