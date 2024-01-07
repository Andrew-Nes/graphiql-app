export const prettifyQuery = (code: string) => {
  let result = '';
  let isArgs = false;
  let space = '';
  const splitCode = code
    .split('\n')
    .map((el) => el.trim())
    .filter((el) => el !== '')
    .map((el) =>
      el
        .split(' ')
        .map((el) => el.trim())
        .filter((el) => el !== '')
        .join(' ')
    );
  for (let i = 0, j = 0; i < splitCode.length; i += 1) {
    for (let k = 0; k < splitCode[i].length; k += 1) {
      switch (splitCode[i][k]) {
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
            result += `{\n${space}`;
          } else {
            result += '{';
          }
          break;

        case '}':
          if (!isArgs) {
            j -= 1;
            space = '  '.repeat(j);
            if (i < splitCode.length - 1) {
              if (splitCode[i + 1][0] === '}') {
                result += `\n${space}}`;
                break;
              }
            }
            if (splitCode[i][k + 1] === '}') {
              result += `\n${space}}`;
              break;
            } else {
              result += `\n${space}}\n${space}`;
            }
          } else {
            result += '}';
          }
          break;

        default:
          if (i < splitCode.length - 1 && splitCode[i + 1][0] !== '}') {
            if (k === splitCode[i].length - 1) {
              result += `${splitCode[i][k]}\n${space}`;
              break;
            }
          }
          result += splitCode[i][k];
      }
    }
  }
  return result;
};
