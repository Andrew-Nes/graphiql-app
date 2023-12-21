import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from '@/Components/Header/Header';
import { LanguageProvider } from '@/Components/LanguageContext/LanguageContext';

let mock_authState = [{ id: 'test-id', displayName: 'Test Name' }, false, null];

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => mock_authState),
}));

jest.mock('@/services/auth/firebase', () => ({
  auth: {
    getAuth: jest.fn(),
  },
  logout: jest.fn(() => {
    mock_authState = [null, false, null];
  }),
}));

describe('Header Tests', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    );

    expect(getByText('GraphiQL')).toBeInTheDocument();
  });

  it('toggles the menu on button click', () => {
    const { getByText } = render(
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    );

    const menuButton = getByText('menu');
    fireEvent.click(menuButton);
    const header = document.getElementsByTagName('header')[0];

    expect(header).toHaveClass('menu__open');
  });

  it('handles language change', () => {
    const { getByText } = render(
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    );

    const langSelect = document.getElementsByClassName('select')[0];
    fireEvent.change(langSelect, { target: { value: 'ru' } });

    expect(getByText('Меню')).toBeInTheDocument();
  });

  it('handles logout', () => {
    const { getByText } = render(
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    );

    const langSelect = document.getElementsByClassName('select')[0];
    fireEvent.change(langSelect, { target: { value: 'en' } });

    const logoutLink = getByText('Logout');
    fireEvent.click(logoutLink);
    const testValue = [null, false, null];

    expect(mock_authState).toStrictEqual(testValue);
  });
});
