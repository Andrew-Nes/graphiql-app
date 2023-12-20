import { FC } from 'react';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';

import { routes } from '@/services/routes';
import useTranslations from '@/utils/translation';
import { auth } from '@/services/auth/firebase';

import styles from './heroSection.module.scss';

const HeroSectionLink: FC = () => {
  const [user] = useAuthState(auth);
  const IS_AUTH = user;
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
