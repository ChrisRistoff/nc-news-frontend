import axios from "axios";

export const getComments = async (articleId) => {

  try {
    let url = `https://nc-news-api-62ip.onrender.com/api/articles/${articleId}/comments`;
    const comments = await axios.get(url);

    return comments.data.comments;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
