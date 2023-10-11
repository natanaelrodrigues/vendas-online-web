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

const DEFAULT_PRODUCT = {
  name: '',
  price: 0,
  image: '',
  weigth: 0,
  length: 0,
  height: 0,
  width: 0,
  diameter: 0,
};

export const useInsertProduct = (productId?: string) => {
  const navigate = useNavigate();
  const { request, loading: loadingRequest } = useRequests();
  const { product: productReducer, setProduct: setProductReducer } =
    useProductReducer();
  const { setNotification } = useGlobalReducer();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const [product, setProduct] = useState<InsertProduct>(DEFAULT_PRODUCT);
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
      setIsEdit(true);
      request(
        URL_PRODUCT_ID.replace('{productId}', `${productId}`),
        MethodsEnum.GET,
        setProductReducer,
      );
    } else {
      setIsEdit(false);
      setProductReducer(undefined);
      setProduct(DEFAULT_PRODUCT);
    }
  }, [productId]);

  useEffect(() => {
    if (productReducer) {
      setProduct({
        name: productReducer.name,
        price: productReducer.price,
        image: productReducer.image,
        weight: productReducer.weight,
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
    if (productId) {
      await request(
        URL_PRODUCT_ID.replace('{productId}', productId),
        MethodsEnum.PUT,
        undefined,
        product,
      );
    } else {
      await request(URL_PRODUCT, MethodsEnum.POST, undefined, product);
    }
    navigate(ProductRoutesEnum.PRODUCT);
  };

  const handleOnClickCancel = () => {
    navigate(ProductRoutesEnum.PRODUCT);
  };

  return {
    product,
    isEdit,
    loading,
    loadingRequest,
    disableButton,
    onChangeInput,
    handleChangeSelect,
    handleInsertProduct,
    handleOnClickCancel,
  };
};
