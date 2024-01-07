import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntrospectionObjectType } from 'graphql/utilities';

import { Queries } from '@/Components/Documentation/QueryComponent/';

const mockQueries = {
  name: 'QueryType',
  kind: 'OBJECT',
  fields: [
    {
      name: 'query1',
      description: 'Description for query1',
      args: [
        {
          name: 'arg1',
          defaultValue: 'default1',
          type: { kind: 'SCALAR', name: 'String' },
        },
        {
          name: 'arg2',
          defaultValue: null,
          type: { kind: 'SCALAR', name: 'String' },
        },
      ],
      type: { kind: 'SCALAR', name: 'String' },
    },
    {
      name: 'query2',
      description: 'Description for query2',
      args: [
        {
          name: 'arg3',
          defaultValue: 'default3',
          type: { kind: 'SCALAR', name: 'String' },
        },
        {
          name: 'arg4',
          defaultValue: 'default4',
          type: { kind: 'SCALAR', name: 'String' },
        },
      ],
      type: { kind: 'SCALAR', name: 'String' },
    },
  ],
};

describe('Queries', () => {
  it('renders Queries component with provided queries', () => {
    render(
      <Queries queries={mockQueries as unknown as IntrospectionObjectType} />
    );

    expect(screen.getByText('query1')).toBeInTheDocument();
    expect(screen.getByText('query2')).toBeInTheDocument();
  });

  it('renders query details including description, arguments, and default values', () => {
    render(
      <Queries queries={mockQueries as unknown as IntrospectionObjectType} />
    );
    const args = ['arg1', 'arg2', 'arg3', 'arg4'];
    const defaults = ['default1', 'default2', 'default3', 'default4'];

    expect(screen.getByText('Description for query1')).toBeInTheDocument();
    expect(screen.queryByText('Description for query2')).toBeInTheDocument();

    args.forEach((el) => {
      expect(screen.getByText(el)).toBeInTheDocument();
    });

    defaults.forEach((el) => {
      if (el === 'default2') {
        expect(screen.queryByText(el)).toBeNull();
      } else expect(screen.getByText(el)).toBeInTheDocument();
    });
  });
});
