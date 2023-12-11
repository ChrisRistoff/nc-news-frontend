import axios from "axios";

export const getArticleById = async (id) => {
  try {
    const response = await axios.get(`http://ec2-35-179-90-244.eu-west-2.compute.amazonaws.com/api/articles/${id}`);

    console.log(response.data.article)
    return response.data.article;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
