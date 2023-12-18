import { FC } from 'react';
import Image from 'next/image';

import { useLanguage } from '@/hooks';
import { useTranslations } from '@/hooks/useTranslations';
import { TEAM, LINK_SCHOOL, LINK_COURSE } from '@/constants';

import styles from './Footer.module.scss';

export const Footer: FC = () => {
  const { language } = useLanguage();
  const dictionary = useTranslations();

  const team = TEAM[language as keyof typeof TEAM];

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.team}>
          <div className={styles.team__title}>
            <span>{dictionary.footer.greeting}👋👋👋</span>
            <span>{dictionary.footer.intro}</span>
          </div>
          <ul className={styles.team__items}>
            {team.map((member) => (
              <li className={styles.team__item} key={member.name}>
                <Image
                  src={member.image}
                  width={600}
                  height={750}
                  alt={`Photo of ${member.name.split(' ')[0]}`}
                  className={styles.team__item_image}
                />
                <a
                  href={member.github}
                  className={styles.team__item_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {member.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.course}>
          <div className={styles.course__column}>
            <ul className={styles.course__list}>
              <li className={styles.course__item}>
                <a
                  href={LINK_SCHOOL}
                  className={styles.course__item_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RS School
                </a>
              </li>
              <li className={styles.course__item}>
                <a
                  href={LINK_COURSE}
                  className={styles.course__item_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {dictionary.footer.course}
                </a>
                <span>(2023)</span>
              </li>
            </ul>

            <div className={styles.course__copy}>
              <span>&#169; {dictionary.footer.copyright}</span>
            </div>
          </div>

          <div className={styles.course__column}>
            <a
              href={LINK_SCHOOL}
              className={styles.course__logo_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/rs-logo-white.svg"
                alt="RS School logo"
                width={185}
                height={20}
                className={styles.course__logo_image}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
