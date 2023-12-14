import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {createArticle} from "../utils/createArticle.js";

export const CreateArticle = () => {
  const [articleError, setArticleError] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [articleImg, setArticleImg] = useState("");

  const {topic} = useParams()

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const article_id = await createArticle(title, body, topic, articleImg);
      setArticleError("");

      setTitle("")
      setBody("")
      setArticleImg("")

      return navigate(`/articles/${article_id}`)
    } catch (error) {
      let errorMsg = error.response.data.msg
      if (error.response.status === 400) {
        errorMsg = "Body can not be empty"
      }
      setArticleError(errorMsg);
    }
  }

  return (
      <Form style={{width: '60%', margin: '0 auto'}} onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter article title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="url">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter article image"
            value={articleImg}
            onChange={(event) => setArticleImg(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="body">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter article content"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </Form.Group>
        <Button variant="outline-dark buttons" type="submit">Submit</Button>
        {articleError && <p className="text-danger">{articleError}</p>}
      </Form>
  )
}
