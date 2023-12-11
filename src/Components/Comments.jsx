import {Card, ListGroup} from "react-bootstrap";

export const Comments = ({comments}) => {

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
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
