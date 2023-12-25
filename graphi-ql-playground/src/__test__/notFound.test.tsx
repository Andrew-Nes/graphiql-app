import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import * as dictionary from '@/services/dictionary.json';

import NotFound from '@/pages/404';
import { LanguageProvider } from '@/context/languageContext';

const mockFn = jest.fn();

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

describe('NotFound Component', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');
  useRouter.mockReturnValue({ push: mockFn });

  it('renders the component correctly', () => {
    render(
      <LanguageProvider>
        <NotFound />
      </LanguageProvider>
    );

    expect(screen.getByText('🙃🙄️😢')).toBeInTheDocument();
    expect(screen.getByText(dictionary.en.notFound.text)).toBeInTheDocument();
    expect(screen.getByText(dictionary.en.notFound.button)).toBeInTheDocument();
  });

  it('calls router.push when the button is clicked', () => {
    render(
      <LanguageProvider>
        <NotFound />
      </LanguageProvider>
    );
    const button = screen.getByText(dictionary.en.notFound.button);
    fireEvent.click(button);

    expect(mockFn).toHaveBeenCalledWith('/');
  });
});
