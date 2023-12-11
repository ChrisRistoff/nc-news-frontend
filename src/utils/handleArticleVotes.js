import axios from "axios";

export const incrementVotes = async (articleId) => {
  const article = await axios.patch(`https://nc-news-api-62ip.onrender.com/api/articles/${articleId}` , { inc_votes: 1 })

  console.log(article.data.article)
  return article.data.newArticle
}

export const decrementVotes = async (articleId) => {
  const article = await axios.patch(`https://nc-news-api-62ip.onrender.com/api/articles/${articleId}` , { inc_votes: -1 })

  console.log(article.data.article)
  return article.data.newArticle
}
