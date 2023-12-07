import React from 'react';
import Layout from '@/Components/Layout/Layout';
import styles from '@/styles/NotFounnd.module.scss';
import { useRouter } from 'next/router';

const NotFound: React.FC = () => {
  const router = useRouter();
  return (
    <Layout>
      <main>
        <section className={`${styles.notFound__content}`}>
          <h2 className={`${styles.notFound__text}`}>Oooops...</h2>
          <h2 className={`${styles.notFound__text}`}>
            Something went wrong!🙃☹🙄️
          </h2>
          <button
            className={`${styles.notFound__button}`}
            onClick={() => router.push('/')}
          >
            Back to home
          </button>
        </section>
      </main>
    </Layout>
  );
};

export default NotFound;
