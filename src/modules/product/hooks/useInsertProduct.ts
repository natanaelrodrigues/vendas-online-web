import { useEffect, useState } from 'react';
import { InsertProduct } from '../../../shared/dtos/InsertProduct.dto';
import { connectionAPIPost } from '../../../shared/functions/connections/connectionsAPI';
import { URL_PRODUCT, URL_PRODUCT_ID } from '../../../shared/constants/urls';
import { useNavigate } from 'react-router-dom';
import { ProductRoutesEnum } from '../routes';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';
import { useRequests } from '../../../shared/hooks/useRequests';
import { MethodsEnum } from '../../../shared/enums/methods.enum';

export const useInsertProduct = (productId?: string) => {
  const navigate = useNavigate();
  const { request } = useRequests();
  const { product: productReducer, setProduct: setProductReducer } =
    useProductReducer();
  const { setNotification } = useGlobalReducer();
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const [product, setProduct] = useState<InsertProduct>({
    name: '',
    price: 0,
    image: '',
    weigth: 0,
    length: 0,
    height: 0,
    width: 0,
    diameter: 0,
  });

  useEffect(() => {
    if (
      product.name &&
      product.categoryId &&
      product.image &&
      product.price > 0
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [product]);

  useEffect(() => {
    if (productId) {
      setProductReducer(undefined);
      request(
        URL_PRODUCT_ID.replace('{productId}', `${productId}`),
        MethodsEnum.GET,
        setProductReducer,
      );
    } else {
    }
  }, [productId]);

  useEffect(() => {
    if (productReducer) {
      setProduct({
        name: productReducer.name,
        price: productReducer.price,
        image: productReducer.image,
        weigth: productReducer.weigth,
        length: productReducer.length,
        height: productReducer.height,
        width: productReducer.width,
        diameter: productReducer.diameter,
        categoryId: productReducer.category?.id,
      });
    }
  }, [productReducer]);

  const onChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    nameObject: string,
    isNumber?: boolean,
  ) => {
    setProduct({
      ...product,
      [nameObject]: isNumber ? Number(event.target.value) : event.target.value,
    });
  };

  const handleChangeSelect = (value: string) => {
    setProduct({
      ...product,
      categoryId: Number(value),
    });
  };

  const handleInsertProduct = async () => {
    setLoading(true);
    await connectionAPIPost(URL_PRODUCT, product)
      .then(() => {
        setNotification('Sucesso', 'success', 'Produto inserido com saucesso!');
        navigate(ProductRoutesEnum.PRODUCT);
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
      });
    setLoading(false);
  };

  return {
    product,
    loading,
    disableButton,
    onChangeInput,
    handleChangeSelect,
    handleInsertProduct,
  };
};
