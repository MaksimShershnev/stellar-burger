import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserOrders,
  selectUserOrders
} from '../../services/slices/orderSlice/orderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const userOrders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const orders: TOrder[] = userOrders;

  return <ProfileOrdersUI orders={orders} />;
};
