import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { LanguageProvider } from '@/Components/LanguageContext/LanguageContext';
import LoginPage from '@/pages/login';

const mock_authState = [null, false, null];

const invalidValue = {
  EMAIL: 'bad..email@',
  PASSWORD: 'pass',
};
const validValue = {
  EMAIL: 'test@email.com',
  PASSWORD: '12345qQ!',
};

jest.mock('@/services/auth/firebase', () => ({
  auth: {
    getAuth: jest.fn(),
  },
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => mock_authState),
}));

describe('Login page tests', () => {
  it('Render page', () => {
    render(
      <LanguageProvider>
        <LoginPage />
      </LanguageProvider>
    );
    expect(screen.getByText(/Log In 👋/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Please, log in to use GraphiQL Playground./i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Create Account' })
    ).toBeInTheDocument();
  });
  it('Validation fields', async () => {
    render(
      <LanguageProvider>
        <LoginPage />
      </LanguageProvider>
    );
    const emailInput = screen.getByPlaceholderText('E-Mail');
    const passInput = screen.getByPlaceholderText('Password');
    await userEvent.type(emailInput, invalidValue.EMAIL);
    await userEvent.type(passInput, invalidValue.PASSWORD);

    expect(screen.getByText(/Not valid Email!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Password must contain at least 1 digit!/i)
    ).toBeInTheDocument();
  });
  it('Enable submit button', async () => {
    render(
      <LanguageProvider>
        <LoginPage />
      </LanguageProvider>
    );
    const emailInput = screen.getByPlaceholderText('E-Mail');
    const passInput = screen.getByPlaceholderText('Password');
    await userEvent.type(emailInput, validValue.EMAIL);
    await userEvent.type(passInput, validValue.PASSWORD);
    expect(screen.getByRole('button', { name: /Log In/i })).not.toBeDisabled();
  });
});
