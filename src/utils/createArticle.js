import {api} from "./axiosCrete.js";

export const createArticle = async (title, body, topic, article_img_url) => {
  const article = await api.post("/articles", {
      title,
      body,
      topic,
      article_img_url
    },
    {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });

  return article.data.article.article_id;
}
