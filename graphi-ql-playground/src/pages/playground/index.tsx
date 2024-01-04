import { FC, useEffect, useState } from 'react';
import router from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/services/auth/firebase';
import { routes } from '@/types';
import { DEFAULT_ENDPOINT } from '@/constants';

import { EndpointForm } from '@/Components/Forms/EndpointForm';

import { RequestEditor } from '@/Components/RequestEditor';
import { ResponseEditor } from '@/Components/ResponseEditor';

import styles from '@/styles/Playground.module.scss';

const PlaygroundPage: FC = () => {
  const [user] = useAuthState(auth);
  const [endpoint, setEndpoint] = useState<string>(DEFAULT_ENDPOINT);
  const [response, setResponse] = useState<string>('');
  useEffect(() => {
    if (!user) router.push(routes.MAIN);
  }, [user]);

  return (
    <section className={styles.playground}>
      <EndpointForm endpoint={endpoint} endpointSetter={setEndpoint} />
      <div className={styles.playground__editors}>
        <RequestEditor endpoint={endpoint} setResponse={setResponse} />
        <ResponseEditor response={response} />
      </div>
    </section>
  );
};

export default PlaygroundPage;
