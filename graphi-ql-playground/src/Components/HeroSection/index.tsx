import { FC } from 'react';
import Link from 'next/link';
import { auth } from '@/services/auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { routes } from '@/services/routes';
import useTranslations from '@/utils/translation';

import styles from './HeroSection.module.scss';

export const HeroSection: FC = () => {
  const dictionary = useTranslations();
  const [user] = useAuthState(auth);

  const linkHref = user ? routes.PRODUCT : routes.LOGIN;
  const linkName = user
    ? dictionary.landing.playground
    : dictionary.landing.login;

  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        <div className={styles.hero__title}>
          <h2 className={styles.hero__title_text}>
            {dictionary.landing.heading}{' '}
            <a
              href=""
              className={styles.hero__title_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              The Rick and Morty API
            </a>
          </h2>
        </div>
        <div className={styles.hero__info}>
          <div className={styles.hero__info_text}>
            <p>{dictionary.landing.intro}</p>
            <Link href={linkHref} className={styles.hero__info_button}>
              {linkName}
            </Link>
          </div>
          <div className={styles.hero__info_image}></div>
        </div>
      </div>
    </section>
  );
};
