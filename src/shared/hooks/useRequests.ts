import { useState } from 'react';
import ConnectionAPI, {
  MethodType,
  connectionAPIPost,
} from '../functions/connections/connectionsAPI';
import { URL_AUTH } from '../constants/urls';
import { ERROR_INVALID_PASSWORD } from '../constants/errosStatus';
import { NavigateFunction } from 'react-router-dom';
import { AuthType } from '../../modules/login/types/AuthType';
import { setAuthorizationToken } from '../functions/connections/auth';
import { FirstScreenEnum } from '../../modules/firstScreen/routes';
import { useGlobalReducer } from '../../store/reducers/globalReducer/useGlobalReducer';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const { setNotification, setUser } = useGlobalReducer();

  const request = async <T>(
    url: string,
    method: MethodType,
    saveGlobal?: (object: T) => void,
    body?: unknown,
    message?: string,
  ): Promise<T | undefined> => {
    setLoading(true);
    const returnData: T | undefined = await ConnectionAPI.connect<T>(
      url,
      method,
      body,
    )
      .then((result) => {
        if (saveGlobal) {
          saveGlobal(result);
        }
        if (message) {
          setNotification('Sucesso', 'success', message);
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

  const authRequest = async (
    navigate: NavigateFunction,
    body: unknown,
  ): Promise<void> => {
    setLoading(true);
    await connectionAPIPost<AuthType>(URL_AUTH, body)
      .then((result) => {
        setUser(result.user);
        setAuthorizationToken(result.accessToken);
        navigate(FirstScreenEnum.FIRST_SCREEN);
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
