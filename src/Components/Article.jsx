import {getArticleById} from "../utils/getArticleById.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button, Card, ListGroup} from "react-bootstrap";

export const Article = () => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const article = await getArticleById(id);
        setArticle(article);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isLoading) {
      <h1>Loading...</h1>
    }

    fetchArticle();
  }, [id]);

  return (
    <div>
      <Card className="mb-3" style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title><h1>{article.title}</h1></Card.Title>
          <Card.Text>
            {article.body}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Author: {article.author}</ListGroup.Item>
          <ListGroup.Item>Topic: {article.topic}</ListGroup.Item>
          <ListGroup.Item>Created: {new Date(article.created_at).toLocaleDateString()}</ListGroup.Item>
          <ListGroup.Item>Votes: {article.votes}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Button variant="primary">Comments ({article.comment_count})</Button>
        </Card.Body>
      </Card>

    </div>
  )
}
