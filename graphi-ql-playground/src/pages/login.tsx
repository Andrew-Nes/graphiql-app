import React from 'react';
import Link from 'next/link';

import { routes } from '@/services/routes';

import LoginForm from '@/Components/Forms/LoginForm';

import styles from '../styles/LoginPage.module.scss';

const LoginPage: React.FC = () => {
  return (
    <>
      <LoginForm />
      <p className={styles.registerInfo}>
        Don’t have an account?{' '}
        <Link href={routes.REGISTER} className={styles.loginLink}>
          Register.
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
