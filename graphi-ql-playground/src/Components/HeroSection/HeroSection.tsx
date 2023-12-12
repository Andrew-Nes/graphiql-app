import { FC } from 'react';

import useTranslations from '@/utils/translation';

import HeroSectionLink from '@/Components/HeroSection/HeroSectionLink';

import styles from './heroSection.module.scss';

const HeroSection: FC = () => {
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
              <HeroSectionLink />
            </div>
            <div className={styles.hero__info_image}></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
