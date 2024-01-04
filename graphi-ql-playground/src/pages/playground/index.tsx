import { FC, useEffect, useState } from 'react';
import router from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import Image from 'next/image';

import { auth } from '@/services/auth/firebase';
import { routes } from '@/types';
import { useTranslations } from '@/hooks';

import { Documentation } from '@/Components/Documentation';

import styles from '@/styles/PlaygroundPage.module.scss';

const PlaygroundPage: FC = () => {
  const [user] = useAuthState(auth);
  const [endpoint] = useState('https://rickandmortyapi.com/graphql');
  const [schemaLoaded, setSchemaLoaded] = useState(true);
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
    <div className={styles.playground}>
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
          src="/images/docs-button.png"
          width={30}
          height={30}
          alt="Docs button image"
        />
      </button>
      <Documentation
        endpoint={endpoint}
        setSchemaLoaded={handleSetSchemaLoaded}
        docs={docsOpened}
      ></Documentation>
    </div>
  );
};

export default PlaygroundPage;
