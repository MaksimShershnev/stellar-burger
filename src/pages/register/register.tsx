import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { fetchRegisterUser } from '../../services/slices/userSlice';
import { useForm } from '../../hooks/useForm';

export const Register: FC = () => {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
    name: ''
  });
  const dispatch = useDispatch();

  const userData = {
    name: values.name,
    email: values.email,
    password: values.password
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchRegisterUser(userData));
  };

  return (
    <RegisterUI
      errorText=''
      email={values.email}
      userName={values.name}
      password={values.password}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};
