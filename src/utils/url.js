import { BACKEND_URL } from '../config/config';
const userUrl = `${BACKEND_URL}/api/v1/user`;
const conferenceUrl = `${BACKEND_URL}/api/v1/conference`;

export const urlMap = {
  login: `${userUrl}/login`,
  register: `${userUrl}/register`,
  userProfile: `${userUrl}/me`,
  createConference: `${conferenceUrl}/create`,
  getSingleConference: `${conferenceUrl}/single`,
  getAllConferences: `${conferenceUrl}/all`,
  submitPaper: `${conferenceUrl}/paper/submit`,
};
