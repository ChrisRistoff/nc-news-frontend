import {Link, useParams} from "react-router-dom";
import {NotFoundPage} from "../NotFound.jsx";
import {Card, OverlayTrigger, Spinner, Tooltip} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getUserArticles} from "../../utils/getUserArticles.jsx";
import {getUserComments} from "../../utils/getUserComments.js";
import {Paginate} from "../Pagination.jsx";
import {getUser} from "../../utils/getUser.jsx";
import {formatDate} from "../../utils/formatDate.js";

export const UserPage = () => {
  const {username} = useParams();
  const [userArticles, setUserArticles] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [error, setError] = useState(false);
  const [totalArticles, setTotalArticles] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [articlesPage, setArticlesPage] = useState(1);
  const [commentsPage, setCommentsPage] = useState(1);
  const [user, setUser] = useState({});

  const [loadingArticles, setLoadingArticles] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    const getuserData = async () => {
      try {
        setLoadingUser(true);

        const user = await getUser(username);

        setUser(user.user);
        setLoadingUser(false);

      } catch (error) {
        setError(true);
      }
    }
    getuserData();
  }, [])

  useEffect(() => {
    const handleUserArticles = async () => {
      try {
        setLoadingArticles(true);
        const data = await getUserArticles(username, articlesPage);

        setError(false);

        setUserArticles(data.articles);
        setTotalArticles(data.total_count);
        setLoadingArticles(false);
      } catch (error) {
        setError(true);
      }

    }

    handleUserArticles();
  }, [articlesPage])

  useEffect(() => {
    const handleUserComments = async () => {
      try {
        setLoadingComments(true);
        const data = await getUserComments(username, commentsPage);

        setError(false);
        setUserComments(data.comments);
        setTotalComments(data.total_count);
        setLoadingComments(false);

      } catch (error) {
        setError(true);
      }
    }

    handleUserComments();
  }, [commentsPage]);

  return (
    <div>
      {error ? <NotFoundPage/> :
        <div>
          {loadingUser ? <div className="d-flex justify-content-center align-items-center">
              <Card className="text-center p-4 buttons">
                <Card.Body>
                  <Spinner animation="border" variant="primary" className="mb-3"/>
                  <Card.Title>Loading user info...</Card.Title>
                </Card.Body>
              </Card>
            </div> :
            <div>
              <h1>{user.username}</h1>
              <p>Name: {user.name}</p>
              <img src={user.avatar_url} alt={user.username} width={"100px"}/>
            </div>}
          <h5 className={"text-bg-dark buttons"}>Hover or press on comment or article text for more info</h5>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{flex: 1, marginRight: '10px'}}>
              <h3>Articles</h3>
              {userArticles.map((article) => (
                <OverlayTrigger
                  key={article.article_id}
                  placement="right"
                  overlay={
                    <Tooltip id={`tooltip-${article.article_id}`}>
                      <h5>Topic:</h5>
                      <p>{article.topic}</p>
                      <h5>Content:</h5>
                      <p>{article.body.substring(0, 100)}...</p>
                      <h5>Votes:</h5>
                      <p>{article.votes}</p>
                      <h5>Posted on:</h5>
                      <p>{formatDate(article.created_at)}</p>
                    </Tooltip>
                  }
                >
                  <div>
                    <Card style={{cursor: "default", padding: "15px", margin: "10px"}}>{article.title}
                      <Link className={"btn btn-outline-dark buttons"} to={`/articles/${article.article_id}`}>View
                        Article</Link>
                    </Card>

                  </div>
                </OverlayTrigger>

              ))}
              {loadingArticles ? <div className="d-flex justify-content-center align-items-center">
                <Card className="text-center p-4">
                  <Card.Body>
                    <Spinner animation="border" variant="primary" className="mb-3"/>
                    <Card.Title>Loading articles...</Card.Title>
                  </Card.Body>
                </Card>
              </div> : null}
              {totalArticles > 5 && (
                <Paginate page={articlesPage} setPage={setArticlesPage} totalItems={totalArticles}/>
              )}
            </div>

            <div style={{flex: 1, marginLeft: '10px'}}>
              <h3>Comments</h3>
              {loadingComments ? <div className="d-flex justify-content-center align-items-center">
                <Card className="text-center p-4">
                  <Card.Body>
                    <Spinner animation="border" variant="primary" className="mb-3"/>
                    <Card.Title>Loading comments...</Card.Title>
                  </Card.Body>
                </Card>
              </div> : null}
              {userComments.map((comment, index) => (
                <OverlayTrigger
                  key={index}
                  placement="left"
                  overlay={
                    <Tooltip id={`tooltip-${index}`}>
                      <h5>Article:</h5>
                      <p>{comment.article_title}</p>
                      <h5>Comment:</h5>
                      <p>{comment.body}</p>
                      <p><b>Posted on:</b> <br/> {formatDate(comment.created_at)}</p>
                    </Tooltip>
                  }
                >
                  <div>
                    <Card style={{cursor: "default", padding: "15px", margin: "10px"}}>{comment.body.substring(0, 60)}...
                      <Link className={"btn btn-outline-dark buttons"} to={`/articles/${comment.article_id}`}>View
                        Article</Link>
                    </Card>
                  </div>
                </OverlayTrigger>
              ))}
              {totalComments > 5 &&
                <Paginate page={commentsPage} setPage={setCommentsPage} totalItems={totalComments}/>}
            </div>
          </div>
        </div>
      }
    </div>
  )
}
