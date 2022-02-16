import http, { apiEndpoint } from "./httpService";

const login = async (user) => {
  return await http.post(`${apiEndpoint}/auth`, user);
};

const storeToken = (token) => {
  localStorage.setItem("token", token);
};

const deleteToken = () => {
  localStorage.removeItem("token");
};

const getToken = () => {
  return localStorage.getItem("token");
};

export default {
  login,
  storeToken,
  getToken,
  deleteToken,
};
