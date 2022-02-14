import http, { apiEndpoint, setToken } from "./httpService";

const getTeams = async () => {
  return await http.get(`${apiEndpoint}/teams`);
};

const createTeam = async (data) => {
  return await http.post(`${apiEndpoint}/teams`, data);
};

export default {
  setToken,
  getTeams,
  createTeam,
};
