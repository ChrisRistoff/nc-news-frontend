import {api} from "./axiosCrete.js";

export const commentUpVote = async (commentId) => {
  await api.patch(`/comments/${commentId}`, {inc_votes: 1});

  return
}

export const commentDownVote = async (commentId) => {
  await api.patch(`/comments/${commentId}`, {inc_votes: -1});

  return
}
