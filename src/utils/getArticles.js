import axios from "axios";

export const getArticles = async (query) => {
  try {
    let url = "http://ec2-35-179-90-244.eu-west-2.compute.amazonaws.com/api/articles";

    if (query) url += "?" + query;

    const response = await axios.get(url);

    return response.data.articles;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
