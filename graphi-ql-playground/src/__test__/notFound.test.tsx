import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import NotFound from '../src/pages/404';

jest.mock('next/router');

describe('NotFound Component', () => {
  it('renders the component correctly', () => {
    render(<NotFound />);

    expect(screen.getByText('Oooops...')).toBeInTheDocument();
    expect(
      screen.getByText('Something went wrong!🙃☹🙄️')
    ).toBeInTheDocument();
    expect(screen.getByText('Back to home')).toBeInTheDocument();
  });

  it('calls router.push when the button is clicked', () => {
    const pushMock = jest.fn();
    require('next/router').useRouter.mockReturnValue({ push: pushMock });

    render(<NotFound />);

    fireEvent.click(screen.getByText('Back to home'));

    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
