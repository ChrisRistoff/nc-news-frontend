import {Button, Card, ListGroup} from "react-bootstrap";
import {useState} from "react";
import {EditCommentBody} from "./EditCommentBody.jsx";
import {commentDownVote, commentUpVote} from "../../utils/updateCommentVotes.js";
import {DeleteComment} from "./DeleteComment.jsx";
import {User} from "../users/User.jsx";
import {formatDate} from "../../utils/formatDate.js";

export const Comments = ({comments, setComments, totalComments, setTotalComments}) => {

  const [voteError, setVoteError] = useState(null);
  const [editToggle, setEditToggle] = useState(false);

  const [userUpVotes, setUserUpVotes] = useState(new Set(JSON.parse(localStorage.getItem("CommentUpVotes"))) || new Set());
  const [userDownVotes, setUserDownVotes] = useState(new Set(JSON.parse(localStorage.getItem("CommentUpVotes"))) || new Set());

  const handleIncrementVote = async (comment_id) => {

    if (!localStorage.getItem("token")) {
      setVoteError({comment_id: comment_id, message: "You must be logged in to vote."});
      return;
    }

    let increment = 1;

    if (userUpVotes.has(comment_id)) {
      increment = -1;
      userUpVotes.delete(comment_id);
      localStorage.setItem("CommentUpVotes", JSON.stringify([...userUpVotes]));
    }

    if (userDownVotes.has(comment_id)) {
      userDownVotes.delete(comment_id);
      localStorage.setItem("CommentDownVotes", JSON.stringify([...userUpVotes]));
      increment++;
    }

    if (increment > 0) {
      localStorage.setItem("CommentUpVotes", JSON.stringify([...userUpVotes, comment_id]));
      setUserUpVotes(userUpVotes.add(comment_id));
    }

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

    if (!localStorage.getItem("token")) {
      setVoteError({comment_id: comment_id, message: "You must be logged in to vote."});
      return;
    }

    let decrement = -1;

    if (userDownVotes.has(comment_id)) {
      decrement = 1;
      userDownVotes.delete(comment_id);
      localStorage.setItem("CommentDownVotes", JSON.stringify([...userDownVotes]));
    }

    if (userUpVotes.has(comment_id)) {
      userUpVotes.delete(comment_id);
      localStorage.setItem("CommentUpVotes", JSON.stringify([...userUpVotes]));
      decrement--;
    }

    if (decrement < 0) {
      localStorage.setItem("CommentDownVotes", JSON.stringify([...userDownVotes, comment_id]));
      setUserDownVotes(userDownVotes.add(comment_id));
    }

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
          const formattedDate = formatDate(comment.created_at);
          return (
            <div key={comment.id || index} className="col-12 col-md-11">
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title><User username={comment.author}/> </Card.Title>
                  {!editToggle && localStorage.getItem("username") === comment.author ?
                    <div>
                      <Card.Text>{comment.body}</Card.Text>
                      <Button className={"buttons"} variant={"outline-dark"} onClick={() => handleEditToggle()}>Edit
                        comment</Button>
                      <DeleteComment comment_id={comment.comment_id} comments={comments} setComments={setComments}
                                     totalComments={totalComments} setTotalComments={setTotalComments}/>
                    </div>
                    : editToggle ?
                      <EditCommentBody comment_id={comment.comment_id} comments={comments} setComments={setComments}
                                       setToggle={setEditToggle}/>
                      : <Card.Text>{comment.body}</Card.Text>}
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>{formattedDate}</ListGroup.Item>
                  <ListGroup.Item>
                    Votes: {comment.votes}
                    {userUpVotes.has(comment.comment_id) ?
                      <Button
                        variant="dark buttons"
                        onClick={() => handleIncrementVote(comment.comment_id)}
                        onMouseLeave={() => setVoteError("")}
                      >
                        <i className="bi bi-hand-thumbs-up"/>
                      </Button> :
                      <Button variant="outline-dark buttons"
                              onClick={() => handleIncrementVote(comment.comment_id)}
                              onMouseLeave={() => setVoteError("")}
                      >
                        <i className="bi bi-hand-thumbs-up"/>
                      </Button>}

                    {userDownVotes.has(comment.comment_id) ?
                      <Button variant="dark buttons"
                              onClick={() => handleDecrementVote(comment.comment_id)}
                              onMouseLeave={() => setVoteError("")}
                      >
                        <i className="bi bi-hand-thumbs-down"/>
                      </Button> :
                      <Button variant="outline-dark buttons"
                              onClick={() => handleDecrementVote(comment.comment_id)}
                              onMouseLeave={() => setVoteError("")}
                      >
                        <i className="bi bi-hand-thumbs-down"/>
                      </Button>}
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
