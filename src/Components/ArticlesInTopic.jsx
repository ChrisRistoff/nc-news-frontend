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
      <Link onClick={handleClick} className={"btn btn-outline-dark buttons"}>Hide Users</Link> :
      <Link onClick={handleClick} className={"btn btn-outline-dark buttons"}>Show Users</Link>}
    {showUsers && <ActiveUsersInAtopic topic={topic} />}
    <ListArticles query={`topic=${topic}`} />
    </div>
  );
};
