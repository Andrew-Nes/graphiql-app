import { FC, useState } from 'react';
import clsx from 'clsx';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useLanguage, useTranslations } from '@/hooks';
import { EndpointFormProps, EndpointFormFields } from './EndpointForm.type';

import styles from './EndpointForm.module.scss';
import { ERROR_MESSAGES, ERROR_MESSAGES_RU, LANGS } from '@/constants';

const EndpointForm: FC<EndpointFormProps> = ({ endpoint, endpointSetter }) => {
  const { language } = useLanguage();
  const dictionary = useTranslations();
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const errorMessage =
    language === LANGS.EN
      ? ERROR_MESSAGES.API_ENDPOINT_EXIST
      : ERROR_MESSAGES_RU.API_ENDPOINT_EXIST;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      endpointInput: endpoint,
    },
  });

  const onSubmit: SubmitHandler<EndpointFormFields> = async ({
    endpointInput,
  }) => {
    try {
      if (!isEditMode) {
        setEditMode(true);
      } else {
        await fetch(endpointInput);
        endpointSetter(endpointInput);
        setEditMode(false);
      }
    } catch (error) {
      setError('endpointInput', { message: errorMessage });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={clsx(styles.input, isEditMode && styles.input_edit)}
        type="text"
        id="endpointInput"
        readOnly={!isEditMode}
        {...register('endpointInput')}
      />
      <button className={styles.button} type="submit">
        {isEditMode
          ? dictionary.playground.endpointButton.saveMod
          : dictionary.playground.endpointButton.editMod}
      </button>
      <span className={styles.errorText}>{errors.endpointInput?.message}</span>
    </form>
  );
};

export { EndpointForm };
