import Link from 'next/link';
import { FC, useEffect } from 'react';
import router from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/services/auth/firebase';
import { routes } from '@/services/routes';
import useTranslations from '@/utils/translation';

import RegisterForm from '@/Components/Forms/RegisterForm';

import styles from '../styles/RegisterPage.module.scss';

const RegisterPage: FC = () => {
  const dictionary = useTranslations();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) router.push(routes.PRODUCT);
  }, [user]);

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
