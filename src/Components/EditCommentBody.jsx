import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {editCommentBody} from "../utils/editCommentBody.js";

export const EditCommentBody = ({comment_id, comments, setComments, setToggle}) => {
  let index;
  for (let i = 0; i < comments.length; i++) {
    if (comment_id === comments[i].comment_id) {
      index = i;
      break;
    }
  }

  const [body, setBody] = useState(comments[index].body);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedComment = await editCommentBody(comment_id, body);

      const commentsCopy = [...comments];
      commentsCopy[index] = updatedComment;
      setComments(commentsCopy);
      setToggle(false);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Group controlId="formCommentBody">
        <Form.Label>Comment Body</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter comment body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </Form.Group>

      <Button variant="outline-dark buttons" type="submit">Submit</Button>
    </Form>
  );
}
