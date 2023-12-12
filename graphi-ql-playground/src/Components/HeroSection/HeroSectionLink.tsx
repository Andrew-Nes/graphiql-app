import { FC } from 'react';
import Link from 'next/link';

import { routes } from '@/services/routes';
import useTranslations from '@/utils/translation';

import styles from './heroSection.module.scss';

const IS_AUTH = false;

const HeroSectionLink: FC = () => {
  const dictionary = useTranslations();
  const linkHref = IS_AUTH ? routes.PRODUCT : routes.LOGIN;

  const linkText = IS_AUTH
    ? dictionary.landing.playground
    : dictionary.landing.login;

  return (
    <Link href={linkHref} className={styles.hero__info_button}>
      {linkText}
    </Link>
  );
};

export default HeroSectionLink;
