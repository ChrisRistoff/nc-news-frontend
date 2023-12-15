import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../../utils/loginUser.js";
import {LoggedInContext} from "../../contexts/loggedInContext.jsx";

export const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const {isLoggedIn, setIsLoggedIn} = useContext(LoggedInContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      if (isLoggedIn) {
        throw new Error("You are already logged in")
      }

      await loginUser(username, password);

      localStorage.setItem("username", username);
      setIsLoggedIn(true);

      return navigate(-1)
    } catch (e) {
      const error = e.response ? e.response.data.msg : e.message;
      setLoginError(error);
    }

  };

  return (
    <Container className="d-flex justify-content-center forms" style={{height: '100'}}>
      <Row>
        <Col md={12} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <h3 className="text-center mb-4">Login</h3>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            {loginError && <p className="text-danger">{loginError}</p>}
            <p></p>
            <Button variant="outline-dark" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
