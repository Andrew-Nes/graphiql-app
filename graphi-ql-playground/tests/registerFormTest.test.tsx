import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { LanguageProvider } from '@/Components/LanguageContext/LanguageContext';
import RegisterForm from '@/Components/Forms/RegisterForm';

const invalidValue = {
  NAME: '1t',
  EMAIL: 'bad..email@',
  PASSWORD: 'pass1@',
  CONFIRM_PASS: 'not',
};
const validValue = {
  NAME: 'Test',
  EMAIL: 'test@email.com',
  PASSWORD: '12345qQ!',
  CONFIRM_PASS: '12345qQ!',
};

jest.mock('@/services/auth/firebase', () => ({
  auth: {
    getAuth: jest.fn(),
  },
}));

describe('Register Form tests', () => {
  it('Render form', () => {
    render(
      <LanguageProvider>
        <RegisterForm />
      </LanguageProvider>
    );
    screen.debug();
    expect(screen.getByText(/Registration 🤓/i)).toBeInTheDocument();

    expect(
      screen.getByText(/Please, create account to use GraphiQL Playground./i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Create Account/i })
    ).toBeInTheDocument();
  });

  it('Validation fields', async () => {
    render(
      <LanguageProvider>
        <RegisterForm />
      </LanguageProvider>
    );
    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('E-Mail');
    const passInput = screen.getByPlaceholderText('Password');
    const confirmPassInput = screen.getByPlaceholderText('Confirm password');
    await userEvent.type(nameInput, invalidValue.NAME);
    await userEvent.type(emailInput, invalidValue.EMAIL);
    await userEvent.type(passInput, invalidValue.PASSWORD);
    await userEvent.type(confirmPassInput, invalidValue.CONFIRM_PASS);

    expect(
      screen.getByText(/Name must contain at least 2 letters/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Not valid Email!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Password must contain minimum 8 symbols!/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Confirm password should match with password!/i)
    ).toBeInTheDocument();
  });

  it('Enable submit button', async () => {
    render(
      <LanguageProvider>
        <RegisterForm />
      </LanguageProvider>
    );
    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('E-Mail');
    const passInput = screen.getByPlaceholderText('Password');
    const confirmPassInput = screen.getByPlaceholderText('Confirm password');
    await userEvent.type(nameInput, validValue.NAME);
    await userEvent.type(emailInput, validValue.EMAIL);
    await userEvent.type(passInput, validValue.PASSWORD);
    await userEvent.type(confirmPassInput, validValue.CONFIRM_PASS);
    screen.debug();
    expect(
      screen.getByRole('button', { name: /Create Account/i })
    ).not.toBeDisabled();
  });
});