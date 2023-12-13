import {Link, useParams} from 'react-router-dom';
import {ListArticles} from "./ListArticles.jsx";
import {useState} from "react";
import {ActiveUsersInAtopic} from "./ActiveUsersInAtopic.jsx";

export const ArticlesInTopic = () => {
  const [showUsers, setShowUsers] = useState(false);
  const { topic } = useParams();

  const handleClick = () => {
    setShowUsers(!showUsers);
  }

  return (
    <div>
    {showUsers ?
      <Link onClick={handleClick} className={"btn btn-outline-dark buttons"}>Click the button to hide Users active in this topic</Link> :
      <Link onClick={handleClick} className={"btn btn-outline-dark buttons"}>Click the button to show Users active in this topic</Link>}
    {showUsers && <ActiveUsersInAtopic topic={topic} />}
    <ListArticles query={`topic=${topic}`} />
    </div>
  );
};
