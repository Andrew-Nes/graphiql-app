import React from 'react';
import Image from 'next/image';
import { LINK_COURSE, COURSE_DATA } from '../../constants';

import styles from './courseSection.module.scss';
import useTranslations from '@/utils/translation';

const CourseSection: React.FC = () => {
  const dictionary = useTranslations();
  return (
    <>
      <section className={styles.course}>
        <div className={styles.course__container}>
          <div className={styles.course__info}>
            <Image
              className={styles.course__info_picture}
              src="/images/course.jpg"
              alt="Image for Course section"
              width={260}
              height={120}
            />
            <div className={styles.course__info_content}>
              <span className={styles.course__subtitle}>RS SCHOOL</span>
              <h2 className={styles.course__title}>
                {dictionary.landing.course.name}
              </h2>
              <div className={styles.course__body}>
                <p>{dictionary.landing.course.description_1}</p>
                <p>{dictionary.landing.course.description_2}</p>
                <a href={LINK_COURSE} className={styles.course__link}>
                  {dictionary.landing.course.more}
                </a>
              </div>
            </div>
          </div>
          <div className={styles.course__table}>
            {COURSE_DATA.map((course, index) => (
              <div className={styles.course__table_item} key={course.title}>
                <span>
                  {dictionary.landing.course.week} #{' '}
                  {index === COURSE_DATA.length - 1 ? '7—10' : index + 1}:
                </span>
                <span>{course.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseSection;
