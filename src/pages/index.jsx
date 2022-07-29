import Head from 'next/head';
import Featured from '../components/Featured';
import PizzaList from '../components/PizzaList';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Food Delivery App</title>
      </Head>
      <Featured />
      <PizzaList />
    </div>
  );
}
