import { FC, useEffect } from 'react';
import router from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/services/auth/firebase';
import { routes } from '@/types';

import { RequestEditor } from '@/Components/RequestEditor';

import styles from '@/styles/Playground.module.scss';

const PlaygroundPage: FC = () => {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) router.push(routes.MAIN);
  }, [user]);

  return (
    <section className={styles.playground}>
      <h1>Playground</h1>
      <div className={styles.playground__editors}>
        <RequestEditor />
      </div>
    </section>
  );
};

export default PlaygroundPage;
