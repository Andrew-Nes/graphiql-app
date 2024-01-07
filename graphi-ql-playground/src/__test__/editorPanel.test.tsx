import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { LanguageProvider } from '@/context/languageContext';
import {
  EditorPanel,
  EditorPanelProps,
} from '@/Components/RequestEditor/EditorPanel';

jest.mock('../services/auth/firebase', () => ({
  auth: {
    getAuth: jest.fn(),
  },
}));

const props: EditorPanelProps = {
  variablesCode: 'Variables code',
  headersCode: 'Headers code',
  setVariablesCode: jest.fn(),
  setHeadersCode: jest.fn(),
};

function renderComponent(): void {
  render(
    <LanguageProvider>
      <EditorPanel {...props} />
    </LanguageProvider>
  );
}

describe('EditorPanel component', () => {
  test('should render component properly.', () => {
    renderComponent();

    const buttonVariables = screen.getByRole('button', { name: /variables/i });
    const buttonHeaders = screen.getByRole('button', { name: /headers/i });

    expect(buttonVariables).toBeInTheDocument();
    expect(buttonHeaders).toBeInTheDocument();
  });

  test('should open Variables Editor on click on correspondent button.', async () => {
    renderComponent();

    const buttonVariables = screen.getByRole('button', { name: /variables/i });
    expect(buttonVariables).toBeInTheDocument();

    await userEvent.click(buttonVariables);

    expect(buttonVariables).toHaveClass('active');
  });

  test('should open Headers Editor on click on correspondent button.', async () => {
    renderComponent();

    const buttonHeaders = screen.getByRole('button', { name: /headers/i });
    expect(buttonHeaders).toBeInTheDocument();

    await userEvent.click(buttonHeaders);

    expect(buttonHeaders).toHaveClass('active');
  });

  test('should toggle the panel on click on Show/Hide button.', async () => {
    renderComponent();

    const toggleButton = screen.getByTestId('button-toggle');

    await userEvent.click(toggleButton);
    expect(toggleButton).toHaveClass('button__toggle_opened');

    await userEvent.click(toggleButton);
    expect(toggleButton).not.toHaveClass('button__toggle_opened');
  });
});
