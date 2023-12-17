import {useNavigate} from "react-router-dom";

export const User = ({username}) => {

  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(`/users/${username}`)
  }

  return (
    <div className="d-flex align-items-center justify-content-center">
      <button type="button" className="btn btn-outline-dark me-2 d-flex align-items-center" onClick={handleClick}
              data-bs-toggle="tooltip" data-bs-placement="top" title="Click to view user profile">
        <i className="bi bi-person-circle"></i>
      </button>
      <h5 className="mb-0" style={{cursor: 'pointer'}} onClick={handleClick}>{username}</h5>
    </div>
  );
}
