import {Link, useParams} from "react-router-dom";
import {NotFoundPage} from "../NotFound.jsx";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {getUserArticles} from "../../utils/getUserArticles.jsx";
import {getUserComments} from "../../utils/getUserComments.js";
import {Paginate} from "../Pagination.jsx";

export const User = () => {
  const {username} = useParams();
  const [userArticles, setUserArticles] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalArticles, setTotalArticles] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [articlesPage, setArticlesPage] = useState(1);
  const [commentsPage, setCommentsPage] = useState(1);

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

  const getUser = () => {
    // fetch user
  }

  return (
    <div>
      {error ? <NotFoundPage/> : <h1>{username}</h1>}
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{flex: 1, marginRight: '10px'}}> {/* Articles Section */}
          <h3>Articles</h3>
          <ul>
            {userArticles.map((article) => (
              <li key={article.title}>{article.title}</li>
            ))}
          </ul>
          {loading ? <p>Loading...</p> : null}
          {totalArticles > 5 && (
            <Paginate page={articlesPage} setPage={setArticlesPage} totalItems={totalArticles}/>
          )}
        </div>
        <div style={{flex: 1, marginLeft: '10px'}}>
          <h3>Comments</h3>
          <h5 className={"text-bg-dark"}>Hover or press on comment text for more info</h5>
          {userComments.map((comment, index) => (
            <OverlayTrigger
              key={index}
              placement="left"
              overlay={
                <Tooltip id={`tooltip-${index}`}>
                  <h5>Article:</h5>
                  {comment.article_title} <br/>
                  <h5>Comment:</h5>
                  {comment.body}
                </Tooltip>
              }
            >
              <div>
                <p>Comment: {comment.body.substring(1, 40)}...</p>
                <Link className={"btn btn-outline-dark"} to={`/articles/${comment.article_id}`}>View Article</Link>
              </div>
            </OverlayTrigger>
          ))}
          {totalComments > 5 &&
            <Paginate page={commentsPage} setPage={setCommentsPage} totalItems={totalComments}/>}
        </div>
      </div>

    </div>
  )
}
