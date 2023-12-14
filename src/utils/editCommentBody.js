import {api} from "./axiosCrete.js";

export const editCommentBody = async (commentId, body) => {
  const newComment = await api.patch(`/comments/${commentId}/edit`, {body: body}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return newComment.data.comment;
}
