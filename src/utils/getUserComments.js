import {api} from "./axiosCrete.js";

export const getUserComments = async (username, page) => {
  const response = await api.get(`/users/${username}/comments?p=${page}`);

  return response.data;
};
