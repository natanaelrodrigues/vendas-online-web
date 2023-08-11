import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { ProductType } from '../../../shared/types/ProductType';
import { setProductsAction } from '.';

export const useProductReducer = () => {
  const dispatch = useDispatch();
  const { products } = useAppSelector((state) => state.productReducer);

  const setProducts = (products: ProductType[]) => {
    dispatch(setProductsAction(products));
  };

  return {
    products,
    setProducts,
  };
};
