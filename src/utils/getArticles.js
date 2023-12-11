import axios from "axios";

export const getArticles = async (query) => {
  try {
    let url = "https://nc-news-api-62ip.onrender.com/api/articles";

    if (query) url += "?" + query;

    const response = await axios.get(url);

    return response.data.articles;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
