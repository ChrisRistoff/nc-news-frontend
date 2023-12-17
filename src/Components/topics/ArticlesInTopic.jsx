import {Link, useParams} from 'react-router-dom';
import {useState} from "react";
import {ActiveUsersInAtopic} from "./ActiveUsersInAtopic.jsx";
import {ListArticles} from "../article/ListArticles.jsx";
import {Button} from "react-bootstrap";

export const ArticlesInTopic = () => {
  const [showUsers, setShowUsers] = useState(false);
  const {topic} = useParams();

  const handleClick = () => {
    setShowUsers(!showUsers);
  }

  return (
    <div>
      {showUsers ?
        <Button onClick={handleClick} variant={"outline-dark buttons"}>Click the button to hide Users active in
          this topic</Button> :
        <Button onClick={handleClick} variant={"outline-dark buttons"}>Click the button to show Users active in
          this topic</Button>}
      {showUsers && <ActiveUsersInAtopic topic={topic}/>}
      <br></br>
      {localStorage.getItem("username") ?
        <Link to={`/${topic}/articles/new`} className={"btn btn-success buttons"}>Create new article in this
          topic</Link> :
        <div>
          <Link to={`/login`} className={"btn btn-outline-dark buttons"}>Log in</Link>
          <p>or</p>
          <Link to={`/signup`} className={"btn btn-outline-dark buttons"}>Register</Link>
          <p>To create a new article in this topic</p>
        </div>}
      <ListArticles query={`&topic=${topic}`}/>
    </div>
  );
};
