import Link from 'next/link';
import React from 'react';

import RegisterForm from '@/Components/Forms/RegisterForm';

import styles from '../styles/RegisterPage.module.scss';

const RegisterPage: React.FC = () => {
  return (
    <>
      <RegisterForm />
      <p className={styles.registerInfo}>
        Already have an account?{' '}
        <Link href="/login" className={styles.loginLink}>
          Log in.
        </Link>
      </p>
    </>
  );
};

export default RegisterPage;
