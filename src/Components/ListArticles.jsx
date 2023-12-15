import {useEffect, useState} from "react";
import {Button, Card, Col, Form, ListGroup, Row} from "react-bootstrap";
import {getArticles} from "../utils/getArticles.js";
import {Link} from "react-router-dom";
import {NotFoundPage} from "./NotFound.jsx";

export const ListArticles = ({query}) => {
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [queryString, setQueryString] = useState(query);
  const [paginationQuery, setPaginationQuery] = useState(queryString);

  const [queried, setQueried] = useState(false);
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");

  useEffect(() => {

    const fetchArticles = async (queryString) => {

      try {
        let data = await getArticles(queryString);
        setPaginationQuery(queryString);
        setTotalArticles(data.total_count);
        setArticles(data.articles);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles(queryString);
    setQueryString(query)
  }, [queried]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setQueryString(queryString + order + orderBy)
    setQueried(!queried)
  }

  const handleSelectOrder = (event) => {
    setOrder(event.target.value)
  }

  const handleSelectOrderBy = (event) => {
    setOrderBy(event.target.value)
  }

  return (
    isLoading ? (
        <h1>Loading...</h1>
      ) :
      articles.length === 0 ? (
        <NotFoundPage/>
      ) : (
        <div>
          <h3>Sort articles</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Select aria-label="Default select" onChange={handleSelectOrder}>
              <option>Order to sort in</option>
              <option value="&order=asc">
                Ascending
              </option>
              <option value="&order=desc">
                Descending
              </option>
            </Form.Select>

            <Form.Select aria-label="Default select" onChange={handleSelectOrderBy}>
              <option>Value to sort by</option>
              <option value="&sort_by=title">
                Title
              </option>
              <option value="&sort_by=author">
                Author
              </option>
              <option value="&sort_by=created_at">
                Date Created
              </option>
              <option value="&sort_by=votes">
                Votes
              </option>
              <option value="&sort_by=comment_count">
                Comments Count
              </option>
            </Form.Select>

            <Button variant="outline-dark buttons" type="submit">Click To Sort</Button>
          </Form>
          <h1>Articles</h1>


          <Row xs={1} md={2} lg={3} className="g-4">
            {articles.map((article, index) => {
              const formattedDate = new Date(article.created_at).toLocaleString();
              return (
                <Col key={article.id || index}>
                  <Card>
                    <Card.Img variant="top" src={article.article_img_url}
                              style={{width: '100%', height: '200px', objectFit: 'cover'}}/>
                    <Card.Body>
                      <Card.Title>{article.title}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>Author: {article.author}</ListGroup.Item>
                      <ListGroup.Item>Topic: {article.topic}</ListGroup.Item>
                      <ListGroup.Item>Created: {formattedDate}</ListGroup.Item>
                      <ListGroup.Item>Votes: {article.votes}</ListGroup.Item>
                      <ListGroup.Item>Comments: {article.comment_count}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                      <Link to={`/articles/${article.article_id}`} className="btn btn-outline-dark">
                        Open Article
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      )
  );
}
