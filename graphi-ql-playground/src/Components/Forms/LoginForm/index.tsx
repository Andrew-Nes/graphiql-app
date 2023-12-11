import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  LoginFormType,
  loginSchema,
  loginSchemaRu,
} from '@/utils/loginValidate';
import { routes } from '@/services/routes';

import StyledInput from '@/Components/StyledInput';

import styles from './LoginForm.module.scss';
import useTranslations from '@/utils/translation';
import { useLanguage } from '@/Components/LanguageContext/LanguageContext';

const LoginForm: FC = () => {
  const { language } = useLanguage();
  const schema = language === 'en' ? loginSchema : loginSchemaRu;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm({ mode: 'all', resolver: yupResolver(schema) });
  const router = useRouter();
  const onSubmit: SubmitHandler<LoginFormType> = () => {
    router.push(routes.PRODUCT);
  };
  const dictionary = useTranslations();
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

      <button
        className={styles.submitButton}
        type="submit"
        disabled={!isValid || isSubmitted}
      >
        {dictionary.forms.buttons.login}
      </button>
    </form>
  );
};

export default LoginForm;
