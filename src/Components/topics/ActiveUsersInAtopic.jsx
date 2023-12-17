import {Card, Col, Row, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getActiveUsersInTopic} from "../../utils/getActiveUsersInTopic.js";
import {Link} from "react-router-dom";

export const ActiveUsersInAtopic = ({topic}) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getActiveUsersInTopic(topic);
        setUsers(users);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users in {topic}</h1>
      {isLoading && <div className="d-flex justify-content-center align-items-center">
        <Card className="text-center p-4">
          <Card.Body>
            <Spinner animation="border" variant="primary" className="mb-3"/>
            <Card.Title>Loading users...</Card.Title>
          </Card.Body>
        </Card>
      </div>}
      {error && <p className="text-danger">There was an issue displaying the users, please try again</p>}
      <Row xs={1} md={2} lg={3} className="g-4">
        {users.map((user, index) => {
          return (
            <Col key={user.username || index}>
              <Card>
                <Card.Body>
                  <Link className={"btn btn-outline-dark"} to={"/users/" + user.username}>View Profile</Link>
                  <Card.Title>{user.username}</Card.Title>
                  <Card.Footer><img src={user.avatar_url} width={"50px"} height={"50px"}/></Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
