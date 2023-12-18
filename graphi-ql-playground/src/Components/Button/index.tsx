import { FC, MouseEvent } from 'react';

import classnames from 'classnames';
import styles from './button.module.scss';

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button';
  name: string | number;
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({
  name,
  type = 'button',
  className,
  disabled,
  onClick = (): void => {},
}) => {
  return (
    <button
      type={type}
      className={classnames(styles.button, className || '')}
      onClick={(event): void => onClick(event)}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default Button;
