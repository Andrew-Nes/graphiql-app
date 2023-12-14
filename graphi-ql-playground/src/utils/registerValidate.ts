import * as yup from 'yup';
import { InferType } from 'yup';

import { ERROR_MESSAGES_RU, ErrorMessages } from '../constants/errorMessages';

const registerSchema = (errorMessages: ErrorMessages) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required(errorMessages.REQUIRED_EMAIL)
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        errorMessages.INVALID_EMAIL
      ),
    name: yup
      .string()
      .required(errorMessages.REQUIRED_NAME)
      .matches(/[A-Za-z]{2}(.*)/, errorMessages.SHORT_NAME),
    password: yup
      .string()
      .required(errorMessages.REQUIRED_PASSWORD)
      .matches(/\d/, errorMessages.PASSWORD_DIGIT_CONTAIN)
      .matches(/\p{L}/gu, errorMessages.PASSWORD_LETTER_CONTAIN)
      .matches(
        /[-=+!@"№;:?#$%_()><,.|{}'`~/\\^&[*\]]/,
        errorMessages.PASSWORD_SPECIAL_CH_CONTAIN
      )
      .min(8, errorMessages.SHORT_PASSWORD),
    confirmPassword: yup
      .string()
      .required(errorMessages.REQUIRED_CONFIRM_PASS)
      .test(
        'is confirm password match',
        errorMessages.MATCH_CONFIRM_PASS,
        (value, context) => context.parent.password === value
      ),
  });
  return schema;
};

const schema = registerSchema(ERROR_MESSAGES_RU);

export type RegisterFormType = InferType<typeof schema>;
export { registerSchema };
