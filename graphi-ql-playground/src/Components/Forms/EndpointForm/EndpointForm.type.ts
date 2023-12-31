import { Dispatch, SetStateAction } from 'react';

export interface EndpointFormProps {
  endpoint: string;
  endpointSetter: Dispatch<SetStateAction<string>>;
}

export interface EndpointFormFields {
  endpointInput: string;
}
