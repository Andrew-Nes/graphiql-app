import * as yup from 'yup';
import { InferType } from 'yup';

import { ERROR_MESSAGES, ErrorMessages } from '../constants/errorMessages';

const endpointSchema = (errorMessages: ErrorMessages) => {
  const schema = yup.object().shape({
    endpoint: yup
      .string()
      .required(errorMessages.API_ENDPOINT_REQUIRED)
      .matches(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
        errorMessages.API_ENDPOINT_VALID
      ),
  });
  return schema;
};

const schema = endpointSchema(ERROR_MESSAGES);

export type EndpointFormType = InferType<typeof schema>;
export { endpointSchema };
