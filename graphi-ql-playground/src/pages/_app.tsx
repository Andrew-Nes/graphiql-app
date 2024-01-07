import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ErrorBoundary } from '@/Components/ErrorBoundary';
import { LanguageProvider } from '@/context/languageContext';
import { Layout } from '@/Components/Layout';

import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>GraphQL Playground</title>
        <meta name="description" content="GraphQL Playground web application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon/favicon-32x32.png" />
      </Head>

      <ErrorBoundary>
        <LanguageProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LanguageProvider>
      </ErrorBoundary>
    </>
  );
}
