import {api} from "./axiosCrete.js";

export const deleteArticle = async (id) => {
  await api.delete(`/articles/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  return
}
