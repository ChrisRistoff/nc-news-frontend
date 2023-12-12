import {api} from "./axiosCrete.js";

export const loginUser = async (username, password) => {
  try {
    const user = await api.post(`/users/signin`, {
      username: username,
      password: password
    });

    localStorage.setItem("token", user.data.token);
    return
  } catch (error) {
    console.log(error);
    throw error;
  }
}
