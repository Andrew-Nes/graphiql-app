export const ERROR_MESSAGES = {
  REQUIRED_EMAIL: 'Email is a required field!',
  REQUIRED_PASSWORD: 'Password is a required field!',
  REQUIRED_NAME: 'Name is a required field!',
  INVALID_EMAIL: 'Not valid Email!',
  SHORT_NAME: 'Name must contain at least 2 letters',
  PASSWORD_DIGIT_CONTAIN: 'Password must contain at least 1 digit!',
  PASSWORD_LETTER_CONTAIN: 'Password must contain at least 1 letter!',
  PASSWORD_SPECIAL_CH_CONTAIN:
    'Password must contain at least 1 special charter!',
  SHORT_PASSWORD: 'Password must contain minimum 8 symbols!',
  MATCH_CONFIRM_PASS: 'Confirm password should match with password!',
  REQUIRED_CONFIRM_PASS: 'Confirm password is a required field!',
};

export const ERROR_MESSAGES_RU = {
  REQUIRED_EMAIL: 'Эл.Почта - обязательное поле!',
  REQUIRED_PASSWORD: 'Пароль - обязательное поле!',
  REQUIRED_NAME: 'Имя - обязательное поле!',
  INVALID_EMAIL: 'Неверный Email!',
  SHORT_NAME: 'Имя должно состоять минимум из двух букв!',
  PASSWORD_DIGIT_CONTAIN: 'Пароль должен содержать минимум одну цифру!',
  PASSWORD_LETTER_CONTAIN:
    'Пароль должен содержать минимум одну латинскую букву!',
  PASSWORD_SPECIAL_CH_CONTAIN:
    'Пароль должен содержать минимум один спец-символ!',
  SHORT_PASSWORD: 'Пароль должен быть не короче восьми знаков!',
  MATCH_CONFIRM_PASS: 'Подтверждение пароля должно совпадать с паролем!',
  REQUIRED_CONFIRM_PASS: 'Подтверждение пароля - обязательное поле!',
};

export type ErrorMessages = typeof ERROR_MESSAGES;
