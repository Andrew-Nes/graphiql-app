import { FC, UIEvent, RefObject } from 'react';
import clsx from 'clsx';

import styles from './LinesNumber.module.scss';

export interface LinesNumberProps {
  mode: 'edit' | 'read';
  code: string;
  linesNumberRef: RefObject<HTMLUListElement>;
  handleScroll: (e: UIEvent<HTMLUListElement | HTMLTextAreaElement>) => void;
}

export const LinesNumber: FC<LinesNumberProps> = ({
  mode = 'edit',
  code,
  handleScroll,
  linesNumberRef,
}) => {
  return (
    <ul
      className={clsx(styles.linesNumber, {
        [styles.readMode]: mode === 'read',
      })}
      ref={linesNumberRef}
      onScroll={handleScroll}
    >
      {code.split('\n').map((line, index) => (
        <li className={styles.linesNumber__item} key={`${line}-${index}`}>
          <span>{index + 1}</span>
        </li>
      ))}
    </ul>
  );
};
