import http, { setToken, apiEndpoint } from "./httpService";

const getNotifications = async () => {
  return await http.get(`${apiEndpoint}/notifications`);
};

const markRead = async () => {
  return await http.get(`${apiEndpoint}/notifications/read`);
};

export default {
  setToken,
  getNotifications,
  markRead,
};
