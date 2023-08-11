import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { OrderType } from '../../../shared/types/OrderTypes';
import { setOrdersAction } from '.';

export const useOrderReducer = () => {
  const dispatch = useDispatch();
  const { orders } = useAppSelector((state) => state.orderReducer);

  const setOrders = (orders: OrderType[]) => {
    dispatch(setOrdersAction(orders));
  };

  return {
    orders,
    setOrders,
  };
};
