import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  clearFeeds,
  fetchFeeds,
  selectOrders
} from '../../services/slices/feedsSlice/feedsSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(selectOrders);

  const refreshFeeds = () => {
    dispatch(clearFeeds());
    dispatch(fetchFeeds());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => refreshFeeds()} />;
};
