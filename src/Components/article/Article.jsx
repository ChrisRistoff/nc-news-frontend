import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Button, Card, ListGroup, Spinner} from "react-bootstrap";
import {getArticleById} from "../../utils/getArticleById.js";
import {getComments} from "../../utils/getComments.js";
import {decrementVotes, incrementVotes} from "../../utils/updateArticleVotes.js";
import {DeleteArticle} from "./DeleteArticle.jsx";
import {EditArticleBody} from "./EditArticleBody.jsx";
import {CreateNewComment} from "../comments/CreateNewComment.jsx";
import {NotFoundPage} from "../NotFound.jsx";
import {Comments} from "../comments/Comments.jsx";
import {Paginate} from "../Pagination.jsx";
import {User} from "../users/User.jsx";
import {Topic} from "../topics/TopicInfoButton.jsx";
import {formatDate} from "../../utils/formatDate.js";

export const Article = () => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState(null);
  const [voteError, setVoteError] = useState("");
  const [expandNewComment, setExpandNewComment] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);

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
        setLoadingComments(true);
        const data = await getComments(id, page);
        setTotalComments(data.total_count)
        setComments(data.comments);
      } catch (error) {
        // nothing yet
      } finally {
        setLoadingComments(false);
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
      {isLoading ? <div className="d-flex justify-content-center align-items-center buttons">
          <Card className="text-center p-4">
            <Card.Body>
              <Spinner animation="border" variant="primary" className="mb-3"/>
              <Card.Title>Article is loading...</Card.Title>
            </Card.Body>
          </Card>
        </div>
        :
        article.title ?
          <Card style={{width: "100%"}}>
            <Card.Body>
              <Card.Title>
                <h1>{article.title}</h1>
              </Card.Title>
              {!editToggle && localStorage.getItem("username") === article.author ?
                <div>
                  <Card.Text className={"text-start"}>{article.body}</Card.Text>
                  <Button className={"buttons"} variant={"outline-dark"} onClick={handleEditToggle}>Edit
                    article</Button>
                  <DeleteArticle article_id={article.article_id}/>
                </div>
                : editToggle ? <EditArticleBody article={article} setArticle={setArticle} setToggle={setEditToggle}/>
                  : <Card.Text className={"text-start"}>{article.body}</Card.Text>}

            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item> <User username={article.author}/> </ListGroup.Item>
              <ListGroup.Item> <Topic slug={article.topic}/> </ListGroup.Item>
              <ListGroup.Item>
                {formatDate(article.created_at)}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Votes:</b> {article.votes}
                {userUpVotes.has(article.article_id) ?
                  <Button variant="dark buttons" onClick={handleIncrementVote}
                          onMouseLeave={() => setVoteError("")}>
                    <i className="bi bi-hand-thumbs-up"/>
                  </Button> : <Button variant="outline-dark buttons" onClick={handleIncrementVote}
                                      onMouseLeave={() => setVoteError("")}>
                    <i className="bi bi-hand-thumbs-up"/>
                  </Button>}

                {userDownVotes.has(article.article_id) ?
                  <Button variant="dark buttons" onClick={handleDecrementVote} onMouseLeave={() => setVoteError("")}>
                    <i className="bi bi-hand-thumbs-down"/>
                  </Button> : <Button variant="outline-dark buttons" onClick={handleDecrementVote}
                                      onMouseLeave={() => setVoteError("")}>
                    <i className="bi bi-hand-thumbs-down"/>
                  </Button>}
                {voteError && <p className="error">{voteError}</p>}
              </ListGroup.Item>
            </ListGroup>
            {localStorage.getItem("username") &&
              <Link to={`/${article.topic}/articles/new`} className={"btn btn-outline-dark buttons"}>Create new article
                in this topic</Link>}
            <Card.Body>
              <b>Comments</b> ({article.comment_count})
              {localStorage.getItem("username") ?
                <Button variant="outline-dark buttons" onClick={handleExpand}>Add Comment</Button> :
                <div>
                  <Link to="/login" className="btn btn-outline-dark buttons">Login</Link>
                  or
                  <Link to="/signup" className="btn btn-outline-dark buttons">Register</Link>
                  <p><b>To Submit a Comment or Create a New Article in this topic</b></p>
                </div>}

              {expandNewComment &&
                <CreateNewComment articleId={id} comments={comments} setComments={setComments} article={article}
                                  setArticle={setArticle}/>}
            </Card.Body>
          </Card>
          : <NotFoundPage/>}
      {loadingComments || !comments ? <div className="d-flex justify-content-center align-items-center buttons">
          <Card className="text-center p-4">
            <Card.Body>
              <Spinner animation="border" variant="primary" className="mb-3"/>
              <Card.Title>Comments are loading...</Card.Title>
            </Card.Body>
          </Card>
        </div>
        : !comments.length ? <div className="d-flex justify-content-center align-items-center buttons">
            <Card className="text-center p-4">
              <Card.Body>
                <Card.Title>There are no comments yet. Be the first to comment!</Card.Title>
              </Card.Body>
            </Card>
          </div>
          :
          <Comments comments={comments} setComments={setComments} totalComments={totalComments}
                    setTotalComments={setTotalComments}/>}
      {totalComments > 10 && <Paginate page={page} setPage={setPage} totalItems={totalComments}/>}
    </div>
  );
};
