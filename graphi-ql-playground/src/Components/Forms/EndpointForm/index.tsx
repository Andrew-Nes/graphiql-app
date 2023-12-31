import { FC, useState } from 'react';
import clsx from 'clsx';
import { useForm, SubmitHandler } from 'react-hook-form';

import { EndpointFormProps, EndpointFormFields } from './EndpointForm.type';

import styles from './EndpointForm.module.scss';

const EndpointForm: FC<EndpointFormProps> = ({ endpoint, endpointSetter }) => {
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      endpointInput: endpoint,
    },
  });

  const onSubmit: SubmitHandler<EndpointFormFields> = async ({
    endpointInput,
  }) => {
    if (!isEditMode) {
      setEditMode(true);
    } else {
      endpointSetter(endpointInput);
      setEditMode(false);
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
    </form>
  );
};

export { EndpointForm };
