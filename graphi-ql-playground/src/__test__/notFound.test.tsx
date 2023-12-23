import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import NotFound from '@/pages/404';
import { LanguageProvider } from '@/context/languageContext';
import { useRouter } from '@/__mocks__/router';

const mockFn = jest.fn();
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

describe('NotFound Component', () => {
  useRouter.mockReturnValue({ push: mockFn });

  it('renders the component correctly', () => {
    render(
      <LanguageProvider>
        <NotFound />
      </LanguageProvider>
    );

    expect(screen.getByText('🙃🙄️😢')).toBeInTheDocument();
    expect(
      screen.getByText('Oooops... Something went wrong!')
    ).toBeInTheDocument();
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
  });

  // it('calls router.push when the button is clicked', async () => {
  //   render(
  //     <LanguageProvider>
  //       <NotFound />
  //     </LanguageProvider>
  //   );
  //   const button = screen.getByText('Back to Home');
  //   fireEvent.click(button);

  //   await waitFor(() => {
  //     expect(mockFn).toHaveBeenCalledWith('/');
  //   });
  // });
});
