import { FC, memo } from 'react';

import { OrdersListProps } from './type';
import { OrdersListUI, Preloader } from '@ui';
import { requestStatus } from '../../services/slices/orderSlice/orderSlice';
import { useSelector } from '../../services/store';
import { RequestStatus } from '@utils-types';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const status = useSelector(requestStatus);

  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (status === RequestStatus.loading && orderByDate.length === 0) {
    return <Preloader />;
  }

  if (orderByDate.length === 0) {
    return (
      <p className='pt-20 text text_type_main-medium text_color_inactive'>
        Заказы отсутствуют
      </p>
    );
  }

  return <OrdersListUI orderByDate={orderByDate} />;
});
