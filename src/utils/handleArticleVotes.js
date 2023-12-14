import {api} from "./axiosCrete";

export const incrementVotes = async (articleId) => {
  const article = await api.patch(`/articles/${articleId}`, {inc_votes: 1})

  return article.data.newArticle
}

export const decrementVotes = async (articleId) => {
  const article = await api.patch(`/articles/${articleId}`, {inc_votes: -1})

  return article.data.newArticle
}
