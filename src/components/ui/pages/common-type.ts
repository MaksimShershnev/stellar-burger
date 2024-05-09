import { ChangeEvent, SyntheticEvent } from 'react';

export type PageUIProps = {
  errorText: string | undefined;
  email: string;
  handleSubmit: (e: SyntheticEvent) => void;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};
