import axios from 'axios';
import * as helper from '../utils/auth';
import { urlMap } from '../utils/url';

export const login = async (data) => {
  try {
    const response = await axios.post(urlMap.login, data);
    console.log(response.data);
    helper.login(response.data.token);
    return response.data;
  } catch (err) {
    return {
      success: err.response.data.success,
      message: err.response.data.error,
    };
  }
};

export const getData = async (url, data) => {
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${helper.getToken()}` },
    });
    return response.data;
  } catch (err) {
    return {
      success: err.response.data.success,
      message: err.response.data.error,
    };
  }
};

export const postData = async (url, data) => {
  try {
    const response = await axios.post(url, data, {
      headers: { Authorization: `Bearer ${helper.getToken()}` },
    });
    return response.data;
  } catch (err) {
    return {
      success: err.response.data.success,
      message: err.response.data.error,
    };
  }
};
