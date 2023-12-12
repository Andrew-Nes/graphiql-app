import Link from 'next/link';
import React from 'react';

import { routes } from '../services/routes';

import RegisterForm from '@/Components/Forms/RegisterForm';
import useTranslations from '@/utils/translation';

import styles from '../styles/RegisterPage.module.scss';

const RegisterPage: React.FC = () => {
  const dictionary = useTranslations();

  return (
    <>
      <RegisterForm />
      <p className={styles.registerInfo}>
        {dictionary.forms.options.login}{' '}
        <Link href={routes.LOGIN} className={styles.loginLink}>
          {dictionary.forms.buttons.login}
        </Link>
      </p>
    </>
  );
};

export default RegisterPage;
