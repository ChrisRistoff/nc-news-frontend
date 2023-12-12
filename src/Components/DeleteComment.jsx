import {Button} from "react-bootstrap";
import {useState} from "react";
import {deleteComment} from "../utils/deleteComment.js";

export const DeleteComment = ({ comment_id, comments, setComments }) => {
  const [commentError, setCommentError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteComment(comment_id);
      setLoading(false);
      setCommentError("");
      const filteredComments = comments.filter(comment => comment.comment_id !== comment_id);

      setComments(filteredComments);
    } catch (error) {
      setLoading(false)
      setCommentError(error.response.data.msg);
    }
  };

  return (
    <div>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
      {commentError && <p className="text-danger">{commentError}</p>}
      {loading && <p className="text-danger">Deleting comment...</p>}
    </div>
  )
}
