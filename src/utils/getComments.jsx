import axios from "axios";

export const getComments = async (articleId) => {

  try {
    let url = `http://ec2-35-179-90-244.eu-west-2.compute.amazonaws.com/api/articles/${articleId}/comments`;
    const comments = await axios.get(url);

    return comments.data.comments;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
