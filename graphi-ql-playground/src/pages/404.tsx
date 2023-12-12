import React from 'react';
import { useRouter } from 'next/router';

import { routes } from '@/services/routes';

import styles from '@/styles/NotFounnd.module.scss';

const NotFound: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <section className={`${styles.notFound__content}`}>
        <h2 className={`${styles.notFound__text}`}>Oooops...</h2>
        <h2 className={`${styles.notFound__text}`}>
          Something went wrong!🙃☹🙄️
        </h2>
        <button
          className={`${styles.notFound__button}`}
          onClick={() => router.push(routes.MAIN)}
        >
          Back to home
        </button>
      </section>
    </>
  );
};

export default NotFound;
