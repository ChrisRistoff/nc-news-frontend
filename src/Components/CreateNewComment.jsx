import {useState} from "react";
import {createNewComment} from "../utils/createNewComment.js";
import {Form} from "react-bootstrap";

export const CreateNewComment = ({ articleId, comments, setComment }) => {
  const [commentError, setCommentError] = useState("");
  const [body, setBody] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true)
      const comment = await createNewComment(articleId, body);
      setCommentError("");

      setBody("")

      if (comments) {
        setComment([comment.data.comment, ...comments])
      }

      setLoading(false)
      setSuccess(true);

    } catch (error) {
      setSuccess(false)
      setLoading(false)
      console.log(error);
      setCommentError(error.response.data.msg);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formComment">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter comment"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </Form.Group>
      <button className="btn btn-primary">Submit</button>
      {commentError && <p className="text-danger">{commentError}</p>}
      {success && <p className="text-success">Comment successfully posted.</p>}
      {loading && <p className="text-info">Loading...</p>}
  </Form>
  );
}
