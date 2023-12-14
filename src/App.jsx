import './App.css'
import {ListArticles} from "./Components/ListArticles.jsx";
import {Route, Routes} from "react-router-dom";
import {Article} from "./Components/Article.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Header} from "./Components/Header.jsx";
import {LogIn} from "./Components/LogIn.jsx";
import {Register} from "./Components/Register.jsx";
import {Topics} from "./Components/Topics.jsx";
import {ArticlesInTopic} from "./Components/ArticlesInTopic.jsx";
import {NotFoundPage} from "./Components/NotFound.jsx";
import {CreateArticle} from "./Components/CreateArticle.jsx";

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path={"/login"} element={<LogIn />} />
        <Route path={"/signup"} element={<Register />} />
        <Route path={"/"} element={<Topics />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/articles"} element={<ListArticles />} />
        <Route path={"/topics/:topic"} element={<ArticlesInTopic />} />
        <Route path={"/:topic/articles/new"} element={<CreateArticle />} />
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
