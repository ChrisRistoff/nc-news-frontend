import {api} from "./axiosCrete.js";

export const deleteComment = async (comment_id) => {
  await api.delete(`/comments/${comment_id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
}
