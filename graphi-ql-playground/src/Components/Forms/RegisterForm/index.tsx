import { FC, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useRouter } from 'next/router';

import { RegisterFormType, registerSchema } from '@/utils/registerValidate';
import useTranslations from '@/utils/translation';
import { useLanguage } from '@/Components/LanguageContext/LanguageContext';
import { routes } from '@/services/routes';
import { ERROR_MESSAGES, ERROR_MESSAGES_RU } from '@/constants/errorMessages';

import StyledInput from '@/Components/StyledInput';

import styles from './RegisterForm.module.scss';

const RegisterForm: FC = () => {
  const [password, setPassword] = useState<string>();

  const { language } = useLanguage();
  const router = useRouter();
  const dictionary = useTranslations();

  const schema =
    language === 'en'
      ? registerSchema(ERROR_MESSAGES)
      : registerSchema(ERROR_MESSAGES_RU);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitted },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  useEffect(() => {
    const subscription = watch((value) => {
      setPassword(value.password);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<RegisterFormType> = () => {
    router.push(routes.PRODUCT);
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
      <button
        className={styles.submitButton}
        type="submit"
        disabled={!isValid || isSubmitted}
      >
        {dictionary.forms.buttons.register}
      </button>
    </form>
  );
};

export default RegisterForm;
