import {Button, Card, ListGroup} from "react-bootstrap";
import {DeleteComment} from "./DeleteComment.jsx";
import {useState} from "react";
import {commentDownVote, commentUpVote} from "../utils/handleCommentVotes.js";
import {EditCommentBody} from "./EditCommentBody.jsx";
import {DeleteArticle} from "./DeleteArticle.jsx";
import {EditArticleBody} from "./EditArticleBody.jsx";
import {incrementVotes} from "../utils/handleArticleVotes.js";

export const Comments = ({comments, setComments}) => {

  const [voteError, setVoteError] = useState(null);
  const [editToggle, setEditToggle] = useState(false);

  const handleIncrementVote = async (comment_id) => {

    let increment = 1;
    let UserUpVotes = new Set();
    let UserDownVotes = new Set();

    if (localStorage.getItem("CommentUpVotes")) {
      UserUpVotes = new Set(JSON.parse(localStorage.getItem("CommentUpVotes")));
    }

    if (localStorage.getItem("CommentDownVotes")) {
      UserDownVotes = new Set(JSON.parse(localStorage.getItem("CommentDownVotes")));
    }

    if (UserUpVotes.has(comment_id)) {
      setVoteError({comment_id: comment_id, message: "You have already upvoted this comment."});
      return;
    }

    if (UserDownVotes.has(comment_id)) {
      UserDownVotes.delete(comment_id);
      localStorage.setItem("CommentDownVotes", JSON.stringify([...UserDownVotes]));
      increment++;
    }

    localStorage.setItem("CommentUpVotes", JSON.stringify([...UserUpVotes, comment_id]));

    const updatedComments = comments.map((comment) => {
      if (comment.comment_id === comment_id) {
        return {
          ...comment,
          votes: comment.votes + increment,
        };
      }
      return comment;
    });

    setComments(updatedComments);

    try {
      await commentUpVote(comment_id, increment);

      if (voteError) setVoteError("");
    } catch (error) {
      console.log(error);
      setVoteError({comment_id: comment_id, message: "Something went wrong, your vote was not counted."});
    }
  };

  const handleDecrementVote = async (comment_id) => {

    let decrement = -1;
    let UserDownVotes = new Set();
    let UserUpVotes = new Set();

    if (localStorage.getItem("CommentDownVotes")) {
      UserDownVotes = new Set(JSON.parse(localStorage.getItem("CommentDownVotes")));
    }

    if (localStorage.getItem("CommentUpVotes")) {
      UserUpVotes = new Set(JSON.parse(localStorage.getItem("CommentUpVotes")));
    }

    if (UserDownVotes.has(comment_id)) {
      setVoteError({comment_id: comment_id, message: "You have already downvoted this comment."});
      return;
    }

    if (UserUpVotes.has(comment_id)) {
      UserUpVotes.delete(comment_id);
      localStorage.setItem("CommentUpVotes", JSON.stringify([...UserUpVotes]));
      decrement--;
    }

    localStorage.setItem("CommentDownVotes", JSON.stringify([...UserDownVotes, comment_id]));

    const updatedComments = comments.map((comment) => {
      if (comment.comment_id === comment_id) {
        return {
          ...comment,
          votes: comment.votes + decrement,
        };
      }
      return comment;
    });

    setComments(updatedComments);

    try {
      await commentDownVote(comment_id, decrement);

      if (voteError) setVoteError("");
    } catch (error) {
      console.log(error);
      setVoteError({comment_id: comment_id, message: "Something went wrong, your vote was not counted."});
    }
  };

  const handleEditToggle = () => {
    setEditToggle(true)
  }

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
                  {!editToggle && localStorage.getItem("username") === comment.author ?
                    <div>
                      <Card.Text>{comment.body}</Card.Text>
                      <Button className={"buttons"} variant={"outline-dark"} onClick={() => handleEditToggle()}>Edit
                        comment</Button>
                      <DeleteComment comment_id={comment.comment_id} comments={comments} setComments={setComments}/>
                    </div>
                    : editToggle ?
                      <EditCommentBody comment_id={comment.comment_id} comments={comments} setComments={setComments}
                                       setToggle={setEditToggle}/>
                      : <Card.Text>comment.body</Card.Text>}
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>{formattedDate}</ListGroup.Item>
                  <ListGroup.Item>
                    Votes: {comment.votes}
                    <Button
                      variant="outline-dark buttons"
                      onClick={() => handleIncrementVote(comment.comment_id)}
                      onMouseLeave={() => setVoteError("")}
                    >
                      +
                    </Button>

                    <Button variant="outline-dark"
                            onClick={() => handleDecrementVote(comment.comment_id)}
                            onMouseLeave={() => setVoteError("")}
                    >
                      -
                    </Button>
                    {voteError && voteError.comment_id === comment.comment_id && (
                      <p className="text-danger">{voteError.message}</p>
                    )}
                  </ListGroup.Item>
                </ListGroup>

              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
