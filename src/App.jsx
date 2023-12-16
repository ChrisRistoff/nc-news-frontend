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
import {Footer} from "./Components/Footer.jsx";
import {UserPage} from './Components/users/UserPage';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {ScrollToTop} from "./Components/ScrollToTop.jsx";

function App() {

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <main style={{flex: 1}}>
          <Header/>
          <ScrollToTop/>
          <Routes>
            <Route path={"/login"} element={<LogIn/>}/>
            <Route path={"/signup"} element={<Register/>}/>
            <Route path={"/"} element={<Topics/>}/>
            <Route path={"/articles/:id"} element={<Article/>}/>
            <Route path={"/articles"} element={<ListArticles/>}/>
            <Route path={"/topics/:topic"} element={<ArticlesInTopic/>}/>
            <Route path={"/:topic/articles/new"} element={<CreateArticle/>}/>
            <Route path={"/users/:username"} element={<UserPage/>}/>
            <Route path={"*"} element={<NotFoundPage/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </>
  )
}

export default App
