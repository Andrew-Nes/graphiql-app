import { ReactElement, forwardRef } from 'react';

import { StyledInputProps } from './StyledInput.type';

import styles from './StyledInput.module.scss';

const StyledInput = forwardRef<HTMLInputElement, StyledInputProps>(
  (
    { inputName, placeholder, inputError, type, ...inputProps },
    ref
  ): ReactElement => {
    return (
      <label className={styles.labelOfInput} htmlFor={inputName}>
        <input
          className={styles.input}
          ref={ref}
          type={type}
          id={inputName}
          placeholder={placeholder}
          {...inputProps}
        />
        <p className={styles.errorText}>{inputError?.message}</p>
      </label>
    );
  }
);
export default StyledInput;
