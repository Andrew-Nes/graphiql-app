import { FC } from 'react';
import Image from 'next/image';

import styles from './ImageSection.module.scss';

export const ImageSection: FC = () => {
  return (
    <section className={styles.image}>
      <div className={styles.image__container}>
        <Image
          className={styles.image__img}
          src="/images/screen-01.svg"
          alt="Image of the Playground"
          width={260}
          height={120}
        />
        <Image
          className={styles.image__img}
          src="/images/screen-02.svg"
          alt="Image of the Playground"
          width={260}
          height={120}
        />
      </div>
    </section>
  );
};
