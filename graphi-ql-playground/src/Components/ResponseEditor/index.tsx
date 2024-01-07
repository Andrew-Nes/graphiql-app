import { FC } from 'react';

import { Editor } from '../Editor';

import styles from './ResponseEditor.module.scss';

interface ResponseEditorProps {
  response: string;
}
export const ResponseEditor: FC<ResponseEditorProps> = ({ response }) => {
  return (
    <div className={styles.responseEditor}>
      <Editor
        mode="read"
        code={response}
        placeholder="JSON response..."
        className="editor__response"
      />
    </div>
  );
};
