import { FC, useEffect, useState } from 'react';
import router from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/services/auth/firebase';
import { routes } from '@/types';
import { DEFAULT_ENDPOINT } from '@/constants';

import { EndpointForm } from '@/Components/Forms/EndpointForm';

const PlaygroundPage: FC = () => {
  const [user] = useAuthState(auth);
  const [endpoint, setEndpoint] = useState<string>(DEFAULT_ENDPOINT);
  useEffect(() => {
    if (!user) router.push(routes.MAIN);
  }, [user]);

  return (
    <>
      <h1>Playground Page</h1>
      <EndpointForm endpoint={endpoint} endpointSetter={setEndpoint} />
    </>
  );
};

export default PlaygroundPage;
