import {Card, ListGroup} from "react-bootstrap";
import {DeleteComment} from "./DeleteComment.jsx";

export const Comments = ({comments, setComments}) => {

  return (
    <div className="container">
      <h1 className="text-center">Comments</h1>
      <div className="row justify-content-center">
        {comments.map((comment, index) => {
          const formattedDate = new Date(comment.created_at).toLocaleString();
          return (
            <div key={comment.id || index} className="col-12 col-md-11">
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{comment.author}</Card.Title>
                  <Card.Text>
                    {comment.body}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>{formattedDate}</ListGroup.Item>
                  <ListGroup.Item>Votes: {comment.votes}</ListGroup.Item>
                </ListGroup>
                {comment.author === localStorage.getItem("username") &&
                  <DeleteComment comment_id={comment.comment_id} comments={comments} setComments={setComments} />
                }
                {comment.error && <p className="text-danger">{comment.error}</p>}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
