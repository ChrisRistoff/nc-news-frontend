import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, ListGroup} from "react-bootstrap";

export const ListArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const reqLink = "http://ec2-35-179-90-244.eu-west-2.compute.amazonaws.com/api/articles";
        const response = await axios.get(reqLink);
        const data = response.data;
        setArticles(data.articles);
      } catch (error) {
        console.log(error);
      }

    }

    getArticles();
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      {articles.map((article, index) => (
        article.created_at = new Date(article.created_at).toLocaleString(),
        <div key={article.id || index}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={article.article_img_url}  width="200px"/>
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Author: {article.author}</ListGroup.Item>
              <ListGroup.Item>Topic: {article.topic}</ListGroup.Item>
              <ListGroup.Item>Created: {article.created_at}</ListGroup.Item>
              <ListGroup.Item>Votes: {article.votes}</ListGroup.Item>
              <ListGroup.Item>Comments: {article.comment_count}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            {/*<Link to={`/articles/${article.id}`} className="btn btn-primary">Open Article</Link>*/}
              <Card.Link><Button>Open Article</Button></Card.Link>
            </Card.Body>
          </Card>

        </div>
      ))}
    </div>
  );
}
