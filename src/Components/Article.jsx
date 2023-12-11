import {getArticleById} from "../utils/getArticleById.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button, Card, ListGroup} from "react-bootstrap";
import {Comments} from "./Comments.jsx";
import {getComments} from "../utils/getComments.js";
import {incrementVotes, decrementVotes} from "../utils/handleArticleVotes.js";

export const Article = () => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState(null);
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

  const loadComments = async () => {
    try {
      const comments = await getComments(id);
      setComments(comments);
    } catch (error) {
      console.log(error);
    }
  }

  const handleIncrementVote = async () => {
    try {
      const comments = article.comment_count;
      const updatedArticle = await incrementVotes(article.article_id);
      updatedArticle.comment_count = comments;

      setArticle(updatedArticle);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrementVote = async () => {
    try {
      const comments = article.comment_count;
      const updatedArticle = await decrementVotes(article.article_id);
      updatedArticle.comment_count = comments;

      setArticle(updatedArticle);
    } catch (error) {
      console.log(error);
    }
  };

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
          <ListGroup.Item>
            Votes: {article.votes}
            <Button variant="success" className="mx-2" onClick={handleIncrementVote}>+</Button>
            <Button variant="danger" onClick={handleDecrementVote}>-</Button>
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Button variant="primary" onClick={loadComments}>
            Comments ({article.comment_count})
          </Button>
        </Card.Body>
      </Card>

      {comments && <Comments comments={comments} /> }
    </div>
  )
}
