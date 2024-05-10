import { ChangeEvent, useState } from 'react';

type InputValues = {
  [key: string]: string;
};

export const useForm = (inputValues: InputValues) => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
};
