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
        <ResponseEditor response="Response" />
      </LanguageProvider>
    );

    const placeholder = screen.getByPlaceholderText('JSON response...');
    expect(placeholder).toBeInTheDocument();
  });
});
