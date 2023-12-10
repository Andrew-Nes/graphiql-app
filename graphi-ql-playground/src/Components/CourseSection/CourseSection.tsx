import React from 'react';
import Image from 'next/image';
import { LINK_COURSE, COURSE_DATA } from '../../constants';

import styles from './courseSection.module.scss';

const CourseSection: React.FC = () => {
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
              <h2 className={styles.course__title}>React Course</h2>
              <div className={styles.course__body}>
                <p>
                  This course is perfect for students with experience in
                  JavaScript, TypeScript, Git, GitHub, NPM, Webpack, CSS3, HTML5
                  and an understanding of interacting with APIs.
                </p>
                <p>
                  The course runs for a <b>total of 10 weeks,</b> with 6 weeks
                  dedicated to studying React and an additional{' '}
                  <b>4 weeks for the final task</b> implementation.
                </p>
                <a href={LINK_COURSE} className={styles.course__link}>
                  Learn more
                </a>
              </div>
            </div>
          </div>
          <div className={styles.course__table}>
            {COURSE_DATA.map((course, index) => (
              <div className={styles.course__table_item} key={course.title}>
                <span>
                  Week #{index === COURSE_DATA.length - 1 ? '7—10' : index + 1}:
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