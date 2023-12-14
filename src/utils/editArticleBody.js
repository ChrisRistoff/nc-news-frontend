import {api} from "./axiosCrete.js";

export const editArticleBody = async (article_id, body) => {
  const newArticle = await api.patch(`/articles/${article_id}/edit`, {body: body}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return newArticle;
}
