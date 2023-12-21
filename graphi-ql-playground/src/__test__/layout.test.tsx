import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Layout from '@/Components/Layout/Layout';

const headerText = 'Header';
const footerText = 'Footer';
const componentText = 'Children';

jest.mock('../src/Components/Header/Header.tsx', () => {
  const MockedComponent = () => {
    return <div>{headerText}</div>;
  };
  return {
    __esModule: true,
    default: MockedComponent,
  };
});

jest.mock('../src/Components/Footer/Footer.tsx', () => {
  const MockedComponent = () => {
    return <div>{footerText}</div>;
  };
  return {
    __esModule: true,
    default: MockedComponent,
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
