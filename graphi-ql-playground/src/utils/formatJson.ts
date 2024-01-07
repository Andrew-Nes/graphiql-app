export const formatCode = (code: string) =>
  JSON.stringify(JSON.parse(code), null, 2);
