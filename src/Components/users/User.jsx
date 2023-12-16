import {useNavigate} from "react-router-dom";

export const User = ({username}) => {

  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(`/users/${username}`)
  }

  return (
    <div>
      {username}
      <button type="button" className="btn btn-outline-dark btn-sm" data-bs-toggle="tooltip" data-bs-placement="top"
              title="Click to view user profile" onClick={handleClick}>
        i
      </button>
    </div>
  )
}

