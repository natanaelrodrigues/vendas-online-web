import { UserType } from '../../modules/login/types/UserType';
import { AddressType } from './AddressType';
import { OrdersProductType } from './OrdersProductType';
import { PaymentType } from './PaymentType';

export interface OrderType {
  id: number;
  date: string;
  userId: number;
  user: UserType;
  amountProducs?: number;
  payment?: PaymentType;
  address?: AddressType;
  ordersProduct?: OrdersProductType[];
}
