import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { LanguageProvider } from '@/context/languageContext';
import { RequestEditor } from '@/Components/RequestEditor';

jest.mock('../services/auth/firebase', () => ({
  auth: {
    getAuth: jest.fn(),
  },
}));

describe('RequestEditor component', () => {
  test('should render the RequestEditor component', () => {
    render(
      <LanguageProvider>
        <RequestEditor />
      </LanguageProvider>
    );

    const placeholder = screen.getByPlaceholderText('GraphQL request...');
    expect(placeholder).toBeInTheDocument();
  });

  test('should render proper buttons', async () => {
    render(
      <LanguageProvider>
        <RequestEditor />
      </LanguageProvider>
    );

    const buttonRequest = screen.getByTestId('button__request');
    const buttonPrettify = screen.getByTestId('button__prettify');

    expect(buttonRequest).toBeInTheDocument();
    expect(buttonPrettify).toBeInTheDocument();
  });
});
