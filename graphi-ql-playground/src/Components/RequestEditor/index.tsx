import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';
import clsx from 'clsx';

import { makeRequest } from '@/services/request';
import { prettifyQuery } from '@/utils/prettifyQuery';
import { isValidJson } from '@/utils/isValidJson';
import { formatCode } from '@/utils/formatJson';

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
  const [code, setCode] = useState<string>('');
  const [variablesCode, setVariablesCode] = useState<string>('');
  const [headersCode, setHeadersCode] = useState<string>('');

  const handlePrettify = useCallback(() => {
    setCode(prettifyQuery(code));
    if (isValidJson(variablesCode)) {
      setVariablesCode(formatCode(variablesCode));
    }
    if (isValidJson(headersCode)) {
      setHeadersCode(formatCode(headersCode));
    }
  }, [code, variablesCode, headersCode]);

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
          <span
            className={clsx(styles.button__icon, styles.button__icon_request)}
          />
        </Button>
        <Button
          className={styles.requestEditor__button_prettify}
          onClick={handlePrettify}
        >
          <span
            className={clsx(styles.button__icon, styles.button__icon_prettify)}
          />
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
