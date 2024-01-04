import { FC, useEffect, useState } from 'react';
import router from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import Image from 'next/image';

import { auth } from '@/services/auth/firebase';
import { routes } from '@/types';
import { DEFAULT_ENDPOINT } from '@/constants';
import { useTranslations } from '@/hooks';

import { EndpointForm } from '@/Components/Forms/EndpointForm';
import { RequestEditor } from '@/Components/RequestEditor';
import { ResponseEditor } from '@/Components/ResponseEditor';
import { Documentation } from '@/Components/Documentation';

import styles from '@/styles/Playground.module.scss';

const PlaygroundPage: FC = () => {
  const [user] = useAuthState(auth);
  const [endpoint, setEndpoint] = useState<string>(DEFAULT_ENDPOINT);
  const [schemaLoaded, setSchemaLoaded] = useState(false);
  const [docsOpened, setDocsOpened] = useState(false);
  const dictionary = useTranslations();

  const toggleDocs = () => {
    setDocsOpened(!docsOpened);
  };

  const handleSetSchemaLoaded = (newValue: boolean) => {
    setSchemaLoaded(newValue);
  };

  useEffect(() => {
    if (!user) router.push(routes.MAIN);
  }, [user]);

  return (
    <section className={styles.playground}>
      <EndpointForm endpoint={endpoint} endpointSetter={setEndpoint} />
      <button
        className={styles.docsButton}
        name="docs"
        title={
          schemaLoaded
            ? dictionary.playground.docs.button.titleDocs
            : dictionary.playground.docs.button.titleNoDocs
        }
        onClick={toggleDocs}
        disabled={!schemaLoaded}
      >
        <Image
          src={
            schemaLoaded
              ? '/images/docs-y-button.png'
              : '/images/docs-n-button.png'
          }
          width={30}
          height={30}
          alt="Docs button image"
        />
      </button>
      <div className={styles.playground__editors}>
        <RequestEditor />
        <ResponseEditor />
      </div>
      <Documentation
        endpoint={endpoint}
        setSchemaLoaded={handleSetSchemaLoaded}
        docs={docsOpened}
      />
    </section>
  );
};

export default PlaygroundPage;
