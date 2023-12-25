import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import * as dictionary from '@/services/dictionary.json';
import { TEAM } from '@/constants';

import { LanguageProvider } from '@/context/languageContext';
import { HeroSection } from '@/Components/HeroSection/';
import { ImageSection } from '@/Components/ImageSection';
import { CourseSection } from '@/Components/CourseSection';
import { TeamSection } from '@/Components/TeamSection';

let mock_authState = [{ id: 'test-id', displayName: 'Test Name' }, false, null];

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => mock_authState),
}));

jest.mock('@/services/auth/firebase', () => ({
  auth: {
    getAuth: jest.fn(),
  },
}));

describe('Hero section tests', () => {
  it('Hero section link renders correctly', () => {
    mock_authState = [null, false, null];
    const { getByText } = render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>
    );

    expect(getByText('Please, Log In')).toBeInTheDocument();
  });

  it('Hero section link renders correctly', () => {
    mock_authState = [{ id: 'test-id', displayName: 'Test Name' }, false, null];
    const { getByText } = render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>
    );

    expect(getByText('Try Playground')).toBeInTheDocument();
  });

  it('Hero section renders correctly', () => {
    mock_authState = [{ id: 'test-id', displayName: 'Test Name' }, false, null];

    const { getByText } = render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>
    );

    expect(getByText('The Rick and Morty API')).toBeInTheDocument();
  });
});

describe('Image section test', () => {
  it('Image section renders', () => {
    const { getAllByAltText } = render(<ImageSection />);

    expect(getAllByAltText('Image of the Playground')[0]).toBeInTheDocument();
  });
});

describe('Course section test', () => {
  it('renders course image', () => {
    const { getByAltText } = render(
      <LanguageProvider>
        <CourseSection />
      </LanguageProvider>
    );

    expect(getByAltText('Image for Course section')).toBeInTheDocument();
  });

  it('displays course information correctly', () => {
    const description_1 = dictionary.en.landing.course.description_1;
    const description_2 = dictionary.en.landing.course.description_2;

    const cases = ['RS SCHOOL', 'React Course', description_1, description_2];

    const { getByText } = render(
      <LanguageProvider>
        <CourseSection />
      </LanguageProvider>
    );

    dictionary.en.courseData.forEach((el) => {
      expect(getByText(el)).toBeInTheDocument();
    });

    cases.forEach((el) => {
      expect(getByText(el)).toBeInTheDocument();
    });
  });
});

describe('Team section test', () => {
  it('displays team information correctly', () => {
    const team = TEAM.en;

    const { getByText, getAllByText } = render(
      <LanguageProvider>
        <TeamSection />
      </LanguageProvider>
    );

    expect(getByText('Team')).toBeInTheDocument();

    team.forEach((el) => {
      expect(getByText(el.name)).toBeInTheDocument();
      expect(getByText(el.description)).toBeInTheDocument();
      expect(getAllByText(el.position.toUpperCase())).toHaveLength(3);
    });
  });
});
