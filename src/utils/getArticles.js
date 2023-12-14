import {api} from "./axiosCrete";

export const getArticles = async (query) => {
  try {
    let url = "/articles";

    if (query) {
      url += "?" + query;
    }

    const response = await api.get(url);

    return response.data.articles;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
