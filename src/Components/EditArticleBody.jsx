import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {editArticleBody} from "../utils/editArticleBody.js";
import {useNavigate} from "react-router-dom";

export const EditArticleBody = ({ article, setArticle }) => {
  const [body, setBody] = useState(article.body);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedArticle = await editArticleBody(article.article_id, body);
      setArticle(updatedArticle.data.article);

      navigate(0);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Group controlId="formArticleBody">
        <Form.Label>Article Body</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter article body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </Form.Group>

      <Button variant="outline-dark buttons" type="submit">Submit</Button>
    </Form>
  );
}
