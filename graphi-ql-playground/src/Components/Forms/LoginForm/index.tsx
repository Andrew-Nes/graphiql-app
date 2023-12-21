import { FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FirebaseError } from 'firebase/app';

import { logInWithEmailAndPassword } from '@/services/auth/firebase';
import { LoginFormType, loginSchema } from '@/utils/loginSchema';
import { useTranslations, useLanguage } from '@/hooks';
import { ERROR_MESSAGES, ERROR_MESSAGES_RU } from '@/constants/errorMessages';

import { Button } from '@/Components/Button';
import { StyledInput } from '@/Components/StyledInput';

import styles from '../Form.module.scss';

export const LoginForm: FC = () => {
  const { language } = useLanguage();
  const dictionary = useTranslations();
  const [authError, setAuthError] = useState<string>('');
  const schema =
    language === 'en'
      ? loginSchema(ERROR_MESSAGES)
      : loginSchema(ERROR_MESSAGES_RU);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'all', resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<LoginFormType> = async ({
    email,
    password,
  }) => {
    try {
      setAuthError('');
      await logInWithEmailAndPassword(email, password);
    } catch (err) {
      const errorResponse = JSON.parse(JSON.stringify(err)) as FirebaseError;

      if (errorResponse.code === 'auth/invalid-credential') {
        setAuthError(dictionary.forms.errors.login);
      } else {
        setAuthError(dictionary.forms.errors.auth);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form__header}>
        <h1 className={styles.form__title}>
          {dictionary.forms.title.login} 👋
        </h1>
        <p className={styles.form__subtitle}>
          {dictionary.forms.subtitle.login}
        </p>
      </div>

      <div className={styles.form__inputs}>
        <StyledInput
          inputError={errors.email}
          type="email"
          inputName="email"
          placeholder={dictionary.forms.fields.email}
          {...register('email')}
        />

        <StyledInput
          inputError={errors.password}
          type="password"
          inputName="password"
          placeholder={dictionary.forms.fields.pass}
          {...register('password')}
        />
      </div>

      <Button
        name={dictionary.forms.buttons.login}
        type="submit"
        className={styles.form__button}
        disabled={!isValid}
      />

      {authError && <span className={styles.form__error}>{authError}</span>}
    </form>
  );
};
