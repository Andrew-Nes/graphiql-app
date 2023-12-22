import { FC, UIEvent, RefObject } from 'react';

import styles from './LinesNumber.module.scss';

export interface LinesNumberProps {
  code: string;
  linesNumberRef: RefObject<HTMLUListElement>;
  handleScroll: (e: UIEvent<HTMLUListElement | HTMLTextAreaElement>) => void;
}

export const LinesNumber: FC<LinesNumberProps> = ({
  code,
  handleScroll,
  linesNumberRef,
}) => {
  return (
    <ul
      className={styles.linesNumber}
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
