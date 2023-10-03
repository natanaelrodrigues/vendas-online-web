import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { ProductType } from '../../../shared/types/ProductType';
import { setProductAction, setProductsAction } from '.';

export const useProductReducer = () => {
  const dispatch = useDispatch();
  const { products, product } = useAppSelector((state) => state.productReducer);

  const setProducts = (currenctProducts: ProductType[]) => {
    dispatch(setProductsAction(currenctProducts));
  };

  const setProduct = (currenctProduct?: ProductType) => {
    dispatch(setProductAction(currenctProduct));
  };

  return {
    products,
    setProducts,
    product,
    setProduct,
  };
};
