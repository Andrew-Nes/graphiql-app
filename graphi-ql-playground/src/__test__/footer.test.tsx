import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import * as dictionary from '@/services/dictionary.json';

import { LanguageProvider } from '@/context/languageContext';
import { Footer } from '@/Components/Footer';

describe('Footer test', () => {
  it('displays welcome correctly', () => {
    const { getByText } = render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );
    expect(
      getByText(`${dictionary.en.footer.greeting}👋👋👋`)
    ).toBeInTheDocument();
    expect(getByText(dictionary.en.footer.intro)).toBeInTheDocument();
  });

  it('renders team images', () => {
    const { getByAltText } = render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );

    const cases = ['Photo of Andrei', 'Photo of Mikita', 'Photo of Nastia'];

    cases.forEach((el) => {
      const photo = getByAltText(el);
      expect(photo).toBeInTheDocument();
      expect(photo.tagName).toBe('IMG');
    });
  });

  it('renders team names', () => {
    const { getByText } = render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );

    const team = ['Andrei Niasmachny', 'Mikita Razumau', 'Nastia Piven'];

    team.forEach((el) => expect(getByText(el)).toBeInTheDocument());
  });

  it('renders school info and copyright', () => {
    const { getByText } = render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );

    expect(getByText('RS School')).toBeInTheDocument();
    expect(getByText(dictionary.en.footer.course)).toBeInTheDocument();
    expect(
      getByText(`© ${dictionary.en.footer.copyright}`)
    ).toBeInTheDocument();
  });
});
