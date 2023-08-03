import { useEffect, useState } from 'react';
import { InsertProduct } from '../../../shared/dtos/InsertProduct.dto';
import { connectionAPIPost } from '../../../shared/functions/connections/connectionsAPI';
import { URL_PRODUCT } from '../../../shared/constants/urls';
import { useNavigate } from 'react-router-dom';
import { ProductRoutesEnum } from '../routes';
import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';

export const useInsertProduct = () => {
  const navigate = useNavigate();
  const { setNotification } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const [product, setProduct] = useState<InsertProduct>({
    name: '',
    price: 0,
    image: '',
  });

  useEffect(() => {
    if (product.name && product.categoryId && product.image && product.price > 0) {
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
