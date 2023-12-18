import { FC } from 'react';
import { useRouter } from 'next/router';

import { routes } from '@/services/routes';
import { useTranslations } from '@/utils/translation';

import { Button } from '@/Components/Button';

import styles from '@/styles/NotFound.module.scss';

const NotFound: FC = () => {
  const router = useRouter();
  const dictionary = useTranslations();

  return (
    <section className={styles.notFound}>
      <span className={styles.notFound__text}>🙃🙄️😢</span>
      <h2 className={styles.notFound__text}>{dictionary.notFound.text}</h2>

      <Button
        name={dictionary.notFound.button}
        className={styles.notFound__button}
        onClick={() => router.push(routes.MAIN)}
      />
    </section>
  );
};

export default NotFound;
