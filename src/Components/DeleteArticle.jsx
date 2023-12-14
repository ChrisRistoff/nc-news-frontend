import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {deleteArticle} from "../utils/deleteArticle.js";
import {useNavigate} from "react-router-dom";

export const DeleteArticle = ({ article_id }) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteArticle(article_id);

      setError("");
      setShowModal(false)
      navigate(`/`)
    } catch (error) {
      setError("There was an error trying to delete your article, please try again.");
    }

      setShowModal(false)
    }

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
            <Modal.Title>Are you sure you want to delete the article?</Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="outline-dark" onClick={handleModal}>Close</Button>
            <Button variant="outline-danger" onClick={handleDelete}>Delete article</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>}
      <Button variant="danger" onClick={handleModal}>
        Delete article
      </Button>
      {error && <p className="text-danger">{error}</p>}
    </div>
  )
}
