import axios from "axios";
import configs from "../config";

export const apiEndpoint = configs.apiEndpoint;

axios.interceptors.response.use(null, (error) => {
  const { response } = error;

  const expectedError =
    response && response?.status >= 400 && response?.status < 500;
  if (!expectedError) console.log("An unexpected error!");

  return Promise.reject(error);
});

export const setToken = (token) => {
  axios.defaults.headers.common["x-auth-token"] = token;
};

export default {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  delete: axios.delete,
};
