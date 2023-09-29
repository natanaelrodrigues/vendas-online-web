import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ProductType } from '../../../shared/types/ProductType';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';
import { URL_PRODUCT, URL_PRODUCT_ID } from '../../../shared/constants/urls';
import { ProductRoutesEnum } from '../routes';

export const useProduct = () => {
  const { products, setProducts } = useProductReducer();
  const [productsFiltered, setProductsFiltered] = useState<ProductType[]>([]);
  const { request } = useRequests();

  useEffect(() => {
    setProductsFiltered([...products]);
  }, [products]);

  useEffect(() => {
    request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts);
  }, []);

  const handleOnClickInsert = () => {
    Navigate(ProductRoutesEnum.PRODUCT_INSERT);
  };

  const onSearch = (value: string) => {
    if (!value) {
      setProductsFiltered([...products]);
    } else {
      setProductsFiltered([
        ...productsFiltered.filter((product) => product.name.includes(value)),
      ]);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    await request(
      URL_PRODUCT_ID.replace('{productId}', `${productId}`),
      MethodsEnum.DELETE,
    );
    await request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts);
  };

  return {
    productsFiltered,
    handleOnClickInsert,
    onSearch,
    handleDeleteProduct,
  };
};
