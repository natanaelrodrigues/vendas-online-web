import { useEffect, useState } from 'react';
import { InsertProduct } from '../../../shared/dtos/InsertProduct.dto';
import { connectionAPIPost } from '../../../shared/functions/connections/connectionsAPI';
import { URL_PRODUCT } from '../../../shared/constants/urls';
import { useNavigate } from 'react-router-dom';
import { ProductRoutesEnum } from '../routes';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';

export const useInsertProduct = () => {
  const navigate = useNavigate();
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
