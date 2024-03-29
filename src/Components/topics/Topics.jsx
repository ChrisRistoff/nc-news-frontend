import {useEffect, useState} from "react";
import {Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {getTopics} from "../../utils/getTopics.js";
import {ListArticles} from "../article/ListArticles.jsx";

export const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showArticles, setShowArticles] = useState(false);

  const navigate = useNavigate();

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

    fetchTopics();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    if (search) {
      setShowArticles(true)
    } else {
      setShowArticles(false)
    }
  }

  const handleTopicClick = (event, topic) => {
    event.preventDefault();
    navigate(`/topics/${topic}`)
  }

  return (
    <div>
      {!showArticles ?
        <div>
          <h1>Search</h1>
          <Form onSubmit={(event => handleSearch(event))}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search articles by anything..."
                value={search}
                onChange={(event) => {
                  event.preventDefault()
                  setSearch(event.target.value)
                }}
              />
            </Form.Group>
            <Button className={"buttons"}
                    variant={"outline-dark"}
                    type={"submit"}>
              Search
            </Button>
          </Form>
        </div>
        : <ListArticles query={`search=${search}`}/>}

      <h1>Topics</h1>
      {isLoading ? <div className="d-flex justify-content-center align-items-center">
          <Card className="text-center p-4">
            <Card.Body>
              <Spinner animation="border" variant="primary" className="mb-3"/>
              <Card.Title>Just a Moment...</Card.Title>
              <Card.Text>
                The server is waking up! This might take up to a minute on the first start. Your patience is appreciated.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        :
        <Row xs={1} md={2} lg={3} className="g-4">

          {topics.map((topic, index) => {
            return (
              <Col key={topic.slug || index}>
                <Card onClick={(e) => handleTopicClick(e, topic.slug)} style={{cursor: "pointer"}}>
                  <Card.Body>
                    <Card.Title>{topic.slug}</Card.Title>
                    <Card.Footer>{topic.description}</Card.Footer>
                    <Card.Footer><b>Articles:</b> {topic.article_count}</Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      }
    </div>
  );
}
