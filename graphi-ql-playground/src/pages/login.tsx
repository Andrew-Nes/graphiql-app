import { FC, useEffect } from 'react';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import router from 'next/router';

import { routes } from '@/services/routes';
import { auth } from '@/services/auth/firebase';
import useTranslations from '@/utils/translation';

import LoginForm from '@/Components/Forms/LoginForm';

import styles from '../styles/LoginPage.module.scss';

const LoginPage: FC = () => {
  const dictionary = useTranslations();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) router.push(routes.PRODUCT);
  }, [user]);

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
