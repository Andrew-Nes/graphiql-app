import { FC, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import PasswordStrengthBar from 'react-password-strength-bar';

import { RegisterFormType, registerSchema } from '@/utils/registerValidate';

import StyledInput from '@/Components/StyledInput';

import styles from './RegisterForm.module.scss';

const RegisterForm: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitted },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(registerSchema),
    mode: 'all',
  });
  const [password, setPassword] = useState<string>();

  useEffect(() => {
    const subscription = watch((value) => {
      setPassword(value.password);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<RegisterFormType> = (data) => {
    console.log(data);
  };
  return (
    <form
      className={styles.formContainer}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className={styles.titleGroup}>
        <h1 className={styles.formTitle}>Register 🤓</h1>

        <p className={styles.formInfo}>
          Please, create account to use GraphiQL Playground.
        </p>
      </div>

      <StyledInput
        inputError={errors.name}
        inputName="name"
        type="text"
        placeholder="Name"
        {...register('name')}
      />

      <StyledInput
        inputError={errors.email}
        inputName="email"
        type="email"
        placeholder="Email"
        {...register('email')}
      />

      <StyledInput
        inputError={errors.password}
        inputName="password"
        type="password"
        placeholder="Password"
        {...register('password')}
      />

      <PasswordStrengthBar
        password={password}
        scoreWords={[]}
        shortScoreWord={''}
      />
      <button
        className={styles.submitButton}
        type="submit"
        disabled={!isValid || isSubmitted}
      >
        CREATE ACCOUNT
      </button>
    </form>
  );
};

export default RegisterForm;
