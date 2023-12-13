import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import {deleteComment} from "../utils/deleteComment.js";

export const DeleteComment = ({ comment_id, comments, setComments }) => {
  const [commentError, setCommentError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [oldComments] = useState([...comments]);

  const handleDelete = async () => {
    try {
      const filteredComments = comments.filter(comment => comment.comment_id !== comment_id);
      setComments(filteredComments);
      setLoading(true);
      await deleteComment(comment_id);
      setLoading(false);
      setCommentError("");

      setShowModal(false)
    } catch (error) {
      setComments(oldComments);

      let index = 0
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].comment_id === comment_id) {
          index = i
          break;
        }
      }

      comments[index].error= "Failed to delete comment";
      setLoading(false)
      setShowModal(false)
      setCommentError(error.response.data.msg);
    }
  };

  const handleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div>
      {showModal && <div
        className="modal show"
        style={{display: 'block', position: 'initial'}}
      >
        <Modal.Dialog>
          <Modal.Header closeButton onClick={handleModal}>
            <Modal.Title>Are you sure you want to delete the comment?</Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="outline-dark" onClick={handleModal}>Close</Button>
            <Button variant="outline-danger" onClick={handleDelete}>Delete comment</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>}
      <Button variant="danger" onClick={handleModal}>
        Delete
      </Button>
      {commentError && <p className="text-danger">{commentError}</p>}
      {loading && <p className="text-danger">Deleting comment...</p>}
    </div>
  )
}
