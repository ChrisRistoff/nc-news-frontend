import {api} from "./axiosCrete";

export const getComments = async (articleId, page) => {

  try {
    let url = `/articles/${articleId}/comments?p=${page}`;
    const comments = await api.get(url);

    return comments.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
