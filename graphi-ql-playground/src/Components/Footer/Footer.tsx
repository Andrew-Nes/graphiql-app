import { ReactElement } from 'react';
import Image from 'next/image';
import { TEAM, LINK_SCHOOL, LINK_COURSE } from '../../constants';

import styles from './footer.module.scss';

function Footer(): ReactElement {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.team}>
          <div className={styles.team__title}>
            <span>Hi👋👋👋</span>
            <span>Welcome the team:</span>
          </div>
          <ul className={styles.team__items}>
            {TEAM.map((member) => (
              <li className={styles.team__item} key={member.name}>
                <Image
                  src={member.image}
                  width={600}
                  height={750}
                  alt={`Photo of ${member.name.split(' ')[0]}`}
                  className={styles.team__item_image}
                />
                <a href={member.github} className={styles.team__item_link}>
                  {member.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.course}>
          <ul className={styles.course__items}>
            <li className={styles.course__item}>
              <a href={LINK_SCHOOL} className={styles.course__item_link}>
                RS School
              </a>
            </li>
            <li className={styles.course__item}>
              <a href={LINK_COURSE} className={styles.course__item_link}>
                React Course
              </a>
              <span>(2023)</span>
            </li>
          </ul>

          <span>(c) All rights are very much reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
