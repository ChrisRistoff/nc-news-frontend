import { getArticleById } from "../utils/getArticleById.js";
import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import {Button, Card, ListGroup} from "react-bootstrap";
import { Comments } from "./Comments.jsx";
import { getComments } from "../utils/getComments.js";
import { incrementVotes, decrementVotes } from "../utils/handleArticleVotes.js";
import {CreateNewComment} from "./CreateNewComment.jsx";
import {NotFoundPage} from "./NotFound.jsx";
import {DeleteArticle} from "./DeleteArticle.jsx";

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
        // nothitng yet
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      <h1>Loading...</h1>;
    }

    fetchArticle();
  }, [article]);

  const loadComments = async () => {
    try {
      const comments = await getComments(id);
      setComments(comments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrementVote = async () => {
    let upVotes= [];
    let downVotes = [];
    if (localStorage.getItem("ArticleUpVotes")) {
      upVotes = JSON.parse(localStorage.getItem("ArticleUpVotes"));
    }

    if (localStorage.getItem("ArticleDownVotes")) {
      downVotes = JSON.parse(localStorage.getItem("ArticleDownVotes"));
    }

    if (downVotes.includes(article.article_id)) {
      setVoteError("You have already downvoted this article.");
      return;
    }

    if (upVotes.includes(article.article_id)) {
      setVoteError("You have already upvoted this article.");
      return;
    }

    localStorage.setItem("ArticleUpVotes", JSON.stringify([...upVotes, article.article_id]));

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

    let downVotes = [];
    let upVotes= [];
    if (localStorage.getItem("ArticleDownVotes")) {
      downVotes = JSON.parse(localStorage.getItem("ArticleDownVotes"));
    }

    if (localStorage.getItem("ArticleUpVotes")) {
      upVotes = JSON.parse(localStorage.getItem("ArticleUpVotes"));
    }

    if (upVotes.includes(article.article_id)) {
      setVoteError("You have already upvoted this article.");
      return;
    }

    if (downVotes.includes(article.article_id)) {
      setVoteError("You have already downvoted this article.");
      return;
    }

    localStorage.setItem("ArticleDownVotes", JSON.stringify([...downVotes, article.article_id]));

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
      {isLoading ? <h1>Loading...</h1> :
      article.title ?
      <Card className="mb-3 article" style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>
            <h1>{article.title}</h1>
          </Card.Title>
          <Card.Text>{article.body}</Card.Text>

         {localStorage.getItem("username") === article.author &&
           <DeleteArticle article_id={article.article_id} />  }
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Author: {article.author}</ListGroup.Item>
          <ListGroup.Item>Topic: {article.topic}</ListGroup.Item>
          <ListGroup.Item>
            Created: {new Date(article.created_at).toLocaleDateString()}
          </ListGroup.Item>
          <ListGroup.Item >
            Votes: {article.votes}
            <Button variant="outline-dark buttons" onClick={handleIncrementVote} onMouseLeave={() => setVoteError("")}>
              +
            </Button>

            <Button variant="outline-dark" onClick={handleDecrementVote} onMouseLeave={() => setVoteError("")}>
              -
            </Button>
            {voteError && <p className="error">{voteError}</p>}
          </ListGroup.Item>
        </ListGroup>
        {localStorage.getItem("username") ?
          <Link to={`/${article.topic}/articles/new`} className={"btn btn-outline-dark buttons"}>Create new article in this topic</Link> :
          <div>
            <Link to={`/login`} className={"btn btn-outline-dark buttons"}>Log in</Link>
            or
            <Link to={`/signup`} className={"btn btn-outline-dark buttons"}>Register</Link>
            To create a new article in this topic
          </div>}
        <Card.Body>
          <Button variant="outline-dark" onClick={loadComments}>
            Comments ({article.comment_count})
          </Button>

          {localStorage.getItem("username") ?
            <Button variant="outline-dark buttons" onClick={handleExpand}>Add Comment</Button> :
            <div>
              <Link to="/login" className="btn btn-outline-secondary buttons">Login</Link>
              or
              <Link to="/signup" className="btn btn-outline-secondary buttons">Register</Link>
              To submit a comment
            </div>}

          {expandNewComment && <CreateNewComment articleId={id} comments={comments} setComments={setComments} article={article} setArticle={setArticle}/>}
        </Card.Body>
      </Card>
        : <NotFoundPage />}
      {comments && <Comments comments={comments} setComments={setComments}/>}
    </div>
  );
};
