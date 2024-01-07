import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { LanguageProvider } from '@/context/languageContext';
import { ResponseEditor } from '@/Components/ResponseEditor';

jest.mock('../services/auth/firebase', () => ({
  auth: {
    getAuth: jest.fn(),
  },
}));

describe('ResponseEditor component', () => {
  test('should render the ResponseEditor component', () => {
    render(
      <LanguageProvider>
        <ResponseEditor />
      </LanguageProvider>
    );

    const responseEditor = screen.getByPlaceholderText('JSON response...');
    expect(responseEditor).toBeInTheDocument();
  });
});
