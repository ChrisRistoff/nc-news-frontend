import {api} from "./axiosCrete";

export const incrementVotes = async (articleId, incrementCount) => {
  const article = await api.patch(`/articles/${articleId}`, {inc_votes: incrementCount})

  return article.data.newArticle
}

export const decrementVotes = async (articleId, decrementCount) => {
  const article = await api.patch(`/articles/${articleId}`, {inc_votes: decrementCount})

  return article.data.newArticle
}
