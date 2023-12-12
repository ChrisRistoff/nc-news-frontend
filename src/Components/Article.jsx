import { getArticleById } from "../utils/getArticleById.js";
import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import {Button, Card, ListGroup} from "react-bootstrap";
import { Comments } from "./Comments.jsx";
import { getComments } from "../utils/getComments.js";
import { incrementVotes, decrementVotes } from "../utils/handleArticleVotes.js";
import {CreateNewComment} from "./CreateNewComment.jsx";

export const Article = () => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState(null);
  const [voteError, setVoteError] = useState("");
  const [expandNewComment, setExpandNewComment] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const article = await getArticleById(id);
        setArticle(article);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      <h1>Loading...</h1>;
    }

    fetchArticle();
  }, [comments]);

  const loadComments = async () => {
    try {
      const comments = await getComments(id);
      setComments(comments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrementVote = async () => {
    const updatedArticle = {
      ...article,
      votes: article.votes + 1,
    };

    setArticle(updatedArticle);

    try {
      await incrementVotes(article.article_id);

      if (voteError) setVoteError("");
    } catch (error) {
      console.log(error);
      setVoteError("Something went wrong, your vote was not counted.");
    }
  };

  const handleDecrementVote = async () => {
    const updatedArticle = {
      ...article,
      votes: article.votes - 1,
    };

    setArticle(updatedArticle);

    try {
      await decrementVotes(article.article_id);

      if (voteError) setVoteError("");
    } catch (error) {
      console.log(error);
      setVoteError("Something went wrong, your vote was not counted.");
    }
  };

  const handleExpand = () => {
    setExpandNewComment(!expandNewComment);
  }

  return (
    <div>
      <Card className="mb-3 article" style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>
            <h1>{article.title}</h1>
          </Card.Title>
          <Card.Text>{article.body}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Author: {article.author}</ListGroup.Item>
          <ListGroup.Item>Topic: {article.topic}</ListGroup.Item>
          <ListGroup.Item>
            Created: {new Date(article.created_at).toLocaleDateString()}
          </ListGroup.Item>
          <ListGroup.Item>
            Votes: {article.votes}
            <Button variant="outline-dark buttons" onClick={handleIncrementVote}>
              +
            </Button>

            <Button variant="outline-dark" onClick={handleDecrementVote}>
              -
            </Button>
            {voteError && <p className="error">{voteError}</p>}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Button variant="outline-dark" onClick={loadComments}>
            Comments ({article.comment_count})
          </Button>

          {localStorage.getItem("username") ?
            <Button variant="outline-dark buttons" onClick={handleExpand}>Add Comment</Button> :
            <div>
              You have to
             <Link to="/login" className="btn btn-outline-secondary buttons" >Login</Link>
              or
              <Link to="/signup" className="btn btn-outline-secondary buttons" >Register</Link>
              to submit a comment
            </div>}

          {expandNewComment && <CreateNewComment articleId={id} comments={comments} setComment={setComments}/>}
        </Card.Body>
      </Card>

      {comments && <Comments comments={comments} setComments={setComments}/>}
    </div>
  );
};
