import { FC, MouseEvent } from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button';
  name: string | number;
  className?: string;
  disabled?: boolean;
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<ButtonProps> = ({
  name,
  type = 'button',
  className = '',
  disabled = false,
  onClick = (): void => {},
}) => {
  return (
    <button
      type={type}
      className={clsx(styles.button, className)}
      onClick={(event): void => onClick(event)}
      disabled={disabled}
    >
      {name}
    </button>
  );
};
