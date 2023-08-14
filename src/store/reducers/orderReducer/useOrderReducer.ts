import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { OrderType } from '../../../shared/types/OrderTypes';
import { setOrderAction, setOrdersAction } from '.';

export const useOrderReducer = () => {
  const dispatch = useDispatch();
  const { orders, order } = useAppSelector((state) => state.orderReducer);

  const setOrders = (orders: OrderType[]) => {
    dispatch(setOrdersAction(orders));
  };

  const setOrder = (order: OrderType) => {
    dispatch(setOrderAction(order));
  };


  return {
    orders,
    order,
    setOrders,
    setOrder,
  };
};
