import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Layout from '@/Components/Layout/Layout';

jest.mock('../src/Components/Header/Header.tsx', () => {
  const MockedComponent = () => {
    return <div>Mocked Header</div>;
  };
  return {
    __esModule: true,
    default: MockedComponent,
  };
});

jest.mock('../src/Components/Footer/Footer.tsx', () => {
  const MockedComponent = () => {
    return <div>Mocked Footer</div>;
  };
  return {
    __esModule: true,
    default: MockedComponent,
  };
});

describe('Layout test', () => {
  it('should render children correctly', () => {
    const { getByText } = render(
      <Layout>
        <div>Test Component</div>
      </Layout>
    );

    const childElement = getByText('Test Component');
    expect(childElement).toBeInTheDocument();
  });
});
