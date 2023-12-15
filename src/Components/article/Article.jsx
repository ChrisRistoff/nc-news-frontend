import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Button, Card, ListGroup} from "react-bootstrap";
import {getArticleById} from "../../utils/getArticleById.js";
import {getComments} from "../../utils/getComments.js";
import {decrementVotes, incrementVotes} from "../../utils/handleArticleVotes.js";
import {DeleteArticle} from "./DeleteArticle.jsx";
import {EditArticleBody} from "./EditArticleBody.jsx";
import {CreateNewComment} from "../comments/CreateNewComment.jsx";
import {NotFoundPage} from "../NotFound.jsx";
import {Comments} from "../comments/Comments.jsx";
import {Paginate} from "../Pagination.jsx";

export const Article = () => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState(null);
  const [voteError, setVoteError] = useState("");
  const [expandNewComment, setExpandNewComment] = useState(false);
  const [editToggle, setEditToggle] = useState(false);

  const [totalComments, setTotalComments] = useState(0);
  const [page, setPage] = useState(1);

  const [userUpVotes, setUserUpVotes] = useState(new Set(JSON.parse(localStorage.getItem("ArticleUpVotes"))) || new Set());
  const [userDownVotes, setUserDownVotes] = useState(new Set(JSON.parse(localStorage.getItem("ArticleDownVotes"))) || new Set());

  let {id} = useParams();

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
  }, [comments]);

  useEffect(() => {
    const loadComments = async () => {
      try {
        console.log(page)
        const data = await getComments(id, page);
        setTotalComments(data.total_count)
        setComments(data.comments);
      } catch (error) {
        console.log(error);
      }
    };

    loadComments();
  }, [page, totalComments]);

  const handleIncrementVote = async () => {

    if (!localStorage.getItem("token")) {
      setVoteError("You must be logged in to vote.");
      return;
    }

    let increment = 1;

    if (userUpVotes.has(article.article_id)) {
      increment = -1;
      userUpVotes.delete(article.article_id);
      localStorage.setItem("ArticleUpVotes", JSON.stringify([...userUpVotes]));
    }

    if (userDownVotes.has(article.article_id)) {
      userDownVotes.delete(article.article_id);
      localStorage.setItem("ArticleDownVotes", JSON.stringify([...userDownVotes]));
      increment++;
    }

    if (increment > 0) {
      localStorage.setItem("ArticleUpVotes", JSON.stringify([...userUpVotes, article.article_id]));
      setUserUpVotes(userUpVotes.add(article.article_id))
    }

    const updatedArticle = {
      ...article,
      votes: article.votes + increment,
    };

    setArticle(updatedArticle);

    try {
      await incrementVotes(article.article_id, increment);

      setVoteError("");

    } catch (error) {
      console.log(error);
      setVoteError("Something went wrong, your vote was not counted.");
    }
  };

  const handleDecrementVote = async () => {

    if (!localStorage.getItem("token")) {
      setVoteError("You must be logged in to vote.");
      return;
    }

    let decrement = -1;

    if (userDownVotes.has(article.article_id)) {
      decrement = 1;
      userDownVotes.delete(article.article_id);
      localStorage.setItem("ArticleDownVotes", JSON.stringify([...userDownVotes]));
    }

    if (userUpVotes.has(article.article_id)) {
      userUpVotes.delete(article.article_id);
      localStorage.setItem("ArticleUpVotes", JSON.stringify([...userUpVotes]));
      decrement--;
    }

    if (decrement < 0) {
      localStorage.setItem("ArticleDownVotes", JSON.stringify([...userDownVotes, article.article_id]));
      setUserDownVotes(userDownVotes.add(article.article_id))
    }

    const updatedArticle = {
      ...article,
      votes: article.votes + decrement,
    };

    setArticle(updatedArticle);

    try {
      await decrementVotes(article.article_id, decrement);

      setVoteError("")
    } catch (error) {
      console.log(error);
      setVoteError("Something went wrong, your vote was not counted.");
    }
  };

  const handleExpand = () => {
    setExpandNewComment(!expandNewComment);
  }

  const handleEditToggle = () => {
    setEditToggle(true);
  }

  return (
    <div>
      {isLoading ? <h1>Loading...</h1> :
        article.title ?
          <Card className="mb-3 article" style={{width: "100%"}}>
            <Card.Body>
              <Card.Title>
                <h1>{article.title}</h1>
              </Card.Title>
              {!editToggle && localStorage.getItem("username") === article.author ?
                <div>
                  <Card.Text>{article.body}</Card.Text>
                  <Button className={"buttons"} variant={"outline-dark"} onClick={handleEditToggle}>Edit
                    article</Button>
                  <DeleteArticle article_id={article.article_id}/>
                </div>
                : editToggle ? <EditArticleBody article={article} setArticle={setArticle} setToggle={setEditToggle}/>
                  : <Card.Text>{article.body}</Card.Text>}

            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Author: {article.author}</ListGroup.Item>
              <ListGroup.Item>Topic: {article.topic}</ListGroup.Item>
              <ListGroup.Item>
                Created: {new Date(article.created_at).toLocaleDateString()}
              </ListGroup.Item>
              <ListGroup.Item>
                Votes: {article.votes}
                {userUpVotes.has(article.article_id) ?
                  <Button variant="dark buttons" onClick={handleIncrementVote}
                          onMouseLeave={() => setVoteError("")}>
                    +
                  </Button> : <Button variant="outline-dark buttons" onClick={handleIncrementVote}
                                      onMouseLeave={() => setVoteError("")}>
                    +
                  </Button>}

                {userDownVotes.has(article.article_id) ?
                  <Button variant="dark buttons" onClick={handleDecrementVote} onMouseLeave={() => setVoteError("")}>
                    -
                  </Button> : <Button variant="outline-dark buttons" onClick={handleDecrementVote}
                                      onMouseLeave={() => setVoteError("")}>
                    -
                  </Button>}
                {voteError && <p className="error">{voteError}</p>}
              </ListGroup.Item>
            </ListGroup>
            {localStorage.getItem("username") ?
              <Link to={`/${article.topic}/articles/new`} className={"btn btn-outline-dark buttons"}>Create new article
                in this topic</Link> :
              <div>
                <Link to={`/login`} className={"btn btn-outline-dark buttons"}>Log in</Link>
                or
                <Link to={`/signup`} className={"btn btn-outline-dark buttons"}>Register</Link>
                To create a new article in this topic
              </div>}
            <Card.Body>
              Comments ({article.comment_count})
              {localStorage.getItem("username") ?
                <Button variant="outline-dark buttons" onClick={handleExpand}>Add Comment</Button> :
                <div>
                  <Link to="/login" className="btn btn-outline-secondary buttons">Login</Link>
                  or
                  <Link to="/signup" className="btn btn-outline-secondary buttons">Register</Link>
                  To submit a comment
                </div>}

              {expandNewComment &&
                <CreateNewComment articleId={id} comments={comments} setComments={setComments} article={article}
                                  setArticle={setArticle}/>}
            </Card.Body>
          </Card>
          : <NotFoundPage/>}
      {comments && <Comments comments={comments} setComments={setComments} totalComments={totalComments}
                             setTotalComments={setTotalComments}/>}
      {totalComments > 10 && <Paginate page={page} setPage={setPage} totalItems={totalComments}/>}
    </div>
  );
};
