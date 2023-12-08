import ErrorBoundary from '@/Components/ErrorBoundary/ErrorBoundary';
import Layout from '@/Components/Layout/Layout';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  );
}
