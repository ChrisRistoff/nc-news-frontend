import {api} from "./axiosCrete";

export const getComments = async (articleId) => {

  try {
    let url = `/articles/${articleId}/comments`;
    const comments = await api.get(url);

    return comments.data.comments;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
