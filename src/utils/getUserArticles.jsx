import {api} from "./axiosCrete.js";

export const getUserArticles = async (username, page) => {
  const response = await api.get(`/users/${username}/articles?p=${page}`)

  return response.data;
}
