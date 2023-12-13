import {api} from "./axiosCrete.js";

export const getTopics = async () => {
  try {
    const response = await api.get("/topics");

    return response.data.topics;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
