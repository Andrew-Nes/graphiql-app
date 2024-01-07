import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { DEFAULT_ENDPOINT } from '@/constants';

import { LanguageProvider } from '@/context/languageContext';
import { EndpointForm } from '@/Components/Forms/EndpointForm';

const endpointSetter = jest.fn();
describe('Endpoint form tests', () => {
  it('Render form', () => {
    render(
      <LanguageProvider>
        <EndpointForm
          endpoint={DEFAULT_ENDPOINT}
          endpointSetter={endpointSetter}
        />
      </LanguageProvider>
    );
    expect(screen.getByDisplayValue(DEFAULT_ENDPOINT)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Edit' }));
  });
});
