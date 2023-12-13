import {useEffect, useState} from "react";
import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getTopics} from "../utils/getTopics.js";

export const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topics = await getTopics();
        setTopics(topics);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      <h1>Loading...</h1>;
    }

    fetchTopics();
  }, []);

  return (
    <div>
      <h1>Topics</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {topics.map((topic, index) => {
          return (
            <Col key={topic.slug || index}>
              <Card>
                <Card.Body>
                  <Card.Title>{topic.slug}</Card.Title>
                  <Card.Footer>{topic.description}</Card.Footer>
                  <Card.Footer>Created by: {topic.creator}</Card.Footer>
                </Card.Body>
                <Card.Body>
                  <Link to={`/topics/${topic.slug}`} className="btn btn-outline-dark">
                    Open Topic
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
