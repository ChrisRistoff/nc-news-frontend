import {api} from "./axiosCrete.js";

export const getActiveUsersInTopic = async (topic) => {
  try {
    const response = await api.get(`/topics/${topic}/users`);

    return response.data.users;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
