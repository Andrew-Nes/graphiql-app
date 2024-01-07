import { getIntrospectionQuery } from 'graphql/utilities';

const introspectionQuery = getIntrospectionQuery();

export const fetchSchema = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: introspectionQuery }),
    });
    const result = await response.json();
    return result.data.__schema;
  } catch (error) {
    return null;
  }
};
