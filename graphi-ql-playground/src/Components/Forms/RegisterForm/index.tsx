import { FC, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useRouter } from 'next/router';

import {
  RegisterFormType,
  registerSchema,
  registerSchemaRu,
} from '@/utils/registerValidate';

import { routes } from '../../../services/routes';

import StyledInput from '@/Components/StyledInput';

import styles from './RegisterForm.module.scss';
import useTranslations from '@/utils/translation';
import { useLanguage } from '@/Components/LanguageContext/LanguageContext';

const RegisterForm: FC = () => {
  const { language } = useLanguage();
  const schema = language === 'en' ? registerSchema : registerSchemaRu;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitted },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const [password, setPassword] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    const subscription = watch((value) => {
      setPassword(value.password);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<RegisterFormType> = () => {
    router.push(routes.PRODUCT);
  };
  const dictionary = useTranslations();
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
