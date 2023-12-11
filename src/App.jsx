import './App.css'
import {ListArticles} from "./Components/ListArticles.jsx";
import {Comments} from "./Components/Comments.jsx";
import {Route, Routes} from "react-router-dom";
import {Article} from "./Components/Article.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <Routes>
        <Route path={"/"} element={<ListArticles />} />
        <Route path={"/articles/:id"} element={<Article />} />
      </Routes>
    </>
  )
}

export default App
