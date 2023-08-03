import { NavigateFunction, redirect } from 'react-router-dom';
import { UserType } from '../../../modules/login/types/UserType';
import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants';
import { URL_USER } from '../../constants/urls';
import { connectionAPIGet } from './connectionsAPI';
import { getItemStorage, removeItemStorage, setItemStorage } from './storageProxy';
import { loginRoutesEnum } from '../../../modules/login/routes';

export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);
export const setAuthorizationToken = (token?: string) => {
  if (token) {
    setItemStorage(AUTHORIZATION_KEY, token);
  }
};
export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);

export const verifyLoggedIn = async () => {
  const token = getAuthorizationToken();

  if (!token) {
    return redirect(loginRoutesEnum.LOGIN);
  }

  const user = await connectionAPIGet<UserType>(URL_USER).catch(() => {
    unsetAuthorizationToken();
  });

  if (!user) {
    return redirect(loginRoutesEnum.LOGIN);
  }

  return null;
};

export const logout = (navigate: NavigateFunction) => {
  unsetAuthorizationToken();
  navigate(loginRoutesEnum.LOGIN);
};
