import http, { apiEndpoint, setToken } from "./httpService";

const getApps = async () => {
  return await http.get(`${apiEndpoint}/apps`);
};

const getAppsWithBugs = async () => {
  return await http.get(`${apiEndpoint}/apps/bugs`);
};

const createApp = async (data) => {
  return await http.post(`${apiEndpoint}/apps`, data);
};

const deleteApp = async (id) => {
  return await http.delete(`${apiEndpoint}/apps/${id}`);
};

export default {
  setToken,
  getApps,
  createApp,
  deleteApp,
  getAppsWithBugs,
};
