import axios from 'axios';
import { BACKEND_URL } from '../config/config';

const userUrl = `${BACKEND_URL}/api/v1/user`;

export const login = async (data) => {
  try {
    const response = await axios.post(`${userUrl}/login`, data);
    return response.data;
  } catch (err) {
    return {
      success: err.response.data.success,
      message: err.response.data.error,
    };
  }
};

export const signup = async (data) => {
  try {
    const response = await axios.post(`${userUrl}/register`, data);
    return response.data;
  } catch (err) {
    return {
      success: err.response.data.success,
      message: err.response.data.error,
    };
  }
};

export const logout = async () => {};
