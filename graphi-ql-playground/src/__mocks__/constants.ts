import dictionary from '@/services/dictionary.json';

export const textsValues = {
  REGISTER_HEADING: new RegExp(dictionary.en.forms.title.register, 'i'),
  REGISTER_INTRO: new RegExp(dictionary.en.forms.subtitle.register, 'i'),
  LOGIN_HEADING: new RegExp(dictionary.en.forms.title.login, 'i'),
  LOGIN_INTRO: new RegExp(dictionary.en.forms.subtitle.login, 'i'),
};

export const fieldsPlaceholder = {
  NAME: new RegExp(dictionary.en.forms.fields.name, 'i'),
  EMAIL: new RegExp(dictionary.en.forms.fields.email, 'i'),
  PASSWORD: new RegExp(dictionary.en.forms.fields.pass),
  CONFIRM_PASS: new RegExp(dictionary.en.forms.fields.confirmPassword),
};

export const buttonsName = {
  REGISTER: new RegExp(dictionary.en.forms.buttons.register, 'i'),
  LOGIN: new RegExp(dictionary.en.forms.buttons.login, 'i'),
};

export const invalidValue = {
  NAME: '1t',
  EMAIL: 'bad..email@',
  PASSWORD: 'pass1@',
  CONFIRM_PASS: 'not',
};

export const validValue = {
  NAME: 'Test',
  EMAIL: 'test@email.com',
  PASSWORD: '12345qQ!',
  CONFIRM_PASS: '12345qQ!',
};
