import { ReactElement, forwardRef } from 'react';

import { FieldError } from 'react-hook-form';

import styles from './StyledInput.module.scss';

export interface StyledInputProps {
  inputError: FieldError | undefined;
  type: 'text' | 'password' | 'email';
  inputName: 'name' | 'password' | 'email' | 'confirmPassword';
  placeholder: string;
}

export const StyledInput = forwardRef<HTMLInputElement, StyledInputProps>(
  (
    { inputName, placeholder, inputError, type, ...inputProps },
    ref
  ): ReactElement => {
    return (
      <label className={styles.field} htmlFor={inputName}>
        <input
          className={styles.field__input}
          ref={ref}
          type={type}
          id={inputName}
          placeholder={placeholder}
          {...inputProps}
        />

        <span className={styles.field__error}>{inputError?.message}</span>
      </label>
    );
  }
);
