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

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectRequest);
  const orderModalData = useSelector(selectModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const bunId = constructorItems.bun._id;
    const ingredientsId = constructorItems.ingredients.reduce(
      (acc: string[], ingredient) => [...acc, ingredient._id],
      []
    );

    const orderData = [bunId, ...ingredientsId, bunId];
    dispatch(fetchOrderBurger(orderData));
  };
  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
    dispatch(clearConstructorItems());
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
