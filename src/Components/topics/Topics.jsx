import {useEffect, useState} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getTopics} from "../../utils/getTopics.js";
import {ListArticles} from "../article/ListArticles.jsx";

export const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showArticles, setShowArticles] = useState(false);

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
      {isLoading ? <div>
          <h1>Just a Moment...</h1>
          <p>The server is waking up! This might take about a minute. I appreciate your patience.</p>
        </div> :
        <Row xs={1} md={2} lg={3} className="g-4">

          {topics.map((topic, index) => {
            return (
              <Col key={topic.slug || index}>
                <Card>
                  <Card.Body>
                    <Card.Title>{topic.slug}</Card.Title>
                    <Card.Footer>{topic.description}</Card.Footer>
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
      }
    </div>
  );
}
