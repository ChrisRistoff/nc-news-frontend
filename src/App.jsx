import './App.css'
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Header} from "./Components/Header.jsx";
import {LogIn} from "./Components/users/LogIn.jsx";
import {Register} from "./Components/users/Register.jsx";
import {Topics} from "./Components/topics/Topics.jsx";
import {Article} from "./Components/article/Article.jsx";
import {ListArticles} from "./Components/article/ListArticles.jsx";
import {ArticlesInTopic} from "./Components/topics/ArticlesInTopic.jsx";
import {CreateArticle} from "./Components/article/CreateArticle.jsx";
import {NotFoundPage} from "./Components/NotFound.jsx";

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path={"/login"} element={<LogIn/>}/>
        <Route path={"/signup"} element={<Register/>}/>
        <Route path={"/"} element={<Topics/>}/>
        <Route path={"/articles/:id"} element={<Article/>}/>
        <Route path={"/articles"} element={<ListArticles/>}/>
        <Route path={"/topics/:topic"} element={<ArticlesInTopic/>}/>
        <Route path={"/:topic/articles/new"} element={<CreateArticle/>}/>
        <Route path={"*"} element={<NotFoundPage/>}/>
      </Routes>
    </>
  )
}

export default App
