import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectConstructorItems,
  clearConstructorItems
} from '../../services/slices/burgerConstructorSlice';
import {
  selectModalData,
  fetchOrderBurger,
  selectRequest,
  clearOrderModalData
} from '../../services/slices/orderSlice';
import { userDataSelector } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectRequest);
  const orderModalData = useSelector(selectModalData);
  const user = useSelector(userDataSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) return navigate('/login');

    const bunId = constructorItems.bun._id;
    const ingredientsId = constructorItems.ingredients.reduce(
      (acc: string[], ingredient) => [...acc, ingredient._id],
      []
    );

    const orderData = [bunId, ...ingredientsId, bunId];
    dispatch(fetchOrderBurger(orderData)).finally(() =>
      dispatch(clearConstructorItems())
    );
  };
  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
