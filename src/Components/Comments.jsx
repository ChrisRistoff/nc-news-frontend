import {getComments} from "../utils/getComments.jsx";
import {useEffect, useState} from "react";
import {Card, ListGroup} from "react-bootstrap";

export const Comments = ({articleId}) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getComments(articleId);
        setComments(comments);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isLoading) {
      <h1>Loading...</h1>
    }

    fetchComments();
  }, []);

  return (
    <div>
      <h1>Comments</h1>
      {comments.map((comment, index) => (
        comment.created_at = new Date(comment.created_at).toLocaleString(),
        <div key={comment.id || index}>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{comment.author}</Card.Title>
              <Card.Text>
                {comment.body}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>{comment.created_at}</ListGroup.Item>
              <ListGroup.Item>Votes: {comment.votes}</ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      ))}
    </div>
  );
}
