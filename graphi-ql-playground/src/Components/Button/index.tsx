import { FC, MouseEvent, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button';
  name?: string | number;
  id?: string;
  className?: string;
  disabled?: boolean;
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  name,
  type = 'button',
  id,
  className = '',
  disabled = false,
  onClick = (): void => {},
  children,
}) => {
  return (
    <button
      type={type}
      id={id}
      className={clsx(styles.button, className)}
      onClick={(event): void => onClick(event)}
      disabled={disabled}
      data-testid={id}
    >
      {name && name}
      {children && children}
    </button>
  );
};
