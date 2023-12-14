import { FC, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import PasswordStrengthBar from 'react-password-strength-bar';
import { FirebaseError } from 'firebase/app';

import { registerWithEmailAndPassword } from '@/services/auth/firebase';
import { RegisterFormType, registerSchema } from '@/utils/registerValidate';
import useTranslations from '@/utils/translation';
import { useLanguage } from '@/Components/LanguageContext/LanguageContext';
import { ERROR_MESSAGES, ERROR_MESSAGES_RU } from '@/constants/errorMessages';

import StyledInput from '@/Components/StyledInput';

import styles from './RegisterForm.module.scss';

const RegisterForm: FC = () => {
  const [password, setPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  const { language } = useLanguage();
  const dictionary = useTranslations();

  const schema =
    language === 'en'
      ? registerSchema(ERROR_MESSAGES)
      : registerSchema(ERROR_MESSAGES_RU);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  useEffect(() => {
    const subscription = watch((value) => {
      setPassword(value.password || '');
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<RegisterFormType> = async ({
    name,
    email,
    password,
  }) => {
    try {
      setAuthError('');
      await registerWithEmailAndPassword(name, email, password);
    } catch (err) {
      const errorResponse = JSON.parse(JSON.stringify(err)) as FirebaseError;
      if (errorResponse.code === 'auth/email-already-in-use')
        setAuthError(dictionary.forms.errors.register);
    }
  };

  return (
    <form
      className={styles.formContainer}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className={styles.titleGroup}>
        <h1 className={styles.formTitle}>
          {dictionary.forms.headings.register} 🤓
        </h1>

        <p className={styles.formInfo}>{dictionary.forms.intro.register}</p>
      </div>

      <StyledInput
        inputError={errors.name}
        inputName="name"
        type="text"
        placeholder={dictionary.forms.fields.name}
        {...register('name')}
      />

      <StyledInput
        inputError={errors.email}
        inputName="email"
        type="email"
        placeholder={dictionary.forms.fields.email}
        {...register('email')}
      />

      <StyledInput
        inputError={errors.password}
        inputName="password"
        type="password"
        placeholder={dictionary.forms.fields.pass}
        {...register('password')}
      />

      <PasswordStrengthBar
        password={password}
        scoreWords={[]}
        shortScoreWord={''}
      />
      <button className={styles.submitButton} type="submit" disabled={!isValid}>
        {dictionary.forms.buttons.register}
      </button>

      {authError && <p className={styles.authError}>{authError}</p>}
    </form>
  );
};

export default RegisterForm;
