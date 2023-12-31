import { FC, useState } from 'react';
import clsx from 'clsx';
import { useForm, SubmitHandler } from 'react-hook-form';

import { EndpointFormProps, EndpointFormFields } from './EndpointForm.type';

import styles from './EndpointForm.module.scss';

const EndpointForm: FC<EndpointFormProps> = ({ endpoint, endpointSetter }) => {
  const [isEditMode, setEditMode] = useState<boolean>(false);
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
      setError('endpointInput', { message: 'API endpoint does not exist.' });
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
        {isEditMode ? 'SAVE' : 'EDIT'}
      </button>
      <span className={styles.errorText}>{errors.endpointInput?.message}</span>
    </form>
  );
};

export { EndpointForm };
