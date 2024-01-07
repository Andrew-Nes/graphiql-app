export const prettifyQuery = (query: string) => {
  const iterString = query.replaceAll(' ', '').replaceAll('\n', '');
  let isArgs = false;
  let result = '';

  for (let i = 0, j = 0; i < iterString.length; i += 1) {
    let space = '';
    switch (iterString[i]) {
      case '(':
        isArgs = true;
        result += '(';
        break;

      case ')':
        isArgs = false;
        result += ')';
        break;

      case '{':
        if (!isArgs) {
          j += 1;
          space = '  '.repeat(j);
          result += ` {\n${space}`;
        } else {
          result += '{';
        }
        break;

      case '}':
        if (!isArgs) {
          j -= 1;
          space = '  '.repeat(j);
          result +=
            iterString[i + 1] !== '}' ? `\n${space}}\n${space}` : `\n${space}}`;
        } else {
          result += '}';
        }
        break;

      case ':':
        result += ': ';
        break;

      case ',':
        result += ', ';
        break;

      case 'y':
        if (i === 4) {
          result += 'y ';
        } else {
          result += 'y';
        }
        break;

      case 'n':
        if (i === 7) {
          result += 'n ';
        } else {
          result += 'n';
        }
        break;

      default:
        result += iterString[i];
    }
  }
  return result;
};
