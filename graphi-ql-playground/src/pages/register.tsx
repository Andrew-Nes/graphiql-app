import Link from 'next/link';
import { FC, useEffect } from 'react';
import router from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/services/auth/firebase';
import { routes } from '@/types';
import { useTranslations } from '@/hooks';

import { RegisterForm } from '@/Components/Forms/RegisterForm';

import styles from '../styles/RegisterPage.module.scss';

const RegisterPage: FC = () => {
  const dictionary = useTranslations();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) router.push(routes.PRODUCT);
  }, [user]);

  return (
    <div className={styles.register}>
      <RegisterForm />

      <p className={styles.register__footer}>
        {dictionary.forms.options.login}{' '}
        <Link href={routes.LOGIN} className={styles.register__link}>
          {dictionary.forms.buttons.login}
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
