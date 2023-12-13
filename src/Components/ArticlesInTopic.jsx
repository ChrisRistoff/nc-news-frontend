import {useParams } from 'react-router-dom';
import {ListArticles} from "./ListArticles.jsx";

export const ArticlesInTopic = () => {
    const { topic } = useParams();
    return <ListArticles query={`topic=${topic}`} />;
};
