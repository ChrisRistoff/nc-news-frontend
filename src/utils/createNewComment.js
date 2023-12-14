import {api} from "./axiosCrete.js";

export const createNewComment = async (articleId, body) => {
  try {
    const newComment = await api.post(`/articles/${articleId}/comments`, {body}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return newComment;
  } catch (error) {
    console.error(error);
    throw error
  }
}
