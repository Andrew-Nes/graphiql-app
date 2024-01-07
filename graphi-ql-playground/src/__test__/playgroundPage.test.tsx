import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { LanguageProvider } from '@/context/languageContext';
import PlaygroundPage from '@/pages/playground';

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

jest.mock('@/services/auth/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
}));

const componentCases = [
  'EndpointForm',
  'RequestEditor',
  'ResponseEditor',
  'Documentation',
];

jest.mock('@/Components/Forms/EndpointForm', () => {
  const EndpointForm = () => {
    return <div>{componentCases[0]}</div>;
  };
  return {
    __esModule: true,
    EndpointForm,
  };
});

jest.mock('@/Components/RequestEditor/', () => {
  const RequestEditor = () => {
    return <div>{componentCases[1]}</div>;
  };
  return {
    __esModule: true,
    RequestEditor,
  };
});

jest.mock('@/Components/ResponseEditor/', () => {
  const ResponseEditor = () => {
    return <div>{componentCases[2]}</div>;
  };
  return {
    __esModule: true,
    ResponseEditor,
  };
});

jest.mock('../Components/Documentation/', () => {
  const Documentation = () => {
    return <div>{componentCases[3]}</div>;
  };
  return {
    __esModule: true,
    Documentation,
  };
});

const mock_authState = [
  { id: 'test-id', displayName: 'Test Name' },
  false,
  null,
];
jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => mock_authState),
}));

describe('PlaygroundPage', () => {
  it('renders PlaygroundPage with initial state', async () => {
    render(
      <LanguageProvider>
        <PlaygroundPage />
      </LanguageProvider>
    );

    componentCases.forEach((el) => {
      expect(screen.getByText(el)).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /docs/i })).toBeInTheDocument();
  });
});
