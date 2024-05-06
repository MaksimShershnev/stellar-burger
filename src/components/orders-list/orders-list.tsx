import { FC, memo } from 'react';

import { OrdersListProps } from './type';
import { OrdersListUI, Preloader } from '@ui';
import { selectIsLoading } from '../../services/slices/orderSlice';
import { useSelector } from '../../services/store';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const isLoading = useSelector(selectIsLoading);

  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (isLoading) {
    return <Preloader />;
  }

  if (orders.length === 0) {
    return (
      <p className='pt-20 text text_type_main-medium text_color_inactive'>
        Заказы отсутствуют
      </p>
    );
  }

  return <OrdersListUI orderByDate={orderByDate} />;
});
