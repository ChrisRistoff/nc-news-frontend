import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = (event) => {
    event.preventDefault();
    navigate(-1);
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-3">404 - Not Found!</h1>
      <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
      <Button variant="outline-dark" onClick={handleGoBack}>Go Back</Button>
    </div>
  );
};
