import { FC, useState } from 'react';

import { Button } from '../Button';
import { Editor } from '../Editor';
import { EditorPanel } from './EditorPanel';

import styles from './RequestEditor.module.scss';

export const RequestEditor: FC = () => {
  const [code, setCode] = useState('');
  const [variablesCode, setVariablesCode] = useState('');
  const [headersCode, setHeadersCode] = useState('');

  const handlePrettify = () => {
    console.log('Prettify.');
  };

  const handleRequest = () => {
    console.log('Make request.');
  };

  return (
    <div className={styles.requestEditor}>
      <Editor
        mode="edit"
        code={code}
        setCode={setCode}
        placeholder="GraphQL request..."
        className="editor__request"
      />

      <div className={styles.requestEditor__buttons}>
        <Button
          className={styles.requestEditor__button_request}
          onClick={handleRequest}
        >
          <span>R</span>
        </Button>
        <Button
          className={styles.requestEditor__button_prettify}
          onClick={handlePrettify}
        >
          <span>P</span>
        </Button>
      </div>

      <EditorPanel
        headersCode={headersCode}
        variablesCode={variablesCode}
        setHeadersCode={setHeadersCode}
        setVariablesCode={setVariablesCode}
      />
    </div>
  );
};
