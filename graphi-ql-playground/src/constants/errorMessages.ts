export const ERROR_MESSAGES = {
  REQUIRED_EMAIL: 'Email is required.',
  REQUIRED_PASSWORD: 'Password is required.',
  REQUIRED_NAME: 'Name is required.',
  INVALID_EMAIL: 'Email is not valid.',
  SHORT_NAME: 'Name must contain at least 2 letters.',
  PASSWORD_DIGIT_CONTAIN: 'Password must contain at least 1 digit.',
  PASSWORD_LETTER_CONTAIN: 'Password must contain at least 1 letter.',
  PASSWORD_SPECIAL_CH_CONTAIN:
    'Password must contain at least 1 special character.',
  SHORT_PASSWORD: 'Password minimum length is 8 characters.',
  MATCH_CONFIRM_PASS: 'Password & confirm password do not match.',
  REQUIRED_CONFIRM_PASS: 'Confirm password is required.',
  API_ENDPOINT_EXIST: 'API endpoint does not exist.',
  API_ENDPOINT_REQUIRED: 'API endpoint is required.',
  API_ENDPOINT_VALID: 'API endpoint is not valid.',
  REQUEST_SYNTAX_ERROR: 'Variables or headers are invalid JSON:\n',
  REQUEST_UNEXPECTED_ERROR: 'Something went wrong:\n',
};

export const ERROR_MESSAGES_RU = {
  REQUIRED_EMAIL: 'Имейл обязателен.',
  REQUIRED_PASSWORD: 'Пароль обязателен.',
  REQUIRED_NAME: 'Имя обязательно.',
  INVALID_EMAIL: 'Неверный имейл.',
  SHORT_NAME: 'Имя должно содержать минимум 2 буквы.',
  PASSWORD_DIGIT_CONTAIN: 'Пароль должен содержать минимум 1 цифру.',
  PASSWORD_LETTER_CONTAIN: 'Пароль должен содержать минимум 1 латинскую букву.',
  PASSWORD_SPECIAL_CH_CONTAIN:
    'Пароль должен содержать минимум 1 специальный символ.',
  SHORT_PASSWORD: 'Минимальная длина пароля — 8 знаков.',
  MATCH_CONFIRM_PASS: 'Пароль и подтвержденный пароль не совпадают.',
  REQUIRED_CONFIRM_PASS: 'Подтверждение пароля обязательно.',
  API_ENDPOINT_EXIST: 'Конечная точка API не существует.',
  API_ENDPOINT_REQUIRED: 'Конечная точка API обязательна.',
  API_ENDPOINT_VALID: 'Неверный формат конечной точки API.',
  REQUEST_SYNTAX_ERROR:
    'Переменные или заголовки имеют недействительный JSON: \n',
  REQUEST_UNEXPECTED_ERROR: 'Что-то пошло не так:\n',
};

export type ErrorMessages = typeof ERROR_MESSAGES;
