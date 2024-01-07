import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';

import { useLanguage } from '@/hooks';

import { makeRequest } from '@/services/request';
import { prettifyQuery } from '@/utils/prettifyQuery';
import { isValidJson } from '@/utils/isValidJson';
import { formatCode } from '@/utils/formatJson';
import { ERROR_MESSAGES, ERROR_MESSAGES_RU, LANGS } from '@/constants';

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
  const { language } = useLanguage();

  const [code, setCode] = useState<string>('');
  const [variablesCode, setVariablesCode] = useState<string>('');
  const [headersCode, setHeadersCode] = useState<string>('');

  const syntaxErrorMessage =
    language === LANGS.EN
      ? ERROR_MESSAGES.REQUEST_SYNTAX_ERROR
      : ERROR_MESSAGES_RU.REQUEST_SYNTAX_ERROR;
  const unexpectedErrorMessage =
    language === LANGS.EN
      ? ERROR_MESSAGES.REQUEST_UNEXPECTED_ERROR
      : ERROR_MESSAGES_RU.REQUEST_UNEXPECTED_ERROR;

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
      if (err instanceof SyntaxError) {
        setResponse(`${syntaxErrorMessage}${err.message}`);
      } else {
        setResponse(
          `${unexpectedErrorMessage}${err instanceof Error ? err.message : err}`
        );
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
          id="button__request"
        >
          <span>R</span>
        </Button>
        <Button
          className={styles.requestEditor__button_prettify}
          onClick={handlePrettify}
          id="button__prettify"
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
