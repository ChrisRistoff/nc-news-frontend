import {useEffect, useState} from "react";
import {Button, Card, Col, Form, ListGroup, Row, Spinner} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {getArticles} from "../../utils/getArticles.js";
import {NotFoundPage} from "../NotFound.jsx";
import {Paginate} from "../Pagination.jsx";
import {User} from "../users/User.jsx";
import {formatDate} from "../../utils/formatDate.js";


export const ListArticles = ({query}) => {
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [queryString, setQueryString] = useState(query || "");
  const [page, setPage] = useState(1);

  const [queried, setQueried] = useState(false);
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async (queryString) => {

      try {
        let data = await getArticles(queryString + `&p=${page}`);
        setTotalArticles(data.total_count);
        setArticles(data.articles);
        setQueryString("")
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles(queryString);
    setQueryString(query)
  }, [queried, page]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setQueryString(queryString + order + orderBy + `&search=${search}`)
    setQueried(!queried)
  }

  const handleSelectOrder = (event) => {
    event.preventDefault()
    setOrder(event.target.value)
  }

  const handleSelectOrderBy = (event) => {
    event.preventDefault()
    setOrderBy(event.target.value)
  }

  const clickImage = (event, article_id) => {
    event.preventDefault();
    navigate(`/articles/${article_id}`)
  }

  return (
    isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Card className="text-center p-4">
            <Card.Body>
              <Spinner animation="border" variant="primary" className="mb-3"/>
              <Card.Title>Loading articles...</Card.Title>
            </Card.Body>
          </Card>
        </div>
      ) :
      !articles ? (
        <NotFoundPage/>
      ) : (
        <div>
          <h3>Sort and search</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              placeholder="Search by anything..."
              value={search}
              onChange={(event) => {
                event.preventDefault()
                setSearch(event.target.value)
              }}
            />
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

            <Button variant="outline-dark buttons" type="submit">Click To Search</Button>
          </Form>
          <h1>Articles</h1>

          <Row xs={1} md={2} lg={3} className="g-4">
            {articles.map((article, index) => {
              const formattedDate = formatDate(article.created_at);
              return (
                <Col key={article.id || index}>
                  <Card>
                    <Card.Img onClick={(e) => clickImage(e, article.article_id)} variant="top"
                              src={article.article_img_url}
                              style={{width: '100%', height: '200px', objectFit: 'cover', cursor: "pointer"}}/>
                    <Card.Body>
                      <Card.Title>
                        <h2 style={{cursor: "pointer"}} onClick={(e) => clickImage(e, article.article_id)}>
                          {article.title}
                        </h2>
                      </Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item> <User username={article.author}/> </ListGroup.Item>
                      <ListGroup.Item><b>Topic:</b> {article.topic}</ListGroup.Item>
                      <ListGroup.Item>{formattedDate}</ListGroup.Item>
                      <ListGroup.Item><b>Votes:</b> {article.votes}</ListGroup.Item>
                      <ListGroup.Item><b>Comments:</b> {article.comment_count}</ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              );
            })}
          </Row>
          {totalArticles > 10 && <Paginate page={page} setPage={setPage} totalItems={totalArticles}/>}
        </div>
      )
  );
}
