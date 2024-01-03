import { FC } from 'react';

import { Editor } from '../Editor';

import styles from './ResponseEditor.module.scss';

export const ResponseEditor: FC = () => {
  const code = `{
  "errors": [
    {
      "message": "Syntax Error: Unexpected <EOF>",
      "locations": [
        {
          "line": 32,
          "column": 1
        }
      ]
    }
  ]
}`;

  return (
    <div className={styles.responseEditor}>
      <Editor
        mode="read"
        code={code}
        placeholder="JSON response..."
        className="editor__response"
      />
    </div>
  );
};
