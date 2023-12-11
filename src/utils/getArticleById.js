import axios from "axios";

export const getArticleById = async (id) => {
  try {
    const response = await axios.get(`https://nc-news-api-62ip.onrender.com/api/articles/${id}`);

    console.log(response.data.article)
    return response.data.article;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
