import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import HeroSectionLink from '@/Components/HeroSection/HeroSection';
import { LanguageProvider } from '@/Components/LanguageContext/LanguageContext';
import HeroSection from '@/Components/HeroSection/HeroSection';
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
        <HeroSectionLink />
      </LanguageProvider>
    );
    expect(getByText('Please, Log In')).toBeInTheDocument();
  });
  it('Hero section link renders correctly', () => {
    mock_authState = [{ id: 'test-id', displayName: 'Test Name' }, false, null];
    const { getByText } = render(
      <LanguageProvider>
        <HeroSectionLink />
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
    const description_1 =
      'This course is perfect for students with experience in JavaScript, TypeScript, Git, GitHub, NPM, Webpack, CSS3, HTML5 and an understanding of interacting with APIs.';
    const description_2 =
      'The course runs for a total of 10 weeks, with 6 weeks dedicated to studying React and an additional 4 weeks for the final task implementation.';
    const { getByText } = render(
      <LanguageProvider>
        <CourseSection />
      </LanguageProvider>
    );
    expect(getByText('RS SCHOOL')).toBeInTheDocument();
    expect(getByText('React Course')).toBeInTheDocument();
    expect(getByText(description_1)).toBeInTheDocument();
    expect(getByText(description_2)).toBeInTheDocument();
    expect(getByText('Components')).toBeInTheDocument();
    expect(getByText('Routing')).toBeInTheDocument();
    expect(getByText('Tests, Context API')).toBeInTheDocument();
    expect(getByText('Redux. RTK')).toBeInTheDocument();
    expect(getByText('NextJS, SSR/SSG')).toBeInTheDocument();
    expect(getByText('Forms')).toBeInTheDocument();
    expect(
      getByText('Technical React Interview, GraphiQL')
    ).toBeInTheDocument();
  });
});

describe('Team section test', () => {
  it('displays team information correctly', () => {
    const description =
      'The course runs for a total of 10 weeks, with 6 weeks dedicated to studying React and an additional 4 weeks for the final task implementation.';
    const { getByText, getAllByText } = render(
      <LanguageProvider>
        <TeamSection />
      </LanguageProvider>
    );
    expect(getByText('Team')).toBeInTheDocument();
    expect(getByText('Andrei Niasmachny')).toBeInTheDocument();
    expect(getByText('Mikita Razumau')).toBeInTheDocument();
    expect(getByText('Nastia Piven')).toBeInTheDocument();
    expect(getAllByText(description).length).toEqual(3);
    expect(getAllByText('FRONTEND DEVELOPER').length).toEqual(3);
  });
});
