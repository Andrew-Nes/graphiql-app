import { FieldError } from 'react-hook-form';

export interface StyledInputProps {
  inputError: FieldError | undefined;
  type: 'text' | 'password' | 'email';
  inputName: 'name' | 'password' | 'email' | 'confirmPassword';
  placeholder: string;
}
