import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';

import { LanguageProvider } from '@/context/languageContext';
import { Editor, EditorProps } from '@/Components/Editor';

const mockCode = "const greet = () => { console.log('Hello!'); }";
const setCode = jest.fn();

jest.mock('../services/auth/firebase', () => ({
  auth: {
    getAuth: jest.fn(),
  },
}));

const props: EditorProps = {
  mode: 'edit',
  code: mockCode,
};

describe('Editor component', () => {
  test('should render textarea element with correct value.', () => {
    render(
      <LanguageProvider>
        <Editor {...props} />
      </LanguageProvider>
    );

    const textArea = screen.getByRole('textbox');

    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveValue(mockCode);
  });

  test('should disable textarea in read mode.', () => {
    const props: EditorProps = {
      mode: 'read',
      code: mockCode,
    };

    render(
      <LanguageProvider>
        <Editor {...props} />
      </LanguageProvider>
    );

    const textArea = screen.getByRole('textbox');
    expect(textArea).toBeDisabled();
  });

  test('should handle input change.', async () => {
    const props: EditorProps = {
      mode: 'edit',
      code: '',
      setCode: setCode,
    };

    render(
      <LanguageProvider>
        <Editor {...props} />
      </LanguageProvider>
    );

    const textArea = screen.getByRole('textbox');

    await userEvent.clear(textArea);
    await userEvent.type(textArea, 'Hello');

    expect(setCode).toHaveBeenCalledTimes(5);
  });

  test('should handle scroll event.', async () => {
    render(
      <LanguageProvider>
        <Editor {...props} />
      </LanguageProvider>
    );

    const linesCount = screen.getByRole('list');
    const textArea = screen.getByRole('textbox');

    fireEvent.scroll(textArea, { target: { scrollTop: 100 } });

    expect(linesCount.scrollTop).toBe(100);
    expect(textArea.scrollTop).toBe(100);
  });
});
