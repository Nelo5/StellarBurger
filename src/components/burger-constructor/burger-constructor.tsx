import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  clearBurgerConstructor,
  selectBurgerConstructor
} from '../../services/burger_constructor';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearOrder,
  createOrder,
  selectIsOrderLoading,
  selectOrder
} from '../../services/order';
import { useNavigate } from 'react-router-dom';
import { selectIsAuth } from '../../services/user';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectBurgerConstructor);

  const orderRequest = useSelector(selectIsOrderLoading);

  const orderModalData = useSelector(selectOrder);
  const isAuth = useSelector(selectIsAuth);

  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const { bun, ingredients } = constructorItems;
    const orderData: string[] = [
      bun?._id!,
      ...ingredients.map((ingredient) => ingredient._id),
      bun?._id!
    ];
    dispatch(createOrder(orderData));
  };
  const closeOrderModal = () => {
    navigate('/');
    dispatch(clearOrder());
    dispatch(clearBurgerConstructor());
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
