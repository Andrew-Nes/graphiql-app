import React from 'react';
import Link from 'next/link';

import { routes } from '@/services/routes';

import LoginForm from '@/Components/Forms/LoginForm';

import styles from '../styles/LoginPage.module.scss';
import useTranslations from '@/utils/translation';

const LoginPage: React.FC = () => {
  const dictionary = useTranslations();
  return (
    <>
      <LoginForm />
      <p className={styles.registerInfo}>
        {dictionary.forms.options.register}{' '}
        <Link href={routes.REGISTER} className={styles.loginLink}>
          {dictionary.forms.buttons.register}
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
