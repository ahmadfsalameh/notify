import http, { apiEndpoint, setToken } from "./httpService";

const getTeams = async () => {
  return await http.get(`${apiEndpoint}/teams`);
};

const createTeam = async (data) => {
  return await http.post(`${apiEndpoint}/teams`, data);
};

const getMembers = async (id) => {
  return await http.get(`${apiEndpoint}/teams/members/${id}`);
};

const deleteTeam = async (id) => {
  return await http.delete(`${apiEndpoint}/teams/${id}`);
};

export default {
  setToken,
  getTeams,
  createTeam,
  getMembers,
  deleteTeam,
};
