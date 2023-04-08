import axios from 'axios';
import { BACKEND_URL } from '../config/config';

const userUrl = `${BACKEND_URL}/api/v1/user`;

export const login = async (data) => {
  const response = axios.post(`${userUrl}/login`, data);
  console.log(response);
};

export const signup = async (data) => {
  const response = await axios.post(`${userUrl}/register`, data);
  return response.data;
};

export const logout = async () => {};
