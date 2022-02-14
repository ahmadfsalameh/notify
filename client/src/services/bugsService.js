import http, { apiEndpoint, setToken } from "./httpService";

const getBugs = async () => {
  return await http.get(`${apiEndpoint}/bugs`);
};

const createBug = async (bug) => {
  return await http.post(`${apiEndpoint}/bugs`, bug);
};

const assignBug = async (bug, assignee) => {
  return await http.patch(`${apiEndpoint}/bugs/assign/${bug}`, { assignee });
};

const getTasks = async () => {
  return await http.get(`${apiEndpoint}/bugs/me`);
};

const changeBugStatusAndIndex = async (bugId, data) => {
  return await http.patch(`${apiEndpoint}/bugs/${bugId}`, data);
};

export default {
  setToken,
  getBugs,
  createBug,
  assignBug,
  getTasks,
  changeBugStatusAndIndex,
};
