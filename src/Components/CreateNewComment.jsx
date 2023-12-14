import {useState} from "react";
import {createNewComment} from "../utils/createNewComment.js";
import {Button, Form} from "react-bootstrap";

export const CreateNewComment = ({ articleId, comments, setComments }) => {
  const [commentError, setCommentError] = useState("");
  const [body, setBody] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(comments)

    try {
      setLoading(true)
      const newComment = await createNewComment(articleId, body);
      setCommentError("");

      setBody("")

      if (comments) {
        setComments([newComment.data.comment, ...comments])
      }

      setLoading(false)
      setSuccess(true);

    } catch (error) {
      setLoading(false)
      setSuccess(false)
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
      <Button variant="outline-dark buttons" type="submit">Submit</Button>
      {commentError && <p className="text-danger">{commentError}</p>}
      {success && <p className="text-success">Comment successfully posted.</p>}
      {loading && <p className="text-info">Submitting comment...</p>}
  </Form>
  );
}
