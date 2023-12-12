import { FC } from 'react';
import Image from 'next/image';

import styles from './imageSection.module.scss';

const ImageSection: FC = () => {
  return (
    <>
      <section className={styles.image}>
        <div className={styles.image__container}>
          <Image
            className={styles.image__img}
            src="/images/course.jpg"
            alt="Image of the Playground"
            width={260}
            height={120}
          />
          <Image
            className={styles.image__img}
            src="/images/course.jpg"
            alt="Image of the Playground"
            width={260}
            height={120}
          />
        </div>
      </section>
    </>
  );
};

export default ImageSection;
