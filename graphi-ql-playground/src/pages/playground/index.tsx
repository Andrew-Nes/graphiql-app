import { FC, useEffect } from 'react';
import router from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/services/auth/firebase';
import { routes } from '@/types';

const PlaygroundPage: FC = () => {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) router.push(routes.MAIN);
  }, [user]);

  return <h1>Playground Page</h1>;
};

export default PlaygroundPage;
