import {api} from "./axiosCrete.js";

export const registerUser = async (username, name, avatarUrl, password) => {

  try {
    const user = await api.post(`/users/signup`, {
      username: username,
      name: name,
      avatar_url: avatarUrl,
      password: password
    });

    localStorage.setItem("token", user.data.token);
    return
  } catch (error) {
    console.log(error);
    throw error;
  }
}
