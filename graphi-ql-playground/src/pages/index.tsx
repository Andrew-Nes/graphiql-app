import { ReactElement } from 'react';

import { HeroSection } from '@/Components/HeroSection';
import { ImageSection } from '@/Components/ImageSection';
import { CourseSection } from '@/Components/CourseSection';
import { TeamSection } from '@/Components/TeamSection';

function Home(): ReactElement {
  return (
    <>
      <HeroSection />
      <ImageSection />
      <CourseSection />
      <TeamSection />
    </>
  );
}

export default Home;
