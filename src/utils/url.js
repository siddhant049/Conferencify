import { BACKEND_URL } from '../config/config';
const userUrl = `${BACKEND_URL}/api/v1/user`;

export const urlMap = {
  login: `${userUrl}/login`,
  register: `${userUrl}/register`,
  userProfile: `${userUrl}/me`,
};
