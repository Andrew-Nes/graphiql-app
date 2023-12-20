import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import {
  buttonsName,
  fieldsPlaceholder,
  invalidValue,
  textsValues,
  validValue,
} from '@/__mocks__/constants';

import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { LanguageProvider } from '@/context/languageContext';

import LoginPage from '@/pages/login';

const mock_authState = [null, false, null];

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

    expect(
      screen.getAllByText(textsValues.LOGIN_HEADING)[0]
    ).toBeInTheDocument();
    expect(screen.getByText(textsValues.LOGIN_INTRO)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(fieldsPlaceholder.EMAIL)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(fieldsPlaceholder.PASSWORD)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: buttonsName.LOGIN })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: buttonsName.REGISTER })
    ).toBeInTheDocument();
  });

  it('Validation fields', async () => {
    render(
      <LanguageProvider>
        <LoginPage />
      </LanguageProvider>
    );
    const emailInput = screen.getByPlaceholderText(fieldsPlaceholder.EMAIL);
    const passInput = screen.getByPlaceholderText(fieldsPlaceholder.PASSWORD);

    await userEvent.type(emailInput, invalidValue.EMAIL);
    await userEvent.type(passInput, invalidValue.PASSWORD);

    expect(
      screen.getByText(new RegExp(ERROR_MESSAGES.INVALID_EMAIL, 'i'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(ERROR_MESSAGES.SHORT_PASSWORD, 'i'))
    ).toBeInTheDocument();
  });

  it('Enable submit button', async () => {
    render(
      <LanguageProvider>
        <LoginPage />
      </LanguageProvider>
    );

    const emailInput = screen.getByPlaceholderText(fieldsPlaceholder.EMAIL);
    const passInput = screen.getByPlaceholderText(fieldsPlaceholder.PASSWORD);

    await userEvent.type(emailInput, validValue.EMAIL);
    await userEvent.type(passInput, validValue.PASSWORD);

    expect(
      screen.getByRole('button', { name: buttonsName.LOGIN })
    ).not.toBeDisabled();
  });
});
