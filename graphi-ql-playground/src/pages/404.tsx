import { FC, useCallback } from 'react';
import { useRouter } from 'next/router';

import { routes } from '@/types';
import { useTranslations } from '@/hooks';

import { Button } from '@/Components/Button';

import styles from '@/styles/NotFound.module.scss';

const NotFound: FC = () => {
  const router = useRouter();
  const dictionary = useTranslations();

  const handleRedirect = useCallback(() => router.push(routes.MAIN), [router]);

  return (
    <section className={styles.notFound}>
      <span className={styles.notFound__text}>🙃🙄️😢</span>
      <h2 className={styles.notFound__text}>{dictionary.notFound.text}</h2>

      <Button
        name={dictionary.notFound.button}
        className={styles.notFound__button}
        onClick={handleRedirect}
      />
    </section>
  );
};

export default NotFound;
