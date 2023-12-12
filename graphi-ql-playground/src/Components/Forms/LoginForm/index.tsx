import { FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FirebaseError } from 'firebase/app';

import { logInWithEmailAndPassword } from '@/services/auth/firebase';
import { LoginFormType, loginSchema } from '@/utils/loginValidate';
import useTranslations from '@/utils/translation';
import { useLanguage } from '@/Components/LanguageContext/LanguageContext';
import { ERROR_MESSAGES, ERROR_MESSAGES_RU } from '@/constants/errorMessages';

import StyledInput from '@/Components/StyledInput';

import styles from './LoginForm.module.scss';

const LoginForm: FC = () => {
  const { language } = useLanguage();
  const dictionary = useTranslations();
  const [authError, setAuthError] = useState<string>();
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
      }
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.titleGroup}>
        <h1 className={styles.formTitle}>
          {dictionary.forms.headings.login} 👋
        </h1>
        <p className={styles.formInfo}>{dictionary.forms.intro.login}</p>
      </div>

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

      <button className={styles.submitButton} type="submit" disabled={!isValid}>
        {dictionary.forms.buttons.login}
      </button>

      {authError && <p className={styles.authError}>{authError}</p>}
    </form>
  );
};

export default LoginForm;
