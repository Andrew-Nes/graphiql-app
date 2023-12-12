import React from 'react';
import Link from 'next/link';

import { routes } from '@/services/routes';
import useTranslations from '@/utils/translation';

import styles from './heroSection.module.scss';

const IS_AUTH = false;

const HeroSection: React.FC = () => {
  const dictionary = useTranslations();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.hero__container}>
          <div className={styles.hero__title}>
            <h2 className={styles.hero__title_text}>
              {dictionary.landing.heading}{' '}
              <a href="" className={styles.hero__title_link}>
                The Rick and Morty API
              </a>
            </h2>
          </div>
          <div className={styles.hero__info}>
            <div className={styles.hero__info_text}>
              <p>{dictionary.landing.intro}</p>
              {IS_AUTH ? (
                <Link
                  href={routes.PRODUCT}
                  className={styles.hero__info_button}
                >
                  {dictionary.landing.playground}
                </Link>
              ) : (
                <Link href={routes.LOGIN} className={styles.hero__info_button}>
                  {dictionary.landing.login}
                </Link>
              )}
            </div>
            <div className={styles.hero__info_image}></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
