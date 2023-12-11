import React from 'react';
import { TEAM } from '@/constants';

import styles from './teamSection.module.scss';
import { useLanguage } from '../LanguageContext/LanguageContext';
import useTranslations from '@/utils/translation';

const TeamSection: React.FC = () => {
  const { language } = useLanguage();
  const team = TEAM[language as keyof typeof TEAM];
  const dictionary = useTranslations();
  return (
    <>
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
    </>
  );
};

export default TeamSection;
