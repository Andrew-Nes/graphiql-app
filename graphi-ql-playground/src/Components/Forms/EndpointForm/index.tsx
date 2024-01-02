import { FC, useState } from 'react';
import clsx from 'clsx';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useLanguage, useTranslations } from '@/hooks';

import { ERROR_MESSAGES, ERROR_MESSAGES_RU, LANGS } from '@/constants';
import { EndpointFormProps } from './EndpointForm.type';
import { EndpointFormType, endpointSchema } from '@/utils/endpointSchema';

import styles from './EndpointForm.module.scss';

const EndpointForm: FC<EndpointFormProps> = ({ endpoint, endpointSetter }) => {
  const { language } = useLanguage();
  const dictionary = useTranslations();
  const [isEditMode, setEditMode] = useState<boolean>(false);

  const errorMessage =
    language === LANGS.EN
      ? ERROR_MESSAGES.API_ENDPOINT_EXIST
      : ERROR_MESSAGES_RU.API_ENDPOINT_EXIST;

  const schema =
    language === LANGS.EN
      ? endpointSchema(ERROR_MESSAGES)
      : endpointSchema(ERROR_MESSAGES_RU);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      endpoint: endpoint,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<EndpointFormType> = async ({ endpoint }) => {
    try {
      if (!isEditMode) {
        setEditMode(true);
      } else {
        await fetch(endpoint);
        endpointSetter(endpoint);
        setEditMode(false);
      }
    } catch (error) {
      setError('endpoint', { message: errorMessage });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={clsx(styles.input, isEditMode && styles.input_edit)}
        type="text"
        id="endpointInput"
        readOnly={!isEditMode}
        {...register('endpoint')}
      />
      <button className={styles.button} type="submit">
        {isEditMode
          ? dictionary.playground.endpointButton.saveMod
          : dictionary.playground.endpointButton.editMod}
      </button>
      <span className={styles.errorText}>{errors.endpoint?.message}</span>
    </form>
  );
};

export { EndpointForm };
