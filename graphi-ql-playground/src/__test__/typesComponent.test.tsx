import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntrospectionType } from 'graphql';

import { Types } from '@/Components/Documentation/TypesComponent/';

const mockTypes = [
  {
    name: 'ObjectType1',
    kind: 'OBJECT',
    description: 'Description for ObjectType1',
    fields: [
      { name: 'field1', description: 'Description for field1' },
      { name: 'field2', description: 'Description for field2' },
    ],
  },
  {
    name: 'ObjectType2',
    kind: 'OBJECT',
    description: 'Description for ObjectType2',
    fields: [
      { name: 'field3', description: 'Description for field3' },
      { name: 'field4', description: 'Description for field4' },
    ],
  },
];

describe('Types', () => {
  it('renders Types component with provided types', () => {
    render(<Types types={mockTypes as ReadonlyArray<IntrospectionType>} />);

    expect(screen.getByText('ObjectType1')).toBeInTheDocument();
    expect(screen.getByText('ObjectType2')).toBeInTheDocument();
  });

  it('toggles type details when clicked', () => {
    render(<Types types={mockTypes as ReadonlyArray<IntrospectionType>} />);
    fireEvent.click(screen.getByText('ObjectType1'));

    expect(screen.getByText('Description for ObjectType1')).toBeInTheDocument();
    expect(screen.getByText('field1')).toBeInTheDocument();
    expect(screen.getByText('field2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('ObjectType1'));

    expect(screen.queryByText('Description for ObjectType1')).toBeNull();
    expect(screen.queryByText('field1')).toBeNull();
    expect(screen.queryByText('field2')).toBeNull();
  });
});
