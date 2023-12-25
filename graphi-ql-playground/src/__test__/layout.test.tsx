import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Layout } from '@/Components/Layout/';

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

describe('Layout test', () => {
  const cases = [headerText, footerText, componentText];

  it.each(cases)('should render element correctly', (elementText) => {
    const { getByText } = render(
      <Layout>
        <div>{componentText}</div>
      </Layout>
    );
    const element = getByText(elementText);
    expect(element).toBeInTheDocument();
  });
});
