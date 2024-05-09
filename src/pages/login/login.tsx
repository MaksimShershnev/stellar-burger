import { FC, SyntheticEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { fetchLoginUser } from '../../services/slices/userSlice';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      fetchLoginUser({ email: values.email, password: values.password })
    );
  };

  return (
    <LoginUI
      errorText=''
      email={values.email}
      password={values.password}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};
