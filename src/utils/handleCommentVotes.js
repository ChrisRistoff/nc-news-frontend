import {api} from "./axiosCrete.js";

export const commentUpVote = async (commentId, incrementCount) => {
  await api.patch(`/comments/${commentId}`, {inc_votes: incrementCount});
}

export const commentDownVote = async (commentId, decrementCount) => {
  await api.patch(`/comments/${commentId}`, {inc_votes: decrementCount});
}
