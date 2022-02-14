import http, { apiEndpoint, setToken } from "./httpService";

const sendInvite = async (data) => {
  return await http.post(`${apiEndpoint}/invites`, data);
};

const getInvite = async (id) => {
  return await http.get(`${apiEndpoint}/invites/${id}`);
};

const acceptInvite = async (id) => {
  return await http.post(`${apiEndpoint}/invites/${id}`);
};

export default {
  setToken,
  sendInvite,
  getInvite,
  acceptInvite,
};
