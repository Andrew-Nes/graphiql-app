import {
  FC,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  UIEvent,
} from 'react';
import clsx from 'clsx';

import { LinesNumber } from './LinesNumber';
import { READ_MODE } from '@/constants';

import styles from './Editor.module.scss';

export interface EditorProps {
  mode?: 'edit' | 'read';
  code: string;
  setCode?: Dispatch<SetStateAction<string>>;
  className?: string;
  placeholder?: string;
}

export const Editor: FC<EditorProps> = ({
  mode = 'edit',
  code,
  setCode,
  className = '',
  placeholder = 'Type here...',
}) => {
  const linesNumberRef = useRef<HTMLUListElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (setCode) {
      setCode(e.target.value);
    }
  };

  const handleScroll = (e: UIEvent<HTMLUListElement | HTMLTextAreaElement>) => {
    if (!(e.target instanceof HTMLElement)) return;

    if (linesNumberRef.current && textAreaRef.current) {
      linesNumberRef.current.scrollTop = e.target?.scrollTop;
      textAreaRef.current.scrollTop = e.target?.scrollTop;
    }
  };

  return (
    <div className={clsx(styles.editor, styles[className] || '')}>
      <div className={styles.editor__container}>
        <LinesNumber
          className={className}
          code={code}
          handleScroll={handleScroll}
          linesNumberRef={linesNumberRef}
        />

        <textarea
          className={styles.editor__textArea}
          ref={textAreaRef}
          value={code}
          placeholder={placeholder}
          disabled={mode === READ_MODE}
          onChange={handleInput}
          onScroll={handleScroll}
        />
      </div>
    </div>
  );
};
