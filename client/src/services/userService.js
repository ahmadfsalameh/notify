import http, { apiEndpoint, setToken } from "./httpService";

const register = async (user) => {
  return await http.post(`${apiEndpoint}/users`, user);
};

const getCurrentUser = async () => {
  try {
    const { data: user } = await http.get(`${apiEndpoint}/users/me`);
    return user;
  } catch (ex) {
    return null;
  }
};

export default {
  setToken,
  register,
  getCurrentUser,
};
