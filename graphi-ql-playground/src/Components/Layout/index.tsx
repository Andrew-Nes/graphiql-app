import { FC, ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/services/auth/firebase';
import clsx from 'clsx';

import { useTranslations } from '@/hooks';

import { Header } from '../Header';
import { Footer } from '../Footer';

import styles from './Layout.module.scss';

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [, loading] = useAuthState(auth);
  const dictionary = useTranslations();

  return (
    <div className="layout">
      <Header />
      <main className={clsx(loading && styles.main__loading)}>
        {loading ? (
          <span className={styles.loader}>{dictionary.loading}...</span>
        ) : (
          children
        )}
      </main>
      <Footer />
    </div>
  );
};
