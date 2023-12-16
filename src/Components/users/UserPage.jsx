import {Link, useParams} from "react-router-dom";
import {NotFoundPage} from "../NotFound.jsx";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
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
  const [loading, setLoading] = useState(false);
  const [totalArticles, setTotalArticles] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [articlesPage, setArticlesPage] = useState(1);
  const [commentsPage, setCommentsPage] = useState(1);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getuserData = async () => {
      try {
        setLoading(true);

        const user = await getUser(username);

        setUser(user.user);
        setLoading(false);

      } catch (error) {
        setError(true);
      }
    }
    getuserData();
  }, [])

  useEffect(() => {
    const handleUserArticles = async () => {
      try {
        const data = await getUserArticles(username, articlesPage);

        setError(false);

        setUserArticles(data.articles);
        setTotalArticles(data.total_count);
      } catch (error) {
        setError(true);
      }

    }

    handleUserArticles();
  }, [articlesPage])

  useEffect(() => {
    const handleUserComments = async () => {
      try {
        const data = await getUserComments(username, commentsPage);

        setError(false);
        setUserComments(data.comments);
        setTotalComments(data.total_count);

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
          <h1>{user.username}</h1>
          <p>Name: {user.name}</p>
          <img src={user.avatar_url} alt={user.username} width={"100px"}/>
          <h5 className={"text-bg-dark"}>Hover or press on comment or article text for more info</h5>
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
                    <p>{article.title}</p>
                    <Link className={"btn btn-outline-dark"} to={`/articles/${article.article_id}`}>View
                      Article</Link>
                  </div>
                </OverlayTrigger>

              ))}
              {loading ? <p>Loading...</p> : null}
              {totalArticles > 5 && (
                <Paginate page={articlesPage} setPage={setArticlesPage} totalItems={totalArticles}/>
              )}
            </div>

            <div style={{flex: 1, marginLeft: '10px'}}>
              <h3>Comments</h3>
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
                    <p>Comment: {comment.body.substring(0, 40)}...</p>
                    <Link className={"btn btn-outline-dark"} to={`/articles/${comment.article_id}`}>View
                      Article</Link>
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
