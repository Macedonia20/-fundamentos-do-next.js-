import { GetStaticProps } from 'next';
import Head from 'next/head';

import { stripe } from '../services/stripe';
import { SubscribeButton } from '../components/SubscribeButton';

import styles from './home.module.scss';

// No react no next é bom lembrar que temos 3 formas de fazer uma chamada api
// Client-side
// Serve-side
// Static Site

interface HomeProps {
  product: {
    priceId: string;
    amount:  number;
  }
}


export default function Home({ product }: HomeProps) {
  return (
  <>
    <Head>
      <title>inicio | ig.news</title>
    </Head>

    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span> 👏  Hey, welcome</span>
        <h1>News about the <span>React</span>world.</h1>
        <p>
          Get access to all the publications <br />
          <span>for {product.amount} month</span>
        </p>
        <SubscribeButton priceId={product.priceId} />
      </section>

      <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
      </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KCY1JBwF8IqjtEn26TNifW2')

  const product = {
    priceId: price.id,
   amount: new Intl.NumberFormat('en-US', {
     style: 'currency',
     currency: 'USD', 

   }).format(price.unit_amount / 100),
  };


  return {
       props: {
       product,
     }, 
     revalidate: 60 * 60 * 24, //24 hours
  }
}
  
