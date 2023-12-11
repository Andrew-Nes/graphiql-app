import ErrorBoundary from '@/Components/ErrorBoundary/ErrorBoundary';
import Layout from '@/Components/Layout/Layout';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { LanguageProvider } from '@/Components/LanguageContext/LanguageContext';

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
