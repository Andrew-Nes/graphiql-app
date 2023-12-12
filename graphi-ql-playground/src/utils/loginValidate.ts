import * as yup from 'yup';
import { InferType } from 'yup';

import { ERROR_MESSAGES, ErrorMessages } from '../constants/errorMessages';

const loginSchema = (errorMessages: ErrorMessages) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required(errorMessages.REQUIRED_EMAIL)
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        errorMessages.INVALID_EMAIL
      ),
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
  });
  return schema;
};

const schema = loginSchema(ERROR_MESSAGES);

export type LoginFormType = InferType<typeof schema>;
export { loginSchema };
