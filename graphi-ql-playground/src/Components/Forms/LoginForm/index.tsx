import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { LoginFormType, loginSchema } from '@/utils/loginValidate';
import { routes } from '@/services/routes';

import StyledInput from '@/Components/StyledInput';

import styles from './LoginForm.module.scss';

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm({ mode: 'all', resolver: yupResolver(loginSchema) });
  const router = useRouter();
  const onSubmit: SubmitHandler<LoginFormType> = () => {
    router.push(routes.PRODUCT);
  };
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.titleGroup}>
        <h1 className={styles.formTitle}>Log In 👋</h1>
        <p className={styles.formInfo}>
          Please, log in to use GraphiQL Playground.
        </p>
      </div>

      <StyledInput
        inputError={errors.email}
        type="email"
        inputName="email"
        placeholder="Email"
        {...register('email')}
      />
      <StyledInput
        inputError={errors.password}
        type="password"
        inputName="password"
        placeholder="Password"
        {...register('password')}
      />

      <button
        className={styles.submitButton}
        type="submit"
        disabled={!isValid || isSubmitted}
      >
        LOG IN
      </button>
    </form>
  );
};

export default LoginForm;
