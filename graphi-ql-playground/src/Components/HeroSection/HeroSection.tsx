import React from 'react';
import Link from 'next/link';
import { routes } from '@/services/routes';

import styles from './heroSection.module.scss';

const IS_AUTH = false;

const HeroSection: React.FC = () => {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.hero__container}>
          <div className={styles.hero__title}>
            <h2 className={styles.hero__title_text}>
              Hey there, welcome to the GraphiQL Playground! This is the go-to
              IDE for making GraphQL requests to{' '}
              <a href="" className={styles.hero__title_link}>
                The Rick and Morty API
              </a>
            </h2>
          </div>
          <div className={styles.hero__info}>
            <div className={styles.hero__info_text}>
              <p>
                Check out an extensive collection of characters, images,
                locations, and episodes - you will have access to all the good
                stuff from The Rick and Morty TV show!
              </p>
              {IS_AUTH ? (
                <Link
                  href={routes.PRODUCT}
                  className={styles.hero__info_button}
                >
                  Try Playground
                </Link>
              ) : (
                <Link href={routes.LOGIN} className={styles.hero__info_button}>
                  Please, Log in
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
