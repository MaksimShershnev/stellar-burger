import { useDispatch, useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router';
import { Preloader } from '../ui/preloader';
import {
  checkUserAuth,
  isAuthCheckedSelector,
  userDataSelector
} from '../../services/slices/userSlice';
import { useEffect } from 'react';
import { selectIsLoadingOrderData } from '../../services/slices/orderSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const isLoadingOrderData = useSelector(selectIsLoadingOrderData);
  const user = useSelector(userDataSelector);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  if (!isAuthChecked && !isLoadingOrderData) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
