import { FC, useEffect } from 'react';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import router from 'next/router';

import { routes } from '@/types';
import { auth } from '@/services/auth/firebase';
import { useTranslations } from '@/hooks';

import { LoginForm } from '@/Components/Forms/LoginForm';

import styles from '../styles/LoginPage.module.scss';

const LoginPage: FC = () => {
  const dictionary = useTranslations();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) router.push(routes.PRODUCT);
  }, [user]);

  return (
    <div className={styles.login}>
      <LoginForm />

      <p className={styles.login__footer}>
        {dictionary.forms.options.register}{' '}
        <Link href={routes.REGISTER} className={styles.login__link}>
          {dictionary.forms.buttons.register}
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
