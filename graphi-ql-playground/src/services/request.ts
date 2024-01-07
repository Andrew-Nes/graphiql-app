interface MakeRequestParams {
  endpoint: string;
  query: string;
  variables: object;
  headers: string;
}

export const makeRequest = async ({
  endpoint,
  query,
  variables,
  headers,
}: MakeRequestParams) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        ...JSON.parse(headers),
      },
      body: JSON.stringify({ query, variables }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};
