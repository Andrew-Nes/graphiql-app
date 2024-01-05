import { Dispatch, FC, SetStateAction, useState } from 'react';

import { makeRequest } from '@/services/request';

import { Button } from '../Button';
import { Editor } from '../Editor';
import { EditorPanel } from './EditorPanel';

import styles from './RequestEditor.module.scss';

interface RequestEditorProps {
  endpoint: string;
  setResponse: Dispatch<SetStateAction<string>>;
}

export const RequestEditor: FC<RequestEditorProps> = ({
  endpoint,
  setResponse,
}) => {
  const [code, setCode] = useState('');
  const [variablesCode, setVariablesCode] = useState('');
  const [headersCode, setHeadersCode] = useState('');

  const handlePrettify = () => {
    console.log('Prettify.');
  };

  const handleRequest = async () => {
    try {
      const response = await makeRequest({
        endpoint: endpoint,
        query: code,
        variables: variablesCode ? JSON.parse(variablesCode) : {},
        headers: headersCode ? headersCode : '{}',
      });

      setResponse(JSON.stringify(response, null, 2));
    } catch (err) {
      if (err instanceof Error) {
        setResponse(err.message);
      }
    }
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
