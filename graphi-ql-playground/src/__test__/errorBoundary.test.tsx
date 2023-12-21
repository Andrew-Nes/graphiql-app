import { render } from '@testing-library/react';
import { Component, ReactNode } from 'react';
import '@testing-library/jest-dom';

import ErrorBoundary from '@/Components/ErrorBoundary/ErrorBoundary';

interface Props {
  children: ReactNode;
}

interface State {
  error: boolean;
}

describe('ErrorBoundary', () => {
  it('should render children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Test Component</div>
      </ErrorBoundary>
    );

    const childElement = getByText('Test Component');
    expect(childElement).toBeInTheDocument();
  });

  it('should render an error message and a try again button when there is an error', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    class ErrorComponent extends Component<Props, State> {
      constructor(props: Props) {
        super(props);
        this.state = { error: false };
      }
      render() {
        if (!this.state.error) throw new Error('Test error');
        return <div>Error</div>;
      }
    }

    const { getByText } = render(
      <ErrorBoundary>
        <ErrorComponent>
          <></>
        </ErrorComponent>
      </ErrorBoundary>
    );

    const errorMessage = getByText('Oops, there is an error!');
    const tryAgainButton = getByText('Try again?');

    expect(errorMessage).toBeInTheDocument();
    expect(tryAgainButton).toBeInTheDocument();

    jest.spyOn(console, 'error').mockRestore();
  });

  it('calls componentDidCatch when an error occurs', () => {
    const spy = jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');
    jest.spyOn(console, 'error').mockImplementation(() => {});

    class ErrorComponent extends Component<Props, State> {
      constructor(props: Props) {
        super(props);
        this.state = { error: false };
      }
      render() {
        if (!this.state.error) throw new Error('Test error');
        return <div>Error</div>;
      }
    }

    render(
      <ErrorBoundary>
        <ErrorComponent>
          <></>
        </ErrorComponent>
      </ErrorBoundary>
    );

    expect(spy).toHaveBeenCalled();

    jest.spyOn(console, 'error').mockRestore();
  });
});
