import {api} from "./axiosCrete";

export const getArticleById = async (id) => {
  try {
    const response = await api.get(`/articles/${id}`);

    return response.data.article;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
