import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useContext} from "react";
import {LoggedInContext} from "../contexts/loggedInContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import LogoImage from "../public/logo.png";

export const Header = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(LoggedInContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username")
    setIsLoggedIn(false)

    navigate(0)
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/"><img src={LogoImage} width={"140px"}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/articles">Browse articles</Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <Button variant="outline-success" onClick={handleSignOut}>Sign Out</Button>
            ) : (
              <>
                <Link to={"/login"} className="btn btn-outline-primary me-2 buttons">Login</Link>
                <Link to="/signup" className="btn btn-outline-secondary me-2 buttons">Register</Link>
              </>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
