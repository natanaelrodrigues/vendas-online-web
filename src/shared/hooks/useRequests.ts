import axios from 'axios';
import { useState } from 'react';
import { useGlobalContext } from './useGlobalContext';
import { connectionAPIPost } from '../functions/connections/connectionsAPI';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const { setNotification } = useGlobalContext();

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

  const postRequest = async (url: string, body: unknown) => {
    setLoading(true);
    const returnData = await connectionAPIPost(url, body)
      .then((result) => {
        return result;
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
      });

    setLoading(false);
    return returnData;
  };

  return {
    loading,
    getRequest,
    postRequest,
  };
};
