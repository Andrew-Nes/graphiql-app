import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Layout } from '@/Components/Layout/';
import { LanguageProvider } from '@/context/languageContext';

const headerText = 'Header';
const footerText = 'Footer';
const componentText = 'Children';

jest.mock('../Components/Header/', () => {
  const Header = () => {
    return <div>{headerText}</div>;
  };
  return {
    __esModule: true,
    Header,
  };
});

jest.mock('../Components/Footer/', () => {
  const Footer = () => {
    return <div>{footerText}</div>;
  };
  return {
    __esModule: true,
    Footer,
  };
});

const mock_authState = [null, false, null];

jest.mock('@/services/auth/firebase', () => ({
  auth: {
    getAuth: jest.fn(),
  },
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => mock_authState),
}));

describe('Layout test', () => {
  const cases = [headerText, footerText, componentText];

  it.each(cases)('should render element correctly', (elementText) => {
    const { getByText } = render(
      <LanguageProvider>
        <Layout>
          <div>{componentText}</div>
        </Layout>
      </LanguageProvider>
    );
    const element = getByText(elementText);
    expect(element).toBeInTheDocument();
  });
});
