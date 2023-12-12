import {useEffect, useState} from "react";
import {Button, Card, Col, ListGroup, Row} from "react-bootstrap";
import {getArticles} from "../utils/getArticles.js";
import {Link} from "react-router-dom";

export const ListArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await getArticles();
        setArticles(articles);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isLoading) {
      <h1>Loading...</h1>
    }

    fetchArticles();
  }, []);

  return (
    <div>
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
                    <Button>
                      <Link to={`/articles/${article.article_id}`} className="btn btn-primary">
                        Open Article
                      </Link>
                    </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
