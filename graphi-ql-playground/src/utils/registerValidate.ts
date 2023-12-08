import * as yup from 'yup';
import { InferType } from 'yup';

import { ERROR_MESSAGES } from '../constants/errorMessages';

export type RegisterFormType = InferType<typeof registerSchema>;

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_EMAIL)
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, ERROR_MESSAGES.INVALID_EMAIL),
  name: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_NAME)
    .min(2, ERROR_MESSAGES.SHORT_NAME),
  password: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_PASSWORD)
    .matches(/\d/, ERROR_MESSAGES.PASSWORD_DIGIT_CONTAIN)
    .matches(/\p{L}/gu, ERROR_MESSAGES.PASSWORD_LETTER_CONTAIN)
    .matches(
      /[-=+!@"№;:?#$%_()><,.|{}'`~/\\^&[*\]]/,
      ERROR_MESSAGES.PASSWORD_SPECIAL_CH_CONTAIN
    )
    .min(8, ERROR_MESSAGES.SHORT_PASSWORD),
});

export { registerSchema };
