import { FC, UIEvent, RefObject } from 'react';
import clsx from 'clsx';

import styles from './LinesNumber.module.scss';

export interface LinesNumberProps {
  className?: string;
  code: string;
  linesNumberRef: RefObject<HTMLUListElement>;
  handleScroll: (e: UIEvent<HTMLUListElement | HTMLTextAreaElement>) => void;
}

export const LinesNumber: FC<LinesNumberProps> = ({
  className = '',
  code,
  handleScroll,
  linesNumberRef,
}) => {
  return (
    <ul
      className={clsx(
        styles.linesNumber,
        styles[`${className}_linesNumber`] || ''
      )}
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
