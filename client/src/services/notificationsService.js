import http, { setToken, apiEndpoint } from "./httpService";

const getNotifications = async () => {
  return await http.get(`${apiEndpoint}/notifications`);
};

export default {
  setToken,
  getNotifications,
};
