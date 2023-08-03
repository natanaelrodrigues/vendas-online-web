import { useState } from 'react';
import { useGlobalContext } from './useGlobalContext';
import ConnectionAPI, {
  MethodType,
  connectionAPIPost,
} from '../functions/connections/connectionsAPI';
import { URL_AUTH } from '../constants/urls';
import { ERROR_INVALID_PASSWORD } from '../constants/errosStatus';
import { useNavigate } from 'react-router-dom';
import { ProductRoutesEnum } from '../../modules/product/routes';
import { AuthType } from '../../modules/login/types/AuthType';
import { setAuthorizationToken } from '../functions/connections/auth';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const { setNotification, setUser } = useGlobalContext();

  const request = async <T>(
    url: string,
    method: MethodType,
    saveGlobal?: (object: T) => void,
    body?: unknown,
  ): Promise<T | undefined> => {
    setLoading(true);
    const returnData: T | undefined = await ConnectionAPI.connect<T>(url, method, body)
      .then((result) => {
        if (saveGlobal) {
          saveGlobal(result);
        }
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
        setUser(result.user);
        setAuthorizationToken(result.accessToken);
        location.href = '/';
      })
      .catch(() => {
        setNotification(ERROR_INVALID_PASSWORD, 'error');
      });

    setLoading(false);
  };

  return {
    loading,
    request,
    authRequest,
  };
};
