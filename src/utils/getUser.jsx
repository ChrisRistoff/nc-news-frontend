import {api} from "./axiosCrete.js";

export const getUser = async (username) => {
  const response = await api.get(`/users/${username}`);

  return response.data;
}
