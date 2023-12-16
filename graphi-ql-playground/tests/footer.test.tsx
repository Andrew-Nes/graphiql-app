import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { LanguageProvider } from '@/Components/LanguageContext/LanguageContext';
import { Footer } from '@/Components/Footer';

describe('Footer test', () => {
  it('displays welcome correctly', () => {
    const { getByText } = render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );
    expect(getByText('HI!👋👋👋')).toBeInTheDocument();
    expect(getByText('Welcome the team:')).toBeInTheDocument();
  });

  it('renders team images', () => {
    const { getByAltText } = render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );
    const andrei = getByAltText('Photo of Andrei');
    const mikita = getByAltText('Photo of Mikita');
    const nastia = getByAltText('Photo of Nastia');

    expect(andrei).toBeInTheDocument();
    expect(andrei.tagName).toBe('IMG');

    expect(mikita).toBeInTheDocument();
    expect(mikita.tagName).toBe('IMG');

    expect(nastia).toBeInTheDocument();
    expect(nastia.tagName).toBe('IMG');
  });

  it('renders team names', () => {
    const { getByText } = render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );
    expect(getByText('Andrei Niasmachny')).toBeInTheDocument();
    expect(getByText('Mikita Razumau')).toBeInTheDocument();
    expect(getByText('Nastia Piven')).toBeInTheDocument();
  });

  it('renders school info and copyright', () => {
    const { getByText } = render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );
    expect(getByText('RS School')).toBeInTheDocument();
    expect(getByText('React Course')).toBeInTheDocument();
    expect(
      getByText('© All rights are very much reserved')
    ).toBeInTheDocument();
  });
});
