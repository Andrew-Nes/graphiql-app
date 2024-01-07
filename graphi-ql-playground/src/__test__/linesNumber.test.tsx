import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { createRef } from 'react';

import { LinesNumber, LinesNumberProps } from '@/Components/Editor/LinesNumber';

const handleScroll = jest.fn();
const linesNumberRef = createRef<HTMLUListElement>();

const code = `Line 1
  Line 2
  Line 3`;

const props: LinesNumberProps = {
  code,
  handleScroll,
  linesNumberRef,
};

describe('LinesNumber component', () => {
  test('Displays correct line numbers', () => {
    render(<LinesNumber {...props} />);

    const line1 = screen.getByText('1');
    const line3 = screen.getByText('3');

    expect(line1).toBeInTheDocument();
    expect(line3).toBeInTheDocument();
  });
});
