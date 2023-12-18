import type { AppProps } from 'next/app';

import { ErrorBoundary } from '@/Components/ErrorBoundary';
import { LanguageProvider } from '@/Components/LanguageContext';
import { Layout } from '@/Components/Layout';

import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
