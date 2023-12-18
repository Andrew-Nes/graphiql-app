import { FC } from 'react';

import { useLanguage, useTranslations } from '@/hooks';
import { TEAM } from '@/constants';

import styles from './TeamSection.module.scss';

export const TeamSection: FC = () => {
  const { language } = useLanguage();
  const dictionary = useTranslations();

  const team = TEAM[language as keyof typeof TEAM];

  return (
    <section className={styles.team}>
      <div className={styles.team__container}>
        <span className={styles.team__title}>{dictionary.landing.team}</span>
        <ul className={styles.team__items}>
          {team.map((person) => (
            <li className={styles.team__item} key={person.github}>
              <p className={styles.team__description}>{person.description}</p>
              <div className={styles.team__item_footer}>
                <a
                  href={person.github}
                  className={styles.team__name}
                  title="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {person.name}
                </a>
                <span className={styles.team__position}>
                  {person.position.toUpperCase()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
