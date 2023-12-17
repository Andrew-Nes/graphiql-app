import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import {
  fieldsPlaceholder,
  buttonsName,
  invalidValue,
  validValue,
  textsValues,
} from '@/constants/testConstants';
import { ERROR_MESSAGES } from '@/constants/errorMessages';

import { LanguageProvider } from '@/Components/LanguageContext/LanguageContext';
import RegisterPage from '@/pages/register';

const mock_authState = [null, false, null];

jest.mock('@/services/auth/firebase', () => ({
  auth: {
    getAuth: jest.fn(),
  },
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => mock_authState),
}));

describe('Register page tests', () => {
  it('Render page', () => {
    render(
      <LanguageProvider>
        <RegisterPage />
      </LanguageProvider>
    );

    expect(screen.getByText(textsValues.REGISTER_HEADING)).toBeInTheDocument();
    expect(screen.getByText(textsValues.REGISTER_INTRO)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(fieldsPlaceholder.NAME)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(fieldsPlaceholder.EMAIL)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(fieldsPlaceholder.PASSWORD)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(fieldsPlaceholder.CONFIRM_PASS)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: buttonsName.REGISTER,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: buttonsName.LOGIN,
      })
    ).toBeInTheDocument();
  });

  it('Validation fields', async () => {
    render(
      <LanguageProvider>
        <RegisterPage />
      </LanguageProvider>
    );

    const nameInput = screen.getByPlaceholderText(fieldsPlaceholder.NAME);
    const emailInput = screen.getByPlaceholderText(fieldsPlaceholder.EMAIL);
    const passInput = screen.getByPlaceholderText(fieldsPlaceholder.PASSWORD);
    const confirmPassInput = screen.getByPlaceholderText(
      fieldsPlaceholder.CONFIRM_PASS
    );

    await userEvent.type(nameInput, invalidValue.NAME);
    await userEvent.type(emailInput, invalidValue.EMAIL);
    await userEvent.type(passInput, invalidValue.PASSWORD);
    await userEvent.type(confirmPassInput, invalidValue.CONFIRM_PASS);

    expect(
      screen.getByText(new RegExp(ERROR_MESSAGES.SHORT_NAME, 'i'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(ERROR_MESSAGES.INVALID_EMAIL, 'i'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(ERROR_MESSAGES.SHORT_PASSWORD, 'i'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(ERROR_MESSAGES.MATCH_CONFIRM_PASS, 'i'))
    ).toBeInTheDocument();
  });

  it('Enable submit button', async () => {
    render(
      <LanguageProvider>
        <RegisterPage />
      </LanguageProvider>
    );

    const nameInput = screen.getByPlaceholderText(fieldsPlaceholder.NAME);
    const emailInput = screen.getByPlaceholderText(fieldsPlaceholder.EMAIL);
    const passInput = screen.getByPlaceholderText(fieldsPlaceholder.PASSWORD);
    const confirmPassInput = screen.getByPlaceholderText(
      fieldsPlaceholder.CONFIRM_PASS
    );

    await userEvent.type(nameInput, validValue.NAME);
    await userEvent.type(emailInput, validValue.EMAIL);
    await userEvent.type(passInput, validValue.PASSWORD);
    await userEvent.type(confirmPassInput, validValue.CONFIRM_PASS);

    expect(
      screen.getByRole('button', { name: buttonsName.REGISTER })
    ).not.toBeDisabled();
  });
});
