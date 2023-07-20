import axios from 'axios';
import { useState } from 'react';
import { useGlobalContext } from './useGlobalContext';
import { connectionAPIPost } from '../functions/connections/connectionsAPI';
import { URL_AUTH } from '../constants/urls';
import { ERROR_INVALID_PASSWORD } from '../constants/errosStatus';
import { useNavigate } from 'react-router-dom';
import { ProductRoutesEnum } from '../../modules/product/routes';
import { AuthType } from '../../modules/login/types/AuthType';
import { setAuthorizationToken } from '../functions/connections/auth';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const { setNotification } = useGlobalContext();
  const navigate = useNavigate();

  const getRequest = async (url: string) => {
    setLoading(true);
    const returnData = await axios({
      method: 'get',
      url: url,
    })
      .then((result) => {
        return result.data;
      })
      .catch(() => {
        setNotification('error', 'error');
      });

    setLoading(false);
    return returnData;
  };

  const postRequest = async <T>(url: string, body: unknown): Promise<T | undefined> => {
    setLoading(true);
    const returnData = await connectionAPIPost<T>(url, body)
      .then((result) => {
        return result;
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
        return undefined;
      });

    setLoading(false);
    return returnData;
  };

  const authRequest = async (body: unknown): Promise<void> => {
    setLoading(true);
    await connectionAPIPost<AuthType>(URL_AUTH, body)
      .then((result) => {
        setAuthorizationToken(result.accessToken);
        navigate(ProductRoutesEnum.PRODUCT);
      })
      .catch(() => {
        setNotification(ERROR_INVALID_PASSWORD, 'error');
      });

    setLoading(false);
  };

  return {
    loading,
    getRequest,
    postRequest,
    authRequest,
  };
};
