import {useNavigate} from "react-router-dom";

export const Topic = ({slug}) => {

  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(`/topics/${slug}`)
  }

  return (
    <div className={"d-flex align-items-center justify-content-center"}>
      <button type="button" className="btn btn-outline-dark me-2" data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Click to view user profile" onClick={handleClick}>
        <i className={"bi bi-chat-dots-fill"}></i>
      </button>
      <h5 className={"mb-0"}>{slug}</h5>
    </div>
  )

}
