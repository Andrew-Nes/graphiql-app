import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import { fetchSchema } from '@/utils/fetchGraphqlSchema';

import { Documentation } from '@/Components/Documentation/';

jest.mock('@/utils/fetchGraphqlSchema');

const mockFetchSchema = fetchSchema as jest.MockedFunction<typeof fetchSchema>;

const mockSchema = {
  types: [
    {
      kind: 'SCALAR',
      name: 'String',
    },
    {
      kind: 'SCALAR',
      name: 'Int',
    },
    {
      kind: 'OBJECT',
      name: 'User',
      fields: [
        {
          name: 'id',
          type: { kind: 'SCALAR', name: 'Int' },
        },
        {
          name: 'name',
          type: { kind: 'SCALAR', name: 'String' },
        },
      ],
    },
    {
      kind: 'OBJECT',
      name: 'Query',
      fields: [
        {
          name: 'getUser',
          type: { kind: 'OBJECT', name: 'User' },
          args: [
            {
              name: 'userId',
              type: { kind: 'SCALAR', name: 'Int' },
            },
          ],
        },
      ],
    },
  ],
};

const queriesComponentContent = 'Queries list';
const typesComponentContent = 'Types list';

jest.mock('@/Components/Documentation/QueryComponent', () => {
  const Queries = () => {
    return <div>{queriesComponentContent}</div>;
  };
  return {
    __esModule: true,
    Queries,
  };
});

jest.mock('@/Components/Documentation/TypesComponent', () => {
  const Types = () => {
    return <div>{typesComponentContent}</div>;
  };
  return {
    __esModule: true,
    Types,
  };
});

describe('Documentation', () => {
  beforeEach(() => {
    mockFetchSchema.mockResolvedValue(mockSchema);
  });

  it('renders Documentation component with loaded schema', async () => {
    const setSchemaLoaded = jest.fn();

    await act(async () => {
      render(
        <Documentation
          endpoint="mockEndpoint"
          setSchemaLoaded={setSchemaLoaded}
          docs={true}
        />
      );
    });

    expect(setSchemaLoaded).toHaveBeenCalledWith(true);
    expect(screen.queryByText('Types')).toBeInTheDocument();
    expect(screen.queryByText('Query')).toBeInTheDocument();
  });

  it('handles button clicks and toggles nested content', async () => {
    const setSchemaLoaded = jest.fn();

    await act(async () => {
      render(
        <Documentation
          endpoint="mockEndpoint"
          setSchemaLoaded={setSchemaLoaded}
          docs={true}
        />
      );
    });

    expect(screen.queryByText(typesComponentContent)).toBeNull();
    expect(screen.queryByText(queriesComponentContent)).toBeNull();

    fireEvent.click(screen.getByText('Types'));
    expect(screen.getByText(typesComponentContent)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Query'));
    expect(screen.getByText(queriesComponentContent)).toBeInTheDocument();
  });
});
